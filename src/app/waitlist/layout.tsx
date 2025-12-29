import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Join the Waitlist | Early Access to Techloop",
    description: "Secure your spot for early access to the Netflix of AI wearables. Founder perks available for the first 1,000 members.",
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

export default function WaitlistLayout({ children }: { children: React.ReactNode }) {
    return children;
}
