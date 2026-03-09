'use client'

// components/content/JobPageTemplate.tsx
// Renders /for/[slug] pages from JobPageContent schema.
// Design: industrial-precise. Dark hero, clean content grid, cyan accents.
// Every section links back toward conversion (quiz or pricing).

import Link from 'next/link'
import { useState } from 'react'
import type { JobPageContent } from '@/types/content'

interface Props {
  content: JobPageContent
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function CyanDot() {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 flex-shrink-0 mt-2"
      aria-hidden="true"
    />
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400 mb-3">
      {children}
    </p>
  )
}

function Divider() {
  return <hr className="border-slate-800 my-16" />
}

// ─── Section: Hero ────────────────────────────────────────────────────────────

function Hero({ content }: { content: JobPageContent }) {
  return (
    <section className="relative bg-[#0A1F44] overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#00D4FF 1px, transparent 1px), linear-gradient(90deg, #00D4FF 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Cyan accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-cyan-400" />

      <div className="relative max-w-6xl mx-auto px-6 py-24 lg:py-32">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            techloop
          </Link>
          <span>/</span>
          <span className="text-white">{content.job_title}</span>
        </nav>

        <div className="max-w-3xl">
          {/* Category badge */}
          <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-cyan-400 border border-cyan-400/30 rounded px-3 py-1 mb-6">
            {content.job_category === 'blue-collar'
              ? 'Trades & Field Work'
              : content.job_category === 'white-collar'
              ? 'Knowledge Work'
              : content.job_category === 'enthusiast'
              ? 'Early Adopter'
              : 'Life & Wellness'}
          </span>

          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            {content.hero_headline}
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">
            {content.hero_subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-[#0A1F44] font-semibold text-sm px-8 py-4 rounded transition-colors"
            >
              {content.hero_cta_primary}
              <ArrowIcon />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-slate-600 hover:border-slate-400 text-white font-semibold text-sm px-8 py-4 rounded transition-colors"
            >
              {content.hero_cta_secondary}
            </Link>
          </div>
        </div>

        {/* Trust bar */}
        {(content.stat_users_count || content.stat_rating || content.stat_return_rate) && (
          <div className="mt-16 pt-8 border-t border-slate-800 flex flex-wrap gap-8">
            {content.stat_users_count && (
              <Stat value={content.stat_users_count} label="subscribers" />
            )}
            {content.stat_rating && (
              <Stat value={content.stat_rating} label="avg rating" />
            )}
            {content.stat_return_rate && (
              <Stat value={content.stat_return_rate} label="deposit returned" />
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  )
}

// ─── Section: Pain Points ─────────────────────────────────────────────────────

function PainPoints({ content }: { content: JobPageContent }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <SectionLabel>Why it matters for {content.job_title}s</SectionLabel>
      <h2 className="text-3xl font-bold text-slate-900 mb-12">
        The problems AI wearables solve on the job
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {content.pain_points.map((pt, i) => (
          <div
            key={i}
            className="border border-slate-200 rounded-lg p-6 hover:border-cyan-400/50 transition-colors group"
          >
            {/* Number accent */}
            <div className="w-8 h-8 rounded bg-cyan-400/10 text-cyan-600 text-sm font-bold flex items-center justify-center mb-4 group-hover:bg-cyan-400/20 transition-colors">
              {String(i + 1).padStart(2, '0')}
            </div>
            <h3 className="font-semibold text-slate-900 mb-3 leading-tight">
              {pt.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">{pt.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Section: Device Recommendations ─────────────────────────────────────────

function DeviceRecommendations({ content }: { content: JobPageContent }) {
  return (
    <section className="bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <SectionLabel>devices for {content.job_title}s</SectionLabel>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          What we recommend
        </h2>
        <p className="text-slate-500 mb-10 max-w-2xl">
          {content.audience_description}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {content.recommended_devices.map((device, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col gap-4"
            >
              {/* Device number + slug */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-slate-400">
                  Option {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-xs font-mono text-slate-400 bg-slate-100 rounded px-2 py-0.5">
                  /rent/{device.device_slug}
                </span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {device.reason}
              </p>

              <Link
                href={`/rent/${device.device_slug}`}
                className="mt-auto inline-flex items-center gap-2 bg-[#0A1F44] hover:bg-[#0d2654] text-white text-sm font-semibold px-5 py-3 rounded transition-colors"
              >
                {device.cta_label}
                <ArrowIcon />
              </Link>
            </div>
          ))}
        </div>

        {/* Quiz bridge */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 mb-3">
            Not sure which device is right for your specific setup?
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold text-sm transition-colors"
          >
            Take the 60-second device quiz
            <ArrowIcon className="text-cyan-600" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Section: How It Works ────────────────────────────────────────────────────

function HowItWorks({ content }: { content: JobPageContent }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <SectionLabel>the process</SectionLabel>
      <h2 className="text-3xl font-bold text-slate-900 mb-12">
        How techloop works
      </h2>

      <div className="grid md:grid-cols-3 gap-0">
        {content.how_it_works.map((step, i) => (
          <div key={i} className="relative flex gap-4">
            {/* Connector line between steps */}
            {i < content.how_it_works.length - 1 && (
              <div className="hidden md:block absolute top-5 left-[calc(2rem+1px)] right-0 h-[2px] bg-slate-200 -z-0" />
            )}

            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0A1F44] text-white text-sm font-bold flex items-center justify-center z-10 relative">
              {step.step}
            </div>

            <div className="pb-8 pr-8">
              <h3 className="font-semibold text-slate-900 mb-2 mt-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Section: Testimonial ─────────────────────────────────────────────────────

function Testimonial({ content }: { content: JobPageContent }) {
  if (!content.testimonial_quote) return null

  return (
    <section className="bg-[#0A1F44]">
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="text-cyan-400 text-6xl font-serif leading-none mb-6 opacity-40">
          "
        </div>
        <blockquote className="text-xl lg:text-2xl text-white font-medium leading-relaxed mb-8">
          {content.testimonial_quote}
        </blockquote>
        <div className="text-slate-400 text-sm">
          <span className="text-white font-semibold">
            {content.testimonial_name}
          </span>
          {content.testimonial_job_title && (
            <span> · {content.testimonial_job_title}</span>
          )}
          {content.testimonial_company && (
            <span> · {content.testimonial_company}</span>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Section: Objection Handling ─────────────────────────────────────────────

function Objections({ content }: { content: JobPageContent }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <SectionLabel>common questions</SectionLabel>
      <h2 className="text-3xl font-bold text-slate-900 mb-10">
        Real concerns, straight answers
      </h2>

      <div className="space-y-2">
        {content.objections.map((obj, i) => (
          <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
              aria-expanded={open === i}
            >
              <span className="font-semibold text-slate-900 text-sm pr-4">
                {obj.question}
              </span>
              <ChevronIcon open={open === i} />
            </button>

            {open === i && (
              <div className="px-6 pb-6 pt-1">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {obj.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Section: FAQ (with schema markup) ───────────────────────────────────────

function FAQSection({ content }: { content: JobPageContent }) {
  const [open, setOpen] = useState<number | null>(null)

  // FAQPage structured data
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
    <section className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <SectionLabel>faq</SectionLabel>
        <h2 className="text-3xl font-bold text-slate-900 mb-10">
          Frequently asked questions
        </h2>

        <div className="space-y-2">
          {content.faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
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
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section: Mid-page CTA ────────────────────────────────────────────────────

function MidCTA({ content }: { content: JobPageContent }) {
  return (
    <section className="border-y border-cyan-400/20 bg-gradient-to-r from-[#0A1F44] to-[#0d2654]">
      <div className="max-w-4xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="text-white font-bold text-xl mb-2">
            Try the right device for your job — before spending $400.
          </p>
          <p className="text-slate-400 text-sm">
            From $48/month. Cancel anytime. Apply payments toward the purchase price.
          </p>
        </div>
        <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-[#0A1F44] font-semibold text-sm px-7 py-3.5 rounded transition-colors whitespace-nowrap"
          >
            {content.hero_cta_primary}
            <ArrowIcon />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 border border-slate-600 hover:border-slate-400 text-white font-semibold text-sm px-7 py-3.5 rounded transition-colors whitespace-nowrap"
          >
            See pricing
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Section: Related Job Pages ───────────────────────────────────────────────

function RelatedJobs({
  slugs,
  currentSlug,
}: {
  slugs: string[]
  currentSlug: string
}) {
  if (!slugs?.length) return null

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <SectionLabel>also on techloop</SectionLabel>
      <h2 className="text-2xl font-bold text-slate-900 mb-8">
        AI wearables for other roles
      </h2>
      <div className="flex flex-wrap gap-3">
        {slugs
          .filter((s) => s !== currentSlug)
          .map((slug) => (
            <Link
              key={slug}
              href={`/for/${slug}`}
              className="inline-flex items-center gap-1.5 border border-slate-200 hover:border-cyan-400/50 hover:bg-slate-50 rounded-full px-4 py-2 text-sm text-slate-700 font-medium transition-colors"
            >
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
              {slug.replace(/-/g, ' ')}
            </Link>
          ))}
      </div>
    </section>
  )
}

// ─── Section: Bottom CTA ──────────────────────────────────────────────────────

function BottomCTA({ content }: { content: JobPageContent }) {
  return (
    <section className="bg-[#0A1F44]">
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400 mb-6">
          try before you buy
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          The right AI device for your job.
          <br />
          Without the $400 commitment.
        </h2>
        <p className="text-slate-400 text-lg mb-10">
          From $48/month. Cancel anytime. Keep what works.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-[#0A1F44] font-bold text-sm px-10 py-4 rounded transition-colors"
          >
            {content.hero_cta_primary}
            <ArrowIcon />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-400 text-white font-semibold text-sm px-10 py-4 rounded transition-colors"
          >
            See pricing
          </Link>
        </div>
        <p className="mt-6 text-xs text-slate-500">
          No commitment. New devices. Free swaps.
        </p>
      </div>
    </section>
  )
}

// ─── Icon primitives ──────────────────────────────────────────────────────────

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      fill="none"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
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
      aria-hidden="true"
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

// ─── Main export ──────────────────────────────────────────────────────────────

export function JobPageTemplate({ content }: Props) {
  return (
    <main>
      <Hero content={content} />
      <PainPoints content={content} />
      <MidCTA content={content} />
      <DeviceRecommendations content={content} />
      <HowItWorks content={content} />
      <Testimonial content={content} />
      <Objections content={content} />
      <FAQSection content={content} />
      <RelatedJobs
        slugs={content.related_job_slugs ?? []}
        currentSlug={content.slug}
      />
      <BottomCTA content={content} />
    </main>
  )
}
