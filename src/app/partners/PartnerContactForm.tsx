"use client";

import { Button } from "@/components/ui/Button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useToast } from "@/components/ui/Toast";
import { submitPartnerInquiry } from "@/app/actions/submit-partner-inquiry";

export default function PartnerContactForm() {
    const { addToast } = useToast();
    const [state, action, isPending] = useActionState(submitPartnerInquiry, { success: false, message: "" });

    // Show toast based on state changes
    useEffect(() => {
        if (state.message) {
            addToast({
                title: state.success ? "Inquiry Sent" : "Submission Failed",
                description: state.message,
                type: state.success ? "success" : "error",
            });
            if (state.success) {
                // Optional: Reset form logic if needed, but native forms usually don't need explicit reset if we're not using controlled inputs for everything.
                // However, with useActionState, the inputs might persist.
                // A key reset or ref reset is often simplest.
                const form = document.getElementById("partner-form") as HTMLFormElement;
                if (form) form.reset();
            }
        }
    }, [state, addToast]);

    return (
        <section id="contact" className="px-6 md:px-12 py-24">
            <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 p-8 md:p-16">
                <div className="text-center mb-10">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-headline mb-4">Partner with Techloop</h2>
                    <p className="text-paragraph">Tell us about your hardware. We&apos;ll tell you if it&apos;s a fit for our fleet.</p>
                </div>

                <form id="partner-form" className="space-y-6" action={action}>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-headline">Company Name</label>
                            <input name="companyName" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#3DA9FC] outline-none transition-all" placeholder="e.g. Acme Robotics" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-headline">Website</label>
                            <input name="website" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#3DA9FC] outline-none transition-all" placeholder="https://" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-headline">Email Address</label>
                        <input name="email" type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#3DA9FC] outline-none transition-all" placeholder="partner@company.com" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-headline">Message</label>
                        <textarea name="message" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#3DA9FC] outline-none transition-all h-32" placeholder="Tell us what you&apos;re building..." required />
                    </div>

                    <Button size="lg" className="w-full text-lg py-6" disabled={isPending}>
                        {isPending ? "Submitting..." : (
                            <>Submit Inquiry <ArrowRight className="ml-2" /></>
                        )}
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
