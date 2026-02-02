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
async function generateMetadata({ params }) {
    const { slug } = await params;
    try {
        // Fetch blog data from API
        const apiUrl = `${("TURBOPACK compile-time value", "https://dev.mubhir.ai/api")}/get-blogs`;
        const response = await fetch(apiUrl, {
            cache: 'no-store'
        });
        const data = await response.json();
        if (data.success) {
            // Find the blog with matching slug
            let foundBlog = null;
            for (const category of data.data){
                const blog = category.blogs.find((b)=>b.slug === slug);
                if (blog) {
                    foundBlog = blog;
                    break;
                }
            }
            if (foundBlog && foundBlog.seo) {
                const seo = foundBlog.seo;
                return {
                    title: seo.page_title || foundBlog.title,
                    description: seo.meta_description || foundBlog.title,
                    openGraph: {
                        type: 'article',
                        title: seo.og_title || foundBlog.title,
                        description: seo.og_description || seo.meta_description || foundBlog.title,
                        images: seo.og_image_url || foundBlog.title_image_url ? [
                            {
                                url: seo.og_image_url || foundBlog.title_image_url,
                                alt: foundBlog.title
                            }
                        ] : [],
                        siteName: 'مبهر'
                    },
                    twitter: {
                        card: seo.twitter_card_type || 'summary_large_image',
                        title: seo.twitter_title || seo.og_title || foundBlog.title,
                        description: seo.twitter_description || seo.meta_description || foundBlog.title,
                        images: seo.twitter_image_url || seo.og_image_url || foundBlog.title_image_url ? [
                            seo.twitter_image_url || seo.og_image_url || foundBlog.title_image_url
                        ] : []
                    }
                };
            }
        }
    } catch (error) {
        console.error('Error fetching blog metadata:', error);
    }
    // Fallback metadata
    return {
        title: 'مبهر - مدونة',
        description: 'مدونة مبهر'
    };
}
function BlogLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
];

//# sourceMappingURL=app_ar-blog_%5Bslug%5D_layout_tsx_faf12c2d._.js.map