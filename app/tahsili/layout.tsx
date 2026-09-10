import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'اختبار تحصيلي تجريبي بالذكاء الاصطناعي وحاسبة الموزونة',
    description: 'اختبار تحصيلي تجريبي بنظام تدريبي يشمل اختبار تحصيلي للرياضيات والفيزياء والكيمياء والأحياء، وحاسبة النسبة الموزونة لمساعدتك على الاستعداد لاختبار التحصيلي بثقة.',
    keywords: ['اختبار تحصيلي تجريبي', 'تحصيلي علمي', 'تجميعات تحصيلي', 'تسريبات تحصيلي', 'حاسبة النسبة الموزونة', 'تحصيلي رياضيات وفيزياء وكيمياء واحياء'],
    alternates: {
        canonical: `${baseUrl}/tahsili`,
    },
    openGraph: {
        title: 'اختبار تحصيلي تجريبي بالذكاء الاصطناعي وحاسبة الموزونة | منصة مبهر',
        description: 'اختبار تحصيلي تجريبي بنظام تدريبي يشمل اختبار تحصيلي للرياضيات والفيزياء والكيمياء والأحياء، وحاسبة النسبة الموزونة.',
        url: `${baseUrl}/tahsili`,
        siteName: 'منصة مبهر',
        locale: 'ar_SA',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'اختبار تحصيلي تجريبي بالذكاء الاصطناعي وحاسبة الموزونة | منصة مبهر',
        description: 'اختبار تحصيلي تجريبي بنماذج محاكية لاختبار قياس التحصيلي الفعلي.',
    },
};

const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'برنامج التحضير لاختبار التحصيلي (علمي)',
    description: 'برنامج تدريبي شامل لاختبار التحصيلي للرياضيات والفيزياء والكيمياء والأحياء مع خطط تدريب تفاعلية بالذكاء الاصطناعي.',
    provider: {
        '@type': 'Organization',
        name: 'مبهر | Mubhir',
        sameAs: baseUrl,
    },
    inLanguage: 'ar',
};

export default function TahsiliLayout({
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
