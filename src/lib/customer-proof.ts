// Testimonials, subscriber counts and ratings stored on content rows are
// placeholders until there are real customers. Hiding them in the template is
// not enough: a client component's props are serialized into the page's HTML,
// so they must be removed on the server before the content is passed down.

import { SHOW_CUSTOMER_PROOF } from "./site-config.ts";

export const CUSTOMER_PROOF_KEYS = [
  "testimonial_quote",
  "testimonial_name",
  "testimonial_job_title",
  "testimonial_company",
  "stat_users_count",
  "stat_rating",
  "stat_return_rate",
] as const;

/**
 * A copy of `content` without the customer-proof fields, unless proof is
 * switched on. Never mutates the original.
 */
export function stripCustomerProof<T extends object>(
  content: T,
  show: boolean = SHOW_CUSTOMER_PROOF
): T {
  if (show) return content;
  const copy = { ...content } as Record<string, unknown>;
  for (const key of CUSTOMER_PROOF_KEYS) delete copy[key];
  return copy as T;
}
