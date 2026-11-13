import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navber/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar/AnnouncementBar";
import Footer from "@/components/Footer/Footer";
import { fetchBlogs, fetchBlogBySlug, fetchRelatedBlogs } from "@/lib/blog-api";
import type { BlogBlock, BlogWithDetails, RelatedBlog } from "@/lib/types/blog";
import ArticleContent from "./_components/ArticleContent";
import BlogContentStyles from "./_components/BlogContentStyles";
import ShareButtons from "./_components/ShareButtons";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mubhir.ai";

export const revalidate = 3600; // ISR: revalidate every 1 hour

interface BlogDetailsPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    try {
        const categoryData = await fetchBlogs();
        const allBlogs = categoryData.flatMap(category => category.blogs);

        return allBlogs.map((blog) => ({
            slug: blog.slug,
        }));
    } catch {
        // If the API is unavailable at build time, return an empty list.
        // Pages will be generated on-demand at runtime and cached via ISR.
        return [];
    }
}

const isVideo = (fileType: string | null): boolean => {
    if (!fileType) return false;
    const lowerType = fileType.toLowerCase();
    return lowerType === 'video' || lowerType.startsWith('video/') || ['mp4', 'webm', 'ogg', 'mov'].includes(lowerType);
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const calculateReadingTime = (blocks: BlogBlock[]): number => {
    const textBlocks = blocks.filter(block => block.type === "text" && block.content);
    const totalWords = textBlocks.reduce((acc, block) => {
        const text = block.content?.replace(/<[^>]*>/g, '') || '';
        return acc + text.split(/\s+/).length;
    }, 0);
    return Math.max(1, Math.ceil(totalWords / 200));
};

const getFirstImage = (blog: RelatedBlog): string => {
    if (blog.title_image_url) return blog.title_image_url;
    const mediaBlock = blog.blocks.find(block => block.type === "media" && block.file_url);
    return mediaBlock?.file_url || "/image/c1.png";
};

const formatISODate = (dateString: string) => {
    try {
        return new Date(dateString).toISOString();
    } catch {
        return new Date().toISOString();
    }
};

function generateBlogJsonLd(blog: BlogWithDetails, articleUrl: string): string {
    const articleBody = blog.blocks
        .filter(block => block.type === "text" && block.content)
        .map(block => block.content?.replace(/<[^>]*>/g, '').trim())
        .join(' ')
        .substring(0, 500);

    const wordCount = blog.blocks
        .filter(block => block.type === "text" && block.content)
        .reduce((acc, block) => {
            const text = block.content?.replace(/<[^>]*>/g, '') || '';
            return acc + text.split(/\s+/).length;
        }, 0);

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
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

function splitTitle(title: string): { firstPart: string; lastTwoWords: string } {
    const words = title.split(' ');
    if (words.length <= 2) {
        return { firstPart: '', lastTwoWords: title };
    }
    return {
        firstPart: words.slice(0, -2).join(' '),
        lastTwoWords: words.slice(-2).join(' ')
    };
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
    const { slug } = await params;

    let decodedSlug: string;
    try {
        decodedSlug = decodeURIComponent(slug);
    } catch {
        notFound();
    }

    const articleUrl = `${baseUrl}/ar-blog/${decodedSlug}`;

    const blog = await fetchBlogBySlug(decodedSlug);

    if (!blog) {
        notFound();
    }

    const relatedBlogs = await fetchRelatedBlogs(blog.post_category_id, blog.id, 2);
    const shareTitle = blog.title;
    const { firstPart, lastTwoWords } = splitTitle(blog.title);

    return (
        <div className="bg-white font-sans" dir="rtl">
            <BlogContentStyles />
            <script
                id="blog-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: generateBlogJsonLd(blog, articleUrl) }}
            />

            <header style={{ backgroundColor: "#F2F4F7" }} className="m-4 rounded-2xl overflow-hidden">
                <AnnouncementBar />
                <Navbar />

                <section className="bg-[#F2F4F7] max-w-7xl mx-auto px-4 py-8">
                    <div className="flex items-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#1C164E] leading-tight">
                            {firstPart && `${firstPart} `}<br />
                            <span className="relative inline-block pb-2">
                                {lastTwoWords}
                                <Image
                                    src="/image/Vector 1.svg"
                                    alt="تسطير"
                                    width={200}
                                    height={10}
                                    className="absolute right-0 bottom-0 w-full h-[10px] pointer-events-none"
                                    style={{ height: 'auto' }}
                                />
                            </span>
                        </h1>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative flex-1">
                            {blog.title_image_url ? (
                                <Image
                                    src={blog.title_image_url}
                                    alt={blog.title}
                                    width={800}
                                    height={500}
                                    className="w-full h-auto rounded-lg shadow-md"
                                />
                            ) : (
                                <Image
                                    src="/image/c1.png"
                                    alt={blog.title}
                                    width={800}
                                    height={500}
                                    className="w-full h-auto rounded-lg shadow-md"
                                />
                            )}
                        </div>

                        <div className="md:w-1/4 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <Image
                                        src={blog.author?.image_url || "/image/avater1.png"}
                                        alt={blog.author?.name || "المؤلف"}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 rounded-full object-cover"
                                        unoptimized
                                    />
                                    <div>
                                        <p className="text-lg font-semibold text-[#1C164E] text-right">{blog.author?.name}</p>
                                        <p className="text-sm text-gray-600 text-right">
                                            {blog.author?.designation}
                                        </p>
                                        <p className="text-sm text-gray-600 text-right">
                                            {formatDate(blog.published_at)} • {calculateReadingTime(blog.blocks)} دقائق للقراءة
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {blog.tags && blog.tags.trim() && blog.tags.split(',').map((tag, index) => (
                                        <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-sm font-semibold text-[#1C164E] mb-2 text-right">شارك هذه المدونة</p>
                                <ShareButtons shareUrl={articleUrl} shareTitle={shareTitle} />
                            </div>
                        </div>
                    </div>
                </section>
            </header>

            <section className="bg-white max-w-3xl mx-auto px-4 py-8 mt-5">
                <div className="text-right">
                    <ArticleContent blocks={blog.blocks} blogTitle={blog.title} />
                </div>
            </section>

            {relatedBlogs.length > 0 && (
                <section className="font-sans text-gray-900 bg-[#EAECF0] m-4 rounded-2xl">
                    <div className="max-w-7xl mx-auto mb-12 px-4 py-8 sm:py-12">
                        <h2 className="text-3xl md:text-[38px] font-bold leading-tight">
                            اقرأ
                            <span className="relative inline-block pb-2 mx-2">
                                مقالات
                                <Image
                                    src="/image/Vector 1.svg"
                                    alt="تسطير"
                                    width={150}
                                    height={10}
                                    className="absolute right-0 bottom-0 w-full h-[10px] pointer-events-none"
                                    style={{ height: 'auto' }}
                                />
                            </span>
                            <span>ذات صلة</span>
                        </h2>
                        <p className="text-base mb-6 sm:mb-8">
                            اكتشف كيف يجعل التعلم المخصص بالذكاء الاصطناعي تحضير قدرات أكثر كفاءة وجاذبية.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-8 justify-center">
                            {relatedBlogs.map((relatedBlog) => {
                                const firstMedia = relatedBlog.blocks.find(b => b.type === "media" && b.file_url);
                                const isVideoMedia = !relatedBlog.title_image_url && firstMedia && isVideo(firstMedia.file_type);

                                return (
                                    <Link key={relatedBlog.id} href={`/ar-blog/${relatedBlog.slug}`}>
                                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
                                            {isVideoMedia ? (
                                                <video
                                                    src={firstMedia.file_url || ''}
                                                    className="w-full h-64 object-cover"
                                                    muted
                                                    playsInline
                                                />
                                            ) : (
                                                <Image
                                                    src={getFirstImage(relatedBlog)}
                                                    alt={relatedBlog.title}
                                                    width={600}
                                                    height={256}
                                                    className="w-full h-64 object-cover"
                                                />
                                            )}
                                            <div className="p-5">
                                                {relatedBlog.post_category && (
                                                    <span className="inline-block text-[#671E5A] bg-[#F5ECF4] px-3 py-1 rounded-full text-xs font-semibold mb-3">
                                                        {relatedBlog.post_category.name}
                                                    </span>
                                                )}
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-[#671E5A]">
                                                    {relatedBlog.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}
