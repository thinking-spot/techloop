"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { Bell, Search, User } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";

// We'll reuse the Sidebar but override nav items in a real app.
// For now, we'll keep the sidebar as is since we'll unlock the items there.

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            {/* Sidebar (Desktop) */}
            <div className="hidden md:block w-64 shrink-0">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col min-w-0">
                {/* Dashboard Header */}
                <header className="sticky top-0 z-30 flex h-16 items-center border-b border-[#F1F5F9] bg-white px-6">
                    <div className="md:hidden mr-4">
                        <Link href="/dashboard">
                            <Logo />
                        </Link>
                    </div>

                    <div className="flex flex-1 items-center justify-between">
                        <div className="relative w-full max-w-sm hidden md:block">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-paragraph/50">
                                <Search size={16} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search rentals, devices..."
                                className="pl-9 pr-4 py-2 w-full text-sm rounded-lg border border-[#F1F5F9] bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-button/20 focus:border-button text-headline placeholder:text-paragraph/50"
                            />
                        </div>

                        <div className="flex items-center gap-4 ml-auto">
                            <button className="relative text-paragraph hover:text-headline transition-colors">
                                <Bell size={20} />
                                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
                            </button>
                            <div className="flex items-center gap-3 pl-4 border-l border-[#F1F5F9]">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-headline">James Ladd</p>
                                    <p className="text-xs text-paragraph">Pro Member</p>
                                </div>
                                <div className="h-9 w-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-500 overflow-hidden">
                                    {/* Avatar placeholder */}
                                    <User size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
