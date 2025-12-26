"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CheckoutPage() {
    const { items, total } = useCartStore();
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    // Hydration check for Zustand
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return null;

    if (items.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-headline mb-4">Your bag is empty</h2>
                <Button onClick={() => router.push("/browse")}>Continue Browsing</Button>
            </div>
        );
    }

    const handleCheckout = async () => {
        setIsProcessing(true);
        try {
            // Currently supporting single item subscription as per existing logic
            const mainItem = items[0];

            const res = await fetch("/api/checkout/session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    price: mainItem.price,
                    productName: mainItem.name,
                    productId: mainItem.id // slug
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Failed to initialize checkout");
            }

            const data = await res.json();

            if (data.url) {
                // Redirect to Stripe Hosted Checkout
                window.location.href = data.url;
            } else {
                throw new Error("No checkout URL returned");
            }

        } catch (err) {
            console.error("Checkout Error:", err);
            // Optional: Show toast or error message state here
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-headline mb-8">Review & Subscribe</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Trust Banner */}
                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
                        <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-blue-900 text-sm">Secure Checkout by Stripe</h3>
                            <p className="text-blue-700 text-xs mt-1">
                                Set up your payment securely on Stripe servers.
                            </p>
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="bg-white rounded-2xl border border-[#F1F5F9] shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-[#F1F5F9]">
                            <h2 className="text-lg font-bold text-headline">Your Selection</h2>
                        </div>
                        <div className="divide-y divide-[#F1F5F9]">
                            {items.map((item) => (
                                <div key={item.id} className="p-6 flex gap-4 sm:gap-6">
                                    <div className="h-24 w-24 bg-[#F8FAFC] rounded-lg border border-[#F1F5F9] relative flex-shrink-0 flex items-center justify-center overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-headline text-lg">{item.name}</h3>
                                                <p className="text-paragraph text-sm mt-1">Monthly Subscription</p>
                                            </div>
                                            <p className="font-bold text-headline text-lg">${item.price}<span className="text-sm text-paragraph font-normal">/mo</span></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next Steps Info */}
                    <div className="bg-gray-50 rounded-xl p-6 text-sm text-paragraph space-y-2">
                        <p className="font-medium text-headline mb-2">What happens next?</p>
                        <ol className="list-decimal list-inside space-y-1 ml-1">
                            <li>You'll be redirected to Stripe's secure payment page.</li>
                            <li>Enter your shipping address and payment method.</li>
                            <li>Review and confirm your subscription.</li>
                            <li>You'll be returned here to confirm your order.</li>
                        </ol>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl border border-[#F1F5F9] shadow-sm sticky top-8">
                        <h3 className="text-lg font-bold text-headline mb-4">Order Summary</h3>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-paragraph">Subtotal</span>
                                <span className="font-medium text-headline">${total()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-paragraph">Taxes</span>
                                <span className="text-paragraph italic">At checkout</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-paragraph">Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-base font-bold pt-4 border-t border-[#F1F5F9] mt-2">
                                <span className="text-headline">Total Due Today</span>
                                <span className="text-headline">${total()}</span>
                            </div>
                        </div>

                        <Button
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className="w-full mt-6 flex items-center justify-center gap-2 py-3 text-sm font-semibold whitespace-nowrap"
                        >
                            {isProcessing ? (
                                "Redirecting..."
                            ) : (
                                <>
                                    <Lock size={14} />
                                    Proceed to Checkout
                                </>
                            )}
                        </Button>
                        <p className="text-center text-xs text-paragraph mt-3 flex items-center justify-center gap-1">
                            <ShieldCheck size={12} /> SSL Encrypted Payment
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

