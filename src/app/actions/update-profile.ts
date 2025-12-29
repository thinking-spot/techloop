"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return {
            success: false,
            message: "You must be logged in to update your profile.",
        };
    }

    const fullName = formData.get("fullName") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const shippingAddress = formData.get("shippingAddress") as string;

    // Parse Ring Size (handle empty/null)
    const ringSizeRaw = formData.get("ringSize");
    const ringSize = ringSizeRaw ? parseInt(ringSizeRaw as string) : null;

    // Parse Sizing Kit (checkbox)
    const hasSizingKit = formData.get("hasSizingKit") === "on";

    const { error } = await supabase
        .from("profiles")
        .upsert({
            id: user.id,
            full_name: fullName,
            phone_number: phoneNumber,
            shipping_address: shippingAddress,
            ring_size: ringSize,
            has_sizing_kit: hasSizingKit,
            updated_at: new Date().toISOString(),
        });

    if (error) {
        console.error("Error updating profile:", error);
        return {
            success: false,
            message: "Failed to update profile.",
        };
    }

    revalidatePath("/settings/profile");

    return {
        success: true,
        message: "Profile updated successfully.",
    };
}
