"use client";

import { resultMapping } from "@/lib/quiz-data";
import { devices } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";
import { Check, Star, ArrowRight, Zap, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function QuizResults({ answers, onRetake }: { answers: Record<number, any>; onRetake: () => void }) {
    // Question 4 is now Identity (was 3)
    const identityKey = answers[4] || "present";

    // Question 2 is Category Interest (Array of IDs, e.g. ["glasses", "rings"] or ["open"])
    const categoryInterest = (answers[2] || []) as string[];
    const hasSpecificInterest = categoryInterest.length > 0 && !categoryInterest.includes("open");

    // Base identity result
    let result = resultMapping[identityKey] || resultMapping["present"];

    // OVERRIDE LOGIC: If specific categories selected, enforce them
    if (hasSpecificInterest) {
        // Simple override: If "glasses" selected, force primary category to Smart Glasses
        if (categoryInterest.includes("glasses") && result.primary.category !== "Smart Glasses") {
            result = {
                ...result,
                primary: {
                    category: "Smart Glasses",
                    headline: "Your Perfect Smart Glasses Match",
                    benefits: ["You selected Smart Glasses", "Record video hands-free", "Stay present"],
                    devices: ["meta-rayban", "xreal-air-2"]
                }
            };
        }
        // If "rings" selected and glasses wasn't prioritized, force rings
        else if (categoryInterest.includes("rings") && result.primary.category !== "Smart Rings") {
            result = {
                ...result,
                primary: {
                    category: "Smart Rings",
                    headline: "Your Perfect Smart Ring Match",
                    benefits: ["You selected Smart Rings", "Invisible health tracking", "Sleep insights"],
                    devices: ["oura-ring", "samsung-ring"]
                }
            };
        }
        // (Add more granular logic here for other categories if needed)
    }

    // Helper to get device details
    const getDevice = (id: string) => devices.find(d => d.id === id);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">

            {/* 1. Identity Reflection */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16 space-y-4"
            >
                <div className="inline-block bg-button/10 text-button px-4 py-1.5 rounded-full font-bold text-sm uppercase tracking-wide mb-2">
                    Your Device Archetype
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-headline">
                    You&apos;re a <span className="text-button">{result.identity}</span>
                </h1>
                <p className="text-xl text-paragraph leading-relaxed max-w-2xl mx-auto">
                    {result.description}
                </p>
                <div className="pt-4">
                    <button onClick={onRetake} className="text-sm text-paragraph hover:text-button underline flex items-center justify-center gap-2 w-full">
                        <RefreshCw size={14} /> Retake Quiz
                    </button>
                </div>
            </motion.div>

            {/* 2. Primary Recommendation */}
            <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-16 bg-white rounded-3xl border-2 border-button/10 shadow-xl overflow-hidden"
            >
                <div className="bg-button/5 p-6 md:p-8 border-b border-button/10 text-center">
                    <h2 className="text-button font-bold uppercase tracking-wider text-sm mb-2">Primary Match</h2>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-headline">{result.primary.headline}</h3>
                </div>

                <div className="p-6 md:p-8">
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h4 className="font-bold text-headline mb-4">Why this fits you:</h4>
                            <ul className="space-y-3">
                                {result.primary.benefits.map((benefit: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-paragraph">
                                        <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5"><Check size={14} /></div>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-[#F8FAFC] p-6 rounded-xl border border-[#F1F5F9]">
                            <h4 className="font-bold text-headline mb-4 flex items-center gap-2">
                                <Zap className="text-yellow-500 fill-yellow-500" size={18} />
                                Start with this:
                            </h4>
                            {/* Render first primary device */}
                            {(() => {
                                const device = getDevice(result.primary.devices[0]);
                                if (!device) return null;
                                return (
                                    <div className="bg-white p-4 rounded-lg shadow-sm border border-[#F1F5F9]">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="relative w-16 h-16 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                                                <Image src={device.imageUrl} alt={device.name} fill className="object-cover" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-headline">{device.name}</div>
                                                <div className="text-sm text-paragraph">${device.price}/mo</div>
                                            </div>
                                        </div>
                                        <Link href={`/product/${device.id}`}>
                                            <Button className="w-full" size="sm">Rent Now</Button>
                                        </Link>
                                    </div>
                                )
                            })()}
                        </div>
                    </div>

                    {/* All Primary Devices Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {result.primary.devices.map((deviceId: string) => {
                            const device = getDevice(deviceId);
                            if (!device) return null;
                            return (
                                <Link key={device.id} href={`/product/${device.id}`} className="group block border border-[#F1F5F9] rounded-2xl p-4 hover:border-button transition-all hover:shadow-lg">
                                    <div className="relative aspect-[4/3] bg-[#F8FAFC] rounded-xl mb-4 overflow-hidden">
                                        <Image src={device.imageUrl} alt={device.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform" />
                                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm flex items-center gap-1">
                                            <Star size={10} className="fill-yellow-400 text-yellow-400" /> {device.rating}
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-headline mb-1">{device.name}</h4>
                                    <p className="text-sm text-paragraph line-clamp-2 mb-3">{device.description}</p>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-bold text-headline">${device.price}/mo</span>
                                        <span className="text-button font-medium flex items-center gap-1 group-hover:underline">View <ArrowRight size={14} /></span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            {/* 3. Secondary Recommendation */}
            <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-16 rounded-3xl border border-[#F1F5F9] bg-white overflow-hidden"
            >
                <div className="p-6 md:p-8 bg-[#F8FAFC] border-b border-[#F1F5F9]">
                    <h2 className="text-paragraph/60 font-bold uppercase tracking-wider text-sm mb-2">Secondary Match</h2>
                    <h3 className="font-display text-2xl font-bold text-headline">{result.secondary.headline}</h3>
                </div>
                <div className="p-6 md:p-8">
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h4 className="font-bold text-headline mb-4">Complete your kit:</h4>
                            <ul className="space-y-3">
                                {result.secondary.benefits.map((benefit: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-paragraph">
                                        <div className="bg-blue-100 p-1 rounded-full text-blue-600 mt-0.5"><Check size={14} /></div>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Render first secondary device */}
                        {(() => {
                            const device = getDevice(result.secondary.devices[0]);
                            if (!device) return null;
                            return (
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-[#F1F5F9] h-fit self-center">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-16 h-16 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                                            <Image src={device.imageUrl} alt={device.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-headline">{device.name}</div>
                                            <Link href={`/product/${device.id}`} className="text-sm text-button hover:underline">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })()}
                    </div>
                </div>
            </motion.section>

            {/* 4. Explorer Plan Upsell */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-headline text-white rounded-3xl p-8 md:p-12 text-center"
            >
                <h2 className="font-display text-3xl font-bold mb-4">Try Both & Save</h2>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                    Get the <strong>Explorer Plan</strong> to rent 2 devices at once. Swap them anytime.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/pricing">
                        <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white text-headline border-white hover:bg-gray-100">
                            Get Explorer Plan ($89/mo)
                        </Button>
                    </Link>
                    <Link href="/browse">
                        <Button variant="tertiary" size="lg" className="w-full sm:w-auto text-white border-white/20 hover:text-white hover:bg-white/10 no-underline">
                            Browse All Devices
                        </Button>
                    </Link>
                </div>
            </motion.div>

        </div>
    );
}
