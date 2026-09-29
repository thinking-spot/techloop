// Run with: npm test
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  PRICING,
  monthlyRate,
  deposit,
  dueToday,
  credit,
  buyoutPrice,
  buyoutSchedule,
  priceSummary,
  lowestMonthlyRate,
  toCents,
  usd,
} from "./pricing.ts";
import { devices } from "./data.ts";

// Agreed worked examples: [msrp, rate, deposit, dueToday, buyout after 1/2/3 payments]
const EXAMPLES: Array<[number, number, number, number, [number, number, number]]> = [
  [149, 19, 14, 33, [116, 97, 78]], // rate hits the $19 floor
  [199, 19, 19, 38, [161, 142, 123]],
  [349, 34, 34, 68, [281, 247, 213]],
  [399, 39, 39, 78, [321, 282, 243]],
  [499, 49, 49, 98, [401, 352, 303]],
  [749, 74, 74, 148, [601, 527, 453]],
];

describe("pricing rules", () => {
  for (const [msrp, rate, dep, due, buyouts] of EXAMPLES) {
    it(`$${msrp} device`, () => {
      assert.equal(monthlyRate(msrp), rate);
      assert.equal(deposit(msrp), dep);
      assert.equal(dueToday(msrp), due);
      assert.deepEqual(
        [1, 2, 3].map((n) => buyoutPrice(msrp, n)),
        buyouts
      );
    });
  }

  it("rounds the rate and deposit down to whole dollars", () => {
    assert.equal(monthlyRate(399), 39); // 39.9 -> 39
    assert.equal(deposit(399), 39);
    assert.equal(monthlyRate(281), 28); // 28.1 -> 28
    assert.equal(deposit(179), 17); // 17.9 -> 17 (no dollar floor on the deposit)
  });

  it("applies the $19 floor to the rate but not the deposit", () => {
    assert.equal(monthlyRate(100), PRICING.minMonthlyRate);
    assert.equal(deposit(100), 10);
  });

  it("credits the deposit before any payment is made", () => {
    assert.equal(credit(399, 0), 39);
    assert.equal(buyoutPrice(399, 0), 360);
  });

  it("stops crediting payments after the third", () => {
    assert.equal(buyoutPrice(399, 3), 243);
    assert.equal(buyoutPrice(399, 4), 243);
    assert.equal(buyoutPrice(399, 12), 243);
  });

  it("never returns a negative buyout", () => {
    // Tiny MSRP: the $19 floor times three payments exceeds the price.
    assert.equal(buyoutPrice(30, 3), 0);
  });

  it("schedule lists one step per credited payment", () => {
    const schedule = buyoutSchedule(399);
    assert.deepEqual(schedule, [
      { paymentsMade: 1, credit: 78, buyout: 321 },
      { paymentsMade: 2, credit: 117, buyout: 282 },
      { paymentsMade: 3, credit: 156, buyout: 243 },
    ]);
  });

  it("priceSummary bundles the same numbers", () => {
    const s = priceSummary(399);
    assert.equal(s.monthlyRate, 39);
    assert.equal(s.deposit, 39);
    assert.equal(s.dueToday, 78);
    assert.equal(s.buyoutAfterCredits, 243);
    assert.equal(s.schedule.length, PRICING.creditedPayments);
  });

  it("refurb discount comes off MSRP before credits, default is none", () => {
    assert.equal(buyoutPrice(400, 3), buyoutPrice(400, 3, { refurbDiscountPct: 0 }));
    // 10% off $400 = $360 basis; credits: 40 + 3 * 40 = 160 -> $200
    assert.equal(buyoutPrice(400, 3, { refurbDiscountPct: 10 }), 200);
  });

  it("rejects invalid input", () => {
    assert.throws(() => monthlyRate(0), RangeError);
    assert.throws(() => monthlyRate(-5), RangeError);
    assert.throws(() => deposit(Number.NaN), RangeError);
    assert.throws(() => credit(399, -1), RangeError);
    assert.throws(() => credit(399, 1.5), RangeError);
    assert.throws(() => buyoutPrice(399, 1, { refurbDiscountPct: 120 }), RangeError);
  });

  it("holds its invariants across a range of MSRPs", () => {
    let previousRate = 0;
    for (let msrp = 50; msrp <= 2000; msrp++) {
      const rate = monthlyRate(msrp);
      assert.ok(rate >= PRICING.minMonthlyRate, `rate floor at ${msrp}`);
      assert.ok(rate >= previousRate, `rate is non-decreasing at ${msrp}`);
      previousRate = rate;

      assert.equal(dueToday(msrp), rate + deposit(msrp));

      let last = buyoutPrice(msrp, 0);
      for (let n = 1; n <= 6; n++) {
        const b = buyoutPrice(msrp, n);
        assert.ok(b >= 0 && b <= last, `buyout non-increasing at ${msrp}/${n}`);
        last = b;
      }
      // Buying inside the credit window costs exactly MSRP in total.
      for (let n = 0; n <= PRICING.creditedPayments; n++) {
        if (credit(msrp, n) <= msrp) {
          assert.equal(credit(msrp, n) + buyoutPrice(msrp, n), msrp);
        }
      }
    }
  });
});

describe("catalog", () => {
  it("every device has an MSRP", () => {
    for (const d of devices) {
      assert.equal(typeof d.msrp, "number", `${d.id} is missing msrp`);
    }
  });

  it("every device's displayed price is derived from its MSRP", () => {
    for (const d of devices) {
      assert.equal(d.price, String(monthlyRate(d.msrp!)), `${d.id} price`);
    }
    const ray = devices.find((d) => d.id === "meta-rayban");
    assert.equal(ray?.price, "39");
    assert.equal(devices.find((d) => d.id === "rabbit-r1")?.price, "19");
    assert.equal(devices.find((d) => d.id === "tab-pendant")?.price, "60");
  });

  it("no device still carries the old flat price", () => {
    assert.ok(
      new Set(devices.map((d) => d.price)).size > 5,
      "prices should vary with MSRP"
    );
  });

  it("the lowest rate across the catalog is the $19 floor", () => {
    assert.equal(lowestMonthlyRate(devices), 19);
  });

  it("lowestMonthlyRate returns null without any MSRP", () => {
    assert.equal(lowestMonthlyRate([]), null);
    assert.equal(lowestMonthlyRate([{ msrp: undefined }]), null);
  });
});

describe("formatting helpers", () => {
  it("converts to cents and formats dollars", () => {
    assert.equal(toCents(39), 3900);
    assert.equal(usd(39), "$39");
    assert.equal(usd(1234), "$1,234");
  });
});
