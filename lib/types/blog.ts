export interface BlogBlock {
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

export interface PostCategory {
    id: number;
    name: string;
}

export interface Author {
    id: number;
    name: string;
    designation: string;
    bio: string;
    image: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

export interface SEO {
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

export interface Blog {
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
    blocks: BlogBlock[];
}

export interface BlogWithDetails extends Blog {
    author: Author;
    seo?: SEO;
}

export interface CategoryData {
    category_id: number;
    category_name: string;
    blogs: Blog[];
}

export interface RelatedBlog {
    id: number;
    title: string;
    slug: string;
    title_image_url: string | null;
    post_category: PostCategory;
    blocks: BlogBlock[];
}
