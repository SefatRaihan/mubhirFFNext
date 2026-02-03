import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'من نحن',
    description: 'تعرف على منصة مبهر - منصة تعليمية احترافية تؤمن بأن لكل طالب الحق في الوصول إلى التميز والنجاح.',
    alternates: {
        canonical: `${baseUrl}/ar-aboutUs`,
    },
    openGraph: {
        title: 'من نحن',
        description: 'تعرف على منصة مبهر - منصة تعليمية احترافية',
        url: `${baseUrl}/ar-aboutUs`,
    },
};

export default function ArAboutUsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
