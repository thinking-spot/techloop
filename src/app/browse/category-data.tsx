import Link from "next/link";
import React from "react";

export type CategoryConfig = {
    title: string;
    description: string;
    filterCategories?: string[]; // These must match the categories in data.ts
    filterUseCases?: string[]; // These must match the useCase strings in data.ts
    BuyingGuide: React.ReactNode;
    metaTitle: string;
    metaDescription: string;
};

export const categoryData: Record<string, CategoryConfig> = {
    "ai-rings": {
        title: "Find your perfect AI smart ring",
        description: "Rent-to-buy the best smart rings on the market. All brand new. All swappable. All available to ship today.",
        filterCategories: ["Rings"],
        metaTitle: "Try AI Smart Rings | Rent to buy, risk-free | Techloop",
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
        filterCategories: ["Glasses"],
        metaTitle: "Try AI Smart Glasses | Rent to buy, risk-free | Techloop",
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
        filterCategories: ["Earbuds"],
        metaTitle: "Try AI Earbuds | Rent to buy, risk-free | Techloop",
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
        title: "Standalone AI Assistants",
        description: "The post-smartphone era is here. Pins, pendants, cards, and robotics.",
        filterCategories: ["Pins", "Pendants", "Cards", "Robotics"],
        metaTitle: "Try AI Assistants | Rent to buy, risk-free | Techloop",
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
                        <strong>Why Renting is Perfect:</strong> These devices are experimental. Renting lets you try the future for $42 instead of paying $700+ to beta test hardware.
                    </div>
                </div>
            </div>
        )
    },
    "ai-watches": {
        title: "The best AI smart watches",
        description: "Track your health, receive alerts, and train smarter. Rent-to-buy the finest AI-driven health watches.",
        filterCategories: ["Watches"],
        metaTitle: "Try AI Smart Watches | Rent to buy, risk-free | Techloop",
        metaDescription: "Rent top-tier AI smart watches for advanced fitness tracking and health metrics.",
        BuyingGuide: (
            <div className="mt-20 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Smart Watches Buying Guide</h3>
                    <p className="text-sm text-paragraph mb-4">AI watches have moved past basic step counting. Here is what to consider:</p>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>Screen vs Screenless:</strong> Do you want notifications on your wrist or pure health tracking without distractions (like the Whoop)?</li>
                        <li><strong>Sensors:</strong> Advanced sensors now track everything from blood oxygen to temperature variations.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Why upgrade your watch?</h3>
                    <p className="text-sm text-paragraph mb-4">Next generation fitness trackers process your data natively across continuous periods using AI to predict injury and recommend exact workout intensity.</p>
                </div>
            </div>
        )
    },
    "ai-pins": {
        title: "Wearable AI Pins",
        description: "The invisible assistants that clip to your shirt. Voice-first, always-ready intelligence.",
        filterCategories: ["Pins"],
        metaTitle: "Try AI Pins | Rent to buy, risk-free | Techloop",
        metaDescription: "Explore and rent AI pins. Compact, wearable logic without the bounds of a screen.",
        BuyingGuide: (
            <div className="mt-20 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">AI Pins Buying Guide</h3>
                    <p className="text-sm text-paragraph mb-4">AI Pins are meant to be a frictionless layer of intelligence in your daily life.</p>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>Form Factor:</strong> Pins magnetically attach to your clothing, placing a camera and microphone right at your chest level.</li>
                        <li><strong>Projected UI:</strong> Some advanced pins use a laser ink display directly onto the palm of your hand instead of a physical screen.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Is an AI Pin right for you?</h3>
                    <p className="text-sm text-paragraph mb-4">If you want to reduce screen time and engage with technology purely through natural voice interactions, AI pins represent the most exciting frontier of post-smartphone wearables.</p>
                </div>
            </div>
        )
    },
    "ai-pendants": {
        title: "AI Pendants",
        description: "A continuous memory companion. Pendants listen, remember, and organize your life.",
        filterCategories: ["Pendants"],
        metaTitle: "Try AI Pendants | Rent to buy, risk-free | Techloop",
        metaDescription: "Rent AI pendants that serve as memory companions for note-taking, transcription, and ambient assistance.",
        BuyingGuide: (
            <div className="mt-20 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">AI Pendants Buying Guide</h3>
                    <p className="text-sm text-paragraph mb-4">Pendants are designed primarily around audio input: acting as a continuous second brain.</p>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>Continuous Recording:</strong> Pendants securely loop audio, keeping transcriptions of meetings, ideas, and conversations automatically.</li>
                        <li><strong>Lightweight:</strong> Worn elegantly around the neck, they fade into the background.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Why a pendant?</h3>
                    <p className="text-sm text-paragraph mb-4">It's perfect for professionals, creatives, or anyone who has ever thought "I wish I wrote that down". Your pendant acts as a limitless memory extension.</p>
                </div>
            </div>
        )
    },
    "ai-cards": {
        title: "Standalone AI Cards",
        description: "The anti-smartphone. Pocket-sized devices utilizing Large Action Models.",
        filterCategories: ["Cards"],
        metaTitle: "Try AI Cards | Rent to buy, risk-free | Techloop",
        metaDescription: "Pocket-sized AI card companions and devices for standalone functionality without app clutter.",
        BuyingGuide: (
            <div className="mt-20 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">AI Cards Buying Guide</h3>
                    <p className="text-sm text-paragraph mb-4">These devices are built beautifully to do just what you need, securely.</p>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>LAMs over Apps:</strong> They skip the app store entirely, using a Large Action Model to execute tasks directly on web interfaces for you.</li>
                        <li><strong>Dedicated Hardware:</strong> Tactile buttons, fun scroll wheels, and minimal screens are replacing the infinity pool of smartphone scrolling.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">The Perfect Rental</h3>
                    <p className="text-sm text-paragraph mb-4">AI cards like the Rabbit R1 represent a completely new operating system paradigm. Renting lets you test out an action-driven OS without giving up your phone or fully committing to early-stage software.</p>
                </div>
            </div>
        )
    },
    "ai-robotics": {
        title: "AI Robotics & Automation",
        description: "Intelligent companions and automation devices for your home or workspace.",
        filterCategories: ["Robotics"],
        metaTitle: "Try AI Robotics | Rent to buy, risk-free | Techloop",
        metaDescription: "Bring intelligent automation to your home. Rent-to-try the latest AI robotics.",
        BuyingGuide: (
            <div className="mt-20 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Robotics Buying Guide</h3>
                    <p className="text-sm text-paragraph mb-4">Robotics have transformed from simple vacuums to context-aware physical agents powered by multimodal LLMs.</p>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>Spatial Awareness:</strong> New robots learn the layout of your home, recognize individuals and pets, and patrol securely.</li>
                        <li><strong>Interaction:</strong> Use voice commands to interact naturally with hardware that moves and reacts in the physical environment.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Why bring robotics home?</h3>
                    <p className="text-sm text-paragraph mb-4">Whether as a dynamic security monitor, a moving voice agent, or a companion for entertainment, consumer robotics are finally smart enough to be genuinely useful.</p>
                </div>
            </div>
        )
    },
    "productivity-ai-devices": {
        title: "AI Devices for Productivity",
        description: "Streamline your workflow with AI devices built to help you achieve more in less time.",
        filterUseCases: ["Productivity"],
        metaTitle: "Try AI Devices for Productivity | Rent to buy, risk-free | Techloop",
        metaDescription: "Rent AI devices designed for productivity. Enhance your workflow with smart glasses, pins, and powerful AI companions.",
        BuyingGuide: (
            <div className="mt-20 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Productivity Buying Guide</h3>
                    <p className="text-sm text-paragraph mb-4">When evaluating technology to help you work faster, consider the form factor that best fits your daily habits:</p>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>AR Displays:</strong> The XREAL glasses allow you to carry a multi-monitor setup in your backpack automatically.</li>
                        <li><strong>Memory Companions:</strong> Wearable pins or pendants act as a second brain, ensuring you never miss a detail from a meeting again.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Optimize your setup</h3>
                    <p className="text-sm text-paragraph mb-4">Rent a device for your specific operational needs to see if it genuinely accelerates your process without adding extra friction.</p>
                </div>
            </div>
        )
    },
    "fitness-health-ai-devices": {
        title: "AI Devices for Fitness & Health",
        description: "Track your body with absolute precision. Optimize your healthspan.",
        filterUseCases: ["Fitness & Health"],
        metaTitle: "Try AI Devices for Fitness & Health | Rent to buy, risk-free | Techloop",
        metaDescription: "Rent AI wearables for fitness and health tracking. From Oura rings to Whoop straps, discover deeper recovery insights.",
        BuyingGuide: (
            <div className="mt-20 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Health Trackers Buying Guide</h3>
                    <p className="text-sm text-paragraph mb-4">Health data is only useful if it is accurate and you actually enjoy wearing the device.</p>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>Passive Monitoring:</strong> Rings (like Oura) and screen-free straps (like Whoop) fade into the background while providing continuous biometrics.</li>
                        <li><strong>AI Coaching:</strong> Modern health wearables utilize AI to interpret your raw data into actionable insights rather than just giving you unrefined graphs.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Why upgrade your tracker?</h3>
                    <p className="text-sm text-paragraph mb-4">It is no longer just about counting steps. Next-generation AI models predict fatigue, measure nuanced heart variability, and analyze intricate sleep cycles.</p>
                </div>
            </div>
        )
    },
    "entertainment-ai-devices": {
        title: "AI Devices for Entertainment",
        description: "Redefine your downtime with massive virtual screens and intelligent audio.",
        filterUseCases: ["Entertainment"],
        metaTitle: "Try AI Devices for Entertainment | Rent to buy, risk-free | Techloop",
        metaDescription: "Rent AI devices specifically tailored for entertainment. Spatial audio, AR cinema displays, and next-level immersion.",
        BuyingGuide: (
            <div className="mt-20 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Entertainment Tech Buying Guide</h3>
                    <p className="text-sm text-paragraph mb-4">Entertainment devices transport you—whether that is a virtual screen or audio enhancement.</p>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>AR Cinemas:</strong> Turn a long flight into a private theater experience. Devices like the XREAL Air offer 130" virtual displays locked securely into your vision.</li>
                        <li><strong>Immersive Audio:</strong> AI earbuds leverage real-time spatial adjustments to make your favorite movies and music sound phenomenally vibrant.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Experience it yourself</h3>
                    <p className="text-sm text-paragraph mb-4">Rent a device for your next vacation or long commute. Unwinding has never felt so futuristic.</p>
                </div>
            </div>
        )
    },
    "communication-ai-devices": {
        title: "AI Devices for Communication",
        description: "Stay connected effortlessly. Real-time translation, crystal clear calls, and intelligent sorting.",
        filterUseCases: ["Communication"],
        metaTitle: "Try AI Devices for Communication | Rent to buy, risk-free | Techloop",
        metaDescription: "Rent AI wearables that excel in communication. Real-time language translation earbuds and smart glasses.",
        BuyingGuide: (
            <div className="mt-20 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Communication Tech Buying Guide</h3>
                    <p className="text-sm text-paragraph mb-4">Break down language barriers and simplify how you talk to the world with AI communication tools.</p>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>Real-Time Translation:</strong> Next-generation earbuds seamlessly translate spoken conversations on the fly.</li>
                        <li><strong>Hands-Free Networking:</strong> Glasses with directional microphones allow you to take calls on a busy street with unprecedented audio clarity.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Perfect for Travelers & Professionals</h3>
                    <p className="text-sm text-paragraph mb-4">If clear communication is essential, renting one of these devices ensures you have the sharpest processing algorithms available today.</p>
                </div>
            </div>
        )
    },
    "developer-ai-devices": {
        title: "AI Devices for Developers",
        description: "Hackable, open-source, and unconstrained. The ultimate playground for tinkerers.",
        filterUseCases: ["Developer"],
        metaTitle: "Try AI Devices for Developers | Rent to buy, risk-free | Techloop",
        metaDescription: "Rent open-source and hackable AI devices designed for developers. Experiment with new AI models and sensory inputs.",
        BuyingGuide: (
            <div className="mt-20 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Developer Devices Buying Guide</h3>
                    <p className="text-sm text-paragraph mb-4">These devices are crafted for individuals who want to write their own rules.</p>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>Open Tooling:</strong> Devices like the Brilliant Labs Frame allow you to write Python scripts to display custom AR notifications.</li>
                        <li><strong>Local LLMs:</strong> Explore new edge-capabilities by processing data directly on the hardware without cloud restrictions.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Why rent a dev kit?</h3>
                    <p className="text-sm text-paragraph mb-4">Developer ecosystems evolve at a rapid pace. Renting allows you to experiment with SDKs and platform capabilities for $42 before diving headfirst into a single ecosystem.</p>
                </div>
            </div>
        )
    },
    "assistant-ai-devices": {
        title: "AI Assistant Devices",
        description: "Your digital concierge. Voice-activated devices ready to navigate the world for you.",
        filterUseCases: ["AI Assistant"],
        metaTitle: "Try AI Assistant Devices | Rent to buy, risk-free | Techloop",
        metaDescription: "Rent intelligent AI assistant devices. Voice-activated companions, pins, and standalone hardware.",
        BuyingGuide: (
            <div className="mt-20 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">AI Assistants Buying Guide</h3>
                    <p className="text-sm text-paragraph mb-4">The goal of these devices is to minimize screen time by prioritizing direct action and voice inputs.</p>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>Large Action Models (LAMs):</strong> The newest assistant hardware executes app commands autonomously without you needing to tap.</li>
                        <li><strong>Wearable Intelligence:</strong> Having an assistant pinned to your lapel provides a completely different interaction dynamic than pulling out a smartphone.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">The Post-Smartphone Era</h3>
                    <p className="text-sm text-paragraph mb-4">These ambient interfaces represent a significant paradigm shift. Take the leap and discover what's possible when technology gets out of your way.</p>
                </div>
            </div>
        )
    },
    "business-ai-devices": {
        title: "AI Devices for Business",
        description: "Equip your enterprise. Scalable AI solutions for professionals and teams.",
        filterUseCases: ["Business"],
        metaTitle: "Try AI Devices for Business | Rent to buy, risk-free | Techloop",
        metaDescription: "Rent enterprise-grade AI hardware. Discover transformative tools to enhance corporate collaboration and output.",
        BuyingGuide: (
            <div className="mt-20 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Business Tech Buying Guide</h3>
                    <p className="text-sm text-paragraph mb-4">AI hardware in a corporate setting requires security, utility, and seamless deployment.</p>
                    <ul className="space-y-3 text-sm text-paragraph">
                        <li><strong>Corporate Wellness:</strong> Provide your team with accurate health trackers to promote longevity and burnout prevention.</li>
                        <li><strong>Enterprise Efficiency:</strong> Equip travelling teams with communication-boosting wearables to remove physical interaction friction.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-xl font-bold text-headline mb-4">Test at Scale</h3>
                    <p className="text-sm text-paragraph mb-4">Explore high-end spatial computing headsets and automation tools before rolling them out company-wide.</p>
                </div>
            </div>
        )
    }
};
