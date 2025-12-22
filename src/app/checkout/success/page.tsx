"use client";

import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const paymentIntent = searchParams.get("payment_intent");

    return (
        <div className="text-center py-16 animate-in fade-in zoom-in duration-500">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                <CheckCircle size={48} />
            </div>

            <h1 className="text-3xl font-display font-bold text-headline mb-4">
                {paymentIntent ? "Subscription Active!" : "Order Confirmed!"}
            </h1>
            <p className="text-paragraph max-w-md mx-auto mb-8">
                Your tech is on its way. You will receive a confirmation email shortly with tracking details.
            </p>

            <div className="bg-white p-6 rounded-xl border border-[#F1F5F9] shadow-sm max-w-sm mx-auto mb-8 text-left">
                <p className="text-xs text-paragraph uppercase tracking-wider font-bold mb-2">Order Details</p>
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-paragraph">Order ID</span>
                    <span className="font-mono text-headline">
                        {paymentIntent ? `#${paymentIntent.slice(-8).toUpperCase()}` : "#TL-PREVIEW"}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-paragraph">Est. Delivery</span>
                    <span className="text-headline">2-3 Business Days</span>
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <Link href="/dashboard">
                    <Button variant="secondary">Go to Dashboard</Button>
                </Link>
                <Link href="/browse">
                    <Button className="flex items-center gap-2">
                        Browse More <ArrowRight size={16} />
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<div className="p-20 text-center">Loading confirmation...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
