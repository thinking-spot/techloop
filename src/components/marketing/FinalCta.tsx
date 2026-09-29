import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import WaitlistForm from "@/components/waitlist/WaitlistForm";
import { getWaitlistDeviceOptions } from "@/lib/waitlist";
import { isWaitlistMode } from "@/lib/site-config";

interface FinalCtaProps {
    heading?: string;
    body?: string;
    className?: string;
}

/**
 * The closing call to action on a page: the waitlist form before launch,
 * device and quiz links once the site is live.
 */
export default function FinalCta({
    heading = "Try it before you buy it.",
    body,
    className = "",
}: FinalCtaProps) {
    const text =
        body ??
        (isWaitlistMode
            ? "Join the waitlist and tell us which device you're most curious about. We'll email you when your spot opens."
            : "Pick a device, try it for real, and keep the ones you love.");

    return (
        <section className={className}>
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#BAE6FD]/40 bg-[linear-gradient(135deg,#F0F9FF_0%,#E6F4FE_50%,#F1F5F9_100%)] px-6 py-14 text-center md:px-12">
                <h2 className="font-display text-3xl font-bold text-headline md:text-4xl">{heading}</h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-paragraph">{text}</p>

                <div className="mx-auto mt-8 max-w-md text-left">
                    {isWaitlistMode ? (
                        <WaitlistForm deviceOptions={getWaitlistDeviceOptions()} variant="compact" />
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link href="/browse" className={buttonVariants({ size: "lg" })}>
                                Find your device
                            </Link>
                            <Link href="/quiz" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                                Take the quiz
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
