import type { BlogWithDetails, CategoryData, RelatedBlog } from "./types/blog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes TTL for fresh presigned S3 URLs

// In-memory cache with timestamp to serve fast responses while ensuring
// expiring presigned S3 URLs (24-hour AWS tokens) are periodically refreshed.
let cachedData: CategoryData[] | null = null;
let cacheTimestamp = 0;
let inflightFetch: Promise<CategoryData[]> | null = null;

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

    const now = Date.now();

    // 1. If cache is fresh, return immediately (< 1ms)
    if (cachedData && (now - cacheTimestamp < CACHE_TTL_MS)) {
        return cachedData;
    }

    // 2. If there is already an in-flight request, reuse it (prevents thundering herd)
    if (inflightFetch) {
        if (cachedData) {
            return cachedData; // Return stale data immediately without waiting
        }
        return inflightFetch;
    }

    // 3. Trigger fresh fetch
    const fetchPromise = (async () => {
        try {
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

            cachedData = data.data;
            cacheTimestamp = Date.now();
            return data.data;
        } catch (error) {
            // If the network call fails but we have stale cache, return it gracefully
            if (cachedData) {
                return cachedData;
            }
            throw error;
        } finally {
            inflightFetch = null;
        }
    })();

    inflightFetch = fetchPromise;

    // Stale-While-Revalidate: Return stale cached data immediately while refreshing in background
    if (cachedData) {
        return cachedData;
    }

    return fetchPromise;
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
