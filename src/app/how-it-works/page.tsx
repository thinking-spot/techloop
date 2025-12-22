import Link from "next/link";
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

export default function HowItWorksPage() {
    return (
        <div className="bg-white min-h-screen pb-20">

            {/* Hero */}
            <section className="relative px-6 pt-12 md:px-12 lg:pt-20">
                <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-gradient-to-br from-[#F0F9FF] via-[#E6F4FE] to-[#F1F5F9] p-8 md:p-20 text-center border border-[#BAE6FD]/40 shadow-sm relative overflow-hidden">
                    {/* Background decorative blob */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3DA9FC]/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

                    <h1 className="relative mx-auto mb-6 font-display text-4xl font-bold leading-tight text-headline md:text-5xl lg:text-6xl">
                        Shop, swap, love. <br className="hidden md:block" />Wearable AI for $48/m
                    </h1>
                    <p className="relative mx-auto mb-10 text-xl text-paragraph max-w-2xl leading-relaxed">
                        No commitment. No risk. Pick any device, try it for real. If you love it, keep it.
                    </p>

                    <div className="relative flex justify-center mb-12">
                        <Link href="/browse">
                            <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg shadow-button/20 hover:shadow-button/40">
                                Get Started <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>

                    <div className="relative flex flex-wrap justify-center gap-4 text-sm font-medium text-paragraph/80">
                        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/50">
                            <Truck size={16} className="text-success" /> 2-3 day shipping
                        </div>
                        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/50">
                            <Check size={16} className="text-success" /> Rent to own, 100%
                        </div>
                        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/50">
                            <RefreshCcw size={16} className="text-success" /> Cancel anytime
                        </div>
                        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/50">
                            <Shield size={16} className="text-success" /> 98% get full deposit back
                        </div>
                    </div>
                </div>
            </section>

            {/* 4-Step Process */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl font-bold text-headline mb-4">How techloop works</h2>
                        <p className="text-paragraph max-w-2xl mx-auto">
                            Techloop is like Netflix for DVDs, but AI wearables. Rent monthly, swap anytime, only keep what you love.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-[#E2E8F0] -z-10" />

                        {/* Step 1 */}
                        <div className="text-center bg-white p-6 rounded-2xl border border-[#F1F5F9] shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-24 h-24 bg-[#E0F2FE] rounded-full flex items-center justify-center mx-auto mb-6 text-button border-4 border-white shadow-sm">
                                <Search size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-headline mb-2">1. Choose</h3>
                            <p className="text-paragraph text-sm mb-4">
                                Pick a device from our catalog. Not sure? Take our quiz to find your match.
                            </p>
                            <div className="text-xs font-semibold text-button uppercase tracking-wide">Brand New Device</div>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center bg-white p-6 rounded-2xl border border-[#F1F5F9] shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-24 h-24 bg-[#E0F2FE] rounded-full flex items-center justify-center mx-auto mb-6 text-button border-4 border-white shadow-sm">
                                <Box size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-headline mb-2">2. Try</h3>
                            <p className="text-paragraph text-sm mb-4">
                                Use it in real life for 30+ days. Wear it to work, travel with it, test it fully.
                            </p>
                            <div className="text-xs font-semibold text-button uppercase tracking-wide">30-Day Minimum</div>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center bg-white p-6 rounded-2xl border border-[#F1F5F9] shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-24 h-24 bg-[#E0F2FE] rounded-full flex items-center justify-center mx-auto mb-6 text-button border-4 border-white shadow-sm">
                                <HelpCircle size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-headline mb-2">3. Decide</h3>
                            <p className="text-paragraph text-sm mb-4">
                                Love it? Keep renting or buy it. Not for you? Swap it or return it.
                            </p>
                            <div className="text-xs font-semibold text-button uppercase tracking-wide">Flexible Options</div>
                        </div>

                        {/* Step 4 */}
                        <div className="text-center bg-white p-6 rounded-2xl border border-[#F1F5F9] shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-24 h-24 bg-[#E0F2FE] rounded-full flex items-center justify-center mx-auto mb-6 text-button border-4 border-white shadow-sm">
                                <RefreshCcw size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-headline mb-2">4. Swap</h3>
                            <p className="text-paragraph text-sm mb-4">
                                Want to try something else? Swap up to 4 times a year for free.
                            </p>
                            <div className="text-xs font-semibold text-button uppercase tracking-wide">Free Swaps</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deep Dive Sections */}
            <section className="bg-[#F8FAFC] py-20 px-6">
                <div className="max-w-6xl mx-auto space-y-20">

                    {/* Why 30 Days */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block px-3 py-1 bg-[#E0F2FE] text-button text-xs font-bold uppercase rounded-full mb-4">Why 30 Days?</div>
                            <h2 className="font-display text-3xl font-bold text-headline mb-6">Use It Like You Own It</h2>
                            <div className="space-y-4 text-paragraph">
                                <p>
                                    Most people need at least 3 weeks to truly test a wearable.
                                    Week 1 is setup, Week 2 is daily routine, Week 3 is when you discover the &quot;aha!&quot; moments.
                                </p>
                                <p>
                                    That&apos;s why we have a 30-day minimum rental. We want you to give it a fair shot.
                                    If you hate it before 30 days, you can still swap for a small early-swap fee.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-card border border-[#F1F5F9]">
                            <h3 className="font-bold text-lg text-headline mb-4">Your Package Includes:</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 p-1 rounded-full text-success"><Check size={12} /></div>
                                    <span className="text-sm text-paragraph"><strong>Any Device - Yours forever (or until next month).</strong> - Factory sealed, never worn.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 p-1 rounded-full text-success"><Check size={12} /></div>
                                    <span className="text-sm text-paragraph"><strong>Accessories</strong> - Charging cable, case, manual.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 p-1 rounded-full text-success"><Check size={12} /></div>
                                    <span className="text-sm text-paragraph"><strong>Welcome Kit</strong> - Setup guides & pro tips.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 p-1 rounded-full text-success"><Check size={12} /></div>
                                    <span className="text-sm text-paragraph"><strong>Prepaid Return Label</strong> - Zero hassle returns.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* After 30 Days Options */}
                    <div>
                        <div className="text-center mb-12">
                            <h2 className="font-display text-3xl font-bold text-headline mb-4">After 30 Days, It&apos;s Up To You</h2>
                            <p className="text-paragraph">Most users try 3-5 devices before finding &quot;the one&quot;.</p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-xl border border-[#F1F5F9] hover:border-button transition-colors">
                                <div className="text-button mb-4"><RotateCw size={28} /></div>
                                <h4 className="font-bold text-headline mb-2">Keep Renting</h4>
                                <p className="text-sm text-paragraph">Continue monthly payments. Cancel anytime.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-[#F1F5F9] hover:border-button transition-colors">
                                <div className="text-button mb-4"><Check size={28} /></div>
                                <h4 className="font-bold text-headline mb-2">Buy It</h4>
                                <p className="text-sm text-paragraph">Purchase at a discount based on rental duration.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-[#F1F5F9] hover:border-button transition-colors">
                                <div className="text-button mb-4"><RefreshCcw size={28} /></div>
                                <h4 className="font-bold text-headline mb-2">Swap</h4>
                                <p className="text-sm text-paragraph">Try a different device. 4 free swaps/year.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-[#F1F5F9] hover:border-button transition-colors">
                                <div className="text-button mb-4"><Zap size={28} /></div>
                                <h4 className="font-bold text-headline mb-2">Return</h4>
                                <p className="text-sm text-paragraph">Send it back and get your deposit refunded.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* FAQ Preview */}
            <section className="py-20 px-6 max-w-3xl mx-auto">
                <h2 className="font-display text-3xl font-bold text-headline mb-12 text-center">Common Questions</h2>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-[#F1F5F9]">
                        <h4 className="font-bold text-headline mb-2">Are these actually new devices?</h4>
                        <p className="text-paragraph text-sm">Yes! Your first rental is always a brand new, factory-sealed device. You are the first person to use it.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-[#F1F5F9]">
                        <h4 className="font-bold text-headline mb-2">What if I damage it?</h4>
                        <p className="text-paragraph text-sm">Normal wear and tear is covered. Accidental damage (cracks, water) is deducted from your deposit. 98% of users get a full refund.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-[#F1F5F9]">
                        <h4 className="font-bold text-headline mb-2">Can I cancel anytime?</h4>
                        <p className="text-paragraph text-sm">Yes. Just return the device within 14 days of cancelling. We refund your deposit within 7 days of receipt.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-headline py-20 px-6 text-center text-white">
                <h2 className="font-display text-3xl font-bold mb-6 text-white">Ready to find the perfect fit?</h2>
                <p className="mb-10 text-white/80 max-w-xl mx-auto">
                    Start with any device. Swap if you don&apos;t love it. Keep what works.
                </p>
                <Link href="/browse">
                    <Button size="lg" className="bg-button text-white hover:bg-[#2D8FDC] border-none px-8">
                        Browse Wearables
                    </Button>
                </Link>
            </section>

        </div>
    );
}
