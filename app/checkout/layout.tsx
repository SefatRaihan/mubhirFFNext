import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
    title: 'إتمام الدفع',
    description: 'إتمام عملية الدفع والاشتراك في منصة مبهر.',
    alternates: {
        canonical: `${baseUrl}/checkout`,
    },
};

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
