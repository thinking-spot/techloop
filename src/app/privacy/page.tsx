import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { DEFAULT_SUPPORT_EMAIL, LEGAL, SUPPORT_EMAIL } from "@/lib/site-config";

// A privacy policy always needs a way to reach us, even if the help page hides its contact block.
const CONTACT_EMAIL = SUPPORT_EMAIL || DEFAULT_SUPPORT_EMAIL;

export const metadata: Metadata = {
    title: "Privacy Policy | Techloop",
    description: "What information Techloop collects, why, who it is shared with, and the choices you have.",
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

export default function PrivacyPage() {
    return (
        <LegalPage
            title="Privacy Policy"
            path="/privacy"
            summary="Here is what we collect when you use trytechloop.com, why we collect it, who else sees it, and how to change your mind."
        >
            <h2>The short version</h2>
            <ul>
                <li>If you join the waitlist, we keep your email and whatever else you choose to tell us, and we use it to tell you about Techloop&apos;s launch.</li>
                <li>We use Google Analytics to see how people use the site.</li>
                <li>We do not sell your personal information.</li>
                <li>You can ask us to show you, correct or delete what we have.</li>
            </ul>

            <h2>Who we are</h2>
            <p>
                {LEGAL.entity} (&quot;Techloop&quot;, &quot;we&quot;, &quot;us&quot;) runs trytechloop.com. We plan to rent AI wearables by
                the month. We are not renting devices yet, so some of what follows describes what will apply once we open.
            </p>

            <h2>What we collect</h2>
            <h3>When you join the waitlist</h3>
            <ul>
                <li>Your email address.</li>
                <li>Optionally, the device you are most curious about and a short description of yourself, such as developer, creator or just curious.</li>
                <li>The page you signed up on, the website that sent you to us (the site name only, not the full address), and any campaign tags in the link you followed.</li>
                <li>When you signed up.</li>
            </ul>

            <h3>When you contact us as a partner</h3>
            <p>Your company name, website, email address and message.</p>

            <h3>When you have an account (once we open)</h3>
            <ul>
                <li>Your name, email address and password. Your password is handled by our sign-in provider and we cannot read it.</li>
                <li>Your shipping address, and your orders, rentals, swaps, returns and messages with us.</li>
                <li>Payment details. Payment card details are collected by Stripe, our payment processor. We do not store your full card number, but we receive details such as the card brand, the last four digits and your billing address.</li>
            </ul>

            <h3>Automatically, as you use the site</h3>
            <ul>
                <li>
                    Through Google Analytics: the pages you view, buttons you click (such as &quot;Join the waitlist&quot;),
                    your device and browser type, and your approximate location.
                </li>
                <li>
                    Quiz answers stay in your browser. We record only that you started or finished the quiz and which
                    device it suggested first.
                </li>
                <li>
                    Your bag and any devices you save with the heart button are stored in your own browser, so they are
                    still there when you come back.
                </li>
            </ul>

            <h2>How we use it</h2>
            <ul>
                <li>To email you about Techloop&apos;s launch and your place on the waitlist.</li>
                <li>To learn which devices people want and what to offer first. We look at this as totals, not as individuals.</li>
                <li>To run and improve the site.</li>
                <li>Once we open: to take payments, ship and collect devices, provide support, and prevent fraud. That can include verifying your identity and payment details before we rent you a device.</li>
                <li>To reply to your messages and to meet our legal obligations.</li>
            </ul>

            <h2>Who we share it with</h2>
            <p>We share information only where it is needed to run Techloop:</p>
            <ul>
                <li><strong>Service providers</strong> that run the site for us: Supabase (database and sign-in), Vercel (hosting), Stripe (payments) and Google (analytics).</li>
                <li><strong>Shipping carriers and device makers</strong> that fulfil orders once we open, and only what they need to deliver or collect a device, such as your name and address.</li>
                <li><strong>Device makers and other partners</strong>, in aggregated or de-identified form only. For example, how many people are interested in a device, or how long people keep it. We do not give device makers information that identifies you unless you ask us to.</li>
                <li><strong>A buyer or successor.</strong> If Techloop is part of a merger, acquisition or sale of its assets, your information may be transferred as part of that deal. We will tell you if that changes how your information is handled.</li>
                <li><strong>Authorities</strong> when the law requires it, or when we need to protect our rights or the safety of others.</li>
            </ul>
            <p>We do not sell your personal information.</p>

            <h2>Cookies and similar tools</h2>
            <p>
                Google Analytics uses cookies to tell visitors apart and see how the site is used. Once you have an account,
                cookies keep you signed in. Your bag and saved devices use your browser&apos;s local storage. You can block or
                delete cookies and stored data in your browser settings, and Google offers an{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer">opt-out browser add-on</a>. You can read how Google
                handles data in{" "}
                <a href="https://policies.google.com/privacy" rel="noopener noreferrer">its privacy policy</a>.
            </p>

            <h2>How long we keep it</h2>
            <p>
                We keep waitlist information until we have contacted you about launch and for as long as we reasonably need
                it afterwards, unless you ask us to delete it sooner. We keep account and rental records for as long as we need
                them to run your rentals and to meet legal, tax and accounting requirements.
            </p>

            <h2>Your choices</h2>
            <ul>
                <li>Ask what information we hold about you.</li>
                <li>Ask us to correct it or delete it.</li>
                <li>Ask us to stop emailing you. Just tell us and we will take you off the list.</li>
            </ul>
            <p>
                Depending on where you live, the law may give you more rights over your information. To use any of these, contact
                us as described below. We may need to confirm it is really you before we act.
            </p>

            <h2>Keeping information safe</h2>
            <p>
                We use established providers and limit who can see personal information. No system is perfectly secure, so we
                cannot promise absolute security.
            </p>

            <h2>Children</h2>
            <p>Techloop is for people 18 and older. We do not knowingly collect information from anyone younger.</p>

            <h2>Changes to this policy</h2>
            <p>
                We will update the date at the top when this policy changes. If a change is significant, we will tell waitlist members
                and account holders by email.
            </p>

            <h2>Contact us</h2>
            <p>
                Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with any question or request about your information.
            </p>
        </LegalPage>
    );
}
