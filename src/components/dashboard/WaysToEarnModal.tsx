"use client";

import { X, Users, MessageSquare, Calendar, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface WaysToEarnModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WaysToEarnModal({ isOpen, onClose }: WaysToEarnModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-[#F1F5F9] p-6 flex justify-between items-center z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-headline">Fuel Your Exploration</h2>
                        <p className="text-paragraph text-sm">Earn points to unlock free swaps and free months of service.</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full h-8 w-8 p-0">
                        <X size={20} />
                    </Button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Section 1: The Big Boost */}
                    <div>
                        <h3 className="text-sm font-bold text-headline uppercase tracking-wider mb-4 border-b border-[#F1F5F9] pb-2">🚀 The Big Boost</h3>
                        <div className="flex gap-4">
                            <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                                <Users size={24} />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-bold text-headline">Invite a Fellow Explorer</h4>
                                    <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-sm">+250 pts</span>
                                </div>
                                <p className="text-paragraph text-sm leading-relaxed">
                                    <span className="font-semibold text-headline">Give $10, Get a Free Swap.</span> When a friend joins using your link, you instantly earn enough points for a free device swap.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Intel & Insights */}
                    <div>
                        <h3 className="text-sm font-bold text-headline uppercase tracking-wider mb-4 border-b border-[#F1F5F9] pb-2">🧠 Intel & Insights</h3>
                        <div className="flex gap-4">
                            <div className="h-12 w-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 flex-shrink-0">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-bold text-headline">Device Q&A</h4>
                                    <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-sm">+100 pts</span>
                                </div>
                                <p className="text-paragraph text-sm leading-relaxed">
                                    Submit a verified review after 14 days of use. Your data shapes the future of this hardware.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Active Use */}
                    <div>
                        <h3 className="text-sm font-bold text-headline uppercase tracking-wider mb-4 border-b border-[#F1F5F9] pb-2">🔄 Active Use</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                                    <Calendar size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-bold text-headline">Daily Vesting</h4>
                                        <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-sm">+2 pts/day</span>
                                    </div>
                                    <p className="text-paragraph text-sm leading-relaxed">
                                        Earn automatically every day you have an active subscription.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="h-12 w-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 flex-shrink-0">
                                    <RefreshCcw size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-bold text-headline">New Device Swap</h4>
                                        <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-sm">+25 pts</span>
                                    </div>
                                    <p className="text-paragraph text-sm leading-relaxed">
                                        Rewarded when you switch to a new device (max once per 30 days).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 border-t border-[#F1F5F9] text-center">
                    <Button onClick={onClose} className="w-full md:w-auto min-w-[200px]">
                        Got it
                    </Button>
                </div>
            </div>
        </div>
    );
}
