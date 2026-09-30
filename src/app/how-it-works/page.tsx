import type { Metadata } from "next";
import Link from "next/link";
import { Check, Search, Box, HelpCircle, RotateCw, RefreshCcw, Undo2, Truck, Shield } from "lucide-react";
import PricingExplainer from "@/components/pricing/PricingExplainer";
import FaqSection from "@/components/marketing/FaqSection";
import FinalCta from "@/components/marketing/FinalCta";
import { PRICING } from "@/lib/pricing";
import { POLICY } from "@/lib/faq";

export const metadata: Metadata = {
    title: "How Techloop works: rent, swap or buy AI wearables",
    description: `Pick a device, try it for ${POLICY.firstRentalMinimumDays}+ days, then keep renting, buy it, swap it or send it back. Your deposit and first ${PRICING.creditedPayments} payments count toward owning it.`,
    alternates: { canonical: "/how-it-works" },
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

const STEPS = [
    {
        icon: Search,
        title: "1. Choose a device",
        body: "Take the quiz or browse the catalog and find your match.",
        tag: "Quiz or browse",
    },
    {
        icon: Box,
        title: `2. Try it for ${POLICY.firstRentalMinimumDays}+ days`,
        body: "Your first device ships new and sealed. Use it in real life and see if it sticks.",
        tag: "New and sealed",
    },
    {
        icon: HelpCircle,
        title: "3. It's your call",
        body: "Keep renting, buy it, swap it for another, or send it back.",
        tag: "Four options",
    },
];

const OPTIONS = [
    {
        icon: RotateCw,
        title: "Keep renting",
        body: "Keep the device and keep paying the monthly price. Cancel any time.",
    },
    {
        icon: Check,
        title: "Buy it",
        body: "Pay the retail price minus your credit. Your deposit and first 3 payments count.",
    },
    {
        icon: RefreshCcw,
        title: "Swap",
        body: `After your first ${POLICY.firstRentalMinimumDays} days, try a different device. Shipping is free.`,
    },
    {
        icon: Undo2,
        title: "Return",
        body: `Send it back within ${POLICY.returnWindowDays} days and we refund your deposit.`,
    },
];

export default function HowItWorksPage() {
    return (
        <div className="bg-white min-h-screen pb-20">

            {/* Hero */}
            <section className="relative px-6 pt-10 md:px-12 lg:pt-20">
                <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-[#BAE6FD]/40 bg-[linear-gradient(135deg,#F0F9FF_0%,#E6F4FE_50%,#F1F5F9_100%)] p-8 pb-12 pt-16 text-center shadow-sm md:p-20">
                    <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#3DA9FC]/5 blur-[100px]" />

                    <h1 className="relative mx-auto mb-6 font-display text-[44px] font-bold leading-[1.05] tracking-tight text-headline md:text-[54px]">
                        Try it. Swap it. <br className="hidden md:block" />Keep it.
                    </h1>
                    <p className="relative mx-auto mb-10 max-w-2xl text-[18px] leading-relaxed text-paragraph md:text-[20px]">
                        Rent AI wearables month to month. Your payments count toward owning the ones you love.
                    </p>

                    <ul className="relative mx-auto grid max-w-[340px] grid-cols-1 gap-3 text-sm font-medium text-paragraph/80 sm:max-w-none sm:grid-cols-3">
                        <li className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#F1F5F9] bg-white px-3 py-2.5 shadow-sm">
                            <Truck size={16} className="text-[#22C55E]" /> Free shipping both ways
                        </li>
                        <li className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#F1F5F9] bg-white px-3 py-2.5 shadow-sm">
                            <Shield size={16} className="text-[#22C55E]" /> Refundable deposit
                        </li>
                        <li className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#F1F5F9] bg-white px-3 py-2.5 shadow-sm">
                            <RefreshCcw size={16} className="text-[#22C55E]" /> Swap after {POLICY.firstRentalMinimumDays} days
                        </li>
                    </ul>
                </div>
            </section>

            {/* Steps */}
            <section className="px-6 py-24 md:px-12">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 font-display text-4xl font-bold tracking-tight text-headline md:text-5xl">
                            Three steps
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-paragraph md:text-xl">
                            No plans to pick and no contract to sign. You choose a device and see how it fits your life.
                        </p>
                    </div>

                    <ol className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
                        {STEPS.map(({ icon: Icon, title, body, tag }) => (
                            <li
                                key={title}
                                className="rounded-3xl border border-[#F1F5F9] bg-white p-8 text-center shadow-lg shadow-[#094067]/5"
                            >
                                <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-[#F8FAFC] text-headline shadow-md">
                                    <Icon size={36} />
                                </div>
                                <h3 className="mb-3 font-display text-2xl font-bold text-headline">{title}</h3>
                                <p className="mb-6 text-sm leading-relaxed text-paragraph md:text-base">{body}</p>
                                <span className="inline-block rounded-lg border border-[#F1F5F9] bg-[#F8FAFC] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-button">
                                    {tag}
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* After 30 days */}
            <section className="bg-[#F8FAFC] px-6 py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-14 text-center">
                        <h2 className="mb-4 font-display text-4xl font-bold tracking-tight text-headline">
                            After {POLICY.firstRentalMinimumDays} days, it&apos;s up to you
                        </h2>
                        <p className="text-lg text-paragraph md:text-xl">Four ways to go from here.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-4">
                        {OPTIONS.map(({ icon: Icon, title, body }) => (
                            <div
                                key={title}
                                className="rounded-2xl border border-[#F1F5F9] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                            >
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#F0F9FF] text-button">
                                    <Icon size={28} />
                                </div>
                                <h3 className="mb-3 font-display text-xl font-bold text-headline">{title}</h3>
                                <p className="leading-relaxed text-paragraph">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The money */}
            <PricingExplainer
                heading="The money, step by step"
                className="mx-auto max-w-6xl px-6 py-20 md:px-12"
            />
            <p className="mx-auto -mt-10 max-w-6xl px-6 pb-20 text-sm text-paragraph md:px-12">
                Want to see your device&apos;s numbers?{" "}
                <Link href="/pricing" className="font-medium text-button hover:underline">
                    Every price is on the pricing page
                </Link>
                .
            </p>

            <FaqSection
                className="mx-auto max-w-3xl px-6 pb-20 md:px-0"
                ids={["waitlist-status", "first-device-new", "swaps-how", "returns-cancel", "returns-unreturned", "returns-shipping"]}
            />

            <FinalCta className="px-6 md:px-12" />
        </div>
    );
}
