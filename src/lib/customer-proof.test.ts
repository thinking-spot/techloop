// Run with: npm test
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { stripCustomerProof, CUSTOMER_PROOF_KEYS } from "./customer-proof.ts";

const row = {
  slug: "electricians",
  job_title: "Electrician",
  testimonial_quote: "PLACEHOLDER",
  testimonial_name: "Someone",
  testimonial_job_title: "Master Electrician",
  testimonial_company: "Acme",
  stat_users_count: "1,000+",
  stat_rating: "4.8/5",
  stat_return_rate: "98% deposit returned",
};

describe("stripCustomerProof", () => {
  it("removes every proof field and keeps the rest", () => {
    const out = stripCustomerProof(row, false);
    assert.deepEqual(out, { slug: "electricians", job_title: "Electrician" });
  });

  it("keeps everything when proof is switched on", () => {
    assert.deepEqual(stripCustomerProof(row, true), row);
  });

  it("does not mutate the original", () => {
    stripCustomerProof(row, false);
    assert.equal(row.stat_users_count, "1,000+");
  });

  it("is off by default", () => {
    assert.equal("stat_rating" in stripCustomerProof(row), false);
  });

  it("covers every proof field the content schema has", () => {
    // types/content.ts: testimonial_* (4) and stat_* (3).
    assert.equal(CUSTOMER_PROOF_KEYS.length, 7);
  });
});
