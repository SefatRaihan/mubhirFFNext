import type { BlogWithDetails, CategoryData, RelatedBlog } from "./types/blog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const REVALIDATE_SECONDS = 3600; // 1 hour

// In-memory cache to avoid fetching the 3 MB /get-blogs response multiple
// times during a single build/runtime session. Next.js fetch cache has a 2 MB
// limit, so it rejects this response; we memoize here as a fallback.
let blogsCache: Promise<CategoryData[]> | null = null;

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

export async function fetchBlogs(): Promise<CategoryData[]> {
    if (!API_BASE_URL) {
        throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
    }

    if (blogsCache) {
        return blogsCache;
    }

    blogsCache = (async () => {
        const response = await fetch(`${API_BASE_URL}/get-blogs`, {
            next: { revalidate: REVALIDATE_SECONDS },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`);
        }

        const data: BlogsApiResponse = await response.json();

        if (!data.success || !Array.isArray(data.data)) {
            throw new Error("Invalid response from /get-blogs");
        }

        return data.data;
    })();

    // If the promise rejects, clear the cache so the next call can retry.
    blogsCache.catch(() => {
        blogsCache = null;
    });

    return blogsCache;
}

export async function fetchBlogBySlug(slug: string): Promise<BlogWithDetails | null> {
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
}

export async function fetchRelatedBlogs(
    categoryId: number,
    currentBlogId: number,
    limit = 2
): Promise<RelatedBlog[]> {
    const categoryData = await fetchBlogs();
    const category = categoryData.find(cat => cat.category_id === categoryId);

    if (!category) return [];

    return category.blogs
        .filter(b => b.id !== currentBlogId)
        .slice(0, limit) as RelatedBlog[];
}
