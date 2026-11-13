"use client";

export default function BlogContentStyles() {
    return (
        <style jsx global>{`
            .blog-content h1 {
                font-size: 2rem;
                font-weight: 700;
                margin-top: 2rem;
                margin-bottom: 1rem;
                color: #1a202c;
            }
            .blog-content h2 {
                font-size: 1.75rem;
                font-weight: 700;
                margin-top: 2rem;
                margin-bottom: 1rem;
                color: #671E5A;
            }
            .blog-content h3 {
                font-size: 1.5rem;
                font-weight: 600;
                margin-top: 1.5rem;
                margin-bottom: 0.75rem;
                color: #2d3748;
            }
            .blog-content p {
                margin-bottom: 1.25rem;
                line-height: 1.8;
                color: #1a202c;
            }
            .blog-content strong {
                font-weight: 700;
                color: #1a202c;
            }
            .blog-content ul, .blog-content ol {
                margin-bottom: 1.25rem;
                padding-right: 1.5rem;
            }
            .blog-content ul {
                list-style-type: disc;
                list-style-position: inside;
            }
            .blog-content ol {
                list-style-type: decimal;
                list-style-position: inside;
            }
            .blog-content ol li[data-list="bullet"] {
                list-style-type: disc;
            }
            .blog-content li {
                margin-bottom: 0.5rem;
                line-height: 1.8;
                display: list-item;
            }
            .blog-content a {
                color: #671e5a;
                text-decoration: underline;
            }
            .blog-content a:hover {
                color: #551749;
            }
            .blog-content blockquote {
                border-right: 4px solid #671e5a;
                padding-right: 1rem;
                margin: 1.5rem 0;
                font-style: italic;
                color: #4a5568;
            }
            .blog-content table {
                width: 100%;
                border-collapse: collapse;
                margin: 1.5rem 0;
                direction: rtl;
                border: 1px solid #d1d5db;
            }
            .blog-content thead {
                background-color: #f3f4f6;
            }
            .blog-content th,
            .blog-content tr:first-child td {
                padding: 12px 16px;
                text-align: right;
                font-weight: 700;
                color: #1a202c;
                border: 1px solid #d1d5db;
                background-color: #f3f4f6;
            }
            .blog-content td {
                padding: 10px 16px;
                text-align: right;
                color: #2d3748;
                border: 1px solid #d1d5db;
            }
        `}</style>
    );
}
