import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Techloop Blog | Future of AI Wearables",
    description: "Insights, reviews, and news about the latest AI hardware and the subscription economy.",
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-[#F8FAFC] min-h-screen">
            {/* Blog Header */}
            <header className="bg-white border-b border-[#F1F5F9] sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-paragraph hover:text-headline transition-colors text-sm font-medium">
                        <ArrowLeft size={16} />
                        Back to Techloop
                    </Link>
                    <div className="font-display font-bold text-xl text-headline">
                        Techloop <span className="text-button">Hub</span>
                    </div>
                    <div className="w-24"></div> {/* Spacer for center alignment */}
                </div>
            </header>

            <main>
                {children}
            </main>

        </div>
    );
}
