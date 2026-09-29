import type { ReactNode } from "react";
import { PRICING, priceSummary, usd } from "@/lib/pricing";

interface PricingBlockProps {
    msrp: number;
    /** "full" is the product-page card; "inline" is a one-line summary for lists and heroes. */
    layout?: "full" | "inline";
    /** Extra content under the numbers, e.g. a launch note. */
    note?: ReactNode;
    className?: string;
}

/**
 * The one place a device's price is explained: monthly rate, deposit, what is
 * due at checkout, and what it costs to own. Every number comes from
 * lib/pricing.ts.
 */
export default function PricingBlock({
    msrp,
    layout = "full",
    note,
    className = "",
}: PricingBlockProps) {
    const p = priceSummary(msrp);

    if (layout === "inline") {
        return (
            <p className={`text-sm text-paragraph ${className}`}>
                <span className="font-bold text-headline">{usd(p.monthlyRate)}/mo</span>
                {" + "}
                {usd(p.deposit)} refundable deposit
            </p>
        );
    }

    return (
        <div className={`rounded-2xl border border-[#F1F5F9] bg-white p-6 ${className}`}>
            <div className="flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold text-headline">{usd(p.monthlyRate)}</span>
                <span className="text-xl font-medium text-paragraph">/mo</span>
            </div>
            <p className="mt-1 text-sm text-paragraph">Retail price {usd(p.msrp)}</p>

            <dl className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between">
                    <dt className="text-paragraph">First month</dt>
                    <dd className="font-medium text-headline">{usd(p.monthlyRate)}</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-paragraph">Refundable deposit</dt>
                    <dd className="font-medium text-headline">{usd(p.deposit)}</dd>
                </div>
                <div className="flex justify-between border-t border-[#F1F5F9] pt-2">
                    <dt className="font-semibold text-headline">Due at checkout</dt>
                    <dd className="font-bold text-headline">{usd(p.dueToday)}</dd>
                </div>
            </dl>
            <p className="mt-2 text-xs text-paragraph">
                The deposit comes back when you return the device, or counts toward the price if you buy it.
            </p>

            <div className="mt-5 rounded-lg border border-[#E0F2FE] bg-[#F0F9FF] p-4 text-sm text-headline">
                <p>
                    <strong>Own it for {usd(p.buyoutAfterCredits)}</strong> after {PRICING.creditedPayments} months.
                    Your deposit and first {PRICING.creditedPayments} payments count toward the{" "}
                    {usd(p.msrp)} retail price.
                </p>
            </div>

            {note && <div className="mt-4 text-xs text-paragraph">{note}</div>}
        </div>
    );
}
