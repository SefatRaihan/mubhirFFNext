import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/ar-aboutUs`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/ar-contactUs`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/ar-sat`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/ar-sat2`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/ar-blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/packages`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
    ];

    // Fetch dynamic blog posts from API (if available)
    let blogPages: MetadataRoute.Sitemap = [];
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cms/blogs`, {
            next: { revalidate: 3600 }, // Revalidate every hour
        });

        if (response.ok) {
            const data = await response.json();
            const blogs = data.data || data.blogs || data || [];

            if (Array.isArray(blogs)) {
                blogPages = blogs.map((blog: any) => ({
                    url: `${baseUrl}/ar-blog/${blog.slug || blog.id}`,
                    lastModified: blog.updated_at ? new Date(blog.updated_at) : new Date(),
                    changeFrequency: 'weekly' as const,
                    priority: 0.6,
                }));
            }
        }
    } catch (error) {
        console.error('Failed to fetch blogs for sitemap:', error);
    }

    return [...staticPages, ...blogPages];
}
