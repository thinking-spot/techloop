"use client";

import { Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface QALockCardProps {
    daysActive: number; // 0-14+
}

export default function QALockCard({ daysActive }: QALockCardProps) {
    const isLocked = daysActive < 14;
    const daysRemaining = 14 - daysActive;

    if (isLocked) {
        return (
            <div className="bg-white p-6 rounded-2xl border border-[#F1F5F9] shadow-sm flex flex-col h-full opacity-75 hover:opacity-100 transition-opacity">
                <div className="mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 mb-4">
                        <Lock size={20} />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-headline">Device Q&A</h3>
                        <span className="text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded text-xs uppercase tracking-wide">
                            Unlocks in {daysRemaining} days
                        </span>
                    </div>
                    <p className="text-paragraph text-sm">
                        We value deep insights. Use the device for a full 14 days to unlock the high-value feedback form.
                    </p>
                </div>

                <div className="mt-auto pt-4 relative">
                    {/* Fake Progress Bar for Time */}
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gray-300 rounded-full"
                            style={{ width: `${(daysActive / 14) * 100}%` }}
                        />
                    </div>
                    <p className="text-xs text-paragraph mt-2 text-right">{daysActive}/14 days</p>
                </div>
            </div>
        );
    }

    // Unlocked State
    return (
        <div className="bg-white p-6 rounded-2xl border-2 border-indigo-100 shadow-sm flex flex-col h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-100 transition-colors pointer-events-none" />

            <div className="mb-4 relative z-10">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4 animate-bounce">
                    <Unlock size={20} />
                </div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-headline">Device Q&As, get points!</h3>
                </div>
                <p className="text-paragraph text-sm">
                    How is this device working for you? Feed us data! Get 100 points!
                </p>
            </div>

            <div className="mt-auto relative z-10">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-md border-0">Start Q&A</Button>
            </div>
        </div>
    );
}
