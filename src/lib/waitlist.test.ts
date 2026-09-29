// Run with: npm test
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  parseWaitlistForm,
  parseEmail,
  cleanText,
  getWaitlistDeviceOptions,
  submitWaitlist,
  isDuplicateError,
  isMissingColumnError,
  INVALID_EMAIL_ERROR,
  SAVE_FAILED_ERROR,
  WAITLIST_FORM_VERSION,
  type WaitlistClient,
  type WaitlistEntry,
} from "./waitlist.ts";
import { devices } from "./data.ts";
import { LAUNCH_DEVICE_IDS } from "./site-config.ts";

function form(fields: Record<string, string>): FormData {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}

function entryOf(fields: Record<string, string>): WaitlistEntry {
  const parsed = parseWaitlistForm(form(fields));
  assert.equal(parsed.kind, "entry");
  return (parsed as { kind: "entry"; entry: WaitlistEntry }).entry;
}

describe("email", () => {
  it("trims and lowercases", () => {
    assert.equal(parseEmail("  Jane.Doe@Example.COM "), "jane.doe@example.com");
  });

  it("rejects malformed addresses", () => {
    for (const bad of ["", "   ", "plain", "a@b", "a@b.c", "@x.com", "a b@x.com", "a@@x.com"]) {
      assert.equal(parseEmail(bad), null, JSON.stringify(bad));
    }
    assert.equal(parseEmail(null), null);
  });

  it("rejects addresses over 254 characters", () => {
    assert.equal(parseEmail(`${"a".repeat(250)}@example.com`), null);
  });

  it("ignores non-string values such as file uploads", () => {
    assert.equal(parseEmail(new File(["x"], "x.txt")), null);
  });
});

describe("parseWaitlistForm", () => {
  it("accepts a minimal signup", () => {
    const e = entryOf({ email: "a@example.com" });
    assert.deepEqual(e, {
      email: "a@example.com",
      device_interest: null,
      role: null,
      source: null,
      referrer: null,
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
    });
  });

  it("returns a friendly error for a bad email", () => {
    assert.deepEqual(parseWaitlistForm(form({ email: "nope" })), {
      kind: "invalid",
      error: INVALID_EMAIL_ERROR,
    });
    assert.deepEqual(parseWaitlistForm(form({})), {
      kind: "invalid",
      error: INVALID_EMAIL_ERROR,
    });
  });

  it("treats a filled honeypot as a bot, even with a valid email", () => {
    assert.deepEqual(
      parseWaitlistForm(form({ email: "a@example.com", website: "http://spam.example" })),
      { kind: "bot" }
    );
  });

  it("keeps only known devices, plus 'unsure'", () => {
    assert.equal(entryOf({ email: "a@example.com", device: "meta-rayban" }).device_interest, "meta-rayban");
    assert.equal(entryOf({ email: "a@example.com", device: "unsure" }).device_interest, "unsure");
    assert.equal(entryOf({ email: "a@example.com", device: "" }).device_interest, null);
    // Old dropdown values and made-up ids are dropped, not stored.
    assert.equal(entryOf({ email: "a@example.com", device: "bee-bracelet" }).device_interest, null);
    assert.equal(entryOf({ email: "a@example.com", device: "xreal" }).device_interest, null);
    assert.equal(entryOf({ email: "a@example.com", device: "'; drop table waitlist;--" }).device_interest, null);
  });

  it("keeps only allowed roles", () => {
    assert.equal(entryOf({ email: "a@example.com", role: "developer" }).role, "developer");
    assert.equal(entryOf({ email: "a@example.com", role: "ceo" }).role, null);
    assert.equal(entryOf({ email: "a@example.com", role: "" }).role, null);
  });

  it("keeps the source as a path only", () => {
    const src = (source: string) => entryOf({ email: "a@example.com", source }).source;
    assert.equal(src("/product/meta-rayban"), "/product/meta-rayban");
    assert.equal(src("/waitlist?device=x&utm=y#top"), "/waitlist");
    assert.equal(src("https://evil.example/x"), null);
    assert.equal(src("//evil.example/x"), null);
    assert.equal(src("javascript:alert(1)"), null);
    assert.equal(src("/has space"), null);
    assert.equal(src(`/${"a".repeat(400)}`), null);
  });

  it("keeps the referrer as a hostname only", () => {
    const ref = (referrer: string) => entryOf({ email: "a@example.com", referrer }).referrer;
    assert.equal(ref("https://www.Google.com/search?q=smart+glasses"), "www.google.com");
    assert.equal(ref("google.com"), "google.com");
    assert.equal(ref(""), null);
    assert.equal(ref("not a url at all"), null);
  });

  it("caps and cleans free-text utm fields", () => {
    const e = entryOf({
      email: "a@example.com",
      utm_source: "  google\n\tads  ",
      utm_medium: "x".repeat(500),
      utm_campaign: "",
    });
    assert.equal(e.utm_source, "google ads");
    assert.equal(e.utm_medium?.length, 100);
    assert.equal(e.utm_campaign, null);
  });
});

