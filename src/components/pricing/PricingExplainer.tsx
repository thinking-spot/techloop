import { PRICING, monthlyRate, deposit, usd } from "@/lib/pricing";
import PricingBlock from "@/components/pricing/PricingBlock";
import BuyoutSchedule from "@/components/pricing/BuyoutSchedule";

interface PricingExplainerProps {
    /** MSRP of the device used in the worked example. */
    exampleMsrp?: number;
    heading?: string;
    className?: string;
}

/**
 * "How the money works", with a worked example. Reused on the home, pricing,
 * how-it-works and waitlist pages so the story is told identically everywhere.
 */
export default function PricingExplainer({
    exampleMsrp = 399,
    heading = "How pricing works",
    className = "",
}: PricingExplainerProps) {
    const rate = monthlyRate(exampleMsrp);
    const dep = deposit(exampleMsrp);

    const steps = [
        {
            title: `Rent for about ${PRICING.ratePct}% a month`,
            body: `Your monthly price is ${PRICING.ratePct}% of the device's retail price, rounded down, with a ${usd(PRICING.minMonthlyRate)} minimum. A ${usd(exampleMsrp)} device is ${usd(rate)} a month.`,
        },
        {
            title: "Put down a refundable deposit",
            body: `We also charge a deposit of ${PRICING.depositPct}% of retail with your first payment (${usd(dep)} on that ${usd(exampleMsrp)} device). You get it back when you return the device, or it counts toward the price if you buy.`,
        },
        {
            title: "Love it? Own it.",
            body: `Your deposit and your first ${PRICING.creditedPayments} monthly payments count toward buying. Buy within ${PRICING.creditedPayments} months and you pay exactly the retail price, with no markup. Payments after that don't add credit.`,
        },
    ];

    return (
        <section className={className}>
            <h2 className="font-display text-3xl font-bold text-headline md:text-4xl">{heading}</h2>

            <ol className="mt-8 grid gap-6 md:grid-cols-3">
                {steps.map((step, i) => (
                    <li key={step.title} className="rounded-2xl border border-[#F1F5F9] bg-white p-6 shadow-sm">
                        <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-button text-sm font-bold text-white">
                            {i + 1}
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-headline">{step.title}</h3>
                        <p className="text-sm leading-relaxed text-paragraph">{step.body}</p>
                    </li>
                ))}
            </ol>

            <div className="mt-10">
                <h3 className="mb-4 text-lg font-bold text-headline">
                    Example: a {usd(exampleMsrp)} device
                </h3>
                <div className="grid gap-6 md:grid-cols-2 md:items-start">
                    <PricingBlock msrp={exampleMsrp} />
                    <BuyoutSchedule msrp={exampleMsrp} />
                </div>
            </div>
        </section>
    );
}
