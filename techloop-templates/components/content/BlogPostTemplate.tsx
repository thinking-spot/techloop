'use client'

// components/content/BlogPostTemplate.tsx
// Renders /blog/[slug] pages from BlogPostContent schema.
// Handles all content_type variants with appropriate layout shifts.
// MDX body is rendered by the page.tsx via next-mdx-remote or similar.

import Link from 'next/link'
import { useState } from 'react'
import type { BlogPostContent } from '@/types/content'

interface Props {
  content: BlogPostContent
  // The rendered MDX is passed as children from the page component
  // (handled by next-mdx-remote or @next/mdx in page.tsx)
  children: React.ReactNode
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-500 mb-2">
      {children}
    </p>
  )
}

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Funnel stage + content type badges ──────────────────────────────────────

const stageBadgeStyles: Record<string, string> = {
  bofu: 'bg-[#0A1F44] text-cyan-400 border border-cyan-400/30',
  mofu: 'bg-slate-100 text-slate-700 border border-slate-200',
  tofu: 'bg-slate-100 text-slate-500 border border-slate-200',
}

const typeLabels: Record<string, string> = {
  comparison: 'Comparison',
  guide: 'Guide',
  'how-to': 'How-To',
  faq: 'FAQ',
  'worth-it': 'Worth It?',
  'case-study': 'Case Study',
  'pain-point': 'Real Talk',
  'data-analysis': 'Data',
  industry: 'Industry',
  glossary: 'Glossary',
  'use-case': 'Use Case',
  regulatory: 'Policy & Law',
  narrative: 'Story',
}

// ─── Section: Article Header ──────────────────────────────────────────────────

