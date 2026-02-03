module.exports = [
"[project]/app/ar-blog/[slug]/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogLayout,
    "generateMetadata",
    ()=>generateMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
const baseUrl = ("TURBOPACK compile-time value", "https://test.mubhir.ai") || 'https://test.mubhir.ai';
// Normalize Arabic text by removing diacritics for slug comparison
function normalizeArabicSlug(text) {
    if (!text) return '';
    return text.replace(/[\u064B-\u065F]/g, '').replace(/[\u0670]/g, '').replace(/[\u06D6-\u06DC]/g, '').replace(/[\u06DF-\u06E4]/g, '').replace(/[\u06E7-\u06E8]/g, '').replace(/[\u06EA-\u06ED]/g, '').trim().toLowerCase();
}
// Helper to fetch blog data
async function getBlogData(slug) {
    try {
        const apiUrl = `${("TURBOPACK compile-time value", "https://dev.mubhir.ai/api")}/get-blogs`;
        const response = await fetch(apiUrl, {
            cache: 'no-store'
        });
        const data = await response.json();
        if (data.success) {
            const normalizedUrlSlug = normalizeArabicSlug(slug);
            for (const category of data.data){
                const blog = category.blogs.find((b)=>normalizeArabicSlug(b.slug) === normalizedUrlSlug);
                if (blog) {
                    return blog;
                }
            }
        }
    } catch (error) {
        console.error('Error fetching blog data:', error);
    }
    return null;
}
// Generate JSON-LD structured data for Article schema
function generateArticleJsonLd(blog, articleUrl) {
    // Extract article body from text blocks
    const articleBody = blog.blocks.filter((block)=>block.type === "text" && block.content).map((block)=>block.content?.replace(/<[^>]*>/g, '').trim()).join(' ').substring(0, 500);
    // Calculate word count for reading time
    const wordCount = blog.blocks.filter((block)=>block.type === "text" && block.content).reduce((acc, block)=>{
        const text = block.content?.replace(/<[^>]*>/g, '') || '';
        return acc + text.split(/\s+/).length;
    }, 0);
    // Ensure ISO 8601 date format
    const formatISODate = (dateString)=>{
        try {
            return new Date(dateString).toISOString();
        } catch  {
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
async function generateMetadata({ params }) {
    const { slug } = await params;
    const articleUrl = `${baseUrl}/ar-blog/${slug}`;
    const blog = await getBlogData(slug);
    if (blog && blog.seo) {
        const seo = blog.seo;
        return {
            title: seo.page_title || blog.title,
            description: seo.meta_description || blog.title,
            alternates: {
                canonical: articleUrl
            },
            openGraph: {
                type: 'article',
                title: seo.og_title || blog.title,
                description: seo.og_description || seo.meta_description || blog.title,
                url: articleUrl,
                images: seo.og_image_url || blog.title_image_url ? [
                    {
                        url: seo.og_image_url || blog.title_image_url || '',
                        alt: blog.title
                    }
                ] : [],
                siteName: 'مبهر'
            },
            twitter: {
                card: seo.twitter_card_type || 'summary_large_image',
                title: seo.twitter_title || seo.og_title || blog.title,
                description: seo.twitter_description || seo.meta_description || blog.title,
                images: seo.twitter_image_url || seo.og_image_url || blog.title_image_url ? [
                    seo.twitter_image_url || seo.og_image_url || blog.title_image_url || ''
                ] : []
            }
        };
    }
    // Fallback metadata
    return {
        title: 'مبهر - مدونة',
        description: 'مدونة مبهر',
        alternates: {
            canonical: articleUrl
        }
    };
}
async function BlogLayout({ children, params }) {
    const { slug } = await params;
    const articleUrl = `${baseUrl}/ar-blog/${slug}`;
    const blog = await getBlogData(slug);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            blog && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: {
                    __html: generateArticleJsonLd(blog, articleUrl)
                }
            }, void 0, false, {
                fileName: "[project]/app/ar-blog/[slug]/layout.tsx",
                lineNumber: 268,
                columnNumber: 17
            }, this),
            children
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=app_ar-blog_%5Bslug%5D_layout_tsx_faf12c2d._.js.map