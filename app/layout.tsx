import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import FreeTrialModal from '@/components/FreeTrialModal/FreeTrialModal';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mubhir.ai';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'مبهر | أفضل منصة اختبارات تجريبية ومحاكية بالذكاء الاصطناعي',
    template: '%s | منصة مبهر',
  },
  description: 'استعد لاختبارات القدرات والتحصيلي مع منصة مبهر بالذكاء الاصطناعي. نوفر لك نماذج اختبارات تجريبية محاكية، تسريبات محلولة، وخطة تدريب مخصصة لرفع درجتك.',
  keywords: [
    'قدرات',
    'تحصيلي',
    'اختبار القدرات',
    'اختبار التحصيلي',
    'اختبار تجريبي قدرات',
    'اختبار تحصيلي تجريبي',
    'تجميعات قدرات',
    'تجميعات تحصيلي',
    'قياس',
    'مبهر',
    'منصة مبهر',
    'ذكاء اصطناعي تعليمي',
  ],
  authors: [{ name: 'Mubhir', url: baseUrl }],
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
    description: 'استعد لاختبارات القدرات والتحصيلي مع منصة مبهر بالذكاء الاصطناعي. نوفر لك نماذج اختبارات تجريبية محاكية، تسريبات محلولة، وخطة تدريب مخصصة لرفع درجتك.',
    url: baseUrl,
    siteName: 'منصة مبهر',
    locale: 'ar_SA',
    type: 'website',
    images: [
      {
        url: '/image/mainLogo.png',
        width: 800,
        height: 600,
        alt: 'منصة مبهر التعليمية',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مبهر | أفضل منصة اختبارات تجريبية ومحاكية بالذكاء الاصطناعي',
    description: 'استعد لاختبارات القدرات والتحصيلي مع منصة مبهر بالذكاء الاصطناعي. نماذج محاكية وتسريبات محلولة لرفع درجتك.',
    images: ['/image/mainLogo.png'],
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'مبهر | Mubhir',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/image/mainLogo.png`,
      },
      sameAs: [
        'https://x.com/Mubhir_AI',
        'https://www.instagram.com/mubhirai',
        'https://www.tiktok.com/@mubhir.ai',
        'https://t.me/mubhirai',
      ],
      description: 'منصة تعليمية ذكية متخصصة في التحضير لاختبارات القدرات العامة والتحصيلي بالذكاء الاصطناعي.',
    },
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: 'منصة مبهر',
      publisher: {
        '@id': `${baseUrl}/#organization`,
      },
      inLanguage: 'ar',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
        <FreeTrialModal />
      </body>
    </html>
  );
}
