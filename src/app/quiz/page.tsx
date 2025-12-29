import QuizRunner from "@/components/quiz/QuizRunner";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Device Finder Quiz | Find Your Perfect Wearable",
    description: "Not sure which AI device is right for you? Take our 30-second quiz to get a personalized recommendation based on your lifestyle.",
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

export default function QuizPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <main>
                <QuizRunner />
            </main>
        </div>
    );
}
