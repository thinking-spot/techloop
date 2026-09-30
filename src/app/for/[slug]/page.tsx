// app/for/[slug]/page.tsx
// Fetches JobPageContent from Supabase, renders via JobPageTemplate.
// generateStaticParams pre-builds all published pages at deploy time.
// revalidate = 60 handles any new pages between deploys.

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getJobPage, getAllJobPageSlugs } from '@/lib/content'
import { JobPageTemplate, type DeviceInfo } from '@/components/content/JobPageTemplate'
import { devices } from '@/lib/data'
import { monthlyRate } from '@/lib/pricing'
import { stripCustomerProof } from '@/lib/customer-proof'

// ─── ISR config ───────────────────────────────────────────────────────────────
// Re-check Supabase every 60s. Combined with on-demand revalidation webhook,
// new pages published in Supabase go live in <5 seconds.
export const revalidate = 60

// ─── Static generation ────────────────────────────────────────────────────────
// Pre-builds all published job pages at deploy time.
// dynamicParams = true allows new slugs to be rendered on first request.
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllJobPageSlugs()
  return slugs.map((slug) => ({ slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const content = await getJobPage(slug)
  if (!content) return {}

  return {
    title: content.meta_title,
    description: content.meta_description,
    openGraph: {
      title: content.meta_title,
      description: content.meta_description,
      images: content.og_image_url ? [content.og_image_url] : [],
      url: `https://trytechloop.com/for/${content.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.meta_title,
      description: content.meta_description,
    },
    alternates: {
      canonical: `https://trytechloop.com/for/${content.slug}`,
    },
  }
}

// ─── Page component ───────────────────────────────────────────────────────────
export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const found = await getJobPage(slug)

  if (!found) notFound()

  // Placeholder testimonials and stats must not reach the browser at all.
  const content = stripCustomerProof(found)

  // Catalog details for the devices this page recommends, so the cards can
  // show a name and price and link to a real product page.
  const deviceInfo: Record<string, DeviceInfo> = {}
  for (const rec of content.recommended_devices) {
    const device = devices.find((d) => d.id === rec.device_slug)
    if (device?.msrp) {
      deviceInfo[device.id] = {
        name: device.name,
        monthlyRate: monthlyRate(device.msrp),
        msrp: device.msrp,
      }
    }
  }

  // BreadcrumbList structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'techloop', item: 'https://trytechloop.com' },
      { '@type': 'ListItem', position: 2, name: content.job_title, item: `https://trytechloop.com/for/${content.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <JobPageTemplate content={content} deviceInfo={deviceInfo} />
    </>
  )
}
