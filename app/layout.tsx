'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>مبهر - شريك التحضير لاختبار قدرات بمساعدة الذكاء الاصطناعي</title>
        <meta name="description" content="مبهر يساعدك على التحضير لاختبار القدرات باستخدام الذكاء الاصطناعي من خلال تجارب تعليمية مخصصة." />
        <meta name="keywords" content="مبهر, اختبار القدرات, قدرات, ذكاء اصطناعي, تعلم, قدرات, تحضير" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <ToastContainer
          rtl={true}
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
