import Link from "next/link";
import type { Metadata } from "next";
import {
    Check,
    Search,
    HelpCircle,
    RefreshCcw,
    ArrowRight,
    Shield,
    Truck,
    RotateCw,
    Zap,
    Box
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "How Techloop Works | Rent, Try, Swap Buy | AI Wearables",
    description: "Pick a device. Try it for $42/mo. Swap for a different one. Or keep it and buy it. No long-term commitments.",
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

export default function HowItWorksPage() {
    return (
        <div className="bg-white min-h-screen pb-20">

            {/* Hero */}
            <section className="relative px-6 pt-10 md:px-12 lg:pt-20">
                <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-[linear-gradient(135deg,#F0F9FF_0%,#E6F4FE_50%,#F1F5F9_100%)] p-8 pt-16 pb-12 md:p-20 text-center border border-[#BAE6FD]/40 shadow-sm relative overflow-hidden">
                    {/* Background decorative blob */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3DA9FC]/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

                    <h1 className="relative mx-auto mb-6 font-display text-[44px] font-bold leading-[1.05] tracking-tight text-headline md:text-[54px]">
                        Rent-to-own AI devices. <br className="hidden md:block" />Swap anytime.
                    </h1>
                    <p className="relative mx-auto mb-10 text-[18px] md:text-[20px] text-paragraph max-w-2xl leading-relaxed">
                        $42/month. No commitment. Pick any device and try it for real. If you love it, keep it.
                    </p>


                    <div className="relative grid grid-cols-2 md:flex md:flex-row justify-center items-center gap-3 text-sm font-medium text-paragraph/80 max-w-[320px] md:max-w-none mx-auto">
                        <div className="flex items-center justify-center gap-2 bg-white px-3 py-2.5 rounded-xl shadow-sm border border-[#F1F5F9] whitespace-nowrap">
                            <Truck size={16} className="text-[#22C55E]" /> 2-3 day shipping
                        </div>
                        <div className="flex items-center justify-center gap-2 bg-white px-3 py-2.5 rounded-xl shadow-sm border border-[#F1F5F9] whitespace-nowrap">
                            <Check size={16} className="text-[#22C55E]" /> Rent-to-own
                        </div>
                        <div className="flex items-center justify-center gap-2 bg-white px-3 py-2.5 rounded-xl shadow-sm border border-[#F1F5F9] whitespace-nowrap">
                            <RefreshCcw size={16} className="text-[#22C55E]" /> Free swaps
                        </div>
                        <div className="flex items-center justify-center gap-2 bg-white px-3 py-2.5 rounded-xl shadow-sm border border-[#F1F5F9] whitespace-nowrap">
                            <Shield size={16} className="text-[#22C55E]" /> Cancel anytime
                        </div>
                    </div>
                </div>
            </section>

            {/* 4-Step Process */}
            <section className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E0F2FE]/40 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#3DA9FC]/5 blur-[100px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-block px-4 py-1.5 bg-[#F0F9FF] text-button text-sm font-bold uppercase tracking-wider rounded-full mb-6 border border-[#E0F2FE]">The Process</div>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-headline mb-6 tracking-tight">How Techloop works</h2>
                        <p className="text-paragraph text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Techloop is like Netflix for DVDs, but for AI wearables. Rent monthly, swap anytime, only buy what you love.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent -z-10" />

                        {/* Step 1 */}
                        <div className="group text-center bg-white p-8 rounded-3xl border border-[#F1F5F9] shadow-lg shadow-[#094067]/5 hover:shadow-xl hover:shadow-button/10 transition-all duration-300 hover:-translate-y-2">
                            <div className="w-28 h-28 bg-[#F8FAFC] group-hover:bg-[#E0F2FE] transition-colors rounded-full flex items-center justify-center mx-auto mb-8 text-headline group-hover:text-button border-4 border-white shadow-md relative">
                                <Search size={36} className="relative z-10" />
                                <div className="absolute inset-0 bg-button/0 group-hover:bg-button/5 rounded-full transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-headline mb-3 font-display">1. Choose a device</h3>
                            <p className="text-paragraph text-sm md:text-base mb-6 leading-relaxed">
                                Take our quiz or browse the catalog. Find your match.
                            </p>
                            <div className="inline-block px-3 py-1 bg-[#F8FAFC] rounded-lg text-xs font-semibold text-button uppercase tracking-wide border border-[#F1F5F9]">Brand New Device</div>
                        </div>

                        {/* Step 2 */}
                        <div className="group text-center bg-white p-8 rounded-3xl border border-[#F1F5F9] shadow-lg shadow-[#094067]/5 hover:shadow-xl hover:shadow-button/10 transition-all duration-300 hover:-translate-y-2">
                            <div className="w-28 h-28 bg-[#F8FAFC] group-hover:bg-[#E0F2FE] transition-colors rounded-full flex items-center justify-center mx-auto mb-8 text-headline group-hover:text-button border-4 border-white shadow-md relative">
                                <Box size={36} className="relative z-10" />
                                <div className="absolute inset-0 bg-button/0 group-hover:bg-button/5 rounded-full transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-headline mb-3 font-display">2. Try for 30 days</h3>
                            <p className="text-paragraph text-sm md:text-base mb-6 leading-relaxed">
                                Use it for real in daily life. Find your "aha" moment.
                            </p>
                            <div className="inline-block px-3 py-1 bg-[#F8FAFC] rounded-lg text-xs font-semibold text-button uppercase tracking-wide border border-[#F1F5F9]">30-Day Minimum</div>
                        </div>

                        {/* Step 3 */}
                        <div className="group text-center bg-white p-8 rounded-3xl border border-[#F1F5F9] shadow-lg shadow-[#094067]/5 hover:shadow-xl hover:shadow-button/10 transition-all duration-300 hover:-translate-y-2">
                            <div className="w-28 h-28 bg-[#F8FAFC] group-hover:bg-[#E0F2FE] transition-colors rounded-full flex items-center justify-center mx-auto mb-8 text-headline group-hover:text-button border-4 border-white shadow-md relative">
                                <HelpCircle size={36} className="relative z-10" />
                                <div className="absolute inset-0 bg-button/0 group-hover:bg-button/5 rounded-full transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold text-headline mb-3 font-display">3. It's your call</h3>
                            <p className="text-paragraph text-sm md:text-base mb-6 leading-relaxed">
                                Keep renting, buy for a discount, or swap it.
                            </p>
                            <div className="inline-block px-3 py-1 bg-[#F8FAFC] rounded-lg text-xs font-semibold text-button uppercase tracking-wide border border-[#F1F5F9]">Flexible Options</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deep Dive Sections */}
            <section className="bg-[#F8FAFC] py-20 px-6">
                <div className="max-w-6xl mx-auto space-y-20">

                    {/* Security Deposit & Rent to Own */}
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Security Deposit */}
                        <div className="bg-white p-8 rounded-2xl shadow-card border border-[#F1F5F9]">
                            <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-headline mb-4">
                                <Shield size={28} className="text-button" /> Security Deposit
                            </h3>
                            <p className="text-paragraph mb-6">
                                We collect a refundable deposit ($42) to protect our devices and keep the balance sheet healthy.
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
                        <div className="bg-white p-8 rounded-2xl shadow-card border border-[#F1F5F9]">
                            <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-headline mb-4">
                                <RefreshCcw size={28} className="text-button" /> Rent-to-Own
                            </h3>
                            <p className="text-paragraph mb-6">
                                Fall in love? Keep it. Your rental payments count toward the purchase price.
                            </p>
                            <div className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0] text-sm">
                                <div className="flex justify-between mb-2">
                                    <span className="text-paragraph">Retail Price:</span>
                                    <span className="font-bold text-headline line-through">$400</span>
                                </div>
                                <div className="flex justify-between mb-4 pb-4 border-b border-[#E2E8F0]">
                                    <span className="text-paragraph">You paid (3 mos rental):</span>
                                    <span className="font-bold text-success">-$126</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-headline">Buyout Price:</span>
                                    <span className="font-bold text-2xl text-button">$274</span>
                                </div>
                                <p className="text-xs text-paragraph mt-4">
                                    *Example for XREAL Air 2 Pro after 3 months.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* After 30 Days Options */}
                    <div className="pt-10">
                        <div className="text-center mb-16">
                            <div className="inline-block px-4 py-1.5 bg-[#F0F9FF] text-button text-sm font-bold uppercase tracking-wider rounded-full mb-6 border border-[#E0F2FE]">Flexible Future</div>
                            <h2 className="font-display text-4xl font-bold text-headline mb-4 tracking-tight">After 30 Days, It&apos;s Up To You</h2>
                            <p className="text-paragraph text-lg md:text-xl">Most users try 2+ devices before finding the perfect fit.</p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F1F5F9] hover:border-button/40 hover:shadow-[0_8px_30px_rgba(61,169,252,0.1)] transition-all duration-300">
                                <div className="w-14 h-14 bg-[#F0F9FF] rounded-xl flex items-center justify-center text-button mb-6">
                                    <RotateCw size={28} />
                                </div>
                                <h4 className="font-bold text-headline text-xl mb-3 font-display">Keep Renting</h4>
                                <p className="text-paragraph leading-relaxed">Continue monthly payments. Cancel anytime.</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F1F5F9] hover:border-button/40 hover:shadow-[0_8px_30px_rgba(61,169,252,0.1)] transition-all duration-300">
                                <div className="w-14 h-14 bg-[#F0F9FF] rounded-xl flex items-center justify-center text-button mb-6">
                                    <Check size={28} />
                                </div>
                                <h4 className="font-bold text-headline text-xl mb-3 font-display">Buy It</h4>
                                <p className="text-paragraph leading-relaxed">Purchase at a discount based on rental duration.</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F1F5F9] hover:border-button/40 hover:shadow-[0_8px_30px_rgba(61,169,252,0.1)] transition-all duration-300">
                                <div className="w-14 h-14 bg-[#F0F9FF] rounded-xl flex items-center justify-center text-button mb-6">
                                    <RefreshCcw size={28} />
                                </div>
                                <h4 className="font-bold text-headline text-xl mb-3 font-display">Swap</h4>
                                <p className="text-paragraph leading-relaxed">Try a different device. 4 free swaps/year.</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F1F5F9] hover:border-button/40 hover:shadow-[0_8px_30px_rgba(61,169,252,0.1)] transition-all duration-300">
                                <div className="w-14 h-14 bg-[#F0F9FF] rounded-xl flex items-center justify-center text-button mb-6">
                                    <Zap size={28} />
                                </div>
                                <h4 className="font-bold text-headline text-xl mb-3 font-display">Return</h4>
                                <p className="text-paragraph leading-relaxed">Send it back and get your deposit refunded.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* FAQ Preview */}
            <section className="py-24 px-6 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl font-bold text-headline mb-4 tracking-tight">Common Questions</h2>
                    <p className="text-paragraph text-lg">Everything you need to know about how Techloop works.</p>
                </div>
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F1F5F9] group hover:border-[#E0F2FE] transition-colors">
                        <h4 className="font-bold text-headline text-xl mb-3 flex items-center gap-3">
                            <span className="text-button group-hover:scale-110 transition-transform">✦</span>
                            Are these actually new devices?
                        </h4>
                        <p className="text-paragraph leading-relaxed md:pl-8">Yes! Your first rental is always a brand new, factory-sealed device. You are the first person to use it.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F1F5F9] group hover:border-[#E0F2FE] transition-colors">
                        <h4 className="font-bold text-headline text-xl mb-3 flex items-center gap-3">
                            <span className="text-button group-hover:scale-110 transition-transform">✦</span>
                            What if I damage it?
                        </h4>
                        <p className="text-paragraph leading-relaxed md:pl-8">Normal wear and tear is covered. Accidental damage (cracks, water) is deducted from your deposit. 98% of users get a full refund.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F1F5F9] group hover:border-[#E0F2FE] transition-colors">
                        <h4 className="font-bold text-headline text-xl mb-3 flex items-center gap-3">
                            <span className="text-button group-hover:scale-110 transition-transform">✦</span>
                            Can I cancel anytime?
                        </h4>
                        <p className="text-paragraph leading-relaxed md:pl-8">Yes. Just return the device within 14 days of cancelling. We refund your deposit within 7 days of receipt.</p>
                    </div>
                </div>
                <div className="text-center mt-12">
                    <Link href="/help" className="text-button font-medium hover:underline inline-flex items-center gap-2">
                        See all FAQs <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            {/* CTA */}
            <section className="px-4 md:px-12 pb-24">
                <div className="rounded-[2.5rem] bg-headline px-4 py-24 text-center text-white md:px-16 overflow-hidden relative max-w-7xl mx-auto shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[bg-position_15s_ease-in-out_infinite]" />

                    <h2 className="relative font-display text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Ready to find the perfect fit?</h2>
                    <p className="relative mb-12 text-white/80 max-w-xl mx-auto text-lg md:text-xl">
                        Start with any device. Swap if you don&apos;t love it. Keep what works.
                    </p>
                    <div className="relative flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href="/browse">
                            <Button size="lg" className="px-8 py-6 text-base bg-button text-white border-0 hover:bg-[#2D8FDC] shadow-lg shadow-button/20 hover:shadow-button/40">
                                Browse Wearables <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/quiz">
                            <Button variant="tertiary" size="lg" className="px-8 py-6 text-base text-white hover:text-white/80 hover:bg-white/10">
                                Take the Quiz
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
