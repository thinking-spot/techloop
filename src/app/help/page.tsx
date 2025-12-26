"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    Package,
    Settings,
    RefreshCcw,
    MessageSquare,
    Rocket,
    CreditCard,
    ShoppingCart,
    Wrench,
    User,
    Clipboard,
    ArrowRight,
    ChevronDown,
    ChevronUp,
    Play,
    Mail,
    Phone,
    Calendar,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function HelpPage() {
    const [faqCategory, setFaqCategory] = useState("All");

    return (
        <div className="bg-white min-h-screen pb-20">

            {/* Hero Section */}
            <section className="relative px-6 pt-12 md:px-12 lg:pt-20">
                <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-gradient-to-br from-[#F0F9FF] via-[#E6F4FE] to-[#F1F5F9] p-8 md:p-20 text-center border border-[#BAE6FD]/40 shadow-sm relative overflow-hidden">
                    {/* Background decorative blob */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3DA9FC]/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

                    <h1 className="relative mx-auto mb-6 font-display text-[40px] font-bold leading-tight text-headline md:text-[48px]">
                        How can we help?
                    </h1>
                    <p className="relative mx-auto mb-10 text-[20px] md:text-[22px] text-paragraph max-w-2xl leading-relaxed">
                        Search for answers, browse guides, or get in touch. We&apos;re here for you.
                    </p>

                    <div className="relative max-w-2xl mx-auto mb-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <Input
                                type="text"
                                placeholder="Try &quot;how to swap devices&quot; or &quot;return policy&quot;"
                                className="w-full h-14 pl-12 pr-4 rounded-full border-gray-200 shadow-sm text-lg focus:ring-button focus:border-button"
                            />
                        </div>
                    </div>

                    <div className="relative flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-paragraph/70">
                        <span className="font-medium">Popular:</span>
                        <button className="hover:text-button underline decoration-dotted">How to swap</button>
                        <button className="hover:text-button underline decoration-dotted">Cancel subscription</button>
                        <button className="hover:text-button underline decoration-dotted">Deposit refund</button>
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="px-6 md:px-12 -mt-10 mb-20 relative z-10">
                <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
                    {[
                        { icon: Package, title: "Track Order", desc: "See shipment status", cta: "Track →" },
                        { icon: Settings, title: "Manage Account", desc: "Update payment & plan", cta: "Go to Account →" },
                        { icon: RefreshCcw, title: "Swap Devices", desc: "Request a new device", cta: "Start Swap →" },
                        { icon: MessageSquare, title: "Contact Support", desc: "We respond < 2 hrs", cta: "Contact Us →" },
                    ].map((action, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-card border border-[#F1F5F9] hover:border-button/50 transition-colors group cursor-pointer">
                            <div className="w-10 h-10 bg-[#E0F2FE] rounded-full flex items-center justify-center text-button mb-4 group-hover:bg-button group-hover:text-white transition-colors">
                                <action.icon size={20} />
                            </div>
                            <h3 className="font-bold text-headline mb-1">{action.title}</h3>
                            <p className="text-sm text-paragraph mb-4">{action.desc}</p>
                            <span className="text-sm font-bold text-button group-hover:underline">{action.cta}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Browse by Topic */}
            <section className="px-6 md:px-12 py-12">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-display text-3xl font-bold text-headline mb-2">Browse by Topic</h2>
                    <p className="text-paragraph mb-10">Find answers organized by what you need help with.</p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Rocket, title: "Getting Started", count: "12 articles", items: ["How to sign up", "Understanding security deposit", "What's included in rental"] },
                            { icon: RefreshCcw, title: "Swaps & Returns", count: "15 articles", items: ["How to request a swap", "Return policy", "How long does swap take?"] },
                            { icon: CreditCard, title: "Billing & Payments", count: "10 articles", items: ["Monthly billing explained", "Update payment method", "View billing history"] },
                            { icon: ShoppingCart, title: "Buying Your Device", count: "8 articles", items: ["Rent-to-own pricing", "Purchase your rented device", "Warranty financing"] },
                            { icon: Wrench, title: "Troubleshooting", count: "25 articles", items: ["Device won't turn on", "Battery draining fast", "Connection issues"] },
                            { icon: User, title: "Account Management", count: "9 articles", items: ["Update shipping address", "Pause subscription", "Change plan"] },
                        ].map((topic, i) => (
                            <div key={i} className="border border-[#F1F5F9] rounded-xl p-6 hover:border-button/30 hover:bg-slate-50 transition-colors cursor-pointer">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="text-button"><topic.icon size={24} /></div>
                                        <h3 className="font-bold text-headline">{topic.title}</h3>
                                    </div>
                                    <span className="text-xs text-paragraph/60 bg-slate-100 px-2 py-1 rounded-full">{topic.count}</span>
                                </div>
                                <ul className="space-y-2 mb-4">
                                    {topic.items.map((item, j) => (
                                        <li key={j} className="text-sm text-paragraph hover:text-button flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="text-sm font-semibold text-button">View all articles →</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Device Manuals */}
            <section className="px-6 md:px-12 py-12 bg-[#F8FAFC]">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-display text-3xl font-bold text-headline mb-2">Device Manuals</h2>
                    <p className="text-paragraph mb-10">Setup guides and troubleshooting for specific devices.</p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { name: "Meta Ray-Ban", rating: "4.8", imageColor: "bg-orange-100" },
                            { name: "XREAL Air 2 Pro", rating: "4.6", imageColor: "bg-purple-100" },
                            { name: "Oura Ring Gen 3", rating: "4.9", imageColor: "bg-green-100" },
                            { name: "Humane Ai Pin", rating: "3.2", imageColor: "bg-gray-200" },
                            { name: "Meta Quest 3", rating: "4.7", imageColor: "bg-blue-100" },
                            { name: "Apple Vision Pro", rating: "4.8", imageColor: "bg-gray-800" },
                        ].map((device, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl border border-[#E2E8F0] flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
                                <div className={`w-16 h-16 rounded-lg ${device.imageColor} flex-shrink-0`} />
                                <div>
                                    <h4 className="font-bold text-headline">{device.name}</h4>
                                    <div className="flex items-center gap-1 text-xs text-paragraph mb-2">
                                        <span className="text-yellow-400">★</span> {device.rating}/5
                                    </div>
                                    <span className="text-xs font-bold text-button uppercase tracking-wide">View Guides</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="px-6 md:px-12 py-20">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-display text-3xl font-bold text-headline text-center mb-10">Frequently Asked Questions</h2>

                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {["All", "Before Renting", "During Rental", "Swaps & Returns", "Buying"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFaqCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${faqCategory === cat ? 'bg-headline text-white' : 'bg-gray-100 text-paragraph hover:bg-gray-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <AccordionItem q="How does the security deposit work?" a="We hold (not charge) a refundable deposit on your card. It works like a hotel hold. When you return the device in good condition, the hold is released. Refunds typically appear in 5-7 business days." />
                        <AccordionItem q="Are the devices brand new?" a="Your first rental is always a brand new, factory-sealed device. We also offer 'Certified Pre-Owned' options for a discount, but you have to specifically choose that." />
                        <AccordionItem q="Can I pause my subscription?" a="Yes, up to 3 months per year. You can pause while keeping the device (payment pauses, but you can't use it?) or return it to pause without holding onto hardware." />
                        <AccordionItem q="What if I damage the device?" a="Normal wear and tear is covered. Accidental damage (cracks, water) is deducted from the deposit. We recommend taking photos before returning." />
                        <AccordionItem q="How do buying and rent-to-own work?" a="You can buy your rental anytime. 100% of your first 3 months of payments go toward the purchase price. After that, a portion of payments contribute to the buyout." />
                    </div>
                </div>
            </section>

            {/* Contact Support */}
            <section className="px-6 md:px-12 py-20 bg-[#F0F9FF]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-display text-3xl font-bold text-headline mb-4">Still Need Help?</h2>
                    <p className="text-paragraph mb-12">We respond in less than 2 hours.</p>

                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div className="bg-white p-8 rounded-2xl shadow-sm">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"><MessageSquare size={24} /></div>
                            <h3 className="text-xl font-bold text-headline mb-2">Live Chat</h3>
                            <p className="text-sm text-paragraph mb-6">Fastest for quick questions. Available 8am-10pm PT.</p>
                            <Button className="w-full">Start Chat</Button>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6"><Mail size={24} /></div>
                            <h3 className="text-xl font-bold text-headline mb-2">Email Us</h3>
                            <p className="text-sm text-paragraph mb-6">Best for detailed troubleshooting. We reply fast.</p>
                            <Button variant="secondary" className="w-full">help@trytechloop.com</Button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

function AccordionItem({ q, a }: { q: string, a: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-headline hover:bg-gray-50 transition-colors"
            >
                {q}
                {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
            </button>
            {isOpen && (
                <div className="p-5 pt-0 text-paragraph text-sm leading-relaxed border-t border-gray-100 bg-gray-50/50">
                    {a}
                </div>
            )}
        </div>
    );
}
