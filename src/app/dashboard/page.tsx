"use client"

import React, { useState } from "react"
import Link from "next/link";
import { Package, Calendar, Activity, ArrowRight, Battery, Wifi } from "lucide-react";
import Image from "next/image";
import OrderDetailsSheet from "./_components/OrderDetailsSheet";

export default function DashboardPage() {
    const [isManageSheetOpen, setIsManageSheetOpen] = useState(false)

    return (
        <div className="space-y-8">
            <OrderDetailsSheet isOpen={isManageSheetOpen} onClose={() => setIsManageSheetOpen(false)} />

            {/* Welcome Section */}
            <div>
                <h1 className="text-2xl font-display font-bold text-headline">Dashboard</h1>
                <p className="text-paragraph">Your tech ecosystem at a glance.</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-[#F1F5F9] shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-2 bg-blue-50 text-button rounded-lg">
                            <Package size={20} />
                        </div>
                        <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-paragraph font-medium">Current Device</p>
                        <h3 className="text-xl font-bold text-headline">Meta Ray-Ban</h3>
                        <p className="text-xs text-paragraph">Wayfarer Matte Black</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-[#F1F5F9] shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-2 bg-purple-50 text-purple-500 rounded-lg">
                            <Calendar size={20} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-paragraph font-medium">Next Swap Available</p>
                        <h3 className="text-xl font-bold text-headline">In 12 Days</h3>
                        <p className="text-xs text-paragraph">Dec 30, 2025</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-[#F1F5F9] shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-2 bg-orange-50 text-orange-500 rounded-lg">
                            <Activity size={20} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-paragraph font-medium">Explorer Points</p>
                        <h3 className="text-xl font-bold text-headline">2,450</h3>
                        <p className="text-xs text-paragraph">Level 3 Explorer</p>
                    </div>
                </div>
            </div>

            {/* Active Device Detail */}
            <section className="bg-white rounded-2xl border border-[#F1F5F9] shadow-sm overflow-hidden">
                <div className="p-6 border-b border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-headline">Active Rental</h2>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm font-semibold text-headline hover:bg-[#F8FAFC]">
                            View Manual
                        </button>
                        <button
                            onClick={() => setIsManageSheetOpen(true)}
                            className="px-4 py-2 bg-button text-white rounded-lg text-sm font-semibold hover:bg-button-hover shadow-button"
                        >
                            Manage Rental
                        </button>
                    </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative w-full md:w-1/3 aspect-[4/3] bg-[#F8FAFC] rounded-xl flex items-center justify-center">
                        {/* Placeholder for device image */}
                        <div className="text-paragraph/40 flex flex-col items-center">
                            <Image
                                src="https://placehold.co/400x300/F8FAFC/094067?text=Ray-Ban+Meta"
                                alt="Ray-Ban Meta"
                                width={400}
                                height={300}
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Active</span>
                                <span className="text-sm text-paragraph">Swapped on Dec 2, 2025</span>
                            </div>
                            <h3 className="text-2xl font-bold text-headline">Ray-Ban Meta Smart Glasses</h3>
                            <p className="text-paragraph text-sm max-w-lg">
                                The next generation of smart glasses. Capture, share, and listen with the new ultra-wide 12 MP camera and five-mic system.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-[#F8FAFC] rounded-xl border border-[#F1F5F9]">
                            <div className="space-y-1">
                                <p className="text-xs text-paragraph font-medium flex items-center gap-1.5"><Battery size={14} /> Battery</p>
                                <p className="text-sm font-bold text-headline">94% - Good</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-paragraph font-medium flex items-center gap-1.5"><Wifi size={14} /> Connectivity</p>
                                <p className="text-sm font-bold text-headline">Excellent</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-paragraph font-medium">Condition</p>
                                <p className="text-sm font-bold text-headline">Like New</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recommended Section */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-headline">Recommended for your next swap</h2>
                    <Link href="/browse" className="text-sm font-semibold text-button flex items-center gap-1 hover:gap-2 transition-all">
                        Browse all <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="group bg-white rounded-xl border border-[#F1F5F9] p-4 transition-all hover:shadow-lg hover:border-button/30 hover:-translate-y-1 cursor-pointer">
                            <div className="aspect-square bg-[#F8FAFC] rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                                <Image
                                    src={`https://placehold.co/300x300/F8FAFC/094067?text=Device+${item}`}
                                    alt="Device"
                                    width={300}
                                    height={300}
                                    className="object-cover"
                                />
                            </div>
                            <h4 className="font-bold text-headline text-sm mb-1">Rabbit R1</h4>
                            <p className="text-xs text-paragraph mb-3">AI Pocket Companion</p>
                            <button className="w-full py-2 bg-[#F1F5F9] text-headline text-xs font-semibold rounded-lg group-hover:bg-button group-hover:text-white transition-colors">
                                Valid for Swap
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
