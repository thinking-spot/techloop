"use server";

import { createClient } from "@/utils/supabase/server";
import {
    parseWaitlistForm,
    submitWaitlist,
    type WaitlistClient,
    type WaitlistResult,
} from "@/lib/waitlist";

export async function joinWaitlist(formData: FormData): Promise<WaitlistResult> {
    const parsed = parseWaitlistForm(formData);

    if (parsed.kind === "invalid") return { ok: false, error: parsed.error };
    // A bot filled the hidden field. Say "success" and save nothing.
    if (parsed.kind === "bot") return { ok: true };

    const supabase = await createClient();
    return submitWaitlist(supabase as unknown as WaitlistClient, parsed.entry);
}
