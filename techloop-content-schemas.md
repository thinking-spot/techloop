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
INSERT row into Supabase → Vercel ISR revalidates → page is live within seconds.
No deploy required after initial template is built.

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
  hero_subheadline text not null,        -- e.g. "Hands-free. Risk-free. Try before you buy."
  hero_cta_primary text not null,        -- e.g. "Take the Device Quiz"
  hero_cta_secondary text not null,      -- e.g. "See Pricing — from $48/month"

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
  -- device_slug references content_device_pages.slug

  -- How it works (job-framed, 3 steps)
  how_it_works jsonb not null,
  -- Shape: [{ step: number, title: string, body: string }]

  -- Objection handling (2–4)
  objections jsonb not null,
  -- Shape: [{ question: string, answer: string }]

  -- Social proof
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

  -- Stats/social proof numbers (optional, shown in trust bar)
  stat_users_count text,                -- e.g. "1,000+"
  stat_rating text,                     -- e.g. "4.8/5"
  stat_return_rate text,                -- e.g. "98% deposit returned"

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
  device_slug: string;  // references content_device_pages.slug
  reason: string;       // 1–2 sentences why this device fits this job
  cta_label: string;    // e.g. "Rent the XREAL Air 2 Pro"
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

  // Social proof
  testimonial_quote?: string;
  testimonial_name?: string;
  testimonial_job_title?: string;
  testimonial_company?: string;

  // Internal linking
  related_job_slugs?: string[];
  related_blog_slugs?: string[];

  // Trust bar
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
  "meta_title": "AI Wearables for Electricians — Try Before You Buy | techloop",
  "meta_description": "Rent smart glasses built for electrical work. Hands-free schematics, voice notes, job site comms. $48/mo. Cancel anytime.",
  "hero_headline": "AI Wearables for Electricians",
  "hero_subheadline": "Hands-free on the job. Try before you spend $400. Cancel anytime.",
  "hero_cta_primary": "Take the Device Quiz",
  "hero_cta_secondary": "See Pricing — from $48/month",
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
      "device_slug": "xreal-air-2-pro",
      "reason": "Lightweight AR glasses with a wide field of view — designed to be worn alongside safety equipment. Used by field technicians in utilities and industrial settings.",
      "cta_label": "Rent the XREAL Air 2 Pro"
    },
    {
      "device_slug": "meta-ray-ban",
      "reason": "Look completely normal on a job site. Built-in camera, voice assistant, and speakers. The most socially acceptable smart glasses available.",
      "cta_label": "Rent Meta Ray-Ban Smart Glasses"
    }
  ],
  "how_it_works": [
    {
      "step": 1,
      "title": "Pick the device that fits your job",
      "body": "Take our 60-second quiz or browse by device type. We'll match you to smart glasses that work with your helmet, safety requirements, and workflow."
    },
    {
      "step": 2,
      "title": "We ship it new, you try it on the job",
      "body": "Factory-sealed device arrives in 2–3 days. Use it on real jobs for at least 30 days. Most electricians know within the first week whether it belongs in their kit permanently."
    },
    {
      "step": 3,
      "title": "Keep it, swap it, or cancel",
      "body": "Love it? Apply your rental payments toward the purchase price. Not the right fit? Swap for a different device or cancel with no penalty. You're always in control."
    }
  ],
  "objections": [
    {
      "question": "Will smart glasses hold up on a job site?",
      "answer": "The XREAL Air 2 Pro and Meta Ray-Ban are both built for daily wear, not just desk use. They're not rated for extreme environments, which is why we let you try them first — you'll know within a week whether they fit your specific working conditions. If they don't survive your environment, swap for something else. No penalty."
    },
    {
      "question": "Are smart glasses legal and safe to wear while doing electrical work?",
      "answer": "Smart glasses are generally permitted on electrical job sites under current OSHA guidelines, provided they don't interfere with required PPE. Most models are compatible with standard safety glasses or can be worn alongside them. Always confirm with your site supervisor. We've written a full guide on workplace smart glasses policy."
    },
    {
      "question": "Is $48/month worth it for a tool I might not use every day?",
      "answer": "That's exactly the question techloop is built to answer. You don't commit to $400 upfront to find out. Try it for a month. If it saves you 30 minutes a week in documentation time alone, it's paid for itself. If it doesn't, cancel."
    }
  ],
  "faqs": [
    {
      "question": "What smart glasses work best for electricians?",
      "answer": "The XREAL Air 2 Pro and Meta Ray-Ban Smart Glasses are the top choices for electrical work. XREAL offers a wider AR display for schematics; Meta Ray-Ban looks more discreet on site and has better battery life for full-day wear."
    },
    {
      "question": "Can I use smart glasses with a hard hat?",
      "answer": "Meta Ray-Ban Smart Glasses fit under most standard hard hats. XREAL Air 2 Pro requires more clearance and works best in environments where a full hard hat isn't required. Try both — techloop lets you swap if the first choice doesn't fit your gear."
    },
    {
      "question": "Do AI wearables work without a phone?",
      "answer": "Most smart glasses connect to your phone via Bluetooth or USB-C and rely on it for data. The Meta Ray-Ban has some standalone functionality. For most field use cases, your phone stays in your pocket while the glasses do the display work."
    },
    {
      "question": "How long does the battery last on smart glasses?",
      "answer": "Meta Ray-Ban Smart Glasses last 4–6 hours of active use. XREAL Air 2 Pro draws power from the connected device. For full-day jobs, most electricians keep a USB-C power bank on their belt. We include charging guidance with every device."
    },
    {
      "question": "Can I expense or write off AI wearables for my business?",
      "answer": "Yes — tools used for business purposes are generally deductible. A techloop subscription used for work is a business expense. Consult your accountant, but most self-employed electricians and small electrical contractors expense it directly."
    }
  ],
  "related_job_slugs": ["hvac-technicians", "field-service-techs", "construction-managers"],
  "related_blog_slugs": ["smart-glasses-legal-at-work", "xreal-vs-meta-ray-ban", "smart-glasses-for-blue-collar-workers"],
  "stat_users_count": "1,000+",
  "stat_rating": "4.8/5",
  "stat_return_rate": "98% deposit returned"
}
```

---

## 2. Device Pages (`/rent/[slug]`)

### Supabase Table: `content_device_pages`

```sql
create table content_device_pages (
  id uuid primary key default gen_random_uuid(),

  -- Routing
  slug text not null unique,              -- e.g. "xreal-air-2-pro"
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
  msrp_cents integer not null,           -- retail price in cents (e.g. 39900 = $399)
  rental_price_cents integer not null,   -- monthly rental in cents (e.g. 4800 = $48)

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
  -- Shape: [{ item: string }] — what's in the box / included in rental

  -- Rent-to-own math
  purchase_credit_months integer default 3,  -- how many months of rental apply to purchase
  purchase_credit_total_cents integer,        -- calculated: rental_price_cents * purchase_credit_months

  -- Comparison
  vs_devices jsonb,
  -- Shape: [{ device_slug: string, comparison_slug: string }]
  -- Links to /blog/[comparison_slug] for the vs post

  -- FAQs (device-specific)
  faqs jsonb not null,
  -- Shape: [{ question: string, answer: string }]

  -- Social proof
  subscriber_rating decimal(3,2),        -- e.g. 4.7
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
  item: string;           // e.g. "Factory-sealed device", "USB-C charging cable"
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

  // Social proof
  subscriber_rating?: number;
  subscriber_review_count?: number;
  featured_review_quote?: string;
  featured_review_author?: string;
}
```

### Example JSON

```json
{
  "slug": "xreal-air-2-pro",
  "published": true,
  "meta_title": "Rent XREAL Air 2 Pro Smart Glasses — Try Before You Buy | techloop",
  "meta_description": "Rent the XREAL Air 2 Pro for $48/month. Factory new. Cancel anytime. Apply payments toward the $399 purchase price.",
  "device_name": "XREAL Air 2 Pro",
  "brand": "XREAL",
  "category": "smart-glasses",
  "tagline": "The AR glasses built for serious daily use.",
  "msrp_cents": 39900,
  "rental_price_cents": 4800,
  "hero_headline": "Rent the XREAL Air 2 Pro — Try Before You Spend $399",
  "hero_subheadline": "$48/month. Factory sealed. Cancel anytime. Apply your payments toward the purchase price.",
  "specs": [
    { "label": "Display", "value": "Micro-OLED, 46° FoV" },
    { "label": "Resolution", "value": "1080p per eye" },
    { "label": "Weight", "value": "72g" },
    { "label": "Connection", "value": "USB-C (phone or laptop)" },
    { "label": "Compatibility", "value": "iOS, Android, Mac, Windows, Steam Deck" },
    { "label": "Battery", "value": "Powered by connected device" },
    { "label": "Audio", "value": "Spatial audio speakers" },
    { "label": "Retail Price", "value": "$399" }
  ],
  "features": [
    {
      "title": "A 201-inch screen that goes anywhere",
      "body": "The Micro-OLED display creates a virtual 201-inch display floating in your field of view. Work, watch, or reference materials without a monitor.",
      "icon": "Monitor"
    },
    {
      "title": "Works with what you already own",
      "body": "Plugs into any USB-C device — phone, MacBook, Steam Deck, or Windows laptop. No proprietary dongles, no app lock-in.",
      "icon": "Cable"
    },
    {
      "title": "Comfortable for hours, not minutes",
      "body": "At 72g, the Air 2 Pro is lighter than most sunglasses. Electrochromic lenses adjust darkness so it works indoors and out.",
      "icon": "Sun"
    }
  ],
  "rental_includes": [
    { "item": "Factory-sealed XREAL Air 2 Pro" },
    { "item": "USB-C adapter for your device type" },
    { "item": "Protective carrying case" },
    { "item": "techloop setup guide for first-day use" }
  ],
  "best_for_job_slugs": ["electricians", "remote-workers", "software-engineers", "consultants"],
  "best_for_labels": ["Electricians", "Remote Workers", "Software Engineers", "Consultants"],
  "vs_devices": [
    { "device_slug": "meta-ray-ban", "comparison_slug": "xreal-vs-meta-ray-ban" }
  ],
  "related_device_slugs": ["meta-ray-ban", "brilliant-labs-frame"],
  "purchase_credit_months": 3,
  "purchase_credit_total_cents": 14400,
  "faqs": [
    {
      "question": "Does the XREAL Air 2 Pro work with my iPhone?",
      "answer": "Yes, with a USB-C to Lightning or USB-C to USB-C adapter depending on your iPhone model. iPhone 15 and later connect directly. techloop includes the right adapter for your device."
    },
    {
      "question": "What's included in the techloop XREAL rental?",
      "answer": "You receive a factory-sealed XREAL Air 2 Pro, the correct USB-C adapter for your primary device, the original carrying case, and a techloop setup guide. Everything arrives ready to use."
    },
    {
      "question": "Can I apply my rental payments toward buying the XREAL Air 2 Pro?",
      "answer": "Yes. techloop applies up to 3 months of rental payments ($144) as credit toward the $399 purchase price. If you decide to buy, you pay $255 and it's yours."
    }
  ],
  "subscriber_rating": 4.7,
  "subscriber_review_count": 84,
  "featured_review_quote": "Tried it for two weeks before committing. Used my rental credit to buy it. Best $255 I've spent on gear.",
  "featured_review_author": "Marcus T., Software Engineer"
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
  body_mdx text not null,                 -- Full MDX content
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

  -- Internal linking targets
  linked_job_slugs text[],               -- job pages this post links to
  linked_device_slugs text[],            -- device pages this post links to
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
  label: string;          // e.g. "Rent the XREAL Air 2 Pro"
  href: string;           // e.g. "/rent/xreal-air-2-pro"
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

-- Sitemap helper view
create view published_content_sitemap as
  select 'job' as content_type, slug, updated_at from content_job_pages where published = true
  union all
  select 'device', slug, updated_at from content_device_pages where published = true
  union all
  select 'blog', slug, updated_at from content_blog_posts where published = true;
```

---

## 5. Next.js Route Structure

```
app/
  for/
    [slug]/
      page.tsx          ← reads content_job_pages where slug = params.slug
  rent/
    [slug]/
      page.tsx          ← reads content_device_pages where slug = params.slug
  blog/
    [slug]/
      page.tsx          ← reads content_blog_posts where slug = params.slug
  for/
    page.tsx            ← index of all job pages (optional sitemap/browse)
  rent/
    page.tsx            ← browse all devices
  blog/
    page.tsx            ← blog index with filtering by funnel_stage + content_type
```

### ISR Config (in each `page.tsx`)

```typescript
// Revalidate every 60 seconds — new content appears within 1 minute of publish
export const revalidate = 60;

// OR: use on-demand revalidation via Supabase webhook → Next.js revalidate API
// This is the better pattern at scale — page updates instantly on publish
```

### On-Demand Revalidation (Recommended)

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidation-secret');
  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { content_type, slug } = await req.json();
  
  const pathMap: Record<string, string> = {
    job_page: `/for/${slug}`,
    device_page: `/rent/${slug}`,
    blog_post: `/blog/${slug}`,
  };
  
  const path = pathMap[content_type];
  if (path) revalidatePath(path);
  
  return Response.json({ revalidated: true, path });
}
```

Set up a Supabase Database Webhook → POST to this endpoint whenever a row's `published` field is set to `true`. **Publish in Supabase = page live in under 5 seconds.**

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

---

## 7. AI Content Generation Prompt Template

Use this as the system prompt when generating content with Claude or Antigravity:

```
You are a content writer for techloop, a subscription service that lets people 
rent AI wearables (smart glasses, rings, earbuds, watches) for ~15% of MSRP per month, 
with the option to apply rental payments toward purchase.

Generate a complete job landing page JSON object for the slug provided. 
The JSON must validate against the JobPageSchema exactly.

Key voice guidelines:
- Lowercase brand style: "techloop" not "Techloop"  
- Dry, competent, direct — not corporate, not quirky
- Lead with the job-specific problem, not product features
- "Rent" not "try" — commercial framing throughout
- CTA always links to the device quiz or pricing
- Do not use {#anchor-id} syntax on headings. Use plain ## Heading text only.

Key SEO guidelines:
- meta_title: under 60 chars, include "AI Wearables for [Job]" and "| techloop"
- meta_description: under 155 chars, include rental price and cancel-anytime
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
1. Open Supabase table editor (or use a simple admin UI)
2. Insert new row with published = false
3. Paste AI-generated JSON into the appropriate jsonb fields
4. Review the content (2–5 min per page)
5. Set published = true
6. Supabase webhook fires → Next.js revalidates → page live in <5 seconds
7. Submit URL to Google Search Console for indexing
```

Total time per BOFU landing page (after templates are built): **15–20 minutes**.
Target cadence: **10 pages/week = 2 per day on weekdays**.
