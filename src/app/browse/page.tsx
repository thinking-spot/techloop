import { getAllProducts } from "@/lib/products";
import BrowseClient from "./_components/BrowseClient";
import { devices } from "@/lib/data";
import { PRICING, lowestMonthlyRate, usd } from "@/lib/pricing";

// Revalidate every hour
export const revalidate = 3600;

import type { Metadata } from "next";

const lowestRate = lowestMonthlyRate(devices) ?? PRICING.minMonthlyRate;

export const metadata: Metadata = {
    title: "Browse AI wearables to rent or buy | Techloop",
    description: `Compare AI glasses, rings, watches, earbuds, pins, pendants and cards. Rent from ${usd(lowestRate)} a month and put your payments toward owning them.`,
    alternates: { canonical: "/browse" },
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

export default async function BrowsePage() {
    const devices = await getAllProducts();

    return <BrowseClient initialDevices={devices} />;
}
