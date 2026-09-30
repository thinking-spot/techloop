// Run with: npm test
//
// The sitemap and robots.txt must agree with the pages that actually exist, and
// the site's origin must be written in one place.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { SITEMAP_STATIC_ROUTES, PRIVATE_PATH_PREFIXES } from "./site-routes.ts";

const ROOT = path.resolve(import.meta.dirname, "../..");
const APP = path.join(ROOT, "src/app");

describe("sitemap static routes", () => {
  it("each one has a page", () => {
    for (const route of SITEMAP_STATIC_ROUTES) {
      const file = path.join(APP, route, "page.tsx");
      assert.ok(fs.existsSync(file), `${route || "/"} is in the sitemap but ${path.relative(ROOT, file)} does not exist`);
    }
  });

  it("has no duplicates", () => {
    assert.equal(new Set(SITEMAP_STATIC_ROUTES).size, SITEMAP_STATIC_ROUTES.length);
  });

  it("leaves out private, sign-in and internal pages", () => {
    for (const route of SITEMAP_STATIC_ROUTES) {
      for (const hidden of ["/login", "/signup", "/design-system", "/device", "/rent", "/forgot-password", "/reset-password"]) {
        // Whole path segments only: "/rent" is the old device route, "/rental-terms" is a real page.
        assert.ok(route !== hidden && !route.startsWith(`${hidden}/`), `${route} should not be in the sitemap`);
      }
      for (const prefix of PRIVATE_PATH_PREFIXES) {
        assert.ok(!`${route}/`.startsWith(prefix), `${route} is under ${prefix}, which robots.txt blocks`);
      }
    }
  });

  it("includes the pages that were missing", () => {
    for (const route of ["/business", "/privacy", "/terms", "/rental-terms"]) {
      assert.ok((SITEMAP_STATIC_ROUTES as readonly string[]).includes(route), route);
    }
  });
});

describe("one origin constant", () => {
  function collect(dir: string): string[] {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return collect(full);
      return /\.(tsx?|jsx?|mdx)$/.test(entry.name) && !/\.test\./.test(entry.name) ? [full] : [];
    });
  }

  // lib/site-config.ts owns the origin; lib/checkout.ts also accepts the bare domain as a return address.
  const ALLOWED = new Set(["src/lib/site-config.ts", "src/lib/checkout.ts"]);
  const ORIGIN = /https?:\/\/(www\.)?(try)?techloop\.com/;

  it("no page or route writes the site's origin by hand", () => {
    const hits = collect(path.join(ROOT, "src")).flatMap((file) => {
      const rel = path.relative(ROOT, file);
      if (ALLOWED.has(rel)) return [];
      return fs
        .readFileSync(file, "utf8")
        .split("\n")
        .flatMap((line, i) => {
          const t = line.trim();
          const isComment = t.startsWith("//") || t.startsWith("*") || t.startsWith("/*");
          return !isComment && ORIGIN.test(line) ? [`${rel}:${i + 1}: ${t.slice(0, 100)}`] : [];
        });
    });
    assert.deepEqual(hits, [], `use SITE_URL from lib/site-config.ts instead:\n${hits.join("\n")}`);
  });
});
