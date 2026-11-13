import { sanitizeArticleHtml } from "@/lib/sanitize-html";
import type { BlogBlock } from "@/lib/types/blog";
import MediaCarousel from "./MediaCarousel";

interface ArticleContentProps {
    blocks: BlogBlock[];
    blogTitle: string;
}

export default function ArticleContent({ blocks, blogTitle }: ArticleContentProps) {
    if (blocks.length === 0) {
        return <p className="text-gray-600 text-center">لا يوجد محتوى متاح</p>;
    }

    const renderedElements: React.ReactElement[] = [];
    let i = 0;

    while (i < blocks.length) {
        const block = blocks[i];

        if (block.type === "text" && block.content) {
            renderedElements.push(
                <div
                    key={`text-${block.id}`}
                    className="mb-8 text-gray-900 leading-relaxed blog-content-text"
                    style={{
                        direction: 'rtl',
                        fontSize: '18px',
                        lineHeight: '1.8',
                        color: '#1a202c'
                    }}
                    dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(block.content) }}
                />
            );
            i++;
        } else if (block.type === "media" && block.file_url) {
            const mediaGroup: BlogBlock[] = [];
            let j = i;
            while (j < blocks.length && blocks[j].type === "media" && blocks[j].file_url) {
                mediaGroup.push(blocks[j]);
                j++;
            }

            renderedElements.push(
                <MediaCarousel
                    key={`media-group-${mediaGroup[0].id}`}
                    mediaGroup={mediaGroup}
                    blogTitle={blogTitle}
                />
            );

            i = j;
        } else {
            i++;
        }
    }

    return <div className="blog-content">{renderedElements}</div>;
}
