import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'اختبار قدرات تجريبي للثانوي كمي ولفظي بالذكاء الاصطناعي | مبهر',
    description: 'اختبار القدرات للثانوي بنظام محوسب يشمل اختبار القدرات تجريبي كمي ولفظي، مع تدريب عملي على اختبار تجريبي قدرات قبل الاختبار الرسمي.',
    alternates: {
        canonical: `${baseUrl}/qudurat`,
    },
    openGraph: {
        title: 'اختبار قدرات تجريبي للثانوي كمي ولفظي بالذكاء الاصطناعي | مبهر',
        description: 'اختبار القدرات للثانوي بنظام محوسب يشمل اختبار القدرات تجريبي كمي ولفظي، مع تدريب عملي على اختبار تجريبي قدرات قبل الاختبار الرسمي.',
        url: `${baseUrl}/qudurat`,
    },
};

export default function QuduratLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
