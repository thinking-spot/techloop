import { Check, DollarSign, RefreshCcw, KeyRound, Zap, ListChecks, ThumbsUp } from "lucide-react";
import WaitlistForm from "@/components/waitlist/WaitlistForm";
import PricingExplainer from "@/components/pricing/PricingExplainer";
import FaqSection from "@/components/marketing/FaqSection";
import FinalCta from "@/components/marketing/FinalCta";
import { getWaitlistDeviceOptions } from "@/lib/waitlist";
import { devices } from "@/lib/data";
import { PRICING, lowestMonthlyRate, usd } from "@/lib/pricing";
import { POLICY } from "@/lib/faq";

const lowestRate = lowestMonthlyRate(devices) ?? PRICING.minMonthlyRate;

// Real catalog prices for the "expensive to experiment" example.
const glasses = devices.find((d) => d.id === "meta-rayban");
const ring = devices.find((d) => d.id === "oura-ring");

export default function WaitlistPage() {
    const deviceOptions = getWaitlistDeviceOptions();
    const bothTotal = (glasses?.msrp ?? 0) + (ring?.msrp ?? 0);

    const chips = [
        `From ${usd(lowestRate)}/mo`,
        "Refundable deposit",
        "Swap for another device",
        "Payments count toward owning",
    ];

    return (
        <div className="bg-white min-h-screen font-sans text-headline">

            {/* Hero */}
            <section className="relative px-4 pt-10 md:px-12 lg:pt-20">
                <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-[#BAE6FD]/40 bg-[linear-gradient(135deg,#F0F9FF_0%,#E6F4FE_50%,#F1F5F9_100%)] p-6 pb-12 pt-16 text-center shadow-sm md:p-16 lg:text-left">
                    <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#3DA9FC]/5 blur-[100px]" />

                    <div className="relative z-10 grid w-full items-center gap-8 md:gap-12 lg:grid-cols-2">
                        <div className="mx-auto max-w-lg space-y-6 md:space-y-8 lg:mx-0">
                            <h1 className="font-display text-[44px] font-bold leading-[1.05] tracking-tight text-headline md:text-[48px]">
                                Try AI wearables <span className="text-[#3DA9FC]">before you buy.</span>
                            </h1>
                            <p className="text-[18px] font-light leading-relaxed text-paragraph md:text-[20px]">
                                Join the waitlist for early access. Rent smart glasses, rings, earbuds and more from{" "}
                                {usd(lowestRate)} a month, and put your payments toward owning the ones you love.
                            </p>

                            <ul className="mx-auto grid max-w-[340px] grid-cols-2 gap-3 text-sm font-medium text-paragraph/80 sm:max-w-none sm:flex sm:flex-wrap lg:mx-0 lg:grid lg:grid-cols-2">
                                {chips.map((chip) => (
                                    <li
                                        key={chip}
                                        className="flex items-center justify-center gap-2 rounded-xl border border-[#F1F5F9] bg-white px-3 py-2.5 text-center shadow-sm sm:whitespace-nowrap lg:whitespace-normal"
                                    >
                                        <Check size={16} className="shrink-0 text-[#22C55E]" /> {chip}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative mx-auto w-full max-w-md rounded-2xl border border-[#BAE6FD]/60 bg-white p-8 text-headline shadow-xl">
                            <div className="mb-6 text-center">
                                <h2 className="text-xl font-bold text-headline">Get early access</h2>
                                <p className="mt-1 text-sm text-paragraph">
                                    We&apos;re opening to the waitlist first. We&apos;ll email you when your spot opens.
                                </p>
                            </div>
                            <WaitlistForm deviceOptions={deviceOptions} />
                        </div>
                    </div>
                </div>
            </section>

            {/* The problem */}
            <section className="bg-white px-6 py-24">
                <div className="mx-auto mb-16 max-w-4xl text-center">
                    <h2 className="mb-6 font-display text-3xl font-bold text-headline md:text-4xl">AI wearables are a tough sell</h2>
                    <p className="text-xl leading-relaxed text-paragraph">
                        You want to try smart glasses, but you can&apos;t know if they fit your life until you&apos;ve
                        worn them. Fair questions: Will they fit? Will I use them? Will I feel like myself?
                    </p>
                </div>

                <div className="mx-auto grid max-w-6xl gap-12 text-center md:grid-cols-3">
                    <div className="p-6">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600">💸</div>
                        <h3 className="mb-4 text-xl font-bold text-headline">Expensive to experiment</h3>
                        <p className="leading-relaxed text-paragraph">
                            {glasses && ring
                                ? `The ${glasses.name} is ${usd(glasses.msrp ?? 0)}. The ${ring.name} is ${usd(ring.msrp ?? 0)}. Trying both means spending ${usd(bothTotal)} before you know what you'll actually wear.`
                                : "Smart glasses and smart rings each cost hundreds of dollars. Trying a few means spending a lot before you know what you'll wear."}
                        </p>
                    </div>
                    <div className="p-6">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl text-orange-600">🤷</div>
                        <h3 className="mb-4 text-xl font-bold text-headline">Is this really me?</h3>
                        <p className="leading-relaxed text-paragraph">
                            AI wearables sit on your face, your finger, your ear. The right one should feel like
                            yours, and a spec sheet can&apos;t tell you that.
                        </p>
                    </div>
                    <div className="p-6">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl text-blue-600">🔄</div>
                        <h3 className="mb-4 text-xl font-bold text-headline">Buy now or wait?</h3>
                        <p className="leading-relaxed text-paragraph">
                            New models keep arriving, and it&apos;s hard to know whether to buy today or hold off.
                            Renting lets you try what&apos;s out now without committing to it.
                        </p>
                    </div>
                </div>
            </section>

            {/* The solution */}
            <section className="bg-[#F0F9FF] px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 text-center">
                        <span className="text-sm font-bold uppercase tracking-wider text-button">Introducing Techloop</span>
                        <h2 className="mb-6 mt-3 font-display text-4xl font-bold text-headline md:text-5xl">Rent first. Keep what you love.</h2>
                        <p className="mx-auto max-w-2xl text-xl text-paragraph">
                            Try any device for about {PRICING.ratePct}% of its retail price a month. Swap it, send it
                            back, or buy it with your payments already counting.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="rounded-2xl border border-cyan-100 bg-white p-8 shadow-sm">
                            <DollarSign size={40} className="mb-6 text-button" />
                            <h3 className="mb-4 text-2xl font-bold text-headline">Try it for real</h3>
                            <p className="text-paragraph">
                                Start with your first month and a refundable deposit instead of the full retail price.
                                Your first device ships new and sealed.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-cyan-100 bg-white p-8 shadow-sm">
                            <RefreshCcw size={40} className="mb-6 text-button" />
                            <h3 className="mb-4 text-2xl font-bold text-headline">Swap when it&apos;s not the one</h3>
                            <p className="text-paragraph">
                                Try an Oura Ring, then a Samsung Galaxy Ring. After your first {POLICY.firstRentalMinimumDays} days
                                you can swap for a different device, and shipping is free.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-cyan-100 bg-white p-8 shadow-sm">
                            <KeyRound size={40} className="mb-6 text-button" />
                            <h3 className="mb-4 text-2xl font-bold text-headline">Own it when you love it</h3>
                            <p className="text-paragraph">
                                Your deposit and first {PRICING.creditedPayments} payments count toward buying. Buy within{" "}
                                {PRICING.creditedPayments} months and you pay exactly the retail price.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How the money works */}
            <PricingExplainer className="mx-auto max-w-6xl px-6 py-24" />

            {/* Perks */}
            <section className="bg-[#0A1F44] px-6 py-24 text-white">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-16 text-center">
                        <h2 className="mb-6 font-display text-4xl font-bold text-white">Why join the waitlist?</h2>
                        <p className="text-xl text-cyan-100/80">The people who join first get first pick.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                            <Zap className="mb-4 text-yellow-400" size={32} />
                            <h3 className="mb-2 text-xl font-bold text-white">Early access</h3>
                            <p className="text-sm text-gray-300">You&apos;re first in line when we open, before everyone else.</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                            <ListChecks className="mb-4 text-green-400" size={32} />
                            <h3 className="mb-2 text-xl font-bold text-white">Pick your launch device first</h3>
                            <p className="text-sm text-gray-300">Choose your device before we open the catalog to the public.</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                            <ThumbsUp className="mb-4 text-cyan-400" size={32} />
                            <h3 className="mb-2 text-xl font-bold text-white">Vote on what we add next</h3>
                            <p className="text-sm text-gray-300">Tell us which devices you want. The most requested come first.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FaqSection
                className="mx-auto max-w-3xl px-6 py-24"
                ids={["waitlist-status", "pricing-how", "pricing-deposit", "buying-keep", "first-device-new", "swaps-how"]}
            />

            <FinalCta className="px-6 pb-24" />
        </div>
    );
}
