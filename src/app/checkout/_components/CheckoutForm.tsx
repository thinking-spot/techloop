"use client";

import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Lock } from "lucide-react";
import { useCartStore } from "@/store/cart";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const { clearCart } = useCartStore();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/success`,
            },
            // We don't want to redirect if there's an immediate error (like "card declined")
            // But for default_incomplete subscriptions, a redirect is usually required.
        });

        if (error) {
            setErrorMessage(error.message ?? "An unknown error occurred");
            setIsProcessing(false);
        } else {
            // The UI will likely redirect before this is reached.
            // But if we used redirect: 'if_required', we might handle logic here.
            // For now, assume redirect happens.
            clearCart();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement options={{ layout: "tabs" }} />

            {errorMessage && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    {errorMessage}
                </div>
            )}

            <Button
                disabled={!stripe || isProcessing}
                className="w-full flex items-center justify-center gap-2 py-6 text-lg"
            >
                {isProcessing ? "Processing..." : (
                    <>
                        <Lock size={18} /> Pay & Subscribe
                    </>
                )}
            </Button>

            <p className="text-center text-xs text-paragraph">
                By subscribing, you agree to our Terms of Service.
                Payments are secure and encrypted.
            </p>
        </form>
    );
}
