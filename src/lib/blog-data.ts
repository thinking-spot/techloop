export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    author: {
        name: string;
        avatar: string;
        role: string;
    };
    date: string;
    readTime: string;
    category: "Review" | "Comparison" | "News" | "Guide";
    content: string; // HTML string for now
    relatedProducts?: string[]; // IDs of products to rent
};

export const blogPosts: BlogPost[] = [
    {
        slug: "oura-ring-vs-samsung-galaxy-ring",
        title: "Oura Ring Gen 3 vs. Samsung Galaxy Ring: Which Smart Ring Reigns Supreme?",
        excerpt: "The battle for your finger is heating up. We spent two weeks wearing both smart rings simultaneously. Here's which one is right for you.",
        coverImage: "https://placehold.co/1200x630/094067/ffffff?text=Oura+vs+Samsung",
        author: {
            name: "Sarah Chen",
            avatar: "https://placehold.co/100x100?text=SC",
            role: "Wearables Expert"
        },
        date: "December 12, 2024",
        readTime: "8 min read",
        category: "Comparison",
        relatedProducts: ["oura-ring", "samsung-ring"],
        content: `
            <p class="lead">Smart rings are the new smartwatches. They're discreet, comfortable, and track the metric that actually matters most: sleep.</p>
            
            <h2>The Contenders</h2>
            <p>On one hand, we have the <strong>Oura Ring</strong>, the pioneer that defined the category. On the other, the <strong>Samsung Galaxy Ring</strong>, the tech giant's first foray into invisible health tracking.</p>

            <h3>Design & Comfort</h3>
            <p>Both rings are made of titanium and weigh less than 3 grams. You honestly forget you're wearing them after 10 minutes. The Oura Ring has a slightly more "jewelry-like" finish, while the Galaxy Ring sports a concave design that helps prevent scratches.</p>

            <h3>Sleep Tracking Accuracy</h3>
            <p>We compared both against a professional sleep study headband. Oura achieved a 92% correlation with sleep staging, while Samsung hit 89%. Both are excellent, but Oura's years of algorithm refinement show here.</p>

            <h3>The Samsung Advantage: Ecosystem</h3>
            <p>If you have a Galaxy phone and Watch, the Galaxy Ring is a no-brainer. It uses "Energy Score" to combine data from both the watch and ring. Plus, it has gesture controls to dismiss alarms on your phone.</p>

            <h3>The Verdict</h3>
            <ul>
                <li><strong>Choose Oura if:</strong> You want the absolute best sleep data and work across iPhone/Android.</li>
                <li><strong>Choose Samsung if:</strong> You are deep in the Samsung ecosystem and hate subscription fees (Oura requires $6/mo, Samsung is free).</li>
            </ul>
        `
    },
    {
        slug: "rabbit-r1-hands-on-review",
        title: "Rabbit R1 Review: The Future is Cute, But Is It Ready?",
        excerpt: "We rented the Rabbit R1 for a month to see if a specialized AI companion can actually replace your smartphone apps.",
        coverImage: "https://placehold.co/1200x630/ff6b6b/ffffff?text=Rabbit+R1+Review",
        author: {
            name: "Mike Ross",
            avatar: "https://placehold.co/100x100?text=MR",
            role: "Tech Journalist"
        },
        date: "November 28, 2024",
        readTime: "6 min read",
        category: "Review",
        relatedProducts: ["rabbit-r1"],
        content: `
            <p class="lead">The Rabbit R1 is the most interesting gadget of 2024. Designed by Teenage Engineering, it's undeniably cool. But what does it actually <em>do</em>?</p>

            <h2>Hardware: A+</h2>
            <p>The luminous orange square feels great in the hand. The scroll wheel is satisfyingly clicky. The "Push-to-Talk" button brings back walkie-talkie vibes. It stands out in a sea of black glass rectangles.</p>

            <h2>The "Large Action Model"</h2>
            <p>Rabbit OS promises to use apps for you. Instead of opening Uber, you just hold the button and say "Get me a ride to the airport."</p>
            <p><strong>When it works, it's magic.</strong> It found my location, got the price, and booked the ride in 15 seconds. No tapping, no waiting for the app to load.</p>
            <p><strong>When it fails, it's frustrating.</strong> Asking it to play a specific playlist on Spotify worked 50% of the time. Sometimes it just hallucinated a song title.</p>

            <h2>Rent or Buy?</h2>
            <p>This is the perfect device to rent. It's a glimpse into the future that isn't quite ready for a $200 commitment + data plan. Rent it for a month to experience the cutting edge of AI, then swap it for something else when the novelty wears off.</p>
        `
    },
    {
        slug: "best-smart-glasses-2025",
        title: "The Ultimate Guide to Smart Glasses in 2025",
        excerpt: "From Meta's AI assistant to XREAL's giant virtual screens, smart glasses are finally good. We break down the different categories.",
        coverImage: "https://placehold.co/1200x630/3da9fc/ffffff?text=Smart+Glasses+Guide",
        author: {
            name: "Sarah Chen",
            avatar: "https://placehold.co/100x100?text=SC",
            role: "Wearables Expert"
        },
        date: "December 5, 2024",
        readTime: "10 min read",
        category: "Guide",
        relatedProducts: ["meta-rayban", "xreal-air-pro", "brilliant-labs-frame"],
        content: `
            <p class="lead">We used to look at screens. Now we look through them.</p>
            <p>The smart glasses market has splintered into three distinct categories. Knowing which one you want is half the battle.</p>
            
            <h2>1. Audio & AI Glasses</h2>
            <p><strong>Best for:</strong> Everyday wear, capturing moments, voice assistants.</p>
            <p>Example: <strong>Meta Ray-Bans</strong>. They look like normal sunglasses but have cameras and speakers. They are the best gadget for parents and travelers.</p>

            <h2>2. Screen Extenders (AR Lite)</h2>
            <p><strong>Best for:</strong> Gaming, flights, working from coffee shops.</p>
            <p>Example: <strong>XREAL Air 2</strong>. These project a 130-inch virtual monitor in front of you. Perfect for Steam Deck gamers or watching movies on a plane without neck strain.</p>

            <h2>3. True Assisted Reality (HUD)</h2>
            <p><strong>Best for:</strong> Developers, makers, translation.</p>
            <p>Example: <strong>Brilliant Labs Frame</strong>. These put a small heads-up display in your field of view. It's like having subtitles for real life.</p>
        `
    }
];
