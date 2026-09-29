import type { Metadata } from "next";
import { Check } from "lucide-react";
import PricingExplainer from "@/components/pricing/PricingExplainer";
import PriceList from "@/components/pricing/PriceList";
import FaqSection from "@/components/marketing/FaqSection";
import FinalCta from "@/components/marketing/FinalCta";
import { getAllProducts } from "@/lib/products";
import { LAUNCH_DEVICE_IDS } from "@/lib/site-config";
import { PRICING, usd } from "@/lib/pricing";
import { POLICY } from "@/lib/faq";

export const metadata: Metadata = {
    title: "Pricing: rent AI wearables from 10% of retail | Techloop",
    description: `One rule for every device: rent for ${PRICING.ratePct}% of retail a month (minimum ${usd(PRICING.minMonthlyRate)}), plus a refundable deposit. Your deposit and first ${PRICING.creditedPayments} payments count toward buying it.`,
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

export default async function PricingPage() {
    const devices = await getAllProducts();
    const launch = LAUNCH_DEVICE_IDS.flatMap((id) => {
        const device = devices.find((d) => d.id === id);
        return device ? [device] : [];
    });
    const later = devices
        .filter((d) => !LAUNCH_DEVICE_IDS.includes(d.id))
        .sort((a, b) => (a.msrp ?? 0) - (b.msrp ?? 0));

    return (
        <div className="bg-white min-h-screen pb-20">

            {/* Hero */}
            <section className="relative px-6 pt-10 md:px-12 lg:pt-20">
                <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-[#BAE6FD]/40 bg-[linear-gradient(135deg,#F0F9FF_0%,#E6F4FE_50%,#F1F5F9_100%)] p-8 pb-12 pt-16 text-center shadow-sm md:p-20">
                    <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#3DA9FC]/5 blur-[100px]" />

                    <h1 className="relative mx-auto mb-6 font-display text-[44px] font-bold leading-[1.05] tracking-tight text-headline md:text-[54px]">
                        One rule for every device.
                    </h1>
                    <p className="relative mx-auto mb-10 max-w-2xl text-[18px] leading-relaxed text-paragraph md:text-[20px]">
                        Rent for about {PRICING.ratePct}% of a device&apos;s retail price each month. No plans to
                        compare, no tiers, nothing to decode.
                    </p>

                    <ul className="relative mx-auto flex max-w-[260px] flex-col items-center gap-3 text-sm font-medium text-paragraph/80 md:max-w-none md:flex-row md:justify-center">
                        {[
                            `${PRICING.ratePct}% of retail a month`,
                            "Refundable deposit",
                            "Payments count toward owning",
                        ].map((item) => (
                            <li
                                key={item}
                                className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#F1F5F9] bg-white px-5 py-2.5 shadow-sm"
                            >
                                <Check size={16} className="text-[#22C55E]" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* The rule, with a worked example */}
            <PricingExplainer className="mx-auto max-w-6xl px-6 py-20 md:px-12" />

            {/* Every price */}
            <section className="bg-[#F8FAFC] px-6 py-20 md:px-12">
                <div className="mx-auto max-w-6xl space-y-12">
                    <div>
                        <h2 className="font-display text-3xl font-bold text-headline md:text-4xl">Every device, every price</h2>
                        <p className="mt-3 max-w-2xl text-paragraph">
                            These are the numbers you&apos;ll pay. The rule above is the only thing that sets them.
                        </p>
                    </div>
                    <PriceList heading="Launch devices" devices={launch} />
                    <PriceList heading="Coming later" devices={later} />
                </div>
            </section>

            {/* Swaps and refurbished devices */}
            <section className="mx-auto max-w-4xl px-6 py-20 md:px-12">
                <h2 className="font-display text-3xl font-bold text-headline md:text-4xl">Swapping and refurbished devices</h2>
                <ul className="mt-8 space-y-4 text-paragraph">
                    <li className="flex gap-3">
                        <Check size={20} className="mt-0.5 shrink-0 text-button" />
                        <span>
                            <strong className="text-headline">Your first device is new and sealed.</strong> If you swap,
                            the replacement is a certified refurbished unit: tested, cleaned and reset.
                        </span>
                    </li>
                    <li className="flex gap-3">
                        <Check size={20} className="mt-0.5 shrink-0 text-button" />
                        <span>
                            <strong className="text-headline">Swap after your first {POLICY.firstRentalMinimumDays} days.</strong>{" "}
                            Shipping is free, and you pay the new device&apos;s monthly price. Your deposit carries
                            over, adjusted up or down for the new device.
                        </span>
                    </li>
                    <li className="flex gap-3">
                        <Check size={20} className="mt-0.5 shrink-0 text-button" />
                        <span>
                            <strong className="text-headline">Credit stays with the device that earned it.</strong> A
                            swap restarts your progress toward owning, so swap when you&apos;re sure it isn&apos;t the one.
                        </span>
                    </li>
                    <li className="flex gap-3">
                        <Check size={20} className="mt-0.5 shrink-0 text-button" />
                        <span>
                            <strong className="text-headline">Buying a refurbished unit uses the same formula:</strong>{" "}
                            retail price minus your credit.
                        </span>
                    </li>
                </ul>
            </section>

            <FaqSection
                className="mx-auto max-w-3xl px-6 pb-20 md:px-0"
                heading="Pricing questions"
                ids={["waitlist-status", "pricing-how", "pricing-deposit", "buying-keep", "returns-cancel", "returns-unreturned", "returns-shipping", "vs-store"]}
            />

            <FinalCta className="px-6 md:px-12" />
        </div>
    );
}
