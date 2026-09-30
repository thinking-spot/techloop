Techloop Content Schemas

Architecture: Supabase (Postgres) + Next.js App Router + ISR

---

## Overview

Content is stored in Supabase and fetched by Next.js at request time (ISR with
revalidation). Each content type maps to one Supabase table. TypeScript interfaces
define the shape consumed by page components. The same interface is used to:

1. Validate content in Supabase (via Zod)
2. Type the Next.js page props
3. Guide AI content generation (pass the schema to Claude/Antigravity as a prompt context)

**Publishing workflow:**
INSERT row into Supabase → audit it → Vercel ISR revalidates → page is live within seconds.
No deploy required after initial template is built.

---

## Read this first: facts live in code, not in rows

Content rows are prose. They must not restate facts that the site already owns, because
the row cannot follow when the fact changes. That is how the old rows ended up with
prices, ratings and promises that were never true or stopped being true.

| Fact | Where it lives | What a row may do |
| --- | --- | --- |
| Prices, deposit, rent-to-own credit, buyout | `src/lib/pricing.ts` (one rule for every device) | Never state an amount. Say "see pricing" and link to `/pricing`. |
| Policy: minimum first rental, return window, refunds, swaps, failed payments | `POLICY` in `src/lib/faq.ts`, plus the Rental Terms page | Don't restate the numbers. Link to `/rental-terms`. |
| Which devices exist, their names, specs, retail price | `src/lib/data.ts` (the catalog) | Refer to a device only by its catalog id. |
| Which devices are open for rent | `LAUNCH_DEVICE_IDS` in `src/lib/site-config.ts` | Don't promise availability. |
| Customers, reviews, ratings | none exist yet | Leave every testimonial, stat, rating and review column NULL. |
| Where things are | the pages listed below | Link only to pages that exist. |

Pages that exist: `/`, `/pricing`, `/how-it-works`, `/waitlist`, `/quiz`, `/browse`,
`/browse/<category>`, `/product/<catalog id>`, `/blog/<slug>`, `/for/<slug>`, `/privacy`,
`/terms`, `/rental-terms`. There is no `/rent` page and no `/device` page: a device's page
is `/product/<catalog id>`.

Also keep out of content: delivery or shipping times, "best"/"most popular" style
superlatives, and any tax, legal, safety, medical or workplace-regulation advice. The full
list of claims that have been removed is in `src/lib/banned-claims.ts`; the audit enforces it.

**Check before you publish.** Save the generated JSON to a file and run:

```
npm run audit:content -- --file page.json
```

It exits 0 when the row is clean. To check every row already in Supabase, run
`npm run audit:content` (needs `NEXT_PUBLIC_SUPABASE_URL` and a key in `.env.local`). To
clear the backlog of old rows, see `supabase/patches/20260930_content_cleanup.sql`.
Regenerating a page with the prompt in section 7 is usually faster than editing it.

---

## 1. Job / Life Landing Pages (`/for/[slug]`)

### Supabase Table: `content_job_pages`

