import { cache } from "react";
import type { BlogWithDetails, CategoryData, RelatedBlog } from "./types/blog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

export interface BlogsApiResponse {
    success: boolean;
    data: CategoryData[];
}

/**
 * Fetch blogs directly from API with cache: 'no-store'.
 * Wrapped in React cache() to deduplicate requests within a single render pass
 * (e.g. metadata + page render), while ensuring every user request gets fresh S3 URLs.
 */
export const fetchBlogs = cache(async (): Promise<CategoryData[]> => {
    if (!API_BASE_URL) {
        throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
    }

    const response = await fetch(`${API_BASE_URL}/get-blogs`, {
        cache: 'no-store', // Always retrieve fresh presigned S3 signatures from API
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`);
    }

    const data: BlogsApiResponse = await response.json();

    if (!data.success || !Array.isArray(data.data)) {
        throw new Error("Invalid response from /get-blogs");
    }

    return data.data;
});

export const fetchBlogBySlug = cache(async (slug: string): Promise<BlogWithDetails | null> => {
    const categoryData = await fetchBlogs();
    const normalizedUrlSlug = normalizeArabicSlug(slug);

    for (const category of categoryData) {
        const blog = category.blogs.find((b) =>
            normalizeArabicSlug(b.slug) === normalizedUrlSlug
        );
        if (blog) {
            return blog as BlogWithDetails;
        }
    }

    return null;
});

export const fetchRelatedBlogs = cache(async (
    categoryId: number,
    currentBlogId: number,
    limit = 2
): Promise<RelatedBlog[]> => {
    const categoryData = await fetchBlogs();
    const category = categoryData.find(cat => cat.category_id === categoryId);

    if (!category) return [];

    return category.blogs
        .filter(b => b.id !== currentBlogId)
        .slice(0, limit) as RelatedBlog[];
});
