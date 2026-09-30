// Finds claims and data in a content row (job page, device page or blog post)
// that the site can no longer stand behind. Pure: give it a row and whatever you
// know about real pages, get findings back. scripts/audit-content.mjs feeds it
// rows from Supabase; it can also check one AI-generated row before it is inserted.
//
// Kinds of finding, and what to do about each:
//   claim   a removed promise or invented number (banned-claims.ts): delete or reword it
//   proof   placeholder testimonial, rating or usage stat: set the column to NULL
//   price   a hard-coded dollar amount, or a stored price that differs from the pricing
//           rule: prices are computed by lib/pricing.ts, so leave them out of prose
//   link    a link or slug that does not lead to a real page: point it at /product/<id>
//   review  needs a human decision (delivery times, tax or regulatory statements, ...)

import { BANNED_CLAIMS } from "./banned-claims.ts";
import { PRICING, deposit, monthlyRate, toCents } from "./pricing.ts";

export type FindingKind = "claim" | "proof" | "price" | "link" | "review";

export type Finding = {
  kind: FindingKind;
  /** Where in the row, e.g. "faqs[2].answer". */
  field: string;
  message: string;
  /** The text around the match. */
  snippet?: string;
};

/** What the caller knows about the real site. Anything left out is simply not checked. */
export type AuditContext = {
  /** Paths of pages that exist, like "/pricing". Include "/" for the home page. */
  routes?: ReadonlySet<string>;
  /** Ids in the device catalog (src/lib/data.ts). */
  deviceIds?: ReadonlySet<string>;
  /** Browse category slugs. */
  categories?: ReadonlySet<string>;
  /** Slugs of published job pages and blog posts. */
  jobSlugs?: ReadonlySet<string>;
  blogSlugs?: ReadonlySet<string>;
};

type Row = Record<string, unknown>;

/** Columns that hold made-up social proof. Nothing real exists yet, so they should be NULL. */
const PROOF_FIELDS = new Set([
  "testimonial_quote",
  "testimonial_name",
  "testimonial_job_title",
  "testimonial_company",
  "stat_users_count",
  "stat_rating",
  "stat_return_rate",
  "subscriber_rating",
  "subscriber_review_count",
  "featured_review_quote",
  "featured_review_author",
]);

/** Columns that name another page by slug, and which kind of page. */
const SLUG_FIELDS: Record<string, "device" | "job" | "blog"> = {
  device_slug: "device",
  linked_device_slugs: "device",
  related_device_slugs: "device",
  related_job_slugs: "job",
  linked_job_slugs: "job",
  best_for_job_slugs: "job",
  related_blog_slugs: "blog",
  linked_blog_slugs: "blog",
  cluster_pillar_slug: "blog",
  comparison_slug: "blog",
};

type ReviewRule = {
  pattern: RegExp;
  kind: FindingKind;
  message: string;
  /** Skip matches this returns false for. */
  keep?: (match: RegExpExecArray) => boolean;
};

const REVIEW_RULES: ReviewRule[] = [
  {
    pattern: /\b\d{1,3}(?:,\d{3})*\+?\s+(?:users|subscribers|customers|members|renters|reviews|people)\b/gi,
    kind: "claim",
    message: "a usage or review count (there are no customers yet)",
  },
  {
    pattern: /\bno (?:penalty|penalties|commitment|contract|obligation)\b|\bwithout (?:any )?penalt/gi,
    kind: "claim",
    message: '"no penalty" (the first month is a minimum and an unreturned device is charged)',
  },
  {
    pattern: /\b(\d{1,2})% of (?:the )?(?:MSRP|retail|purchase)/gi,
    kind: "price",
    message: `an old pricing rule (the monthly price is ${PRICING.ratePct}% of retail)`,
    keep: (m) => Number(m[1]) !== PRICING.ratePct,
  },
  {
    pattern: /\b(?:arrives?|ships?|shipped|delivered?|delivery)\b[^.\n]{0,40}\b\d+(?:\s*[–-]\s*\d+)?\s*(?:business\s+)?days?\b/gi,
    kind: "review",
    message: "a delivery time we have not promised",
  },
  {
    pattern: /\b(?:tax[- ]deductible|deductible|write[- ]off|expense it)\b/gi,
    kind: "review",
    message: "tax advice (legal review before publishing)",
  },
  {
    pattern: /\b(?:OSHA|HIPAA|FDA)\b/g,
    kind: "review",
    message: "a regulatory statement (verify it or remove it)",
  },
];

