// app/blog/[slug]/page.tsx
// Fetches BlogPostContent from Supabase.
// Renders body_mdx via next-mdx-remote (install: npm i next-mdx-remote).
// Passes rendered output as children into BlogPostTemplate.

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getBlogPost, getAllBlogSlugs } from '@/lib/content'
import { BlogPostTemplate } from '@/components/content/BlogPostTemplate'
import RentVsBuyCalculator from '@/components/mdx/RentVsBuyCalculator'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const content = await getBlogPost(slug)
  if (!content) return {}

  return {
    title: content.meta_title,
    description: content.meta_description,
    openGraph: {
      title: content.meta_title,
      description: content.meta_description,
      images: content.og_image_url ? [content.og_image_url] : [],
      url: `https://trytechloop.com/blog/${content.slug}`,
      type: 'article',
      publishedTime: content.published_at,
      modifiedTime: content.last_reviewed_at ?? content.updated_at,
      authors: [content.author_name],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.meta_title,
      description: content.meta_description,
    },
    alternates: {
      canonical: `https://trytechloop.com/blog/${content.slug}`,
    },
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const content = await getBlogPost(slug)

  if (!content) notFound()

  // Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.title,
    description: content.intro,
    author: {
      '@type': 'Organization',
      name: content.author_name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'techloop',
      url: 'https://trytechloop.com',
    },
    datePublished: content.published_at,
    dateModified: content.last_reviewed_at ?? content.updated_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://trytechloop.com/blog/${content.slug}`,
    },
    image: content.og_image_url,
    keywords: [content.primary_keyword, ...(content.secondary_keywords ?? [])].join(', '),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'techloop', item: 'https://trytechloop.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://trytechloop.com/blog' },
      { '@type': 'ListItem', position: 3, name: content.title, item: `https://trytechloop.com/blog/${content.slug}` },
    ],
  }

  const processedMdx = content.body_mdx.replace(/\s*\{#([^}]+)\}/g, '<a id="$1"></a>')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/*
        BlogPostTemplate receives content for all the structured sections
        (header, TOC, CTAs, FAQs, related links).
        The MDX body is rendered inline via MDXRemote and passed as children.
      */}
      <BlogPostTemplate content={content}>
        <MDXRemote
          source={processedMdx}
          components={{ RentVsBuyCalculator }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm]
            }
          }}
        />
      </BlogPostTemplate>
    </>
  )
}
