"use client";

import CircleLeftArrowIcon from "@/public/icons/CircleLeftArrowIcon";
import CrossIcon from "@/public/icons/CrossIcon";
import Hamburger from "@/public/icons/Hamburger";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="p-4 bg-transparent">
      <nav className="bg-white rounded-full flex items-center justify-between px-6 py-3 shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-2 ">
          <Image
            src="/image/logo.png"
            alt="Mubhir Logo"
            width={500}
            height={500}
            className="h-8 w-8"
          />
          <Link
            href="/"
            className="text-xl font-semibold text-[#1c164e] hover:text-[#91288c] transition"
          >
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
            <Hamburger />
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-6 space-x-reverse font-medium text-sm">
          <Link
            href="/qudurat"
            className="text-[#1c164e] hover:text-[#91288c] transition"
          >
            دورات القدرات
          </Link>
          <Link
            href="/tahsili"
            className="text-[#1c164e] hover:text-[#91288c] transition"
          >
            دورات التحصيلي(قريبا)
          </Link>
          <Link
            href="/ar-aboutUs"
            className="text-[#1c164e] hover:text-[#91288c] transition"
          >
            من نحن
          </Link>
          <Link
            href="/ar-contactUs"
            className="text-[#1c164e] hover:text-[#91288c] transition"
          >
            اتصل بنا
          </Link>
          <Link
            href="/ar-blog"
            className="text-[#1c164e] hover:text-[#91288c] transition"
          >
            المدونة
          </Link>
        </div>

        {/* Buttons (Desktop) */}
        <div className="hidden md:flex items-center flex-row-reverse space-x-4 space-x-reverse">
          <Link href="/login">
            <button className="px-5 py-1.5 rounded-full bg-[#91288c] text-white font-medium text-sm hover:bg-[#7d1c79] transition">
              تسجيل الدخول
            </button>
          </Link>
          <Link href="/signup">
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
          className="md:hidden fixed inset-0 bg-white z-50 flex flex-col m-4 rounded-xl"
        >
          {/* Header with Logo and Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-[#D9D9D9]">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-[#1c164e]">مبهر</span>
              <Image
                src="/image/logo.png"
                alt="Mubhir Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
            </div>
            <button
              id="close-menu-btn"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1c164e]"
            >
              <CrossIcon />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <nav className="space-y-[8px]">
              <Link
                href="/qudurat"
                className="flex items-center justify-between py-3 text-[#1c164e] text-medium "
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>دورات القدرات</span>
                <CircleLeftArrowIcon />
              </Link>
              <Link
                href="/tahsili"
                className="flex items-center justify-between py-3 text-[#1c164e] text-medium "
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>دورات التحصيلي(قريبا)</span>
                <CircleLeftArrowIcon />
              </Link>
              <Link
                href="/ar-aboutUs"
                className="flex items-center justify-between py-3 text-[#1c164e] text-medium "
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>من نحن</span>
                <CircleLeftArrowIcon />
              </Link>
              <Link
                href="/ar-contactUs"
                className="flex items-center justify-between py-3 text-[#1c164e] text-medium "
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>اتصل بنا</span>
                <CircleLeftArrowIcon />
              </Link>
              <Link
                href="/ar-blog"
                className="flex items-center justify-between py-3 text-[#1c164e] text-medium "
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>المدونة</span>
                <CircleLeftArrowIcon />
              </Link>

            </nav>
          </div>

          {/* Bottom Buttons */}
          <div className="p-4 flex gap-3">
            <Link
              href="/signup"
              className="flex-1"
            >
              <button className="w-full px-6 py-3 rounded-full border border-[#91288c] text-[#91288c] font-medium hover:bg-[#f7ecf9] transition">
                تسجيل
              </button>
            </Link>
            <Link
              href="/login"
              className="flex-1"
            >
              <button className="w-full px-6 py-3 rounded-full bg-[#91288c] text-white font-medium hover:bg-[#7d1c79] transition">
                تسجيل الدخول
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
