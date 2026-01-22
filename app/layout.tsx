import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "مبهر - شريك التحضير لاختبار قدرات بمساعدة الذكاء الاصطناعي",
  description: "مبهر يساعدك على التحضير لاختبار القدرات باستخدام الذكاء الاصطناعي من خلال تجارب تعليمية مخصصة.",
  keywords: "مبهر, اختبار القدرات, قدرات, ذكاء اصطناعي, تعلم, قدرات, تحضير",
  authors: [{ name: "مبهر" }],
  openGraph: {
    title: "مبهر - شريك التحضير لاختبار القدرات",
    description:
      "منصة ذكية تساعدك على الاستعداد لاختبار القدرات بتجربة تعليمية مخصصة.",
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
