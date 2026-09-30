// Run with: npm test
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolveCheckoutItem, resolveOrigin } from "./checkout.ts";
import { devices } from "./data.ts";
import { LAUNCH_DEVICE_IDS, SITE_URL } from "./site-config.ts";
import { monthlyRate, toCents } from "./pricing.ts";

describe("resolveCheckoutItem", () => {
  it("prices a device from the catalog and the pricing rule", () => {
    assert.deepEqual(resolveCheckoutItem("meta-rayban"), {
      id: "meta-rayban",
      name: "Meta Ray-Ban Wayfarer",
      monthlyCents: 3900, // $399 -> $39 a month
    });
  });

  it("can check out every launch device, at exactly the pricing rule", () => {
    for (const id of LAUNCH_DEVICE_IDS) {
      const device = devices.find((d) => d.id === id)!;
      const item = resolveCheckoutItem(id);
      assert.ok(item, `${id} should be rentable`);
      assert.equal(item.monthlyCents, toCents(monthlyRate(device.msrp!)), id);
      assert.equal(item.name, device.name, id);
    }
  });

  it("refuses devices that are only 'coming soon'", () => {
    const soon = devices.filter((d) => !LAUNCH_DEVICE_IDS.includes(d.id));
    assert.ok(soon.length > 0);
    for (const d of soon) assert.equal(resolveCheckoutItem(d.id), null, d.id);
  });

  it("refuses anything that is not a known device id", () => {
    const bad: unknown[] = [
      undefined,
      null,
      "",
      " ",
      "nope",
      "meta-rayban ",
      "META-RAYBAN",
      "meta-rayban' OR '1'='1",
      "__proto__",
      "constructor",
      42,
      {},
      ["meta-rayban"],
      { id: "meta-rayban" },
    ];
    for (const value of bad) assert.equal(resolveCheckoutItem(value), null, JSON.stringify(value));
  });

  it("returns only the id, name and price", () => {
    assert.deepEqual(Object.keys(resolveCheckoutItem("meta-rayban")!).sort(), ["id", "monthlyCents", "name"]);
  });
});

describe("resolveOrigin", () => {
  it("uses the canonical site when there is no Origin header", () => {
    assert.equal(resolveOrigin(null), SITE_URL);
  });

  it("accepts our own origins", () => {
    assert.equal(resolveOrigin(SITE_URL), SITE_URL);
    assert.equal(resolveOrigin("https://trytechloop.com"), "https://trytechloop.com");
  });

  it("ignores anyone else's origin", () => {
    for (const origin of [
      "https://evil.example",
      "https://www.trytechloop.com.evil.example",
      "http://www.trytechloop.com",
      "https://trytechloop.com:8443",
      "",
    ]) {
      assert.equal(resolveOrigin(origin), SITE_URL, origin);
    }
  });

  it("accepts this deployment's own preview host, and only that one", () => {
    const options = { vercelUrl: "techloop-git-preview.vercel.app" };
    assert.equal(resolveOrigin("https://techloop-git-preview.vercel.app", options), "https://techloop-git-preview.vercel.app");
    assert.equal(resolveOrigin("https://other-app.vercel.app", options), SITE_URL);
    assert.equal(resolveOrigin("https://techloop-git-preview.vercel.app"), SITE_URL);
  });

  it("accepts localhost only when allowed", () => {
    assert.equal(resolveOrigin("http://localhost:3000", { allowLocalhost: true }), "http://localhost:3000");
    assert.equal(resolveOrigin("http://localhost:3000"), SITE_URL);
    assert.equal(resolveOrigin("http://localhost.evil.example", { allowLocalhost: true }), SITE_URL);
    assert.equal(resolveOrigin("http://localhost:3000@evil.example", { allowLocalhost: true }), SITE_URL);
  });
});
