import type { Metadata } from 'next';
import Script from 'next/script';
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
      <body suppressHydrationWarning>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PJGHWCK6');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PJGHWCK6"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
