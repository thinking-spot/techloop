"use client";

import Link from "next/link";
import { CheckCircle2, TrendingUp, Users, Database, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PartnersPage() {
    return (
        <div className="bg-white min-h-screen pb-20">

            {/* Hero Section */}
            <section className="relative px-6 pt-12 md:px-12 lg:pt-20">
                <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-gradient-to-br from-[#0A1F44] via-[#0F172A] to-[#1E293B] p-8 md:p-20 text-center border border-[#334155] shadow-2xl relative overflow-hidden text-white">
                    {/* Background decorative blob */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3DA9FC]/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium text-cyan-300 mb-8">
                        <Zap size={16} /> For Hardware Manufacturers
                    </div>

                    <h1 className="relative mx-auto mb-6 font-display text-[40px] font-bold leading-tight md:text-[48px]">
                        Stop Paying $2,000 CAC. <br />
                        <span className="text-[#3DA9FC]">Partner with TechLoop.</span>
                    </h1>
                    <p className="relative mx-auto mb-10 text-[20px] md:text-[22px] text-slate-300 max-w-3xl leading-relaxed">
                        Distribute your AI hardware to qualified early adopters. We handle the logistics, you get the data.
                        Join XREAL, Oura, and others in the new distribution model.
                    </p>

                    <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="#contact">
                            <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg bg-[#3DA9FC] hover:bg-[#094067] border-0 text-white">
                                Become a Partner
                            </Button>
                        </Link>
                        <Link href="#how-it-works">
                            <Button variant="tertiary" className="w-full sm:w-auto text-white hover:bg-white/10">
                                How it Works
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* The Problem / Solution Grid */}
            <section id="how-it-works" className="px-6 md:px-12 py-24">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                        <div className="space-y-6">
                            <h2 className="font-display text-4xl font-bold text-headline">The Old Way is Broken</h2>
                            <p className="text-xl text-paragraph">Hardware startups are dying from Customer Acquisition Costs (CAC). You build unmatched tech, but validiating it costs a fortune.</p>

                            <div className="space-y-4">
                                <div className="flex gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                                    <div>
                                        <h4 className="font-bold text-red-900 mb-1">High CAC</h4>
                                        <p className="text-red-700/80 text-sm">Paying $1,500+ in ads to sell a $400 device is unsustainable.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                                    <div>
                                        <h4 className="font-bold text-red-900 mb-1">Slow Feedback</h4>
                                        <p className="text-red-700/80 text-sm">Waiting months for Amazon reviews that don&apos;t tell you <em>why</em> they returned it.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-[2rem] transform rotate-3" />
                            <div className="relative bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
                                <h3 className="font-display text-2xl font-bold text-headline mb-6">The TechLoop Advantage</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#3DA9FC] mt-1" />
                                        <div>
                                            <span className="font-bold text-headline block">Zero Consumer CAC</span>
                                            <span className="text-paragraph text-sm">We place devices with vetted, paying subscribers.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#3DA9FC] mt-1" />
                                        <div>
                                            <span className="font-bold text-headline block">Paid Placement Fees</span>
                                            <span className="text-paragraph text-sm">We often pay <em>you</em> to stock your inventory.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#3DA9FC] mt-1" />
                                        <div>
                                            <span className="font-bold text-headline block">Deep Usage Data</span>
                                            <span className="text-paragraph text-sm">Know exactly how often your device is used, charged, and paired.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Metrics Section */}
            <section className="bg-headline text-white py-24 px-6 md:px-12">
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-white">Data You Can&apos;t Get Anywhere Else</h2>
                    <p className="text-xl text-blue-100/80">Our Competitive Intelligence dashboard gives you the edge.</p>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
                        <TrendingUp className="text-[#3DA9FC] mb-4" size={32} />
                        <h3 className="text-xl font-bold mb-2 text-white">Retention Curves</h3>
                        <p className="text-sm text-slate-300">See exactly when users stop using your device vs. competitors.</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
                        <Users className="text-[#3DA9FC] mb-4" size={32} />
                        <h3 className="text-xl font-bold mb-2 text-white">Demographic Fit</h3>
                        <p className="text-sm text-slate-300">Understand your ideal customer profile based on real rental behavior.</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
                        <Database className="text-[#3DA9FC] mb-4" size={32} />
                        <h3 className="text-xl font-bold mb-2 text-white">Feature Usage</h3>
                        <p className="text-sm text-slate-300">Which features drive adoption? Which ones are ignored?</p>
                    </div>
                </div>
            </section>

            {/* Enterprise Pilot Section */}
            <section className="px-6 md:px-12 py-24 bg-slate-50">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full text-sm font-bold text-headline mb-8 uppercase tracking-wide">
                        <Globe size={14} /> Enterprise Pilot Infrastructure
                    </div>
                    <h2 className="font-display text-4xl font-bold text-headline mb-6">Scale into the Enterprise</h2>
                    <p className="text-xl text-paragraph mb-12 max-w-2xl mx-auto">
                        We facilitate pilots with Fortune 500 companies. Get your hardware into the hands of decision makers at Salesforce, Atlassian, and Goldman Sachs.
                    </p>

                    <div className="grid md:grid-cols-4 gap-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Mock Logos - usually you'd use SVGs */}
                        <div className="h-20 bg-white rounded-xl flex items-center justify-center font-bold text-xl border">Salesforce</div>
                        <div className="h-20 bg-white rounded-xl flex items-center justify-center font-bold text-xl border">Atlassian</div>
                        <div className="h-20 bg-white rounded-xl flex items-center justify-center font-bold text-xl border">McKinsey</div>
                        <div className="h-20 bg-white rounded-xl flex items-center justify-center font-bold text-xl border">Shopify</div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact" className="px-6 md:px-12 py-24">
                <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 p-8 md:p-16">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-headline mb-4">Partner with TechLoop</h2>
                        <p className="text-paragraph">Tell us about your hardware. We&apos;ll tell you if it&apos;s a fit for our fleet.</p>
                    </div>

                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-headline">Company Name</label>
                                <input className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#3DA9FC] outline-none transition-all" placeholder="e.g. Acme Robotics" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-headline">Website</label>
                                <input className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#3DA9FC] outline-none transition-all" placeholder="https://" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-headline">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#3DA9FC] outline-none transition-all" placeholder="partner@company.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-headline">Message</label>
                            <textarea className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#3DA9FC] outline-none transition-all h-32" placeholder="Tell us what you&apos;re building..." />
                        </div>

                        <Button size="lg" className="w-full text-lg py-6">
                            Submit Inquiry <ArrowRight className="ml-2" />
                        </Button>

                        <p className="text-center text-xs text-slate-400 mt-4">
                            <ShieldCheck className="inline w-3 h-3 mr-1" />
                            Your IP is safe. We sign NDAs for all hardware previews.
                        </p>
                    </form>
                </div>
            </section>

        </div>
    );
}
