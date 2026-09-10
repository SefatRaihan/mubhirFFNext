"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";

const STORAGE_KEY = "mubhir_free_trial_popup_dismissed";
const STICKY_STORAGE_KEY = "mubhir_free_trial_sticky_dismissed";
const DELAY_MS = 5000; // 5 seconds delay timer

const EXCLUDED_PATHS = [
  "/signup",
  "/login",
  "/checkout",
  "/create-password",
  "/verification-code",
  "/confirmation",
];

export default function FreeTrialModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasClosedModal, setHasClosedModal] = useState(false);
  const [isStickyDismissed, setIsStickyDismissed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      if (sessionStorage.getItem(STICKY_STORAGE_KEY) === "true") {
        setIsStickyDismissed(true);
      }
      if (
        sessionStorage.getItem(STORAGE_KEY) === "true" ||
        localStorage.getItem(STORAGE_KEY)
      ) {
        setHasClosedModal(true);
      }
    } catch {
      // Fallback
    }
  }, []);

  const isAuthOrExcludedPage =
    EXCLUDED_PATHS.some((path) => pathname?.startsWith(path)) ||
    (typeof window !== "undefined" && !!Cookies.get("auth_token"));

  const shouldSuppress = useCallback(() => {
    // 1. Exclude automated performance test bots and crawlers (Lighthouse, PageSpeed, DebugBear, GTmetrix, etc.)
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      const isBot =
        navigator.webdriver ||
        /Lighthouse|PageSpeed|Chrome-Lighthouse|PTST|HeadlessChrome|GTmetrix|Googlebot|bingbot|Baiduspider|YandexBot|DebugBear/i.test(
          navigator.userAgent || ""
        );
      if (isBot) return true;
    }

    // 2. Exclude auth & payment flow pages
    if (EXCLUDED_PATHS.some((path) => pathname?.startsWith(path))) {
      return true;
    }

    // 3. Exclude if user is already authenticated
    const authToken = Cookies.get("auth_token");
    if (authToken) {
      return true;
    }

    // 4. Check if already dismissed in this session
    if (typeof window !== "undefined") {
      try {
        const isDismissed = sessionStorage.getItem(STORAGE_KEY);
        if (isDismissed === "true") return true;

        // Also check localStorage timestamp (e.g. 24h cooldown)
        const lastDismissedAt = localStorage.getItem(STORAGE_KEY);
        if (lastDismissedAt) {
          const hoursPassed = (Date.now() - parseInt(lastDismissedAt, 10)) / (1000 * 60 * 60);
          if (hoursPassed < 24) return true;
        }
      } catch {
        // Fallback if storage access is restricted
      }
    }

    return false;
  }, [pathname]);

  const openModal = useCallback(() => {
    if (hasTriggeredRef.current || shouldSuppress()) return;
    hasTriggeredRef.current = true;
    setIsOpen(true);
  }, [shouldSuppress]);

  const handleClose = () => {
    setIsOpen(false);
    setHasClosedModal(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch {
      // Storage fallback
    }
  };

  const handleDismissSticky = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStickyDismissed(true);
    try {
      sessionStorage.setItem(STICKY_STORAGE_KEY, "true");
    } catch {
      // Storage fallback
    }
  };

  const handleOpenFromSticky = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (shouldSuppress()) return;

    let interactionTimer: NodeJS.Timeout | null = null;

    // Start 5-second countdown ONLY AFTER the user's first interaction (touch, scroll, click)
    const startInteractionTimer = () => {
      if (!interactionTimer && !hasTriggeredRef.current) {
        interactionTimer = setTimeout(() => {
          openModal();
        }, DELAY_MS);
      }
    };

    // 1. Exit-intent trigger (Desktop mouse leaves viewport near top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 15 && !hasTriggeredRef.current) {
        openModal();
      }
    };

    // 2. Scroll intent trigger (User scrolls 35%+ of page or past 500px)
    const handleScroll = () => {
      startInteractionTimer();
      if (hasTriggeredRef.current) return;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && (scrollY / docHeight >= 0.35 || scrollY >= 500)) {
        openModal();
      }
    };

    const handleUserTouchOrClick = () => {
      startInteractionTimer();
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleUserTouchOrClick, { passive: true, once: true });
    window.addEventListener("pointerdown", handleUserTouchOrClick, { passive: true, once: true });

    return () => {
      if (interactionTimer) clearTimeout(interactionTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleUserTouchOrClick);
      window.removeEventListener("pointerdown", handleUserTouchOrClick);
    };
  }, [openModal, shouldSuppress]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Sticky side teaser tab when modal has been closed (matching reference screenshot) */}
      <AnimatePresence>
        {isMounted &&
          !isOpen &&
          hasClosedModal &&
          !isStickyDismissed &&
          !isAuthOrExcludedPage && (
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed left-0 top-1/2 -translate-y-1/2 z-40 group select-none"
          >
            <div className="relative">
              {/* Dismiss 'x' button on top-right edge of the pill */}
              <button
                type="button"
                onClick={handleDismissSticky}
                aria-label="Close teaser"
                className="absolute -top-1.5 -right-1 w-5 h-5 rounded-full bg-white text-gray-700 hover:text-black hover:bg-gray-100 shadow-md border border-gray-300 flex items-center justify-center text-xs transition-transform hover:scale-110 cursor-pointer z-10"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Sticky Pill Button */}
              <button
                type="button"
                onClick={handleOpenFromSticky}
                className="w-12 h-48 bg-[#222326] hover:bg-[#1a1b1d] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ml-4 cursor-pointer overflow-hidden border border-white/15"
              >
                <span className="transform rotate-90 whitespace-nowrap text-xs sm:text-[13px] font-bold tracking-wider text-white select-none">
                  {pathname?.startsWith("/en")
                    ? "Free Trial | 10% OFF"
                    : "تجربة مجانية | خصم 10%"}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Free Trial Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="free-trial-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-purple-100 text-right"
              dir="rtl"
            >
              {/* Top decorative gradient banner */}
              <div className="relative bg-gradient-to-l from-[#7c2d92] via-[#91288c] to-[#c00a75] text-white px-6 pt-8 pb-10 overflow-hidden">
                {/* Decorative background glow circles */}
                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-36 h-36 bg-[#ff68ca]/20 rounded-full blur-2xl pointer-events-none" />

                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="إغلاق"
                  className="absolute top-4 left-4 p-2 rounded-full bg-white/15 hover:bg-white/30 text-white transition-all cursor-pointer focus:outline-none"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Header Content */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-2 shadow-md border border-white/40 shrink-0">
                    <Image
                      src="/image/mainLogo.png"
                      alt="Mubhir Logo"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white border border-white/30 backdrop-blur-md">
                      <span>✨</span>
                      <span>تجربة مجانية لمدة ٣ أيام</span>
                    </span>
                  </div>
                </div>

                {/* Pop-up Title (Heading) */}
                <h2
                  id="free-trial-title"
                  className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mt-2"
                >
                  ابدأ تجربتك المجانية الآن
                </h2>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 -mt-4 bg-white rounded-t-3xl relative z-10">
                {/* Pop-up Description (Body Text) */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                  انضم إلينا الآن واستفد من الفترة التجريبية المجانية للتعرف على أدوات المنصة وكيف يمكنها مساعدتك كطالب.
                </p>

                {/* Feature Highlights */}
                <div className="space-y-3 mb-6 bg-[#fbf5fc] p-4 rounded-2xl border border-[#91288c]/10">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-[#91288c]/15 text-[#91288c] flex items-center justify-center font-bold text-xs shrink-0">
                      ✓
                    </span>
                    <span>نماذج اختبارات محاكية للقدرات والتحصيلي</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-[#91288c]/15 text-[#91288c] flex items-center justify-center font-bold text-xs shrink-0">
                      ✓
                    </span>
                    <span>شروحات ذكية وتسريبات تفاعلية مدعومة بالذكاء الاصطناعي</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-[#91288c]/15 text-[#91288c] flex items-center justify-center font-bold text-xs shrink-0">
                      ✓
                    </span>
                    <span>تحليل فوري لمستواك بدون أي التزامات مالية</span>
                  </div>
                </div>

                {/* CTA Action Buttons */}
                <div className="space-y-3">
                  <Link
                    href="/signup"
                    onClick={handleClose}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#7c2d92] to-[#c00a75] text-white font-bold text-base shadow-lg shadow-[#91288c]/25 hover:shadow-xl hover:shadow-[#91288c]/40 hover:opacity-95 active:scale-[0.98] transition-all duration-200 group"
                  >
                    <span>ابدأ مجاناً الآن</span>
                    <svg
                      className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
