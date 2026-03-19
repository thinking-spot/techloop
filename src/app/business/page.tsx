"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, ArrowRight, TrendingUp, Users, Database, Shield, Zap, Globe, AlertTriangle, Layers, RotateCw, Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";

const INDUSTRIES = [
    { name: "Sales Teams", icon: "📊", desc: "Equip reps with AI wearables that transcribe calls, surface insights, and close deals faster." },
    { name: "Drivers & Fleet", icon: "🚛", desc: "Hands-free AI assistants for navigation, dispatch, and real-time route optimization." },
    { name: "Paralegals", icon: "⚖️", desc: "AI-powered devices that translate and transcribe in 120 languages." },
    { name: "Customer Support", icon: "🎧", desc: "Smart devices with real-time agent enablement and knowledge retrieval." },
    { name: "Healthcare", icon: "🏥", desc: "HIPAA-aware AI devices for clinical notes, care coordination, and outcome optimization." },
    { name: "Education", icon: "🎓", desc: "Adaptive learning and teaching devices for classrooms, lesson prep, and remote instruction." },
    { name: "Medical Research", icon: "🔬", desc: "Healthcare AI devices for real-time data, patient monitoring, and cohort research." },
    { name: "Content & Influencers", icon: "🎬", desc: "Powerful AI tools for live content creation and sharing, entirely hands-free." },
    { name: "Field Techs", icon: "🔧", desc: "Rugged AI devices with visual diagnostics, manuals on demand, and remote expert support." },
    { name: "Engineers", icon: "💻", desc: "Cutting-edge AI coding companions and substrates — build before committing." },
];

