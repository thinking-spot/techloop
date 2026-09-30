import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import BuyoutSchedule from "@/components/pricing/BuyoutSchedule";
import { PRICING, priceSummary, usd } from "@/lib/pricing";
import { rentThenBuyTotal } from "@/lib/rent-vs-buy";
import { POLICY } from "@/lib/faq";
import { DEFAULT_SUPPORT_EMAIL, SUPPORT_EMAIL } from "@/lib/site-config";

export const metadata: Metadata = {
    title: "Rental Terms | Techloop",
    description: "How renting from Techloop works: pricing, deposits, cancelling, swaps, and buying a device you rent.",
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

const CONTACT_EMAIL = SUPPORT_EMAIL || DEFAULT_SUPPORT_EMAIL;

/** A $399 device, used for every worked example below. */
const EXAMPLE_MSRP = 399;
const ex = priceSummary(EXAMPLE_MSRP);
const LONG_RENTAL_MONTHS = 6;
const longTotal = rentThenBuyTotal(EXAMPLE_MSRP, LONG_RENTAL_MONTHS);

export default function RentalTermsPage() {
    return (
        <LegalPage
            title="Rental Terms"
            path="/rental-terms"
            summary="These terms explain how renting a device from Techloop will work: what you pay, what happens to your deposit, how to swap, cancel or buy, and what happens if a device does not come back. We are not renting devices yet."
        >
            <h2>How renting works</h2>
            <ol>
                <li>You choose a device and pay your first month plus a refundable deposit.</li>
                <li>We ship it to you. Your first device is new and sealed.</li>
                <li>You keep it for at least {POLICY.firstRentalMinimumDays} days, then you can keep renting, buy it, swap it for a different device, or send it back.</li>
            </ol>
            <p>
                In these terms, &quot;retail price&quot; means the price shown for the device on its page on our site, and &quot;you&quot; means the
                person renting.
            </p>

            <h2>What you pay</h2>
            <ul>
                <li>
                    <strong>Monthly price:</strong> {PRICING.ratePct}% of the device&apos;s retail price, rounded down to a whole dollar,
                    with a minimum of {usd(PRICING.minMonthlyRate)}.
                </li>
                <li>
                    <strong>Deposit:</strong> {PRICING.depositPct}% of the device&apos;s retail price, rounded down to a whole dollar.
                </li>
                <li>
                    <strong>Due at checkout:</strong> your first month plus the deposit.
                </li>
                <li>
                    <strong>After that:</strong> your monthly price is charged to your card each month until you cancel.
                </li>
                <li>
                    <strong>Tax:</strong> our prices include sales tax, so nothing is added at checkout.
                </li>
            </ul>
            <p>
                Example: a device with a retail price of {usd(EXAMPLE_MSRP)} costs {usd(ex.monthlyRate)} a month with a{" "}
                {usd(ex.deposit)} deposit, so {usd(ex.dueToday)} is due at checkout. The price of every device is listed on our{" "}
                <Link href="/pricing">pricing page</Link>.
            </p>

            <h2>If our prices change</h2>
            <p>
                A rental you already have keeps its monthly price and deposit for as long as you keep that device. New prices apply
                to new rentals, and to a device you swap to.
            </p>

            <h2>Your deposit</h2>
            <ul>
                <li>We charge the deposit with your first payment.</li>
                <li>
                    When you return the device, we refund the deposit within {POLICY.depositRefundDays} days of receiving it, less any
                    deduction for damage (see below).
                </li>
                <li>If you buy the device instead, the deposit counts toward the price.</li>
            </ul>

            <h2>Minimum first month, cancelling and returns</h2>
            <ul>
                <li>
                    Your first month is a {POLICY.firstRentalMinimumDays}-day minimum. If you cancel earlier, that first month is not
                    refunded.
                </li>
                <li>You can cancel at any time.</li>
                <li>
                    After you cancel, send the device back within {POLICY.returnWindowDays} days using the prepaid return label.
                </li>
                <li>Monthly payments you have already made are not refunded.</li>
            </ul>

            <h2>If a payment fails</h2>
            <ul>
                <li>
                    We retry a failed monthly payment {POLICY.paymentRetries === 1 ? "once" : `${POLICY.paymentRetries} times`} and email
                    you.
                </li>
                <li>You then have {POLICY.paymentGraceDays} days to update your card or pay.</li>
                <li>
                    If {POLICY.missedPaymentsBeforeUnreturned} monthly payments are missed, we treat the device as not returned.
                    The rules in the next section then apply.
                </li>
            </ul>

            <h2>If a device is not returned, lost or damaged</h2>
            <ul>
                <li>
                    <strong>Not returned.</strong> If we do not receive the device within {POLICY.returnWindowDays} days of you
                    cancelling, or if we treat it as not returned because of missed payments, we will charge the card on file the
                    remaining balance: the retail price minus your credit (see &quot;Buying a device&quot; below for what counts as
                    credit). By renting, you authorize us to make that charge.
                </li>
                <li>
                    <strong>Normal wear</strong> from ordinary use is expected and is not charged.
                </li>
                <li>
                    <strong>Damage beyond normal wear,</strong> such as cracks or water damage, is deducted from your deposit.
                </li>
                <li>
                    <strong>Lost, stolen or damaged beyond repair.</strong> We may charge the card on file up to the retail price
                    minus your credit.
                </li>
            </ul>

            <h2>Buying a device</h2>
            <p>
                You are never required to buy. If you decide to, here is how it works. This section is our rent-to-own
                disclosure.
            </p>
            <ul>
                <li>
                    <strong>Credit.</strong> Your deposit plus your first {PRICING.creditedPayments} monthly payments count as credit
                    toward the retail price. Monthly payments after month {PRICING.creditedPayments} do not add credit.
                </li>
                <li>
                    <strong>Price to buy.</strong> The retail price minus your credit.
                </li>
                <li>
                    <strong>Buy within {PRICING.creditedPayments} months</strong> and the total you pay, rent and purchase together,
                    is exactly the retail price.
                </li>
                <li>
                    <strong>Buy later</strong> and the total is the retail price plus the monthly payments after month{" "}
                    {PRICING.creditedPayments}.
                </li>
                <li>You own the device once we have received the full price to buy.</li>
                <li>Buying a refurbished device (see &quot;Swaps&quot;) works the same way: retail price minus your credit.</li>
            </ul>

            <p>
                Example: for a device with a retail price of {usd(EXAMPLE_MSRP)}, the price to buy after each month of renting is:
            </p>
            <div className="not-prose my-6">
                <BuyoutSchedule msrp={EXAMPLE_MSRP} />
            </div>
            <p>
                If you rent for {LONG_RENTAL_MONTHS} months and then buy, you pay {usd(longTotal)} in total, which is{" "}
                {usd(longTotal - EXAMPLE_MSRP)} more than the retail price, because the payments after month{" "}
                {PRICING.creditedPayments} did not add credit.
            </p>

            <h2>Swaps</h2>
            <ul>
                <li>After your first {POLICY.firstRentalMinimumDays} days you can swap for a different device.</li>
                <li>Shipping is free, both for the replacement and for sending the first device back.</li>
                <li>From the swap on, you pay the new device&apos;s monthly price.</li>
                <li>Your deposit carries over, adjusted up or down to match the new device&apos;s deposit.</li>
                <li>
                    Your credit stays with the device that earned it. A swap therefore starts your progress toward owning the
                    new device from zero.
                </li>
            </ul>

            <h2>New and refurbished devices</h2>
            <p>
                Your first device ships new and sealed. A replacement you get by swapping is a certified refurbished unit: tested,
                cleaned and reset. We will tell you which kind you are getting before you confirm.
            </p>

            <h2>Shipping</h2>
            <p>We pay for shipping in both directions, including the prepaid return label. Rentals are planned for addresses in the United States only.</p>

            <h2>Looking after the device</h2>
            <ul>
                <li>Use it normally, and do not modify it, open it, resell it or sublet it.</li>
                <li>Use cameras and recording features lawfully and with respect for other people&apos;s privacy.</li>
                <li>
                    Sign out of your accounts and reset the device before you send it back. We reset every device we receive, but
                    you are responsible for removing your own data.
                </li>
            </ul>

            <h2>Help with your device</h2>
            <p>
                Help with using or fixing a device comes from the device&apos;s maker. For questions about your rental, payments,
                shipping, swaps or returns, email us.
            </p>

            <h2>Checking your identity and payment</h2>
            <p>
                To prevent fraud, we may verify your identity and payment details before we rent you a device, and we may decline
                or cancel a rental if we cannot. We keep a card on file so that we can make the charges described above.
            </p>

            <h2>Contact us</h2>
            <p>
                Questions about these terms? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. See also our{" "}
                <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>.
            </p>
        </LegalPage>
    );
}
