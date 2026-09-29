"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { joinWaitlist } from "@/app/actions";

export default function WaitlistForm() {
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
                    placeholder="you@email.com"
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
                        <option value="meta-rayban">Meta Ray-Ban</option>
                        <option value="xreal">XREAL Air 2 Pro</option>
                        <option value="oura">Oura Ring Gen 4</option>
                        <option value="samsung">Samsung Galaxy Ring</option>
                        <option value="nothing-ear-a">Nothing Ear (a)</option>
                        <option value="timekettle">Timekettle</option>
                        <option value="rabbit-r1">Rabbit R1</option>
                        <option value="bee-bracelet">Bee Bracelet</option>
                        <option value="unsure">Not sure yet</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
            </div>

            <Button type="submit" size="lg" className="w-full text-base font-bold shadow-lg shadow-cyan-500/20" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Joining...' : 'Join Waitlist →'}
            </Button>

            <p className="text-xs text-center text-gray-400">
                We respect your privacy. Unsubscribe anytime.
            </p>
        </form>
    );
}


