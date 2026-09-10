import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'اختبار قدرات تجريبي للثانوي كمي ولفظي بالذكاء الاصطناعي',
    description: 'اختبار القدرات للثانوي بنظام محوسب يشمل اختبار القدرات تجريبي كمي ولفظي، مع تدريب عملي على اختبار تجريبي قدرات قبل الاختبار الرسمي وحاسبة النسبة الموزونة.',
    keywords: ['اختبار قدرات تجريبي', 'قدرات كمي ولفظي', 'تجميعات قدرات محوسب', 'تسريبات قدرات', 'اختبار تجريبي قياس', 'تدريب قدرات ثانوية عامة'],
    alternates: {
        canonical: `${baseUrl}/qudurat`,
    },
    openGraph: {
        title: 'اختبار قدرات تجريبي للثانوي كمي ولفظي بالذكاء الاصطناعي | منصة مبهر',
        description: 'اختبار القدرات للثانوي بنظام محوسب يشمل اختبار القدرات تجريبي كمي ولفظي، مع تدريب عملي على اختبار تجريبي قدرات قبل الاختبار الرسمي.',
        url: `${baseUrl}/qudurat`,
        siteName: 'منصة مبهر',
        locale: 'ar_SA',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'اختبار قدرات تجريبي للثانوي كمي ولفظي بالذكاء الاصطناعي | منصة مبهر',
        description: 'اختبار قدرات تجريبي كمي ولفظي بنماذج محاكية لاختبار قياس الفعلي.',
    },
};

const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'برنامج التحضير لاختبار القدرات العامة (كمي ولفظي)',
    description: 'برنامج تدريبي شامل لاختبار القدرات العامة للطلاب الثانويين مع تدريب تفاعلي بالذكاء الاصطناعي.',
    provider: {
        '@type': 'Organization',
        name: 'مبهر | Mubhir',
        sameAs: baseUrl,
    },
    inLanguage: 'ar',
};

export default function QuduratLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
            />
            {children}
        </>
    );
}
