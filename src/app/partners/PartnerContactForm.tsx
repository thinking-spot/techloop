"use client";

import { Button } from "@/components/ui/Button";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function PartnerContactForm() {
    return (
        <section id="contact" className="px-6 md:px-12 py-24">
            <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 p-8 md:p-16">
                <div className="text-center mb-10">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-headline mb-4">Partner with Techloop</h2>
                    <p className="text-paragraph">Tell us about your hardware. We&apos;ll tell you if it&apos;s a fit for our fleet.</p>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
    );
}
