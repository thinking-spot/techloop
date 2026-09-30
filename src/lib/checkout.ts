// What the checkout API routes are allowed to trust from a request.
// Pure functions (no Stripe, no Next), so the rules are unit-tested.

import { devices } from "./data.ts";
import { monthlyRate, toCents } from "./pricing.ts";
import { isLaunchDevice, SITE_URL } from "./site-config.ts";

export type CheckoutItem = {
  id: string;
  name: string;
  /** What the customer is charged each month, in cents. */
  monthlyCents: number;
};

/**
 * The only way a route learns what to charge. The request says WHICH device;
 * the name and the price come from our own catalog and pricing rule, never from
 * the request. Anything that is not a rentable launch device returns null.
 */
export function resolveCheckoutItem(productId: unknown): CheckoutItem | null {
  if (typeof productId !== "string") return null;
  const device = devices.find((d) => d.id === productId);
  if (!device || device.msrp === undefined || !isLaunchDevice(device.id)) return null;
  return {
    id: device.id,
    name: device.name,
    monthlyCents: toCents(monthlyRate(device.msrp)),
  };
}

export type OriginOptions = {
  /** Vercel's VERCEL_URL: the host (no scheme) of this deployment, for preview builds. */
  vercelUrl?: string;
  /** Allow http://localhost:<port>. Off in production. */
  allowLocalhost?: boolean;
};

const APEX_ORIGIN = "https://trytechloop.com";
const LOCALHOST = /^http:\/\/localhost:\d{1,5}$/;

/**
 * Where Stripe sends the customer back to. The Origin header is chosen by
 * whoever sends the request, so it is only used when it is one of our own
 * origins; anything else falls back to the canonical site.
 */
export function resolveOrigin(header: string | null, options: OriginOptions = {}): string {
  if (!header) return SITE_URL;
  const allowed = new Set([SITE_URL, APEX_ORIGIN]);
  if (options.vercelUrl) allowed.add(`https://${options.vercelUrl}`);
  if (allowed.has(header)) return header;
  if (options.allowLocalhost && LOCALHOST.test(header)) return header;
  return SITE_URL;
}
