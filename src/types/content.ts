// types/content.ts
// Mirrors the Supabase schema from techloop-content-schemas.md

export type JobCategory =
  | 'blue-collar'
  | 'white-collar'
  | 'life-context'
  | 'enthusiast'

export type DeviceCategory =
  | 'smart-glasses'
  | 'smart-ring'
  | 'ai-earbuds'
  | 'ai-watch'
  | 'ai-pin'
  | 'ai-card'
  | 'robotics'

export type FunnelStage = 'bofu' | 'mofu' | 'tofu'

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
  | 'narrative'

export interface FAQ {
  question: string
  answer: string
}

export interface PainPoint {
  title: string
  body: string
  icon?: string
}

export interface DeviceRecommendation {
  device_slug: string
  reason: string
  cta_label: string
}

export interface HowItWorksStep {
  step: number
  title: string
  body: string
}

export interface Objection {
  question: string
  answer: string
}

export interface JobPageContent {
  id: string
  slug: string
  published: boolean
  created_at: string
  updated_at: string

  meta_title: string
  meta_description: string
  og_image_url?: string

  hero_headline: string
  hero_subheadline: string
  hero_cta_primary: string
  hero_cta_secondary: string

  job_title: string
  job_category: JobCategory
  audience_description: string

  pain_points: PainPoint[]
  recommended_devices: DeviceRecommendation[]
  how_it_works: HowItWorksStep[]
  objections: Objection[]
  faqs: FAQ[]

  testimonial_quote?: string
  testimonial_name?: string
  testimonial_job_title?: string
  testimonial_company?: string

  related_job_slugs?: string[]
  related_blog_slugs?: string[]

  stat_users_count?: string
  stat_rating?: string
  stat_return_rate?: string
}

export interface DeviceSpec {
  label: string
  value: string
}

export interface DeviceFeature {
  title: string
  body: string
  icon?: string
}

export interface RentalIncludesItem {
  item: string
}

export interface DeviceVsLink {
  device_slug: string
  comparison_slug: string
}

export interface DevicePageContent {
  id: string
  slug: string
  published: boolean
  created_at: string
  updated_at: string

  meta_title: string
  meta_description: string
  og_image_url?: string

  device_name: string
  brand: string
  category: DeviceCategory
  tagline: string
  msrp_cents: number
  rental_price_cents: number

  hero_headline: string
  hero_subheadline: string
  image_url?: string
  image_alt?: string

  specs: DeviceSpec[]
  features: DeviceFeature[]
  rental_includes: RentalIncludesItem[]
  faqs: FAQ[]

  best_for_job_slugs: string[]
  best_for_labels: string[]
  vs_devices?: DeviceVsLink[]
  related_device_slugs?: string[]

  purchase_credit_months: number
  purchase_credit_total_cents: number

  subscriber_rating?: number
  subscriber_review_count?: number
  featured_review_quote?: string
  featured_review_author?: string
}

export interface ToCEntry {
  anchor: string
  label: string
  level: number
}

export interface ComparisonSubjects {
  subject_a: string
  subject_b: string
  winner?: string
  verdict: string
}

export interface BlogCTA {
  position: 'intro' | 'mid' | 'outro'
  label: string
  href: string
  style: 'primary' | 'secondary'
}

export interface BlogPostContent {
  id: string
  slug: string
  published: boolean
  created_at: string
  updated_at: string
  published_at?: string
  last_reviewed_at?: string

  meta_title: string
  meta_description: string
  og_image_url?: string

  funnel_stage: FunnelStage
  content_type: BlogContentType
  primary_keyword: string
  secondary_keywords?: string[]
  estimated_word_count?: number

  title: string
  subtitle?: string
  intro: string
  body_mdx: string
  table_of_contents?: ToCEntry[]
  faqs?: FAQ[]
  ctas?: BlogCTA[]

  comparison_subjects?: ComparisonSubjects

  linked_job_slugs?: string[]
  linked_device_slugs?: string[]
  linked_blog_slugs?: string[]
  cluster_pillar_slug?: string

  author_name: string
  author_bio?: string

  gsc_impressions_30d?: number
  gsc_clicks_30d?: number
  gsc_position_avg?: number
  needs_refresh?: boolean
}
