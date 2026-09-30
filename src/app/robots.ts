import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-config'
import { PRIVATE_PATH_PREFIXES } from '@/lib/site-routes'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [...PRIVATE_PATH_PREFIXES], // Protect private routes from crawling
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    }
}
