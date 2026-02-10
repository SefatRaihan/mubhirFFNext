import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'إعادة تعيين كلمة المرور',
    description: 'إعادة تعيين كلمة المرور لحسابك في منصة مبهر.',
    alternates: {
        canonical: `${baseUrl}/password-reset`,
    },
};

export default function PasswordResetLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
