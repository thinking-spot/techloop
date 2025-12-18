
export type QuestionType = "single" | "multiple" | "slider" | "grid-card";

export type Option = {
    id: string;
    label: string;
    description?: string; // New field for card description
    icon?: string;
    image?: string;
    value?: number;
};

export type Question = {
    id: number;
    text: string;
    subtext?: string;
    type: QuestionType;
    options: Option[];
    skippable?: boolean;
};

export const quizQuestions: Question[] = [
    {
        id: 1,
        text: "What does a typical day look like for you right now?",
        type: "single",
        options: [
            { id: "motion", label: "Constant motion", icon: "🏃" },
            { id: "focus", label: "Deep focus", icon: "💼" },
            { id: "explore", label: "Always exploring", icon: "✈️" },
            { id: "balance", label: "Building balance", icon: "🏠" },
            { id: "create", label: "Creating & playing", icon: "🎮" }
        ]
    },
    {
        id: 2,
        text: "Which of these device types interest you most?",
        subtext: "Select any that catch your eye",
        type: "grid-card",
        options: [
            {
                id: "glasses",
                label: "Smart Glasses",
                description: "Record video, see info, stay hands-free",
                image: "https://placehold.co/400x300?text=Hands-Free+Capture"
            },
            {
                id: "rings",
                label: "Smart Rings",
                description: "Health tracking, sleep insights, invisible tech",
                image: "https://placehold.co/400x300?text=Invisible+Health"
            },
            {
                id: "earbuds",
                label: "AI Earbuds",
                description: "Translation, hearing enhancement, smart audio",
                image: "https://placehold.co/400x300?text=Smart+Audio"
            },
            {
                id: "standalone",
                label: "AI Pins & Pendants",
                description: "Voice AI, hands-free assistant",
                image: "https://placehold.co/400x300?text=AI+Assistant"
            },
            {
                id: "open",
                label: "I'm open to anything",
                description: "Show me what fits my life best",
                image: "https://placehold.co/400x300?text=Discover+All"
            }
        ]
    },
    {
        id: 3,
        text: "What's the biggest thing you wish was easier?",
        type: "single",
        options: [
            { id: "capture", label: "Capturing moments without being 'that person'", icon: "📸" },
            { id: "memory", label: "Remembering everything - names, tasks, ideas", icon: "🤯" },
            { id: "body", label: "Understanding what my body actually needs", icon: "💪" },
            { id: "communicate", label: "Communicating when language is a barrier", icon: "🌍" },
            { id: "focus", label: "Staying focused without distractions", icon: "📱" },
            { id: "info", label: "Having info when I need it instantly", icon: "⚡" }
        ]
    },
    {
        id: 4,
        text: "In 6 months, what version of yourself do you want to be?",
        type: "single",
        options: [
            { id: "documentarian", label: "The Documentarian", icon: "🎥" },
            { id: "optimizer", label: "The Optimizer", icon: "🧠" },
            { id: "connector", label: "The Connector", icon: "🗣️" },
            { id: "producer", label: "The Producer", icon: "🎯" },
            { id: "present", label: "The Present One", icon: "🧘" },
            { id: "adopter", label: "The Early Adopter", icon: "🚀" }
        ]
    },
    {
        id: 5,
        text: "Which of these scenarios excites you most?",
        subtext: "Choose up to 3",
        type: "multiple",
        options: [
            { id: "pov_video", label: "Recording my daughter's soccer game from my perspective", icon: "📹" },
            { id: "recovery", label: "Waking up knowing exactly how recovered I am", icon: "💤" },
            { id: "directions", label: "Getting turn-by-turn directions while cycling", icon: "🏃" },
            { id: "ai_voice", label: "Asking AI questions out loud and hearing answers", icon: "🗨️" },
            { id: "translate", label: "Translating conversations in real-time", icon: "🌏" },
            { id: "stress", label: "Seeing how stress affects my body", icon: "📊" },
            { id: "broll", label: "Capturing B-roll for content hands-free", icon: "🎬" },
            { id: "calls", label: "Taking calls while cooking or working out", icon: "📞" },
            { id: "read", label: "Listening to articles read to me", icon: "📚" }
        ]
    },
    {
        id: 6,
        text: "How do you feel about trying new technology?",
        type: "slider",
        options: [
            { id: "safe", label: "Safe bet", value: 1, icon: "✅" },
            { id: "balanced", label: "Balanced", value: 2, icon: "⚖️" },
            { id: "pioneer", label: "Practical pioneer", value: 3, icon: "🎯" },
            { id: "bleeding", label: "Bleeding edge", value: 4, icon: "🔬" }
        ]
    },
    {
        id: 7,
        text: "A lot of AI devices have cameras. How do you feel about that?",
        type: "single",
        options: [
            { id: "love", label: "I love it - That's the whole point!", icon: "🎥" },
            { id: "curious", label: "I'm curious - if I can control it", icon: "🤔" },
            { id: "concerned", label: "A bit concerned - need privacy controls", icon: "😬" },
            { id: "no", label: "No thanks - prefer no camera", icon: "🚫" }
        ]
    },
    {
        id: 8,
        text: "What's your vibe when it comes to wearing tech?",
        type: "single",
        options: [
            { id: "bold", label: "Bold statement", icon: "✨" },
            { id: "subtle", label: "Subtle cool", icon: "😎" },
            { id: "invisible", label: "Invisible", icon: "👻" }
        ]
    },
    {
        id: 9,
        text: "How do you approach big tech purchases?",
        type: "single",
        options: [
            { id: "try", label: "Try before I commit", icon: "🎯" },
            { id: "swap", label: "Always trying new things", icon: "🔄" },
            { id: "buy", label: "I'll buy if it's perfect", icon: "💰" },
            { id: "browse", label: "Just browsing", icon: "🤷" }
        ]
    },
    {
        id: 10,
        text: "Any of these apply to you?",
        subtext: "Choose all that apply",
        type: "multiple",
        skippable: true,
        options: [
            { id: "glasses", label: "I wear prescription glasses", icon: "👓" },
            { id: "swim", label: "I swim/workout intensely", icon: "🏊" },
            { id: "earbuds", label: "I already love my earbuds", icon: "🎧" },
            { id: "rings", label: "I don't wear rings", icon: "💍" },
            { id: "battery", label: "Battery life is crucial", icon: "⚡" }
        ]
    }
];

