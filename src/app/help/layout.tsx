import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Techloop Help Center | Support & Guides",
    description: "Get answers about AI device rentals, swapping, billing, and returns. Chat with support or browse our detailed guides.",
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
    return children;
}
