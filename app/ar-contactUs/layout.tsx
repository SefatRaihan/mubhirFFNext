import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'اتصل بنا | مبهر',
    description: 'تواصل مع فريق منصة مبهر للإجابة على استفساراتك ومساعدتك في رحلة التحضير لاختبار القدرات.',
    alternates: {
        canonical: `${baseUrl}/ar-contactUs`,
    },
    openGraph: {
        title: 'اتصل بنا | مبهر',
        description: 'تواصل مع فريق منصة مبهر',
        url: `${baseUrl}/ar-contactUs`,
    },
};

export default function ArContactUsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
