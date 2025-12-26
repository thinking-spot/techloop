import Link from "next/link";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
    return (
        <Link href="/" className={`relative block ${className}`}>
            <Image
                src="/images/techloop-wordmark.png"
                alt="Techloop"
                width={140}
                height={32}
                className="h-8 w-auto object-contain"
                priority
            />
        </Link>
    );
}
