import Link from "next/link";
import Image from "next/image";
import { blogPosts, BlogPost } from "@/lib/blog-data";
import { Clock, Tag } from "lucide-react";

export default function BlogIndexPage() {
    const featuredPost = blogPosts[0];
    const recentPosts = blogPosts.slice(1);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="font-display text-4xl md:text-5xl font-bold text-headline mb-4">
                    The latest in wearable tech
                </h1>
                <p className="text-xl text-paragraph leading-relaxed">
                    Hands-on reviews, deep-dive comparisons, and rental guides to help you find your next device.
                </p>
            </div>

            {/* Featured Post */}
            <div className="mb-16">
                <Link href={`/blog/${featuredPost.slug}`} className="group relative block overflow-hidden rounded-2xl bg-white border border-[#F1F5F9] shadow-lg hover:shadow-xl transition-all">
                    <div className="grid md:grid-cols-2 gap-0">
                        <div className="relative h-[300px] md:h-auto overflow-hidden">
                            <Image
                                src={featuredPost.coverImage}
                                alt={featuredPost.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-4 text-xs font-bold uppercase tracking-wider text-button">
                                <span className="bg-blue-50 px-2 py-1 rounded">{featuredPost.category}</span>
                                <span className="flex items-center gap-1 text-paragraph font-normal normal-case">
                                    <Clock size={14} />
                                    {featuredPost.readTime}
                                </span>
                            </div>
                            <h2 className="font-display text-2xl md:text-3xl font-bold text-headline mb-4 group-hover:text-button transition-colors">
                                {featuredPost.title}
                            </h2>
                            <p className="text-paragraph leading-relaxed mb-6 line-clamp-3">
                                {featuredPost.excerpt}
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                    <Image src={featuredPost.author.avatar} alt={featuredPost.author.name} fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-headline">{featuredPost.author.name}</p>
                                    <p className="text-xs text-paragraph">{featuredPost.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Recent Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>

        </div>
    );
}

function PostCard({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group flex flex-col bg-white rounded-xl border border-[#F1F5F9] overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1">
            <div className="relative aspect-[16/9] w-full bg-gray-100 overflow-hidden">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3 text-xs">
                    <span className="font-bold text-button uppercase tracking-wider">{post.category}</span>
                    <span className="text-paragraph/40">•</span>
                    <span className="text-paragraph">{post.readTime}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-headline mb-3 group-hover:text-button transition-colors line-clamp-2">
                    {post.title}
                </h3>
                <p className="text-sm text-paragraph mb-4 line-clamp-2 flex-1">
                    {post.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-[#F1F5F9]">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                        <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                    </div>
                    <span className="text-xs font-medium text-headline">{post.author.name}</span>
                </div>
            </div>
        </Link>
    )
}
