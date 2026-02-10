import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'إعادة تعيين كلمة المرور',
    description: 'إعادة تعيين كلمة المرور لحسابك في منصة مبهر.',
    alternates: {
        canonical: `${baseUrl}/reset-password`,
    },
};

export default function ResetPasswordLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
