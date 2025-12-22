```typescript
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
        // We search by a custom metadata field 'slug' to avoid creating duplicates
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
        // We look for a recurring price for this product with the exact amount
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

        // 4. Create Subscription
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            currency: "usd",
            items: [
                {
                    price: priceId, // Use the Price ID directly
                },
            ],
            payment_behavior: "default_incomplete",
            payment_settings: { save_default_payment_method: "on_subscription" },
            expand: ["latest_invoice.payment_intent"],
            metadata: {
                product_slug: productId,
                user_id: user.id
            }
        });

        const invoice = subscription.latest_invoice as Stripe.Invoice;
        // Expanded payment_intent might not be in the default Invoice type definition if types are old
        const paymentIntent = (invoice as any).payment_intent as Stripe.PaymentIntent;

        return NextResponse.json({
            subscriptionId: subscription.id,
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error: unknown) {
        console.error("Stripe Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
