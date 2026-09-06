"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navber/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar/AnnouncementBar";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="bg-white min-h-screen flex flex-col" dir="rtl">
            {/* Hero Section with Navbar */}
            <section className="bg-linear-to-tr from-[#2A056D] to-[#6F0767] text-white mb-4 md:m-4 rounded-0 md:rounded-2xl overflow-hidden grow flex flex-col">
                {/* Navbar Component */}
                <AnnouncementBar />
                <Navbar />

                {/* 404 Content */}
                <div className="grow flex items-center justify-center p-4">
                    <div className="text-center">
                        {/* 404 Number */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mb-6"
                        >
                            <h1 className="text-[150px] md:text-[250px] font-bold leading-none text-white/20 select-none">
                                404
                            </h1>
                        </motion.div>

                        {/* Error Message */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                الصفحة غير موجودة
                            </h2>
                            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-md mx-auto">
                                عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها
                            </p>
                        </motion.div>

                        {/* Back to Home Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                        >
                            <Link href="/">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-2 pt-3 pb-3 px-8 bg-white text-[#671e5a] font-medium rounded-full shadow-lg hover:bg-[#671e5a] hover:text-white transition-colors duration-300 cursor-pointer text-lg"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 rotate-180"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                        />
                                    </svg>
                                    العودة للصفحة الرئيسية
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Decorative Elements */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="mt-16 flex justify-center gap-4"
                        >
                            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></span>
                            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-200"></span>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
