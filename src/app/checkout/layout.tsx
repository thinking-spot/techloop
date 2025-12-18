"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { Lock } from "lucide-react";

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <header className="bg-white border-b border-[#F1F5F9] py-4">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <Link href="/">
                        <Logo />
                    </Link>
                    <div className="flex items-center gap-2 text-paragraph text-xs font-medium">
                        <Lock size={14} className="text-green-600" />
                        Secure Checkout
                    </div>
                </div>
            </header>
            <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {children}
            </main>
            <footer className="py-6 text-center text-xs text-paragraph/50">
                © 2024 TechLoop Inc. All rights reserved.
            </footer>
        </div>
    );
}
