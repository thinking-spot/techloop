// The math behind the rent-vs-buy calculator, on top of lib/pricing.ts.
// Pure functions so the numbers the calculator shows can be tested.

import { PRICING, monthlyRate, deposit, buyoutPrice } from "./pricing.ts";

/** Cash spent renting `months` months and then sending the device back. The deposit is refunded. */
export function rentThenReturnTotal(msrp: number, months: number): number {
  return monthlyRate(msrp) * months;
}

/**
 * Cash spent renting `months` months and then buying it: deposit + rent + the
 * buyout. Within the credited months this is exactly the retail price.
 */
export function rentThenBuyTotal(msrp: number, months: number): number {
  return deposit(msrp) + monthlyRate(msrp) * months + buyoutPrice(msrp, months);
}

/** How much more than retail renting-then-buying costs (0 within the credited months). */
export function extraOverRetail(msrp: number, months: number): number {
  return Math.max(0, rentThenBuyTotal(msrp, months) - msrp);
}

/** The month in which rent alone has added up to the full retail price. */
export function breakEvenMonth(msrp: number): number {
  return Math.ceil(msrp / monthlyRate(msrp));
}

/**
 * Trying several devices in turn, `monthsEach` months apiece, swapping
 * between them. Returns the rent for the whole trial and the cost of
 * buying every one of them instead.
 */
export function trialComparison(msrps: number[], monthsEach: number) {
  const rent = msrps.reduce((sum, msrp) => sum + monthlyRate(msrp) * monthsEach, 0);
  const buyAll = msrps.reduce((sum, msrp) => sum + msrp, 0);
  return { rent, buyAll };
}

/** Months of payments that count toward buying. Re-exported for the calculator's copy. */
export const CREDITED_MONTHS = PRICING.creditedPayments;
