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
import { BANNED_CLAIMS } from "./banned-claims.ts";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SRC = path.join(ROOT, "src");

const KNOWN_LEGACY: Record<string, string> = {
  "src/components/content/DevicePageTemplate.tsx":
    "not routed anywhere; must be rewritten on lib/pricing.ts before use (see the warning at its top)",
  "src/app/settings/subscription/page.tsx":
    "hardcoded demo data on a page that redirects to /waitlist until launch; rebuilt on real Stripe data in Phase 2",
};

const BANNED = BANNED_CLAIMS;

// These files define or demonstrate the patterns, so they contain them by design.
const PATTERN_DEFINITIONS = new Set(["src/lib/banned-claims.ts", "src/lib/content-audit.ts"]);

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
        .filter((file) => !legacyPaths.has(rel(file)) && !PATTERN_DEFINITIONS.has(rel(file)))
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
