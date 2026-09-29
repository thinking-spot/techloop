import { createClient } from "@/utils/supabase/server";
import { devices, Device } from "@/lib/data";

export async function getAllProducts(): Promise<Device[]> {
    const supabase = await createClient(); // Next.js 15+ await cookies() logic inside createClient
    const { data: dbProducts } = await supabase.from('products').select('*');

    // If fetch failed or empty, fallback to static data
    if (!dbProducts || dbProducts.length === 0) {
        console.warn("Using static data fallback for products");
        return devices;
    }

    // Merge DB data with Static data
    // We map over the STATIC data to ensure we keep the rich structure (specs, etc.)
    // If a static item has a matching slug in DB, we let the DB override its name.
    // Price is NOT overridable from the DB: it is always derived from the MSRP
    // (lib/pricing.ts), so the site can never drift from the pricing rule.
    // If a DB item is NEW (not in static), we might skip it for now or include it with minimal data
    const mergedDevices = devices.map(staticDevice => {
        const dbProduct = dbProducts.find(p => p.slug === staticDevice.id);

        if (dbProduct) {
            return {
                ...staticDevice,
                name: dbProduct.name, // Allow DB to override name
                // stockStatus: dbProduct.stock_status // If we had this field in static type
            };
        }
        return staticDevice;
    });

    return mergedDevices;
}

export async function getProductBySlug(slug: string): Promise<Device | undefined> {
    const products = await getAllProducts();
    return products.find(p => p.id === slug);
}
