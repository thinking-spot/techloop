import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Account | Join the AI Revolution",
    description: "Sign up for Techloop to start your AI wearable journey. Try risk-free for $48/mo.",
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return children;
}
