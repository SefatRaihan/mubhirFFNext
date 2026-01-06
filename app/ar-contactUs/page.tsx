"use client";

import React, { useState } from "react";
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
            console.error("Error:", error);
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
                        <div className="flex justify-center space-x-reverse space-x-4 md:space-x-0 mb-4 md:mb-0">
                            <span
                                className="transform rotate-15 md:rotate-25 md:absolute md:right-40 md:top-50 bg-blue-600 text-white px-4 py-1 rounded-full text-xs md:text-sm font-semibold shadow-md"
                                dir="ltr"
                            >
                                #دعم
                            </span>
                            <span className="transform -rotate-15 md:-rotate-25 md:absolute md:left-40 md:top-50 bg-purple-600 text-white px-4 py-1 rounded-full text-xs md:text-sm font-semibold shadow-md">
                                #مساعدة
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-[76px] font-bold leading-tight md:leading-none">
                            تواصل معنا
                        </h1>

                        <p className="mt-4 text-base md:text-lg max-w-md md:max-w-xl mx-auto text-gray-200">
                            رحلتك التعليمية الأحترافية تبدأ مع مبهر لماذا تبحث طويلاً؟ منصتنا
                            تجعل التعلم أسرع، أسهل، وأكثر متعة، بفضل أحدث التقنيات التعليمية
                            المتطورة، إذا كنت تستعد لاختبارات القدرات العامة وترغب بالتعرف على
                            منصتنا الذكية، نحن هنا من أجلك، ونسعد دائما بالتواصل معك
                        </p>

                        <div className="mt-6 flex justify-center items-center space-x-4 space-x-reverse">
                            <div className="relative inline-block">
                                <Link href="https://cms.mubhir.ai/ar-select-package">
                                    <button className="flex items-center pt-1 pr-6 pb-1 pl-1 bg-white text-[#671e5a] font-medium rounded-full shadow-lg hover:bg-[#671e5a] hover:text-white">
                                        أكتشف الأن
                                        <span className="relative flex items-center justify-center mr-3 bg-[#671e5a] text-white rounded-full">
                                            <LeftArrow />
                                        </span>
                                    </button>
                                </Link>
                                <Image
                                    src="/image/bitcoin2.png"
                                    className="absolute right-32 md:right-33 top-6"
                                    alt=""
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Section */}
                    <div className="mx-6 md:mx-[48px] mt-24 md:mt-[206px] flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
                        <div className="flex items-center space-x-2 space-x-reverse mb-0 md:mb-[48px]">
                            <div className="flex -space-x-2">
                                <div className="w-10 h-10 md:w-[55px] md:h-[55px] bg-gray-300 rounded-full border-2 border-white">
                                    <Image
                                        src="/image/Image-28.png"
                                        alt=""
                                        width={55}
                                        height={55}
                                    />
                                </div>
                                <div className="w-10 h-10 md:w-[55px] md:h-[55px] bg-gray-300 rounded-full border-2 border-white">
                                    <Image
                                        src="/image/Image-29.png"
                                        alt=""
                                        width={55}
                                        height={55}
                                    />
                                </div>
                                <div className="w-10 h-10 md:w-[55px] md:h-[55px] bg-gray-300 rounded-full border-2 border-white">
                                    <Image
                                        src="/image/Image-30.png"
                                        alt=""
                                        width={55}
                                        height={55}
                                    />
                                </div>
                            </div>
                            <span className="px-2 font-semibold text-base md:text-[20px]">
                                الكثير من الطلاب انضموا <br /> إلينا واستفادوا بمزايا منصتنا
                            </span>
                        </div>
                        <div
                            className="flex space-x-4"
                            style={{ marginBottom: "60px" }}
                        >
                            <Link href="https://wa.me/966568876934">
                                <div className="bg-white rounded-full p-2 md:p-[8.18px]">
                                    <WhatsappIcon />
                                </div>
                            </Link>
                            <Link href="https://www.instagram.com/mubhirai?igsh=MXBtcXdwOWV5NjdpOA==">
                                <div className="rounded-full p-2 md:p-[8.18px] bg-[#C445A6]">
                                    <InstaIcon />
                                </div>
                            </Link>
                            <Link href="https://www.tiktok.com/@mubhir.ai?_t=ZS-90FHdPykhaq&_r=1">
                                <div className="bg-white rounded-full p-2 md:p-[8.18px]">
                                    <TiktokIcon />
                                </div>
                            </Link>
                            <Link href="https://t.me/mubhirai">
                                <div className="bg-white rounded-full p-2 md:p-[8.18px]">
                                    <TelegramIcon />
                                </div>
                            </Link>

                            <Link href="https://x.com/Mubhir_AI?t=jLDoMMLZ4zctIJrMYdh_qw&s=09">
                                <div className="bg-white rounded-full p-2 md:p-[8.18px]">
                                    <XIcon />
                                </div>
                            </Link>

                            <Link href="https://www.snapchat.com/add/mubhirai?share_id=KtsxCDNMDts&locale=en-US">
                                <div className="bg-white rounded-full p-2 md:p-[8.18px]">
                                    <SnapIcon />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Contact Form Section */}
            <section className="mx-auto max-w-6xl shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Right: Contact Info Cards */}
                    <div className="lg:col-span-5 border-t lg:border-t-0 p-6 sm:p-10 flex flex-col">
                        <header className="mb-8">
                            {/* <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                                نموذج الاتصال
                            </h1> */}
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                نموذج الاتصال
                            </h1>
                            <p className="text-gray-500">نحن نحب أن يَسمع فريقنا منك!</p>
                        </header>

                        <div className="space-y-5">
                            {/* Twitter (X) card */}
                            <div className="flex items-center gap-[20px] rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4">
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
                            </div>

                            {/* Email card */}
                            <div className="flex items-center gap-[20px] rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4">
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
                            </div>

                            {/* Phone card */}
                            <div className="flex items-center gap-[20px] rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4">
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
                            </div>
                        </div>
                    </div>

                    {/* Left: Form */}
                    <div className="lg:col-span-7 p-6 sm:p-10">
                        <form onSubmit={handleSubmit} className="mt-2 space-y-6">
                            {/* Full name */}
                            <label className="block">
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
                            </label>

                            {/* Email */}
                            <label className="block">
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
                            </label>

                            {/* Phone (with country selector) */}
                            <label className="block">
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
                            </label>

                            {/* Message */}
                            <label className="block">
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
                            </label>

                            {/* Bottom bar button */}
                            <div className="mt-8">
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
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
