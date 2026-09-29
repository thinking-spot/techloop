"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { joinWaitlist } from "@/app/actions";
import { track } from "@/lib/analytics";
import { WAITLIST_ROLES } from "@/lib/waitlist-roles";
import type { DeviceOptionGroup } from "@/lib/waitlist";

const GENERIC_ERROR = "Something went wrong saving your spot. Please try again in a moment.";

type Status = "idle" | "submitting" | "success" | "error";

interface WaitlistFormProps {
    /** Built on the server by getWaitlistDeviceOptions() so the catalog stays out of the browser bundle. */
    deviceOptions: DeviceOptionGroup[];
    /** "full" asks for device and role too; "compact" is just an email field for page footers. */
    variant?: "full" | "compact";
}

const SELECT_CLASSES =
    "w-full h-12 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent focus:bg-white transition-colors cursor-pointer";

/**
 * Waitlist signup. Pre-selects a device from `?device=<id>` (set by the
 * "Join the waitlist" buttons), and records where the signup came from.
 */
export default function WaitlistForm(props: WaitlistFormProps) {
    // useSearchParams needs a Suspense boundary so the rest of the page can stay static.
    return (
        <Suspense fallback={<div aria-hidden className={props.variant === "compact" ? "h-12" : "h-80"} />}>
            <WaitlistFormInner {...props} />
        </Suspense>
    );
}

function WaitlistFormInner({ deviceOptions, variant = "full" }: WaitlistFormProps) {
    const params = useSearchParams();
    const [status, setStatus] = useState<Status>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const knownDeviceIds = new Set(deviceOptions.flatMap((g) => g.options.map((o) => o.id)));
    const requestedDevice = params.get("device") ?? "";
    const defaultDevice = knownDeviceIds.has(requestedDevice) ? requestedDevice : "";

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // Not a form `action`: React would clear the fields after it finishes,
        // and someone whose signup failed should not have to retype their email.
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        setStatus("submitting");
        setErrorMessage("");

        const source = window.location.pathname;
        formData.set("source", source);
        formData.set("referrer", document.referrer);
        for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
            const value = params.get(key);
            if (value) formData.set(key, value);
        }

        let result: Awaited<ReturnType<typeof joinWaitlist>>;
        try {
            result = await joinWaitlist(formData);
        } catch {
            result = { ok: false, error: GENERIC_ERROR };
        }

        if (result.ok) {
            const device = String(formData.get("device") ?? "");
            const role = String(formData.get("role") ?? "");
            track("waitlist_submit", {
                device_interest: device || undefined,
                role: role || undefined,
                source,
            });
            setStatus("success");
        } else {
            setErrorMessage(result.error);
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={24} />
                </div>
                <h3 className="font-bold text-sky-900 mb-2">You&apos;re on the list!</h3>
                <p className="text-sm text-sky-800">We&apos;ll email you when your spot opens.</p>
                <Button variant="tertiary" size="sm" onClick={() => setStatus("idle")} className="mt-4 text-sky-700 hover:text-sky-900 hover:bg-sky-100">
                    Register another email
                </Button>
            </div>
        );
    }

    const submitting = status === "submitting";

    // Real visitors never see this field; bots fill it in. See parseWaitlistForm.
    const honeypot = (
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
            <label htmlFor="website">Leave this field empty</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
    );

    const errorNote = status === "error" && (
        <p role="alert" className="text-sm text-red-600">
            {errorMessage}
        </p>
    );

    if (variant === "compact") {
        return (
            <form onSubmit={handleSubmit} className="space-y-3 relative">
                {honeypot}
                {defaultDevice && <input type="hidden" name="device" value={defaultDevice} />}
                <div className="flex gap-2">
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        aria-label="Email address"
                        required
                        className="h-12 text-base"
                    />
                    <Button type="submit" size="lg" className="px-8 shrink-0" disabled={submitting}>
                        {submitting ? "Joining..." : "Join waitlist"}
                    </Button>
                </div>
                {errorNote}
                <p className="text-xs text-paragraph">
                    We&apos;ll only use your email to tell you about Techloop&apos;s launch.
                </p>
            </form>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 relative">
            {honeypot}

            <div className="space-y-2 text-left">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email address</label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    required
                    className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                />
            </div>

            <div className="space-y-2 text-left">
                <label htmlFor="device" className="text-sm font-semibold text-gray-700">
                    Device you&apos;re most curious about <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <div className="relative">
                    {/* key: remount when the ?device= param changes so the preselection updates */}
                    <select id="device" name="device" key={defaultDevice} defaultValue={defaultDevice} className={SELECT_CLASSES}>
                        <option value="">Choose a device…</option>
                        {deviceOptions.map((group) => (
                            <optgroup key={group.label} label={group.label}>
                                {group.options.map((option) => (
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                ))}
                            </optgroup>
                        ))}
                        <option value="unsure">Not sure yet</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
            </div>

            <div className="space-y-2 text-left">
                <label htmlFor="role" className="text-sm font-semibold text-gray-700">
                    What best describes you? <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <div className="relative">
                    <select id="role" name="role" defaultValue="" className={SELECT_CLASSES}>
                        <option value="">Choose one…</option>
                        {WAITLIST_ROLES.map((role) => (
                            <option key={role.value} value={role.value}>{role.label}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
            </div>

            {errorNote}

            <Button type="submit" size="lg" className="w-full text-base font-bold shadow-lg shadow-cyan-500/20" disabled={submitting}>
                {submitting ? "Joining..." : "Join waitlist →"}
            </Button>

            <p className="text-xs text-center text-gray-400">
                We&apos;ll only use your email to tell you about Techloop&apos;s launch.
            </p>
        </form>
    );
}
