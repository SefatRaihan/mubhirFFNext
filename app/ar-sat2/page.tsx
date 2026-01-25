"use client";

import React, { useEffect } from "react";
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
import LeftClrArrow from "@/public/icons/LeftClrArrow";
import { motion } from "framer-motion";

export default function ArSat2Page() {
    // Set page title
    useEffect(() => {
        document.title = 'مبهر - اختبار التحصيلي (قريباً)';
    }, []);

    return (
        <div className="bg-white" dir="rtl">
            {/* Header Section */}
            <header className="bg-linear-to-tr from-[#2A056D] to-[#6F0767] text-white mb-4 md:m-4 rounded-0 md:rounded-2xl">
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
                                سؤال#
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, scale: 0, rotate: 15 }}
                                animate={{ opacity: 1, scale: 1, rotate: 15 }}
                                transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
                                className="transform rotate-15 md:rotate-25 md:absolute md:left-40 md:top-60 bg-purple-600 text-white px-4 py-1 rounded-full text-xs md:text-sm font-semibold shadow-md"
                            >
                                #اختبار تحصيلي
                            </motion.span>
                        </div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                            className="text-2xl md:text-[76px] font-bold leading-tight md:leading-[86px] text-center"
                        >
                            <span className="relative inline-block pb-2">
                                اختبارات
                                <Image
                                    src="/image/Vector 1.svg"
                                    alt="تسطير"
                                    width={200}
                                    height={10}
                                    className="absolute right-0 bottom-0 w-full h-[10px] pointer-events-none"
                                />
                            </span>
                            ودورات كل المدونات <br /> قريبا!
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                            className="mt-4 text-base md:text-lg max-w-md md:max-w-xl mx-auto text-gray-200"
                        >
                            المزيد حول ما سنقدمه أدناه!
                        </motion.p>
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
                                        alt=""
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
                                        alt=""
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
                                        alt=""
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
            </header >

            {/* We Help Section */}
            < section className="font-sans text-gray-900 bg-[#f7e8f5] py-8 my-4 md:m-4 rounded-0 md:rounded-2xl" >
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl text-center md:text-[56px] font-bold leading-tight md:leading-none">
                        نحن نساعد جميع الطلاب في <br />
                        <span className="relative inline-block pb-2">
                            المملكة العربية
                            <Image
                                src="/image/Vector 1.svg"
                                alt="تسطير"
                                width={300}
                                height={10}
                                className="absolute right-0 bottom-0 w-full h-[10px] pointer-events-none"
                            />
                        </span>
                        السعودية
                    </h1>
                    <p className="text-sm text-gray-500 mt-1 text-center">
                        تقدم مبهر دعم مميز لترتقي بطموحاتك الأكاديمية لأعلى المستويات،
                        وتساعدك على تحقيق أعلى الدرجات في اختبارات القدرات <br />
                        بأقصر وأفضل طريقة
                    </p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-[120px]">
                        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                            <Image
                                className="w-10 h-10 text-purple-500"
                                src="/image/icon/Type=stationery.png"
                                alt=""
                                width={40}
                                height={40}
                            />
                            <div className="mt-20">
                                <h2 className="text-xl font-bold">طريقة تعلم مخصصة لك</h2>
                                <p className="text-gray-600 mt-2">
                                    اطرح الأسئلة بسهولة عن طريق تحميل صورة أو كتابة استفسارك -
                                    يتعامل الذكاء الاصطناعي لدينا مع كليهما بسلاسة.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                            <Image
                                className="w-10 h-10 text-purple-500"
                                src="/image/icon/Type=saturn.png"
                                alt=""
                                width={40}
                                height={40}
                            />
                            <div className="mt-20">
                                <h2 className="text-xl font-bold">محاكاة امتحانات حقيقية</h2>
                                <p className="text-gray-600 mt-2">
                                    تدعمك المنصة باختبارات محاكية للأختبار الفعلي وتحدد مستوى
                                    الطالب ويتنبأ بدرجة تقريبية لمستواه.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                            <Image
                                className="w-10 h-10 text-purple-500"
                                src="/image/icon/Type=book-03.png"
                                alt=""
                                width={40}
                                height={40}
                            />
                            <div className="mt-20">
                                <h2 className="text-xl font-bold">
                                    التتبع المدعوم من الذكاء الاصطناعي
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    تعرف على مواضع قوتك ونقاط ضعفك بالذكاء الإصطناعي وأعمل على
                                    تحسينها.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* All in One Place Section */}
            < section className="font-sans text-gray-900 bg-[#F7F5FF] my-4 md:m-4 rounded-0 md:rounded-2xl" >
                <div className="max-w-7xl mx-auto px-4 pt-8">
                    {/* Header (Centered) */}
                    <div className="text-center">
                        <h1 className="text-4xl text-center md:text-[56px] font-bold leading-tight md:leading-none">
                            ما هو مشمول في اختبار التحصيلي
                        </h1>
                        <p className="text-sm text-gray-500 mt-4">
                            تم تصميم اختبار تحصيلي للطلاب الذين يستعدون لاختبار التقييم الدراسي
                            (قدرات) ، والذي يغطي على وجه التحديد:
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Card 1 - Math */}
                        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                            <div className="order-1">
                                <Image
                                    src="/image/arabic_content/mathematics.jpg"
                                    alt="الرياضيات"
                                    width={500}
                                    height={300}
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                            <div className="mt-6 order-2">
                                <h2 className="text-xl font-bold">الرياضيات:</h2>
                                <p className="text-gray-600 mt-2">
                                    تأسيس مركز يسهل عليك فهم المفاهيم الرياضية وحل أسئلة التحصيلي
                                    بثقة وبخطوات واضحة
                                </p>
                            </div>
                        </div>

                        {/* Card 2 - Chemistry */}
                        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                            <div className="order-3">
                                <Image
                                    src="/image/arabic_content/chemistry.jpg"
                                    alt="الكيمياء"
                                    width={500}
                                    height={300}
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                            <div className="mt-6 order-4">
                                <h2 className="text-xl font-bold">الكيمياء:</h2>
                                <p className="text-gray-600 mt-2">
                                    محتوى مبسط يشرح أهم مفاهيم الكيمياء بأسلوب واضح مع أمثلة وتمارين
                                    تساعدك تتقن أسئلة التحصيلي بسرعة
                                </p>
                            </div>
                        </div>

                        {/* Card 3 - Physics */}
                        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                            <div className="order-1">
                                <Image
                                    src="/image/arabic_content/physics.jpg"
                                    alt="الفيزياء"
                                    width={500}
                                    height={300}
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                            <div className="mt-6 order-2">
                                <h2 className="text-xl font-bold">الفيزياء:</h2>
                                <p className="text-gray-600 mt-2">
                                    أتقن أهم قوانين ومفاهيم الفيزياء بأسلوب واضح يسهل عليك ربط
                                    الأفكار وحل أسئلة التحصيلي وتجيب أعلى درجة بسرعة ودقة تدريب مركز
                                    يساعدك تفهم بدل ما تحفظ
                                </p>
                            </div>
                        </div>

                        {/* Card 4 - Biology */}
                        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                            <div className="order-3">
                                <Image
                                    src="/image/arabic_content/neighborhoods.jpg"
                                    alt="الأحياء"
                                    width={500}
                                    height={300}
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                            <div className="mt-6 order-4">
                                <h2 className="text-xl font-bold">الأحياء:</h2>
                                <p className="text-gray-600 mt-2">
                                    تشرح لك المعلومة بشكل مباشر، وتربطها بأسئلة تمهدك للاختبار
                                    الحقيقي وتزيد فرصك لدرجة أعلى
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Us Button */}
                    <div className="mt-14 pb-32 text-center">
                        <Link href="/ar-contactUs">
                            <button className="bg-[#671E5A] text-white rounded-full pt-1 pr-6 pb-1 pl-1 cursor-pointer flex items-center mx-auto">
                                اتصل بنا
                                <span className="relative flex items-center justify-center mr-3 bg-[#671e5a] text-white rounded-full">
                                    <svg
                                        width="48"
                                        height="48"
                                        viewBox="0 0 48 48"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M33.4316 24H14.5705"
                                            stroke="#671E5A"
                                            strokeWidth="3.03125"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M13.4973 25.0717C12.9054 24.4798 12.9054 23.5202 13.4973 22.9283C14.0892 22.3364 15.0488 22.3364 15.6407 22.9283L14.569 24L13.4973 25.0717ZM22.6523 32.0833L21.5806 33.155L13.4973 25.0717L14.569 24L15.6407 22.9283L23.7241 31.0116L22.6523 32.0833Z"
                                            fill="#671E5A"
                                        />
                                        <path
                                            d="M15.6407 25.0718C15.0488 25.6637 14.0892 25.6637 13.4973 25.0718C12.9054 24.4799 12.9054 23.5203 13.4973 22.9284L14.569 24.0001L15.6407 25.0718ZM22.6523 15.9167L23.7241 16.9885L15.6407 25.0718L14.569 24.0001L13.4973 22.9284L21.5806 14.845L22.6523 15.9167Z"
                                            fill="#671E5A"
                                        />
                                    </svg>
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </section >

            <Footer />
        </div >
    );
}