```sql
create table content_job_pages (
  id uuid primary key default gen_random_uuid(),
  
  -- Routing
  slug text not null unique,              -- e.g. "electricians"
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- SEO
  meta_title text not null,              -- max 60 chars
  meta_description text not null,        -- max 155 chars
  og_image_url text,

  -- Hero
  hero_headline text not null,           -- e.g. "AI Wearables for Electricians"
  hero_subheadline text not null,        -- e.g. "Hands-free on the job. Try before you buy."
  hero_cta_primary text not null,        -- e.g. "Take the Device Quiz"
  hero_cta_secondary text not null,      -- e.g. "See pricing" (never a price)

  -- Audience
  job_title text not null,               -- e.g. "Electrician"
  job_category text not null,            -- "blue-collar" | "white-collar" | "life-context" | "enthusiast"
  audience_description text not null,   -- 1–2 sentences describing the audience

  -- Pain points (3 required)
  pain_points jsonb not null,
  -- Shape: [{ title: string, body: string, icon?: string }] (min 3, max 5)

  -- Device recommendations (1–3)
  recommended_devices jsonb not null,
  -- Shape: [{ device_slug: string, reason: string, cta_label: string }]
  -- device_slug must be a catalog id from src/lib/data.ts (e.g. "meta-rayban"). Any other value
  -- is silently dropped from the page.

  -- How it works (job-framed, 3 steps)
  how_it_works jsonb not null,
  -- Shape: [{ step: number, title: string, body: string }]

  -- Objection handling (2–4)
  objections jsonb not null,
  -- Shape: [{ question: string, answer: string }]

  -- Social proof: LEAVE ALL NULL. There are no customers yet. The site hides these columns
  -- unless NEXT_PUBLIC_SHOW_CUSTOMER_PROOF is switched on, which should only happen once the
  -- values are real and the person quoted has agreed to it.
  testimonial_quote text,
  testimonial_name text,
  testimonial_job_title text,
  testimonial_company text,

  -- FAQ (4–6 entries, used for FAQPage schema)
  faqs jsonb not null,
  -- Shape: [{ question: string, answer: string }]

  -- Internal linking
  related_job_slugs text[],             -- slugs of adjacent job pages to link to
  related_blog_slugs text[],            -- slugs of relevant blog posts

  -- Trust-bar numbers: LEAVE ALL NULL, for the same reason as the testimonial columns.
  stat_users_count text,
  stat_rating text,
  stat_return_rate text,

  constraint pain_points_min check (jsonb_array_length(pain_points) >= 3),
  constraint faqs_min check (jsonb_array_length(faqs) >= 4)
);

create index on content_job_pages (slug) where published = true;
create index on content_job_pages (job_category) where published = true;
```

### TypeScript Interface

```typescript
// types/content.ts

export type JobCategory = 
  | 'blue-collar' 
  | 'white-collar' 
  | 'life-context' 
  | 'enthusiast';

export interface PainPoint {
  title: string;        // e.g. "No hands? No problem."
  body: string;         // 2–3 sentences
  icon?: string;        // lucide-react icon name, optional
}

export interface DeviceRecommendation {
  device_slug: string;  // a catalog id from src/lib/data.ts
  reason: string;       // 1–2 sentences why this device fits this job
  cta_label: string;    // e.g. "See the XREAL Air 2 Pro"
}

export interface HowItWorksStep {
  step: number;         // 1, 2, 3
  title: string;        // e.g. "Pick your device"
  body: string;         // 2–3 sentences, job-framed
}

export interface Objection {
  question: string;     // e.g. "Will smart glasses survive a job site?"
  answer: string;       // 3–5 sentences
}

export interface FAQ {
  question: string;
  answer: string;       // Direct, 40–60 words (for featured snippet)
}

export interface JobPageContent {
  id: string;
  slug: string;
  published: boolean;
  created_at: string;
  updated_at: string;

  // SEO
  meta_title: string;
  meta_description: string;
  og_image_url?: string;

  // Hero
  hero_headline: string;
  hero_subheadline: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;

  // Audience
  job_title: string;
  job_category: JobCategory;
  audience_description: string;

  // Sections
  pain_points: PainPoint[];            // 3–5
  recommended_devices: DeviceRecommendation[]; // 1–3
  how_it_works: HowItWorksStep[];      // exactly 3
  objections: Objection[];             // 2–4
  faqs: FAQ[];                         // 4–6

  // Social proof (leave null: no customers yet)
  testimonial_quote?: string;
  testimonial_name?: string;
  testimonial_job_title?: string;
  testimonial_company?: string;

  // Internal linking
  related_job_slugs?: string[];
  related_blog_slugs?: string[];

  // Trust bar (leave null: no customers yet)
  stat_users_count?: string;
  stat_rating?: string;
  stat_return_rate?: string;
}
```

### Example JSON (for one row / AI generation target)

