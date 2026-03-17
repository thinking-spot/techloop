import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/products';
import { categoryData } from "./browse/category-data";
import { getAllBlogRoutes, getAllJobPageRoutes, getAllDevicePageRoutes } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.trytechloop.com';

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

    // 4. Dynamic Blog Posts
    const blogPosts = await getAllBlogRoutes();
    const blogRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // 5. Dynamic Job Pages
    const jobPages = await getAllJobPageRoutes();
    const jobRoutes = jobPages.map((page) => ({
        url: `${baseUrl}/for/${page.slug}`,
        lastModified: new Date(page.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // 6. Dynamic Device Content Pages
    const devicePages = await getAllDevicePageRoutes();
    const deviceRoutes = devicePages.map((page) => ({
        url: `${baseUrl}/device/${page.slug}`,
        lastModified: new Date(page.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [
        ...routes,
        ...categoryRoutes,
        ...productRoutes,
        ...blogRoutes,
        ...jobRoutes,
        ...deviceRoutes
    ];
}
