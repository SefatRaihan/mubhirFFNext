"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import InstaIcon from "@/public/icons/InstaIcon";
import SnapIcon from "@/public/icons/SnapIcon";
import TelegramIcon from "@/public/icons/TelegramIcon";
import TiktokIcon from "@/public/icons/TiktokIcon";
import WhatsappIcon from "@/public/icons/WhatsappIcon";
import XIcon from "@/public/icons/XIcon";

export default function MaintenancePage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-linear-to-br from-[#2A056D] to-[#6F0767] flex items-center justify-center p-4" dir="rtl">
            <div className="max-w-4xl w-full">
                {/* Main Content Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center"
                >
                    {/* Logo/Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute inset-0 bg-linear-to-r from-[#671e5a] to-[#C445A6] rounded-full blur-xl opacity-50"
                            />
                            <div className="relative bg-linear-to-br from-[#671e5a] to-[#C445A6] rounded-full p-6 md:p-8">
                                <svg
                                    className="w-16 h-16 md:w-20 md:h-20 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Heading - Arabic */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
                    >
                        الموقع تحت الصيانة
                    </motion.h1>

                    {/* Subheading - English */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6"
                    >
                        Site Under Maintenance
                    </motion.h2>

                    {/* Description - Arabic */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-lg md:text-xl text-gray-600 mb-4 leading-relaxed"
                    >
                        نعمل حاليًا على تحسين تجربتك التعليمية. سنعود قريبًا بميزات جديدة ومحسّنة!
                    </motion.p>

                    {/* Description - English */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-base md:text-lg text-gray-500 mb-8"
                    >
                        We're currently improving your learning experience. We'll be back soon with new and enhanced features!
                    </motion.p>

                    {/* Animated Progress Indicator */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="mb-8"
                    >
                        <div className="flex justify-center gap-2">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.3, 1, 0.3],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                    }}
                                    className="w-3 h-3 md:w-4 md:h-4 bg-linear-to-r from-[#671e5a] to-[#C445A6] rounded-full"
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Estimated Time */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="bg-linear-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8"
                    >
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <svg
                                className="w-6 h-6 text-[#671e5a]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="text-lg font-semibold text-gray-800">
                                الوقت المتوقع للعودة
                            </p>
                        </div>
                        <p className="text-2xl font-bold text-[#671e5a]">
                            قريبًا جدًا
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                            Expected Return: Very Soon
                        </p>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="mb-8"
                    >
                        <p className="text-gray-700 mb-4 font-medium">
                            للاستفسارات العاجلة، تواصل معنا:
                        </p>
                        <p className="text-gray-600 mb-2">
                            For urgent inquiries, contact us:
                        </p>

                        {/* Social Media Links */}
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6">
                            {[
                                { href: "https://wa.me/966568876934", Icon: WhatsappIcon, bg: "bg-[#25D366]", label: "WhatsApp" },
                                { href: "https://www.instagram.com/mubhirai?igsh=MXBtcXdwOWV5NjdpOA==", Icon: InstaIcon, bg: "bg-[#C445A6]", label: "Instagram" },
                                { href: "https://www.tiktok.com/@mubhir.ai?_t=ZS-90FHdPykhaq&_r=1", Icon: TiktokIcon, bg: "bg-black", label: "TikTok" },
                                { href: "https://t.me/mubhirai", Icon: TelegramIcon, bg: "bg-[#0088cc]", label: "Telegram" },
                                { href: "https://x.com/Mubhir_AI?t=jLDoMMLZ4zctIJrMYdh_qw&s=09", Icon: XIcon, bg: "bg-black", label: "X" },
                                { href: "https://www.snapchat.com/add/mubhirai?share_id=KtsxCDNMDts&locale=en-US", Icon: SnapIcon, bg: "bg-[#FFFC00]", label: "Snapchat" }
                            ].map(({ href, Icon, bg, label }, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: 1 + index * 0.1, type: "spring", stiffness: 200 }}
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                                        <div className={`${bg} rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                                            <Icon />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Thank You Message */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="border-t border-gray-200 pt-6"
                    >
                        <p className="text-gray-600 font-medium">
                            شكرًا لصبركم وتفهمكم 💜
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                            Thank you for your patience and understanding
                        </p>
                    </motion.div>
                </motion.div>

                {/* Footer Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="text-center text-white/80 mt-6 text-sm"
                >
                    © 2026 مبهر - Mubhir. جميع الحقوق محفوظة - All rights reserved.
                </motion.p>
            </div>
        </div>
    );
}
