import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'المدونة | مبهر',
    description: 'اقرأ أحدث المقالات والنصائح للتحضير لاختبار القدرات العامة على منصة مبهر.',
    alternates: {
        canonical: `${baseUrl}/ar-blog`,
    },
    openGraph: {
        title: 'المدونة | مبهر',
        description: 'أحدث المقالات والنصائح للتحضير لاختبار القدرات',
        url: `${baseUrl}/ar-blog`,
    },
};

export default function ArBlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
