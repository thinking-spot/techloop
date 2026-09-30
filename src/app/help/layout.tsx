import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Help center | Techloop",
    description: "Answers about renting AI wearables: pricing, deposits, swaps, buying a device and returns.",
    alternates: { canonical: "/help" },
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
    return children;
}
