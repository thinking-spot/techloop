// app/rent/[slug]/page.tsx
// Fetches DevicePageContent from Supabase, renders via DevicePageTemplate.

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDevicePage, getAllDevicePageSlugs, formatPrice, formatMonthly } from '@/lib/content'
import { DevicePageTemplate } from '@/components/content/DevicePageTemplate'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllDevicePageSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const content = await getDevicePage(params.slug)
  if (!content) return {}

  return {
    title: content.meta_title,
    description: content.meta_description,
    openGraph: {
      title: content.meta_title,
      description: content.meta_description,
      images: content.og_image_url
        ? [content.og_image_url]
        : content.image_url
        ? [content.image_url]
        : [],
      url: `https://trytechloop.com/rent/${content.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.meta_title,
      description: content.meta_description,
    },
    alternates: {
      canonical: `https://trytechloop.com/rent/${content.slug}`,
    },
  }
}

export default async function DevicePage({
  params,
}: {
  params: { slug: string }
}) {
  const content = await getDevicePage(params.slug)

  if (!content) notFound()

  // Product structured data — helps Google understand this is a rentable product
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: content.device_name,
    brand: { '@type': 'Brand', name: content.brand },
    description: content.meta_description,
    image: content.image_url ?? content.og_image_url,
    offers: {
      '@type': 'Offer',
      price: (content.rental_price_cents / 100).toFixed(2),
      priceCurrency: 'USD',
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      availability: 'https://schema.org/InStock',
      url: `https://trytechloop.com/rent/${content.slug}`,
      seller: { '@type': 'Organization', name: 'techloop' },
    },
    ...(content.subscriber_rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: content.subscriber_rating,
        ratingCount: content.subscriber_review_count ?? 1,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'techloop', item: 'https://trytechloop.com' },
      { '@type': 'ListItem', position: 2, name: 'Devices', item: 'https://trytechloop.com/rent' },
      { '@type': 'ListItem', position: 3, name: content.device_name, item: `https://trytechloop.com/rent/${content.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <DevicePageTemplate content={content} />
    </>
  )
}
