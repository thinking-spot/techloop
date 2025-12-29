import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/products';
import { categoryData } from "./browse/category-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://trytechloop.com';

    // 1. Static Pages
    const routes = [
        '',
        '/browse',
        '/how-it-works',
        '/pricing',
        '/partners',
        '/quiz',
        '/help',
        '/login',
        '/signup',
        '/waitlist',
        '/blog',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Dynamic Product Pages
    const products = await getAllProducts();
    const productRoutes = products.map((product) => ({
        url: `${baseUrl}/product/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
    }));

    // 3. Dynamic Category Pages
    const categoryRoutes = Object.keys(categoryData).map((category) => ({
        url: `${baseUrl}/browse/${category}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...routes, ...categoryRoutes, ...productRoutes];
}
