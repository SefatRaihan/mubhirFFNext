import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'رمز التحقق',
    description: 'أدخل رمز التحقق لإعادة تعيين كلمة المرور في منصة مبهر.',
    alternates: {
        canonical: `${baseUrl}/reset-code`,
    },
};

export default function ResetCodeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
