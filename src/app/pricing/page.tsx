import Link from "next/link";
import type { Metadata } from "next";
import { Check, Shield, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

const plans = [
    {
        name: "Starter",
        price: "48",
        description: "Best for trying one device",
        features: [
            "1 AI wearable device at a time",
            "Brand new device shipped to you",
            "Try up to 5 devices per year",
            "Rent-to-own pricing available",
            "Free return shipping",
        ],
        swaps: "4 free swaps per year (quarterly)",
        cta: "Choose Starter",
        highlight: false,
    },
    {
        name: "Explorer",
        price: "84",
        description: "Most Popular",
        features: [
            "2 AI wearable devices at once",
            "Both brand new, shipped together",
            "Try up to 10 devices per year",
            "Rent-to-own pricing on both",
            "Free return shipping",
            "Compare devices head-to-head",
        ],
        swaps: "8 free swaps (4 per device)",
        cta: "Choose Explorer",
        highlight: true,
    },
    {
        name: "Power User",
        price: "119",
        description: "For the ultimate tech explorer",
        features: [
            "3+ AI wearable devices at once",
            "All brand new devices",
            "Try 15+ different devices per year",
            "Build your complete AI ecosystem",
            "Mix categories: glasses + ring + earbuds",
            "Priority customer support",
        ],
        swaps: "12+ free swaps (4 per device)",
        cta: "Choose Power User",
        highlight: false,
    },
];

const faqs = [
    {
        q: "Are these actually brand new devices?",
        a: "Yes! Your first rental of any device is always brand new, factory sealed. When you return it, we professionally refurbish it to like-new condition, then it becomes available for swaps."
    },
    {
        q: "What if I damage the device?",
        a: "Normal wear and tear (scratches, scuffs) is covered. Accidental damage (cracks, water) is deducted from your security deposit. 98% of our users return devices with zero deductions."
    },
    {
        q: "How do swaps work?",
        a: "Log into your dashboard, click 'Request Swap', and choose your next device. You return the old one in prepaid packaging. Get your next device in 2-3 days. Your billing stays the same."
    },
    {
        q: "Can I cancel anytime?",
        a: "YES. Truly no commitment. Click 'Cancel Subscription', return the device within 14 days, and we refund your security deposit within 7 days. No questions asked."
    },
    {
        q: "How is this different from buying on Amazon?",
        a: "Amazon gives you 30 days. If you return it, you have nothing. With Techloop, you can rent as long as you want, swap to try other devices, and if you keep it, you get 40-60% off retail."
    }
];



export const metadata: Metadata = {
    title: "Pricing | Simple $48/mo AI Device Subscription",
    description: "Try $400+ AI devices for less than $50/month. No hidden fees. Cancel anytime. Free swaps included.",
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

export default function PricingPage() {
    return (
        <div className="bg-white min-h-screen pb-20">

            {/* Hero */}
            <section className="relative px-6 pt-12 md:px-12 lg:pt-20">
                <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-gradient-to-br from-[#F0F9FF] via-[#E6F4FE] to-[#F1F5F9] p-8 md:p-20 text-center border border-[#BAE6FD]/40 shadow-sm relative overflow-hidden">
                    {/* Background decorative blob */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3DA9FC]/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

                    <h1 className="relative mx-auto mb-6 font-display text-[40px] font-bold leading-tight text-headline md:text-[48px]">
                        Try $400+ AI devices for less than $50/month
                    </h1>
                    <p className="relative mx-auto mb-10 text-[20px] md:text-[22px] text-paragraph max-w-2xl mx-auto leading-relaxed">
                        New devices. No commitment. Swap anytime. Keep what you love.
                    </p>

                    <div className="relative flex flex-wrap justify-center gap-4 text-sm font-medium text-paragraph/80">
                        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/50">
                            <Check size={16} className="text-success" /> Brand new devices
                        </div>
                        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/50">
                            <Check size={16} className="text-success" /> Swap 4x/year free
                        </div>
                        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/50">
                            <Check size={16} className="text-success" /> Cancel anytime
                        </div>
                    </div>
                </div>
            </section>

            {/* Plans */}
            <section className="px-6 md:px-12 -mt-10 mb-20">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-card border ${plan.highlight ? 'border-button ring-4 ring-button/10 scale-105 z-10' : 'border-[#F1F5F9]'}`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-button text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-lg font-medium text-paragraph mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-headline">${plan.price}</span>
                                    <span className="text-paragraph">/month</span>
                                </div>
                                <p className="mt-2 text-sm text-paragraph">{plan.description}</p>
                            </div>

                            <div className="flex-1 mb-8">
                                <ul className="space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3 text-sm text-paragraph">
                                            <Check size={18} className="text-button flex-shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 pt-6 border-t border-[#F1F5F9] text-xs text-paragraph/70">
                                    {plan.swaps}
                                </div>
                            </div>

                            <Link href="/signup" className="block w-full">
                                <Button
                                    variant={plan.highlight ? "primary" : "secondary"}
                                    className="w-full"
                                >
                                    {plan.cta}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-16 px-6 md:px-12 bg-[#F8FAFC]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-display font-medium text-headline text-center mb-12">Why Techloop vs. Other Options?</h2>

                    <div className="border border-[#F1F5F9] rounded-2xl overflow-hidden shadow-sm bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[600px]">
                                <thead className="bg-[#F1F5F9]">
                                    <tr>
                                        <th className="py-4 px-6 font-medium text-paragraph">Option</th>
                                        <th className="py-4 px-6 font-medium text-paragraph">Cost</th>
                                        <th className="py-4 px-6 font-medium text-paragraph">Try Multiple?</th>
                                        <th className="py-4 px-6 font-medium text-paragraph">Return Policy</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F1F5F9]">
                                    <tr>
                                        <td className="py-4 px-6 text-sm font-medium text-paragraph">Buy on Amazon</td>
                                        <td className="py-4 px-6 text-sm text-paragraph">$399 upfront</td>
                                        <td className="py-4 px-6 text-sm text-paragraph">No (buy each)</td>
                                        <td className="py-4 px-6 text-sm text-paragraph">30 days</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-6 text-sm font-medium text-paragraph">Finance (Affirm)</td>
                                        <td className="py-4 px-6 text-sm text-paragraph">$36/mo x 12</td>
                                        <td className="py-4 px-6 text-sm text-paragraph">No</td>
                                        <td className="py-4 px-6 text-sm text-paragraph">None (active loan)</td>
                                    </tr>
                                    <tr className="bg-[#F0F9FF]">
                                        <td className="py-4 px-6 text-sm font-bold text-headline">Techloop Starter</td>
                                        <td className="py-4 px-6 text-sm font-bold text-headline">$48/month</td>
                                        <td className="py-4 px-6 text-sm font-bold text-headline">Yes (4 free swaps/yr)</td>
                                        <td className="py-4 px-6 text-sm font-bold text-headline">Cancel anytime</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rent to Own & Security Deposit */}
            <section className="py-20 px-6 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
                    {/* Security Deposit */}
                    <div>
                        <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-headline mb-4">
                            <Shield size={28} className="text-button" /> Security Deposit
                        </h3>
                        <p className="text-paragraph mb-6">
                            We collect a refundable deposit ($48) to protect our devices and keep the balance sheet healthy.
                        </p>
                        <div className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
                            <h4 className="font-semibold text-headline mb-3 text-sm">100% Refunded when you:</h4>
                            <ul className="space-y-3 mb-4">
                                <li className="flex items-center gap-2 text-sm text-paragraph"><Check size={16} className="text-success" /> Return the device</li>
                                <li className="flex items-center gap-2 text-sm text-paragraph"><Check size={16} className="text-success" /> Purchase the device</li>
                            </ul>
                            <p className="text-xs text-paragraph/70 border-t border-[#E2E8F0] pt-3">
                                98% of our users get their full deposit back.
                            </p>
                        </div>
                    </div>

                    {/* Rent to Own */}
                    <div>
                        <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-headline mb-4">
                            <RefreshCcw size={28} className="text-button" /> Rent-to-Own
                        </h3>
                        <p className="text-paragraph mb-6">
                            Fall in love? Keep it. Your rental payments count toward the purchase price.
                        </p>

                        <div className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0] text-sm">
                            <div className="flex justify-between mb-2">
                                <span className="text-paragraph">Retail Price:</span>
                                <span className="font-bold text-headline line-through">$399</span>
                            </div>
                            <div className="flex justify-between mb-4 pb-4 border-b border-[#E2E8F0]">
                                <span className="text-paragraph">You paid (3 mos rental):</span>
                                <span className="font-bold text-success">-$144</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-headline">Buyout Price:</span>
                                <span className="font-bold text-2xl text-button">$240</span>
                            </div>
                            <p className="text-xs text-paragraph mt-4">
                                *Example for XREAL Air 2 Pro after 3 months.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-6 md:px-12 bg-[#F8FAFC]">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-display font-medium text-headline text-center mb-12">Questions? We&apos;ve Got Answers.</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-[#E2E8F0]">
                                <h4 className="font-bold text-headline text-lg mb-2">{faq.q}</h4>
                                <p className="text-paragraph">{faq.a}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-paragraph mb-4">Still have questions?</p>
                        <Link href="/contact">
                            <Button variant="secondary">Help & Support</Button>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
