import sanitizeHtml from "sanitize-html";

const defaultOptions: sanitizeHtml.IOptions = {
    allowedTags: [
        "p", "br", "strong", "b", "em", "i", "u", "s", "strike",
        "h1", "h2", "h3", "h4", "h5", "h6",
        "ul", "ol", "li",
        "blockquote",
        "a", "img",
        "table", "thead", "tbody", "tr", "th", "td"
    ],
    allowedAttributes: {
        a: ["href", "title", "target", "rel"],
        img: ["src", "alt", "title", "width", "height"],
        ol: ["data-list"],
        li: ["data-list"],
        th: ["colspan", "rowspan"],
        td: ["colspan", "rowspan"]
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
        a: sanitizeHtml.simpleTransform("a", {
            rel: "noopener noreferrer"
        })
    }
};

export function sanitizeArticleHtml(html: string): string {
    return sanitizeHtml(html, defaultOptions);
}
