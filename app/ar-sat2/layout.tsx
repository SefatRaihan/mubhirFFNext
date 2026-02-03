import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'اختبار SAT 2',
    description: 'استعد لاختبار SAT 2 مع منصة مبهر. تحضير شامل ومتكامل لاختبارات القدرات.',
    alternates: {
        canonical: `${baseUrl}/ar-sat2`,
    },
    openGraph: {
        title: 'اختبار SAT 2',
        description: 'استعد لاختبار SAT 2 مع منصة مبهر',
        url: `${baseUrl}/ar-sat2`,
    },
};

export default function ArSat2Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
