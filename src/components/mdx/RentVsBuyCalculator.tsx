import RentVsBuyCalculatorClient, {
    type CalculatorDevice,
} from "@/components/mdx/RentVsBuyCalculatorClient";
import { devices } from "@/lib/data";
import { LAUNCH_DEVICE_IDS, isWaitlistMode } from "@/lib/site-config";
import { PRICING, usd } from "@/lib/pricing";

// The three smart glasses used in the "try more than one" example.
const TRIAL_IDS = ["xreal-air-pro", "meta-rayban", "brilliant-labs-frame"];

function pick(ids: readonly string[]): CalculatorDevice[] {
    return ids.flatMap((id) => {
        const d = devices.find((device) => device.id === id);
        return d && d.msrp ? [{ id: d.id, name: d.name, msrp: d.msrp }] : [];
    });
}

/**
 * Embedded in blog posts as <RentVsBuyCalculator />. Reads the real catalog
 * and the pricing rule, so it can never disagree with the rest of the site.
 */
export default function RentVsBuyCalculator() {
    const choices = pick(LAUNCH_DEVICE_IDS);
    const trial = pick(TRIAL_IDS);

    return (
        <RentVsBuyCalculatorClient
            devices={choices}
            trialDevices={trial.length === 3 ? trial : choices.slice(0, 3)}
            ctaHref={isWaitlistMode ? "/waitlist" : "/pricing"}
            ctaLabel={isWaitlistMode ? "Join the waitlist →" : "See pricing →"}
            footnote={`From ${usd(PRICING.minMonthlyRate)}/month · Refundable deposit · Payments count toward owning`}
        />
    );
}