const FEATURES = [
    {
        title: "Your Team Dashboard",
        subtitle: "Live visibility, user privacy",
        desc: "Monitor device status, usage trends, and team adoption metrics from one centralized dashboard. All user data is anonymized — you see what matters without compromising individual privacy.",
        icon: <Users size={24} />,
        color: "text-[#3DA9FC]",
        bg: "bg-[#E0F2FE]"
    },
    {
        title: "Easy Team Management",
        subtitle: "Add, remove, reassign, easy",
        desc: "Spin up a cohort of any size in minutes. Add team members, assign devices, track shipments, and manage returns — all from a single, intuitive admin panel.",
        icon: <Layers size={24} />,
        color: "text-purple-600",
        bg: "bg-purple-50"
    },
    {
        title: "Free Device Switching",
        subtitle: "Everyone finds a perfect fit",
        desc: "Team members can swap to a different AI device anytime within your rental period. Not the right form factor? Wrong ecosystem? No problem — switch until every person has exactly what works for them.",
        icon: <RotateCw size={24} />,
        color: "text-green-600",
        bg: "bg-green-50"
    },
    {
        title: "Love It? Keep It.",
        subtitle: "Buy any device at a discount",
        desc: "When your team finds the AI devices they can't live without, purchase them outright at a discounted rate. Each member can keep whichever device they love — no bulk uniformity required.",
        icon: <TrendingUp size={24} />,
        color: "text-amber-600",
        bg: "bg-amber-50"
    },
    {
        title: "No Min. Or Max.",
        subtitle: "Rent 1 device or 1,000",
        desc: "Select any number of AI devices from our catalog of 20+ products across 6 categories. There are no minimum orders, no forced bundles. Scale up or down as your needs change.",
        icon: <Database size={24} />,
        color: "text-rose-600",
        bg: "bg-rose-50"
    },
    {
        title: "Your Accounts. Your Data.",
        subtitle: "Cutting edge AI, on your terms",
        desc: "Every AI device user account, subscription, and dataset belongs entirely to your organization. We own the physical device — that's it. Whether you return or buy, your data stays yours.",
        icon: <Shield size={24} />,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
];

export default function BusinessPage() {
    const [activeIndustry, setActiveIndustry] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndustry((prev) => (prev + 1) % INDUSTRIES.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white min-h-screen pb-20 overflow-x-hidden">

            {/* Hero Section */}
            <section className="relative px-6 pt-10 md:px-12 lg:pt-20">
                <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-[#0F172A] p-8 pt-16 pb-12 md:p-20 text-center border border-[#334155] shadow-2xl relative overflow-hidden text-white">
                    {/* Background decorative blob */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3DA9FC]/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2" />

                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium text-cyan-300 mb-8">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        AI DEVICES FOR ENTERPRISE & SMBs
                    </div>

                    <h1 className="relative mx-auto mb-6 font-display text-[44px] md:text-[64px] font-bold leading-[1.05] tracking-tight max-w-4xl">
                        Give your team the best <br />
                        <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#38BDF8,#818CF8,#C084FC)] bg-[length:200%_200%] animate-[bg-position_6s_ease_infinite]">AI devices for business</span>
                    </h1>

                    <p className="relative mx-auto mb-10 text-[18px] md:text-[20px] text-slate-300 max-w-2xl leading-relaxed">
                        Rent cutting-edge AI hardware for your entire team. Everyone finds their perfect device, you keep full control, and nobody gets locked in.
                    </p>

                    <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="https://calendar.app.google/T6jpQJfSbEkuAxeo8">
                            <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg bg-[linear-gradient(135deg,#38BDF8,#818CF8)] hover:scale-[1.02] transition-transform border-0 text-white shadow-lg shadow-cyan-500/20">
                                Start a Team Rental <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="#how-it-works">
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 py-6 text-lg text-white border-white/20 hover:bg-white/5 bg-transparent shadow-none hover:border-cyan-400 transition-colors">
                                See How It Works
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features (Built for teams that move fast) */}
            <section className="px-6 md:px-12 py-24 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="w-16 h-1 bg-[linear-gradient(90deg,#38BDF8,#818CF8)] rounded-full mx-auto mb-6" />
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-headline mb-4 tracking-tight">Built for teams that move fast</h2>
                        <p className="text-xl text-paragraph max-w-2xl mx-auto">
                            Everything you need to equip, manage, and optimize AI devices across your organization.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {FEATURES.map((f, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl border border-[#F1F5F9] shadow-lg shadow-[#094067]/5 hover:shadow-xl hover:shadow-button/10 hover:border-button/20 transition-all duration-300 hover:-translate-y-1">
                                <div className={`w-14 h-14 ${f.bg} ${f.color} rounded-2xl flex items-center justify-center mb-6`}>
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-bold text-headline mb-1 font-display tracking-tight">{f.title}</h3>
                                <p className="text-xs font-semibold text-button uppercase tracking-wider mb-4 font-mono">{f.subtitle}</p>
                                <p className="text-paragraph text-sm leading-relaxed">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dashboard Preview Section */}
            <section className="px-6 md:px-12 py-24 bg-[#F8FAFC]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="w-16 h-1 bg-[linear-gradient(90deg,#38BDF8,#818CF8)] rounded-full mb-6" />
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-headline mb-6 tracking-tight">AI-enabled teams, <br></br>at a glance</h2>
                            <p className="text-lg text-paragraph mb-8 leading-relaxed">
                                The Techloop Business Dashboard gives you real-time visibility into every device in your fleet — without compromising individual privacy. Track device status, monitor adoption curves, and spot underutilized hardware before it becomes waste.
                            </p>

                            <div className="space-y-4">
                                {["Live device & user status", "Anonymized usage analytics", "Swap & return tracking", "Cost center allocation"].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-md bg-[#E0F2FE] text-button flex items-center justify-center flex-shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        <span className="font-medium text-headline">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Interactive-looking mock dashboard */}
                        <div className="bg-white rounded-2xl shadow-xl shadow-[#094067]/10 border border-[#E2E8F0] overflow-hidden relative group">
                            <div className="h-1.5 w-full bg-[linear-gradient(90deg,#38BDF8,#818CF8,#C084FC)]" />
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <div className="text-xs font-mono font-bold text-paragraph/50 mb-1 tracking-wider uppercase">Team Overview</div>
                                        <div className="text-xl font-bold text-headline">Acme Sales — Q1 Cohort</div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-xs font-bold text-green-700">12 active</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-3 mb-8">
                                    {[
                                        { label: "Devices", val: "14", color: "text-[#3DA9FC]" },
                                        { label: "Active", val: "12", color: "text-green-500" },
                                        { label: "Swaps", val: "3", color: "text-amber-500" },
                                        { label: "Bought", val: "2", color: "text-purple-500" },
                                    ].map((m, i) => (
                                        <div key={i} className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-xl p-3 text-center transition-colors group-hover:border-[#E0F2FE]">
                                            <div className={`text-2xl font-bold font-mono ${m.color}`}>{m.val}</div>
                                            <div className="text-[10px] font-bold text-paragraph/60 uppercase tracking-wider mt-1">{m.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <div className="text-[10px] font-mono font-bold text-paragraph/50 mb-4 tracking-wider uppercase">Weekly Usage Trend</div>
                                    <div className="flex items-end gap-2 h-24">
                                        {[45, 62, 58, 75, 80, 72, 88].map((h, i) => (
                                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                                <div className="w-full h-full flex flex-col justify-end bg-slate-50 rounded-t-sm group-hover:bg-[#F0F9FF]/50 transition-colors">
                                                    <div className="w-full bg-[linear-gradient(180deg,#38BDF8,rgba(56,189,248,0.2))] rounded-t-sm transition-all duration-700 ease-out" style={{ height: `${h}%` }} />
                                                </div>
                                                <span className="text-[9px] font-bold text-paragraph/40">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industries Grid */}
            <section className="px-6 md:px-12 py-24 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="w-16 h-1 bg-[linear-gradient(90deg,#38BDF8,#818CF8)] rounded-full mx-auto mb-6" />
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-headline mb-4 tracking-tight">AI tools for every team</h2>
                        <p className="text-xl text-paragraph max-w-2xl mx-auto">
                            From field operations to executive suites — Techloop equips any role with the right AI hardware.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center mb-12 max-w-4xl mx-auto">
                        {INDUSTRIES.map((ind, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndustry(i)}
                                className={`
                                    flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-medium transition-all duration-300
                                    ${activeIndustry === i
                                        ? "bg-[linear-gradient(135deg,rgba(56,189,248,0.1),rgba(129,140,248,0.1))] border-[#3DA9FC]/30 text-headline shadow-sm"
                                        : "bg-white border-[#F1F5F9] text-paragraph hover:border-[#3DA9FC]/30 hover:bg-[#F0F9FF]"
                                    }
                                `}
                            >
                                <span className="text-xl">{ind.icon}</span>
                                {ind.name}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white p-10 md:p-14 rounded-[2rem] border border-[#F1F5F9] shadow-xl shadow-[#094067]/5 text-center max-w-2xl mx-auto">
                        <div className="text-6xl mb-6 animate-[float_3s_ease-in-out_infinite]">
                            {INDUSTRIES[activeIndustry].icon}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-headline mb-4 font-display">
                            {INDUSTRIES[activeIndustry].name}
                        </h3>
                        <p className="text-lg text-paragraph leading-relaxed">
                            {INDUSTRIES[activeIndustry].desc}
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works Steps */}
            <section className="px-6 md:px-12 py-24 bg-[#F8FAFC]" id="how-it-works">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="w-16 h-1 bg-[linear-gradient(90deg,#38BDF8,#818CF8)] rounded-full mx-auto mb-6" />
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-headline mb-4 tracking-tight">Up and running in 4 steps</h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Choose Devices", desc: "Browse 20+ AI devices. Pick any combination, any quantity — there are no minimums or bundles." },
                            { step: "02", title: "Build a Team", desc: "Add team members, assign devices, and configure your dashboard. We ship directly to each person." },
                            { step: "03", title: "Fit and Swap", desc: "Everyone tries AI devices risk-free. They can switch to different devices until they find the perfect fit." },
                            { step: "04", title: "Keep or Return", desc: "Love it? Buy at a team discount. Done? Return with free shipping. Everyone can decide for themselves." },
                        ].map((s, i) => (
                            <div key={i} className="relative p-8 bg-white rounded-3xl border border-[#F1F5F9] shadow-sm">
                                <div className="absolute top-0 left-8 w-12 h-1 bg-button rounded-b-md" />
                                <div className="font-mono text-4xl font-bold text-[#E0F2FE] mb-4 mt-2">{s.step}</div>
                                <h3 className="text-xl font-bold text-headline mb-3">{s.title}</h3>
                                <p className="text-sm text-paragraph leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-4 md:px-12 py-24">
                <div className="rounded-[2.5rem] bg-headline px-4 py-24 text-center text-white md:px-16 overflow-hidden relative max-w-7xl mx-auto shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[bg-position_15s_ease-in-out_infinite]" />

                    <h2 className="relative font-display text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Ready to equip your team?</h2>
                    <p className="relative mb-12 text-white/80 max-w-xl mx-auto text-lg md:text-xl">
                        No commitments. No minimums. Start with one device or one hundred.
                    </p>
                    <div className="relative flex flex-col items-center justify-center gap-4 sm:flex-row mb-6">
                        <Link href="https://calendar.app.google/T6jpQJfSbEkuAxeo8">
                            <Button size="lg" className="px-8 py-6 text-base bg-button text-white border-0 hover:bg-[#2D8FDC] shadow-lg shadow-button/20 hover:shadow-button/40">
                                Start a Team Rental <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="https://calendar.app.google/T6jpQJfSbEkuAxeo8">
                            <Button variant="tertiary" size="lg" className="px-8 py-6 text-base text-white hover:text-white/80 hover:bg-white/10">
                                Talk to Sales
                            </Button>
                        </Link>
                    </div>
                    <p className="relative text-sm font-medium text-white/50 uppercase tracking-widest">
                        Free setup · No minimum order · Cancel anytime
                    </p>
                </div>
            </section>
        </div>
    );
}
