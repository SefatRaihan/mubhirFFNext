import type { Metadata } from 'next';
import './globals.css';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'مبهر | أفضل منصة اختبارات تجريبية ومحاكية بالذكاء الاصطناعي',
  description: 'استعد للاختبارات منصة مبهر. نوفر لك نماذج اختبارات تجريبية محاكية، وتسريبات محلولة بالذكاء الاصطناعي لطلاب الثانوي. حسّن مستواك الآن',
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
    title: 'مبهر | أفضل منصة اختبارات تجريبية ومحاكية بالذكاء الاصطناعي',
    description: 'استعد للاختبارات منصة مبهر. نوفر لك نماذج اختبارات تجريبية محاكية، وتسريبات محلولة بالذكاء الاصطناعي لطلاب الثانوي. حسّن مستواك الآن',
    url: baseUrl,
    siteName: 'مبهر',
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مبهر | أفضل منصة اختبارات تجريبية ومحاكية بالذكاء الاصطناعي',
    description: 'استعد للاختبارات منصة مبهر. نوفر لك نماذج اختبارات تجريبية محاكية، وتسريبات محلولة بالذكاء الاصطناعي لطلاب الثانوي. حسّن مستواك الآن',
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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