describe("cleanText", () => {
  it("strips control characters and collapses whitespace", () => {
    assert.equal(cleanText("a\u0000b\u0007  c\n\nd", 50), "a b c d");
  });
  it("returns null for empty or non-strings", () => {
    assert.equal(cleanText("   ", 10), null);
    assert.equal(cleanText(null, 10), null);
  });
});

describe("device options", () => {
  const groups = getWaitlistDeviceOptions();
  const all = groups.flatMap((g) => g.options.map((o) => o.id));

  it("lists every catalog device exactly once", () => {
    assert.equal(all.length, devices.length);
    assert.equal(new Set(all).size, devices.length);
  });

  it("puts launch devices first, in launch order", () => {
    assert.equal(groups[0].label, "Launching first");
    assert.deepEqual(groups[0].options.map((o) => o.id), [...LAUNCH_DEVICE_IDS]);
  });

  it("sorts the rest by name", () => {
    const names = groups[1].options.map((o) => o.name);
    assert.deepEqual(names, [...names].sort((a, b) => a.localeCompare(b)));
  });
});

describe("error classification", () => {
  it("recognizes duplicates", () => {
    assert.equal(isDuplicateError({ code: "23505" }), true);
    assert.equal(isDuplicateError({ code: "42501" }), false);
  });

  it("recognizes missing columns however they are reported", () => {
    assert.equal(isMissingColumnError({ code: "PGRST204" }), true);
    assert.equal(isMissingColumnError({ code: "42703" }), true);
    assert.equal(
      isMissingColumnError({ message: "Could not find the 'role' column of 'waitlist' in the schema cache" }),
      true
    );
    assert.equal(isMissingColumnError({ code: "23505", message: "duplicate key" }), false);
    assert.equal(isMissingColumnError({ message: "fetch failed" }), false);
  });
});

/** A fake database that records inserts and answers from a script. */
function fakeClient(responses: Array<{ error: { code?: string; message?: string } | null }>) {
  const inserts: Array<Record<string, unknown>> = [];
  const client: WaitlistClient = {
    from() {
      return {
        insert(row) {
          inserts.push(row);
          return Promise.resolve(responses.shift() ?? { error: null });
        },
      };
    },
  };
  return { client, inserts };
}

const ENTRY: WaitlistEntry = {
  email: "a@example.com",
  device_interest: "meta-rayban",
  role: "creator",
  source: "/waitlist",
  referrer: "google.com",
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
};

// Silence the expected console output from the failure paths.
function quiet<T>(fn: () => Promise<T>): Promise<T> {
  const { warn, error } = console;
  console.warn = () => {};
  console.error = () => {};
  return fn().finally(() => {
    console.warn = warn;
    console.error = error;
  });
}

describe("submitWaitlist", () => {
  it("inserts the full v2 row", async () => {
    const { client, inserts } = fakeClient([{ error: null }]);
    const now = new Date("2026-09-29T12:00:00Z");
    assert.deepEqual(await submitWaitlist(client, ENTRY, now), { ok: true });
    assert.equal(inserts.length, 1);
    assert.deepEqual(inserts[0], {
      ...ENTRY,
      form_version: WAITLIST_FORM_VERSION,
      consented_at: "2026-09-29T12:00:00.000Z",
    });
  });

  it("treats a duplicate email as success without retrying", async () => {
    const { client, inserts } = fakeClient([{ error: { code: "23505", message: "duplicate key" } }]);
    assert.deepEqual(await submitWaitlist(client, ENTRY), { ok: true });
    assert.equal(inserts.length, 1);
  });

  it("falls back to the original columns when the migration is not applied", async () => {
    const { client, inserts } = fakeClient([
      { error: { code: "PGRST204", message: "Could not find the 'role' column of 'waitlist'" } },
      { error: null },
    ]);
    assert.deepEqual(await quiet(() => submitWaitlist(client, ENTRY)), { ok: true });
    assert.equal(inserts.length, 2);
    assert.deepEqual(inserts[1], { email: "a@example.com", device_interest: "meta-rayban" });
  });

  it("still reports a duplicate found during the fallback as success", async () => {
    const { client } = fakeClient([
      { error: { code: "PGRST204" } },
      { error: { code: "23505" } },
    ]);
    assert.deepEqual(await quiet(() => submitWaitlist(client, ENTRY)), { ok: true });
  });

  it("reports a real failure instead of pretending it worked", async () => {
    const { client, inserts } = fakeClient([{ error: { code: "42501", message: "permission denied" } }]);
    assert.deepEqual(await quiet(() => submitWaitlist(client, ENTRY)), {
      ok: false,
      error: SAVE_FAILED_ERROR,
    });
    assert.equal(inserts.length, 1);
  });

  it("reports a network failure", async () => {
    const { client } = fakeClient([{ error: { message: "fetch failed" } }]);
    const result = await quiet(() => submitWaitlist(client, ENTRY));
    assert.equal(result.ok, false);
  });
});
