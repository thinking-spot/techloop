import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    Shield,
    Truck,
    RefreshCcw,
    Check,
    Info,
    Camera,
    Mic,
    Speaker,
    Bot,
    Battery,
    type LucideIcon,
} from "lucide-react";
import AddToCartButton from "@/components/ui/AddToCartButton";
import PrimaryCta from "@/components/ui/PrimaryCta";
import PricingBlock from "@/components/pricing/PricingBlock";
import BuyoutSchedule from "@/components/pricing/BuyoutSchedule";
import FaqSection from "@/components/marketing/FaqSection";
import ProductViewTracker from "@/components/analytics/ProductViewTracker";
import { getProductBySlug } from "@/lib/products";
import { brandOf } from "@/lib/brands";
import { isLaunchDevice, isWaitlistMode, SITE_URL } from "@/lib/site-config";
import { PRICING, priceSummary, usd } from "@/lib/pricing";
import { POLICY } from "@/lib/faq";

const iconMap: Record<string, LucideIcon> = {
    Camera,
    Mic,
    Speaker,
    Bot,
    Battery,
};

export async function generateMetadata(
    { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const { id } = await params;
    const device = await getProductBySlug(id);

    if (!device || !device.msrp) {
        return { title: "Product not found | Techloop" };
    }

    const p = priceSummary(device.msrp);

    return {
        title: `${device.name} rental from ${usd(p.monthlyRate)}/mo | Techloop`,
        description: `Try the ${device.name} for ${usd(p.monthlyRate)} a month (retail ${usd(p.msrp)}). Your deposit and first ${PRICING.creditedPayments} payments count toward buying it for ${usd(p.buyoutAfterCredits)}.`,
        alternates: { canonical: `/product/${device.id}` },
        openGraph: {
            images: "/images/techloop-wordmark.png",
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const device = await getProductBySlug(id);

    if (!device || !device.msrp) {
        notFound();
    }

    const p = priceSummary(device.msrp);
    const available = isLaunchDevice(device.id);
    const brand = brandOf(device.id);

    // Only describe an offer when the device can actually be rented.
    const offerIsLive = !isWaitlistMode && available;
    const structuredData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: device.name,
        image: device.imageUrl,
        description: device.description,
        url: `${SITE_URL}/product/${device.id}`,
        ...(brand ? { brand: { "@type": "Brand", name: brand } } : {}),
        ...(offerIsLive
            ? {
                  offers: {
                      "@type": "Offer",
                      url: `${SITE_URL}/product/${device.id}`,
                      priceCurrency: "USD",
                      price: p.monthlyRate,
                      availability: "https://schema.org/InStock",
                      priceSpecification: {
                          "@type": "UnitPriceSpecification",
                          price: p.monthlyRate,
                          priceCurrency: "USD",
                          billingDuration: 1,
                          unitCode: "MON",
                      },
                  },
              }
            : {}),
    };

    // Only the fields the cart needs: passing the whole device would serialize
    // all of it into the page's HTML.
    const cartItem = {
        id: device.id,
        name: device.name,
        price: device.price,
        imageUrl: device.imageUrl,
    };

    const ctaProps = {
        device: { id: device.id, name: device.name },
        forceWaitlist: !available,
        label: available ? "Join the waitlist" : "Notify me",
    };

    const perks = [
        { icon: Check, text: "First device ships new and sealed" },
        { icon: Truck, text: "Free shipping both ways" },
        { icon: RefreshCcw, text: `Swap for another device after ${POLICY.firstRentalMinimumDays} days` },
        { icon: Shield, text: "Deposit refunded when you return it" },
    ];

    return (
        <div className="bg-white min-h-screen pb-20">
            <ProductViewTracker deviceId={device.id} />

            {/* Breadcrumb */}
            <div className="border-b border-[#F1F5F9] bg-white">
                <div className="max-w-7xl mx-auto px-6 h-12 flex items-center text-sm text-paragraph/60">
                    <Link href="/" className="hover:text-headline">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/browse" className="hover:text-headline">Browse Devices</Link>
                    <span className="mx-2">/</span>
                    <span className="text-headline font-medium">{device.name}</span>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    // Escape "<" so a device name can never close the script tag.
                    __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
                }}
            />

            <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 md:px-12">
                <div className="grid gap-12 lg:grid-cols-12">

                    {/* Left Column: Gallery & Details (8 cols) */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#F8FAFC] border border-[#F1F5F9] group">
                                <Image
                                    src={device.imageUrl}
                                    alt={device.name}
                                    fill
                                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute top-4 left-4">
                                    <span
                                        className={`text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide ${
                                            available ? "bg-headline text-white" : "bg-slate-100 text-slate-600"
                                        }`}
                                    >
                                        {available ? "Launch device" : "Coming soon"}
                                    </span>
                                </div>
                            </div>

                            {device.galleryImages && (
                                <div className="grid grid-cols-5 gap-4">
                                    {device.galleryImages.map((img, i) => (
                                        <div key={i} className={`relative aspect-square rounded-lg bg-[#F8FAFC] border border-[#F1F5F9] hover:border-button transition-all ${i === 0 ? 'ring-2 ring-button ring-offset-2' : ''}`}>
                                            <Image
                                                src={img}
                                                alt={`${device.name} view ${i}`}
                                                fill
                                                className="object-cover object-center"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile Title (visible only on small screens) */}
                        <div className="lg:hidden">
                            {brand && <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-paragraph">{brand}</p>}
                            <h1 className="font-display text-3xl font-bold text-headline mb-2">{device.name}</h1>
                            {device.tagline && <p className="text-lg text-paragraph">{device.tagline}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="font-display text-2xl font-bold text-headline mb-4">Why you&apos;ll love it</h2>
                            <p className="text-lg text-paragraph leading-relaxed mb-6">
                                {device.longDescription || device.description}
                            </p>

                            {device.features && (
                                <div className="grid sm:grid-cols-2 gap-6 mt-8">
                                    {device.features.map((feature) => {
                                        const Icon = iconMap[feature.icon] || Info;
                                        return (
                                            <div key={feature.title} className="flex gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
                                                <div className="bg-white p-2.5 rounded-lg shadow-sm h-fit">
                                                    <Icon size={24} className="text-button" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-headline mb-1">{feature.title}</h4>
                                                    <p className="text-sm text-paragraph">{feature.description}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        {/* What it costs to own */}
                        <div>
                            <h2 className="font-display text-2xl font-bold text-headline mb-2">What it costs to own</h2>
                            <p className="mb-6 text-paragraph">
                                Rent the {device.name} and put your payments toward keeping it.
                            </p>
                            <BuyoutSchedule msrp={p.msrp} />
                        </div>

                        {/* Technical Specs Accordion-style */}
                        {device.technicalSpecs && (
                            <div>
                                <h2 className="font-display text-2xl font-bold text-headline mb-6">Tech Specs</h2>
                                <div className="divide-y divide-[#F1F5F9] border-t border-b border-[#F1F5F9]">
                                    {device.technicalSpecs.map((category) => (
                                        <div key={category.category} className="py-4">
                                            <h3 className="font-bold text-headline mb-3">{category.category}</h3>
                                            <div className="grid sm:grid-cols-2 gap-y-2 gap-x-8">
                                                {category.items.map((item) => (
                                                    <div key={item.label} className="flex justify-between text-sm">
                                                        <span className="text-paragraph/70">{item.label}</span>
                                                        <span className="font-medium text-headline text-right">{item.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <FaqSection
                            heading="Renting the fine print, in plain English"
                            ids={["pricing-deposit", "buying-keep", "swaps-how", "returns-cancel", "returns-shipping"]}
                        />

                    </div>

                    {/* Right Column: Sticky Pricing (4 cols) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6">
                            {/* Desktop Title */}
                            <div className="hidden lg:block">
                                {brand && <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-paragraph">{brand}</p>}
                                <h1 className="font-display text-3xl font-bold text-headline mb-2">{device.name}</h1>
                                {device.tagline && <p className="text-paragraph">{device.tagline}</p>}
                            </div>

                            <PricingBlock msrp={p.msrp} className="shadow-lg shadow-gray-100/50" />

                            <div>
                                <PrimaryCta
                                    {...ctaProps}
                                    location="product_pricing_card"
                                    size="lg"
                                    className="w-full py-6 text-lg font-bold shadow-button/20 shadow-lg"
                                    liveCta={available ? <AddToCartButton product={cartItem} /> : undefined}
                                />
                                {!available && (
                                    <p className="mt-3 text-xs text-paragraph">
                                        The {device.name} isn&apos;t in our launch lineup yet. Asking to be notified counts as a vote for it.
                                    </p>
                                )}
                                <ul className="mt-6 space-y-3 border-t border-[#F1F5F9] pt-6">
                                    {perks.map(({ icon: Icon, text }) => (
                                        <li key={text} className="flex items-start gap-3 text-sm text-paragraph">
                                            <Icon size={18} className="mt-0.5 shrink-0 text-button" />
                                            <span>{text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile Sticky CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#F1F5F9] p-4 lg:hidden z-50">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <div className="text-xl font-bold text-headline leading-tight">
                            {usd(p.monthlyRate)}<span className="text-sm font-normal text-paragraph">/mo</span>
                        </div>
                        <span className="text-xs text-paragraph">Retail {usd(p.msrp)}</span>
                    </div>
                    <div className="flex-1">
                        <PrimaryCta
                            {...ctaProps}
                            location="product_mobile_bar"
                            label={available ? "Join waitlist" : "Notify me"}
                            className="w-full px-4 whitespace-nowrap"
                            liveCta={available ? <AddToCartButton product={cartItem} /> : undefined}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