```json
{
  "slug": "electricians",
  "published": true,
  "meta_title": "AI Wearables for Electricians | techloop",
  "meta_description": "Rent smart glasses built for electrical work. Hands-free schematics, voice notes and job site comms. Put your payments toward owning them.",
  "hero_headline": "AI Wearables for Electricians",
  "hero_subheadline": "Hands-free on the job. Try before you buy, and put your payments toward owning it.",
  "hero_cta_primary": "Take the Device Quiz",
  "hero_cta_secondary": "See pricing",
  "job_title": "Electrician",
  "job_category": "blue-collar",
  "audience_description": "Electricians work in tight spaces with both hands occupied. The right AI wearable keeps documentation, communication, and safety information accessible without ever putting down a tool.",
  "pain_points": [
    {
      "title": "Schematics shouldn't require a third hand",
      "body": "Pulling out a phone or tablet mid-job is slow, awkward, and sometimes dangerous. Smart glasses put wiring diagrams, code references, and blueprints directly in your line of sight — hands stay on the work.",
      "icon": "Zap"
    },
    {
      "title": "Voice memos beat written notes every time",
      "body": "Logging job notes, material lists, and punch items is friction that slows every job. AI earbuds and smart glasses let you dictate on the spot — the note is there when you need it.",
      "icon": "Mic"
    },
    {
      "title": "Remote expert calls without holding a phone",
      "body": "When you need a second opinion on a panel or an unusual install, hands-free video calls to a master electrician or your shop saves hours of back-and-forth.",
      "icon": "Video"
    }
  ],
  "recommended_devices": [
    {
      "device_slug": "xreal-air-pro",
      "reason": "Lightweight AR glasses with a wide field of view, so schematics stay in front of you while your hands stay on the work.",
      "cta_label": "See the XREAL Air 2 Pro"
    },
    {
      "device_slug": "meta-rayban",
      "reason": "Looks like an ordinary pair of sunglasses, with a built-in camera, voice assistant and speakers for hands-free notes and calls.",
      "cta_label": "See the Meta Ray-Ban Wayfarer"
    }
  ],
  "how_it_works": [
    {
      "step": 1,
      "title": "Pick the device that fits your job",
      "body": "Take the device quiz or browse by device type, then match what your job needs to the right glasses, ring or earbuds."
    },
    {
      "step": 2,
      "title": "We ship it new, you try it on the job",
      "body": "Your first device arrives new and sealed. Use it on real jobs and see whether it earns a place in your kit before you own it."
    },
    {
      "step": 3,
      "title": "Keep it, swap it, or send it back",
      "body": "Love it? Part of what you pay counts toward buying it. Want something different? You can swap or send it back. The rental terms explain how."
    }
  ],
  "objections": [
    {
      "question": "Will smart glasses hold up on a job site?",
      "answer": "Smart glasses are built for everyday wear, not for extreme conditions, so check the maker's guidance for your environment. Trying one first is the point of renting: you find out whether it fits the way you actually work before you own it."
    },
    {
      "question": "Are smart glasses OK to wear while doing electrical work?",
      "answer": "That depends on your employer, your site's rules, and whether the device works alongside your required safety equipment. Ask your supervisor before you wear one on a job, and read the maker's guidance on safe use."
    },
    {
      "question": "Is it worth paying for a tool I might not use every day?",
      "answer": "That is what renting is for. You pay a small monthly amount instead of the full price up front, so you can find out whether it earns its place in your routine. If it does, part of what you have paid counts toward buying it."
    }
  ],
  "faqs": [
    {
      "question": "What smart glasses work best for electricians?",
      "answer": "Two good starting points are the XREAL Air 2 Pro, which has a wider display for schematics, and the Meta Ray-Ban Wayfarer, which looks more discreet on site. Which fits best depends on your work, so compare them on their product pages."
    },
    {
      "question": "Can I use smart glasses with a hard hat?",
      "answer": "It depends on the frame and the hat. Check each maker's fit guidance, and ask your site supervisor about your safety equipment rules. Trying a device before you buy is the easiest way to find out whether it works with your gear."
    },
    {
      "question": "Do AI wearables work without a phone?",
      "answer": "Most smart glasses connect to your phone over Bluetooth or a cable and rely on it for data. Some have limited features on their own. Check the maker's specs for the model you are considering to see what works without a phone."
    },
    {
      "question": "How long does the battery last on smart glasses?",
      "answer": "It varies a lot by device and by how you use it, and some models draw power from the connected device instead of having their own battery. The maker's spec sheet is the best guide, and you can compare devices on our product pages."
    },
    {
      "question": "Can I keep the device if I like it?",
      "answer": "Yes. Part of what you pay counts toward buying it, so you can keep a device you love. The rental terms explain how the credit works, and the pricing page shows the numbers for each device."
    }
  ],
  "testimonial_quote": null,
  "testimonial_name": null,
  "testimonial_job_title": null,
  "testimonial_company": null,
  "related_job_slugs": ["hvac-technicians", "field-service-techs", "construction-managers"],
  "related_blog_slugs": ["smart-glasses-legal-at-work", "xreal-vs-meta-ray-ban", "smart-glasses-for-blue-collar-workers"],
  "stat_users_count": null,
  "stat_rating": null,
  "stat_return_rate": null
}
```

