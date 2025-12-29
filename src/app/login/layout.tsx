import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login to Techloop | Manage Your AI Ecosystem",
    description: "Access your dashboard to manage subscriptions, request swaps, or update your profile.",
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return children;
}
