"use client";

import { useState } from "react";
import {
    CheckCircle2,
    Shield,
    CreditCard,
    Gift,
    TrendingUp,
    RefreshCcw,
    Zap,
    HelpCircle,
    AlertCircle,
    ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { joinWaitlist } from "@/app/actions";

export default function WaitlistPage() {
    return (
        <div className="bg-white min-h-screen font-sans text-headline">

            {/* 1. Hero Section */}
            <section className="relative px-6 pt-12 md:px-12 lg:pt-20">
                <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-gradient-to-br from-[#F0F9FF] via-[#E6F4FE] to-[#F1F5F9] p-8 md:p-16 text-center lg:text-left border border-[#BAE6FD]/40 shadow-sm relative overflow-hidden">
                    {/* Background decorative blob */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3DA9FC]/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

                    <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div className="space-y-8">
                            <h1 className="font-display text-[40px] md:text-[48px] font-bold tracking-tight leading-[1.1] text-headline">
                                Get ready to love 💙 <span className="text-button">Techloop 🤖</span>
                            </h1>
                            <p className="text-[18px] md:text-[20px] text-paragraph leading-relaxed font-light">
                                AI glasses, rings, watches, earbuds, pins, and pendants.
                                Try them risk-free before you buy.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm md:text-base font-medium text-paragraph">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="text-button" size={20} /> New devices
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="text-button" size={20} /> 4 free swaps/yr
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="text-button" size={20} /> Rent to keep
                                </div>
                            </div>
                        </div>

                        {/* Waitlist Box */}
                        <div className="bg-white text-headline rounded-2xl p-8 shadow-xl border border-[#BAE6FD]/60 max-w-md mx-auto w-full relative">
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 animate-pulse">
                                    <AlertCircle size={14} /> Limited Spots
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Join the Waitlist</h3>
                                <p className="text-paragraph text-sm">Be the first to know when we launch in Q1 2026.</p>
                            </div>

                            <WaitlistForm />

                            <div className="mt-6 pt-6 border-t border-gray-100">

                            </div>

                            <div className="mt-4 flex justify-center gap-4 text-[10px] text-paragraph uppercase font-bold tracking-wider opacity-60">
                                <span className="flex items-center gap-1"><Shield size={12} /> Secure Data</span>
                                <span className="flex items-center gap-1"><CreditCard size={12} /> No Card Needed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. The Problem */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-headline mb-6">AI wearables are difficult to buy right now</h2>
                    <p className="text-xl text-paragraph leading-relaxed">
                        You want to try Meta Ray-Ban glasses, or maybe XREAL Air Pro. But you have real concerns about committing to an AI device.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
                    <div className="p-6">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">💸</div>
                        <h3 className="text-xl font-bold text-headline mb-4">Too expensive to experiment</h3>
                        <p className="text-paragraph leading-relaxed mb-6">
                            AI glasses cost $400+. Rings are $300. Trying both costs over $750. Why lock yourself in when you can try before you buy?
                        </p>
                        <blockquote className="bg-gray-50 p-4 rounded-xl text-sm text-paragraph italic border-l-4 border-red-200">
                            &quot;I wanted to try XREAL glasses for work, but $3399 is steep for something I might not use.&quot;
                        </blockquote>
                    </div>
                    <div className="p-6">
                        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🤷</div>
                        <h3 className="text-xl font-bold text-headline mb-4">Is this my AI identity?</h3>
                        <p className="text-paragraph leading-relaxed mb-6">
                            AI wearables are more than fashion. The right device should feel like <b>your self</b>. With Techloop, you can try until you find the perfect fit.
                        </p>
                        <blockquote className="bg-gray-50 p-4 rounded-xl text-sm text-paragraph italic border-l-4 border-orange-200">
                            &quot;I bought Meta Ray-Ban, but it just didn&apos;t feel like &apos;me&apos;. Wish I could&apos;ve rented first.&quot;
                        </blockquote>
                    </div>
                    <div className="p-6">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🔄</div>
                        <h3 className="text-xl font-bold text-headline mb-4">Tech moves too fast</h3>
                        <p className="text-paragraph leading-relaxed mb-6">
                            Buy XREAL Air 2 today, Air 3 comes out tomorrow. The upgrade cycle can be brutal. Be an early adopter, every time, for just $48/month.
                        </p>
                        <blockquote className="bg-gray-50 p-4 rounded-xl text-sm text-paragraph italic border-l-4 border-blue-200">
                            &quot;Bought Humane AI Pin for $699 last year. It&apos;s already obsolete. Waste of money.&quot;
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* 3. The Solution */}
            <section className="py-24 px-6 bg-[#F0F9FF]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-button font-bold tracking-wider uppercase text-sm">Introducing TechLoop</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-headline mt-3 mb-6">Netflix for AI Wearables</h2>
                        <p className="text-xl text-paragraph max-w-2xl mx-auto">
                            Try any device for $48/month. Swap again and again. Buy only what you love.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-cyan-100">
                            <CheckCircle2 size={40} className="text-button mb-6" />
                            <h3 className="text-2xl font-bold text-headline mb-4">Try Risk-Free</h3>
                            <p className="text-paragraph mb-6">
                                Rent Meta Ray-Ban for $48/mo instead of $299 upfront. Try for 2 months. Don&apos;t love them? Return free.
                            </p>
                            <div className="bg-green-50 text-green-800 text-sm font-bold px-3 py-1 rounded-full inline-block">
                                Save $200+ vs buying
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-cyan-100">
                            <RefreshCcw size={40} className="text-button mb-6" />
                            <h3 className="text-2xl font-bold text-headline mb-4">Swap Anytime</h3>
                            <p className="text-paragraph mb-6">
                                Try Oura Ring. Swap to Samsung Ring next month. Compare them in real life. 4 free swaps included per year.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-cyan-100">
                            <TrendingUp size={40} className="text-button mb-6" />
                            <h3 className="text-2xl font-bold text-headline mb-4">Always Latest Tech</h3>
                            <p className="text-paragraph mb-6">
                                New model launch? Swap to it immediately. Never get stuck with old hardware again.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. How It Works - Simplified */}
            <section className="py-24 px-6 bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl font-bold text-headline mb-6">How it works</h2>
                        <p className="text-paragraph text-xl">Four steps from curious to confident.</p>
                    </div>

                    <div className="space-y-12 relative">
                        {/* Connector Line */}
                        <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-0.5 bg-gray-100 -translate-x-1/2 z-0"></div>

                        {[
                            { step: "1", title: "Choose a Device", desc: "Browse 20+ devices. Ships in 2-3 days." },
                            { step: "2", title: "Try in Real Life", desc: "Use it for weeks, not minutes. Minimum 30 days." },
                            { step: "3", title: "Decide What's Next", desc: "Keep renting, swap to something else, or buy it." },
                            { step: "4", title: "Repeat", desc: "Most users try 3 devices before buying one." }
                        ].map((item, i) => (
                            <div key={i} className={`flex items-center gap-8 md:gap-16 relative z-10 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse md:flex-row'}`}>
                                <div className={`flex-1 text-center md:text-right hidden md:block ${i % 2 !== 0 ? 'md:order-1' : ''}`}>
                                    {i % 2 === 0 && (
                                        <>
                                            <h3 className="text-2xl font-bold text-headline mb-2">{item.title}</h3>
                                            <p className="text-paragraph">{item.desc}</p>
                                        </>
                                    )}
                                </div>
                                <div className="w-12 h-12 rounded-full bg-button text-white flex items-center justify-center font-bold text-xl shadow-lg ring-4 ring-white shrink-0 mx-auto md:mx-0">
                                    {item.step}
                                </div>
                                <div className={`flex-1 text-center md:text-left ${i % 2 !== 0 ? 'md:order-first' : ''}`}>
                                    <div className="md:hidden mb-2">
                                        <h3 className="text-2xl font-bold text-headline mb-2">{item.title}</h3>
                                        <p className="text-paragraph">{item.desc}</p>
                                    </div>
                                    {i % 2 !== 0 && (
                                        <div className="hidden md:block">
                                            <h3 className="text-2xl font-bold text-headline mb-2">{item.title}</h3>
                                            <p className="text-paragraph">{item.desc}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Benefits */}
            <section className="py-24 px-6 bg-[#0A1F44] text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl font-bold mb-6 text-white">Why Join the Waitlist?</h2>
                        <p className="text-xl text-cyan-100/80">The first 1,000 people to try Techloop get exclusive lifetime perks.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                            <Zap className="text-yellow-400 mb-4" size={32} />
                            <h3 className="text-xl font-bold mb-2 text-white">Skip the Line</h3>
                            <p className="text-sm text-gray-300">Get early access before public launch. Choose your device first.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                            <CreditCard className="text-green-400 mb-4" size={32} />
                            <h3 className="text-xl font-bold mb-2 text-white">Founder&apos;s Pricing</h3>
                            <p className="text-sm text-gray-300">Lock in $48/mo forever, even if prices go up later.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                            <Gift className="text-pink-400 mb-4" size={32} />
                            <h3 className="text-xl font-bold mb-2 text-white">$20 Credit</h3>
                            <p className="text-sm text-gray-300">First month discount. Try your first device for just $28.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                            <HelpCircle className="text-cyan-400 mb-4" size={32} />
                            <h3 className="text-xl font-bold mb-2 text-white">Vote on Roadmap</h3>
                            <p className="text-sm text-gray-300">Tell us which devices to add next. Shape the inventory.</p>
                        </div>
                    </div>

                    <div className="mt-16 max-w-2xl mx-auto text-center">
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest mb-2 px-1">
                            <span>Progress</span>
                            <span>17% Claimed</span>
                        </div>
                        <div className="h-4 bg-white/10 rounded-full overflow-hidden mb-4">
                            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-[17%] rounded-full"></div>
                        </div>
                        <p className="text-sm text-cyan-200">Only 837 founder spots remaining</p>
                    </div>
                </div>
            </section>

            {/* 8. Pricing Preview - Simplified */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl font-bold text-headline mb-6">Simple, Transparent Pricing</h2>
                        <p className="text-xl text-paragraph">Pick devices. Swap anytime. Buy or return whenever.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Tier 1 */}
                        <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                            <h3 className="text-2xl font-bold text-headline mb-2">Starter</h3>
                            <div className="mb-6"><span className="text-4xl font-bold text-headline">$48</span><span className="text-paragraph">/mo</span></div>
                            <p className="text-sm text-paragraph mb-8">Perfect for trying one device deeply.</p>
                            <ul className="space-y-4 text-sm text-headline mb-8">
                                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> 1 device at a time</li>
                                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> 4 free swaps / year</li>
                                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> Free shipping & returns</li>
                            </ul>
                            <Button variant="secondary" className="w-full" disabled>Coming Soon</Button>
                        </div>

                        {/* Tier 2 */}
                        <div className="border-2 border-button rounded-2xl p-8 relative shadow-xl">
                            <div className="absolute top-0 right-0 bg-button text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg uppercase">Most Popular</div>
                            <h3 className="text-2xl font-bold text-headline mb-2">Explorer</h3>
                            <div className="mb-6"><span className="text-4xl font-bold text-headline">$84</span><span className="text-paragraph">/mo</span></div>
                            <p className="text-sm text-paragraph mb-8">Compare 2 devices side-by-side.</p>
                            <ul className="space-y-4 text-sm text-headline mb-8">
                                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> 2 devices at a time</li>
                                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> 8 free swaps / year</li>
                                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> Save 16% vs Starter</li>
                            </ul>
                            <Button className="w-full" disabled>Coming Soon</Button>
                        </div>

                        {/* Tier 3 */}
                        <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                            <h3 className="text-2xl font-bold text-headline mb-2">Power User</h3>
                            <div className="mb-6"><span className="text-4xl font-bold text-headline">$119</span><span className="text-paragraph">/mo</span></div>
                            <p className="text-sm text-paragraph mb-8">The full AI lifestyle.</p>
                            <ul className="space-y-4 text-sm text-headline mb-8">
                                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> 3 devices at a time</li>
                                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> Priority Support</li>
                                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500" /> Unlimited Swaps</li>
                            </ul>
                            <Button variant="secondary" className="w-full" disabled>Coming Soon</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gray-50 py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-display text-4xl font-bold text-headline mb-6">Ready to skip the $400 risk?</h2>
                    <p className="text-xl text-paragraph mb-10">
                    </p>
                    <div className="max-w-md mx-auto">
                        <form action={joinWaitlist} className="flex gap-2">
                            <Input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                required
                                className="h-12 text-base"
                            />
                            <Button size="lg" className="px-8 shrink-0">Join Waitlist</Button>
                        </form>
                        <p className="text-xs text-paragraph mt-4">Unsubscribe anytime. No spam.</p>
                    </div>
                </div>
            </section>

        </div>
    );
}

function WaitlistForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    async function handleSubmit(formData: FormData) {
        setStatus('submitting');
        await joinWaitlist(formData);
        setStatus('success');
    }

    if (status === 'success') {
        return (
            <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={24} />
                </div>
                <h3 className="font-bold text-sky-900 mb-2">You&apos;re on the list!</h3>
                <p className="text-sm text-sky-800">Keep an eye on your inbox for early access updates.</p>
                <Button variant="tertiary" size="sm" onClick={() => setStatus('idle')} className="mt-4 text-sky-700 hover:text-sky-900 hover:bg-sky-100">
                    Register another email
                </Button>
            </div>
        );
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2 text-left">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@work.com"
                    required
                    className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                />
            </div>

            <div className="space-y-2 text-left">
                <label htmlFor="device" className="text-sm font-semibold text-gray-700">Device Interest</label>
                <div className="relative">
                    <select
                        id="device"
                        name="device"
                        className="w-full h-12 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent focus:bg-white transition-colors cursor-pointer"
                    >
                        <option value="meta-rayban">Meta Ray-Ban Smart Glasses</option>
                        <option value="xreal">XREAL Air 2 Pro</option>
                        <option value="oura">Oura Ring Gen 4</option>
                        <option value="samsung">Samsung Galaxy Ring</option>
                        <option value="unsure">Not sure yet</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
            </div>

            <Button type="submit" size="lg" className="w-full text-base font-bold shadow-lg shadow-cyan-500/20" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Joining...' : 'Join the Waitlist →'}
            </Button>

            <p className="text-xs text-center text-gray-400">
                We respect your privacy. Unsubscribe anytime.
            </p>
        </form>
    );
}


