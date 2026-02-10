import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'تأكيد',
    description: 'تأكيد العملية في منصة مبهر.',
    alternates: {
        canonical: `${baseUrl}/confirmation`,
    },
};

export default function ConfirmationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
