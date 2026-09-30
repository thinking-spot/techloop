// Server-side checkout for both routes (hosted and embedded). The request only
// says which device; what to charge and where to send the customer back are
// decided here (see lib/checkout.ts), never taken from the request.
//
// Phase 1 subscribes to the monthly price only. The deposit, first-month
// charge and rent-to-own credit arrive with the Phase 2 checkout, so the
// storefront stays behind NEXT_PUBLIC_LAUNCH_MODE until then.

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";
import { resolveCheckoutItem, resolveOrigin, type CheckoutItem } from "@/lib/checkout";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
});

type CheckoutUser = { id: string; email: string };

async function getOrCreateCustomer(user: CheckoutUser): Promise<string> {
    const existing = await stripe.customers.list({ email: user.email, limit: 1 });
    if (existing.data.length > 0) return existing.data[0].id;

    const created = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
    });
    return created.id;
}

async function getOrCreateMonthlyPrice(item: CheckoutItem): Promise<string> {
    // item.id comes from our catalog, so it is safe to put in the search query.
    const products = await stripe.products.search({
        query: `metadata['product_slug']: '${item.id}'`,
    });
    const productId =
        products.data.length > 0
            ? products.data[0].id
            : (await stripe.products.create({ name: item.name, metadata: { product_slug: item.id } })).id;

    const prices = await stripe.prices.list({
        product: productId,
        currency: "usd",
        recurring: { interval: "month" },
        active: true,
        limit: 10,
    });
    const match = prices.data.find((p) => p.unit_amount === item.monthlyCents);
    if (match) return match.id;

    const created = await stripe.prices.create({
        product: productId,
        currency: "usd",
        unit_amount: item.monthlyCents,
        recurring: { interval: "month" },
    });
    return created.id;
}

/** POST handler body for /api/checkout/session (embedded: false) and /api/checkout/embedded (embedded: true). */
export async function handleCheckoutRequest(request: Request, embedded: boolean): Promise<NextResponse> {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (!user.email) {
            return NextResponse.json({ error: "Your account needs an email address to check out." }, { status: 400 });
        }

        const body = await request.json().catch(() => null);
        const item = resolveCheckoutItem(body?.productId);
        if (!item) {
            return NextResponse.json({ error: "That device isn't available to rent." }, { status: 400 });
        }

        const origin = resolveOrigin(request.headers.get("origin"), {
            vercelUrl: process.env.VERCEL_URL,
            allowLocalhost: process.env.NODE_ENV !== "production",
        });

        const customer = await getOrCreateCustomer({ id: user.id, email: user.email });
        const price = await getOrCreateMonthlyPrice(item);

        const common = {
            customer,
            mode: "subscription" as const,
            line_items: [{ price, quantity: 1 }],
            shipping_address_collection: { allowed_countries: ["US" as const] },
            subscription_data: { metadata: { product_slug: item.id, user_id: user.id } },
        };

        if (embedded) {
            const session = await stripe.checkout.sessions.create({
                ...common,
                ui_mode: "embedded",
                return_url: `${origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
            });
            return NextResponse.json({ clientSecret: session.client_secret });
        }

        const session = await stripe.checkout.sessions.create({
            ...common,
            success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/checkout`,
        });
        return NextResponse.json({ url: session.url });
    } catch (error: unknown) {
        console.error("Stripe checkout error:", error);
        return NextResponse.json({ error: "We couldn't start checkout. Please try again." }, { status: 500 });
    }
}
