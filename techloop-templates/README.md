# techloop Content Template System

## File Map

```
types/
  content.ts                    ← All TypeScript interfaces (mirrors Supabase schema)

lib/
  content.ts                    ← Supabase fetch helpers + price formatters

components/content/
  JobPageTemplate.tsx           ← /for/[slug] — BOFU job landing pages
  DevicePageTemplate.tsx        ← /rent/[slug] — device rental + rent-to-own pages
  BlogPostTemplate.tsx          ← /blog/[slug] — MOFU + TOFU editorial posts

app/
  for/[slug]/page.tsx           ← Next.js route, metadata, structured data
  rent/[slug]/page.tsx          ← Next.js route, Product schema, breadcrumbs
  blog/[slug]/page.tsx          ← Next.js route, Article schema, MDX rendering
  api/revalidate/route.ts       ← On-demand ISR via Supabase webhook
```

## Required Dependencies

```bash
# MDX rendering for blog posts
npm install next-mdx-remote

# Tailwind Typography (for prose styles in blog body)
npm install @tailwindcss/typography

# Add to tailwind.config.ts plugins:
# plugins: [require('@tailwindcss/typography')]
```

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   # server-only, never expose to client
REVALIDATION_SECRET=generate_a_random_string_here  # used by webhook endpoint
```

## Publishing Workflow

1. Insert a row into `content_job_pages`, `content_device_pages`, or `content_blog_posts`
2. Populate all required fields (use AI generation prompt from techloop-content-schemas.md)
3. Set `published = true`
4. Supabase webhook fires → `POST /api/revalidate` → Next.js revalidates that path
5. Page is live in under 5 seconds — no deploy required

## Adding a New Job Page (end-to-end)

```
1. Open Supabase table editor → content_job_pages
2. New row → set published = false
3. Use this Claude prompt to generate JSON content:
   "Generate content for slug: [slug], job: [job title], category: [category], keyword: [keyword]"
   (full prompt in techloop-content-schemas.md Section 7)
4. Paste generated values into each field
5. Review (2–5 minutes)
6. Set published = true → page goes live
7. Copy URL, submit to Google Search Console → Request Indexing
```

## Structured Data Summary

| Page type    | Schema types                              |
|--------------|-------------------------------------------|
| Job page     | BreadcrumbList + FAQPage                  |
| Device page  | Product + AggregateRating + BreadcrumbList|
| Blog post    | Article + FAQPage + BreadcrumbList        |

## ISR Strategy

- `revalidate = 60` on all pages: Next.js rechecks Supabase every 60 seconds
- On-demand revalidation via `/api/revalidate`: page updates in <5 seconds on publish
- `dynamicParams = true`: new slugs render on first request, cached thereafter

## Notes for Cursor / Antigravity

When generating content for a new page, paste the full JobPageSchema Zod definition 
(from techloop-content-schemas.md) into context and instruct:

"Output only valid JSON matching this schema. No markdown, no explanation."

The schema's field-level constraints (max lengths, min array sizes) will self-validate 
when you attempt to insert — Supabase will reject malformed rows before they go live.