---

## 2. Device Pages (not built yet)

There is no device page under `/rent`, and no page reads this table today. A device's public
page is `/product/<catalog id>`, rendered from the catalog in `src/lib/data.ts`, which is
where its name, specs and retail price come from. This table is kept for a later phase
that adds richer device pages. **Do not publish rows here until that phase is built.**

When it is built, price columns are derived, never authored: the monthly price, the
number of credited payments and the credit total all follow `src/lib/pricing.ts`. The
audit checks the stored values against the rule, and the cleanup patch recomputes them.

### Supabase Table: `content_device_pages`

```sql
create table content_device_pages (
  id uuid primary key default gen_random_uuid(),

  -- Routing
  slug text not null unique,              -- the catalog id, e.g. "xreal-air-pro"
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- SEO
  meta_title text not null,
  meta_description text not null,
  og_image_url text,

  -- Device identity
  device_name text not null,             -- e.g. "XREAL Air 2 Pro"
  brand text not null,                   -- e.g. "XREAL"
  category text not null,                -- "smart-glasses" | "smart-ring" | "ai-earbuds" | "ai-watch" | "ai-pin" | "robotics"
  tagline text not null,                 -- e.g. "The AR glasses built for serious use."
  msrp_cents integer not null,           -- retail price in cents; must match the catalog
  rental_price_cents integer not null,   -- DERIVED from msrp_cents by lib/pricing.ts, never written by hand

  -- Hero
  hero_headline text not null,
  hero_subheadline text not null,
  image_url text,
  image_alt text,

  -- Specs (rendered as a table)
  specs jsonb not null,
  -- Shape: [{ label: string, value: string }]
  -- e.g. [{ label: "Display", value: "Micro-OLED, 46° FoV" }, ...]

  -- Key features (3–5 bullets for the feature section)
  features jsonb not null,
  -- Shape: [{ title: string, body: string, icon?: string }]

  -- Best for (job/use-case tags — links to job pages)
  best_for_job_slugs text[],            -- references content_job_pages.slug
  best_for_labels text[],               -- human-readable: ["Electricians", "Remote Workers"]

  -- Rental details
  rental_includes jsonb not null,
  -- Shape: [{ item: string }] — what is in the box, as the maker ships it

  -- Rent-to-own math: DERIVED, never written by hand
  purchase_credit_months integer default 3,  -- how many monthly payments count toward buying
  purchase_credit_total_cents integer,        -- the deposit plus those payments, from lib/pricing.ts

  -- Comparison
  vs_devices jsonb,
  -- Shape: [{ device_slug: string, comparison_slug: string }]
  -- Links to /blog/[comparison_slug] for the vs post

  -- FAQs (device-specific)
  faqs jsonb not null,
  -- Shape: [{ question: string, answer: string }]

  -- Social proof: LEAVE ALL NULL. There are no customers or reviews yet.
  subscriber_rating decimal(3,2),
  subscriber_review_count integer,
  featured_review_quote text,
  featured_review_author text,

  -- Internal linking
  related_device_slugs text[],

  constraint specs_min check (jsonb_array_length(specs) >= 4),
  constraint faqs_min check (jsonb_array_length(faqs) >= 3)
);

create index on content_device_pages (slug) where published = true;
create index on content_device_pages (category) where published = true;
```

### TypeScript Interface

