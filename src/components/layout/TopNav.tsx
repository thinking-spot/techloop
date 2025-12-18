import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function TopNav() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#F1F5F9] bg-white/95 backdrop-blur-md">
            <div className="flex h-16 items-center px-6">
                <Logo className="mr-8" />

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-paragraph">
                    <Link href="/quiz" className="hover:text-headline transition-colors">
                        Device Quiz
                    </Link>
                    <Link href="/how-it-works" className="hover:text-headline transition-colors">
                        How It Works
                    </Link>
                    <Link href="/pricing" className="hover:text-headline transition-colors">
                        Pricing
                    </Link>
                </nav>

                <div className="ml-auto flex items-center gap-4">
                    {/* Auth buttons placeholder - distinct from sidebar items */}
                    <Link href="/login" className="text-sm font-semibold text-headline hover:text-button transition-colors">
                        Log In
                    </Link>
                    <Link href="/signup" className="text-sm font-semibold bg-button text-button-text px-4 py-2 rounded-lg hover:bg-[#2D8FDC] transition-colors">
                        Sign Up
                    </Link>
                </div>
            </div>
        </header>
    );
}
