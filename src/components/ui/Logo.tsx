import Link from "next/link";

export default function Logo({ className }: { className?: string }) {
    return (
        <Link href="/" className={`font-display font-bold text-2xl tracking-tighter text-headline ${className}`}>
            techloop
            <span className="sr-only">Home</span>
        </Link>
    );
}
