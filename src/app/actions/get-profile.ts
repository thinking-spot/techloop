"use server";

import { createClient } from "@/utils/supabase/server";

export async function getProfile() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error && error.code !== "PGRST116") { // Ignore 'multiple rows' or 'no rows' if strictly 1:1, but handle gracefully
        console.error("Error fetching profile:", error);
        return null;
    }

    // If no profile exists yet (shouldn't happen with trigger, but good for safety), return basic user info
    if (!profile) {
        return {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || "",
            // other fields undefined
        };
    }

    // Combine profile data with auth email (which is usually in auth.users, not profiles)
    return {
        ...profile,
        email: user.email,
    };
}
