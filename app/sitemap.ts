import type { MetadataRoute } from 'next';
import axios from 'axios';

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
            url: `${baseUrl}/qudurat`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/tahsili`,
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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get-blogs`);

        const data = response.data;

        // /get-blogs returns { success: true, data: [{ category_id, blogs: [...] }] }
        if (data.success && Array.isArray(data.data)) {
            // Flatten all blogs from all categories
            const allBlogs: any[] = [];
            data.data.forEach((category: any) => {
                if (Array.isArray(category.blogs)) {
                    allBlogs.push(...category.blogs);
                }
            });

            blogPages = allBlogs.map((blog: any) => ({
                url: `${baseUrl}/ar-blog/${blog.slug || blog.id}`,
                lastModified: blog.published_at ? new Date(blog.published_at) : new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            }));
        }
    } catch (error) {
        // console.error('Failed to fetch blogs for sitemap:', error);
    }

    return [...staticPages, ...blogPages];
}
