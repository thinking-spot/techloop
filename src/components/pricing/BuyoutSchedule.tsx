import { PRICING, buyoutSchedule, usd } from "@/lib/pricing";

interface BuyoutScheduleProps {
    msrp: number;
    className?: string;
}

function rowLabel(paymentsMade: number): string {
    if (paymentsMade >= PRICING.creditedPayments) {
        return `${paymentsMade}+ months`;
    }
    return `${paymentsMade} month${paymentsMade === 1 ? "" : "s"}`;
}

/**
 * What it costs to keep a device after each month of renting. Every number
 * comes from lib/pricing.ts.
 */
export default function BuyoutSchedule({ msrp, className = "" }: BuyoutScheduleProps) {
    const schedule = buyoutSchedule(msrp);

    return (
        <div className={`rounded-2xl border border-[#F1F5F9] bg-white overflow-hidden ${className}`}>
            <table className="w-full text-sm">
                <caption className="sr-only">
                    What it costs to buy a {usd(msrp)} device after each month of renting
                </caption>
                <thead className="bg-[#F8FAFC] text-paragraph">
                    <tr>
                        <th scope="col" className="px-4 py-3 text-left font-medium">Buy after</th>
                        <th scope="col" className="px-4 py-3 text-right font-medium">Credit so far</th>
                        <th scope="col" className="px-4 py-3 text-right font-medium">You pay</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                    {schedule.map((step) => (
                        <tr key={step.paymentsMade}>
                            <th scope="row" className="px-4 py-3 text-left font-medium text-headline">
                                {rowLabel(step.paymentsMade)}
                            </th>
                            <td className="px-4 py-3 text-right text-paragraph">{usd(step.credit)}</td>
                            <td className="px-4 py-3 text-right font-bold text-headline">{usd(step.buyout)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="border-t border-[#F1F5F9] bg-[#F8FAFC] px-4 py-3 text-xs text-paragraph">
                Credit is your deposit plus the monthly payments you have made, up to{" "}
                {PRICING.creditedPayments}. Buy within {PRICING.creditedPayments} months and you pay
                exactly the {usd(msrp)} retail price in total. Payments after month{" "}
                {PRICING.creditedPayments} don&apos;t add credit.
            </p>
        </div>
    );
}
