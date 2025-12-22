"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/Button";

function ReturnContent() {
    const [status, setStatus] = useState<string | null>(null);
    const [customerEmail, setCustomerEmail] = useState("");
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const router = useRouter();
    const { clearCart } = useCartStore();

    useEffect(() => {
        if (sessionId) {
            fetch(`/api/checkout/session-status?session_id=${sessionId}`)
                .then((res) => res.json())
                .then((data) => {
                    setStatus(data.status);
                    setCustomerEmail(data.customer_email);
                    if (data.status === 'complete') {
                        clearCart();
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setStatus("error");
                });
        }
    }, [sessionId, clearCart]);

    if (status === "open") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <p>Payment did not complete. Please try again.</p>
                <Button onClick={() => router.push("/checkout")} className="mt-4">
                    Back to Checkout
                </Button>
            </div>
        );
    }

    if (status === "complete") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="bg-green-100 p-4 rounded-full mb-6">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-headline mb-4">Payment Successful!</h1>
                <p className="text-paragraph text-lg mb-8 max-w-md">
                    Thank you! A confirmation email has been sent to <span className="font-bold">{customerEmail}</span>.
                </p>
                <Button onClick={() => router.push("/dashboard")} size="lg">
                    Go to Dashboard
                </Button>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-paragraph">Verifying payment...</p>
        </div>
    );
}

export default function CheckoutReturn() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><p>Loading...</p></div>}>
            <ReturnContent />
        </Suspense>
    );
}
