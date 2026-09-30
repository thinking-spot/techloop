import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { LEGAL } from "@/lib/site-config";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 py-12 px-6 md:px-12 mt-auto">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <Logo />
                    <p className="mt-4 text-sm text-paragraph/70">
                        Try AI wearables before you buy.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold text-headline mb-4">Explore</h4>
                    <ul className="space-y-2 text-sm text-paragraph">
                        <li><Link href="/browse" className="hover:text-button">Browse Devices</Link></li>
                        <li><Link href="/quiz" className="hover:text-button">Device Quiz</Link></li>
                        <li><Link href="/blog" className="hover:text-button">Techloop Hub</Link></li>
                        <li><Link href="/how-it-works" className="hover:text-button">How It Works</Link></li>
                        <li><Link href="/pricing" className="hover:text-button">Pricing</Link></li>
                        <li><Link href="/waitlist" className="hover:text-button">Join Waitlist</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-headline mb-4">Support</h4>
                    <ul className="space-y-2 text-sm text-paragraph">
                        <li><Link href="/help" className="hover:text-button">Help Center</Link></li>
                        <li><Link href="/help#contact" className="hover:text-button">Contact Us</Link></li>
                        <li><Link href="/partners" className="hover:text-button font-medium text-button">For Partners</Link></li>
                        <li><Link href="/business" className="hover:text-button font-medium text-headline">For Business</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-headline mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm text-paragraph">
                        <li><Link href="/privacy" className="hover:text-button">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-button">Terms of Service</Link></li>
                        <li><Link href="/rental-terms" className="hover:text-button">Rental Terms</Link></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 text-xs text-paragraph/60 space-y-2">
                <p>&copy; {new Date().getFullYear()} {LEGAL.entity} All rights reserved.</p>
                <p>Techloop is independent and is not affiliated with the device brands shown on this site. Brand names belong to their owners.</p>
            </div>
        </footer>
    );
}
