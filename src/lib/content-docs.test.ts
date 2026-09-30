// Run with: npm test
//
// techloop-content-schemas.md is what AI content generation is copied from, so whatever it
// says comes back in the content rows. These tests keep the doc, the audit and the cleanup
// patch telling the same story as the code.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { auditRow, type AuditContext } from "./content-audit.ts";
import { devices } from "./data.ts";
import { LAUNCH_DEVICE_IDS } from "./site-config.ts";
import { PRICING } from "./pricing.ts";
import { SITEMAP_STATIC_ROUTES } from "./site-routes.ts";

const ROOT = path.resolve(import.meta.dirname, "../..");
const read = (file: string) => fs.readFileSync(path.join(ROOT, file), "utf8");

const doc = read("techloop-content-schemas.md");
const blocks = [...doc.matchAll(/```(\w*)\n([\s\S]*?)\n```/g)].map((m) => ({ lang: m[1], body: m[2] }));
const promptBlocks = blocks.filter((b) => b.lang === "prompt");
// The prompt has to name the things not to write, so it is the one part that may contain them.
const prose = doc.replace(/```prompt\n[\s\S]*?\n```/g, "");

const ctx: AuditContext = {
  routes: new Set(SITEMAP_STATIC_ROUTES.map((r) => r || "/")),
  deviceIds: new Set(devices.map((d) => d.id)),
};

describe("content schema doc", () => {
  it("says none of the claims that were removed, and no dead routes", () => {
    const findings = auditRow({ doc: prose }, ctx);
    assert.deepEqual(findings, [], findings.map((f) => `${f.message}: ${f.snippet}`).join("\n"));
    assert.doesNotMatch(prose, /\/(rent|device)\//);
  });

  it("has example rows that pass the audit", () => {
    const examples = blocks.filter((b) => b.lang === "json");
    assert.ok(examples.length >= 2, "expected a job page and a device page example");
    for (const example of examples) {
      const row = JSON.parse(example.body);
      const findings = auditRow(row, ctx);
      assert.deepEqual(findings, [], `${row.slug}: ${findings.map((f) => `${f.field} ${f.message}`).join("; ")}`);
    }
  });

  it("uses real catalog ids and prices in its examples", () => {
    for (const example of blocks.filter((b) => b.lang === "json")) {
      const row = JSON.parse(example.body);
      if (row.msrp_cents === undefined) continue;
      const device = devices.find((d) => d.id === row.slug);
      assert.ok(device, `${row.slug} is not a catalog id`);
      assert.equal(row.msrp_cents, device.msrp! * 100, `${row.slug}: msrp_cents differs from the catalog`);
    }
  });

  it("has one generation prompt, which lists exactly the launch devices", () => {
    assert.equal(promptBlocks.length, 1);
    const prompt = promptBlocks[0].body;
    const listed = /device_slug are:\s*([a-z0-9,\s-]+?)\n-/.exec(prompt);
    assert.ok(listed, "the prompt should list the allowed device_slug values");
    const ids = listed[1].split(",").map((s) => s.trim()).filter(Boolean);
    assert.deepEqual([...ids].sort(), [...LAUNCH_DEVICE_IDS].sort());
  });

  it("tells the writer what never to write, without the old pricing rule", () => {
    const prompt = promptBlocks[0].body;
    assert.match(prompt, /NEVER WRITE/);
    assert.match(prompt, /testimonial_\* and stat_\* field to null/);
    assert.match(prompt, /no customers yet/);
    assert.doesNotMatch(prompt, /15%|~\d+%/);
    assert.doesNotMatch(prompt, /\$\d/);
  });

  it("points at tools and files that exist", () => {
    const scripts = JSON.parse(read("package.json")).scripts;
    assert.ok(scripts["audit:content"], "package.json needs the audit:content script");
    assert.ok(fs.existsSync(path.join(ROOT, "scripts/audit-content.mjs")));
    assert.ok(fs.existsSync(path.join(ROOT, "supabase/patches/20260930_content_cleanup.sql")));
    assert.match(doc, /npm run audit:content/);
    assert.match(doc, /supabase\/patches\/20260930_content_cleanup\.sql/);
  });
});

describe("content cleanup patch", () => {
  const sql = read("supabase/patches/20260930_content_cleanup.sql");
  const params = [...sql.matchAll(/select (\d+) as rate_pct, (\d+) as deposit_pct, (\d+) as min_rate_cents, (\d+) as credited_payments/g)];

  it("uses the current pricing rule in the preview and in the update", () => {
    assert.equal(params.length, 2, "once in the PART 1 preview and once in the PART 2 update");
    for (const [, rate, dep, min, credited] of params) {
      assert.equal(Number(rate), PRICING.ratePct);
      assert.equal(Number(dep), PRICING.depositPct);
      assert.equal(Number(min), PRICING.minMonthlyRate * 100);
      assert.equal(Number(credited), PRICING.creditedPayments);
    }
  });

  it("applies its changes inside one transaction", () => {
    const apply = sql.slice(sql.indexOf("-- PART 2"));
    assert.match(apply, /\nbegin;/);
    assert.match(apply, /commit;\s*$/);
    assert.equal((apply.match(/\bbegin;/g) ?? []).length, 1);
  });
});
