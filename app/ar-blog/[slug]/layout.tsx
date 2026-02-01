import { Metadata } from 'next';

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    try {
        // Fetch blog data from API
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/get-blogs`;
        const response = await fetch(apiUrl, { cache: 'no-store' });
        const data = await response.json();

        if (data.success) {
            // Find the blog with matching slug
            let foundBlog = null;
            for (const category of data.data) {
                const blog = category.blogs.find((b: any) => b.slug === slug);
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
                                alt: foundBlog.title,
                            }
                        ] : [],
                        siteName: 'مبهر',
                    },
                    twitter: {
                        card: (seo.twitter_card_type as 'summary' | 'summary_large_image') || 'summary_large_image',
                        title: seo.twitter_title || seo.og_title || foundBlog.title,
                        description: seo.twitter_description || seo.meta_description || foundBlog.title,
                        images: seo.twitter_image_url || seo.og_image_url || foundBlog.title_image_url ? [
                            seo.twitter_image_url || seo.og_image_url || foundBlog.title_image_url
                        ] : [],
                    },
                };
            }
        }
    } catch (error) {
        console.error('Error fetching blog metadata:', error);
    }

    // Fallback metadata
    return {
        title: 'مبهر - مدونة',
        description: 'مدونة مبهر',
    };
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
