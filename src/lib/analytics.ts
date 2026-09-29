// Thin, typed wrapper around Google Analytics (gtag), which is loaded in
// app/layout.tsx. Never pass personal data (emails, names) as event params.

type AnalyticsEvents = {
  waitlist_submit: {
    device_interest?: string;
    role?: string;
    source?: string;
  };
  quiz_start: Record<string, never>;
  quiz_complete: { top_match?: string };
  product_view: { device_id: string };
  cta_click: { cta: string; location: string; device_id?: string };
};

export type AnalyticsEventName = keyof AnalyticsEvents;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire a GA4 event. Safe to call anywhere; a no-op on the server or when GA is blocked. */
export function track<E extends AnalyticsEventName>(
  event: E,
  params?: AnalyticsEvents[E]
): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, params ?? {});
  } catch {
    // Analytics must never break the page.
  }
}
