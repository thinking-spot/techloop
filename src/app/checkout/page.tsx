"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, Truck, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

// Stripe Imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./_components/CheckoutForm";

// Initialize Stripe outside of component
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const STEPS = [
    { id: 1, name: "Shipping", icon: Truck },
    { id: 2, name: "Payment", icon: CreditCard },
];

export default function CheckoutPage() {
    const { items, total } = useCartStore();
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    // Stripe State
    const [clientSecret, setClientSecret] = useState("");
    const [stripeError, setStripeError] = useState("");

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

    const handleNext = async () => {
        setIsProcessing(true);
        setStripeError(""); // Clear previous errors

        // If moving TO Payment step (Step 1 -> Step 2)
        if (step === 1) {
            try {
                const mainItem = items[0];

                const res = await fetch("/api/checkout/create-intent", {
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

                // CRITICAL FIX: If clientSecret is null, the invoice is already paid (e.g. credits).
                // Redirect straight to success.
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                    setStep(step + 1);
                } else {
                    router.push("/checkout/success");
                }
            } catch (err: unknown) {
                console.error(err);
                const errorMessage = err instanceof Error ? err.message : "Could not initialize payment system.";
                setStripeError(errorMessage);
            } finally {
                setIsProcessing(false);
            }
        } else if (step < 2) {
            // Normal step transition
            await new Promise(resolve => setTimeout(resolve, 500));
            setStep(step + 1);
            setIsProcessing(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main Form Area */}
            <div className="lg:col-span-2 space-y-8">
                {/* Steps Indicator */}
                <nav aria-label="Progress">
                    <ol role="list" className="flex items-center">
                        {STEPS.map((s, stepIdx) => (
                            <li key={s.name} className={`relative flex items-center pr-4 sm:pr-10 ${stepIdx !== STEPS.length - 1 ? 'flex-1' : ''}`}>
                                <div className="flex items-center gap-2 md:gap-4">
                                    <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${step > s.id ? 'bg-button border-button text-white' :
                                        step === s.id ? 'border-button text-button' :
                                            'border-gray-300 text-gray-500'
                                        }`}>
                                        {step > s.id ? <Check size={16} /> : <s.icon size={16} />}
                                    </div>
                                    <span className={`text-sm font-medium hidden sm:block ${step >= s.id ? 'text-headline' : 'text-gray-500'
                                        }`}>{s.name}</span>
                                </div>
                                {stepIdx !== STEPS.length - 1 && (
                                    <div className={`absolute top-4 w-full h-0.5 left-0 ml-10 md:ml-12 ${step > s.id ? 'bg-button' : 'bg-gray-200'}`} style={{ width: 'calc(100% - 2rem)' }} />
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>

                <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#F1F5F9] shadow-sm">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-xl font-bold text-headline">Shipping Address</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-headline mb-1">Full Name</label>
                                    <Input placeholder="Enter your full name" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-headline mb-1">Address</label>
                                    <Input placeholder="123 Tech St" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-headline mb-1">City</label>
                                    <Input placeholder="San Francisco" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-headline mb-1">State</label>
                                    <Input placeholder="CA" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-headline mb-1">ZIP Code</label>
                                    <Input placeholder="94105" />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-xl font-bold text-headline">Payment Method</h2>

                            {clientSecret ? (
                                <Elements options={{ clientSecret, appearance: { theme: 'stripe' } }} stripe={stripePromise}>
                                    <CheckoutForm />
                                </Elements>
                            ) : (
                                <div className="text-center py-8 text-paragraph/50">
                                    Initializing payment...
                                </div>
                            )}
                        </div>
                    )}

                    {/* Error Message */}
                    {stripeError && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm mb-4">
                            {stripeError}
                        </div>
                    )}

                    {/* Navigation Buttons (Only for steps < 2 - i.e. Step 1) */}
                    {step < 2 && (
                        <div className="mt-8 pt-6 border-t border-[#F1F5F9] flex justify-end">
                            <Button
                                onClick={handleNext}
                                disabled={isProcessing}
                                className="min-w-[140px] flex items-center justify-center gap-2"
                            >
                                {isProcessing ? "Processing..." : "Continue to Payment"}
                                {!isProcessing && <ArrowRight size={16} />}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-2xl border border-[#F1F5F9] shadow-sm sticky top-8">
                    <h3 className="text-lg font-bold text-headline mb-4">Order Summary</h3>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4 pr-1">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-3">
                                <div className="h-16 w-16 bg-[#F8FAFC] rounded border border-[#F1F5F9] relative flex-shrink-0 flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-contain p-2"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-headline line-clamp-1">{item.name}</p>
                                    <p className="text-xs text-paragraph">${item.price}/mo</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2 pt-4 border-t border-[#F1F5F9] text-sm">
                        <div className="flex justify-between">
                            <span className="text-paragraph">Subtotal</span>
                            <span className="font-medium text-headline">${total()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-paragraph">Taxes</span>
                            <span className="font-medium text-headline">$0.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-paragraph">Shipping</span>
                            <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-base font-bold pt-2 border-t border-[#F1F5F9] mt-2">
                            <span className="text-headline">Total</span>
                            <span className="text-headline">${total()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
