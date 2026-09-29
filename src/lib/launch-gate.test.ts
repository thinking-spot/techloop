// Run with: npm test
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { gateRequest } from "./launch-gate.ts";

const REDIRECT = { action: "redirect", to: "/waitlist" };
const ALLOW = { action: "allow" };
const UNAVAILABLE = { action: "unavailable" };

describe("waitlist mode", () => {
  it("redirects rental-only pages to the waitlist", () => {
    for (const path of [
      "/signup",
      "/login",
      "/forgot-password",
      "/reset-password",
      "/checkout",
      "/checkout/success",
      "/checkout/cancel",
      "/dashboard",
      "/dashboard/wishlist",
      "/settings",
      "/settings/subscription",
    ]) {
      assert.deepEqual(gateRequest(path, "waitlist"), REDIRECT, path);
    }
  });

  it("blocks the checkout API", () => {
    assert.deepEqual(gateRequest("/api/checkout/session", "waitlist"), UNAVAILABLE);
    assert.deepEqual(gateRequest("/api/checkout/embedded", "waitlist"), UNAVAILABLE);
    assert.deepEqual(gateRequest("/api/checkout/session-status", "waitlist"), UNAVAILABLE);
  });

  it("leaves marketing pages and other APIs alone", () => {
    for (const path of [
      "/",
      "/browse",
      "/browse/glasses",
      "/product/meta-rayban",
      "/pricing",
      "/how-it-works",
      "/waitlist",
      "/quiz",
      "/blog/some-post",
      "/for/electricians",
      "/partners",
      "/business",
      "/help",
      "/auth/callback",
      "/api/revalidate",
    ]) {
      assert.deepEqual(gateRequest(path, "waitlist"), ALLOW, path);
    }
  });

  it("does not match on a shared prefix", () => {
    assert.deepEqual(gateRequest("/checkouts-are-fun", "waitlist"), ALLOW);
    assert.deepEqual(gateRequest("/loginfo", "waitlist"), ALLOW);
    assert.deepEqual(gateRequest("/settingsx", "waitlist"), ALLOW);
  });

  it("cannot be bypassed with encoding, case, slashes or a trailing slash", () => {
    assert.deepEqual(gateRequest("/%63heckout", "waitlist"), REDIRECT);
    assert.deepEqual(gateRequest("/Checkout", "waitlist"), REDIRECT);
    assert.deepEqual(gateRequest("/checkout/", "waitlist"), REDIRECT);
    assert.deepEqual(gateRequest("//checkout", "waitlist"), REDIRECT);
    assert.deepEqual(gateRequest("/dashboard//wishlist", "waitlist"), REDIRECT);
    assert.deepEqual(gateRequest("/api/%63heckout/session", "waitlist"), UNAVAILABLE);
    assert.deepEqual(gateRequest("/API/checkout/session", "waitlist"), UNAVAILABLE);
  });

  it("survives malformed percent-encoding", () => {
    assert.deepEqual(gateRequest("/checkout/%E0%A4%A", "waitlist"), REDIRECT);
    assert.deepEqual(gateRequest("/browse/%E0%A4%A", "waitlist"), ALLOW);
  });
});

describe("live mode", () => {
  it("allows everything", () => {
    for (const path of ["/signup", "/checkout", "/dashboard", "/api/checkout/session", "/"]) {
      assert.deepEqual(gateRequest(path, "live"), ALLOW, path);
    }
  });
});
