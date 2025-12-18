import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import { devices } from "@/lib/data";
import { ArrowLeft, Clock, Calendar, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Props = {
    params: Promise<{ slug: string }>;
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    return {
        title: `${post.title} | TechLoop Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.coverImage],
            type: 'article',
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    // Resolve related products
    const relatedDevices = post.relatedProducts
        ? devices.filter(d => post.relatedProducts!.includes(d.id))
        : [];

    return (
        <article className="pb-20">
            {/* Header */}
            <div className="bg-headline text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover blur-sm scale-110" />
                    <div className="absolute inset-0 bg-headline/50 mix-blend-multiply" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 text-sm font-medium transition-colors">
                        <ArrowLeft size={16} />
                        Back to Blog
                    </Link>

                    <div className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-wider text-button mb-4">
                        <span className="bg-white/10 px-3 py-1 rounded backdrop-blur-sm">{post.category}</span>
                    </div>

                    <h1 className="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-sm text-white/80">
                        <div className="flex items-center gap-2">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
                                <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                            </div>
                            <span className="font-medium text-white">{post.author.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={16} />
                            {post.date}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock size={16} />
                            {post.readTime}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 grid lg:grid-cols-12 gap-12 relative z-20">

                {/* Main Content */}
                <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-[#F1F5F9]">
                    {/* Safe HTML Render */}
                    <div
                        className="prose prose-lg prose-slate max-w-none 
                        prose-headings:font-display prose-headings:font-bold prose-headings:text-headline
                        prose-p:text-paragraph prose-p:leading-relaxed
                        prose-a:text-button prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-headline prose-strong:font-bold
                        prose-li:text-paragraph"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className="mt-12 pt-8 border-t border-[#F1F5F9] flex justify-between items-center">
                        <span className="font-bold text-headline">Share this article</span>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"><Twitter size={18} /></button>
                            <button className="p-2 rounded-full bg-blue-50 text-blue-800 hover:bg-blue-100"><Linkedin size={18} /></button>
                            <button className="p-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100"><Facebook size={18} /></button>
                            <button className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100"><Share2 size={18} /></button>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8 pt-8 lg:pt-0">

                    {/* Related Products Widget */}
                    {relatedDevices.length > 0 && (
                        <div className="bg-white p-6 rounded-2xl border border-[#F1F5F9] sticky top-24">
                            <h3 className="font-display text-xl font-bold text-headline mb-4">Mentioned Products</h3>
                            <div className="space-y-4">
                                {relatedDevices.map(device => (
                                    <div key={device.id} className="group border border-[#F1F5F9] rounded-xl p-3 hover:shadow-md transition-all bg-white">
                                        <div className="relative aspect-[4/3] w-full bg-[#F8FAFC] rounded-lg mb-3 overflow-hidden">
                                            <Image
                                                src={device.imageUrl}
                                                alt={device.name}
                                                fill
                                                className="object-contain p-2 group-hover:scale-105 transition-transform"
                                            />
                                        </div>
                                        <div>
                                            <Link href={`/product/${device.id}`} className="block font-bold text-headline hover:text-button transition-colors mb-1">
                                                {device.name}
                                            </Link>
                                            <div className="flex items-baseline gap-1 mb-3">
                                                <span className="font-bold text-lg">${device.price}</span>
                                                <span className="text-xs text-paragraph">/mo</span>
                                            </div>
                                            <Link href={`/product/${device.id}`} className="block w-full">
                                                <Button size="sm" variant="secondary" className="w-full">
                                                    Rent Now
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </article>
    );
}