```typescript
export type DeviceCategory = 
  | 'smart-glasses'
  | 'smart-ring'
  | 'ai-earbuds'
  | 'ai-watch'
  | 'ai-pin'
  | 'ai-card'
  | 'robotics';

export interface DeviceSpec {
  label: string;          // e.g. "Battery Life"
  value: string;          // e.g. "4–6 hours active"
}

export interface DeviceFeature {
  title: string;
  body: string;
  icon?: string;          // lucide-react icon name
}

export interface RentalIncludesItem {
  item: string;           // e.g. "New, sealed device", "USB-C charging cable"
}

export interface DeviceVsLink {
  device_slug: string;
  comparison_slug: string; // blog slug for the vs post
}

export interface DevicePageContent {
  id: string;
  slug: string;
  published: boolean;
  created_at: string;
  updated_at: string;

  // SEO
  meta_title: string;
  meta_description: string;
  og_image_url?: string;

  // Identity
  device_name: string;
  brand: string;
  category: DeviceCategory;
  tagline: string;
  msrp_cents: number;
  rental_price_cents: number;

  // Hero
  hero_headline: string;
  hero_subheadline: string;
  image_url?: string;
  image_alt?: string;

  // Content
  specs: DeviceSpec[];              // 4–8
  features: DeviceFeature[];        // 3–5
  rental_includes: RentalIncludesItem[];
  faqs: FAQ[];                      // 3–5

  // Linking
  best_for_job_slugs: string[];
  best_for_labels: string[];
  vs_devices?: DeviceVsLink[];
  related_device_slugs?: string[];

  // Rent-to-own
  purchase_credit_months: number;
  purchase_credit_total_cents: number;

  // Social proof (leave null: no customers yet)
  subscriber_rating?: number;
  subscriber_review_count?: number;
  featured_review_quote?: string;
  featured_review_author?: string;
}
```

### Example JSON

The prices below are what `src/lib/pricing.ts` gives for a retail price of 49900 cents.

```json
{
  "slug": "xreal-air-pro",
  "published": false,
  "meta_title": "Rent XREAL Air 2 Pro Smart Glasses | techloop",
  "meta_description": "Rent the XREAL Air 2 Pro by the month and put your payments toward owning it. See the full price and how the credit works.",
  "device_name": "XREAL Air 2 Pro",
  "brand": "XREAL",
  "category": "smart-glasses",
  "tagline": "The AR glasses built for serious daily use.",
  "msrp_cents": 49900,
  "rental_price_cents": 4900,
  "hero_headline": "Rent the XREAL Air 2 Pro and try it before you own it",
  "hero_subheadline": "Rent by the month, and put part of what you pay toward buying it.",
  "specs": [
    { "label": "Display", "value": "Micro-OLED, 46° FoV" },
    { "label": "Resolution", "value": "1080p per eye" },
    { "label": "Weight", "value": "72g" },
    { "label": "Connection", "value": "USB-C (phone or laptop)" },
    { "label": "Compatibility", "value": "iOS, Android, Mac, Windows, Steam Deck" },
    { "label": "Battery", "value": "Powered by connected device" },
    { "label": "Audio", "value": "Spatial audio speakers" }
  ],
  "features": [
    {
      "title": "A huge virtual screen that goes anywhere",
      "body": "The Micro-OLED display creates a large virtual screen floating in your field of view. Work, watch, or reference materials without a monitor.",
      "icon": "Monitor"
    },
    {
      "title": "Works with the devices you already own",
      "body": "Plugs into many USB-C devices that support video output, including phones, laptops and handheld consoles. Check the maker's compatibility list for your model.",
      "icon": "Cable"
    },
    {
      "title": "Light enough for long sessions",
      "body": "At 72g it is designed to be worn for hours, and the electrochromic lenses adjust their darkness so it works indoors and out.",
      "icon": "Sun"
    }
  ],
  "rental_includes": [
    { "item": "A new, sealed XREAL Air 2 Pro" },
    { "item": "Everything the maker includes in the box" }
  ],
  "best_for_job_slugs": ["electricians", "remote-workers", "software-engineers", "consultants"],
  "best_for_labels": ["Electricians", "Remote Workers", "Software Engineers", "Consultants"],
  "vs_devices": [
    { "device_slug": "meta-rayban", "comparison_slug": "xreal-vs-meta-ray-ban" }
  ],
  "related_device_slugs": ["meta-rayban", "brilliant-labs-frame"],
  "purchase_credit_months": 3,
  "purchase_credit_total_cents": 19600,
  "faqs": [
    {
      "question": "Does the XREAL Air 2 Pro work with my iPhone?",
      "answer": "Many recent iPhones with a USB-C port can connect directly, and older ones may need an adapter. Check XREAL's compatibility list for your exact model before you rent."
    },
    {
      "question": "What comes with the rental?",
      "answer": "Your first device ships new and sealed, with whatever the maker puts in the box. The rental terms cover everything else about how a rental works."
    },
    {
      "question": "Can I put my payments toward buying the XREAL Air 2 Pro?",
      "answer": "Yes. Part of what you pay counts toward buying it. The rental terms explain exactly how much, and the pricing page shows the numbers for this device."
    }
  ],
  "subscriber_rating": null,
  "subscriber_review_count": null,
  "featured_review_quote": null,
  "featured_review_author": null
}
```

