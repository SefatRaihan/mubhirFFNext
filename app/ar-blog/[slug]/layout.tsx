import { Metadata } from 'next';
import { fetchBlogBySlug } from '@/lib/blog-api';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;

    let decodedSlug: string;
    try {
        decodedSlug = decodeURIComponent(slug);
    } catch {
        return {
            title: 'مقالة غير موجودة',
            description: 'المقالة المطلوبة غير موجودة',
        };
    }

    const articleUrl = `${baseUrl}/ar-blog/${decodedSlug}`;
    const blog = await fetchBlogBySlug(decodedSlug);

    if (!blog) {
        return {
            title: 'مقالة غير موجودة',
            description: 'المقالة المطلوبة غير موجودة',
            alternates: { canonical: articleUrl },
        };
    }

    const title = blog.seo?.page_title || blog.title;
    const description = blog.seo?.meta_description || blog.title;
    const ogTitle = blog.seo?.og_title || blog.title;
    const ogDescription = blog.seo?.og_description || blog.seo?.meta_description || blog.title;
    const ogImage = blog.seo?.og_image_url || blog.title_image_url;
    const twitterTitle = blog.seo?.twitter_title || blog.seo?.og_title || blog.title;
    const twitterDescription = blog.seo?.twitter_description || blog.seo?.meta_description || blog.title;
    const twitterImage = blog.seo?.twitter_image_url || blog.seo?.og_image_url || blog.title_image_url;

    return {
        title,
        description,
        alternates: {
            canonical: articleUrl,
        },
        openGraph: {
            type: 'article',
            title: ogTitle,
            description: ogDescription,
            url: articleUrl,
            siteName: 'مبهر',
            images: ogImage ? [
                {
                    url: ogImage,
                    alt: blog.title,
                }
            ] : [],
        },
        twitter: {
            card: (blog.seo?.twitter_card_type as 'summary' | 'summary_large_image') || 'summary_large_image',
            title: twitterTitle,
            description: twitterDescription,
            images: twitterImage ? [twitterImage] : [],
        },
    };
}

export default function BlogLayout({ children }: LayoutProps) {
    return <>{children}</>;
}
