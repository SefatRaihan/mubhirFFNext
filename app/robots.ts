import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/checkout/',
                    '/confirmation/',
                    '/login/',
                    '/signup/',
                    '/create-password/',
                    '/password-reset/',
                    '/reset-code/',
                    '/reset-password/',
                    '/verification-code/',
                    '/maintenance/',
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
