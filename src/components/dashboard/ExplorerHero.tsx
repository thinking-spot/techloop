"use client";

import { Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ExplorerHeroProps {
    score: number;
    streak: number;
    level: number;
    onOpenEarnModal: () => void;
    onOpenRewardsModal: () => void;
}

export default function ExplorerHero({ score, streak, level, onOpenEarnModal, onOpenRewardsModal }: ExplorerHeroProps) {
    // Math for "Free Swap" (250 pts)
    const goal = 250;
    const percent = Math.min(100, Math.round((score / goal) * 100));

    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#F1F5F9] shadow-sm relative overflow-hidden">
            {/* Background Pattern - Subtle */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none opacity-50" />

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="flex-1 w-full">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700 border border-blue-100">
                            <Crown size={12} /> Level {level} Explorer
                        </span>
                        <div className="flex flex-col text-xs font-medium leading-tight">
                            <span className="text-paragraph">{score} Points</span>
                            <span className="text-green-600">+{streak} pts/day</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="max-w-md">
                        <div className="flex justify-between text-sm mb-2 font-medium">
                            <span className="text-paragraph">Progress to Free Swap</span>
                            <span className="text-headline">{percent}%</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${percent}%` }}
                            />
                        </div>
                        <p className="text-xs text-paragraph mt-2">
                            {score >= 250
                                ? "Goal reached! You can redeem a free swap now."
                                : `${goal - score} more points needed for a free device swap.`}
                        </p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Button
                        onClick={onOpenRewardsModal}
                        variant="primary"
                        className="shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap flex-1 md:flex-none"
                    >
                        <Crown size={16} className="mr-2" />
                        Spend Points
                    </Button>
                    <Button
                        onClick={onOpenEarnModal}
                        variant="secondary"
                        className="bg-white border border-[#E2E8F0] shadow-sm hover:bg-gray-50 text-headline whitespace-nowrap flex-1 md:flex-none"
                    >
                        <Zap size={16} className="mr-2 text-yellow-500" />
                        Ways to Earn
                    </Button>
                </div>
            </div>
        </div>
    );
}
