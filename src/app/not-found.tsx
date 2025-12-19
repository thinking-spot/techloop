import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
    return (
        <div className="flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center bg-white px-4 text-center">
            <h1 className="text-9xl font-extrabold text-[#F1F5F9]">404</h1>
            <div className="absolute flex flex-col items-center">
                <h2 className="text-2xl font-bold font-display text-headline md:text-3xl">
                    Lost in the loop?
                </h2>
                <p className="mt-2 max-w-[500px] text-paragraph mb-8">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
                </p>
                <Link href="/">
                    <Button size="lg">Return Home</Button>
                </Link>
            </div>
        </div>
    );
}
