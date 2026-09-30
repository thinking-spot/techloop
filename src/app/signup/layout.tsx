import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Account | Join the AI Revolution",
    description: "Create your Techloop account to rent AI wearables and put your payments toward owning them.",
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return children;
}
