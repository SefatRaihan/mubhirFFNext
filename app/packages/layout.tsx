import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'اختر باقتك',
    description: 'اختر برنامج التحضير لاختبار القدرات المناسب لك. باقات مرنة تناسب جميع الطلاب.',
    alternates: {
        canonical: `${baseUrl}/packages`,
    },
    openGraph: {
        title: 'اختر باقتك',
        description: 'اختر برنامج التحضير لاختبار القدرات المناسب لك',
        url: `${baseUrl}/packages`,
    },
};

export default function PackagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
