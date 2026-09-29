// Waitlist signup logic: turning a submitted form into a clean database row,
// and saving it. Pure and framework-free so it can be unit tested; the
// server action in app/actions.ts is a thin wrapper around this.

import { devices } from "./data.ts";
import { LAUNCH_DEVICE_IDS } from "./site-config.ts";
import { WAITLIST_ROLES } from "./waitlist-roles.ts";

export const INVALID_EMAIL_ERROR = "Please enter a valid email address.";
export const SAVE_FAILED_ERROR =
  "Something went wrong saving your spot. Please try again in a moment.";

/** Bump when the shape of what the form collects changes. Stored per row. */
export const WAITLIST_FORM_VERSION = 2;

export type WaitlistEntry = {
  email: string;
  device_interest: string | null;
  role: string | null;
  source: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
};

export type WaitlistResult = { ok: true } | { ok: false; error: string };

export type ParsedWaitlistForm =
  | { kind: "entry"; entry: WaitlistEntry }
  | { kind: "bot" }
  | { kind: "invalid"; error: string };

export type DeviceOptionGroup = {
  label: string;
  options: { id: string; name: string }[];
};

type FormLike = { get(name: string): FormDataEntryValue | null };

// ─── Parsing ─────────────────────────────────────────────────────────────────

/** Trim, collapse whitespace, drop control characters, cap the length. */
export function cleanText(value: FormDataEntryValue | null, max: number): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
  if (!cleaned) return null;
  return cleaned.slice(0, max);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function parseEmail(value: FormDataEntryValue | null): string | null {
  const email = cleanText(value, 254)?.toLowerCase() ?? null;
  return email && EMAIL_PATTERN.test(email) ? email : null;
}

const DEVICE_IDS = new Set(devices.map((d) => d.id));
const ROLE_VALUES: Set<string> = new Set(WAITLIST_ROLES.map((r) => r.value));

function parseDevice(value: FormDataEntryValue | null): string | null {
  const id = cleanText(value, 64);
  if (!id) return null;
  return id === "unsure" || DEVICE_IDS.has(id) ? id : null;
}

function parseRole(value: FormDataEntryValue | null): string | null {
  const role = cleanText(value, 32);
  return role && ROLE_VALUES.has(role) ? role : null;
}

/** A page path such as "/product/meta-rayban". Never a query string or a full URL. */
function parseSource(value: FormDataEntryValue | null): string | null {
  const raw = cleanText(value, 300);
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return null;
  const path = raw.split(/[?#]/)[0];
  // Reject rather than truncate: a chopped path would be recorded as a page
  // that does not exist.
  if (path.length > 200) return null;
  return /^[A-Za-z0-9/_\-.~%]+$/.test(path) ? path : null;
}

/** The referring site's hostname only: no path, no query. */
function parseReferrer(value: FormDataEntryValue | null): string | null {
  const raw = cleanText(value, 300);
  if (!raw) return null;
  let host: string | null = null;
  try {
    host = new URL(raw).hostname;
  } catch {
    host = /^[a-z0-9.-]+$/i.test(raw) ? raw : null;
  }
  return host ? host.toLowerCase().slice(0, 100) : null;
}

export function parseWaitlistForm(form: FormLike): ParsedWaitlistForm {
  // Honeypot: real visitors never see or fill this field, bots do.
  if (cleanText(form.get("website"), 200)) return { kind: "bot" };

  const email = parseEmail(form.get("email"));
  if (!email) return { kind: "invalid", error: INVALID_EMAIL_ERROR };

  return {
    kind: "entry",
    entry: {
      email,
      device_interest: parseDevice(form.get("device")),
      role: parseRole(form.get("role")),
      source: parseSource(form.get("source")),
      referrer: parseReferrer(form.get("referrer")),
      utm_source: cleanText(form.get("utm_source"), 100),
      utm_medium: cleanText(form.get("utm_medium"), 100),
      utm_campaign: cleanText(form.get("utm_campaign"), 100),
    },
  };
}

// ─── Device choices for the form ─────────────────────────────────────────────

/** Launch devices first, in launch order, then everything else A to Z. */
export function getWaitlistDeviceOptions(): DeviceOptionGroup[] {
  const byId = new Map(devices.map((d) => [d.id, d]));
  const launching = LAUNCH_DEVICE_IDS.flatMap((id) => {
    const d = byId.get(id);
    return d ? [{ id: d.id, name: d.name }] : [];
  });
  const later = devices
    .filter((d) => !LAUNCH_DEVICE_IDS.includes(d.id))
    .map((d) => ({ id: d.id, name: d.name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return [
    { label: "Launching first", options: launching },
    { label: "Coming later", options: later },
  ];
}

// ─── Saving ──────────────────────────────────────────────────────────────────

type DbError = { code?: string; message?: string };

/** The slice of the Supabase client we use, so tests can pass a fake. */
export interface WaitlistClient {
  from(table: "waitlist"): {
    insert(row: Record<string, unknown>): PromiseLike<{ error: DbError | null }>;
  };
}

/** A unique-violation on email: they are already on the list. */
export function isDuplicateError(error: DbError): boolean {
  return error.code === "23505";
}

/** The v2 columns are not in the database yet (migration not applied). */
export function isMissingColumnError(error: DbError): boolean {
  return (
    error.code === "PGRST204" ||
    error.code === "42703" ||
    /could not find the .* column|column .* does not exist/i.test(error.message ?? "")
  );
}

/**
 * Save a signup. Duplicates count as success, so nobody can probe which
 * emails are on the list. If the v2 columns are missing (the migration has
 * not been applied yet) it falls back to the original columns rather than
 * losing the signup.
 */
export async function submitWaitlist(
  client: WaitlistClient,
  entry: WaitlistEntry,
  now: Date = new Date()
): Promise<WaitlistResult> {
  const table = client.from("waitlist");

  let { error } = await table.insert({
    ...entry,
    form_version: WAITLIST_FORM_VERSION,
    consented_at: now.toISOString(),
  });

  if (error && isMissingColumnError(error)) {
    console.warn(
      "Waitlist: v2 columns are missing, saving the original columns only. " +
        "Apply supabase/migrations/20260929120000_waitlist_v2.sql."
    );
    ({ error } = await table.insert({
      email: entry.email,
      device_interest: entry.device_interest,
    }));
  }

  if (!error || isDuplicateError(error)) return { ok: true };

  // Log the code and message only: the error details can contain the email.
  console.error("Waitlist insert failed:", error.code, error.message);
  return { ok: false, error: SAVE_FAILED_ERROR };
}
