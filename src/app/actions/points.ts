"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getExplorerStatus() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    // Fetch points or create generic row if not exists
    let { data: status, error } = await supabase
        .from("explorer_points")
        .select("*")
        .eq("user_id", user.id)
        .single();

    if (!status && !error) {
        // Init user
        const { data: newStatus } = await supabase
            .from("explorer_points")
            .insert({ user_id: user.id, score: 0, level: 1 })
            .select()
            .single();
        status = newStatus;
    }

    return status;
}

export async function generateReferralCode() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Simple logic: first 4 of email + random 2 digits
    const emailPrefix = user.email?.split('@')[0].slice(0, 8) || "explorer";
    const random = Math.floor(Math.random() * 99) + 10;
    const code = `${emailPrefix}-${random}`;

    const { data, error } = await supabase
        .from("explorer_points")
        .update({ referral_code: code })
        .eq("user_id", user.id)
        .select()
        .single();

    if (error) {
        console.error("Error generating code:", error);
        return null; // Handle collision in real app
    }

    revalidatePath("/dashboard");
    return data;
}

export async function redeemReward(type: 'SWAP' | 'MONTH') {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    const cost = type === 'SWAP' ? 250 : 480;

    // 1. Check Balance
    const { data: status } = await supabase
        .from("explorer_points")
        .select("score")
        .eq("user_id", user.id)
        .single();

    if (!status || status.score < cost) {
        return { error: "Insufficient points" };
    }

    // 2. Deduct Points
    const { error: updateError } = await supabase
        .from("explorer_points")
        .update({ score: status.score - cost })
        .eq("user_id", user.id);

    if (updateError) return { error: "Transaction failed" };

    // 3. Log Transaction
    await supabase.from("point_transactions").insert({
        user_id: user.id,
        amount: -cost,
        type: 'REDEMPTION',
        description: `Redeemed for ${type === 'SWAP' ? 'Free Device Swap' : 'Free Month'}`
    });

    revalidatePath("/dashboard");
    return { success: true };
}
