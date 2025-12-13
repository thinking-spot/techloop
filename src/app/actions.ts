"use server";

export async function joinWaitlist(formData: FormData) {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const email = formData.get("email");
    console.log("Joined waitlist:", email);

    // Return nothing (void) to satisfy form action type
}
