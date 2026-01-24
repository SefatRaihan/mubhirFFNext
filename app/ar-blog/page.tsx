"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navber/Navbar";
import Footer from "@/components/Footer/Footer";
import PagiLeftArrowIcon from "@/public/icons/PagiLeftArrowIcon";
import PagiRightArrowIcon from "@/public/icons/PagiRightArrowIcon";

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

interface Blog {
    id: number;
    title: string;
    post_category_id: number;
    author_id: number;
    tags: string;
    published_at: string;
    is_published: boolean;
    views: number;
    post_category: PostCategory;
    blocks: BlogBlock[];
}

interface CategoryData {
    category_id: number;
    category_name: string;
    blogs: Blog[];
}

interface ApiResponse {
    success: boolean;
    data: CategoryData[];
}

export default function ArBlogPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [blogData, setBlogData] = useState<CategoryData[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 10;

    // Fetch blogs from API
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                console.log('Fetching from:', `${process.env.NEXT_PUBLIC_API_BASE_URL}/get-blogs`);

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get-blogs`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                console.log('Response status:', response.status);
                const data: ApiResponse = await response.json();
                console.log('API Response:', data);

                if (data.success) {
                    console.log('Blog data:', data.data);
                    setBlogData(data.data);
                } else {
                    console.error('API returned success: false');
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Set page title
    useEffect(() => {
        document.title = 'مبهر - المدونة';
    }, []);

    // Get all categories
    const categories = blogData.map(cat => ({
        id: cat.category_id,
        name: cat.category_name
    }));

    // Filter blogs based on selected category and search query
    const getFilteredBlogs = (): Blog[] => {
        let allBlogs: Blog[] = [];

        if (selectedCategory === null) {
            // Show all blogs from all categories
            blogData.forEach(category => {
                allBlogs = [...allBlogs, ...category.blogs];
            });
        } else {
            // Show blogs from selected category
            const selectedCat = blogData.find(cat => cat.category_id === selectedCategory);
            if (selectedCat) {
                allBlogs = selectedCat.blogs;
            }
        }

        // Apply search filter
        if (searchQuery.trim()) {
            allBlogs = allBlogs.filter(blog =>
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.tags.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return allBlogs;
    };

    const filteredBlogs = getFilteredBlogs();

    // Pagination logic
    const totalBlogs = filteredBlogs.length;
    const totalPages = Math.ceil(totalBlogs / blogsPerPage);
    const startIndex = (currentPage - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

    // Get first image from blog blocks
    const getFirstImage = (blocks: BlogBlock[]): string => {
        const imageBlock = blocks.find(block => block.type === "media" && block.file_url);
        return imageBlock?.file_url || "/image/c1.png"; // Fallback image
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

    // Calculate reading time (rough estimate based on content)
    const calculateReadingTime = (blocks: BlogBlock[]): number => {
        const textBlocks = blocks.filter(block => block.type === "text" && block.content);
        const totalWords = textBlocks.reduce((acc, block) => {
            const text = block.content?.replace(/<[^>]*>/g, '') || '';
            return acc + text.split(/\s+/).length;
        }, 0);
        return Math.max(1, Math.ceil(totalWords / 200)); // Assuming 200 words per minute
    };

    return (
        <div className="bg-white font-sans" dir="rtl">
            {/* First Section: Nav to Blog Cards */}
            <header style={{ backgroundColor: "#f7e8f5" }} className="m-4 rounded-2xl">
                <div className="p-4">
                    <Navbar />

                    {/* Main Content */}
                    <main className="max-w-6xl mx-auto px-4 py-6">
                        {/* Title and Search */}
                        <div className="mb-8 text-center mt-[60px]">
                            <h1 className="text-2xl md:text-[56px] font-semibold leading-tight md:leading-none">
                                مدونات مبھر{" "}
                                <span className="relative inline-block pb-2">
                                    للطلاب
                                    <Image
                                        src="/image/Vector 1.svg"
                                        alt="تسطير"
                                        width={100}
                                        height={10}
                                        className="absolute right-0 bottom-0 w-full h-[10px] pointer-events-none"
                                    />
                                </span>
                            </h1>

                            <div className="relative mb-4 max-w-2xl mx-auto mt-[20px]">
                                <input
                                    type="text"
                                    placeholder="ابحث في المدونات هنا..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setCurrentPage(1); // Reset to first page on search
                                    }}
                                    className="w-full p-3 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-right"
                                />
                                <svg
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>
                            </div>

                            {/* Filter Tags */}
                            <div className="flex flex-wrap justify-center gap-3 mt-6">
                                <button
                                    onClick={() => {
                                        setSelectedCategory(null);
                                        setCurrentPage(1);
                                    }}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === null
                                        ? "bg-[#671e5a] text-white"
                                        : "bg-white text-gray-700 border border-gray-300 hover:border-[#671e5a] hover:text-[#671e5a]"
                                        }`}
                                >
                                    الكل
                                </button>
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => {
                                            setSelectedCategory(category.id);
                                            setCurrentPage(1);
                                        }}
                                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.id
                                            ? "bg-[#671e5a] text-white"
                                            : "bg-white text-gray-700 border border-gray-300 hover:border-[#671e5a] hover:text-[#671e5a]"
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Blog Cards Grid */}
                        {loading ? (
                            <div className="text-center py-20">
                                <p className="text-gray-600">جاري التحميل...</p>
                            </div>
                        ) : currentBlogs.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-gray-600">لا توجد مدونات متاحة</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {currentBlogs.map((blog) => (
                                    <Link key={blog.id} href={`/ar-blogDetails/${blog.id}`} className="group">
                                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                            <div className="relative h-[240px] overflow-hidden">
                                                <Image
                                                    src={getFirstImage(blog.blocks)}
                                                    alt={blog.title}
                                                    width={600}
                                                    height={240}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-5">
                                                <span className="inline-block text-xs font-semibold px-3 py-1 bg-[#FFF5F7] text-[#671E5A] rounded-full mb-3">
                                                    {blog.post_category.name}
                                                </span>
                                                <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#671e5a] transition-colors">
                                                    {blog.title}
                                                </h2>
                                                <span className="text-sm text-gray-500">
                                                    {formatDate(blog.published_at)} - {calculateReadingTime(blog.blocks)} دقائق للقراءة
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {!loading && totalBlogs > 0 && (
                            <div className="flex justify-center items-center gap-4 mb-12">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    <PagiRightArrowIcon />
                                </button>
                                <div className="px-6 py-2">
                                    <span className="text-sm font-medium text-[#671E5A]">
                                        عرض {startIndex + 1}-{Math.min(endIndex, totalBlogs)} من أصل {totalBlogs}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    <PagiLeftArrowIcon />
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </header>

            {/* CTA Section */}
            <section className="bg-[#691d5e] text-white rounded-lg my-4 md:m-4 ">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:pt-20">
                    {/* Right Content */}
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-right space-y-6">
                        <h1 className="text-4xl md:text-5xl font-semibold leading-snug">
                            ابدأ{" "}
                            <span className="relative inline-block pb-2">
                                رحلتك اليوم!
                                <Image
                                    src="/image/Vector 1.svg"
                                    alt="underline"
                                    width={100}
                                    height={8}
                                    className="bottom-0 w-full h-2 -z-10 pointer-events-none"
                                />
                            </span>
                        </h1>
                        <p className="text-base md:text-lg">
                            ستكون في طريقك إلى نجاح قدرات في أي وقت من الأوقات.
                        </p>
                    </div>

                    {/* Image */}
                    <div className="order-last md:order-0 flex justify-center items-center">
                        <Image
                            src="/image/review-cover.png"
                            alt="طالبة"
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
