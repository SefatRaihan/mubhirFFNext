"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navber/Navbar";
import Footer from "@/components/Footer/Footer";
import {
    WhatsappShareButton,
    WhatsappIcon,
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
} from 'next-share';
import { useParams } from "next/navigation";
import CarLeftArrowIcon from "@/public/icons/CarLeftArrowIcon";
import CarRightArrowIcon from "@/public/icons/CarRightArrowIcon";

// TypeScript Interfaces
interface BlogBlock {
    id: number;
    blog_id: number;
    type: "text" | "media";
    content: string | null;
    file_path: string | null;
    file_type: string | null;
    file_name: string | null;
    alt_text: string | null;
    sort_order: number;
    file_url: string | null;
}

interface PostCategory {
    id: number;
    name: string;
}

interface Author {
    id: number;
    name: string;
    designation: string;
    bio: string;
    image: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

interface Blog {
    id: number;
    title: string;
    post_category_id: number;
    author_id: number;
    tags: string;
    published_at: string;
    is_published: boolean;
    title_image_url: string | null;
    slug: string;
    views: number;
    post_category: PostCategory;
    author: Author;
    blocks: BlogBlock[];
    seo?: SEO;
}

interface SEO {
    page_title: string;
    meta_description: string;
    og_title: string;
    og_description: string | null;
    og_image_url: string | null;
    twitter_card_type: string;
    twitter_title: string | null;
    twitter_description: string | null;
    twitter_image_url: string | null;
}

interface RelatedBlog {
    id: number;
    title: string;
    slug: string;
    title_image_url: string | null;
    post_category: PostCategory;
    blocks: BlogBlock[];
}

export default function BlogDetailsPage() {
    const params = useParams();
    // Decode the URL-encoded slug to handle Arabic characters
    const rawSlug = params?.slug as string;
    const blogSlug = rawSlug ? decodeURIComponent(rawSlug) : '';

    const [blog, setBlog] = useState<Blog | null>(null);
    const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([]);
    const [loading, setLoading] = useState(true);
    const [carouselIndices, setCarouselIndices] = useState<Record<string, number>>({});

    // Get current page URL for sharing
    const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://test.mubhir.ai/ar-blog/${blogSlug}`;
    const shareTitle = blog?.title || 'مبهر - مدونة';

    // Normalize Arabic text by removing diacritics (tashkeel) for slug comparison
    const normalizeArabicSlug = (text: string): string => {
        if (!text) return '';
        // Remove Arabic diacritics (harakat/tashkeel) - comprehensive range
        return text
            .replace(/[\u064B-\u065F]/g, '') // Remove all Arabic diacritics (fatha, damma, kasra, sukun, shadda, etc.)
            .replace(/[\u0670]/g, '') // Remove superscript alef
            .replace(/[\u06D6-\u06DC]/g, '') // Remove Quranic annotation marks
            .replace(/[\u06DF-\u06E4]/g, '') // Remove additional Arabic marks
            .replace(/[\u06E7-\u06E8]/g, '') // Remove more marks
            .replace(/[\u06EA-\u06ED]/g, '') // Remove final marks
            .trim()
            .toLowerCase();
    };

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                setLoading(true);
                // Use the blog API endpoint
                const apiUrl = `https://dev.mubhir.ai/api/get-blogs`;
                console.log('Fetching blogs from:', apiUrl);
                console.log('Looking for slug:', blogSlug);

                const response = await fetch(apiUrl);
                const data = await response.json();

                console.log('API Response:', data);

                if (data.success) {
                    // Normalize the URL slug for comparison
                    const normalizedUrlSlug = normalizeArabicSlug(blogSlug as string);
                    console.log('Normalized URL slug:', normalizedUrlSlug);

                    // Find the blog with matching slug across all categories
                    let foundBlog: Blog | null = null;
                    for (const category of data.data) {
                        const blog = category.blogs.find((b: Blog) => {
                            const normalizedApiSlug = normalizeArabicSlug(b.slug);
                            console.log('Comparing:', normalizedUrlSlug, '===', normalizedApiSlug);
                            return normalizedApiSlug === normalizedUrlSlug;
                        });
                        if (blog) {
                            foundBlog = blog;
                            break;
                        }
                    }

                    if (foundBlog) {
                        setBlog(foundBlog);
                        console.log('Found blog:', foundBlog);
                        console.log('Author data:', foundBlog.author);
                        document.title = `${foundBlog.title} - مبهر`;

                        // Fetch related blogs (same category)
                        fetchRelatedBlogs(foundBlog.post_category_id, foundBlog.id);
                    } else {
                        console.error('Blog not found with slug:', blogSlug);
                    }
                }
            } catch (error) {
                console.error("Error fetching blog details:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchRelatedBlogs = async (categoryId: number, currentBlogId: number) => {
            try {
                const response = await fetch(`https://dev.mubhir.ai/api/get-blogs`);
                const data = await response.json();

                if (data.success) {
                    const categoryData = data.data.find((cat: any) => cat.category_id === categoryId);
                    if (categoryData) {
                        const related = categoryData.blogs
                            .filter((b: Blog) => b.id !== currentBlogId)
                            .slice(0, 2);
                        setRelatedBlogs(related);
                    }
                }
            } catch (error) {
                console.error("Error fetching related blogs:", error);
            }
        };

        if (blogSlug) {
            fetchBlogDetails();
        }
    }, [blogSlug]);

    // Check if media is video
    const isVideo = (fileType: string | null): boolean => {
        if (!fileType) return false;
        const lowerType = fileType.toLowerCase();
        return lowerType === 'video' || lowerType.startsWith('video/') || ['mp4', 'webm', 'ogg', 'mov'].includes(lowerType);
    };

    // Format date
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Calculate reading time
    const calculateReadingTime = (blocks: BlogBlock[]): number => {
        const textBlocks = blocks.filter(block => block.type === "text" && block.content);
        const totalWords = textBlocks.reduce((acc, block) => {
            const text = block.content?.replace(/<[^>]*>/g, '') || '';
            return acc + text.split(/\s+/).length;
        }, 0);
        return Math.max(1, Math.ceil(totalWords / 200));
    };

    // Get first image for related blogs
    const getFirstImage = (blog: RelatedBlog): string => {
        if (blog.title_image_url) return blog.title_image_url;
        const mediaBlock = blog.blocks.find(block => block.type === "media" && block.file_url);
        return mediaBlock?.file_url || "/image/c1.png";
    };

    // Get all media blocks for carousel
    const getMediaBlocks = (blocks: BlogBlock[]): BlogBlock[] => {
        return blocks.filter(block => block.type === "media" && block.file_url);
    };

    // Carousel navigation for specific carousel group
    const nextImage = (groupKey: string, groupLength: number) => {
        setCarouselIndices(prev => ({
            ...prev,
            [groupKey]: ((prev[groupKey] || 0) + 1) % groupLength
        }));
    };

    const prevImage = (groupKey: string, groupLength: number) => {
        setCarouselIndices(prev => ({
            ...prev,
            [groupKey]: ((prev[groupKey] || 0) - 1 + groupLength) % groupLength
        }));
    };

    // Generate JSON-LD structured data for SEO
    const generateBlogJsonLd = () => {
        if (!blog) return null;

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';
        const blogUrl = `${baseUrl}/ar-blog/${blog.slug}`;

        const jsonLd = {
            "@context": "https://schema.org",
            "@graph": [
                // Article Schema
                {
                    "@type": "BlogPosting",
                    "@id": `${blogUrl}#article`,
                    "headline": blog.title,
                    "description": blog.seo?.meta_description || blog.title,
                    "image": blog.title_image_url || blog.seo?.og_image_url || `${baseUrl}/image/c1.png`,
                    "datePublished": blog.published_at,
                    "dateModified": blog.published_at,
                    "author": {
                        "@type": "Person",
                        "@id": `${baseUrl}#author-${blog.author?.id}`,
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
                            "url": `${baseUrl}/image/logo.png`
                        }
                    },
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": blogUrl
                    },
                    "articleSection": blog.post_category?.name || "تعليم",
                    "keywords": blog.tags || "",
                    "inLanguage": "ar",
                    "wordCount": calculateReadingTime(blog.blocks) * 200
                },
                // BreadcrumbList Schema
                {
                    "@type": "BreadcrumbList",
                    "@id": `${blogUrl}#breadcrumb`,
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
                            "item": blogUrl
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
                        "url": `${baseUrl}/image/logo.png`
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
    };

    // Update meta tags for SEO
    useEffect(() => {
        if (blog && blog.seo) {
            // Update title
            document.title = blog.seo.page_title || blog.title;

            // Update or create meta tags
            const updateMetaTag = (name: string, content: string, isProperty = false) => {
                const attribute = isProperty ? 'property' : 'name';
                let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

                if (!element) {
                    element = document.createElement('meta');
                    element.setAttribute(attribute, name);
                    document.head.appendChild(element);
                }
                element.content = content;
            };

            // Basic meta tags
            updateMetaTag('description', blog.seo.meta_description || blog.title);

            // Open Graph tags
            updateMetaTag('og:type', 'article', true);
            updateMetaTag('og:title', blog.seo.og_title || blog.title, true);
            updateMetaTag('og:description', blog.seo.og_description || blog.seo.meta_description || blog.title, true);
            updateMetaTag('og:image', blog.seo.og_image_url || blog.title_image_url || '', true);
            updateMetaTag('og:url', shareUrl, true);
            updateMetaTag('og:site_name', 'مبهر', true);

            // Twitter Card tags
            updateMetaTag('twitter:card', blog.seo.twitter_card_type || 'summary_large_image');
            updateMetaTag('twitter:title', blog.seo.twitter_title || blog.seo.og_title || blog.title);
            updateMetaTag('twitter:description', blog.seo.twitter_description || blog.seo.meta_description || blog.title);
            updateMetaTag('twitter:image', blog.seo.twitter_image_url || blog.seo.og_image_url || blog.title_image_url || '');
        }
    }, [blog, shareUrl]);

    if (loading) {
        return (
            <div className="bg-white font-sans min-h-screen flex items-center justify-center" dir="rtl">
                <p className="text-gray-600">جاري التحميل...</p>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="bg-white font-sans min-h-screen flex items-center justify-center" dir="rtl">
                <p className="text-gray-600">المدونة غير موجودة</p>
            </div>
        );
    }


    return (
        <div className="bg-white font-sans" dir="rtl">
            {/* JSON-LD Structured Data for SEO */}
            {blog && (
                <Script
                    id="blog-jsonld"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: generateBlogJsonLd() || '' }}
                    strategy="beforeInteractive"
                />
            )}

            {/* Header */}
            <header style={{ backgroundColor: "#F2F4F7" }} className="m-4 rounded-2xl">
                <div className="p-4">
                    <Navbar />
                </div>

                {/* Hero Section */}
                <section className="bg-[#F2F4F7] max-w-7xl mx-auto px-4 py-8">
                    {/* Title */}
                    <div className="flex items-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#1C164E] leading-tight">
                            {blog.title.split(' ').slice(0, -2).join(' ')}<br />
                            <span className="relative inline-block pb-2">
                                {blog.title.split(' ').slice(-2).join(' ')}
                                <Image
                                    src="/image/Vector 1.svg"
                                    alt="تسطير"
                                    width={200}
                                    height={10}
                                    className="absolute right-0 bottom-0 w-full h-[10px] pointer-events-none"
                                />
                            </span>
                        </h1>
                    </div>

                    {/* Image and Author Section */}
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Title Image */}
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

                        {/* Author Info */}
                        <div className="md:w-1/4 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center space-x-3 mb-4">
                                    {(() => {
                                        // Use image_url directly from API response, fallback to default avatar
                                        const authorImageUrl = blog.author?.image_url || "/image/avater1.png";
                                        console.log('Author image URL:', authorImageUrl);

                                        return (
                                            <Image
                                                src={authorImageUrl}
                                                alt={blog.author?.name || "المؤلف"}
                                                width={48}
                                                height={48}
                                                className="w-12 h-12 rounded-full object-cover"
                                                unoptimized
                                            />
                                        );
                                    })()}
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
                                <div className="flex space-x-3">
                                    <WhatsappShareButton url={shareUrl} title={shareTitle}>
                                        <WhatsappIcon size={32} round />
                                    </WhatsappShareButton>

                                    <a href="https://www.instagram.com/mubhirai" target="_blank" rel="noopener noreferrer" className="inline-flex">
                                        <div className="w-8 h-8 rounded-full bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            </svg>
                                        </div>
                                    </a>

                                    <a href="https://www.tiktok.com/@mubhir.ai" target="_blank" rel="noopener noreferrer" className="inline-flex">
                                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                            </svg>
                                        </div>
                                    </a>

                                    <TwitterShareButton url={shareUrl} title={shareTitle}>
                                        <TwitterIcon size={32} round />
                                    </TwitterShareButton>

                                    <FacebookShareButton url={shareUrl} quote={shareTitle}>
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </header>

            {/* Blog Content Section */}
            <section className="bg-white max-w-3xl mx-auto px-4 py-8 mt-5">
                <div className="blog-content text-right">
                    {blog.blocks.length === 0 && (
                        <p className="text-gray-600 text-center">لا يوجد محتوى متاح</p>
                    )}

                    {/* Render blocks with grouped media carousels */}
                    {(() => {
                        const renderedElements: React.ReactElement[] = [];
                        let i = 0;

                        while (i < blog.blocks.length) {
                            const block = blog.blocks[i];

                            // Handle text blocks
                            if (block.type === "text" && block.content) {
                                renderedElements.push(
                                    <div
                                        key={`text-${block.id}`}
                                        className="mb-8 text-gray-900 leading-relaxed"
                                        style={{
                                            direction: 'rtl',
                                            fontSize: '18px',
                                            lineHeight: '1.8',
                                            color: '#1a202c'
                                        }}
                                        dangerouslySetInnerHTML={{ __html: block.content }}
                                    />
                                );
                                i++;
                            }
                            // Handle media blocks - group consecutive ones
                            else if (block.type === "media" && block.file_url) {
                                // Collect all consecutive media blocks
                                const mediaGroup: BlogBlock[] = [];
                                let j = i;
                                while (j < blog.blocks.length && blog.blocks[j].type === "media" && blog.blocks[j].file_url) {
                                    mediaGroup.push(blog.blocks[j]);
                                    j++;
                                }

                                // Create a carousel for this media group
                                const groupKey = `media-group-${mediaGroup[0].id}`;
                                const currentIndex = carouselIndices[groupKey] || 0;
                                renderedElements.push(
                                    <div key={groupKey} className="mb-8">
                                        {(() => {
                                            const currentMedia = mediaGroup[currentIndex];
                                            const isVideoBlock = isVideo(currentMedia.file_type);

                                            return (
                                                <div>
                                                    {isVideoBlock ? (
                                                        <video
                                                            src={currentMedia.file_url || ''}
                                                            controls
                                                            className="w-full h-auto rounded-lg shadow-md"
                                                            playsInline
                                                        />
                                                    ) : (
                                                        <Image
                                                            src={currentMedia.file_url || '/image/c1.png'}
                                                            alt={currentMedia.alt_text || blog.title}
                                                            width={800}
                                                            height={500}
                                                            className="w-full h-auto rounded-lg shadow-md"
                                                        />
                                                    )}

                                                    {currentMedia.alt_text && (
                                                        <p className="text-center text-sm text-gray-600 mt-2">{currentMedia.alt_text}</p>
                                                    )}

                                                    {/* Carousel Navigation - only show if more than 1 media in group */}
                                                    {mediaGroup.length > 1 && (
                                                        <div className="flex justify-end mt-4 gap-3">
                                                            {/* Previous Arrow */}
                                                            <button
                                                                onClick={() => prevImage(groupKey, mediaGroup.length)}
                                                                className="w-12 h-12 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                                                                aria-label="الصورة السابقة"
                                                            >
                                                                <CarLeftArrowIcon />
                                                            </button>

                                                            {/* Next Arrow */}
                                                            <button
                                                                onClick={() => nextImage(groupKey, mediaGroup.length)}
                                                                className="w-12 h-12 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                                                                aria-label="الصورة التالية"
                                                            >
                                                                <CarRightArrowIcon />
                                                            </button>

                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })()}
                                    </div>
                                );

                                // Move index past all the media blocks we just processed
                                i = j;
                            }
                            else {
                                // Skip any other block types
                                i++;
                            }
                        }

                        return renderedElements;
                    })()}
                </div>

                <style jsx global>{`
                    .blog-content h1 {
                        font-size: 2rem;
                        font-weight: 700;
                        margin-top: 2rem;
                        margin-bottom: 1rem;
                        color: #1a202c;
                    }
                    .blog-content h2 {
                        font-size: 1.75rem;
                        font-weight: 700;
                        margin-top: 2rem;
                        margin-bottom: 1rem;
                        color: #671E5A;
                    }
                    .blog-content h3 {
                        font-size: 1.5rem;
                        font-weight: 600;
                        margin-top: 1.5rem;
                        margin-bottom: 0.75rem;
                        color: #2d3748;
                    }
                    .blog-content p {
                        margin-bottom: 1.25rem;
                        line-height: 1.8;
                        color: #1a202c;
                    }
                    .blog-content strong {
                        font-weight: 700;
                        color: #1a202c;
                    }
                    .blog-content ul, .blog-content ol {
                        margin-bottom: 1.25rem;
                        padding-right: 1.5rem;
                    }
                    .blog-content ul {
                        list-style-type: disc;
                        list-style-position: inside;
                    }
                    .blog-content ol {
                        list-style-type: decimal;
                        list-style-position: inside;
                    }
                    /* Handle Quill editor bullet lists (stored as ol with data-list="bullet") */
                    .blog-content ol li[data-list="bullet"] {
                        list-style-type: disc;
                    }
                    .blog-content li {
                        margin-bottom: 0.5rem;
                        line-height: 1.8;
                        display: list-item;
                    }
                    .blog-content a {
                        color: #671e5a;
                        text-decoration: underline;
                    }
                    .blog-content a:hover {
                        color: #551749;
                    }
                    .blog-content blockquote {
                        border-right: 4px solid #671e5a;
                        padding-right: 1rem;
                        margin: 1.5rem 0;
                        font-style: italic;
                        color: #4a5568;
                    }
                `}</style>
            </section >

            {/* Related Articles Section */}
            {
                relatedBlogs.length > 0 && (
                    <section className="font-sans text-gray-900 bg-[#EAECF0] m-4 rounded-2xl">
                        <div className="max-w-7xl mx-auto mb-12 px-4 py-8 sm:py-12">
                            <h1 className="text-3xl md:text-[38px] font-bold leading-tight">
                                اقرأ
                                <span className="relative inline-block pb-2 mx-2">
                                    مقالات
                                    <Image
                                        src="/image/Vector 1.svg"
                                        alt="تسطير"
                                        width={150}
                                        height={10}
                                        className="absolute right-0 bottom-0 w-full h-[10px] pointer-events-none"
                                    />
                                </span>
                                <span>ذات صلة</span>
                            </h1>
                            <p className="text-base mb-6 sm:mb-8">
                                اكتشف كيف يجعل التعلم المخصص بالذكاء الاصطناعي تحضير قدرات أكثر كفاءة وجاذبية.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-8 justify-center">
                                {relatedBlogs.map((relatedBlog) => (
                                    <Link key={relatedBlog.id} href={`/ar-blog/${relatedBlog.slug}`}>
                                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
                                            <Image
                                                src={getFirstImage(relatedBlog)}
                                                alt={relatedBlog.title}
                                                width={600}
                                                height={256}
                                                className="w-full h-64 object-cover"
                                            />
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
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            <Footer />
        </div >
    );
}
