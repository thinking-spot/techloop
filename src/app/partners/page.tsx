import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, TrendingUp, Users, Database, Shield, Zap, Globe, AlertTriangle, Layers, RotateCw, Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";
import PartnerContactForm from "./PartnerContactForm";
import RotatingHeadline from "./RotatingHeadline";

export const metadata: Metadata = {
    title: "Partner with Techloop - Distribution-as-a-Service",
    description: "Techloop helps AI wearable manufacturers turn 1 device into 3+ ecosystem users. We offer committed volume, 0% returns, and immediate sell-through.",
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

export default function PartnersPage() {
    return (
        <div className="bg-white min-h-screen pb-20">

            {/* Hero Section */}
            <section className="relative px-6 pt-12 md:px-12 lg:pt-20">
                <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-[#0F172A] p-8 md:p-20 text-center border border-[#334155] shadow-2xl relative overflow-hidden text-white">
                    {/* Background decorative blob */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3DA9FC]/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#3DA9FC]/5 blur-[100px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2" />

                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium text-cyan-300 mb-8">
                        <Zap size={16} /> Distribution-as-a-Service
                    </div>

                    <h1 className="relative mx-auto mb-6 font-display text-[40px] font-bold leading-tight md:text-[56px] max-w-4xl">
                        Partner with Techloop <br />
                        <RotatingHeadline />
                    </h1>
                    <p className="relative mx-auto mb-10 text-[20px] md:text-[24px] text-slate-300 max-w-3xl leading-relaxed">
                        Acquiring customers is about more than the MSRP of your hardware. It’s about the LTV of users in your ecosystem.
                    </p>

                    <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="#contact">
                            <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg bg-[#3DA9FC] hover:bg-[#094067] border-0 text-white shadow-lg shadow-cyan-500/20">
                                Become a Launch Partner
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* The Problem: The Hardware Trap */}
            <section className="px-6 md:px-12 py-24 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold uppercase tracking-wide mb-4">The Problem</div>
                        <h2 className="font-display text-4xl font-bold text-headline mb-4">The &quot;Hardware Gateway Trap&quot;</h2>
                        <p className="text-xl text-paragraph max-w-2xl mx-auto">
                            If you ship 10,000 devices, you’re lucky to retain 6,000 users. CAC outpaces cash flow. Realizing the LTV takes a lifetime.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-[#FFF4F4] p-8 rounded-2xl border border-red-100">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-headline mb-2">Limited Reach</h3>
                            <p className="text-paragraph">
                                In the traditional model, user acquisition is limited: <b>1 device = 1 user</b>. You lose valuation as the gap between CAC and LTV widens.
                            </p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-[#FFF4F4] p-8 rounded-2xl border border-red-100">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
                                <AlertTriangle size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-headline mb-2">High Friction</h3>
                            <p className="text-paragraph">
                                Device <b>return rates</b> for AI wearables range from <b>20-30%</b>. That&apos;s a massive drain on your logistics and margins.
                            </p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-[#FFF4F4] p-8 rounded-2xl border border-red-100">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
                                <Layers size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-headline mb-2">Shelf Death</h3>
                            <p className="text-paragraph">
                                Another <b>20-30%</b> of inventory suffers <b>shelf death</b> — sold, but never <i>used</i>. No recurring revenue. No LTV.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Solution: The Multiplier Effect */}
            <section className="px-6 md:px-12 py-24 bg-[#F8FAFC]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-block px-3 py-1 bg-[#E0F2FE] text-[#3DA9FC] rounded-full text-sm font-bold uppercase tracking-wide mb-4">The Solution</div>
                            <h2 className="font-display text-4xl font-bold text-headline mb-6">The Multiplier Effect</h2>
                            <p className="text-xl text-paragraph mb-8 leading-relaxed">
                                Techloop solves the CAC crisis by separating the asset from the acquisition. We don&apos;t just distribute devices; we distribute <span className="font-bold text-headline">access</span>.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#3DA9FC] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">3x</div>
                                    <div>
                                        <h4 className="font-bold text-headline text-lg">1 Device = 3+ Users</h4>
                                        <p className="text-paragraph">By circulating hardware through our subscription model, a single unit serves multiple subscribers over its lifecycle. 3x your ecosystem acquisition per device.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#3DA9FC] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">4x</div>
                                    <div>
                                        <h4 className="font-bold text-headline text-lg">4x Your TAM</h4>
                                        <p className="text-paragraph">We unlock the 95% of consumers who are curious about AI hardware but risk-averse to high upfront costs.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#3DA9FC] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                                        <Globe size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-headline text-lg">The Gateway Framework</h4>
                                        <p className="text-paragraph">We view every device as a gateway to your walled garden. Every day a unit sits on a shelf, that gate is locked. Techloop opens it.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#3DA9FC]/20 to-purple-500/20 rounded-[2rem] transform rotate-3" />
                            <div className="relative bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col items-center justify-center text-center min-h-[400px]">
                                <div className="text-[120px] leading-none mb-4">🚀</div>
                                <h3 className="font-display text-3xl font-bold text-headline mb-2">Switch Mindsets</h3>
                                <p className="text-paragraph text-lg">From <span className="line-through text-slate-400">Cost of Goods Sold</span> <br />to <span className="font-bold text-[#3DA9FC]">Cost of Gateway Won</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partner Benefits */}
            <section className="px-6 md:px-12 py-24 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-headline mb-4">Why Leading Manufacturers Partner With Us</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Benefit 1 */}
                        <div className="p-8 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                                <Check size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-headline mb-3">Guaranteed Revenue & 0% Returns</h3>
                            <p className="text-paragraph mb-4">
                                When Techloop buys a device, it is sold. Period. We guarantee a 0% return rate. If a subscriber cancels, we eat the churn—refurbishing and redeploying the unit ourselves.
                            </p>
                        </div>
                        {/* Benefit 2 - First Touch New */}
                        <div className="p-8 border border-[#3DA9FC]/30 bg-[#F0F9FF] rounded-2xl shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 px-3 py-1 bg-[#3DA9FC] text-white text-xs font-bold rounded-bl-lg">CRITICAL</div>
                            <div className="w-12 h-12 bg-[#3DA9FC] text-white rounded-xl flex items-center justify-center mb-6">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-headline mb-3">&quot;First-Touch New&quot; Brand Protection</h3>
                            <p className="text-paragraph mb-4">
                                We protect your premium brand. Every new Techloop subscriber receives a <strong>brand-new device</strong>, drop-shipped directly from you. We only use refurbished inventory for swaps. You always move new inventory for new acquisition.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Benefit 3 */}
                        <div className="p-8 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-headline mb-3">Competitive Intelligence Dashboard</h3>
                            <p className="text-paragraph mb-4">
                                Get data you cannot buy on the open market. Switching data, retention benchmarks, and user personas. Know exactly why a user churned from a competitor to you.
                            </p>
                        </div>
                        {/* Benefit 4 */}
                        <div className="p-8 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                                <Leaf size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-headline mb-3">ESG & Social Impact</h3>
                            <p className="text-paragraph mb-4">
                                Turn distribution into a sustainability engine. For every 1,000 users served, we prevent 400 redundant devices. Plus, we lower the barrier to entry by 93%, bridging the digital divide.
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            {/* FAQ Section */}
            <section className="px-6 md:px-12 py-24 bg-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-display text-3xl font-bold text-headline mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-8">
                        <div>
                            <h4 className="font-bold text-headline text-lg mb-2">Won&apos;t this cannibalize my direct sales?</h4>
                            <p className="text-paragraph text-lg leading-relaxed">
                                The customer willing to drop $700 on AI hardware is a tiny demographic. You've already acquired them. Techloop unlocks the mass market that is curious but risk-averse and cost-conscious.
                            </p>
                        </div>
                        <div className="w-full h-px bg-slate-100" />
                        <div>
                            <h4 className="font-bold text-headline text-lg mb-2">Why the Ecosystem Acquisition Bounty?</h4>
                            <p className="text-paragraph text-lg leading-relaxed">
                                Retailers sell hardware and marked up product protection plans – they don't care if the customer uses it. We sell adoption. The CAC bounty is for acquiring ecosystem users - you only pay when we deliver an active user.
                            </p>
                        </div>
                        <div className="w-full h-px bg-slate-100" />
                        <div>
                            <h4 className="font-bold text-headline text-lg mb-2">You guarantee 0% returns?</h4>
                            <p className="text-paragraph text-lg leading-relaxed">
                                Yes, we recognize that 20% return rate is a massive cost for our partners. So we built our business model to make returns profitable. It's good for everyone.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer / Contact CTA */}
            <PartnerContactForm />

            <section className="bg-headline py-12 px-6 text-center">
                <p className="text-slate-400 mb-4">Ready to separate the asset from the acquisition?</p>
                <Link href="#contact" className="text-[#3DA9FC] font-bold hover:underline">
                    Request Partner Term Sheet &rarr;
                </Link>
            </section>

        </div>
    );
}
