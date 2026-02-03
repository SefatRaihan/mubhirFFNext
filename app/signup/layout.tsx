import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'إنشاء حساب جديد | مبهر',
    description: 'أنشئ حسابك على منصة مبهر وابدأ رحلة التحضير لاختبار القدرات العامة مع أفضل الأدوات والموارد.',
    alternates: {
        canonical: `${baseUrl}/signup`,
    },
    openGraph: {
        title: 'إنشاء حساب جديد | مبهر',
        description: 'أنشئ حسابك على منصة مبهر وابدأ رحلة التحضير لاختبار القدرات',
        url: `${baseUrl}/signup`,
    },
};

export default function SignupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
