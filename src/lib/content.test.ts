// Run with: npm test
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getAllFaqs, getFaqs, POLICY } from "./faq.ts";
import { brandOf, allBrands, brandedDeviceIds } from "./brands.ts";
import { devices } from "./data.ts";

describe("faqs", () => {
  const faqs = getAllFaqs();

  it("has unique ids and non-empty text", () => {
    assert.equal(new Set(faqs.map((f) => f.id)).size, faqs.length);
    for (const f of faqs) {
      assert.ok(f.question.trim().endsWith("?"), `${f.id} question`);
      assert.ok(f.answer.trim().length > 20, `${f.id} answer`);
    }
  });

  it("quotes the agreed $399 example numbers", () => {
    const text = faqs.map((f) => f.answer).join(" ");
    assert.match(text, /\$39 a month/); // rate
    assert.match(text, /\$78 to start/); // first month + deposit
    assert.match(text, /\$243 to own it after 3 months/); // buyout
  });

  it("states the policy day counts from one source", () => {
    const answer = (id: string) => faqs.find((f) => f.id === id)!.answer;
    assert.ok(answer("returns-cancel").includes(`${POLICY.returnWindowDays} days`));
    assert.ok(answer("returns-cancel").includes(`${POLICY.firstRentalMinimumDays}-day minimum`));
    assert.ok(answer("returns-unreturned").includes(`${POLICY.returnWindowDays} days`));
    assert.ok(answer("pricing-deposit").includes(`${POLICY.depositRefundDays} days`));
    assert.ok(answer("swaps-how").includes(`${POLICY.firstRentalMinimumDays} days`));
  });

  it("makes none of the claims we removed from the site", () => {
    const banned = [
      /risk-free/i,
      /no risk/i,
      /no questions asked/i,
      /cancel anytime/i,
      /\$42/,
      /\$48/,
      /4\.8/,
      /98%/,
      /ships? today/i,
      /brand new devices?\b.*swap/i,
    ];
    for (const f of faqs) {
      for (const pattern of banned) {
        assert.doesNotMatch(f.answer + " " + f.question, pattern, `${f.id} matches ${pattern}`);
      }
    }
  });

  it("getFaqs keeps the requested order and skips unknown ids", () => {
    const got = getFaqs(["swaps-how", "nope", "pricing-how"]);
    assert.deepEqual(got.map((f) => f.id), ["swaps-how", "pricing-how"]);
  });

  it("only shows the 'rent today?' answer before launch", () => {
    // The default mode in tests is waitlist.
    assert.ok(getFaqs(["waitlist-status"]).length === 1);
  });
});

describe("catalog carries no customer data", () => {
  it("has no ratings, review counts, reviews or badges", () => {
    const forbidden = ["rating", "reviewCount", "reviews", "badges"];
    for (const d of devices) {
      for (const key of forbidden) {
        assert.equal(key in d, false, `${d.id} still has "${key}"`);
      }
    }
  });

  it("makes none of the unsourced statistics that were in the descriptions", () => {
    const text = devices.map((d) => `${d.description} ${d.longDescription ?? ""}`).join(" ");
    assert.doesNotMatch(text, /1M\+ pairs|51% market share|world's first/i);
  });
});

describe("brands", () => {
  it("every catalog device has a brand", () => {
    for (const d of devices) {
      assert.ok(brandOf(d.id), `${d.id} has no brand`);
    }
  });

  it("no brand entry points at a device that does not exist", () => {
    const ids = new Set(devices.map((d) => d.id));
    for (const id of brandedDeviceIds()) {
      assert.ok(ids.has(id), `brand entry "${id}" is not in the catalog`);
    }
    assert.equal(brandedDeviceIds().length, devices.length);
    assert.equal(brandOf("not-a-device"), undefined);
  });

  it("lists each brand once, A to Z", () => {
    const brands = allBrands();
    assert.equal(new Set(brands).size, brands.length);
    assert.deepEqual(brands, [...brands].sort((a, b) => a.localeCompare(b)));
    assert.ok(brands.includes("Meta") && brands.includes("Brilliant Labs"));
  });
});
