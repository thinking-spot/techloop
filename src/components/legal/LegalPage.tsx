import type { ReactNode } from "react";
import Link from "next/link";
import { LEGAL } from "@/lib/site-config";

const OTHER_PAGES = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/rental-terms", label: "Rental Terms" },
];

interface LegalPageProps {
    title: string;
    /** The current page's path, so it is left out of the "also see" links. */
    path: string;
    /** One or two plain sentences on what this page covers. */
    summary: string;
    children: ReactNode;
}

/** Shared frame for the privacy policy and both sets of terms. */
export default function LegalPage({ title, path, summary, children }: LegalPageProps) {
    return (
        <div className="bg-white pb-20">
            <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
                <h1 className="font-display text-4xl font-bold tracking-tight text-headline md:text-5xl">{title}</h1>
                <p className="mt-3 text-sm text-paragraph">Last updated {LEGAL.lastUpdated}</p>

                <div
                    role="note"
                    className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
                >
                    <strong>Draft.</strong> A lawyer has not reviewed this page yet. It describes how Techloop
                    plans to work when we open, and it may change before then.
                </div>

                <p className="mt-8 text-lg leading-relaxed text-paragraph">{summary}</p>

                <div className="prose prose-slate mt-10 max-w-none prose-headings:font-display prose-headings:text-headline prose-h2:mt-12 prose-h2:text-2xl prose-a:text-button prose-a:no-underline hover:prose-a:underline">
                    {children}
                </div>

                <nav aria-label="Other legal pages" className="mt-16 border-t border-[#F1F5F9] pt-6 text-sm text-paragraph">
                    Also see:{" "}
                    {OTHER_PAGES.filter((page) => page.href !== path).map((page, i) => (
                        <span key={page.href}>
                            {i > 0 && " · "}
                            <Link href={page.href} className="font-medium text-button hover:underline">
                                {page.label}
                            </Link>
                        </span>
                    ))}
                </nav>
            </div>
        </div>
    );
}
