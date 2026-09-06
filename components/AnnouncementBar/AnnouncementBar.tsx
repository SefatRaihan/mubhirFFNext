"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AnnouncementBar() {
  const [showCopied, setShowCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopyCode = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const code = "SEP10";

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      // Only show popup on desktop / tablet (screen width >= 640px)
      if (typeof window !== "undefined" && window.innerWidth >= 640) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setShowCopied(true);
        timeoutRef.current = setTimeout(() => {
          setShowCopied(false);
        }, 1800);
      }
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <>
      {/* Desktop Bottom-Center Copied Toast with Smooth Animation */}
      <AnimatePresence>
        {showCopied && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 12, scale: 0.95, x: "-50%" }}
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 30,
              mass: 0.8,
            }}
            className="hidden sm:flex fixed bottom-8 left-1/2 bg-[#2d2d2d]/95 text-white text-xs sm:text-sm font-medium py-2 px-5 rounded-full shadow-2xl items-center justify-center pointer-events-none z-50 whitespace-nowrap"
          >
            Copied
          </motion.div>
        )}
      </AnimatePresence>

      <aside
        aria-label="Announcement"
        className="w-full bg-[#f7e8f5] text-[#111827] text-xs sm:text-sm font-medium py-2 px-3 sm:px-8 rounded-[2px] transition-all duration-300 relative z-30 select-none"
      >
        <div className="max-w-7xl mx-auto text-center leading-relaxed" dir="auto">
          <span>
            استخدم الكود{" "}
            <span
              onClick={handleCopyCode}
              title="اضغط لنسخ الكود"
              className="font-bold text-[#c00a75] cursor-pointer"
            >
              SEP10
            </span>{" "}
            واحصل على <span className="font-bold">خصم 10%</span> على جميع الاشتراكات طوال شهر سبتمبر.{" "}
          </span>
          <Link
            href="/packages"
            className="underline font-bold hover:opacity-80 transition-opacity inline whitespace-nowrap text-[#111827]"
          >
            اغتنم الفرصة الآن
          </Link>
        </div>
      </aside>
    </>
  );
}
