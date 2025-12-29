import Link from "next/link";
import React from "react";

export type CategoryConfig = {
    title: string;
    description: string;
    filterCategories: string[]; // These must match the categories in data.ts
    BuyingGuide: React.ReactNode;
    metaTitle: string;
    metaDescription: string;
};

export const categoryData: Record<string, CategoryConfig> = {
    "ai-rings": {
        title: "Find your perfect AI smart ring",
        description: "Rent-to-buy the best smart rings on the market. All brand new. All swappable. All available to ship today.",
        filterCategories: ["Smart Ring"],
        metaTitle: "Rent AI Smart Rings | Oura & Samsung | Techloop",
        metaDescription: "Compare and rent top smart rings like Oura and Samsung Galaxy Ring. Flexible monthly plans, free sizing kits, and easy swaps.",
        BuyingGuide: (
            <div className="mt-20 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Smart Rings Buying Guide</h3>
                    <p className="text-sm text-paragraph mb-4">Smart rings pack advanced health sensors into a tiny, comfortable form factor. But which valid is right for you?</p>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>Oura Ring Gen 3:</strong> The gold standard for sleep tracking. Best if you want deep recovery insights and don't mind a subscription (included in Techloop plan).</li>
                        <li><strong>Samsung Galaxy Ring:</strong> The best choice for Android users. Seamless integration with Galaxy phones and no separate subscription fee.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Oura vs Samsung: Which is right?</h3>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>Choose Oura if:</strong> You use an iPhone OR want the most established sleep algorithms.</li>
                        <li><strong>Choose Samsung Gallery Ring if:</strong> You have a Galaxy phone and want deeper ecosystem integration.</li>
                    </ul>
                    <div className="mt-4 text-sm bg-blue-50 text-blue-800 p-3 rounded-lg inline-block">
                        <strong>Tip:</strong> Rent both on our Explorer plan to compare side-by-side for a month.
                    </div>
                </div>
            </div>
        )
    },
    "ai-glasses": {
        title: "The best AI smart glasses",
        description: "From Meta Ray-Ban to AR displays. Experience the future of vision.",
        filterCategories: ["Smart Glasses", "AR Glasses"],
        metaTitle: "Rent AI Smart Glasses | Ray-Ban Meta & XREAL | Techloop",
        metaDescription: "Rent the latest smart glasses including Meta Ray-Bans and XREAL Air 2 using our flexible Explorer plan. Try before you buy.",
        BuyingGuide: (
            <div className="mt-20 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Smart Glasses Buying Guide</h3>
                    <p className="text-sm text-paragraph mb-4">Not sure which smart glasses are right for you? It depends on what you want to do.</p>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>Camera Glasses (Meta Ray-Ban):</strong> Best for content creators and POV video. Looks exactly like normal sunglasses.</li>
                        <li><strong>AR Display Glasses (XREAL):</strong> Best for productivity and gaming. Projects a massive 130" virtual screen for your laptop or Switch.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Why rent glasses?</h3>
                    <p className="text-sm text-paragraph mb-4">Smart glasses are evolving rapidly. Buying a pair today means owning outdated tech next year.</p>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>Fit & Comfort:</strong> Glasses are personal. Wear them for a month to ensure they don't hurt your nose or ears.</li>
                        <li><strong>Prescription:</strong> Most of our rentals support prescription inserts (sold separately or available for purchase).</li>
                    </ul>
                </div>
            </div>
        )
    },
    "ai-earbuds": {
        title: "AI-powered audio",
        description: "Earbuds that do more than play music. Real-time translation and voice assistants.",
        filterCategories: ["AI Earbuds"],
        metaTitle: "Rent AI Earbuds | Nothing Ear & More | Techloop",
        metaDescription: "Experience the next generation of audio. Rent AI earbuds with built-in ChatGPT and voice assistants.",
        BuyingGuide: (
            <div className="mt-20 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Why AI Earbuds?</h3>
                    <p className="text-sm text-paragraph mb-4">Standard bluetooth headphones are dumb. AI earbuds transform how you interact with the world.</p>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>Voice Assistant:</strong> Talk to ChatGPT or other LLMs without taking your phone out.</li>
                        <li><strong>Live Translation:</strong> Some models can translate foreign languages in real-time directly into your ear.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Top Picks</h3>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>Nothing Ear:</strong> Best overall sound quality and seamless ChatGPT integration for quick queries.</li>
                        <li><strong>Nothing Ear (a):</strong> Incredible value with the same smart features in a fun, durable design.</li>
                    </ul>
                </div>
            </div>
        )
    },
    "ai-assistants": {
        title: "Standalone AI Devices",
        description: "The post-smartphone era is here. Pins, pendants, and pocket companions.",
        filterCategories: ["AI Assistant"],
        metaTitle: "Rent AI Pins & Assistants | Rabbit R1 & Humane | Techloop",
        metaDescription: "Try the latest standalone AI devices like Rabbit R1 and Humane Ai Pin. See if you're ready to ditch your smartphone.",
        BuyingGuide: (
            <div className="mt-20 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">The New Form Factors</h3>
                    <p className="text-sm text-paragraph mb-4">These devices aim to replace or supplement your smartphone by using voice-first AI interfaces.</p>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>Rabbit R1:</strong> A pocket companion with a screen and camera that uses "Large Action Models" to use apps for you.</li>
                        <li><strong>Humane Ai Pin:</strong> A wearable pin that projects a laser interface onto your hand and uses voice for everything else.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Are they ready?</h3>
                    <p className="text-sm text-paragraph mb-4">Honestly? It's early days.</p>
                    <div className="mt-4 text-sm bg-orange-50 text-orange-800 p-3 rounded-lg inline-block">
                        <strong>Why Renting is Perfect:</strong> These devices are experimental. Renting lets you try the future for $48 instead of paying $700+ to beta test hardware.
                    </div>
                </div>
            </div>
        )
    }
};
