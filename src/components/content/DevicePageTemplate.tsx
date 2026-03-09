'use client'

// components/content/DevicePageTemplate.tsx
// Renders /rent/[slug] pages from DevicePageContent schema.
// Design: product-focused. Specs table, rent-to-own math, trust anchors.

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { DevicePageContent } from '@/types/content'
import { formatPrice, formatMonthly } from '@/lib/content'

interface Props {
  content: DevicePageContent
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400 mb-3">
      {children}
    </p>
  )
}

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 ${className}`} fill="none" viewBox="0 0 16 16">
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

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-cyan-500 flex-shrink-0" fill="none" viewBox="0 0 16 16">
      <path
        d="M3 8l3.5 3.5L13 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Section: Hero (split layout) ────────────────────────────────────────────

function Hero({ content }: { content: DevicePageContent }) {
  const monthlyPrice = formatMonthly(content.rental_price_cents)
  const msrp = formatPrice(content.msrp_cents)

  return (
    <section className="bg-[#0A1F44] relative overflow-hidden">
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#00D4FF 1px, transparent 1px), linear-gradient(90deg, #00D4FF 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-cyan-400" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28">
        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">techloop</Link>
          <span>/</span>
          <Link href="/rent" className="hover:text-white transition-colors">devices</Link>
          <span>/</span>
          <span className="text-white">{content.device_name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-cyan-400 border border-cyan-400/30 rounded px-3 py-1 mb-6">
              {content.brand} · {content.category.replace('-', ' ')}
            </span>

            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              {content.hero_headline}
            </h1>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              {content.tagline}
            </p>

            {/* Price block */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
              <div className="flex items-end gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                    Monthly rental
                  </p>
                  <p className="text-4xl font-bold text-white">
                    {monthlyPrice}
                  </p>
                </div>
                <div className="text-slate-500 text-sm pb-1">
                  vs {msrp} to buy
                </div>
              </div>

              {/* Rent-to-own callout */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-sm text-cyan-400 font-medium mb-1">
                  Rent-to-own credit
                </p>
                <p className="text-xs text-slate-400">
                  Apply up to {content.purchase_credit_months} months (
                  {formatPrice(content.purchase_credit_total_cents)}) toward the{' '}
                  {msrp} purchase price. Buy for{' '}
                  {formatPrice(
                    content.msrp_cents - content.purchase_credit_total_cents
                  )}{' '}
                  if you decide to keep it.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-[#0A1F44] font-bold text-sm px-8 py-4 rounded transition-colors"
              >
                Rent the {content.device_name}
                <ArrowIcon />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center border border-slate-600 hover:border-slate-400 text-white font-semibold text-sm px-8 py-4 rounded transition-colors"
              >
                See all pricing
              </Link>
            </div>
          </div>

          {/* Right: device image */}
          <div className="flex items-center justify-center">
            {content.image_url ? (
              <div className="relative">
                {/* Glow behind image */}
                <div className="absolute inset-0 bg-cyan-400/10 blur-3xl rounded-full scale-75" />
                <Image
                  src={content.image_url}
                  alt={content.image_alt ?? content.device_name}
                  width={480}
                  height={480}
                  className="relative object-contain max-h-[400px] w-auto"
                  priority
                />
              </div>
            ) : (
              // Placeholder when no image
              <div className="w-80 h-80 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white/20 mb-2">
                    {content.brand}
                  </div>
                  <div className="text-sm text-slate-500">{content.device_name}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Section: What's Included ─────────────────────────────────────────────────

function RentalIncludes({ content }: { content: DevicePageContent }) {
  return (
    <section className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="text-sm font-semibold text-slate-700 flex-shrink-0">
            Every rental includes:
          </p>
          {content.rental_includes.map((item, i) => (
            <span key={i} className="flex items-center gap-2 text-sm text-slate-600">
              <CheckIcon />
              {item.item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section: Specs Table ─────────────────────────────────────────────────────

function Specs({ content }: { content: DevicePageContent }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Specs */}
        <div>
          <SectionLabel>technical specs</SectionLabel>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            What you're renting
          </h2>

          <div className="border border-slate-200 rounded-lg overflow-hidden">
            {content.specs.map((spec, i) => (
              <div
                key={i}
                className={`flex items-center px-5 py-3.5 text-sm ${
                  i % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                }`}
              >
                <span className="font-medium text-slate-500 w-40 flex-shrink-0">
                  {spec.label}
                </span>
                <span className="text-slate-900">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <SectionLabel>key features</SectionLabel>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Why subscribers choose it
          </h2>

          <div className="space-y-6">
            {content.features.map((feature, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded bg-cyan-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Section: Rent-to-Own Math ────────────────────────────────────────────────

function RentToOwn({ content }: { content: DevicePageContent }) {
  const monthly = content.rental_price_cents / 100
  const credit = content.purchase_credit_total_cents / 100
  const msrp = content.msrp_cents / 100
  const buyPrice = msrp - credit

  return (
    <section className="bg-[#0A1F44]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <SectionLabel>rent-to-own</SectionLabel>
        <h2 className="text-3xl font-bold text-white mb-10">
          The math, plainly
        </h2>

        <div className="grid sm:grid-cols-3 gap-0 border border-white/10 rounded-xl overflow-hidden">
          {[
            {
              label: 'Monthly rental',
              value: `$${monthly}/mo`,
              note: `~${Math.round((monthly / msrp) * 100)}% of MSRP`,
            },
            {
              label: 'After 3 months',
              value: `$${credit} credit`,
              note: 'Applied to purchase',
            },
            {
              label: 'Buy price',
              value: `$${buyPrice}`,
              note: `vs $${msrp} retail`,
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`px-8 py-8 ${
                i < 2 ? 'border-b sm:border-b-0 sm:border-r border-white/10' : ''
              }`}
            >
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                {item.label}
              </p>
              <p className="text-3xl font-bold text-white mb-1">{item.value}</p>
              <p className="text-sm text-cyan-400">{item.note}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-slate-400 text-center">
          Not sure? Cancel any time within the first 30 days.{' '}
          <Link href="/pricing" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            See full pricing details →
          </Link>
        </p>
      </div>
    </section>
  )
}

// ─── Section: Best For (Job Links) ───────────────────────────────────────────

function BestFor({ content }: { content: DevicePageContent }) {
  if (!content.best_for_job_slugs?.length) return null

  return (
    <section className="border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-sm font-semibold text-slate-700 mb-4">
          Best for:
        </p>
        <div className="flex flex-wrap gap-3">
          {content.best_for_job_slugs.map((slug, i) => (
            <Link
              key={slug}
              href={`/for/${slug}`}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-full px-4 py-2 text-sm font-medium transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              {content.best_for_labels[i] ?? slug.replace(/-/g, ' ')}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section: Comparisons ─────────────────────────────────────────────────────

function Comparisons({ content }: { content: DevicePageContent }) {
  if (!content.vs_devices?.length) return null

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <p className="text-sm font-semibold text-slate-700 mb-4">Compare:</p>
      <div className="flex flex-wrap gap-3">
        {content.vs_devices.map((vs) => (
          <Link
            key={vs.device_slug}
            href={`/blog/${vs.comparison_slug}`}
            className="inline-flex items-center gap-2 border border-slate-200 hover:border-cyan-400/50 rounded-lg px-4 py-2.5 text-sm text-slate-700 hover:text-slate-900 transition-colors"
          >
            {content.device_name} vs {vs.device_slug.replace(/-/g, ' ')}
            <ArrowIcon />
          </Link>
        ))}
      </div>
    </section>
  )
}

// ─── Section: Featured Review ─────────────────────────────────────────────────

function FeaturedReview({ content }: { content: DevicePageContent }) {
  if (!content.featured_review_quote) return null

  return (
    <section className="bg-slate-50 border-y border-slate-200">
      <div className="max-w-3xl mx-auto px-6 py-14 text-center">
        {content.subscriber_rating && (
          <div className="flex items-center justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(content.subscriber_rating!)
                    ? 'text-amber-400'
                    : 'text-slate-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            {content.subscriber_review_count && (
              <span className="text-sm text-slate-500 ml-2">
                {content.subscriber_rating}/5 ({content.subscriber_review_count}{' '}
                subscribers)
              </span>
            )}
          </div>
        )}

        <blockquote className="text-xl text-slate-800 font-medium leading-relaxed mb-6">
          "{content.featured_review_quote}"
        </blockquote>
        <p className="text-sm text-slate-500">{content.featured_review_author}</p>
      </div>
    </section>
  )
}

// ─── Section: FAQ ─────────────────────────────────────────────────────────────

function FAQSection({ content }: { content: DevicePageContent }) {
  const [open, setOpen] = useState<number | null>(null)

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
    <section className="max-w-4xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SectionLabel>faq</SectionLabel>
      <h2 className="text-2xl font-bold text-slate-900 mb-8">
        Questions about renting the {content.device_name}
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

// ─── Section: Bottom CTA ──────────────────────────────────────────────────────

function BottomCTA({ content }: { content: DevicePageContent }) {
  return (
    <section className="bg-[#0A1F44]">
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400 mb-6">
          risk-free rental
        </p>
        <h2 className="text-3xl font-bold text-white mb-3">
          Try the {content.device_name}.
        </h2>
        <p className="text-slate-400 text-lg mb-10">
          {formatMonthly(content.rental_price_cents)} · Factory new · Cancel anytime
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-[#0A1F44] font-bold text-sm px-12 py-4 rounded transition-colors"
        >
          Start your rental
          <ArrowIcon />
        </Link>
        <p className="mt-5 text-xs text-slate-500">
          Apply up to {formatPrice(content.purchase_credit_total_cents)} toward the{' '}
          {formatPrice(content.msrp_cents)} purchase price.
        </p>
      </div>
    </section>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function DevicePageTemplate({ content }: Props) {
  return (
    <main>
      <Hero content={content} />
      <RentalIncludes content={content} />
      <BestFor content={content} />
      <Specs content={content} />
      <RentToOwn content={content} />
      <FeaturedReview content={content} />
      <Comparisons content={content} />
      <FAQSection content={content} />
      <BottomCTA content={content} />
    </main>
  )
}
