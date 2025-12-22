"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { User, ArrowLeft } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";

export default function SettingsLayout({
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
                {/* Header */}
                <header className="sticky top-0 z-30 flex h-16 items-center border-b border-[#F1F5F9] bg-white px-6">
                    <div className="md:hidden mr-4">
                        <Link href="/dashboard">
                            <Logo />
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-bold text-headline hidden md:block">Settings</h1>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-4 ml-auto">
                        <div className="flex items-center gap-3 border-l border-[#F1F5F9] pl-4">
                            <div className="h-9 w-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-500 overflow-hidden">
                                <User size={20} />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-4xl">
                    <div className="mb-6">
                        <Link href="/dashboard" className="text-sm font-medium text-paragraph hover:text-headline flex items-center gap-1 mb-4">
                            <ArrowLeft size={16} /> Back to Dashboard
                        </Link>
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
}
