// Single source of truth for Techloop pricing.
//
// Every price the site shows or charges is derived from a device's MSRP using
// the rules below. All amounts are whole US dollars; convert with `toCents`
// when talking to Stripe.
//
//   monthly rate = max(MIN_MONTHLY_RATE, floor(10% of MSRP))
//   deposit      = floor(10% of MSRP)            (refundable on return)
//   due today    = first month + deposit
//   buyout       = MSRP - deposit - (up to 3 monthly payments)
//
// Keep this file free of runtime imports so it can be unit-tested with plain
// `node --test`.

import type { Device } from "./data";

export const PRICING = {
  /** Monthly rate as a percentage of MSRP. */
  ratePct: 10,
  /** Refundable security deposit as a percentage of MSRP. */
  depositPct: 10,
  /** Floor for the monthly rate, so cheap devices still cover logistics. */
  minMonthlyRate: 19,
  /** How many monthly payments credit toward a purchase. */
  creditedPayments: 3,
} as const;

export type BuyoutOptions = {
  /**
   * Percentage taken off MSRP before credits are applied, for buying a
   * refurbished (swapped) unit. Defaults to 0: full MSRP minus credits.
   */
  refurbDiscountPct?: number;
};

export type BuyoutStep = {
  /** Monthly payments made so far (capped at `creditedPayments` for the schedule). */
  paymentsMade: number;
  /** Deposit plus credited payments. */
  credit: number;
  /** What the customer still pays to own the device. */
  buyout: number;
};

export type PriceSummary = {
  msrp: number;
  monthlyRate: number;
  deposit: number;
  dueToday: number;
  /** Buyout once all credited payments have been made. */
  buyoutAfterCredits: number;
  schedule: BuyoutStep[];
};

function assertMsrp(msrp: number): void {
  if (!Number.isFinite(msrp) || msrp <= 0) {
    throw new RangeError(`MSRP must be a positive number, got ${msrp}`);
  }
}

function assertPayments(paymentsMade: number): void {
  if (!Number.isInteger(paymentsMade) || paymentsMade < 0) {
    throw new RangeError(
      `paymentsMade must be a non-negative integer, got ${paymentsMade}`
    );
  }
}

function percentOf(amount: number, pct: number): number {
  return Math.floor((amount * pct) / 100);
}

/** Monthly rental price in whole dollars. */
export function monthlyRate(msrp: number): number {
  assertMsrp(msrp);
  return Math.max(
    PRICING.minMonthlyRate,
    percentOf(msrp, PRICING.ratePct)
  );
}

/** Refundable deposit in whole dollars. No dollar floor. */
export function deposit(msrp: number): number {
  assertMsrp(msrp);
  return percentOf(msrp, PRICING.depositPct);
}

/** First month plus deposit: what a customer pays at checkout. */
export function dueToday(msrp: number): number {
  return monthlyRate(msrp) + deposit(msrp);
}

/** Amount credited toward purchase after `paymentsMade` monthly payments. */
export function credit(msrp: number, paymentsMade: number): number {
  assertPayments(paymentsMade);
  const credited = Math.min(paymentsMade, PRICING.creditedPayments);
  return deposit(msrp) + credited * monthlyRate(msrp);
}

/** What the customer still owes to keep the device. Never negative. */
export function buyoutPrice(
  msrp: number,
  paymentsMade: number,
  options: BuyoutOptions = {}
): number {
  const discountPct = options.refurbDiscountPct ?? 0;
  if (!Number.isFinite(discountPct) || discountPct < 0 || discountPct > 100) {
    throw new RangeError(
      `refurbDiscountPct must be between 0 and 100, got ${discountPct}`
    );
  }
  const basis = msrp - percentOf(msrp, discountPct);
  return Math.max(0, basis - credit(msrp, paymentsMade));
}

/** Buyout after each credited payment: months 1, 2, ... `creditedPayments`. */
export function buyoutSchedule(
  msrp: number,
  options: BuyoutOptions = {}
): BuyoutStep[] {
  return Array.from({ length: PRICING.creditedPayments }, (_, i) => {
    const paymentsMade = i + 1;
    return {
      paymentsMade,
      credit: credit(msrp, paymentsMade),
      buyout: buyoutPrice(msrp, paymentsMade, options),
    };
  });
}

/** Everything a pricing block needs, computed once. */
export function priceSummary(
  msrp: number,
  options: BuyoutOptions = {}
): PriceSummary {
  const schedule = buyoutSchedule(msrp, options);
  return {
    msrp,
    monthlyRate: monthlyRate(msrp),
    deposit: deposit(msrp),
    dueToday: dueToday(msrp),
    buyoutAfterCredits: schedule[schedule.length - 1].buyout,
    schedule,
  };
}

/**
 * Cheapest monthly rate across a set of devices ("Rent from $19/mo").
 * Returns null when no device has an MSRP.
 */
export function lowestMonthlyRate(
  devices: ReadonlyArray<Pick<Device, "msrp">>
): number | null {
  const msrps = devices
    .map((d) => d.msrp)
    .filter((m): m is number => typeof m === "number" && m > 0);
  if (msrps.length === 0) return null;
  return monthlyRate(Math.min(...msrps));
}

/** Whole dollars to cents, for Stripe. */
export function toCents(dollars: number): number {
  return Math.round(dollars * 100);
}

/** Whole dollars to a display string: 39 -> "$39". */
export function usd(dollars: number): string {
  return `$${dollars.toLocaleString("en-US")}`;
}
