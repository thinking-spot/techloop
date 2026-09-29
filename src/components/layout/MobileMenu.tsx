"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export interface MobileMenuLink {
    href: string;
    label: string;
}

/**
 * Small-screen navigation. The desktop nav and the sidebar are both hidden
 * below the md breakpoint, so without this phones have no way to reach
 * anything except the homepage.
 */
export default function MobileMenu({ links }: { links: MobileMenuLink[] }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="md:hidden relative">
            <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((o) => !o)}
                className="p-2 rounded-lg text-headline hover:bg-[#F1F5F9] transition-colors"
            >
                {open ? <X size={20} /> : <Menu size={20} />}
            </button>

            {open && (
                <nav
                    id="mobile-menu"
                    className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-[#F1F5F9] bg-white p-2 shadow-lg"
                >
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-4 py-3 text-sm font-medium text-paragraph hover:bg-[#F8FAFC] hover:text-headline"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            )}
        </div>
    );
}
