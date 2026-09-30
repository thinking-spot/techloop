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

/** Only the exact string "true" turns a flag on. */
export function parseFlag(value: string | undefined): boolean {
  return value === "true";
}

/**
 * Testimonials, subscriber counts and star ratings on content pages. Off
 * until there are real customers: the content tables were generated with
 * placeholder values, and showing them would be inventing social proof.
 * Turn on with NEXT_PUBLIC_SHOW_CUSTOMER_PROOF=true once the data is real.
 */
export const SHOW_CUSTOMER_PROOF: boolean = parseFlag(
  process.env.NEXT_PUBLIC_SHOW_CUSTOMER_PROOF
);

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

/**
 * Where the help page tells people to write. Defaults to the address the
 * old help page already published; confirm that mailbox exists, or set
 * NEXT_PUBLIC_SUPPORT_EMAIL. Set it to an empty string to hide the contact section.
 */
export const SUPPORT_EMAIL: string | undefined =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "help@trytechloop.com";
