import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'اختبار تحصيلي تجريبي بالذكاء الاصطناعي | مبهر',
    description: 'اختبار تحصيلي تجريبي بنظام تدريبي يشمل اختبار تحصيلي للرياضيات والفيزياء والكيمياء والأحياء، يساعدك على الاستعداد لاختبار تحصيلي بثقة قبل الاختبار الرسمي.',
    alternates: {
        canonical: `${baseUrl}/tahsili`,
    },
    openGraph: {
        title: 'اختبار تحصيلي تجريبي بالذكاء الاصطناعي | مبهر',
        description: 'اختبار تحصيلي تجريبي بنظام تدريبي يشمل اختبار تحصيلي للرياضيات والفيزياء والكيمياء والأحياء، يساعدك على الاستعداد لاختبار تحصيلي بثقة قبل الاختبار الرسمي.',
        url: `${baseUrl}/tahsili`,
    },
};

export default function TahsiliLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
