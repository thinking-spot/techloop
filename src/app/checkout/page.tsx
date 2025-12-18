"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, Truck, ShieldCheck, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const STEPS = [
    { id: 1, name: "Shipping", icon: Truck },
    { id: 2, name: "Verification", icon: ShieldCheck },
    { id: 3, name: "Payment", icon: CreditCard },
];

export default function CheckoutPage() {
    const { items, total, clearCart } = useCartStore();
    const [step, setStep] = useState(1);
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

    const handleNext = async () => {
        setIsProcessing(true);
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setIsProcessing(false);

        if (step < 3) {
            setStep(step + 1);
        } else {
            // Complete Order
            clearCart();
            router.push("/checkout/success");
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
                                    <label className="block text-sm font-medium text-headline mb-1">ZIP Code</label>
                                    <Input placeholder="94105" />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-8">
                            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-button mb-4">
                                <ShieldCheck size={32} />
                            </div>
                            <h2 className="text-xl font-bold text-headline">Identity Verification</h2>
                            <p className="text-paragraph max-w-md mx-auto">
                                To insure our devices, we need to verify your identity.
                                Click below to simulate a quick ID scan.
                            </p>
                            <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-lg max-w-sm mx-auto">
                                <p className="text-xs text-paragraph font-mono">Simulating Stripe Identity...</p>
                                <div className="mt-2 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 animate-pulse w-2/3"></div>
                                </div>
                                <p className="text-xs text-green-600 mt-2 font-bold flex items-center justify-center gap-1">
                                    <Check size={12} /> Pre-verified for Demo
                                </p>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-xl font-bold text-headline">Payment Method</h2>
                            <div className="p-4 border border-button bg-blue-50/50 rounded-lg flex items-center gap-3">
                                <CreditCard className="text-button" size={24} />
                                <div>
                                    <p className="text-sm font-bold text-headline">Test Card</p>
                                    <p className="text-xs text-paragraph">•••• 4242</p>
                                </div>
                                <div className="ml-auto text-button">
                                    <Check size={20} />
                                </div>
                            </div>
                            <p className="text-xs text-paragraph">
                                You will be charged <strong>${total()}</strong> today.
                                Your subscription will renew monthly. Cancel anytime.
                            </p>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-[#F1F5F9] flex justify-end">
                        <Button
                            onClick={handleNext}
                            disabled={isProcessing}
                            className="min-w-[140px] flex items-center justify-center gap-2"
                        >
                            {isProcessing ? "Processing..." : step === 3 ? "Complete Order" : "Continue"}
                            {!isProcessing && <ArrowRight size={16} />}
                        </Button>
                    </div>
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
