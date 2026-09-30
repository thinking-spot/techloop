// Run with: npm test
//
// Regression guard. Scans ALL of src/ for the claims and prices we removed, so
// they cannot creep back in through a later edit.
//
// KNOWN_LEGACY lists the only files allowed to still contain them, each with
// a reason. It can only shrink: a listed file that no longer has any banned
// phrase makes the test fail until it is removed from the list. When a phrase
// is legitimately needed somewhere, change the wording, not this list.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SRC = path.join(ROOT, "src");

const KNOWN_LEGACY: Record<string, string> = {
  "src/components/content/DevicePageTemplate.tsx":
    "not routed anywhere; must be rewritten on lib/pricing.ts before use (see the warning at its top)",
  "src/app/settings/subscription/page.tsx":
    "hardcoded demo data on a page that redirects to /waitlist until launch; rebuilt on real Stripe data in Phase 2",
};

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
  [/\b(30|60)-second\b/i, "an unverified quiz duration"],
  [/free sizing kits?/i, "free sizing kits (not offered)"],
];

function collect(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return collect(full);
    return /\.(tsx?|jsx?|mdx)$/.test(entry.name) && !/\.test\./.test(entry.name) ? [full] : [];
  });
}

const rel = (file: string) => path.relative(ROOT, file);
const files = collect(SRC);
const legacyPaths = new Set(Object.keys(KNOWN_LEGACY));

function hitsFor(file: string, pattern: RegExp): string[] {
  return fs
    .readFileSync(file, "utf8")
    .split("\n")
    .flatMap((line, i) =>
      pattern.test(line) ? [`${rel(file)}:${i + 1}: ${line.trim().slice(0, 120)}`] : []
    );
}

describe("removed claims stay removed", () => {
  it("scans the whole source tree", () => {
    assert.ok(files.length > 100, `only ${files.length} files scanned`);
  });

  for (const [pattern, why] of BANNED) {
    it(`no ${why}`, () => {
      const hits = files
        .filter((file) => !legacyPaths.has(rel(file)))
        .flatMap((file) => hitsFor(file, pattern));
      assert.deepEqual(hits, [], `${why} found:\n${hits.join("\n")}`);
    });
  }
});

describe("the known-legacy list stays honest", () => {
  for (const [file, reason] of Object.entries(KNOWN_LEGACY)) {
    it(`${file} still needs its exemption`, () => {
      const full = path.join(ROOT, file);
      assert.ok(fs.existsSync(full), `${file} no longer exists: remove it from KNOWN_LEGACY`);
      const stillDirty = BANNED.some(([pattern]) => hitsFor(full, pattern).length > 0);
      assert.ok(
        stillDirty,
        `${file} is clean now: remove it from KNOWN_LEGACY (reason was: ${reason})`
      );
    });
  }
});