---

## 3. Blog Posts (`/blog/[slug]`)

### Supabase Table: `content_blog_posts`

```sql
create table content_blog_posts (
  id uuid primary key default gen_random_uuid(),

  -- Routing
  slug text not null unique,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  published_at timestamptz,
  last_reviewed_at timestamptz,           -- for "Last Updated" display

  -- SEO
  meta_title text not null,
  meta_description text not null,
  og_image_url text,

  -- Classification
  funnel_stage text not null,             -- "bofu" | "mofu" | "tofu"
  content_type text not null,             -- "comparison" | "guide" | "how-to" | "faq" | "worth-it" | "case-study" | "pain-point" | "data-analysis" | "industry" | "glossary" | "use-case" | "regulatory" | "narrative"
  primary_keyword text not null,
  secondary_keywords text[],
  estimated_word_count integer,

  -- Content
  title text not null,
  subtitle text,
  intro text not null,                    -- 2–4 sentences. First 40–60 words = featured snippet target.
  body_mdx text not null,                 -- Full MDX content (see the rules below)
  table_of_contents jsonb,               -- Auto-generated or manually set
  -- Shape: [{ anchor: string, label: string, level: number }]

  -- For comparison posts
  comparison_subjects jsonb,
  -- Shape: { subject_a: string, subject_b: string, winner?: string, verdict: string }

  -- FAQs (embedded in post AND used for FAQPage schema)
  faqs jsonb,
  -- Shape: [{ question: string, answer: string }]

  -- CTAs (2–3 embedded CTAs in the body)
  ctas jsonb,
  -- Shape: [{ position: "intro"|"mid"|"outro", label: string, href: string, style: "primary"|"secondary" }]
  -- href must be a page that exists, e.g. "/product/xreal-air-pro", "/pricing", "/waitlist", "/quiz"

  -- Internal linking targets
  linked_job_slugs text[],               -- job pages this post links to
  linked_device_slugs text[],            -- catalog ids this post links to
  linked_blog_slugs text[],              -- other blog posts this links to
  cluster_pillar_slug text,              -- if this is a cluster support post, the pillar's slug

  -- Author
  author_name text default 'techloop editorial',
  author_bio text,

  -- Performance tracking (updated from GSC data)
  gsc_impressions_30d integer,
  gsc_clicks_30d integer,
  gsc_position_avg decimal(5,2),
  needs_refresh boolean default false     -- flag when GSC shows declining CTR
);

create index on content_blog_posts (slug) where published = true;
create index on content_blog_posts (funnel_stage, content_type) where published = true;
create index on content_blog_posts (cluster_pillar_slug) where published = true;
```

**Rules for `body_mdx`**

- Link only to pages that exist (see the list at the top). A device is `/product/<catalog id>`.
- Write no dollar amounts. When a post needs rent-versus-buy numbers, embed the calculator
  with `<RentVsBuyCalculator />`; it computes them from the pricing rule.
- Describe devices from the maker's published specs, and set `last_reviewed_at` so readers
  can see how fresh the information is.
- Use plain `## Heading` text with no `{#anchor-id}` syntax.

### TypeScript Interface

