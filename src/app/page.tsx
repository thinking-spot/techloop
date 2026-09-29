import type { Metadata } from "next";
import Link from "next/link";
import { Check, RefreshCcw, DollarSign, KeyRound, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import DeviceCard from "@/components/ui/DeviceCard";
import PrimaryCta from "@/components/ui/PrimaryCta";
import PricingBlock from "@/components/pricing/PricingBlock";
import FaqSection from "@/components/marketing/FaqSection";
import FinalCta from "@/components/marketing/FinalCta";
import { getAllProducts } from "@/lib/products";
import { LAUNCH_DEVICE_IDS, isWaitlistMode } from "@/lib/site-config";
import { PRICING, buyoutPrice, dueToday, lowestMonthlyRate, monthlyRate, deposit, usd } from "@/lib/pricing";
import { POLICY } from "@/lib/faq";
import { devices as catalog } from "@/lib/data";

const lowestRate = lowestMonthlyRate(catalog) ?? PRICING.minMonthlyRate;

export const metadata: Metadata = {
  title: "Try AI wearables before you buy | Techloop",
  description: `Rent AI glasses, rings, earbuds and more from ${usd(lowestRate)}/month. Your payments count toward owning the ones you love.`,
  openGraph: {
    images: "/images/techloop-wordmark.png",
  },
};

// The device used for every worked example on this page.
const EXAMPLE_ID = "meta-rayban";

export default async function Home() {
  const devices = await getAllProducts();
  const launchDevices = LAUNCH_DEVICE_IDS.flatMap((id) => {
    const device = devices.find((d) => d.id === id);
    return device ? [device] : [];
  });

  const example = devices.find((d) => d.id === EXAMPLE_ID) ?? devices[0];
  const exampleMsrp = example.msrp ?? 399;
  const exampleRate = monthlyRate(exampleMsrp);
  const exampleDeposit = deposit(exampleMsrp);
  const exampleDue = dueToday(exampleMsrp);
  const exampleBuyout = buyoutPrice(exampleMsrp, PRICING.creditedPayments);

  const chips = [
    `From ${usd(lowestRate)}/mo`,
    "Refundable deposit",
    "Swap for another device",
    "Payments count toward owning",
  ];

  return (
    <div className="flex flex-col gap-24 pb-20">

      {/* Hero */}
      <section className="relative px-4 pt-10 md:px-12 lg:pt-20">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-[linear-gradient(135deg,#F0F9FF_0%,#E6F4FE_50%,#F1F5F9_100%)] p-6 pt-16 pb-12 md:p-20 text-center border border-[#BAE6FD]/40 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3DA9FC]/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

          {isWaitlistMode && (
            <div className="relative mb-6 inline-flex items-center gap-2 rounded-full border border-[#BAE6FD] bg-white px-4 py-1.5 text-sm font-medium text-headline">
              <span className="h-2 w-2 rounded-full bg-[#3DA9FC]" />
              Now opening to the waitlist
            </div>
          )}

          <h1 className="relative mx-auto mb-6 max-w-4xl font-display text-[44px] font-bold leading-[1.05] tracking-tight text-headline md:text-[56px]">
            Try AI wearables <br className="hidden md:block" />
            <span className="text-[#3DA9FC]">before you buy.</span>
          </h1>
          <p className="relative mx-auto mb-10 max-w-2xl text-[18px] text-paragraph leading-relaxed md:text-[20px]">
            Rent smart glasses, rings, earbuds and more from {usd(lowestRate)} a month.
            Love one? Your payments count toward owning it.
          </p>

          <div className="relative mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PrimaryCta location="home_hero" size="lg" className="w-full sm:w-auto" />
            <Link href="/quiz" className={buttonVariants({ variant: "secondary", size: "lg", className: "w-full sm:w-auto" })}>
              Find your device with the quiz
            </Link>
          </div>

          <ul className="relative mx-auto grid max-w-[340px] grid-cols-2 gap-3 text-sm font-medium text-paragraph/80 md:flex md:max-w-none md:flex-row md:justify-center md:items-center">
            {chips.map((chip) => (
              <li
                key={chip}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#F1F5F9] bg-white px-3 py-2.5 shadow-sm md:whitespace-nowrap"
              >
                <Check size={16} className="shrink-0 text-[#22C55E]" /> {chip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why rent first */}
      <section className="px-4 md:px-12">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="mb-4 font-display text-3xl font-medium text-headline md:text-4xl">Why rent first?</h2>
          <p className="text-lg text-paragraph">
            AI wearables are personal. It&apos;s hard to know what you&apos;ll actually wear until you&apos;ve lived with one.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-[#F1F5F9] bg-white p-8 shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E0F2FE] text-button">
              <DollarSign size={24} />
            </div>
            <h3 className="mb-3 text-xl font-bold text-headline">Skip the full price</h3>
            <p className="mb-4 text-sm leading-relaxed text-paragraph">
              The {example.name} costs {usd(exampleMsrp)} to buy. Renting starts with {usd(exampleDue)}:
              your first month ({usd(exampleRate)}) plus a refundable {usd(exampleDeposit)} deposit.
            </p>
            <div className="inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-success">
              {usd(exampleMsrp - exampleDue)} less up front
            </div>
          </div>

          <div className="rounded-2xl border border-[#F1F5F9] bg-white p-8 shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E0F2FE] text-button">
              <RefreshCcw size={24} />
            </div>
            <h3 className="mb-3 text-xl font-bold text-headline">Not the one? Try another.</h3>
            <p className="mb-4 text-sm leading-relaxed text-paragraph">
              Start with smart glasses, then try a ring. After your first {POLICY.firstRentalMinimumDays} days you
              can swap for a different device, and we cover the shipping.
            </p>
            <div className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-button">
              Free shipping on swaps
            </div>
          </div>

          <div className="rounded-2xl border border-[#F1F5F9] bg-white p-8 shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E0F2FE] text-button">
              <KeyRound size={24} />
            </div>
            <h3 className="mb-3 text-xl font-bold text-headline">Love it? Own it.</h3>
            <p className="mb-4 text-sm leading-relaxed text-paragraph">
              Your deposit and first {PRICING.creditedPayments} payments count toward buying. Buy within{" "}
              {PRICING.creditedPayments} months and you pay exactly the retail price, with no markup.
            </p>
            <div className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-button">
              Retail price, minus your credit
            </div>
          </div>
        </div>
      </section>

      {/* How it works, with a worked example */}
      <section className="bg-[#F8FAFC] px-4 py-20 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-14 md:flex-row md:items-start">
          <div className="md:w-1/2">
            <h2 className="mb-6 font-display text-3xl font-medium text-headline md:text-4xl">How Techloop works</h2>
            <ol className="space-y-6">
              {[
                ["Choose a device", "Take the quiz or browse the catalog and find your match."],
                [
                  `Try it for ${POLICY.firstRentalMinimumDays}+ days`,
                  "Your first device ships new and sealed. Use it in real life and see if it sticks.",
                ],
                ["It's your call", "Keep renting, buy it, swap it for another, or send it back."],
              ].map(([title, body], i) => (
                <li key={title} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-button font-bold text-white">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-headline">{title}</h3>
                    <p className="mt-1 text-sm text-paragraph">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/how-it-works" className={buttonVariants({ variant: "secondary" })}>
                How it works
              </Link>
              <Link href="/pricing" className={buttonVariants({ variant: "tertiary" })}>
                See every price <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-paragraph">
              Example: {example.name}
            </p>
            <PricingBlock msrp={exampleMsrp} className="shadow-lg" />
          </div>
        </div>
      </section>

      {/* Launch devices */}
      <section className="px-4 md:px-12">
        <div className="mx-auto mb-10 flex max-w-7xl items-end justify-between">
          <div>
            <h2 className="mb-2 font-display text-3xl font-medium text-headline md:text-4xl">Launch devices</h2>
            <p className="text-lg text-paragraph">The first devices we&apos;re planning to offer. More are coming.</p>
          </div>
          <Link href="/browse" className={buttonVariants({ variant: "tertiary", className: "hidden md:inline-flex" })}>
            View all devices <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {launchDevices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/browse" className={buttonVariants({ variant: "secondary", className: "w-full" })}>
            View all devices
          </Link>
        </div>
      </section>

      {/* Honest comparison */}
      <section className="mx-auto w-full max-w-5xl px-4 md:px-12">
        <h2 className="mb-3 text-center font-display text-3xl font-bold text-headline">Buying at a store vs. Techloop</h2>
        <p className="mb-10 text-center text-paragraph">
          Same device, same retail price if you keep it. The difference is how you get there. Example:{" "}
          {example.name} ({usd(exampleMsrp)}).
        </p>

        <div className="overflow-hidden rounded-2xl border border-[#F1F5F9] shadow-sm">
          <table className="w-full bg-white text-left">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th scope="col" className="w-1/3 px-3 py-4 font-medium text-paragraph md:px-6"></th>
                <th scope="col" className="w-1/3 px-3 py-4 font-medium text-paragraph md:px-6">Buying at a store</th>
                <th scope="col" className="w-1/3 bg-[#E0F2FE]/30 px-3 py-4 font-bold text-headline md:px-6">Techloop</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {[
                ["To get started", usd(exampleMsrp), `${usd(exampleDue)} (${usd(exampleRate)} first month + ${usd(exampleDeposit)} refundable deposit)`],
                ["Trying a second device", "Buy another, or return the first", `Swap after ${POLICY.firstRentalMinimumDays} days, shipping on us`],
                ["If you love it", "You own it", `You own it: ${usd(exampleBuyout)} after ${PRICING.creditedPayments} months, which is retail minus your credit`],
                ["If it's not for you", "Return it within the store's window", "Send it back and get your deposit back. Rent you've paid isn't refunded"],
              ].map(([label, store, us]) => (
                <tr key={label}>
                  <th scope="row" className="px-3 py-4 text-sm font-medium text-paragraph md:px-6">{label}</th>
                  <td className="px-3 py-4 text-sm text-paragraph md:px-6">{store}</td>
                  <td className="bg-[#E0F2FE]/30 px-3 py-4 text-sm font-semibold text-headline md:px-6">{us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FaqSection
        className="mx-auto w-full max-w-3xl px-4 md:px-0"
        ids={["waitlist-status", "pricing-how", "pricing-deposit", "buying-keep", "swaps-how", "returns-cancel"]}
      />

      <FinalCta className="px-4 md:px-12" heading="Try it before you buy it." />
    </div>
  );
}
