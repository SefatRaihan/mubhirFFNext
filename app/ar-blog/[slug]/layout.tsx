import { Metadata } from 'next';
import Script from 'next/script';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://test.mubhir.ai';

interface Props {
    params: Promise<{ slug: string }>;
    children: React.ReactNode;
}

interface BlogData {
    id: number;
    title: string;
    slug: string;
    published_at: string;
    title_image_url: string | null;
    tags: string;
    blocks: Array<{
        type: string;
        content: string | null;
    }>;
    author?: {
        id: number;
        name: string;
        designation: string;
        bio: string;
        image_url: string;
    };
    post_category?: {
        id: number;
        name: string;
    };
    seo?: {
        page_title: string;
        meta_description: string;
        og_title: string;
        og_description: string | null;
        og_image_url: string | null;
        twitter_card_type: string;
        twitter_title: string | null;
        twitter_description: string | null;
        twitter_image_url: string | null;
    };
}

// Normalize Arabic text by removing diacritics for slug comparison
function normalizeArabicSlug(text: string): string {
    if (!text) return '';
    return text
        .replace(/[\u064B-\u065F]/g, '')
        .replace(/[\u0670]/g, '')
        .replace(/[\u06D6-\u06DC]/g, '')
        .replace(/[\u06DF-\u06E4]/g, '')
        .replace(/[\u06E7-\u06E8]/g, '')
        .replace(/[\u06EA-\u06ED]/g, '')
        .trim()
        .toLowerCase();
}

// Helper to fetch blog data
async function getBlogData(slug: string): Promise<BlogData | null> {
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/get-blogs`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.success) {
            const normalizedUrlSlug = normalizeArabicSlug(slug);
            for (const category of data.data) {
                const blog = category.blogs.find((b: BlogData) =>
                    normalizeArabicSlug(b.slug) === normalizedUrlSlug
                );
                if (blog) {
                    return blog;
                }
            }
        }
    } catch (error) {
        // console.error('Error fetching blog data:', error);
    }
    return null;
}

// Generate JSON-LD structured data for Article schema
function generateArticleJsonLd(blog: BlogData, articleUrl: string): string {
    // Extract article body from text blocks
    const articleBody = blog.blocks
        .filter(block => block.type === "text" && block.content)
        .map(block => block.content?.replace(/<[^>]*>/g, '').trim())
        .join(' ')
        .substring(0, 500);

    // Calculate word count for reading time
    const wordCount = blog.blocks
        .filter(block => block.type === "text" && block.content)
        .reduce((acc, block) => {
            const text = block.content?.replace(/<[^>]*>/g, '') || '';
            return acc + text.split(/\s+/).length;
        }, 0);

    // Ensure ISO 8601 date format
    const formatISODate = (dateString: string) => {
        try {
            return new Date(dateString).toISOString();
        } catch {
            return new Date().toISOString();
        }
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            // Article Schema
            {
                "@type": "BlogPosting",
                "@id": `${articleUrl}#article`,
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": articleUrl
                },
                "headline": blog.title,
                "description": blog.seo?.meta_description || blog.title,
                "image": {
                    "@type": "ImageObject",
                    "url": blog.title_image_url || blog.seo?.og_image_url || `${baseUrl}/image/c1.png`,
                    "width": 1200,
                    "height": 630
                },
                "datePublished": formatISODate(blog.published_at),
                "dateModified": formatISODate(blog.published_at),
                "author": {
                    "@type": "Person",
                    "@id": `${baseUrl}#author-${blog.author?.id || 1}`,
                    "name": blog.author?.name || "مبهر",
                    "description": blog.author?.bio || "",
                    "jobTitle": blog.author?.designation || "",
                    "image": blog.author?.image_url || ""
                },
                "publisher": {
                    "@type": "Organization",
                    "@id": `${baseUrl}#organization`,
                    "name": "مبهر",
                    "url": baseUrl,
                    "logo": {
                        "@type": "ImageObject",
                        "url": `${baseUrl}/image/logo.png`,
                        "width": 600,
                        "height": 60
                    }
                },
                "articleSection": blog.post_category?.name || "تعليم",
                "articleBody": articleBody,
                "keywords": blog.tags || "",
                "inLanguage": "ar",
                "wordCount": wordCount
            },
            // BreadcrumbList Schema
            {
                "@type": "BreadcrumbList",
                "@id": `${articleUrl}#breadcrumb`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "الرئيسية",
                        "item": baseUrl
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "المدونة",
                        "item": `${baseUrl}/ar-blog`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": blog.title,
                        "item": articleUrl
                    }
                ]
            },
            // Organization Schema
            {
                "@type": "Organization",
                "@id": `${baseUrl}#organization`,
                "name": "مبهر",
                "url": baseUrl,
                "logo": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/image/logo.png`,
                    "width": 600,
                    "height": 60
                },
                "description": "منصة التحضير لاختبار القدرات العامة",
                "sameAs": [
                    "https://www.instagram.com/mubhirai",
                    "https://www.tiktok.com/@mubhir.ai"
                ]
            }
        ]
    };

    return JSON.stringify(jsonLd);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const articleUrl = `${baseUrl}/ar-blog/${slug}`;
    const blog = await getBlogData(slug);

    if (blog && blog.seo) {
        const seo = blog.seo;
        return {
            title: seo.page_title || blog.title,
            description: seo.meta_description || blog.title,
            alternates: {
                canonical: articleUrl,
            },
            openGraph: {
                type: 'article',
                title: seo.og_title || blog.title,
                description: seo.og_description || seo.meta_description || blog.title,
                url: articleUrl,
                images: seo.og_image_url || blog.title_image_url ? [
                    {
                        url: seo.og_image_url || blog.title_image_url || '',
                        alt: blog.title,
                    }
                ] : [],
                siteName: 'مبهر',
            },
            twitter: {
                card: (seo.twitter_card_type as 'summary' | 'summary_large_image') || 'summary_large_image',
                title: seo.twitter_title || seo.og_title || blog.title,
                description: seo.twitter_description || seo.meta_description || blog.title,
                images: seo.twitter_image_url || seo.og_image_url || blog.title_image_url ? [
                    seo.twitter_image_url || seo.og_image_url || blog.title_image_url || ''
                ] : [],
            },
        };
    }

    // Fallback metadata
    return {
        title: 'مبهر - مدونة',
        description: 'مدونة مبهر',
        alternates: {
            canonical: articleUrl,
        },
    };
}

export default async function BlogLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const articleUrl = `${baseUrl}/ar-blog/${slug}`;
    const blog = await getBlogData(slug);

    return (
        <>
            {/* Server-side JSON-LD Structured Data for SEO */}
            {blog && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: generateArticleJsonLd(blog, articleUrl) }}
                />
            )}
            {children}
        </>
    );
}
