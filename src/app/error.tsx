"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertCircle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center bg-white px-4 text-center">
            <div className="mb-6 rounded-full bg-red-100 p-4 text-red-600">
                <AlertCircle size={48} />
            </div>
            <h2 className="mb-2 text-2xl font-bold font-display text-headline md:text-3xl">
                Something went wrong
            </h2>
            <p className="mb-8 max-w-[500px] text-paragraph">
                We apologize for the inconvenience. Our team has been notified of the issue.
            </p>
            <div className="flex gap-4">
                <Button variant="outline" onClick={() => window.location.reload()}>
                    Refresh Page
                </Button>
                <Button onClick={() => reset()}>Try Again</Button>
            </div>
        </div>
    );
}
