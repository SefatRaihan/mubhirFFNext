import type { Metadata } from 'next';
import './globals.css';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'مبهر - منصة التحضير لاختبار القدرات العامة',
  description: 'مبهر شريكك الذكي لطريق التفوق في اختبار القدرات العامة. تحضير دقيق، خطة مدروسة ونتائج ملموسة تمكنك من التفوق بالذكاء الاصطناعي.',
  keywords: ['قدرات', 'اختبار القدرات', 'التحضير للقدرات', 'SAT', 'مبهر', 'تعليم', 'ذكاء اصطناعي'],
  authors: [{ name: 'Mubhir' }],
  creator: 'Mubhir',
  publisher: 'Mubhir',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'مبهر - منصة التحضير لاختبار القدرات العامة',
    description: 'مبهر شريكك الذكي لطريق التفوق في اختبار القدرات العامة',
    url: baseUrl,
    siteName: 'مبهر',
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مبهر - منصة التحضير لاختبار القدرات العامة',
    description: 'مبهر شريكك الذكي لطريق التفوق في اختبار القدرات العامة',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
