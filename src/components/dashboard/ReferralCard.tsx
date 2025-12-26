"use client";

import { useState } from "react";
import { Copy, Check, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ReferralCardProps {
    referralCode?: string | null;
}

export default function ReferralCard({ referralCode }: ReferralCardProps) {
    const [copied, setCopied] = useState(false);

    // Fallback if no code yet (UI should probably handle generation, but for read-only View this is fine)
    const link = referralCode
        ? `techloop.ai/invite/u/${referralCode}`
        : "techloop.ai/invite/...";

    const handleCopy = () => {
        if (!referralCode) return;
        navigator.clipboard.writeText(`https://${link}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-[#F1F5F9] shadow-sm flex flex-col h-full">
            <div className="mb-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                    <Users size={20} />
                </div>
                <h3 className="text-lg font-bold text-headline mb-2">Refer friends, get points!</h3>
                <p className="text-paragraph text-sm">
                    Share your invite link. When people sign up, you get 250 Explorer Points.
                </p>
            </div>

            <div className="mt-auto">
                <div className="p-1 pl-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between gap-2">
                    <span className={`text-sm font-mono truncate ${!referralCode ? 'opacity-50' : 'text-headline'}`}>
                        {link}
                    </span>
                    <Button
                        size="sm"
                        variant={copied ? "primary" : "secondary"}
                        className={copied ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                        onClick={handleCopy}
                        disabled={!referralCode}
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        <span className="ml-2 hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
