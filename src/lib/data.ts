export type Device = {
    id: string;
    name: string;
    category: string;
    price: string;
    description: string;
    tagline?: string;
    longDescription?: string;
    imageUrl: string;
    specs: string[];
    features?: {
        icon: string;
        title: string;
        description: string;
    }[];
    galleryImages?: string[];
    technicalSpecs?: {
        category: string;
        items: { label: string; value: string }[];
    }[];
    reviews?: {
        user: string;
        rating: number;
        title: string;
        content: string;
        date: string;
        verified: boolean;
        avatar?: string;
    }[];
    rating?: number;
    reviewCount?: number;
    badges?: string[];
};

export const devices: Device[] = [
    {
        id: "meta-rayban",
        name: "Meta Ray-Ban Wayfarer",
        category: "Smart Glasses",
        price: "48",
        tagline: "Look normal. Act superhuman.",
        description: "Capture POV videos hands-free. Take calls without headphones. Your AI assistant lives in iconic Ray-Ban frames.",
        longDescription: "The smart glasses everyone's actually wearing. Built on the iconic Ray-Ban Wayfarer design, these are the smart glasses that finally don't look 'smart'. Meta sold 1M+ pairs because they solved the fundamental problem: they look like regular sunglasses your friends already wear.",
        imageUrl: "https://placehold.co/600x400?text=Meta+Ray-Ban",
        galleryImages: [
            "https://placehold.co/600x400?text=Meta+Ray-Ban+Front",
            "https://placehold.co/600x400?text=Meta+Ray-Ban+Side",
            "https://placehold.co/600x400?text=Meta+Ray-Ban+Lifestyle",
            "https://placehold.co/600x400?text=Meta+Ray-Ban+Case",
        ],
        badges: ["Most Popular", "In Stock"],
        specs: ["12MP Ultra Wide Camera", "Qualcomm Snapdragon AR1 Gen 1", "Open-ear Audio", "Meta AI Voice Control"],
        features: [
            { icon: "Camera", title: "12MP Camera", description: "Capture photos & 60s videos hands-free" },
            { icon: "Mic", title: "5 Built-in Mics", description: "Crystal-clear calls in any environment" },
            { icon: "Speaker", title: "Open-Ear Audio", description: "Rich sound, hear surroundings" },
            { icon: "Bot", title: "Meta AI Built-in", description: "Voice assistant without your phone" },
            { icon: "Battery", title: "4-6 Hour Battery", description: "All-day use with charging case" },
        ],
        technicalSpecs: [
            {
                category: "Camera & Video",
                items: [
                    { label: "Photo", value: "12 MP (4032 x 3024)" },
                    { label: "Video", value: "1080p @ 30fps" },
                    { label: "FOV", value: "80° horizontal" },
                    { label: "Storage", value: "32GB (500+ photos, 100+ videos)" }
                ]
            },
            {
                category: "Audio",
                items: [
                    { label: "Speakers", value: "2x Custom Open-Ear" },
                    { label: "Microphones", value: "5x with noise suppression" },
                    { label: "Voice", value: "HD Voice Calls" }
                ]
            },
            {
                category: "Connectivity",
                items: [
                    { label: "Bluetooth", value: "5.3" },
                    { label: "Wi-Fi", value: "Wi-Fi 6" },
                    { label: "OS Support", value: "iOS 14.4+, Android 10+" }
                ]
            }
        ],
        rating: 4.8,
        reviewCount: 2347,
        reviews: [
            {
                user: "Marcus T.",
                rating: 5,
                title: "Worth every penny for POV content",
                content: "I'm a travel content creator and these glasses completely changed my workflow. Being able to capture hands-free POV footage while hiking is a game-changer.",
                date: "October 2024",
                verified: true
            },
            {
                user: "Sarah K.",
                rating: 4,
                title: "Great concept, minor flaws",
                content: "Love the idea and use them daily. Meta AI misunderstands me 30% of the time, but taking calls while walking my dog is amazing.",
                date: "November 2024",
                verified: true
            }
        ]
    },
    {
        id: "xreal-air",
        name: "XREAL Air 2 Pro",
        category: "AR Glasses",
        price: "48",
        tagline: "Your personal 130-inch screen, anywhere.",
        description: "Work on a massive virtual display from coffee shops. Watch movies on flights. The ultimate portable monitor.",
        longDescription: "XREAL has 51% market share in AR glasses because they nailed the core use case: a giant, crisp display you can take anywhere. No cameras, no AI gimmicks—just a beautiful 1080p screen floating in front of your eyes.",
        imageUrl: "https://placehold.co/600x400?text=XREAL+Air+2+Pro",
        galleryImages: [
            "https://placehold.co/600x400?text=XREAL+Front",
            "https://placehold.co/600x400?text=XREAL+Side",
            "https://placehold.co/600x400?text=XREAL+Lifestyle",
            "https://placehold.co/600x400?text=XREAL+POV",
        ],
        badges: ["Best for Productivity", "In Stock"],
        specs: ["Micro-OLED Panel", "120Hz Refresh Rate", "One-touch Immersion Control", "Directional Audio"],
        features: [
            { icon: "Screen", title: "130\" Virtual Display", description: "Equivalent to 4m away" },
            { icon: "Eye", title: "1080p Per Eye", description: "Crystal-clear Micro-OLED" },
            { icon: "Sun", title: "Electrochromic", description: "0-100% tint in 0.5s" },
            { icon: "Plug", title: "USB-C Plug & Play", description: "No setup, just plug in" },
            { icon: "Feather", title: "Ultra-Light 75g", description: "Lighter than sunglasses" },
        ],
        technicalSpecs: [
            {
                category: "Display",
                items: [
                    { label: "Panel", value: "Sony Micro-OLED" },
                    { label: "Resolution", value: "1920 x 1080 per eye" },
                    { label: "Brightness", value: "500 nits" },
                    { label: "Refresh Rate", value: "Up to 120Hz" }
                ]
            },
            {
                category: "Connectivity",
                items: [
                    { label: "Connection", value: "USB-C DisplayPort Alt Mode" },
                    { label: "Compatibility", value: "iPhone 15+, Android, Mac, Windows, Steam Deck" }
                ]
            }
        ],
        rating: 4.6,
        reviewCount: 1892,
        reviews: [
            {
                user: "David L.",
                rating: 5,
                title: "Remote work game changer",
                content: "I work from coffee shops daily. Having a second 130-inch monitor in my backpack is invaluable. The dimming feature is magic.",
                date: "November 2024",
                verified: true
            },
            {
                user: "Jessica M.",
                rating: 4,
                title: "Great for flights",
                content: "Used these on a 6-hour flight to London. Watched 3 movies comfortably. Slight nose pressure after 4 hours but totally worth it.",
                date: "October 2024",
                verified: true
            }
        ]
    },
    {
        id: "oura-ring",
        name: "Oura Ring Gen 3",
        category: "Smart Ring",
        price: "48",
        tagline: "Health tracking wrapped around your finger.",
        description: "Advanced health sensing in a durable, lightweight titanium ring. Tracks sleep, readiness, and activity with research-grade accuracy.",
        longDescription: "Oura monitors your sleep, activity, recovery, temperature trends, heart rate, stress, and more — with high accuracy. It's so comfortable you'll forget you're wearing it, yet durable enough to wear anywhere.",
        imageUrl: "https://placehold.co/600x400?text=Oura+Ring",
        galleryImages: [
            "https://placehold.co/600x400?text=Oura+Ring+black",
            "https://placehold.co/600x400?text=Oura+Ring+finger",
            "https://placehold.co/600x400?text=Oura+App+View",
            "https://placehold.co/600x400?text=Oura+Charger",
        ],
        badges: ["Best Sleep Tracker", "Low Stock"],
        specs: ["Sleep Tracking", "Heart Rate Variability", "7 Days Battery", "Water Resistant"],
        features: [
            { icon: "Moon", title: "Sleep Analysis", description: "Deep, Light, REM stages" },
            { icon: "Activity", title: "Readiness Score", description: "Know when to push or rest" },
            { icon: "Heart", title: "24/7 Heart Rate", description: "Accurate daytime & nighttime HR" },
            { icon: "Battery", title: "7-Day Battery", description: "Fast charging, long life" },
        ],
        technicalSpecs: [
            {
                category: "Sensors",
                items: [
                    { label: "Heart Rate", value: "Green & Red LEDs" },
                    { label: "Temperature", value: "NTC Body Temp Sensors" },
                    { label: "Movement", value: "3D Accelerometer" }
                ]
            },
            {
                category: "Build",
                items: [
                    { label: "Material", value: "Titanium" },
                    { label: "Water Resistance", value: "100m (Swim proof)" },
                    { label: "Weight", value: "4-6 grams" }
                ]
            }
        ],
        rating: 4.9,
        reviewCount: 3102,
        reviews: [
            {
                user: "Emily R.",
                rating: 5,
                title: "Replaced my Apple Watch",
                content: "I hated wearing a watch to sleep. This ring is invisible. The data is shockingly accurate compared to my sleep lab results.",
                date: "December 2024",
                verified: true
            }
        ]
    },
    {
        id: "vision-pro",
        name: "Apple Vision Pro",
        category: "Spatial Computer",
        price: "299",
        tagline: "Welcome to the era of spatial computing.",
        description: "Seamlessly blends digital content with your physical space. Controlled by your eyes, hands, and voice.",
        longDescription: "Vision Pro transforms how you use the apps you love. Arrange apps anywhere and scale them to the perfect size. Browsing the web in Safari, creating a to-do list in Notes, chatting in Messages, and moving between them with a glance.",
        imageUrl: "https://placehold.co/600x400?text=Apple+Vision+Pro",
        galleryImages: [
            "https://placehold.co/600x400?text=Vision+Pro+Front",
            "https://placehold.co/600x400?text=Vision+Pro+POV",
            "https://placehold.co/600x400?text=Vision+Pro+Side",
            "https://placehold.co/600x400?text=Vision+Pro+Battery",
        ],
        badges: ["Premium", "Limited Availability"],
        specs: ["Micro-OLED Display", "R1 Chip", "Eye Tracking", "Spatial Audio"],
        features: [
            { icon: "Eye", title: "Eye Tracking", description: "Navigate with just your eyes" },
            { icon: "Hand", title: "Hand Gestures", description: "Tap fingers to select" },
            { icon: "Screen", title: "Infinite Canvas", description: "Apps anywhere in your room" },
            { icon: "Video", title: "3D Camera", description: "Capture spatial photos/videos" },
        ],
        technicalSpecs: [
            {
                category: "Display",
                items: [
                    { label: "Resolution", value: "23 million pixels" },
                    { label: "Type", value: "Micro-OLED" },
                    { label: "Refresh Rate", value: "90Hz, 96Hz, 100Hz" }
                ]
            },
            {
                category: "Processor",
                items: [
                    { label: "Main Chip", value: "Apple M2" },
                    { label: "Sensor Chip", value: "Apple R1" }
                ]
            }
        ],
        rating: 4.7,
        reviewCount: 450,
        reviews: [
            {
                user: "Michael B.",
                rating: 5,
                title: "The future is here",
                content: "It's expensive, but renting it for a month was the best $299 I've spent. Watching movies on this thing ruins every other TV.",
                date: "November 2024",
                verified: true
            }
        ]
    },
    {
        id: "humane-pin",
        name: "Humane Ai Pin",
        category: "AI Pin",
        price: "48",
        tagline: "Take AI with you everywhere.",
        description: "Screen-free AI assistant that clips to your clothing and projects info onto your hand.",
        longDescription: "Ai Pin is a standalone device and software platform built from the ground up for AI. It's designed to be used conversationally, so you can interact with it naturally.",
        imageUrl: "https://placehold.co/600x400?text=Humane+Ai+Pin",
        galleryImages: [
            "https://placehold.co/600x400?text=Ai+Pin+Front",
            "https://placehold.co/600x400?text=Ai+Pin+Laser",
            "https://placehold.co/600x400?text=Ai+Pin+Worn",
        ],
        badges: ["New Arrival"],
        specs: ["Laser Ink Display", "Translates Languages", "Web Search", "Trust Light"],
        features: [
            { icon: "Mic", title: "Conversational AI", description: "Just talk to it naturally" },
            { icon: "Laser", title: "Laser Ink Display", description: "Projects UI on your palm" },
            { icon: "Globe", title: "Real-time Translation", description: "Speak 50+ languages" },
            { icon: "Camera", title: "Smart Camera", description: "Analyzes what you see" },
        ],
        technicalSpecs: [
            {
                category: "Hardware",
                items: [
                    { label: "Processor", value: "Snapdragon" },
                    { label: "Projection", value: "Laser Ink" },
                    { label: "Connectivity", value: "LTE + Wi-Fi" }
                ]
            }
        ],
        rating: 3.8,
        reviewCount: 120,
        reviews: [
            {
                user: "Tom H.",
                rating: 4,
                title: "Interesting experiment",
                content: "It replaces my phone for 30% of tasks. Great for a digital detox weekend. Translation feature is killer.",
                date: "October 2024",
                verified: true
            }
        ]
    },
    {
        id: "quest-3",
        name: "Meta Quest 3",
        category: "VR/MR Headset",
        price: "48",
        tagline: "Expand your world.",
        description: "The most powerful Meta Quest yet, with breakthrough mixed reality.",
        longDescription: "Transform your home into a virtual playground, where virtual elements blend with your physical space. It's the most powerful Quest yet, featuring next-level performance and infinite display resolution.",
        imageUrl: "https://placehold.co/600x400?text=Meta+Quest+3",
        galleryImages: [
            "https://placehold.co/600x400?text=Quest+3+Front",
            "https://placehold.co/600x400?text=Quest+3+POV",
            "https://placehold.co/600x400?text=Quest+3+Controllers",
        ],
        badges: ["Best VR Headset", "In Stock"],
        specs: ["4K+ Infinite Display", "Snapdragon XR2 Gen 2", "Color Passthrough", "Touch Plus Controllers"],
        features: [
            { icon: "Eye", title: "4K+ Infinite Display", description: "2064x2208 pixels per eye" },
            { icon: "Cpu", title: "Snapdragon XR2 Gen 2", description: "Lightning fast performance" },
            { icon: "Camera", title: "Color Passthrough", description: "See your room in hi-res" },
            { icon: "Hand", title: "Touch Plus", description: "Haptic feedback controllers" },
        ],
        technicalSpecs: [
            {
                category: "Display",
                items: [
                    { label: "Resolution", value: "2064x2208 per eye" },
                    { label: "Refresh Rate", value: "90Hz, 120Hz" },
                    { label: "FOV", value: "110 degrees" }
                ]
            }
        ],
        rating: 4.8,
        reviewCount: 1540,
        reviews: [
            {
                user: "Alex G.",
                rating: 5,
                title: "Mind blowing MR",
                content: "Mixed reality is finally good. Playing board games on my coffee table with aliens is wild.",
                date: "December 2024",
                verified: true
            }
        ]
    },
];
