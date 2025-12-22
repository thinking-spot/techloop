import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    Check,
    Shield,
    Truck,
    Star,
    Info,
    Camera,
    Mic,
    Speaker,
    Bot,
    Battery
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import AddToCartButton from "@/components/ui/AddToCartButton";
import { getProductBySlug } from "@/lib/products";

const iconMap: Record<string, any> = {
    Camera,
    Mic,
    Speaker,
    Bot,
    Battery
};

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const device = await getProductBySlug(id);

    if (!device) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen pb-20">
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
                    __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "Product",
                        name: device.name,
                        image: device.imageUrl,
                        description: device.description,
                        brand: {
                            "@type": "Brand",
                            name: "TechLoop"
                        },
                        offers: {
                            "@type": "Offer",
                            url: `https://techloop.com/product/${device.id}`,
                            priceCurrency: "USD",
                            price: device.price,
                            availability: "https://schema.org/InStock"
                        },
                        aggregateRating: {
                            "@type": "AggregateRating",
                            ratingValue: device.rating,
                            reviewCount: device.reviewCount
                        }
                    })
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
                                {device.badges && (
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        {device.badges.map(badge => (
                                            <span key={badge} className="bg-headline text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide">
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {device.galleryImages && (
                                <div className="grid grid-cols-5 gap-4">
                                    {/* Map actual gallery images, defaulting to placeholders if needed */}
                                    {device.galleryImages.map((img, i) => (
                                        <div key={i} className={`relative aspect-square rounded-lg bg-[#F8FAFC] border border-[#F1F5F9] cursor-pointer hover:border-button transition-all ${i === 0 ? 'ring-2 ring-button ring-offset-2' : ''}`}>
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
                            <h1 className="font-display text-3xl font-bold text-headline mb-2">{device.name}</h1>
                            {device.tagline && <p className="text-lg text-paragraph mb-4">{device.tagline}</p>}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex text-yellow-400">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                                <span className="text-sm font-medium text-headline">{device.rating}</span>
                                <span className="text-sm text-paragraph underline">({device.reviewCount} reviews)</span>
                            </div>
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

                        {/* Reviews */}
                        {device.reviews && (
                            <div id="reviews">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="font-display text-2xl font-bold text-headline">Member Reviews</h2>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-headline">{device.rating}</div>
                                        <div className="flex text-yellow-400 text-sm justify-end">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                                        </div>
                                        <div className="text-xs text-paragraph">{device.reviewCount} reviews</div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {device.reviews.map((review, i) => (
                                        <div key={i} className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#F1F5F9]">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-bold text-headline">{review.title}</h4>
                                                        {review.verified && <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Verified Rental</span>}
                                                    </div>
                                                    <div className="flex text-yellow-400 text-xs">
                                                        {[...Array(5)].map((_, starIndex) => (
                                                            <Star key={starIndex} size={12} fill={starIndex < review.rating ? "currentColor" : "none"} className={starIndex >= review.rating ? "text-gray-300" : ""} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-xs text-paragraph">{review.date}</span>
                                            </div>
                                            <p className="text-paragraph text-sm leading-relaxed mb-4">
                                                &quot;{review.content}&quot;
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-gray-200" />
                                                <span className="text-xs font-medium text-headline">{review.user}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Right Column: Sticky Pricing Card (4 cols) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6">
                            {/* Desktop Title */}
                            <div className="hidden lg:block">
                                <h1 className="font-display text-3xl font-bold text-headline mb-2">{device.name}</h1>
                                {device.tagline && <p className="text-paragraph mb-4">{device.tagline}</p>}
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="flex text-yellow-400">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                                    </div>
                                    <span className="text-sm font-medium text-headline">{device.rating}</span>
                                    <a href="#reviews" className="text-sm text-paragraph underline hover:text-button">({device.reviewCount} reviews)</a>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#F1F5F9] bg-white p-6 shadow-lg shadow-gray-100/50">
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-1 mb-1">
                                        <span className="font-display text-5xl font-bold text-headline">${device.price}</span>
                                        <span className="text-xl text-paragraph font-medium">/mo</span>
                                    </div>
                                    <p className="text-sm text-green-600 font-medium">
                                        ≈ ${(parseInt(device.price) / 30).toFixed(2)} / day to try risk-free
                                    </p>
                                </div>

                                <AddToCartButton product={device} />

                                <div className="space-y-4 mb-6 pt-6 border-t border-[#F1F5F9]">
                                    <div className="flex items-start gap-3 text-sm text-paragraph">
                                        <Check size={18} className="text-success flex-shrink-0 mt-0.5" />
                                        <span><strong>Brand new device</strong> (sealed)</span>
                                    </div>
                                    <div className="flex items-start gap-3 text-sm text-paragraph">
                                        <Truck size={18} className="text-button flex-shrink-0 mt-0.5" />
                                        <span><strong>Free 2-day shipping</strong> both ways</span>
                                    </div>
                                    <div className="flex items-start gap-3 text-sm text-paragraph">
                                        <Shield size={18} className="text-button flex-shrink-0 mt-0.5" />
                                        <span><strong>Cancel anytime</strong> by returning</span>
                                    </div>
                                </div>

                                <div className="bg-[#F0F9FF] rounded-lg p-4 text-xs text-headline border border-[#E0F2FE]">
                                    <p className="font-bold mb-1">Rent-to-Own Available</p>
                                    <p>Love it? Your rental payments go toward the purchase price. Buy it anytime.</p>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-xs text-paragraph mb-2">Questions?</p>
                                <button className="text-sm font-semibold text-button hover:underline">Chat with a device expert</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile Sticky CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#F1F5F9] p-4 lg:hidden z-50">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <div className="text-xs text-paragraph uppercase font-bold">Monthly Rental</div>
                        <div className="text-xl font-bold text-headline">${device.price}<span className="text-sm font-normal text-paragraph">/mo</span></div>
                    </div>
                    <div className="flex-1">
                        <AddToCartButton product={device} />
                    </div>
                </div>
            </div>
        </div>
    );
}