/** Any dollar amount. Skipped where a banned claim already covers the same text. */
const DOLLAR_AMOUNT = /\$\d[\d,]*(?:\.\d+)?/g;

const MARKDOWN_LINK = /\]\((\/[^)\s#?]*)/g;
const HTML_LINK = /href=["'](\/[^"'#?]*)/g;

const globalized = (re: RegExp) => new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");

function snippet(text: string, index: number, length: number): string {
  const start = Math.max(0, index - 30);
  const end = Math.min(text.length, index + length + 30);
  return `${start > 0 ? "…" : ""}${text.slice(start, end).replace(/\s+/g, " ").trim()}${end < text.length ? "…" : ""}`;
}

function normalize(slug: string): string {
  return slug.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Up to two known ids that look like what was meant: the same letters, or mostly the same words. */
function closestIds(slug: string, ids: ReadonlySet<string>): string[] {
  const wanted = normalize(slug);
  for (const id of ids) if (normalize(id) === wanted) return [id];

  const words = new Set(slug.toLowerCase().split("-").filter(Boolean));
  return [...ids]
    .map((id) => {
      const other = new Set(id.toLowerCase().split("-").filter(Boolean));
      const shared = [...words].filter((w) => other.has(w)).length;
      return { id, score: shared / (words.size + other.size - shared) };
    })
    .filter((c) => c.score >= 0.6)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, 2)
    .map((c) => c.id);
}

const didYouMean = (slug: string, ids: ReadonlySet<string>) => {
  const guesses = closestIds(slug, ids);
  return guesses.length ? ` (did you mean ${guesses.join(" or ")}?)` : "";
};

/** Why an internal path does not lead to a real page, or null if it does (or cannot be checked). */
export function checkInternalPath(path: string, ctx: AuditContext): string | null {
  const clean = path.replace(/\/+$/, "") || "/";
  if (/^\/(rent|device)(\/|$)/.test(clean)) {
    return "there are no /rent or /device pages; devices live at /product/<id>";
  }
  if (ctx.routes?.has(clean)) return null;

  const product = /^\/product\/([^/]+)$/.exec(clean);
  if (product) {
    if (!ctx.deviceIds) return null;
    if (ctx.deviceIds.has(product[1])) return null;
    return `no device "${product[1]}" in the catalog${didYouMean(product[1], ctx.deviceIds)}`;
  }
  const category = /^\/browse\/([^/]+)$/.exec(clean);
  if (category) {
    return !ctx.categories || ctx.categories.has(category[1]) ? null : `no browse category "${category[1]}"`;
  }
  const job = /^\/for\/([^/]+)$/.exec(clean);
  if (job) return !ctx.jobSlugs || ctx.jobSlugs.has(job[1]) ? null : `no published job page "${job[1]}"`;
  const blog = /^\/blog\/([^/]+)$/.exec(clean);
  if (blog) return !ctx.blogSlugs || ctx.blogSlugs.has(blog[1]) ? null : `no published blog post "${blog[1]}"`;

  return ctx.routes ? "no such page" : null;
}

function checkSlug(kind: "device" | "job" | "blog", slug: string, ctx: AuditContext): string | null {
  const known = kind === "device" ? ctx.deviceIds : kind === "job" ? ctx.jobSlugs : ctx.blogSlugs;
  if (!known || known.has(slug)) return null;
  const label = kind === "device" ? "device in the catalog" : kind === "job" ? "published job page" : "published blog post";
  return `"${slug}" is not a ${label}${didYouMean(slug, known)}`;
}

function auditText(text: string, field: string, ctx: AuditContext, out: Finding[]): void {
  const covered: Array<[number, number]> = [];

  for (const [pattern, why] of BANNED_CLAIMS) {
    for (const m of text.matchAll(globalized(pattern))) {
      covered.push([m.index!, m.index! + m[0].length]);
      out.push({ kind: "claim", field, message: why, snippet: snippet(text, m.index!, m[0].length) });
    }
  }

  for (const rule of REVIEW_RULES) {
    for (const m of text.matchAll(globalized(rule.pattern))) {
      if (rule.keep && !rule.keep(m as RegExpExecArray)) continue;
      out.push({ kind: rule.kind, field, message: rule.message, snippet: snippet(text, m.index!, m[0].length) });
    }
  }

  for (const m of text.matchAll(DOLLAR_AMOUNT)) {
    const start = m.index!;
    if (covered.some(([a, b]) => start < b && start + m[0].length > a)) continue;
    out.push({
      kind: "price",
      field,
      message: "a hard-coded price (prices come from the pricing rule and go stale)",
      snippet: snippet(text, start, m[0].length),
    });
  }

  for (const re of [MARKDOWN_LINK, HTML_LINK]) {
    for (const m of text.matchAll(re)) {
      const why = checkInternalPath(m[1], ctx);
      if (why) out.push({ kind: "link", field, message: `link to ${m[1]}: ${why}`, snippet: snippet(text, m.index!, m[0].length) });
    }
  }
}

/** A stored price should equal what the pricing rule gives for the row's MSRP. */
function auditDerivedPrices(row: Row, field: string, out: Finding[]): void {
  const msrpCents = row.msrp_cents;
  if (typeof msrpCents !== "number" || !Number.isInteger(msrpCents) || msrpCents <= 0 || msrpCents % 100 !== 0) return;
  const msrp = msrpCents / 100;
  const rate = monthlyRate(msrp);
  const where = (name: string) => (field ? `${field}.${name}` : name);

  const expected: Array<[string, number, string]> = [
    ["rental_price_cents", toCents(rate), "the monthly price"],
    ["purchase_credit_months", PRICING.creditedPayments, "the number of credited payments"],
    ["purchase_credit_total_cents", toCents(deposit(msrp) + PRICING.creditedPayments * rate), "the deposit plus the credited payments"],
  ];
  for (const [name, want, what] of expected) {
    const have = row[name];
    if (have !== undefined && have !== null && have !== want) {
      out.push({ kind: "price", field: where(name), message: `${what} should be ${want} for this MSRP (it is ${String(have)}); stored prices must follow lib/pricing.ts` });
    }
  }
}

function walk(value: unknown, key: string, field: string, ctx: AuditContext, out: Finding[]): void {
  if (value === null || value === undefined) return;

  if (PROOF_FIELDS.has(key)) {
    const filled = typeof value === "string" ? value.trim() !== "" : value !== 0;
    if (filled) {
      out.push({ kind: "proof", field, message: "placeholder social proof: there are no real customers or reviews yet, so this should be NULL", snippet: String(value).slice(0, 80) });
    }
    return;
  }

  if (typeof value === "string") {
    const slugKind = SLUG_FIELDS[key];
    if (slugKind) {
      const why = checkSlug(slugKind, value, ctx);
      if (why) out.push({ kind: "link", field, message: why });
      return;
    }
    if (key === "href" && value.startsWith("/")) {
      const why = checkInternalPath(value.split(/[?#]/)[0], ctx);
      if (why) out.push({ kind: "link", field, message: `link to ${value}: ${why}` });
      return;
    }
    auditText(value, field, ctx, out);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, i) => walk(item, key, `${field}[${i}]`, ctx, out));
    return;
  }

  if (typeof value === "object") {
    const obj = value as Row;
    auditDerivedPrices(obj, field, out);
    for (const [k, v] of Object.entries(obj)) walk(v, k, field ? `${field}.${k}` : k, ctx, out);
  }
}

/** Audit one row (or any JSON object shaped like one). Returns findings in field order. */
export function auditRow(row: Row, ctx: AuditContext = {}): Finding[] {
  const out: Finding[] = [];
  walk(row, "", "", ctx, out);
  return out;
}
