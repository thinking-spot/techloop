// Audit the Supabase content rows (job pages, device pages, blog posts) for claims
// and data the site can no longer stand behind. READ-ONLY: it only sends GET requests.
//
//   npm run audit:content                       every row in the three content tables
//   npm run audit:content -- --file page.json   one candidate row (or an array of rows), e.g. AI
//                                               output, BEFORE you insert it and set published = true
//   npm run audit:content -- --json             machine-readable output
//
// Reads NEXT_PUBLIC_SUPABASE_URL plus SUPABASE_SERVICE_ROLE_KEY (also sees drafts) or
// NEXT_PUBLIC_SUPABASE_ANON_KEY (published rows only), from the shell or .env.local.
// Exit code: 0 clean, 1 findings, 2 could not run.
//
// The rules live in src/lib/content-audit.ts and src/lib/banned-claims.ts.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { auditRow } from "../src/lib/content-audit.ts";
import { devices } from "../src/lib/data.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TABLES = [
  ["content_job_pages", "job page"],
  ["content_device_pages", "device page"],
  ["content_blog_posts", "blog post"],
];

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const fileIndex = args.indexOf("--file");
const file = fileIndex >= 0 ? args[fileIndex + 1] : null;
if (fileIndex >= 0 && !file) die("--file needs a path to a JSON file");

function die(message) {
  console.error(`audit-content: ${message}`);
  process.exit(2);
}

function loadEnvFile() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  }
}

/** Paths of the pages that exist, from every page.tsx under src/app (dynamic segments are checked separately). */
function existingRoutes() {
  const routes = new Set();
  const walk = (dir, segments) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (entry.name.startsWith("[") || entry.name.startsWith("_") || entry.name.startsWith("@")) continue;
        const isGroup = entry.name.startsWith("(");
        walk(path.join(dir, entry.name), isGroup ? segments : [...segments, entry.name]);
      } else if (entry.name === "page.tsx") {
        routes.add("/" + segments.join("/"));
      }
    }
  };
  walk(path.join(ROOT, "src/app"), []);
  return routes;
}

/** Browse category slugs, read from the keys of categoryData. */
function browseCategories() {
  const source = fs.readFileSync(path.join(ROOT, "src/app/browse/category-data.tsx"), "utf8");
  return new Set([...source.matchAll(/^ {4}"?([a-z0-9-]+)"?:\s*\{/gm)].map((m) => m[1]));
}

async function fetchAll(baseUrl, key, table) {
  const rows = [];
  for (let from = 0; ; from += 1000) {
    const res = await fetch(`${baseUrl}/rest/v1/${table}?select=*&order=slug.asc`, {
      method: "GET",
      headers: { apikey: key, authorization: `Bearer ${key}`, range: `${from}-${from + 999}` },
    });
    if (!res.ok) {
      const body = (await res.text()).slice(0, 200);
      throw new Error(`${table}: HTTP ${res.status} ${body}`);
    }
    const page = await res.json();
    rows.push(...page);
    if (page.length < 1000) return rows;
  }
}

const baseContext = {
  routes: existingRoutes(),
  deviceIds: new Set(devices.map((d) => d.id)),
  categories: browseCategories(),
};

const results = []; // { table, label, slug, published, findings }
const problems = [];

if (file) {
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(path.resolve(file), "utf8"));
  } catch (error) {
    die(`could not read ${file}: ${error.message}`);
  }
  for (const [i, row] of (Array.isArray(parsed) ? parsed : [parsed]).entries()) {
    results.push({ table: "file", label: "row", slug: row?.slug ?? `#${i + 1}`, published: row?.published, findings: auditRow(row ?? {}, baseContext) });
  }
} else {
  loadEnvFile();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) die("set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY), in the shell or .env.local");
  const seesDrafts = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  const fetched = {};
  for (const [table] of TABLES) {
    try {
      fetched[table] = await fetchAll(url.replace(/\/$/, ""), key, table);
    } catch (error) {
      problems.push(error.message);
      fetched[table] = [];
    }
  }
  const published = (table) => new Set(fetched[table].filter((r) => r.published).map((r) => r.slug));
  const context = { ...baseContext, jobSlugs: published("content_job_pages"), blogSlugs: published("content_blog_posts") };

  for (const [table, label] of TABLES) {
    for (const row of fetched[table]) {
      results.push({ table, label, slug: row.slug, published: row.published, findings: auditRow(row, context) });
    }
  }
  if (!seesDrafts && !asJson) console.error("Note: using the anon key, so only rows it can read (usually published ones) were checked.\n");
}

const withFindings = results.filter((r) => r.findings.length > 0);

if (asJson) {
  console.log(JSON.stringify({ problems, rowsChecked: results.length, results: withFindings }, null, 2));
} else {
  const ADVICE = {
    claim: "delete or reword",
    proof: "set the column to NULL (supabase/patches/20260930_content_cleanup.sql does this)",
    price: "remove the number; the site computes prices from lib/pricing.ts",
    link: "point it at a real page (device pages are /product/<id>)",
    review: "a person needs to decide",
  };
  for (const r of withFindings) {
    console.log(`${r.table === "file" ? "row" : `${r.label} ${r.slug}`}${r.table === "file" ? ` ${r.slug}` : ""} (${r.published === undefined ? "unknown" : r.published ? "published" : "draft"})`);
    for (const f of r.findings) {
      console.log(`  [${f.kind}] ${f.field}: ${f.message}`);
      if (f.snippet) console.log(`      ${f.snippet}`);
    }
    console.log("");
  }
  for (const problem of problems) console.error(`Could not read ${problem}\n`);

  const counts = {};
  for (const r of withFindings) for (const f of r.findings) counts[f.kind] = (counts[f.kind] ?? 0) + 1;
  console.log(`Checked ${results.length} row${results.length === 1 ? "" : "s"}; ${withFindings.length} need attention.`);
  for (const [kind, n] of Object.entries(counts).sort()) console.log(`  ${String(n).padStart(4)}  ${kind.padEnd(7)} ${ADVICE[kind]}`);
}

process.exit(problems.length > 0 && results.length === 0 ? 2 : withFindings.length > 0 ? 1 : 0);
