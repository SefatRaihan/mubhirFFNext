"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="p-4 bg-transparent">
      <nav className="bg-white rounded-full flex items-center justify-between px-6 py-3 shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-2 space-x-reverse">
          <Image
            src="/image/logo.png"
            alt="Mubhir Logo"
            width={500}
            height={500}
            className="h-8 w-8"
          />
          <Link href="/" className="text-xl font-semibold text-[#1c164e]">
            مبهر
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button
            id="hamburger-btn"
            onClick={() => setMobileMenuOpen(true)}
            className="text-[#1c164e] focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-6 space-x-reverse text-black font-medium text-sm">
          <Link href="/ar-sat">دورات القدرات</Link>
          <Link href="/ar-sat2">دورات التحصيلي(قريبا)</Link>
          <Link href="/ar-aboutUs">من نحن</Link>
          <Link href="/ar-contactUs">اتصل بنا</Link>
          <Link href="/ar-blog">المدونة</Link>
        </div>

        {/* Buttons (Desktop) */}
        <div className="hidden md:flex items-center flex-row-reverse space-x-4 space-x-reverse">
          <Link href={`${process.env.NEXT_PUBLIC_API_CMS_URL}/ar-login`}>
            <button className="px-5 py-1.5 rounded-full bg-[#91288c] text-white font-medium text-sm hover:bg-[#7d1c79] transition">
              تسجيل الدخول
            </button>
          </Link>
          <Link href={`${process.env.NEXT_PUBLIC_API_CMS_URL}/ar-signup`}>
            <button className="px-5 py-1.5 rounded-full border border-[#91288c] text-[#91288c] font-medium text-sm hover:bg-[#f7ecf9] transition">
              تسجيل
            </button>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center overflow-y-auto"
        >
          <button
            id="close-menu-btn"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 left-4 text-[#1c164e]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex flex-col items-center space-y-6 text-[#1c164e] font-medium text-lg">
            <Link
              href="/ar-sat"
              className="hover:text-[#91288c]"
              onClick={() => setMobileMenuOpen(false)}
            >
              دورات القدرات
            </Link>
            <Link
              href="/ar-sat2"
              className="hover:text-[#91288c]"
              onClick={() => setMobileMenuOpen(false)}
            >
              دورات التحصيلي(قريبا)
            </Link>
            <Link href="/ar-aboutUs" onClick={() => setMobileMenuOpen(false)}>
              من نحن
            </Link>
            <Link href="/ar-contactUs" onClick={() => setMobileMenuOpen(false)}>
              اتصل بنا
            </Link>
            <Link href="/ar-blog" onClick={() => setMobileMenuOpen(false)}>
              المدونة
            </Link>
            <Link href="https://cms.mubhir.ai/ar-signup">
              <button className="px-6 py-2 rounded-full border border-[#91288c] text-[#91288c] font-medium hover:bg-[#f7ecf9] transition">
                تسجيل
              </button>
            </Link>
            <Link href="https://cms.mubhir.ai/ar-login">
              <button className="px-6 py-2 rounded-full bg-[#91288c] text-white font-medium hover:bg-[#7d1c79] transition">
                تسجيل الدخول
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
