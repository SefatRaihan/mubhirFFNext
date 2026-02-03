import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'اختبار القدرات العامة',
    description: 'استعد لاختبار القدرات العامة مع منصة مبهر. تحضير دقيق، خطة مدروسة ونتائج مبهرة.',
    alternates: {
        canonical: `${baseUrl}/ar-sat`,
    },
    openGraph: {
        title: 'اختبار القدرات العامة',
        description: 'استعد لاختبار القدرات العامة مع منصة مبهر',
        url: `${baseUrl}/ar-sat`,
    },
};

export default function ArSatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
