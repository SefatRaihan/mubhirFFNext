import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'المدونة التعليمية | مقالات ونصائح لاختبارات القدرات والتحصيلي',
    description: 'اقرأ أحدث المقالات، استراتيجيات الحل السريع، وتجميعات القدرات العامة والتحصيلي لمساعدتك على تحقيق أعلى الدرجات والقبول الجامعي.',
    keywords: ['مدونة قدرات', 'مدونة تحصيلي', 'نصائح قياس', 'تجميعات اختبار القدرات', 'تسريبات تحصيلي', 'مبهر مدونة'],
    alternates: {
        canonical: `${baseUrl}/ar-blog`,
    },
    openGraph: {
        title: 'المدونة التعليمية | مقالات ونصائح لاختبارات القدرات والتحصيلي - مبهر',
        description: 'اقرأ أحدث المقالات، استراتيجيات الحل السريع، وتجميعات القدرات العامة والتحصيلي لمساعدتك على تحقيق أعلى الدرجات.',
        url: `${baseUrl}/ar-blog`,
        siteName: 'منصة مبهر',
        locale: 'ar_SA',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'المدونة التعليمية | مقالات ونصائح لاختبارات القدرات والتحصيلي - مبهر',
        description: 'اقرأ أحدث المقالات واستراتيجيات الحل السريع لاختبارات القدرات والتحصيلي.',
    },
};

export default function ArBlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
