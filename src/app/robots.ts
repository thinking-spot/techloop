import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard/', '/api/', '/checkout/'], // Protect private routes from crawling
        },
        sitemap: 'https://trytechloop.com/sitemap.xml',
    }
}
