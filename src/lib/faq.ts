// The questions people ask, answered once. Every page that shows an FAQ pulls
// from here, so the terms cannot drift between pages the way prices did.
// Numbers come from lib/pricing.ts; the day counts below are the policy.

import { PRICING, monthlyRate, deposit, dueToday, buyoutPrice, usd } from "./pricing.ts";
import { isWaitlistMode } from "./site-config.ts";

export const POLICY = {
  /** The first rental runs at least this long; cancelling early does not refund it. */
  firstRentalMinimumDays: 30,
  /** After cancelling, the device must be back within this many days. */
  returnWindowDays: 14,
  /** The deposit is refunded within this many days of us receiving the device. */
  depositRefundDays: 7,
  /** A failed monthly payment is retried this many times, and the customer is emailed once. */
  paymentRetries: 1,
  /** Days after a failed payment to fix the card before we start treating the rental as at risk. */
  paymentGraceDays: 14,
  /** This many missed monthly payments and the device is treated as not returned. */
  missedPaymentsBeforeUnreturned: 2,
} as const;

export type FaqTopic = "getting-started" | "pricing" | "buying" | "swaps" | "returns";

export type Faq = {
  id: string;
  topic: FaqTopic;
  question: string;
  answer: string;
};

/** A $399 device, used for the worked numbers inside answers. */
const EXAMPLE_MSRP = 399;

const rate = monthlyRate(EXAMPLE_MSRP);
const dep = deposit(EXAMPLE_MSRP);

const ALL_FAQS: Faq[] = [
  {
    id: "waitlist-status",
    topic: "getting-started",
    question: "Can I rent one today?",
    answer:
      "Not yet. We're opening to the waitlist first. Join the list, tell us which device you're most curious about, and we'll email you when your spot opens.",
  },
  {
    id: "pricing-how",
    topic: "pricing",
    question: "How much does it cost?",
    answer: `Your monthly price is ${PRICING.ratePct}% of the device's retail price, rounded down, with a ${usd(PRICING.minMonthlyRate)} minimum. A ${usd(EXAMPLE_MSRP)} device is ${usd(rate)} a month. At checkout you pay your first month plus a refundable deposit of ${PRICING.depositPct}% of retail (${usd(dep)} here), so ${usd(dueToday(EXAMPLE_MSRP))} to start.`,
  },
  {
    id: "pricing-tax",
    topic: "pricing",
    question: "Are taxes included?",
    answer: "Yes. The price you see already includes sales tax, so nothing is added at checkout.",
  },
  {
    id: "pricing-deposit",
    topic: "pricing",
    question: "What happens to my deposit?",
    answer: `We charge it with your first payment. When you return the device, we refund it within ${POLICY.depositRefundDays} days of receiving it. If you buy the device instead, your deposit counts toward the price. Accidental damage, like cracks or water damage, is deducted from it.`,
  },
  {
    id: "buying-keep",
    topic: "buying",
    question: "Can I keep a device I love?",
    answer: `Yes. Your deposit and your first ${PRICING.creditedPayments} monthly payments count toward buying it. On a ${usd(EXAMPLE_MSRP)} device that's ${usd(buyoutPrice(EXAMPLE_MSRP, PRICING.creditedPayments))} to own it after ${PRICING.creditedPayments} months. Buy within ${PRICING.creditedPayments} months and you pay exactly the retail price in total. Payments after month ${PRICING.creditedPayments} don't add credit.`,
  },
  {
    id: "first-device-new",
    topic: "getting-started",
    question: "Will my device be new?",
    answer:
      "Your first device ships new and sealed. If you swap, the replacement is a certified refurbished unit: tested, cleaned and reset. Buying a refurbished unit works the same way as any other: retail price minus your credit.",
  },
  {
    id: "swaps-how",
    topic: "swaps",
    question: "How do swaps work?",
    answer: `After your first ${POLICY.firstRentalMinimumDays} days you can swap for a different device. Shipping is free. You pay the new device's monthly price, your deposit carries over (adjusted up or down for the new device's price), and your credit stays with the device that earned it, so a swap restarts your progress toward owning.`,
  },
  {
    id: "returns-cancel",
    topic: "returns",
    question: "Can I cancel?",
    answer: `Yes, any time. Your first month is a ${POLICY.firstRentalMinimumDays}-day minimum, so cancelling early doesn't refund it. After you cancel, send the device back within ${POLICY.returnWindowDays} days using the prepaid label. Payments you've already made aren't refunded.`,
  },
  {
    id: "returns-unreturned",
    topic: "returns",
    question: "What if I don't send it back?",
    answer: `If we don't receive the device within ${POLICY.returnWindowDays} days of you cancelling, we charge the card on file the remaining balance: the retail price minus your credit.`,
  },
  {
    id: "pricing-failed-payment",
    topic: "pricing",
    question: "What if a payment fails?",
    answer: `We retry it once and email you. You then have ${POLICY.paymentGraceDays} days to update your card. If ${POLICY.missedPaymentsBeforeUnreturned} monthly payments are missed, we treat the device as not returned and the charge described under "What if I don't send it back?" applies.`,
  },
  {
    id: "pricing-price-changes",
    topic: "pricing",
    question: "Will my monthly price change?",
    answer:
      "No. If our prices change, a rental you already have keeps its monthly price and deposit for as long as you keep that device.",
  },
  {
    id: "support-device",
    topic: "getting-started",
    question: "Who helps if my device has a problem?",
    answer:
      "Help with using or fixing a device comes from the device's maker. For your rental, payments, shipping, swaps or returns, email us.",
  },
  {
    id: "returns-shipping",
    topic: "returns",
    question: "Who pays for shipping?",
    answer:
      "We do, both ways. That covers shipping to you, the prepaid label to send a device back, and swap shipments.",
  },
  {
    id: "vs-store",
    topic: "buying",
    question: "How is this different from buying and returning?",
    answer: `Stores let you return a device within a set window, but you pay full price up front and can usually only try one. With Techloop you pay about ${PRICING.ratePct}% a month, can swap to something else, and your payments count toward owning the devices you keep.`,
  },
];

/** Every FAQ that applies right now. The "can I rent today?" answer is only true before launch. */
export function getAllFaqs(): Faq[] {
  return ALL_FAQS.filter((f) => f.id !== "waitlist-status" || isWaitlistMode);
}

/** The FAQs with these ids, in the order asked for. Ids that do not apply right now are skipped. */
export function getFaqs(ids: string[]): Faq[] {
  const byId = new Map(getAllFaqs().map((f) => [f.id, f]));
  return ids.flatMap((id) => {
    const faq = byId.get(id);
    return faq ? [faq] : [];
  });
}
