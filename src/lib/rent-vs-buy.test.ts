// Run with: npm test
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  rentThenReturnTotal,
  rentThenBuyTotal,
  extraOverRetail,
  breakEvenMonth,
  trialComparison,
  CREDITED_MONTHS,
} from "./rent-vs-buy.ts";

describe("rent then buy", () => {
  it("costs exactly retail when you buy within the credited months", () => {
    for (const msrp of [149, 199, 349, 399, 499, 749]) {
      for (let months = 1; months <= CREDITED_MONTHS; months++) {
        assert.equal(rentThenBuyTotal(msrp, months), msrp, `$${msrp}, ${months} mo`);
        assert.equal(extraOverRetail(msrp, months), 0);
      }
    }
  });

  it("costs the extra rent once payments stop counting", () => {
    // $399 device: $39/month. After month 3 each extra month adds $39.
    assert.equal(rentThenBuyTotal(399, 4), 399 + 39);
    assert.equal(rentThenBuyTotal(399, 6), 399 + 3 * 39);
    assert.equal(extraOverRetail(399, 6), 117);
  });

  it("is never below retail", () => {
    for (let months = 1; months <= 24; months++) {
      assert.ok(rentThenBuyTotal(399, months) >= 399);
    }
  });
});

describe("rent then return", () => {
  it("is just the rent, because the deposit comes back", () => {
    assert.equal(rentThenReturnTotal(399, 2), 78);
    assert.equal(rentThenReturnTotal(149, 3), 57); // $19 minimum rate
  });
});

describe("break-even", () => {
  it("is when rent alone reaches the retail price", () => {
    assert.equal(breakEvenMonth(399), 11); // 11 x $39 = $429 >= $399, 10 x $39 = $390 < $399
    assert.equal(breakEvenMonth(149), 8); // 8 x $19 = $152 >= $149
  });

  it("really is the first month rent reaches retail", () => {
    for (const msrp of [149, 199, 349, 399, 499, 749]) {
      const month = breakEvenMonth(msrp);
      const rate = rentThenReturnTotal(msrp, 1);
      assert.ok(rate * month >= msrp);
      assert.ok(rate * (month - 1) < msrp);
    }
  });
});

describe("trying several devices", () => {
  it("adds up rent for each device against buying all of them", () => {
    // $499, $399, $349 devices at $49, $39, $34 a month, 2 months each.
    const { rent, buyAll } = trialComparison([499, 399, 349], 2);
    assert.equal(rent, 2 * (49 + 39 + 34));
    assert.equal(buyAll, 1247);
  });
});
