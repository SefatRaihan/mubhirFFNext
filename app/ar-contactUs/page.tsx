"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navber/Navbar";
import Footer from "@/components/Footer/Footer";
import WhatsappIcon from "@/public/icons/WhatsappIcon";
import InstaIcon from "@/public/icons/InstaIcon";
import TiktokIcon from "@/public/icons/TiktokIcon";
import TelegramIcon from "@/public/icons/TelegramIcon";
import XIcon from "@/public/icons/XIcon";
import SnapIcon from "@/public/icons/SnapIcon";
import LeftArrow from "@/public/icons/LeftArrow";
import { motion } from "framer-motion";

export default function ArContactUsPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const bodyData = {
            name: formData.fullName.trim(),
            email: formData.email.trim(),
            phone: "+966" + formData.phoneNumber.trim(),
            message: formData.message.trim(),
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact-us`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData),
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message || "تم إرسال رسالتك بنجاح!");
                setFormData({
                    fullName: "",
                    email: "",
                    phoneNumber: "",
                    message: "",
                });
            } else {
                alert("حدث خطأ: " + (data.message || "يرجى المحاولة مرة أخرى"));
            }
        } catch (error) {
            // console.error("Error:", error);
            alert("خطأ في الشبكة، يرجى المحاولة لاحقاً.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white" dir="rtl">
            {/* Header Section */}
            <header className="bg-linear-to-tr from-[#2A056D] to-[#6F0767] text-white m-4 rounded-2xl">
                <Navbar />
                <div className="p-4">
                    {/* Hero Section */}
                    <div className="relative text-center mt-16 md:mt-[128px]">
                        <div className="flex space-x-4 justify-between md:justify-center gap-0 space-x-reverse md:space-x-0 mb-4 md:mb-0">
                            <motion.span
                                initial={{ opacity: 0, scale: 0, rotate: -15 }}
                                animate={{ opacity: 1, scale: 1, rotate: -15 }}
                                transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                                className="transform rotate-[-15deg] md:rotate-[-25deg] md:absolute md:right-40 md:top-60 bg-blue-600 text-white px-4 py-1 rounded-full text-xs md:text-sm font-semibold shadow-md"
                                dir="ltr"
                            >
                                #دعم
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, scale: 0, rotate: 15 }}
                                animate={{ opacity: 1, scale: 1, rotate: 15 }}
                                transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
                                className="transform -rotate-15 md:-rotate-25 md:absolute md:left-40 md:top-60 bg-purple-600 text-white px-4 py-1 rounded-full text-xs md:text-sm font-semibold shadow-md"
                            >
                                #مساعدة
                            </motion.span>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                            className="text-4xl md:text-[76px] font-bold leading-tight md:leading-none"
                        >
                            تواصل معنا
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                            className="mt-4 text-base md:text-lg max-w-md md:max-w-xl mx-auto text-gray-200"
                        >
                            رحلتك التعليمية الأحترافية تبدأ مع مبهر لماذا تبحث طويلاً؟ منصتنا
                            تجعل التعلم أسرع، أسهل، وأكثر متعة، بفضل أحدث التقنيات التعليمية
                            المتطورة، إذا كنت تستعد لاختبارات القدرات العامة وترغب بالتعرف على
                            منصتنا الذكية، نحن هنا من أجلك، ونسعد دائما بالتواصل معك
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                            className="mt-6 flex justify-center items-center space-x-4 space-x-reverse cursor-pointer"
                        >
                            <div className="relative inline-block">
                                {/* <Link href="https://cms.mubhir.ai/ar-select-package"> */}
                                <Link href="/packages">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center pt-1 pr-6 pb-1 pl-1 bg-white text-[#671e5a] font-medium rounded-full shadow-lg hover:bg-[#671e5a] hover:text-white transition-colors duration-300"
                                    >
                                        أكتشف الأن
                                        <span className="relative flex items-center justify-center mr-3 bg-[#671e5a] text-white rounded-full">
                                            <LeftArrow />
                                        </span>
                                    </motion.button>
                                </Link>
                                <Image
                                    src="/image/bitcoin2.png"
                                    className="absolute right-32 md:right-33 top-6"
                                    alt="bitcoin2"
                                    width={50}
                                    height={50}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Social Section */}
                    <div className="mx-6 md:mx-[48px] mt-24 md:mt-[206px] flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
                            className="flex flex-col md:flex-row items-center md:space-x-2 md:space-x-reverse mb-0 md:mb-[48px] order-1 md:order-1"
                        >
                            <div className="flex -space-x-2 mb-4 md:mb-0">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: 1.1, type: "spring", stiffness: 200 }}
                                    className="w-10 h-10 md:w-[55px] md:h-[55px] bg-gray-300 rounded-full border-2 border-white"
                                >
                                    <Image
                                        src="/image/Image-28.png"
                                        alt="student1"
                                        width={55}
                                        height={55}
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: 1.2, type: "spring", stiffness: 200 }}
                                    className="w-10 h-10 md:w-[55px] md:h-[55px] bg-gray-300 rounded-full border-2 border-white"
                                >
                                    <Image
                                        src="/image/Image-29.png"
                                        alt="student2"
                                        width={55}
                                        height={55}
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: 1.3, type: "spring", stiffness: 200 }}
                                    className="w-10 h-10 md:w-[55px] md:h-[55px] bg-gray-300 rounded-full border-2 border-white"
                                >
                                    <Image
                                        src="/image/Image-30.png"
                                        alt="student3"
                                        width={55}
                                        height={55}
                                    />
                                </motion.div>
                            </div>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 1.4 }}
                                className="px-2 font-semibold text-sm text-center md:text-base md:text-right"
                            >
                                الكثير من الطلاب انضموا <br /> إلينا واستفادوا بمزايا منصتنا
                            </motion.span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                            className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 order-2 md:order-2 mt-6 md:mt-0"
                            style={{ marginBottom: "60px" }}
                        >
                            {[
                                { href: "https://wa.me/966568876934", ariaLabel: "تواصل معنا عبر واتساب", Icon: WhatsappIcon, bg: "bg-white", delay: 1.3 },
                                { href: "https://www.instagram.com/mubhirai?igsh=MXBtcXdwOWV5NjdpOA==", ariaLabel: "تواصل معنا عبر إنستغرام", Icon: InstaIcon, bg: "bg-[#C445A6]", delay: 1.4 },
                                { href: "https://www.tiktok.com/@mubhir.ai?_t=ZS-90FHdPykhaq&_r=1", ariaLabel: "تواصل معنا عبر تيك توك", Icon: TiktokIcon, bg: "bg-white", delay: 1.5 },
                                { href: "https://t.me/mubhirai", ariaLabel: "تواصل معنا عبر تيليجرام", Icon: TelegramIcon, bg: "bg-white", delay: 1.6 },
                                { href: "https://x.com/Mubhir_AI?t=jLDoMMLZ4zctIJrMYdh_qw&s=09", ariaLabel: "تواصل معنا عبر تويتر", Icon: XIcon, bg: "bg-white", delay: 1.7 },
                                { href: "https://www.snapchat.com/add/mubhirai?share_id=KtsxCDNMDts&locale=en-US", ariaLabel: "تواصل معنا عبر سناب شات", Icon: SnapIcon, bg: "bg-white", delay: 1.8 }
                            ].map(({ href, ariaLabel, Icon, bg, delay }, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay, type: "spring", stiffness: 200 }}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Link href={href} aria-label={ariaLabel}>
                                        <div className={`${bg} rounded-full p-2.5 md:p-[8.18px]`}>
                                            <Icon />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Contact Form Section */}
            <section className="mx-auto max-w-6xl shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Right: Contact Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="lg:col-span-5 border-t lg:border-t-0 p-6 sm:p-10 flex flex-col"
                    >
                        <motion.header
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mb-8"
                        >
                            <h2 className="text-4xl font-bold text-gray-900 mb-2">
                                نموذج الاتصال
                            </h2>
                            <p className="text-gray-500">نحن نحب أن يَسمع فريقنا منك!</p>
                        </motion.header>

                        <div className="space-y-5">
                            {/* Twitter (X) card */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                whileHover={{ scale: 1.02, x: -5 }}
                                className="flex items-center gap-[20px] rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 cursor-pointer"
                            >
                                <span className="shrink-0 grid place-items-center size-10 rounded-full bg-white border border-gray-200">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M18 2h3l-7.5 8.5L22 22h-7l-4.5-6L5 22H2l8-9.1L2 2h7l4 5.3L18 2z" />
                                    </svg>
                                </span>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">(X) تويتر</div>
                                    <div className="text-lg font-semibold text-gray-800">
                                        Twitter إلى انتقل
                                    </div>
                                </div>
                            </motion.div>

                            {/* Email card */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                                whileHover={{ scale: 1.02, x: -5 }}
                                className="flex items-center gap-[20px] rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 cursor-pointer"
                            >
                                <span className="shrink-0 grid place-items-center size-10 rounded-full bg-white border border-gray-200">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        aria-hidden="true"
                                    >
                                        <path d="M4 6h16v12H4z"></path>
                                        <path d="M22 6l-10 7L2 6"></path>
                                    </svg>
                                </span>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">
                                        البريد الإلكتروني
                                    </div>
                                    <div className="text-lg font-semibold text-gray-800">
                                        info@mubhir.ai
                                    </div>
                                </div>
                            </motion.div>

                            {/* Phone card */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                                whileHover={{ scale: 1.02, x: -5 }}
                                className="flex items-center gap-[20px] rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 cursor-pointer"
                            >
                                <span className="shrink-0 grid place-items-center size-10 rounded-full bg-white border border-gray-200">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        aria-hidden="true"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.61a2 2 0 0 1-.45 2.11L8 9a16 16 0 0 0 7 7l.56-1.23a2 2 0 0 1 2.11-.45c.84.29 1.71.5 2.61.62A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </span>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">الهاتف</div>
                                    <div
                                        className="text-lg font-semibold text-gray-800"
                                        dir="ltr"
                                    >
                                        +966 568876934
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Left: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="lg:col-span-7 p-6 sm:p-10"
                    >
                        <motion.form
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            onSubmit={handleSubmit}
                            className="mt-2 space-y-6"
                        >
                            {/* Full name */}
                            <motion.label
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                className="block"
                            >
                                <span className="block text-gray-700 font-medium mb-2">
                                    الاسم الكامل <span className="text-purple-700">*</span>
                                </span>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="الاسم الأول"
                                    required
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#671e5a] px-4 py-3 text-right placeholder-gray-400"
                                />
                            </motion.label>

                            {/* Email */}
                            <motion.label
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                                className="block"
                            >
                                <span className="block text-gray-700 font-medium mb-2">
                                    البريد الإلكتروني <span className="text-purple-700">*</span>
                                </span>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="البريد الإلكتروني"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#671e5a] px-4 py-3 text-right placeholder-gray-400"
                                />
                            </motion.label>

                            {/* Phone (with country selector) */}
                            <motion.label
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                                className="block"
                            >
                                <span className="block text-gray-700 font-medium mb-2">
                                    الجوال <span className="text-purple-700">*</span>
                                </span>

                                <div className="relative">
                                    <div className="flex items-stretch">
                                        {/* Phone number input */}
                                        <input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="tel"
                                            inputMode="tel"
                                            placeholder="5xxxxxxxx"
                                            required
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            className="flex-1 rounded-r-xl border border-gray-200 border-s border-y px-4 py-3 text-right placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#671e5a]"
                                        />

                                        {/* Fixed Saudi country code */}
                                        <div className="flex items-center gap-2 rounded-e-xl border border-gray-200 border-e border-y px-3 text-gray-700 bg-gray-50">
                                            <span className="text-xl leading-none">🇸🇦</span>
                                            <span className="text-sm">+966</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.label>

                            {/* Message */}
                            <motion.label
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                                className="block"
                            >
                                <span className="block text-gray-700 font-medium mb-2">
                                    رسالة <span className="text-purple-700">*</span>
                                </span>
                                <textarea
                                    name="message"
                                    rows={6}
                                    placeholder="الرسالة"
                                    required
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#671e5a] px-4 py-3 text-right placeholder-gray-400 resize-none"
                                ></textarea>
                            </motion.label>

                            {/* Bottom bar button */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.7 }}
                                className="mt-8"
                            >
                                <div className="no-hover relative w-full rounded-full bg-[#671E5A]">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-between gap-4 text-white px-1 pl-6 py-1 rounded-full disabled:opacity-50"
                                    >
                                        {/* Circular back icon (on the right in RTL) */}
                                        <span className="shrink-0 size-12 grid place-items-center bg-white text-[#671E5A] rounded-full">
                                            <svg
                                                width="22"
                                                height="22"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                aria-hidden="true"
                                            >
                                                <path d="M15 5l7 7-7 7"></path>
                                                <path d="M22 12H3"></path>
                                            </svg>
                                        </span>
                                        <span className="ms-auto text-lg">
                                            {isSubmitting ? "جاري الإرسال..." : "اتصل بنا"}
                                        </span>
                                    </button>
                                </div>
                            </motion.div>
                        </motion.form>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
