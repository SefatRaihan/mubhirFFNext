import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'تسجيل الدخول',
    description: 'سجل دخولك إلى منصة مبهر للتحضير لاختبار القدرات العامة. ابدأ رحلتك نحو التفوق.',
    alternates: {
        canonical: `${baseUrl}/login`,
    },
    openGraph: {
        title: 'تسجيل الدخول',
        description: 'سجل دخولك إلى منصة مبهر للتحضير لاختبار القدرات',
        url: `${baseUrl}/login`,
    },
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
