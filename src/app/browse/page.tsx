import { getAllProducts } from "@/lib/products";
import BrowseClient from "./_components/BrowseClient";

// Revalidate every hour
export const revalidate = 3600;

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Browse AI Wearables | Techloop",
    description: "Rent the latest smart glasses, AI pins, and smart rings. Flexible plans, free shipping, swap anytime.",
    openGraph: {
        images: "/images/techloop-wordmark.png",
    },
};

export default async function BrowsePage() {
    const devices = await getAllProducts();

    return <BrowseClient initialDevices={devices} />;
}
