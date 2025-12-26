"use client";

import { X, Package, Calendar, Gift, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface RewardsStoreModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentPoints: number;
}

export default function RewardsStoreModal({ isOpen, onClose, currentPoints }: RewardsStoreModalProps) {
    if (!isOpen) return null;

    const rewards = [
        {
            id: 'swap',
            title: "Free Device Swap",
            cost: 250,
            description: "Cover the logistics fee for your next exchange.",
            icon: <Package size={24} />,
            color: "blue"
        },
        {
            id: 'month',
            title: "Free Month of Service",
            cost: 480,
            description: "Get a 100% discount on your next renewal date.",
            icon: <Calendar size={24} />,
            color: "purple"
        },
        {
            id: 'gift',
            title: "Give a Free Gift",
            cost: 480,
            description: "Give 3 months of Techloop. If they love it, they can keep it!",
            icon: <Gift size={24} />,
            color: "pink"
        }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-[#F1F5F9] p-6 flex justify-between items-center z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-headline">The Rewards Store</h2>
                        <p className="text-paragraph text-sm">Simple math. Redeem your points.</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full h-8 w-8 p-0">
                        <X size={20} />
                    </Button>
                </div>

                {/* Balance */}
                <div className="p-6 bg-gray-50 border-b border-[#F1F5F9]">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-paragraph">Your Balance</span>
                        <span className="text-xl font-bold text-headline flex items-center gap-2">
                            {currentPoints} <span className="text-sm font-normal text-paragraph">pts</span>
                        </span>
                    </div>
                </div>

                {/* Rewards List */}
                <div className="p-6 space-y-4">
                    {rewards.map((reward) => {
                        const canAfford = currentPoints >= reward.cost;
                        return (
                            <div key={reward.id} className={`group border border-[#F1F5F9] rounded-xl p-4 transition-all hover:border-blue-200 hover:shadow-sm ${!canAfford ? 'opacity-75' : ''}`}>
                                <div className="flex items-start gap-4">
                                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-${reward.color}-50 text-${reward.color}-600`}>
                                        {reward.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-headline">{reward.title}</h4>
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${canAfford ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {reward.cost} pts
                                            </span>
                                        </div>
                                        <p className="text-sm text-paragraph mb-4">{reward.description}</p>

                                        <Button
                                            size="sm"
                                            className="w-full"
                                            variant={canAfford ? "default" : "secondary"}
                                            disabled={!canAfford}
                                        >
                                            {reward.id === 'gift' ? 'Give' : 'Redeem'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
