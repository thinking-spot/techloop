// Brand for each catalog device, keyed by device id. Used for filters and
// structured data. Kept separate from data.ts so the catalog stays pure data.

const BRAND_BY_ID: Record<string, string> = {
  "meta-rayban": "Meta",
  "quest-3": "Meta",
  "xreal-air-pro": "XREAL",
  "xreal-air-2": "XREAL",
  "xreal-air-2-ultra": "XREAL",
  "oura-ring": "Oura",
  "samsung-ring": "Samsung",
  "samsung-buds3-pro": "Samsung",
  "nothing-ear": "Nothing",
  "nothing-ear-a": "Nothing",
  "brilliant-labs-frame": "Brilliant Labs",
  "whoop-4": "Whoop",
  "rabbit-r1": "Rabbit",
  "solos-airgo-3": "Solos",
  "viture-pro-xr": "Viture",
  "rokid-ar-lite": "Rokid",
  "ultrahuman-ring-air": "Ultrahuman",
  "movano-evie-ring": "Movano",
  "circular-ring-slim": "Circular",
  "google-pixel-watch": "Google",
  "apple-watch-series-10": "Apple",
  "garmin-bounce-2": "Garmin",
  "withings-nova": "Withings",
  "iyo-one": "Iyo",
  "timekettle-wt2-w4": "Timekettle",
  "limitless-pendant": "Limitless",
  "plaud-notepin-s": "Plaud",
  "tab-pendant": "Tab",
};

/** The brand that makes a device, or undefined for an unknown id. */
export function brandOf(deviceId: string): string | undefined {
  return BRAND_BY_ID[deviceId];
}

/** Every device id that has a brand entry. */
export function brandedDeviceIds(): string[] {
  return Object.keys(BRAND_BY_ID);
}

/** Every brand in the catalog, A to Z. */
export function allBrands(): string[] {
  return [...new Set(Object.values(BRAND_BY_ID))].sort((a, b) => a.localeCompare(b));
}
