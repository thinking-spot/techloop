// Claims and prices the business can no longer stand behind. One list, three users:
//   - claims-guard.test.ts scans all of src/ for them,
//   - content-audit.ts (and scripts/audit-content.mjs) scans the Supabase content rows,
//   - content-schemas-doc.test.ts scans techloop-content-schemas.md.
// Add a pattern here and all three pick it up.

export const BANNED_CLAIMS: ReadonlyArray<readonly [RegExp, string]> = [
  [/\$42\b/, "the old flat $42 price"],
  [/\$48\b/, "the old $48 price"],
  [/\$75\b/, "the Explorer plan price"],
  [/\$99\b/, "the Power User plan price"],
  [/risk[- ]free/i, '"risk-free" (the deposit and first month are not refundable)'],
  [/\bno risk\b/i, '"no risk"'],
  [/cancel anytime/i, '"cancel anytime" (say what actually happens)'],
  [/no questions asked/i, '"no questions asked"'],
  [/\b98%/, "the invented 98% stat"],
  [/4\.8\/5/, "the invented 4.8/5 rating"],
  [/Marcus T|Elliott W/, "the placeholder testimonials"],
  [/Explorer (plan|Plan)/, "the Explorer plan"],
  [/Power User/, "the Power User plan"],
  [/Founder.s Pricing/i, "the Founder's Pricing perk"],
  [/ships? today|ship it today|available to ship/i, "unsupported shipping-speed claims"],
  [/Q2 2026/, "the stale launch date"],
  [/\bMost Popular\b/, "the unearned Most Popular badge"],
  [/\bIn Stock\b/, "the In Stock badge"],
  [/\b(30|60)-second\b/i, "an unverified quiz duration"],
  [/free sizing kits?/i, "free sizing kits (not offered)"],
];
