"use server";

import { createClient } from "@/utils/supabase/server";

export async function submitPartnerInquiry(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const companyName = formData.get("companyName") as string;
    const website = formData.get("website") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!companyName || !email || !message) {
        return {
            success: false,
            message: "Please fill in all required fields."
        };
    }

    try {
        const { error } = await supabase.from("partner_inquiries").insert({
            company_name: companyName,
            website: website || null,
            email: email,
            message: message,
            status: "new"
        });

        if (error) {
            console.error("Supabase Error:", error);
            return {
                success: false,
                message: "Failed to submit inquiry. Please try again."
            };
        }

        return {
            success: true,
            message: "Inquiry submitted successfully! We'll be in touch."
        };
    } catch (e) {
        console.error("Server Error:", e);
        return {
            success: false,
            message: "An unexpected error occurred."
        };
    }
}
