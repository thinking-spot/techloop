// Kept tiny and dependency-free so the client form can import it without
// pulling the device catalog into the browser bundle.

/** Optional self-description on the waitlist form. Feeds persona insight. */
export const WAITLIST_ROLES = [
  { value: "developer", label: "Developer or engineer" },
  { value: "creator", label: "Creator or content maker" },
  { value: "health", label: "Health and fitness focused" },
  { value: "business", label: "Business or team lead" },
  { value: "curious", label: "Just curious" },
] as const;

export type WaitlistRole = (typeof WAITLIST_ROLES)[number]["value"];
