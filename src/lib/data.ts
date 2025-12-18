export type Device = {
    id: string;
    name: string;
    category: string;
    price: string;
    tagline?: string;
    description: string;
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
    useCase?: string[]; // Added for new filter
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
        useCase: ["Photography", "Communication", "Entertainment"],
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
        id: "xreal-air-pro",
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
        useCase: ["Productivity", "Travel", "Gaming"],
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
        name: "Oura Ring Gen 4",
        category: "Smart Ring",
        price: "38",
        tagline: "Your body's story, told by a ring.",
        description: "Advanced health sensing in a durable, lightweight titanium ring. Tracks sleep, readiness, and activity with research-grade accuracy.",
        longDescription: "Oura monitors your sleep, activity, recovery, temperature trends, heart rate, stress, and more — with high accuracy. It's so comfortable you'll forget you're wearing it, yet durable enough to wear anywhere.",
        imageUrl: "https://placehold.co/600x400?text=Oura+Ring",
        galleryImages: [
            "https://placehold.co/600x400?text=Oura+Ring+black",
            "https://placehold.co/600x400?text=Oura+Ring+finger",
            "https://placehold.co/600x400?text=Oura+App+View",
            "https://placehold.co/600x400?text=Oura+Charger",
        ],
        badges: ["Free Sizing Kit", "In Stock"],
        useCase: ["Fitness & Health", "Sleep"],
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
        rating: 4.7,
        reviewCount: 8456,
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
        id: "samsung-ring",
        name: "Samsung Galaxy Ring",
        category: "Smart Ring",
        price: "42",
        tagline: "The smart ring that loves your Galaxy phone.",
        description: "Everything Oura does, but plays perfectly with Samsung ecosystem. Galaxy Watch integration. Free Samsung Health app.",
        longDescription: "Designed for Galaxy users, this smart ring tracks your sleep, heart rate, and activity with precision. It seamlessly integrates with Samsung Health and works in tandem with your Galaxy Watch for enhanced accuracy. The lightweight titanium design is comfortable 24/7.",
        imageUrl: "https://placehold.co/600x400?text=Samsung+Galaxy+Ring",
        galleryImages: [
            "https://placehold.co/600x400?text=Samsung+Ring+Silver",
            "https://placehold.co/600x400?text=Samsung+Ring+Black",
            "https://placehold.co/600x400?text=Samsung+Ring+Case",
            "https://placehold.co/600x400?text=Samsung+Health+App",
        ],
        badges: ["Best for Android", "In Stock"],
        useCase: ["Fitness & Health", "Communication"],
        specs: ["7-day battery", "Galaxy Watch Gestures", "Waterproof", "No Subscription"],
        features: [
            { icon: "Bot", title: "Galaxy AI", description: "Personalized Energy Score" },
            { icon: "Battery", title: "7-Day Battery", description: "Charge once a week" },
            { icon: "Speaker", title: "Activity Tracking", description: "Auto-workout detection" },
            { icon: "Mic", title: "Sleep Coaching", description: "Advanced sleep insights" },
        ],
        technicalSpecs: [
            {
                category: "Sensors",
                items: [
                    { label: "Heart Rate", value: "Optical Heart Rate Sensor" },
                    { label: "Temperature", value: "Skin Temperature" },
                    { label: "Motion", value: "Accelerometer" }
                ]
            },
            {
                category: "Build",
                items: [
                    { label: "Material", value: "Titanium Grade 5" },
                    { label: "Durability", value: "10ATM + IP68" },
                    { label: "Weight", value: "2.3g - 3.0g" }
                ]
            },
            {
                category: "Connectivity",
                items: [
                    { label: "Bluetooth", value: "BLE 5.4" },
                    { label: "Compatibility", value: "Samsung Galaxy Smartphones" }
                ]
            }
        ],
        rating: 4.4,
        reviewCount: 1673,
        reviews: [
            {
                user: "Jason M.",
                rating: 5,
                title: "Works perfect with my S24",
                content: "The integration with my Galaxy phone is seamless. I love the Energy Score feature, it really helps me plan my day.",
                date: "November 2024",
                verified: true
            },
            {
                user: "Lisa K.",
                rating: 4,
                title: "So light",
                content: "I forget I'm wearing it. The charging case is really nice too, looks like a jewelry box.",
                date: "December 2024",
                verified: true
            }
        ]
    },
    {
        id: "nothing-ear",
        name: "Nothing Ear",
        category: "AI Earbuds",
        price: "18",
        tagline: "ChatGPT in your ears. Music in your soul.",
        description: "Premium audio meets AI assistant. Ask questions, get translations, control your life without touching your phone.",
        longDescription: "Experience pure sound with 11mm ceramic drivers and advanced active noise cancellation. Integrated with ChatGPT, you can ask questions and get answers directly into your ears. The transparent design reveals the raw beauty of technology.",
        imageUrl: "https://placehold.co/600x400?text=Nothing+Ear",
        galleryImages: [
            "https://placehold.co/600x400?text=Nothing+Ear+Case",
            "https://placehold.co/600x400?text=Nothing+Ear+Buds",
            "https://placehold.co/600x400?text=Nothing+Ear+Worn",
            "https://placehold.co/600x400?text=Nothing+X+App",
        ],
        badges: ["Best Value", "In Stock"],
        useCase: ["Entertainment", "Communication", "AI Assistant"],
        specs: ["Active Noise Cancellation", "40hr Battery", "ChatGPT Built-in", "IPX4"],
        features: [
            { icon: "Speaker", title: "Ceramic Driver", description: "11mm for rich, crisp sound" },
            { icon: "Mic", title: "Smart ANC", description: "Up to 45dB noise cancellation" },
            { icon: "Bot", title: "ChatGPT Integrated", description: "Pinch to speak to AI" },
            { icon: "Battery", title: "40.5 Hr Battery", description: "Total playback with case" },
        ],
        technicalSpecs: [
            {
                category: "Audio",
                items: [
                    { label: "Driver", value: "11mm Ceramic" },
                    { label: "Codec", value: "LHDC 5.0, LDAC" },
                    { label: "ANC", value: "Up to 45dB" }
                ]
            },
            {
                category: "Battery",
                items: [
                    { label: "Buds", value: "8.5 hours (ANC off)" },
                    { label: "Case", value: "40.5 hours total" },
                    { label: "Charging", value: "USB-C + Wireless" }
                ]
            }
        ],
        rating: 4.5,
        reviewCount: 3128,
        reviews: [
            {
                user: "Carlos R.",
                rating: 5,
                title: "Best sound for the price",
                content: "The ceramic drivers actually make a difference. Highs are super crisp. And the transparent design is a conversation starter.",
                date: "October 2024",
                verified: true
            },
            {
                user: "Sophie L.",
                rating: 4,
                title: "ChatGPT is cool",
                content: "Using ChatGPT on the go without taking out my phone is surprisingly useful for quick questions.",
                date: "November 2024",
                verified: true
            }
        ]
    },
    {
        id: "brilliant-labs-frame",
        name: "Brilliant Labs Frame",
        category: "Smart Glasses",
        price: "39",
        tagline: "Open-source smart glasses for hackers.",
        description: "Build your own AI features. Customize everything. The anti-Meta glasses. Join the developer community.",
        longDescription: "Frame is the world's first open-source AI glasses. It's designed for hackers, builders, and dreamers. With an always-on display and camera, it brings the powers of AI to your daily life. It's fully programmable and hackable.",
        imageUrl: "https://placehold.co/600x400?text=Brilliant+Labs+Frame",
        galleryImages: [
            "https://placehold.co/600x400?text=Frame+Front",
            "https://placehold.co/600x400?text=Frame+Side",
            "https://placehold.co/600x400?text=Frame+Lens",
            "https://placehold.co/600x400?text=Frame+App",
        ],
        badges: ["Developer Favorite", "In Stock"],
        useCase: ["Developer", "Productivity"],
        specs: ["Open-source SDK", "AI Vision", "MicroPython", "Lightweight"],
        features: [
            { icon: "Bot", title: "Multimodal AI", description: "See and talk to Noa AI" },
            { icon: "Camera", title: "Visual Analysis", description: "Identify objects & translate text" },
            { icon: "Battery", title: "All-Day Battery", description: "With Mister Power charger" },
            { icon: "Speaker", title: "Open Platform", description: "Code your own apps" },
        ],
        technicalSpecs: [
            {
                category: "Display",
                items: [
                    { label: "Type", value: "Micro-OLED" },
                    { label: "Resolution", value: "640 x 400 Color" },
                    { label: "FOV", value: "20 degrees" }
                ]
            },
            {
                category: "Hardware",
                items: [
                    { label: "MCU", value: "nRF52840 Cortex-M4F" },
                    { label: "Camera", value: "1280x720 Color" },
                    { label: "Weight", value: "39g" }
                ]
            }
        ],
        rating: 4.3,
        reviewCount: 894,
        reviews: [
            {
                user: "DevGuy99",
                rating: 5,
                title: "Dream device for makers",
                content: "I wrote a python script to display my server stats on the lens in 10 minutes. This is what Google Glass should have been.",
                date: "September 2024",
                verified: true
            },
            {
                user: "Alice W.",
                rating: 4,
                title: "Super light",
                content: "They look like regular glasses (mostly). The AI translation feature is actually really fast.",
                date: "October 2024",
                verified: true
            }
        ]
    },
    {
        id: "vision-pro",
        name: "Apple Vision Pro",
        category: "AR/VR Headset",
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
        badges: ["Flagship Device", "Limited Availability"],
        useCase: ["Productivity", "Entertainment", "Gaming"],
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
        rating: 4.2,
        reviewCount: 567,
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
        id: "whoop-4",
        name: "Whoop 4.0",
        category: "Fitness Tracker",
        price: "32",
        tagline: "Your 24/7 digital fitness coach.",
        description: "Personalized coaching without the distraction of a screen. Track strain, recovery, and sleep. Used by pro athletes.",
        longDescription: "WHOOP 4.0 is a wearable health and fitness coach that keeps track of your sleep, strain, recovery, and overall health. It's screen-free for a distraction-free life, and the strap is interchangeable to match your style.",
        imageUrl: "https://placehold.co/600x400?text=Whoop+4.0",
        galleryImages: [
            "https://placehold.co/600x400?text=Whoop+Black",
            "https://placehold.co/600x400?text=Whoop+Wrist",
            "https://placehold.co/600x400?text=Whoop+App",
            "https://placehold.co/600x400?text=Whoop+Battery+Pack",
        ],
        badges: ["Fitness Focused", "In Stock"],
        useCase: ["Fitness & Health", "Sleep"],
        specs: ["5-day battery", "Waterproof", "Haptic Alarm", "No Screen"],
        features: [
            { icon: "Activity", title: "Strain Coach", description: "Target exertion levels" },
            { icon: "Moon", title: "Sleep Recovery", description: " Detailed sleep staging" },
            { icon: "Battery", title: "On-the-Go Charge", description: "Wireless battery pack" },
            { icon: "Speaker", title: "Haptic Alarm", description: "Silent wake up" },
        ],
        technicalSpecs: [
            {
                category: "Sensors",
                items: [
                    { label: "Heart Rate", value: "5 LEDs + 4 Photodiodes" },
                    { label: "Temp", value: "Skin Temperature Sensor" },
                    { label: "Blood Oxygen", value: "Pulse Oximetry" }
                ]
            },
            {
                category: "Build",
                items: [
                    { label: "Waterproof", value: "IP68 (up to 10m)" },
                    { label: "Battery Life", value: "Up to 5 days" },
                    { label: "Charging", value: "Wireless slide-on pack" }
                ]
            }
        ],
        rating: 4.6,
        reviewCount: 5234,
        reviews: [
            {
                user: "Mike T.",
                rating: 5,
                title: "Changed my training",
                content: "The recovery score is real. When it says I'm red, I perform poorly. When green, I PR. Simple as that.",
                date: "November 2024",
                verified: true
            },
            {
                user: "Jenny S.",
                rating: 5,
                title: "Love that it has no screen",
                content: "I was tired of notifications on my wrist. Whoop lets me track everything without the distractions.",
                date: "December 2024",
                verified: true
            }
        ]
    },
    {
        id: "rabbit-r1",
        name: "Rabbit R1",
        category: "AI Assistant",
        price: "15",
        tagline: "Your pocket AI that actually does things.",
        description: "Navigate apps for you via voice. Order food, book rides, control music. The standalone AI companion.",
        longDescription: "The Rabbit R1 is a pocket companion that uses a Large Action Model (LAM) to use apps for you. Just press the button and ask it to order food, book a ride, or play music. No apps, no logins, just action.",
        imageUrl: "https://placehold.co/600x400?text=Rabbit+R1",
        galleryImages: [
            "https://placehold.co/600x400?text=R1+Front",
            "https://placehold.co/600x400?text=R1+Back",
            "https://placehold.co/600x400?text=R1+Camera",
            "https://placehold.co/600x400?text=R1+Scroll+Wheel",
        ],
        badges: ["New Arrival", "In Stock"],
        useCase: ["AI Assistant", "Productivity"],
        specs: ["Push-to-talk", "Rotating Camera", "Standalone", "TEO OS"],
        features: [
            { icon: "Bot", title: "Large Action Model", description: "Uses apps for you" },
            { icon: "Camera", title: "Rabbit Eye", description: "360° rotating camera" },
            { icon: "Mic", title: "Push-to-Talk", description: "Instant voice commands" },
            { icon: "Battery", title: "All-day Battery", description: "Stay connected" },
        ],
        technicalSpecs: [
            {
                category: "Display",
                items: [
                    { label: "Screen", value: "2.88\" Touchscreen" },
                    { label: "Type", value: "TFT Panel" }
                ]
            },
            {
                category: "Hardware",
                items: [
                    { label: "Processor", value: "MediaTek Helio P35" },
                    { label: "RAM", value: "4GB" },
                    { label: "Storage", value: "128GB" },
                    { label: "Connectivity", value: "4G LTE + Wi-Fi" }
                ]
            }
        ],
        rating: 3.8,
        reviewCount: 234,
        reviews: [
            {
                user: "TechReviewer",
                rating: 3,
                title: "Fun but early",
                content: "The hardware design by Teenage Engineering is stunning. The AI is promising but still learning many apps.",
                date: "November 2024",
                verified: true
            },
            {
                user: "EarlyAdopter",
                rating: 5,
                title: "The future of interfaces",
                content: "Not having to doom scroll through apps to get a task done feels liberating. The teaching mode is very powerful.",
                date: "December 2024",
                verified: true
            }
        ]
    },
    {
        id: "humane-pin",
        name: "Humane Ai Pin",
        category: "AI Assistant",
        price: "20",
        tagline: "Screen-free computing.",
        description: "Magnetic AI pin with laser projector. Voice-first interaction. Interesting concept, challenging execution.",
        longDescription: "Ai Pin is a standalone device and software platform built from the ground up for AI. It's designed to be used conversationally, so you can interact with it naturally.",
        imageUrl: "https://placehold.co/600x400?text=Humane+Ai+Pin",
        galleryImages: [
            "https://placehold.co/600x400?text=Ai+Pin+Front",
            "https://placehold.co/600x400?text=Ai+Pin+Laser",
            "https://placehold.co/600x400?text=Ai+Pin+Worn",
        ],
        badges: ["Controversial", "In Stock"],
        useCase: ["AI Assistant", "Communication"],
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
        rating: 2.9,
        reviewCount: 156,
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
        id: "nothing-ear-a",
        name: "Nothing Ear (a)",
        category: "AI Earbuds",
        price: "12",
        tagline: "AI features without the premium price.",
        description: "Great audio, solid ANC, ChatGPT integration. The smart budget choice.",
        longDescription: "Nothing Ear (a) brings the signature Nothing design and powerful active noise cancellation to a more accessible price point. With a unique bubbly case design and punchy bass, it's designed for play.",
        imageUrl: "https://placehold.co/600x400?text=Nothing+Ear+(a)",
        galleryImages: [
            "https://placehold.co/600x400?text=Ear+(a)+Yellow",
            "https://placehold.co/600x400?text=Ear+(a)+White",
            "https://placehold.co/600x400?text=Ear+(a)+Case",
            "https://placehold.co/600x400?text=Ear+(a)+Buds",
        ],
        badges: ["Budget Pick", "In Stock"],
        useCase: ["Entertainment", "AI Assistant", "Value"],
        specs: ["Active Noise Cancellation", "42hr Battery", "ChatGPT Built-in", "IPX4"],
        features: [
            { icon: "Speaker", title: "Bass Enhance", description: "Algorithm for deep bass" },
            { icon: "Mic", title: "45dB ANC", description: "Silence the world" },
            { icon: "Battery", title: "Long Battery", description: "9.5h buds / 42.5h case" },
            { icon: "Bot", title: "ChatGPT", description: "Voice integration" },
        ],
        technicalSpecs: [
            {
                category: "Audio",
                items: [
                    { label: "Driver", value: "11mm Dynamic" },
                    { label: "Codec", value: "LDAC, AAC" },
                    { label: "ANC", value: "Up to 45dB" }
                ]
            },
            {
                category: "Battery",
                items: [
                    { label: "Buds", value: "9.5 hours (ANC off)" },
                    { label: "Case", value: "42.5 hours total" },
                    { label: "Charging", value: "USB-C Fast Charge" }
                ]
            }
        ],
        rating: 4.4,
        reviewCount: 1456,
        reviews: [
            {
                user: "Student22",
                rating: 5,
                title: "Best value earbuds",
                content: "For this price? The ANC is insane. And I love the yellow color, so unique.",
                date: "October 2024",
                verified: true
            },
            {
                user: "MusicLover",
                rating: 4,
                title: "Fun sound",
                content: "Definitely more bass-heavy than the flagship ears, but perfect for the gym.",
                date: "November 2024",
                verified: true
            }
        ]
    },
    {
        id: "xreal-air-2",
        name: "XREAL Air 2",
        category: "AR Glasses",
        price: "39",
        tagline: "Same great display, without the Pro features.",
        description: "All the screen real estate of Air 2 Pro, but without dimming. Save $9/mo if you don't need it.",
        longDescription: "The XREAL Air 2 offers the same stunning 130-inch virtual display as the Pro model in an even lighter package. It connects to almost any device to provide a private, cinema-quality screen wherever you go.",
        imageUrl: "https://placehold.co/600x400?text=XREAL+Air+2",
        galleryImages: [
            "https://placehold.co/600x400?text=Air+2+Red",
            "https://placehold.co/600x400?text=Air+2+Front",
            "https://placehold.co/600x400?text=Air+2+Side",
            "https://placehold.co/600x400?text=Air+2+Gaming",
        ],
        badges: ["Value Option", "In Stock"],
        useCase: ["Productivity", "Gaming"],
        specs: ["1080p Display", "72g weight", "USB-C Plug & Play", "Compatible w/ All"],
        features: [
            { icon: "Screen", title: "130\" Screen", description: "Portable cinema" },
            { icon: "Eye", title: "Micro-OLED", description: "Sony 1080p panels" },
            { icon: "Speaker", title: "Spatial Audio", description: "Directional sound" },
            { icon: "Feather", title: "72g Light", description: "All-day comfort" },
        ],
        technicalSpecs: [
            {
                category: "Display",
                items: [
                    { label: "Panel", value: "Sony Micro-OLED" },
                    { label: "Resolution", value: "1920 x 1080 per eye" },
                    { label: "Refresh Rate", value: "Up to 120Hz" },
                    { label: "Brightness", value: "500 nits" }
                ]
            },
            {
                category: "Connectivity",
                items: [
                    { label: "Port", value: "USB-C DisplayPort" },
                    { label: "Device", value: "Steam Deck, ROG Ally, iPhone 15" }
                ]
            }
        ],
        rating: 4.5,
        reviewCount: 3567,
        reviews: [
            {
                user: "GamerPro",
                rating: 5,
                title: "Essential for Steam Deck",
                content: "Laying in bed playing Cyberpunk on a 130 inch screen is the peak of gaming. Zero lag.",
                date: "November 2024",
                verified: true
            },
            {
                user: "Traveler",
                rating: 4,
                title: "Good for planes",
                content: "I didn't need the dimming feature of the Pro, so I saved money with this. Works great on red-eyes.",
                date: "October 2024",
                verified: true
            }
        ]
    },
    {
        id: "quest-3",
        name: "Meta Quest 3",
        category: "AR/VR Headset",
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
        useCase: ["Gaming", "Entertainment"],
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
    }
];
