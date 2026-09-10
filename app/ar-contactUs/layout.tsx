import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'اتصل بنا | الدعم الفني وخدمة العملاء',
    description: 'تواصل مع فريق منصة مبهر للإجابة على جميع استفساراتك حول باقات القدرات والتحصيلي والدعم الفني عبر الواتساب وقنوات التواصل.',
    keywords: ['اتصل بنا مبهر', 'دعم منصة مبهر', 'خدمة عملاء مبهر', 'استفسارات القدرات والتحصيلي'],
    alternates: {
        canonical: `${baseUrl}/ar-contactUs`,
    },
    openGraph: {
        title: 'اتصل بنا | الدعم الفني وخدمة عملاء منصة مبهر',
        description: 'تواصل مع فريق منصة مبهر للإجابة على جميع استفساراتك حول باقات القدرات والتحصيلي والدعم الفني.',
        url: `${baseUrl}/ar-contactUs`,
        siteName: 'منصة مبهر',
        locale: 'ar_SA',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'اتصل بنا | الدعم الفني وخدمة عملاء منصة مبهر',
        description: 'تواصل مع فريق منصة مبهر للإجابة على استفساراتك حول باقات واختبارات القدرات والتحصيلي.',
    },
};

export default function ArContactUsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
