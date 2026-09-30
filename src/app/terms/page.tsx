import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { DEFAULT_SUPPORT_EMAIL, LEGAL, SUPPORT_EMAIL } from "@/lib/site-config";

export const metadata: Metadata = {
    title: "Terms of Service | Techloop",
    description: "The terms for using trytechloop.com and joining the Techloop waitlist.",
    alternates: { canonical: "/terms" },
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

const CONTACT_EMAIL = SUPPORT_EMAIL || DEFAULT_SUPPORT_EMAIL;

export default function TermsPage() {
    return (
        <LegalPage
            title="Terms of Service"
            path="/terms"
            summary="These are the terms for using trytechloop.com and joining the waitlist. Renting a device has its own terms, linked below."
        >
            <h2>Agreeing to these terms</h2>
            <p>
                By using trytechloop.com (the &quot;site&quot;) you agree to these terms. If you do not agree, please do not use the
                site. You must be 18 or older. The site is run by {LEGAL.entity} (&quot;Techloop&quot;, &quot;we&quot;, &quot;us&quot;).
            </p>

            <h2>Where things stand</h2>
            <p>
                We are opening to a waitlist first and are not renting devices yet. Joining the waitlist does not commit you to
                anything, and it does not commit us to rent you a device or to open by any particular date. We may change or end
                the waitlist at any time.
            </p>

            <h2>Renting a device</h2>
            <p>
                Once we open, renting a device is governed by our <Link href="/rental-terms">Rental Terms</Link>, which cover pricing,
                deposits, swaps, returns and buying a device. Those terms apply in addition to these ones. If the two ever
                conflict about a rental, the Rental Terms win.
            </p>
            <p>Rentals are planned for addresses in the United States only.</p>

            <h2>Using the site</h2>
            <p>Please do not:</p>
            <ul>
                <li>give us false information, or use someone else&apos;s identity or payment details;</li>
                <li>try to break, overload or gain unauthorized access to the site or its data;</li>
                <li>copy the site&apos;s content in bulk with automated tools;</li>
                <li>use the site to break the law or to harm others.</li>
            </ul>

            <h2>Accounts</h2>
            <p>
                Once accounts open, you are responsible for keeping your sign-in details private and for what happens under your
                account. Tell us right away if you think someone else is using it. We may suspend or close an account that is
                being misused or that we reasonably suspect of fraud.
            </p>

            <h2>Prices and availability</h2>
            <p>
                Prices on the site are worked out from each device&apos;s retail price using the formula on our{" "}
                <Link href="/pricing">pricing page</Link>, and include sales tax. Prices, devices and availability can change, and we
                may fix mistakes. No rental exists until we confirm it. A rental you already have keeps its monthly price.
            </p>

            <h2>Other companies&apos; products and names</h2>
            <p>
                Techloop is independent. We are not affiliated with, sponsored by or endorsed by the companies that make the
                devices shown on the site. Their names, logos and product names belong to them, and we use them only to say which
                device we mean. Descriptions and specifications come from public information and can be out of date, so check the
                maker&apos;s own information before you rely on it.
            </p>

            <h2>Health and safety information</h2>
            <p>
                Some devices track health or fitness data. Techloop does not provide medical advice, and information on this site
                is not a substitute for advice from a qualified professional. Use cameras and recording features lawfully and with
                respect for other people&apos;s privacy.
            </p>

            <h2>Our content and your feedback</h2>
            <p>
                The Techloop name, logo and the content we create belong to us. Please do not copy or reuse them without asking. If
                you send us ideas or feedback, including which devices you would like us to add, we may use them freely and without
                owing you anything.
            </p>

            <h2>No guarantees</h2>
            <p>
                The site is provided &quot;as is&quot;. We work to keep it accurate and available, but we do not promise it will always be
                error-free or uninterrupted. To the extent the law allows, Techloop is not responsible for indirect or
                consequential losses that come from using the site. Nothing in these terms limits rights you have under the law
                that cannot be limited.
            </p>

            <h2>Changes</h2>
            <p>
                We may update these terms. The date at the top shows the latest version. If you keep using the site after a change,
                you accept the updated terms.
            </p>

            <h2>Contact us</h2>
            <p>
                Questions about these terms? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. How we handle your
                information is described in our <Link href="/privacy">Privacy Policy</Link>.
            </p>
        </LegalPage>
    );
}
