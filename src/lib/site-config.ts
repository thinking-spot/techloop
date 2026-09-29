// Site-wide switches and constants. Anything that varies between "waitlist"
// and "live" lives here, so pages never read environment variables directly.

export type LaunchMode = "waitlist" | "live";

/**
 * Only the exact string "live" turns on the storefront. Anything else,
 * including an unset variable, is waitlist mode, so a missing env var can
 * never expose a checkout that cannot fulfill orders.
 */
export function resolveLaunchMode(value: string | undefined): LaunchMode {
  return value === "live" ? "live" : "waitlist";
}

export const LAUNCH_MODE: LaunchMode = resolveLaunchMode(
  process.env.NEXT_PUBLIC_LAUNCH_MODE
);

export const isWaitlistMode: boolean = LAUNCH_MODE === "waitlist";

/** Canonical origin used for metadata, sitemap, robots and structured data. */
export const SITE_URL = "https://www.trytechloop.com";

/**
 * Devices featured and marked available at launch. Every other catalog
 * device is shown as "Coming soon". Ids match `devices[].id` in data.ts.
 */
export const LAUNCH_DEVICE_IDS: readonly string[] = [
  "meta-rayban",
  "oura-ring",
  "xreal-air-pro",
  "rabbit-r1",
  "brilliant-labs-frame",
  "ultrahuman-ring-air",
];

export function isLaunchDevice(id: string): boolean {
  return LAUNCH_DEVICE_IDS.includes(id);
}

/**
 * Percent off MSRP when buying a refurbished (swapped) unit. 0 means full
 * MSRP minus credits. Change here to test a discount.
 */
export const REFURB_BUYOUT_DISCOUNT_PCT = 0;

/** Set NEXT_PUBLIC_SUPPORT_EMAIL once a real support address exists. */
export const SUPPORT_EMAIL: string | undefined =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || undefined;
