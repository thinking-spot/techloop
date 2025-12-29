"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SettingsTabs() {
    const pathname = usePathname();

    const tabs = [
        { name: "Profile", href: "/settings/profile" },
        { name: "Subscription", href: "/settings/subscription" },
    ];

    return (
        <div className="flex items-center gap-4 text-lg">
            {tabs.map((tab, index) => {
                const isActive = pathname === tab.href;
                return (
                    <div key={tab.href} className="flex items-center gap-4">
                        <Link
                            href={tab.href}
                            className={cn(
                                "font-bold transition-colors",
                                isActive ? "text-headline" : "text-paragraph/60 hover:text-paragraph"
                            )}
                        >
                            {tab.name}
                        </Link>
                        {index < tabs.length - 1 && (
                            <span className="text-paragraph/30">|</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
