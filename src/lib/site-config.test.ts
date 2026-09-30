// Run with: npm test
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  resolveLaunchMode,
  parseFlag,
  SHOW_CUSTOMER_PROOF,
  LAUNCH_DEVICE_IDS,
  isLaunchDevice,
  SITE_URL,
} from "./site-config.ts";
import { devices } from "./data.ts";

describe("launch mode", () => {
  it("only the exact string 'live' enables the storefront", () => {
    assert.equal(resolveLaunchMode("live"), "live");
    assert.equal(resolveLaunchMode("waitlist"), "waitlist");
    assert.equal(resolveLaunchMode(undefined), "waitlist");
    assert.equal(resolveLaunchMode(""), "waitlist");
    assert.equal(resolveLaunchMode("LIVE"), "waitlist");
    assert.equal(resolveLaunchMode("true"), "waitlist");
  });
});

describe("customer proof flag", () => {
  it("only the exact string 'true' turns it on", () => {
    assert.equal(parseFlag("true"), true);
    for (const off of [undefined, "", "false", "TRUE", "1", "yes"]) {
      assert.equal(parseFlag(off), false, String(off));
    }
  });

  it("is off by default, so placeholder testimonials and stats stay hidden", () => {
    assert.equal(SHOW_CUSTOMER_PROOF, false);
  });
});

describe("launch devices", () => {
  it("every launch device exists in the catalog", () => {
    const ids = new Set(devices.map((d) => d.id));
    for (const id of LAUNCH_DEVICE_IDS) {
      assert.ok(ids.has(id), `${id} is not in data.ts`);
    }
  });

  it("has no duplicates", () => {
    assert.equal(new Set(LAUNCH_DEVICE_IDS).size, LAUNCH_DEVICE_IDS.length);
  });

  it("isLaunchDevice matches the list", () => {
    assert.equal(isLaunchDevice("meta-rayban"), true);
    assert.equal(isLaunchDevice("quest-3"), false);
  });
});

describe("site url", () => {
  it("is an https origin without a trailing slash", () => {
    assert.match(SITE_URL, /^https:\/\/[^/]+$/);
  });
});
