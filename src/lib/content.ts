// lib/content.ts
// Supabase fetch helpers for all content types.
// These run server-side (Next.js Server Components / generateStaticParams).

import { createClient } from '@supabase/supabase-js'
import type {
  JobPageContent,
  DevicePageContent,
  BlogPostContent,
} from '@/types/content'

// Use the service-role key server-side (never expose to client)
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// ─── Job Pages ────────────────────────────────────────────────────────────────

export async function getJobPage(slug: string): Promise<JobPageContent | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('content_job_pages')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !data) return null
  return data as JobPageContent
}

export async function getAllJobPageSlugs(): Promise<string[]> {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('content_job_pages')
    .select('slug')
    .eq('published', true)

  return (data ?? []).map((row) => row.slug)
}

export async function getAllJobPageRoutes(): Promise<{ slug: string; updated_at: string }[]> {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('content_job_pages')
    .select('slug, updated_at')
    .eq('published', true)

  return (data ?? []).map((row) => ({
    slug: row.slug,
    updated_at: row.updated_at,
  }))
}

export async function getRelatedJobPages(
  slugs: string[]
): Promise<Pick<JobPageContent, 'slug' | 'job_title' | 'hero_subheadline'>[]> {
  if (!slugs.length) return []
  const supabase = getSupabase()
  const { data } = await supabase
    .from('content_job_pages')
    .select('slug, job_title, hero_subheadline')
    .in('slug', slugs)
    .eq('published', true)

  return data ?? []
}

// ─── Device Pages ─────────────────────────────────────────────────────────────

export async function getDevicePage(
  slug: string
): Promise<DevicePageContent | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('content_device_pages')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !data) return null
  return data as DevicePageContent
}

export async function getAllDevicePageSlugs(): Promise<string[]> {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('content_device_pages')
    .select('slug')
    .eq('published', true)

  return (data ?? []).map((row) => row.slug)
}

export async function getAllDevicePageRoutes(): Promise<{ slug: string; updated_at: string }[]> {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('content_device_pages')
    .select('slug, updated_at')
    .eq('published', true)

  return (data ?? []).map((row) => ({
    slug: row.slug,
    updated_at: row.updated_at,
  }))
}

export async function getDevicesByCategory(
  category: string
): Promise<
  Pick<
    DevicePageContent,
    | 'slug'
    | 'device_name'
    | 'brand'
    | 'tagline'
    | 'rental_price_cents'
    | 'msrp_cents'
    | 'image_url'
    | 'image_alt'
  >[]
> {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('content_device_pages')
    .select(
      'slug, device_name, brand, tagline, rental_price_cents, msrp_cents, image_url, image_alt'
    )
    .eq('category', category)
    .eq('published', true)

  return data ?? []
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export async function getBlogPost(
  slug: string
): Promise<BlogPostContent | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('content_blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !data) return null
  return data as BlogPostContent
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('content_blog_posts')
    .select('slug')
    .eq('published', true)

  return (data ?? []).map((row) => row.slug)
}

export async function getAllBlogRoutes(): Promise<{ slug: string; updated_at: string }[]> {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('content_blog_posts')
    .select('slug, updated_at')
    .eq('published', true)

  return (data ?? []).map((row) => ({
    slug: row.slug,
    updated_at: row.updated_at,
  }))
}

export async function getBlogPostsByType(
  contentType: string,
  limit = 6
): Promise<
  Pick<BlogPostContent, 'slug' | 'title' | 'intro' | 'content_type' | 'published_at'>[]
> {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('content_blog_posts')
    .select('slug, title, intro, content_type, published_at')
    .eq('content_type', contentType)
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  return data ?? []
}

// ─── Utilities ────────────────────────────────────────────────────────────────

/** Format cents to display string: 4200 → "$42" */
export function formatPrice(cents: number, decimals = false): string {
  const dollars = cents / 100
  return decimals
    ? `$${dollars.toFixed(2)}`
    : `$${Math.round(dollars)}`
}

/** Format cents to monthly string: 4200 → "$42/mo" */
export function formatMonthly(cents: number): string {
  return `${formatPrice(cents)}/mo`
}