```typescript
export type FunnelStage = 'bofu' | 'mofu' | 'tofu';

export type BlogContentType = 
  | 'comparison'
  | 'guide'
  | 'how-to'
  | 'faq'
  | 'worth-it'
  | 'case-study'
  | 'pain-point'
  | 'data-analysis'
  | 'industry'
  | 'glossary'
  | 'use-case'
  | 'regulatory'
  | 'narrative';

export interface ToCEntry {
  anchor: string;         // e.g. "#xreal-vs-meta"
  label: string;          // e.g. "XREAL vs Meta Ray-Ban"
  level: number;          // 2 = H2, 3 = H3
}

export interface ComparisonSubjects {
  subject_a: string;
  subject_b: string;
  winner?: string;
  verdict: string;        // 1–2 sentence verdict
}

export interface BlogCTA {
  position: 'intro' | 'mid' | 'outro';
  label: string;          // e.g. "See the XREAL Air 2 Pro"
  href: string;           // e.g. "/product/xreal-air-pro"
  style: 'primary' | 'secondary';
}

export interface BlogPostContent {
  id: string;
  slug: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  published_at?: string;
  last_reviewed_at?: string;

  // SEO
  meta_title: string;
  meta_description: string;
  og_image_url?: string;

  // Classification
  funnel_stage: FunnelStage;
  content_type: BlogContentType;
  primary_keyword: string;
  secondary_keywords?: string[];
  estimated_word_count?: number;

  // Content
  title: string;
  subtitle?: string;
  intro: string;            // First 40–60 words target featured snippet
  body_mdx: string;
  table_of_contents?: ToCEntry[];
  faqs?: FAQ[];
  ctas?: BlogCTA[];

  // Comparison-specific
  comparison_subjects?: ComparisonSubjects;

  // Internal linking
  linked_job_slugs?: string[];
  linked_device_slugs?: string[];
  linked_blog_slugs?: string[];
  cluster_pillar_slug?: string;

  // Author
  author_name: string;
  author_bio?: string;

  // GSC performance (updated separately, not during content creation)
  gsc_impressions_30d?: number;
  gsc_clicks_30d?: number;
  gsc_position_avg?: number;
  needs_refresh?: boolean;
}
```

---

## 4. Shared / Supporting Tables

```sql
-- Tag taxonomy for filtering / related content
create table content_tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,       -- e.g. "smart-glasses", "blue-collar", "health"
  label text not null,             -- e.g. "Smart Glasses"
  tag_type text not null           -- "device-category" | "audience" | "topic"
);

-- Cross-content tagging
create table content_tag_assignments (
  content_type text not null,      -- "job_page" | "device_page" | "blog_post"
  content_id uuid not null,
  tag_slug text not null references content_tags(slug),
  primary key (content_type, content_id, tag_slug)
);
```

The site's sitemap is built in code (`src/app/sitemap.ts`), not from a database view.

---

## 5. Next.js Route Structure

```
app/
  for/
    [slug]/
      page.tsx          ← reads content_job_pages where slug = params.slug
  blog/
    [slug]/
      page.tsx          ← reads content_blog_posts where slug = params.slug
    page.tsx            ← blog index
  product/
    [id]/
      page.tsx          ← NOT database content: rendered from the catalog in src/lib/data.ts
```

There is no `/rent` route and no `/device` route. Device pages driven by
`content_device_pages` are a later phase (section 2).

### ISR Config (in each `page.tsx`)

```typescript
// Revalidate every 60 seconds — new content appears within 1 minute of publish
export const revalidate = 60;

// OR: use on-demand revalidation via Supabase webhook → Next.js revalidate API
// This is the better pattern at scale — page updates instantly on publish
```

### On-Demand Revalidation (Recommended)

`src/app/api/revalidate/route.ts` is the real implementation. A Supabase Database Webhook
posts `{ table, record }` to it whenever a row is published, with the
`x-revalidation-secret` header set to `REVALIDATION_SECRET`. It maps the table to a path:

```typescript
const CONTENT_TYPE_PATHS: Record<string, (slug: string) => string> = {
  content_job_pages: (slug) => `/for/${slug}`,
  content_blog_posts: (slug) => `/blog/${slug}`,
}
// content_device_pages is skipped: there is no public page for it yet.
```

**Publish in Supabase = page live in under 5 seconds.**

---

## 6. Zod Validation (for AI-generated content)

```typescript
// lib/schemas/job-page.ts
import { z } from 'zod';

export const PainPointSchema = z.object({
  title: z.string().min(5).max(80),
  body: z.string().min(50).max(400),
  icon: z.string().optional(),
});

export const JobPageSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  meta_title: z.string().max(60),
  meta_description: z.string().max(155),
  hero_headline: z.string().max(80),
  hero_subheadline: z.string().max(120),
  hero_cta_primary: z.string().max(40),
  hero_cta_secondary: z.string().max(60),
  job_title: z.string(),
  job_category: z.enum(['blue-collar', 'white-collar', 'life-context', 'enthusiast']),
  audience_description: z.string().min(50).max(300),
  pain_points: z.array(PainPointSchema).min(3).max(5),
  recommended_devices: z.array(z.object({
    device_slug: z.string(),
    reason: z.string().min(30).max(200),
    cta_label: z.string().max(50),
  })).min(1).max(3),
  how_it_works: z.array(z.object({
    step: z.number().min(1).max(3),
    title: z.string().max(60),
    body: z.string().min(50).max(300),
  })).length(3),
  objections: z.array(z.object({
    question: z.string().max(100),
    answer: z.string().min(80).max(500),
  })).min(2).max(4),
  faqs: z.array(z.object({
    question: z.string().max(100),
    answer: z.string().min(40).max(300),
  })).min(4).max(6),
});

export type JobPageInput = z.infer<typeof JobPageSchema>;
```

