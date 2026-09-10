import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'من نحن | التدريب الذكي لاختبارات القدرات والتحصيلي',
    description: 'تعرف على رؤية منصة مبهر في تمكين الطلاب من التفوق في اختبارات القدرات والتحصيلي من خلال أحدث تقنيات الذكاء الاصطناعي وخطط التدريب المخصصة.',
    keywords: ['من نحن مبهر', 'منصة مبهر التعليمية', 'فريق مبهر', 'تدريب قدرات وتحصيلي', 'ذكاء اصطناعي للطلاب'],
    alternates: {
        canonical: `${baseUrl}/ar-aboutUs`,
    },
    openGraph: {
        title: 'من نحن | منصة مبهر للتدريب الذكي لاختبارات القدرات والتحصيلي',
        description: 'تعرف على رؤية منصة مبهر في تمكين الطلاب من التفوق في اختبارات القدرات والتحصيلي من خلال أحدث تقنيات الذكاء الاصطناعي.',
        url: `${baseUrl}/ar-aboutUs`,
        siteName: 'منصة مبهر',
        locale: 'ar_SA',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'من نحن | منصة مبهر للتدريب الذكي لاختبارات القدرات والتحصيلي',
        description: 'تعرف على رؤية منصة مبهر في تمكين الطلاب من التفوق في اختبارات القدرات والتحصيلي.',
    },
};

export default function ArAboutUsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
