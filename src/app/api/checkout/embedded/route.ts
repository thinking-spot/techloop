import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
});

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { price, productName, productId } = await request.json();
        const unitAmount = Math.round(parseFloat(price) * 100);

        // 1. Get or Create Customer
        let customerId;
        const existingCustomers = await stripe.customers.list({ email: user.email!, limit: 1 });

        if (existingCustomers.data.length > 0) {
            customerId = existingCustomers.data[0].id;
        } else {
            const newCustomer = await stripe.customers.create({
                email: user.email!,
                metadata: {
                    supabase_user_id: user.id
                }
            });
            customerId = newCustomer.id;
        }

        // 2. Find or Create Product
        let stripeProductId;
        const existingProducts = await stripe.products.search({
            query: `metadata['product_slug']: '${productId}'`,
        });

        if (existingProducts.data.length > 0) {
            stripeProductId = existingProducts.data[0].id;
        } else {
            const newProduct = await stripe.products.create({
                name: productName,
                metadata: {
                    product_slug: productId
                }
            });
            stripeProductId = newProduct.id;
        }

        // 3. Find or Create Price
        let priceId;
        const existingPrices = await stripe.prices.list({
            product: stripeProductId,
            currency: "usd",
            recurring: { interval: "month" },
            limit: 10
        });

        const matchingPrice = existingPrices.data.find(p => p.unit_amount === unitAmount);

        if (matchingPrice) {
            priceId = matchingPrice.id;
        } else {
            const newPrice = await stripe.prices.create({
                product: stripeProductId,
                currency: "usd",
                unit_amount: unitAmount,
                recurring: { interval: "month" }
            });
            priceId = newPrice.id;
        }

        // 4. Create EMBEDDED Checkout Session
        const origin = request.headers.get("origin") || "https://trytechloop.com";

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            mode: "subscription",
            ui_mode: "embedded", // Key change
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            // Stripe collects the address for us + validation
            shipping_address_collection: {
                allowed_countries: ["US"],
            },
            subscription_data: {
                metadata: {
                    product_slug: productId,
                    user_id: user.id
                }
            },
            // Return URL for embedded flow
            return_url: `${origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
        });

        return NextResponse.json({ clientSecret: session.client_secret });

    } catch (error: unknown) {
        console.error("Stripe Embedded Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
