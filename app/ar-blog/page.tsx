import Image from "next/image";
import Script from "next/script";
import Navbar from "@/components/Navber/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar/AnnouncementBar";
import Footer from "@/components/Footer/Footer";
import BlogListingClient from "./_components/BlogListingClient";
import { fetchBlogs } from "@/lib/blog-api";
import type { CategoryData } from "@/lib/types/blog";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mubhir.ai";

export const revalidate = 3600; // ISR: revalidate every 1 hour

function generateBlogSchema(categoryData: CategoryData[]) {
    const allBlogs = categoryData.flatMap(category => category.blogs);

    const blogPostingItems = allBlogs.map((blog, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "BlogPosting",
            "headline": blog.title,
            "url": `${baseUrl}/ar-blog/${blog.slug}`,
            "datePublished": blog.published_at,
            "image": blog.title_image_url || blog.blocks.find(b => b.type === "media" && b.file_url)?.file_url || `${baseUrl}/image/c1.png`,
            "author": {
                "@type": "Organization",
                "name": "مبهر",
                "url": baseUrl
            },
            "publisher": {
                "@type": "Organization",
                "name": "مبهر",
                "logo": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/image/logo.png`
                }
            }
        }
    }));

    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "مدونة مبهر",
        "description": "اكتشف أحدث المقالات والنصائح للتحضير لاختبار القدرات العامة",
        "url": `${baseUrl}/ar-blog`,
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": allBlogs.length,
            "itemListElement": blogPostingItems
        }
    };
}

export default async function ArBlogPage() {
    let categoryData: CategoryData[] = [];

    try {
        categoryData = await fetchBlogs();
    } catch {
        // If the API fails, render an empty state.
    }

    const hasBlogs = categoryData.length > 0 && categoryData.some(cat => cat.blogs.length > 0);

    return (
        <div className="bg-white font-sans overflow-x-hidden" dir="rtl">
            {hasBlogs && (
                <Script
                    id="blog-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateBlogSchema(categoryData))
                    }}
                />
            )}

            <header style={{ backgroundColor: "#f7e8f5" }} className="mb-4 md:m-4 rounded-0 md:rounded-2xl overflow-hidden">
                <AnnouncementBar />
                <Navbar />
                <div className="p-4">
                    <main>
                        {hasBlogs ? (
                            <BlogListingClient categoryData={categoryData} />
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-gray-600">لا توجد مدونات متاحة</p>
                            </div>
                        )}
                    </main>
                </div>
            </header>

            <section className="bg-[#691d5e] text-white rounded-lg my-4 md:m-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:pt-20">
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-right space-y-6">
                        <h2 className="text-4xl md:text-5xl font-semibold leading-snug">
                            ابدأ{" "}
                            <span className="relative inline-block pb-2">
                                رحلتك اليوم!
                                <Image
                                    src="/image/Vector 1.svg"
                                    alt="تسطير"
                                    width={100}
                                    height={8}
                                    className="bottom-0 w-full h-2 -z-10 pointer-events-none"
                                    style={{ height: 'auto' }}
                                />
                            </span>
                        </h2>
                        <p className="text-base md:text-lg">
                            ستكون في طريقك إلى نجاح قدرات في أي وقت من الأوقات.
                        </p>
                    </div>

                    <div className="order-last md:order-0 flex justify-center items-center">
                        <Image
                            src="/image/review-cover.png"
                            alt="صورة طالبة مبتسمة"
                            width={350}
                            height={350}
                            className="h-[350px] object-cover"
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
