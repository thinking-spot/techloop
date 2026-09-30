// Run with: npm test
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { auditRow, checkInternalPath, type AuditContext, type Finding } from "./content-audit.ts";

const ctx: AuditContext = {
  routes: new Set(["/", "/pricing", "/waitlist", "/quiz", "/blog", "/how-it-works"]),
  deviceIds: new Set(["meta-rayban", "xreal-air-pro", "oura-ring"]),
  categories: new Set(["ai-glasses", "ai-rings"]),
  jobSlugs: new Set(["electricians", "nurses"]),
  blogSlugs: new Set(["xreal-vs-meta-ray-ban"]),
};

const kinds = (findings: Finding[]) => findings.map((f) => f.kind);
const fields = (findings: Finding[]) => findings.map((f) => f.field);

describe("auditRow: removed claims", () => {
  it("passes a clean row", () => {
    const row = {
      slug: "electricians",
      hero_headline: "AI wearables for electricians",
      hero_cta_secondary: "See pricing",
      faqs: [{ question: "Can I buy it?", answer: "Yes. Part of what you pay counts toward buying it." }],
      testimonial_quote: null,
      stat_rating: null,
    };
    assert.deepEqual(auditRow(row, ctx), []);
  });

  it("finds the old price claims and reports the field they are in", () => {
    const found = auditRow({ meta_description: "Rent it for $48/month. Cancel anytime.", hero_subheadline: "Risk-free. From $42." }, ctx);
    assert.deepEqual(fields(found), ["meta_description", "meta_description", "hero_subheadline", "hero_subheadline"]);
    assert.ok(kinds(found).every((k) => k === "claim"));
  });

  it("reports a banned price once, not again as a generic price", () => {
    const found = auditRow({ text: "Only $42 a month." }, ctx);
    assert.equal(found.length, 1);
    assert.equal(found[0].kind, "claim");
  });

  it("finds claims inside nested arrays with a precise path", () => {
    const found = auditRow({ objections: [{ question: "Why?", answer: "Fine." }, { question: "Safe?", answer: "It is 100% risk-free." }] }, ctx);
    assert.deepEqual(fields(found), ["objections[1].answer"]);
  });

  it("finds usage counts and no-penalty promises", () => {
    const found = auditRow({ a: "Join 1,000+ users today.", b: "Cancel with no penalty.", c: "No commitment needed." }, ctx);
    assert.deepEqual(fields(found), ["a", "b", "c"]);
    assert.ok(kinds(found).every((k) => k === "claim"));
  });

  it("includes the matching text as a snippet", () => {
    const [f] = auditRow({ t: "Alpha beta gamma. Rent it, cancel anytime, and see." }, ctx);
    assert.match(f.snippet!, /cancel anytime/);
  });
});

describe("auditRow: prices", () => {
  it("flags any hard-coded dollar amount", () => {
    const found = auditRow({ a: "Retail is $399.", b: "That is $1,299.99 all in." }, ctx);
    assert.deepEqual(kinds(found), ["price", "price"]);
  });

  it("flags an old percent-of-retail rule but not the current one", () => {
    assert.deepEqual(kinds(auditRow({ t: "about 15% of MSRP a month" }, ctx)), ["price"]);
    assert.deepEqual(auditRow({ t: "10% of retail, rounded down" }, ctx), []);
  });

  it("checks stored device prices against the pricing rule", () => {
    const wrong = auditRow({ msrp_cents: 39900, rental_price_cents: 4800, purchase_credit_months: 3, purchase_credit_total_cents: 14400 }, ctx);
    assert.deepEqual(fields(wrong), ["rental_price_cents", "purchase_credit_total_cents"]);
    assert.match(wrong[0].message, /should be 3900/);
    assert.match(wrong[1].message, /should be 15600/); // $39 deposit + 3 x $39
  });

  it("accepts stored prices that follow the rule, including the minimum", () => {
    assert.deepEqual(auditRow({ msrp_cents: 39900, rental_price_cents: 3900, purchase_credit_months: 3, purchase_credit_total_cents: 15600 }, ctx), []);
    // $149 -> $19 minimum rate, $14 deposit, credit = 14 + 3 x 19 = $71
    assert.deepEqual(auditRow({ msrp_cents: 14900, rental_price_cents: 1900, purchase_credit_total_cents: 7100 }, ctx), []);
  });

  it("flags the wrong number of credited payments", () => {
    assert.deepEqual(fields(auditRow({ msrp_cents: 39900, purchase_credit_months: 2 }, ctx)), ["purchase_credit_months"]);
  });

  it("ignores a row without an MSRP or with an odd one", () => {
    assert.deepEqual(auditRow({ rental_price_cents: 123 }, ctx), []);
    assert.deepEqual(auditRow({ msrp_cents: 39950, rental_price_cents: 123 }, ctx), []);
  });
});

