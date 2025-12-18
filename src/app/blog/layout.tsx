import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-[#F8FAFC] min-h-screen">
            {/* Blog Header */}
            <header className="bg-white border-b border-[#F1F5F9] sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-paragraph hover:text-headline transition-colors text-sm font-medium">
                        <ArrowLeft size={16} />
                        Back to TechLoop
                    </Link>
                    <div className="font-display font-bold text-xl text-headline">
                        TechLoop <span className="text-button">Hub</span>
                    </div>
                    <div className="w-24"></div> {/* Spacer for center alignment */}
                </div>
            </header>

            <main>
                {children}
            </main>

            <section className="bg-headline text-white py-16 px-4">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                    <h2 className="font-display text-3xl font-bold">Stay in the loop</h2>
                    <p className="text-white/80">
                        Get the latest reviews, comparisons, and rental drops delivered to your inbox.
                        No spam, just tech.
                    </p>
                    <div className="flex gap-2 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-button"
                        />
                        <button className="bg-button text-white px-6 py-3 rounded-lg font-bold hover:bg-button/90 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
