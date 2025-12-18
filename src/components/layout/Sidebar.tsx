"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Package, Settings, HelpCircle, Lock, MessageSquare, Sparkles, BookOpen } from "lucide-react";
import { clsx } from "clsx";

const navItems = [
    { name: "Browse Devices", href: "/browse", icon: LayoutGrid },
    { name: "My Rentals", href: "/dashboard", icon: Package },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help & Support", href: "/help", icon: HelpCircle },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-[#F1F5F9] bg-white hidden md:flex flex-col">
            <div className="flex-1 px-4 py-6 overflow-y-auto">
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                "flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                                pathname === item.href
                                    ? "bg-[#EFF6FF] text-button"
                                    : "text-paragraph hover:bg-[#F8FAFC] hover:text-headline"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </div>
                            {/* @ts-ignore - isLocked is not standard but we use it here */}
                            {(item as any).isLocked && <Lock className="h-4 w-4 opacity-40" />}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t border-[#F1F5F9]">
                <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-white rounded-full shadow-sm text-button">
                            <MessageSquare size={18} />
                        </div>
                        <h4 className="font-semibold text-headline text-sm">Need help?</h4>
                    </div>
                    <p className="text-xs text-paragraph mb-3">
                        Contact our support team 24/7. We&apos;re here to help.
                    </p>
                    <Link href="/contact">
                        <button className="w-full bg-white border border-[#E2E8F0] text-headline text-xs font-semibold py-2 rounded-lg hover:bg-[#F1F5F9] transition-colors">
                            Contact Support
                        </button>
                    </Link>
                </div>
            </div>
        </aside>
    );
}