describe("auditRow: placeholder proof", () => {
  it("flags filled testimonial, stat and review columns", () => {
    const found = auditRow({
      testimonial_quote: "Loved it",
      testimonial_name: "Marcus T.",
      stat_users_count: "1,000+",
      stat_rating: "4.8/5",
      subscriber_rating: 4.7,
      subscriber_review_count: 84,
      featured_review_author: "Someone",
    }, ctx);
    assert.equal(found.filter((f) => f.kind === "proof").length, 7);
  });

  it("accepts NULL, empty and zero", () => {
    assert.deepEqual(auditRow({ testimonial_quote: null, testimonial_name: "", stat_rating: "  ", subscriber_review_count: 0 }, ctx), []);
  });
});

describe("auditRow: links and slugs", () => {
  it("flags /rent and /device links in markdown and HTML", () => {
    const found = auditRow({ body_mdx: "See [the glasses](/rent/xreal-air-pro) or <a href=\"/device/oura-ring\">the ring</a>." }, ctx);
    assert.deepEqual(kinds(found), ["link", "link"]);
    assert.match(found[0].message, /no \/rent or \/device pages/);
  });

  it("flags a CTA href that leads nowhere and accepts a real one", () => {
    assert.deepEqual(kinds(auditRow({ ctas: [{ href: "/rent/x", label: "Rent" }, { href: "/product/meta-rayban", label: "See it" }, { href: "/waitlist?device=oura-ring", label: "Join" }] }, ctx)), ["link"]);
  });

  it("checks product, category, job and blog links", () => {
    assert.equal(checkInternalPath("/product/meta-rayban", ctx), null);
    assert.match(checkInternalPath("/product/nope", ctx)!, /no device "nope"/);
    assert.equal(checkInternalPath("/browse/ai-glasses", ctx), null);
    assert.match(checkInternalPath("/browse/nope", ctx)!, /no browse category/);
    assert.equal(checkInternalPath("/for/nurses", ctx), null);
    assert.match(checkInternalPath("/for/nope", ctx)!, /no published job page/);
    assert.equal(checkInternalPath("/blog/xreal-vs-meta-ray-ban", ctx), null);
    assert.match(checkInternalPath("/blog/nope", ctx)!, /no published blog post/);
    assert.match(checkInternalPath("/nope", ctx)!, /no such page/);
  });

  it("ignores a trailing slash, query and anchor", () => {
    assert.equal(checkInternalPath("/pricing/", ctx), null);
    assert.deepEqual(auditRow({ t: "[p](/pricing#deposit) [q](/quiz?x=1)" }, ctx), []);
  });

  it("checks device slugs and suggests the catalog id", () => {
    const found = auditRow({ recommended_devices: [{ device_slug: "meta-ray-ban", reason: "Fine." }, { device_slug: "oura-ring", reason: "Fine." }] }, ctx);
    assert.equal(found.length, 1);
    assert.equal(found[0].field, "recommended_devices[0].device_slug");
    assert.match(found[0].message, /did you mean meta-rayban/);
  });

  it("suggests catalog ids for near misses, by shared words", () => {
    const [f] = auditRow({ device_slug: "xreal-air-2-pro" }, ctx);
    assert.match(f.message, /did you mean xreal-air-pro\?/);
    const [g] = auditRow({ device_slug: "toaster-oven" }, ctx);
    assert.doesNotMatch(g.message, /did you mean/);
    assert.match(checkInternalPath("/product/meta-ray-ban", ctx)!, /did you mean meta-rayban/);
  });

  it("checks slug arrays for devices, jobs and blog posts", () => {
    const found = auditRow({ linked_device_slugs: ["oura-ring", "xreal-air-2-pro"], related_job_slugs: ["nurses", "plumbers"], linked_blog_slugs: ["nope"] }, ctx);
    assert.deepEqual(fields(found), ["linked_device_slugs[1]", "related_job_slugs[1]", "linked_blog_slugs[0]"]);
  });

  it("does not guess about what it was not told", () => {
    const blind: AuditContext = {};
    assert.deepEqual(auditRow({ device_slug: "anything", related_job_slugs: ["x"], t: "[a](/product/whatever) [b](/nope)" }, blind), []);
    // ...but a dead route is dead whether or not we know the catalog.
    assert.equal(auditRow({ t: "[a](/rent/x)" }, blind).length, 1);
  });
});

describe("auditRow: things for a human to look at", () => {
  it("flags delivery times, tax advice and regulatory statements", () => {
    const found = auditRow({
      a: "The device arrives in 2–3 days.",
      b: "A subscription used for work is generally deductible.",
      c: "Allowed on job sites under OSHA guidelines.",
    }, ctx);
    assert.deepEqual(kinds(found), ["review", "review", "review"]);
  });

  it("does not flag ordinary uses of those words", () => {
    assert.deepEqual(auditRow({ t: "Delivery is free both ways. Returns are easy. We ship to the US." }, ctx), []);
  });
});
