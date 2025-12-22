import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, RefreshCcw, Star, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/Button";
import DeviceCard from "@/components/ui/DeviceCard";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Try AI devices + wearables | rent, swap, love, buy | techloop",
  description: "Glasses, watches, rings, pins, earbuds + pendants. Pick any AI device, try it for real. Love it? Keep it. No commitment. No risk. $48/m",
};

export default async function Home() {
  const devices = await getAllProducts();
  const featuredDevices = devices.slice(0, 4);
  return (
    <div className="flex flex-col gap-24 pb-20">

      {/* Hero Section */}
      <section className="relative px-6 pt-12 md:px-12 lg:pt-20">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-gradient-to-br from-[#F0F9FF] via-[#E6F4FE] to-[#F1F5F9] p-8 md:p-20 text-center border border-[#BAE6FD]/40 shadow-sm relative overflow-hidden">
          {/* Background decorative blob */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3DA9FC]/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

          <h1 className="relative mx-auto mb-6 max-w-4xl font-display text-5xl font-bold leading-[1.1] tracking-tight text-headline md:text-6xl lg:text-7xl">
            Try AI Devices <br className="hidden md:block" />
            the <span className="text-button relative inline-block">
              Smart Way
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-button/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="relative mx-auto mb-10 max-w-2xl text-xl text-paragraph leading-relaxed">
            New devices. No commitment. Swap anytime. <br className="hidden md:block" />
            Find the perfect fit for $48/month.
          </p>

          <div className="relative flex flex-col items-center justify-center gap-4 sm:flex-row mb-12">
            <Link href="/browse">
              <Button size="lg" className="w-full sm:w-auto px-10 py-7 text-lg shadow-lg shadow-button/20 hover:shadow-button/40">
                Find Your Device <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-10 py-7 text-lg bg-white/60 hover:bg-white">
                How It Works
              </Button>
            </Link>
          </div>

          <div className="relative flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-paragraph/80">
            <span className="flex items-center gap-2"><Check size={16} className="text-success" /> Brand new devices</span>
            <span className="flex items-center gap-2"><Check size={16} className="text-success" /> Free swaps (4x/year)</span>
            <span className="flex items-center gap-2"><Check size={16} className="text-success" /> Cancel anytime</span>
            <span className="flex items-center gap-2"><Check size={16} className="text-success" /> 98% refund rate</span>
          </div>

          <div className="mt-8 pt-8 border-t border-[#094067]/5 inline-flex items-center gap-4 px-6 py-3 bg-white/50 backdrop-blur-sm rounded-full border border-white/50 shadow-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] text-gray-500 overflow-hidden`}>
                  {/* Placeholder avatars */}
                  <div className="w-full h-full bg-gradient-to-tr from-gray-300 to-gray-100" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex text-yellow-400 text-[10px]">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} fill="currentColor" />)}
              </div>
              <div className="text-xs font-semibold text-headline">1,000+ happy renters</div>
            </div>
          </div>

        </div>
      </section>

      {/* Value Props */}
      <section className="px-6 md:px-12">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-medium text-headline mb-4 md:text-4xl">The smart way to try AI wearables</h2>
          <p className="text-paragraph text-lg">Don&apos;t spend $1,200 finding out which devices actually work for you.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Prop 1 */}
          <div className="bg-[#FFF] p-8 rounded-2xl border border-[#F1F5F9] shadow-sm">
            <div className="w-12 h-12 bg-[#E0F2FE] rounded-xl flex items-center justify-center text-button mb-6">
              <DollarSign size={24} />
            </div>
            <h3 className="text-xl font-bold text-headline mb-3">No $400+ Gambles</h3>
            <p className="text-paragraph text-sm leading-relaxed mb-4">
              Want to try smart glasses? Buying costs $399 upfront. Hate them? You&apos;re out of luck.
              With us, pay $48/month. If you don&apos;t love it, just return it.
            </p>
            <div className="text-xs font-semibold text-success bg-green-50 px-3 py-1 rounded-full inline-block">
              Save $351 upfront
            </div>
          </div>

          {/* Prop 2 */}
          <div className="bg-[#FFF] p-8 rounded-2xl border border-[#F1F5F9] shadow-sm">
            <div className="w-12 h-12 bg-[#E0F2FE] rounded-xl flex items-center justify-center text-button mb-6">
              <RefreshCcw size={24} />
            </div>
            <h3 className="text-xl font-bold text-headline mb-3">Swap Until You Find &quot;The One&quot;</h3>
            <p className="text-paragraph text-sm leading-relaxed mb-4">
              Not sure which smart ring fits your life? Try Oura. Swap to Samsung. Compare side-by-side.
              Finding your favorite tech shouldn&apos;t be stressful.
            </p>
            <div className="text-xs font-semibold text-button bg-blue-50 px-3 py-1 rounded-full inline-block">
              4 free swaps / year
            </div>
          </div>

          {/* Prop 3 */}
          <div className="bg-[#FFF] p-8 rounded-2xl border border-[#F1F5F9] shadow-sm">
            <div className="w-12 h-12 bg-[#E0F2FE] rounded-xl flex items-center justify-center text-button mb-6">
              <RefreshCcw size={24} />
            </div>
            <h3 className="text-xl font-bold text-headline mb-3">Always Get The Latest</h3>
            <p className="text-paragraph text-sm leading-relaxed mb-4">
              New version launching next month? Don&apos;t get stuck with old tech. Swap to the newest model immediately.
              Stay current without buying new gear every year.
            </p>
            <div className="text-xs font-semibold text-button bg-blue-50 px-3 py-1 rounded-full inline-block">
              New devices monthly
            </div>
          </div>
        </div>
      </section>

      {/* Process Preview */}
      <section className="bg-[#F8FAFC] py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-display font-medium text-headline mb-6 md:text-4xl">
              Easy as ordering takeout online
            </h2>
            <p className="text-paragraph text-lg mb-8">
              We&apos;ve removed all the friction. No long contracts. No hidden fees. Just pick a device and we ship it today.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-button text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-headline">Choose</h4>
                  <p className="text-sm text-paragraph mt-1">Take our quiz or browse the catalog. Find your match.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-button text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-headline">Try</h4>
                  <p className="text-sm text-paragraph mt-1">Use it for real. 30+ days to test drive in your daily life.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-button text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-headline">Decide</h4>
                  <p className="text-sm text-paragraph mt-1">Keep renting, buy it for a discount, or swap it.</p>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <Link href="/how-it-works">
                <Button variant="secondary">See How It Works</Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 bg-white p-8 rounded-2xl shadow-lg border border-[#F1F5F9] rotate-3 md:rotate-6 transition-transform hover:rotate-0">
            {/* Visual abstraction of the process */}
            <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center text-paragraph/30">
              [Process Animation Placeholder]
            </div>
          </div>
        </div>
      </section>


      {/* Featured Devices */}
      <section className="px-6 md:px-12">
        <div className="flex items-end justify-between mb-10 max-w-7xl mx-auto">
          <div>
            <h2 className="text-3xl font-display font-medium text-headline mb-2 md:text-4xl">Smart devices you actually want to try</h2>
            <p className="text-paragraph text-lg">4.8+ star rated devices only. If it&apos;s not great, we don&apos;t carry it.</p>
          </div>
          <Link href="/browse" className="hidden md:block">
            <Button variant="tertiary" className="group">
              View all devices <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {featuredDevices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>

        <div className="md:hidden mt-8 text-center">
          <Link href="/browse">
            <Button variant="secondary" className="w-full">View All Devices</Button>
          </Link>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-6 md:px-12 py-10">
        <div className="bg-[#094067] rounded-[2rem] p-8 md:p-16 text-white max-w-7xl mx-auto text-center md:text-left">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <h2 className="font-display text-3xl font-bold mb-4 text-white">Be an early adopter. Get Perks.</h2>
              <p className="text-white/80 mb-8">
                See why tech enthusiasts are ditching MSRP for early access + no risks.
              </p>
              <div className="flex gap-8 justify-center md:justify-start">
                <div>
                  <div className="text-3xl font-bold">4.8/5</div>
                  <div className="text-sm text-white/60">Average Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm text-white/60">Refund Rate</div>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 grid md:grid-cols-2 gap-6">
              {/* Testimonial 1 */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <div className="flex text-yellow-400 text-xs mb-3">★★★★★</div>
                <p className="text-sm leading-relaxed mb-4">
                  &quot;I wanted smart glasses but wasn&apos;t sure which ones. Tried XREAL, didn&apos;t love them. Swapped to Meta Ray-Ban and now I wear them every day. Total no-brainer.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20" />
                  <div className="text-xs">
                    <div className="font-bold">Marcus T.</div>
                    <div className="text-white/60">Software Engineer</div>
                  </div>
                </div>
              </div>
              {/* Testimonial 2 */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hidden md:block">
                <div className="flex text-yellow-400 text-xs mb-3">★★★★★</div>
                <p className="text-sm leading-relaxed mb-4">
                  &quot;The Explorer plan is perfect. $84/month to try $750 worth of devices? I&apos;m saving up to buy them, but trying first saved me from buying the wrong ring.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20" />
                  <div className="text-xs">
                    <div className="font-bold">Priya K.</div>
                    <div className="text-white/60">Product Manager</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </section >

      {/* Comparison Table Section */}
      < section className="px-6 md:px-12 max-w-5xl mx-auto" >
        <h2 className="text-center font-display text-3xl font-bold text-headline mb-4">Why Techloop vs. Buying?</h2>
        <p className="text-center text-paragraph mb-12">Because $400 is a lot to gamble on something you might hate.</p>

        <div className="border border-[#F1F5F9] rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left bg-white">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="py-4 px-6 font-medium text-paragraph w-1/3">The Scenario</th>
                <th className="py-4 px-6 font-medium text-paragraph w-1/3">Buying on Amazon</th>
                <th className="py-4 px-6 font-bold text-headline w-1/3 bg-[#E0F2FE]/30">Techloop</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-paragraph">Cost to try</td>
                <td className="py-4 px-6 text-sm text-paragraph">$399 upfront</td>
                <td className="py-4 px-6 text-sm font-bold text-headline bg-[#E0F2FE]/30">$48/month</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-paragraph">Try multiple devices</td>
                <td className="py-4 px-6 text-sm text-paragraph">Buy each ($1,200+)</td>
                <td className="py-4 px-6 text-sm font-bold text-headline bg-[#E0F2FE]/30">Swap free (4x/year)</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-paragraph">If you hate it</td>
                <td className="py-4 px-6 text-sm text-paragraph">Return w/in 30 days</td>
                <td className="py-4 px-6 text-sm font-bold text-headline bg-[#E0F2FE]/30">Swap anytime</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-paragraph">If you love it</td>
                <td className="py-4 px-6 text-sm text-paragraph">You paid $399</td>
                <td className="py-4 px-6 text-sm font-bold text-headline bg-[#E0F2FE]/30">Buy at 40-60% off</td>
              </tr>
            </tbody>
          </table>
          <div className="bg-[#F0F9FF] p-4 text-center text-sm text-headline border-t border-[#E0F2FE]">
            💡 <strong>Pro Tip:</strong> Try 3 devices for $288 total. Buying all 3 would cost $1,197. <strong>You save $909.</strong>
          </div>
        </div>
      </section >

      {/* Pricing Teaser */}
      < section className="px-6 md:px-12 text-center max-w-4xl mx-auto py-8" >
        <h2 className="font-display text-3xl font-bold text-headline mb-4">Pick your plan. Change anytime.</h2>
        <p className="text-paragraph mb-10">All plans include brand new devices and free swaps.</p>

        <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
          {/* Starter */}
          <div className="border border-[#E2E8F0] p-6 rounded-xl bg-white hover:border-[#CBD5E1] transition-colors">
            <div className="text-sm font-bold text-paragraph uppercase tracking-wide mb-2">Starter</div>
            <div className="text-3xl font-bold text-headline mb-1">$48<span className="text-lg text-paragraph font-normal">/mo</span></div>
            <div className="text-xs text-paragraph mb-6">1 device at a time</div>
            <ul className="space-y-2 mb-6">
              <li className="text-sm flex gap-2"><Check size={16} className="text-button" /> Brand new device</li>
              <li className="text-sm flex gap-2"><Check size={16} className="text-button" /> 4 free swaps</li>
            </ul>
            <Link href="/signup"><Button variant="secondary" className="w-full text-sm">Choose Starter</Button></Link>
          </div>

          {/* Explorer */}
          <div className="border-2 border-button p-6 rounded-xl bg-white relative shadow-md scale-105 z-10">
            <div className="absolute top-0 right-0 bg-button text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
            <div className="text-sm font-bold text-button uppercase tracking-wide mb-2">Explorer</div>
            <div className="text-3xl font-bold text-headline mb-1">$84<span className="text-lg text-paragraph font-normal">/mo</span></div>
            <div className="text-xs text-paragraph mb-6">2 devices at once</div>
            <ul className="space-y-2 mb-6">
              <li className="text-sm flex gap-2"><Check size={16} className="text-button" /> Brand new devices</li>
              <li className="text-sm flex gap-2"><Check size={16} className="text-button" /> Compare side-by-side</li>
            </ul>
            <Link href="/signup"><Button className="w-full text-sm">Choose Explorer</Button></Link>
          </div>

          {/* Power User */}
          <div className="border border-[#E2E8F0] p-6 rounded-xl bg-white hover:border-[#CBD5E1] transition-colors">
            <div className="text-sm font-bold text-paragraph uppercase tracking-wide mb-2">Power User</div>
            <div className="text-3xl font-bold text-headline mb-1">$119<span className="text-lg text-paragraph font-normal">/mo</span></div>
            <div className="text-xs text-paragraph mb-6">3+ devices at once</div>
            <ul className="space-y-2 mb-6">
              <li className="text-sm flex gap-2"><Check size={16} className="text-button" /> Build ecosystem</li>
              <li className="text-sm flex gap-2"><Check size={16} className="text-button" /> Priority support</li>
            </ul>
            <Link href="/signup"><Button variant="secondary" className="w-full text-sm">Choose Power</Button></Link>
          </div>
        </div>

        <Link href="/pricing" className="text-button font-medium hover:underline">See full pricing details &rarr;</Link>
      </section >

      {/* Final CTA */}
      < section className="px-6 md:px-12" >
        <div className="rounded-[2.5rem] bg-headline px-6 py-20 text-center text-white md:px-16 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[bg-position_15s_ease-in-out_infinite]" />

          <h2 className="relative mb-6 font-display text-4xl font-bold md:text-5xl text-white">Rent. Swap. Love. Keep.</h2>
          <p className="relative mx-auto mb-10 max-w-2xl text-lg text-white/80">
            Start with any device. If you don&apos;t love it, swap it. <br />
            Cancel anytime.
          </p>
          <div className="relative flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/quiz">
              <Button size="lg" className="px-10 py-6 bg-button text-white border-0 hover:bg-[#2D8FDC]">
                Try our AI Device Quiz <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/browse">
              <Button variant="tertiary" className="text-white hover:text-white/80 hover:bg-white/10">Browse all devices</Button>
            </Link>
          </div>
        </div>
      </section >

    </div >
  );
}
