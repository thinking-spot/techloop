"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { isWaitlistMode } from "@/lib/site-config";
import { track } from "@/lib/analytics";

interface PrimaryCtaProps {
    /** Device this CTA is about. Pre-selects it on the waitlist form. */
    device?: { id: string; name?: string };
    /** Where on the page the CTA sits, for analytics (e.g. "product_pricing_card"). */
    location: string;
    /** Rendered instead of the waitlist link once the site is live. */
    liveCta?: ReactNode;
    /** Overrides the waitlist label. */
    label?: string;
    size?: "sm" | "md" | "lg";
    variant?: "primary" | "secondary";
    className?: string;
}

/**
 * The one place that decides between "Join the waitlist" and "Rent now".
 * Pages render this and never branch on the launch mode themselves.
 */
export default function PrimaryCta({
    device,
    location,
    liveCta,
    label = "Join the waitlist",
    size = "md",
    variant = "primary",
    className,
}: PrimaryCtaProps) {
    if (!isWaitlistMode) {
        return (
            <>
                {liveCta ?? (
                    <Link
                        href="/browse"
                        className={buttonVariants({ variant, size, className })}
                    >
                        Find your device
                    </Link>
                )}
            </>
        );
    }

    const href = device
        ? `/waitlist?device=${encodeURIComponent(device.id)}`
        : "/waitlist";

    return (
        <Link
            href={href}
            className={buttonVariants({ variant, size, className })}
            onClick={() =>
                track("cta_click", {
                    cta: "join_waitlist",
                    location,
                    device_id: device?.id,
                })
            }
        >
            {label}
        </Link>
    );
}
