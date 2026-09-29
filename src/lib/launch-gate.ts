// Decides what to do with a request while the site is in waitlist mode.
// Pure and dependency-free so middleware stays thin and this is unit-testable.

import type { LaunchMode } from "./site-config";

export type GateResult =
  | { action: "allow" }
  | { action: "redirect"; to: string }
  | { action: "unavailable" };

/** Pages that only make sense once rentals are open. */
const REDIRECT_TO_WAITLIST = [
  "/signup",
  "/login",
  "/forgot-password",
  "/reset-password",
  "/checkout",
  "/dashboard",
  "/settings",
];

/** API routes that take money or create subscriptions. */
const UNAVAILABLE = ["/api/checkout"];

export const WAITLIST_PATH = "/waitlist";

function normalize(pathname: string): string {
  let path = pathname;
  try {
    // Next matches routes on the decoded path, so gate on it too:
    // "/%63heckout" must not slip past "/checkout".
    path = decodeURIComponent(pathname);
  } catch {
    // Malformed encoding: gate on the raw path.
  }
  path = path.toLowerCase().replace(/\/{2,}/g, "/");
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path;
}

function matches(path: string, prefixes: string[]): boolean {
  return prefixes.some((p) => path === p || path.startsWith(`${p}/`));
}

export function gateRequest(pathname: string, mode: LaunchMode): GateResult {
  if (mode === "live") return { action: "allow" };

  const path = normalize(pathname);
  if (matches(path, UNAVAILABLE)) return { action: "unavailable" };
  if (matches(path, REDIRECT_TO_WAITLIST)) {
    return { action: "redirect", to: WAITLIST_PATH };
  }
  return { action: "allow" };
}
