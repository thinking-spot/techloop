"use server";

import { createClient } from "@/utils/supabase/server";

export async function joinWaitlist(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const device = formData.get("device") as string;

    if (!email) return;

    // Insert into Supabase
    // We ignore errors on the frontend (silent fail for duplicates) to prevent user enumeration
    // but in a real app we might want to log this.
    try {
        await supabase.from("waitlist").insert({
            email,
            device_interest: device || null,
        });
    } catch (error) {
        console.error("Waitlist Error:", error);
    }
}
