import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'باقات واشتراكات اختبارات القدرات والتحصيلي',
    description: 'اختر باقة التدريب المناسبة لك لاختبار القدرات أو التحصيلي مع منصة مبهر. باقات مرنة تشمل تجربة مجانية، بنك أسئلة محدث، وشروحات ذكاء اصطناعي تفاعلية.',
    keywords: ['باقات مبهر', 'اشتراك قدرات', 'اشتراك تحصيلي', 'اسعار دورات القدرات', 'باقات منصة مبهر', 'تجربة مجانية قدرات'],
    alternates: {
        canonical: `${baseUrl}/packages`,
    },
    openGraph: {
        title: 'باقات واشتراكات اختبارات القدرات والتحصيلي | منصة مبهر',
        description: 'اختر باقة التدريب المناسبة لك لاختبار القدرات أو التحصيلي مع منصة مبهر. باقات مرنة تشمل تجربة مجانية وبنك أسئلة محدث.',
        url: `${baseUrl}/packages`,
        siteName: 'منصة مبهر',
        locale: 'ar_SA',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'باقات واشتراكات اختبارات القدرات والتحصيلي | منصة مبهر',
        description: 'اختر باقة التدريب المناسبة لك في اختبارات القدرات والتحصيلي مع منصة مبهر.',
    },
};

export default function PackagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