export const resultMapping: Record<string, any> = {
    "documentarian": {
        identity: "Memory Keeper",
        description: "You want to capture life's moments without being glued to your phone. You value presence, but you also want to remember everything.",
        primary: {
            category: "Smart Glasses",
            headline: "Start with AI Glasses",
            benefits: ["Record moments from your POV", "Stay present (no phone)", "Capture milestones naturally"],
            devices: ["meta-rayban", "xreal-air-2"]
        },
        secondary: {
            category: "Smart Rings",
            headline: "Add an AI Ring for Health",
            benefits: ["Understand body battery", "Improve recovery", "Data-driven decisions"],
            devices: ["oura-ring"]
        }
    },
    "optimizer": {
        identity: "Bio-Hacker",
        description: "You treat your body like a system to be optimized. You want precise data to improve your sleep, recovery, and performance.",
        primary: {
            category: "Smart Rings",
            headline: "Start with an AI Ring",
            benefits: ["Clinical-grade sleep tracking", "Recovery scores", "Invisible form factor"],
            devices: ["oura-ring", "samsung-ring"]
        },
        secondary: {
            category: "AI Earbuds",
            headline: "Add AI Earbuds for Focus",
            benefits: ["Flow state audio", "Voice coaching", " distraction elimination"],
            devices: ["nothing-ear"]
        }
    },
    "connector": {
        identity: "Global Citizen",
        description: "You believe in breaking down barriers. Whether it's language or distance, you want technology to help you connect with others.",
        primary: {
            category: "AI Earbuds",
            headline: "Start with AI Earbuds",
            benefits: ["Real-time translation", "Clear calls anywhere", "Voice assistant ready"],
            devices: ["nothing-ear", "samsung-ring"]
        },
        secondary: {
            category: "Smart Glasses",
            headline: "Add Glasses for Presence",
            benefits: ["Take calls hands-free", "Stay in the moment", "Capture shared memories"],
            devices: ["meta-rayban"]
        }
    },
    "producer": {
        identity: "Content Creator",
        description: "The world is your canvas. You want to create high-quality content without being weighed down by gear.",
        primary: {
            category: "Smart Glasses",
            headline: "Your New POV Camera",
            benefits: ["Instant B-roll capture", "First-person perspective", "High quality video"],
            devices: ["meta-rayban", "xreal-air-2"]
        },
        secondary: {
            category: "Standalone AI",
            headline: "Add a Dedicated AI Assistant",
            benefits: ["Generate ideas on the fly", "Control music/tasks", "Focus on creating"],
            devices: ["rabbit-r1"]
        }
    },
    "present": {
        identity: "Digital Minimalist",
        description: "You want the benefits of connectivity without the addiction of the screen. You prefer technology that stays out of your way.",
        primary: {
            category: "Smart Rings",
            headline: "Invisible Tech",
            benefits: ["No screen distractions", "Passive tracking", "Silent notifications"],
            devices: ["oura-ring", "whoop-4-0"]
        },
        secondary: {
            category: "Audio Only",
            headline: "Add Smart Audio",
            benefits: ["Assistant in your ear", "Keep phone in pocket", "Heads-up living"],
            devices: ["nothing-ear"]
        }
    },
    "adopter": {
        identity: "Futurist",
        description: "You want to live in 2030 today. You aren't afraid of beta software if it means experiencing the cutting edge.",
        primary: {
            category: "Standalone AI",
            headline: "Experience the Future",
            benefits: ["Large Action Models", "New form factors", "Experimental interfaces"],
            devices: ["rabbit-r1", "humane-pin"]
        },
        secondary: {
            category: "AR Glasses",
            headline: "Add True AR Glasses",
            benefits: ["Heads-up display", "Coding/hacking potential", "Open source"],
            devices: ["brilliant-labs-frame"]
        }
    }
};
