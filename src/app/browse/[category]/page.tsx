import { getAllProducts } from "@/lib/products";
import BrowseClient from "../_components/BrowseClient";
import { categoryData } from "../category-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// 1. Generate Static Params for SSG
export async function generateStaticParams() {
    return Object.keys(categoryData).map((category) => ({
        category: category,
    }));
}

// 2. Dynamic Metadata
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category } = await params;
    const data = categoryData[category];

    if (!data) {
        return {
            title: "Category Not Found | Techloop",
        };
    }

    return {
        title: data.metaTitle,
        description: data.metaDescription,
        openGraph: {
            title: data.metaTitle,
            description: data.metaDescription,
        }
    };
}

export const revalidate = 3600;

export default async function CategoryBrowsePage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const data = categoryData[category];

    if (!data) {
        notFound();
    }

    const devices = await getAllProducts();

    return (
        <BrowseClient
            initialDevices={devices}
            pageTitle={data.title}
            pageDescription={data.description}
            initialCategoryFilter={data.filterCategories}
            buyingGuideSlot={data.BuyingGuide}
        />
    );
}