Zod only checks the shape of a row, not whether what it says is true. The content check is
`npm run audit:content -- --file page.json`, which uses the rules in
`src/lib/content-audit.ts`.

---

## 7. AI Content Generation Prompt Template

Use this as the system prompt when generating content with Claude or Antigravity:

```prompt
You are a content writer for techloop, a startup that plans to let people rent AI wearables
(smart glasses, rings, earbuds, watches) by the month, with part of what they pay counting
toward buying the device. techloop is still on a waitlist: nothing has launched and there are
no customers yet.

Generate a complete job landing page JSON object for the slug provided.
The JSON must validate against the JobPageSchema exactly.

FACTS YOU MAY USE
- People rent a device by the month, and part of what they pay counts toward buying it.
- A first device ships new and sealed. A renter can swap to a different device later.
- Devices come from a fixed catalog. The ONLY values allowed for device_slug are:
  meta-rayban, oura-ring, xreal-air-pro, rabbit-r1, brilliant-labs-frame, ultrahuman-ring-air
- Pages that exist, and the only ones you may link to or name: /pricing, /how-it-works,
  /rental-terms, /waitlist, /quiz, /browse, /product/<device_slug>, /blog/<slug>, /for/<slug>.

NEVER WRITE
- Any price, dollar amount, percentage of retail, discount, or number of months or days.
  The site works out prices and shows them itself. Say "see pricing" instead.
- Ratings, review counts, user counts, testimonials, customer quotes, or "trusted by" claims.
  Set every testimonial_* and stat_* field to null.
- "Risk-free", "no risk", "cancel anytime", "no penalty", "no commitment", "no questions
  asked", or anything like them. Do not describe cancellation, refund or return terms; send the
  reader to the rental terms.
- Delivery or shipping times, "in stock", "ships today", "most popular", or superlatives such
  as "best" and "top choice".
- Tax, legal, safety, medical or workplace-regulation advice or claims (deductions, OSHA,
  HIPAA, FDA). If the job raises a safety question, tell the reader to check with their
  employer and the device maker.
- Facts about a device that are not in its maker's published specs.
- Links to /rent/... or /device/... (those pages do not exist).

Key voice guidelines:
- Lowercase brand style: "techloop" not "Techloop"
- Dry, competent, direct — not corporate, not quirky
- Lead with the job-specific problem, not product features
- "Rent" not "try" — commercial framing throughout
- CTA always links to the device quiz or pricing
- Do not use {#anchor-id} syntax on headings. Use plain ## Heading text only.

Key SEO guidelines:
- meta_title: under 60 chars, include "AI Wearables for [Job]" and "| techloop"
- meta_description: under 155 chars, say what the reader gets; no price
- hero_headline: exact match or close variant of primary keyword
- FAQ answers: 40–60 words each (featured snippet targets)

Output ONLY valid JSON. No markdown, no explanation, no preamble.

Schema: [paste JobPageSchema here]

Generate content for slug: "{{SLUG}}"
Job title: "{{JOB_TITLE}}"  
Job category: "{{CATEGORY}}"
Primary keyword: "{{KEYWORD}}"
Recommended device slugs: ["{{DEVICE_1}}", "{{DEVICE_2}}"]
```

---

## 8. Publishing Workflow Summary

```
1. Generate the page JSON with the prompt above and save it to a file
2. Run: npm run audit:content -- --file page.json   (fix anything it lists, or regenerate)
3. Open Supabase table editor (or use a simple admin UI)
4. Insert new row with published = false
5. Paste the JSON into the appropriate jsonb fields
6. Review the content (2–5 min per page)
7. Set published = true
8. Supabase webhook fires → Next.js revalidates → page live in <5 seconds
9. Submit URL to Google Search Console for indexing
```

Total time per BOFU landing page (after templates are built): **15–20 minutes**.
Target cadence: **10 pages/week = 2 per day on weekdays**.
