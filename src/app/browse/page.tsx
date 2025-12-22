import { getAllProducts } from "@/lib/products";
import BrowseClient from "./_components/BrowseClient";

// Revalidate every hour
export const revalidate = 3600;

export const metadata = {
    title: "Browse AI Wearables | TechLoop",
    description: "Rent the latest smart glasses, AI pins, and smart rings. Flexible plans, free shipping, swap anytime.",
};

export default async function BrowsePage() {
    const devices = await getAllProducts();

    return <BrowseClient initialDevices={devices} />;
}
