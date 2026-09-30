// Which pages search engines are told about, and which they are told to skip.
// One list feeds sitemap.ts and robots.ts, and site-routes.test.ts checks it
// against the real pages in src/app.

/** Static public pages for the sitemap. "" is the home page. Each needs a page.tsx under src/app. */
export const SITEMAP_STATIC_ROUTES = [
  "",
  "/browse",
  "/how-it-works",
  "/pricing",
  "/partners",
  "/business",
  "/quiz",
  "/help",
  "/waitlist",
  "/blog",
  "/privacy",
  "/terms",
  "/rental-terms",
] as const;

/** Private areas robots.txt asks crawlers to skip. Nothing in the sitemap may live under these. */
export const PRIVATE_PATH_PREFIXES = ["/dashboard/", "/settings/", "/checkout/", "/api/"] as const;
