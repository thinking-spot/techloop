import Link from "next/link";
import Logo from "@/components/ui/Logo";
import MobileMenu from "@/components/layout/MobileMenu";
import { buttonVariants } from "@/components/ui/Button";
import { isWaitlistMode } from "@/lib/site-config";

const NAV_LINKS = [
    { href: "/browse", label: "Devices" },
    { href: "/quiz", label: "Device Quiz" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
];

export default function TopNav() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#F1F5F9] bg-white/95 backdrop-blur-md">
            <div className="flex h-16 items-center px-4 md:px-6">
                <Logo className="mr-8" />

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-paragraph">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="hover:text-headline transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="ml-auto flex items-center gap-2 md:gap-4">
                    {isWaitlistMode ? (
                        <Link
                            href="/waitlist"
                            className={buttonVariants({
                                size: "sm",
                                className: "text-xs md:text-sm px-3 py-2 md:px-4 rounded-lg",
                            })}
                        >
                            Join waitlist
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-xs font-semibold text-headline hover:text-button transition-colors md:text-sm"
                            >
                                Log In
                            </Link>
                            <Link
                                href="/signup"
                                className={buttonVariants({
                                    size: "sm",
                                    className: "text-xs md:text-sm px-3 py-2 md:px-4 rounded-lg",
                                })}
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                    <MobileMenu links={NAV_LINKS} />
                </div>
            </div>
        </header>
    );
}
