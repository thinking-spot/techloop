import Link from 'next/link'
import Image from 'next/image'
import { Clock } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// We run this server-side using the service role just like lib/content.ts
// to fetch the list of published blog posts.
export const revalidate = 60

async function getPublishedPosts() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data } = await supabase
        .from('content_blog_posts')
        .select('slug, title, intro, content_type, published_at, author_name, og_image_url, estimated_word_count')
        .eq('published', true)
        .order('published_at', { ascending: false })

    return data ?? []
}

export default async function BlogIndexPage() {
    const posts = await getPublishedPosts()

    if (!posts.length) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <h1 className="font-display text-4xl font-bold text-headline mb-4">
                    Techloop Blog
                </h1>
                <p className="text-paragraph">No posts published yet.</p>
            </div>
        )
    }

    const featuredPost = posts[0]
    const recentPosts = posts.slice(1)

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
                <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="group relative block overflow-hidden rounded-2xl bg-white border border-[#F1F5F9] shadow-lg hover:shadow-xl transition-all"
                >
                    <div className="grid md:grid-cols-2 gap-0">
                        <div className="relative h-[300px] md:h-auto overflow-hidden bg-slate-100">
                            {featuredPost.og_image_url && (
                                <Image
                                    src={featuredPost.og_image_url}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-4 text-xs font-bold uppercase tracking-wider text-button">
                                <span className="bg-blue-50 px-2 py-1 rounded">{featuredPost.content_type}</span>
                                {featuredPost.estimated_word_count && (
                                    <span className="flex items-center gap-1 text-paragraph font-normal normal-case">
                                        <Clock size={14} />
                                        {Math.ceil(featuredPost.estimated_word_count / 200)} min read
                                    </span>
                                )}
                            </div>
                            <h2 className="font-display text-2xl md:text-3xl font-bold text-headline mb-4 group-hover:text-button transition-colors">
                                {featuredPost.title}
                            </h2>
                            <p className="text-paragraph leading-relaxed mb-6 line-clamp-3">
                                {featuredPost.intro}
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                                    {/* Default avatar placeholder if not provided in DB schema */}
                                    <Image src="https://placehold.co/100x100/png?text=TL" alt={featuredPost.author_name || 'Author'} fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-headline">{featuredPost.author_name || 'techloop team'}</p>
                                    <p className="text-xs text-paragraph">
                                        {featuredPost.published_at ? new Date(featuredPost.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Recent Grid */}
            {recentPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recentPosts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>
            )}
        </div>
    )
}

function PostCard({ post }: { post: any }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col bg-white rounded-xl border border-[#F1F5F9] overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1"
        >
            <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                {post.og_image_url && (
                    <Image
                        src={post.og_image_url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
            </div>
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3 text-xs">
                    <span className="font-bold text-button uppercase tracking-wider">{post.content_type}</span>
                    <span className="text-paragraph/40">•</span>
                    <span className="text-paragraph">
                        {post.estimated_word_count ? `${Math.ceil(post.estimated_word_count / 200)} min read` : 'Quick read'}
                    </span>
                </div>
                <h3 className="font-display text-xl font-bold text-headline mb-3 group-hover:text-button transition-colors line-clamp-2">
                    {post.title}
                </h3>
                <p className="text-sm text-paragraph mb-4 line-clamp-2 flex-1">
                    {post.intro}
                </p>
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-[#F1F5F9]">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden bg-slate-200">
                        <Image src="https://placehold.co/100x100/png?text=TL" alt={post.author_name || 'Author'} fill className="object-cover" />
                    </div>
                    <span className="text-xs font-medium text-headline">{post.author_name || 'techloop team'}</span>
                </div>
            </div>
        </Link>
    )
}
