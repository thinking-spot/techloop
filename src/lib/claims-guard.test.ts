// Run with: npm test
//
// Regression guard. Scans the source files that have been cleaned up for the
// claims and prices we removed, so they cannot creep back in through a later
// edit. To extend it, add a file or folder to CLEAN_PATHS. When a phrase is
// legitimately needed somewhere, change the wording, not this list.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");

const CLEAN_PATHS = [
  // pages
  "src/app/page.tsx",
  "src/app/pricing",
  "src/app/how-it-works",
  "src/app/waitlist",
  "src/app/product",
  "src/app/browse",
  "src/app/quiz",
  "src/app/help",
  "src/app/business",
  "src/app/signup/layout.tsx",
  // components
  "src/components/marketing",
  "src/components/pricing",
  "src/components/waitlist",
  "src/components/mdx",
  "src/components/quiz",
  "src/components/analytics",
  "src/components/layout",
  "src/components/content/JobPageTemplate.tsx",
  "src/components/content/BlogPostTemplate.tsx",
  "src/components/ui/DeviceCard.tsx",
  "src/components/ui/PrimaryCta.tsx",
  "src/components/ui/AddToCartButton.tsx",
  // shared logic and copy
  "src/lib/faq.ts",
  "src/lib/brands.ts",
  "src/lib/pricing.ts",
  "src/lib/rent-vs-buy.ts",
  "src/lib/waitlist.ts",
  "src/lib/site-config.ts",
  "src/lib/content.ts",
];

const BANNED: Array<[RegExp, string]> = [
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
];

function collect(target: string): string[] {
  const full = path.join(ROOT, target);
  const stat = fs.statSync(full);
  if (stat.isFile()) return [full];
  return fs.readdirSync(full, { withFileTypes: true }).flatMap((entry) => {
    const child = path.join(target, entry.name);
    if (entry.isDirectory()) return collect(child);
    return /\.(tsx?|jsx?|mdx)$/.test(entry.name) && !/\.test\./.test(entry.name)
      ? [path.join(ROOT, child)]
      : [];
  });
}

describe("removed claims stay removed", () => {
  const files = CLEAN_PATHS.flatMap(collect);

  it("scans a meaningful set of files", () => {
    assert.ok(files.length > 40, `only ${files.length} files scanned`);
    for (const target of CLEAN_PATHS) {
      assert.ok(fs.existsSync(path.join(ROOT, target)), `${target} does not exist`);
    }
  });

  for (const [pattern, why] of BANNED) {
    it(`no ${why}`, () => {
      const hits: string[] = [];
      for (const file of files) {
        const lines = fs.readFileSync(file, "utf8").split("\n");
        lines.forEach((line, i) => {
          if (pattern.test(line)) {
            hits.push(`${path.relative(ROOT, file)}:${i + 1}: ${line.trim().slice(0, 120)}`);
          }
        });
      }
      assert.deepEqual(hits, [], `${why} found:\n${hits.join("\n")}`);
    });
  }
});