function ArticleHeader({ content }: { content: BlogPostContent }) {
  const publishDate = content.published_at
    ? new Date(content.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  const reviewDate = content.last_reviewed_at
    ? new Date(content.last_reviewed_at).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <header className="bg-[#0A1F44] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#00D4FF 1px, transparent 1px), linear-gradient(90deg, #00D4FF 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-cyan-400" />

      <div className="relative max-w-4xl mx-auto px-6 py-16 lg:py-20">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">techloop</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-white transition-colors">blog</Link>
          <span>/</span>
          <span className="text-white truncate max-w-[200px]">{content.slug}</span>
        </nav>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${stageBadgeStyles[content.funnel_stage]}`}>
            {content.funnel_stage.toUpperCase()}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {typeLabels[content.content_type] ?? content.content_type}
          </span>
        </div>

        <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4">
          {content.title}
        </h1>

        {content.subtitle && (
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            {content.subtitle}
          </p>
        )}

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 border-t border-white/10 pt-6">
          <span>{content.author_name}</span>
          {publishDate && (
            <>
              <span className="text-slate-600">·</span>
              <span>Published {publishDate}</span>
            </>
          )}
          {reviewDate && (
            <>
              <span className="text-slate-600">·</span>
              <span className="text-cyan-400">Updated {reviewDate}</span>
            </>
          )}
          {content.estimated_word_count && (
            <>
              <span className="text-slate-600">·</span>
              <span>
                {Math.ceil(content.estimated_word_count / 200)} min read
              </span>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

// ─── Section: Featured Snippet Intro ─────────────────────────────────────────
// The first 40–60 words of `intro` target the Google featured snippet.
// It's rendered separately from the body, above the fold, in a callout.

function FeaturedSnippet({ content }: { content: BlogPostContent }) {
  return (
    <div className="max-w-4xl mx-auto px-6 mt-10">
      <div className="border-l-4 border-cyan-400 pl-6 py-2 bg-cyan-50 rounded-r-lg">
        <p className="text-base text-slate-700 leading-relaxed font-medium">
          {content.intro}
        </p>
      </div>
    </div>
  )
}

// ─── Section: Table of Contents ───────────────────────────────────────────────

function TableOfContents({ content }: { content: BlogPostContent }) {
  const [open, setOpen] = useState(true)
  if (!content.table_of_contents?.length) return null

  return (
    <div className="max-w-4xl mx-auto px-6 mt-8">
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <span className="text-sm font-semibold text-slate-900">
            Contents
          </span>
          <ChevronIcon open={open} />
        </button>

        {open && (
          <nav className="px-5 py-4 space-y-2">
            {content.table_of_contents.map((entry) => (
              <a
                key={entry.anchor}
                href={entry.anchor}
                className={`block text-sm text-slate-600 hover:text-cyan-600 transition-colors ${
                  entry.level === 3 ? 'pl-4' : ''
                }`}
              >
                {entry.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </div>
  )
}

// ─── Section: Comparison Verdict (comparison posts only) ─────────────────────

function ComparisonVerdict({ content }: { content: BlogPostContent }) {
  if (!content.comparison_subjects) return null
  const { subject_a, subject_b, winner, verdict } = content.comparison_subjects

  return (
    <div className="max-w-4xl mx-auto px-6 mt-8">
      <div className="bg-[#0A1F44] rounded-xl p-6 text-white">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-cyan-400 mb-3">
          Quick verdict
        </p>
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <span className="text-lg font-bold">{subject_a}</span>
          <span className="text-slate-500 text-sm">vs</span>
          <span className="text-lg font-bold">{subject_b}</span>
          {winner && (
            <>
              <span className="text-slate-500 text-sm">→</span>
              <span className="text-cyan-400 font-bold">{winner} wins</span>
            </>
          )}
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">{verdict}</p>
        <p className="mt-4 text-xs text-slate-500">
          Don't commit to either — techloop lets you try both.{' '}
          <Link href="/quiz" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Take the device quiz →
          </Link>
        </p>
      </div>
    </div>
  )
}

// ─── Section: Inline CTA (intro position) ────────────────────────────────────

function IntroCTA({ content }: { content: BlogPostContent }) {
  const cta = content.ctas?.find((c) => c.position === 'intro')
  if (!cta) return null

  return (
    <div className="max-w-4xl mx-auto px-6 mt-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50 border border-slate-200 rounded-lg p-5">
        <p className="text-sm text-slate-600 flex-1">
          Want to try instead of read? techloop ships new devices to your door.
        </p>
        <Link
          href={cta.href}
          className={`flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded transition-colors whitespace-nowrap ${
            cta.style === 'primary'
              ? 'bg-[#0A1F44] hover:bg-[#0d2654] text-white'
              : 'border border-slate-300 hover:border-slate-400 text-slate-700'
          }`}
        >
          {cta.label}
          <ArrowIcon />
        </Link>
      </div>
    </div>
  )
}

// ─── Section: MDX Body ────────────────────────────────────────────────────────
// Styled via Tailwind Typography prose classes.
// Assumes @tailwindcss/typography is installed.

function ArticleBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-6 mt-10">
      <div
        className="
          prose prose-slate max-w-none
          prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-slate-600 prose-p:leading-relaxed
          prose-a:text-cyan-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-900 prose-strong:font-semibold
          prose-code:text-cyan-700 prose-code:bg-cyan-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          prose-blockquote:border-l-cyan-400 prose-blockquote:text-slate-600
          prose-table:text-sm
          prose-th:bg-slate-100 prose-th:text-slate-700 prose-th:font-semibold
          prose-td:text-slate-600
          prose-li:text-slate-600
          prose-img:rounded-lg prose-img:shadow-md
        "
      >
        {children}
      </div>
    </div>
  )
}

// ─── Section: Mid-article CTA ─────────────────────────────────────────────────

function MidCTA({ content }: { content: BlogPostContent }) {
  const cta = content.ctas?.find((c) => c.position === 'mid')
  if (!cta) return null

  return (
    <div className="max-w-4xl mx-auto px-6 my-12">
      <div className="bg-gradient-to-r from-[#0A1F44] to-[#0d2654] rounded-xl p-8 text-center">
        <p className="text-white font-bold text-lg mb-2">
          Try before you spend $400.
        </p>
        <p className="text-slate-400 text-sm mb-6">
          techloop ships new AI wearables from $48/month. Cancel anytime.
        </p>
        <Link
          href={cta.href}
          className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-[#0A1F44] font-bold text-sm px-8 py-3.5 rounded transition-colors"
        >
          {cta.label}
          <ArrowIcon />
        </Link>
      </div>
    </div>
  )
}

// ─── Section: FAQ (from schema) ───────────────────────────────────────────────

function FAQSection({ content }: { content: BlogPostContent }) {
  const [open, setOpen] = useState<number | null>(null)
  if (!content.faqs?.length) return null

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-12 border-t border-slate-200 mt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SectionLabel>faq</SectionLabel>
      <h2 className="text-2xl font-bold text-slate-900 mb-8">
        Frequently asked questions
      </h2>

      <div className="space-y-2">
        {content.faqs.map((faq, i) => (
          <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
              aria-expanded={open === i}
            >
              <span className="font-semibold text-slate-900 text-sm pr-4">
                {faq.question}
              </span>
              <ChevronIcon open={open === i} />
            </button>
            {open === i && (
              <div className="px-6 pb-6 pt-1">
                <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Section: Related Job Links ───────────────────────────────────────────────

function RelatedJobLinks({ content }: { content: BlogPostContent }) {
  if (!content.linked_job_slugs?.length) return null

  return (
    <section className="max-w-4xl mx-auto px-6 py-8 border-t border-slate-200">
      <p className="text-sm font-semibold text-slate-700 mb-4">
        Relevant for:
      </p>
      <div className="flex flex-wrap gap-3">
        {content.linked_job_slugs.map((slug) => (
          <Link
            key={slug}
            href={`/for/${slug}`}
            className="inline-flex items-center gap-2 border border-slate-200 hover:border-cyan-400/50 hover:bg-slate-50 rounded-full px-4 py-2 text-sm text-slate-700 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            {slug.replace(/-/g, ' ')}
          </Link>
        ))}
      </div>
    </section>
  )
}

// ─── Section: Bottom CTA ──────────────────────────────────────────────────────

function BottomCTA({ content }: { content: BlogPostContent }) {
  const cta = content.ctas?.find((c) => c.position === 'outro')

  return (
    <section className="bg-[#0A1F44] mt-16">
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400 mb-5">
          try before you buy
        </p>
        <h2 className="text-3xl font-bold text-white mb-3">
          Done reading. Ready to try?
        </h2>
        <p className="text-slate-400 mb-8">
          New devices from $48/month. Cancel anytime. Apply payments toward purchase.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={cta?.href ?? '/quiz'}
            className="inline-flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-[#0A1F44] font-bold text-sm px-10 py-4 rounded transition-colors"
          >
            {cta?.label ?? 'Take the Device Quiz'}
            <ArrowIcon />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-400 text-white font-semibold text-sm px-10 py-4 rounded transition-colors"
          >
            See pricing
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function BlogPostTemplate({ content, children }: Props) {
  return (
    <main>
      <ArticleHeader content={content} />
      <FeaturedSnippet content={content} />
      <ComparisonVerdict content={content} />
      <TableOfContents content={content} />
      <IntroCTA content={content} />
      <ArticleBody>{children}</ArticleBody>
      <MidCTA content={content} />
      <FAQSection content={content} />
      <RelatedJobLinks content={content} />
      <BottomCTA content={content} />
    </main>
  )
}
