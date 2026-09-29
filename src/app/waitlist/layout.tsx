import type { Metadata } from "next";
import { devices } from "@/lib/data";
import { PRICING, lowestMonthlyRate, usd } from "@/lib/pricing";

const lowestRate = lowestMonthlyRate(devices) ?? PRICING.minMonthlyRate;

export const metadata: Metadata = {
    title: "Join the waitlist | Early access to Techloop",
    description: `Get early access to Techloop: rent AI wearables from ${usd(lowestRate)} a month and put your payments toward owning them. Tell us which device you're most curious about.`,
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

export default function WaitlistLayout({ children }: { children: React.ReactNode }) {
    return children;
}
