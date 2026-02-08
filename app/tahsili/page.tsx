"use client";

import React, { useEffect, useState } from "react";
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
import { motion } from "framer-motion";
import { ScrollAnimated, ScrollSection, ScrollDiv, ScrollH2, ScrollP } from "@/components/ScrollAnimated/ScrollAnimated";

interface PricingPlan {
    id: number;
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    price: string;
    price_display: string;
    pricing_terms: string;
    pricing_terms_ar: string;
    terms_per_month: string;
    terms_ar: string;
    promotional_badge?: number;
    features: string[];
}

export default function ArSat2Page() {
    const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);

    // Set page title
    useEffect(() => {
        document.title = 'مبهر - اختبار التحصيلي (قريباً)';
    }, []);

    // Fetch pricing plans
    useEffect(() => {
        const loadPlans = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/packages`, { cache: 'no-store' });
                const json = await res.json();

                if (json?.status === 'success' && Array.isArray(json.data)) {
                    const features = [
                        'الوصول إلى أسئلة تدريب قدرات.',
                        'تقارير مرحلية أسبوعية لتتبع التحسن.',
                        'قم بإجراء امتحانات التدريب بناء على أي مزيج من اللفظي / الكتابي والكمي',
                        'دعم 24/7 للإجابة على أسئلتك.',
                    ];

                    const titleTranslations: Record<string, string> = {
                        'Monthly Plan': 'الباقة الشهرية',
                        '3 Months Plan': 'خطة ٣ أشهر',
                        '6 Months Plan': 'خطة ٦ أشهر',
                        'Yearly Plan': 'الباقة السنوية',
                    };

                    const descriptionTranslations: Record<string, string> = {
                        'Perfect for starting your journey': 'استكشف بالسرعة التي تناسبك',
                        'Ideal for focused preparation': 'مثالي لمواسم الامتحانات',
                        'Best for comprehensive prep': 'التنافس على أعلى المستويات',
                        'Maximum value for long-term': 'إتقان وتيرة قدرات',
                    };

                    const toArabicDigits = (s: string) => String(s).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);

                    const plans = json.data.slice(0, 4).map((plan: any) => ({
                        ...plan,
                        title_ar: titleTranslations[plan.title] || plan.title,
                        description_ar: descriptionTranslations[plan.description] || plan.description,
                        price_display: toArabicDigits(String(plan.price ?? '')),
                        pricing_terms_ar: plan.pricing_terms,
                        terms_ar: 'لكل مستخدم شهريا',
                        features,
                    }));

                    setPricingPlans(plans);
                }
            } catch (error) {
                // console.error('Failed to load packages:', error);
            }
        };

        loadPlans();
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
                            ودورات كل المدونات <br />قريبا!
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

            {/* We Help Section */}
            <ScrollSection
                className="font-sans text-gray-900 bg-[#f7e8f5] py-[120px] my-4 md:m-4 rounded-0 md:rounded-2xl"
                amount={0.2}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <ScrollH2
                        className="text-4xl text-center md:text-[56px] font-bold leading-tight md:leading-none"
                        amount={0.5}
                    >
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
                    </ScrollH2>
                    <ScrollP
                        className="text-sm text-gray-500 mt-1 text-center"
                        amount={0.5}
                        delay={0.1}
                    >
                        تقدم مبهر دعم مميز لترتقي بطموحاتك الأكاديمية لأعلى المستويات،
                        وتساعدك على تحقيق أعلى الدرجات في اختبارات القدرات <br />
                        بأقصر وأفضل طريقة
                    </ScrollP>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ScrollDiv
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col hover:-translate-y-2 transition-transform duration-300"
                            amount={0.3}
                            delay={0.1}
                        >
                            <Image
                                className="w-10 h-10 text-purple-500"
                                src="/image/icon/Type=stationery.png"
                                alt="طريقة تعلم مخصصة لك"
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
                        </ScrollDiv>

                        <ScrollDiv
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col hover:-translate-y-2 transition-transform duration-300"
                            amount={0.3}
                            delay={0.2}
                        >
                            <Image
                                className="w-10 h-10 text-purple-500"
                                src="/image/icon/Type=saturn.png"
                                alt="محاكاة امتحانات حقيقية"
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
                        </ScrollDiv>

                        <ScrollDiv
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col hover:-translate-y-2 transition-transform duration-300"
                            amount={0.3}
                            delay={0.3}
                        >
                            <Image
                                className="w-10 h-10 text-purple-500"
                                src="/image/icon/Type=book-03.png"
                                alt="التتبع المدعوم من الذكاء الاصطناعي"
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
                        </ScrollDiv>
                    </div>
                </div>
            </ScrollSection>

            {/* All in One Place Section */}
            <ScrollSection
                className="font-sans text-gray-900 bg-[#F7F5FF] py-[120px] my-4 md:m-4 rounded-0 md:rounded-2xl"
                amount={0.2}
            >
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header (Centered) */}
                    <div className="text-center">
                        <ScrollH2
                            className="text-4xl text-center md:text-[56px] font-bold leading-tight md:leading-none"
                            amount={0.5}
                        >
                            ما هو مشمول في اختبار التحصيلي
                        </ScrollH2>
                        <ScrollP
                            className="text-sm text-gray-500 mt-4"
                            amount={0.5}
                            delay={0.1}
                        >
                            تم تصميم اختبار تحصيلي للطلاب الذين يستعدون لاختبار التقييم الدراسي
                            (قدرات) ، والذي يغطي على وجه التحديد:
                        </ScrollP>
                    </div>

                    {/* Main Content */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Card 1 - Math */}
                        <ScrollDiv
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col hover:-translate-y-1.5 transition-transform duration-300"
                            amount={0.3}
                            initialX={-50}
                            initialY={0}
                            delay={0.1}
                        >
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
                        </ScrollDiv>

                        {/* Card 2 - Chemistry */}
                        <ScrollDiv
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col hover:-translate-y-1.5 transition-transform duration-300"
                            amount={0.3}
                            initialX={50}
                            initialY={0}
                            delay={0.2}
                        >
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
                        </ScrollDiv>

                        {/* Card 3 - Physics */}
                        <ScrollDiv
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col hover:-translate-y-1.5 transition-transform duration-300"
                            amount={0.3}
                            initialX={-50}
                            initialY={0}
                            delay={0.3}
                        >
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
                        </ScrollDiv>

                        {/* Card 4 - Biology */}
                        <ScrollDiv
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col hover:-translate-y-1.5 transition-transform duration-300"
                            amount={0.3}
                            initialX={50}
                            initialY={0}
                            delay={0.4}
                        >
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
                        </ScrollDiv>
                    </div>

                    {/* Contact Us Button */}
                    <ScrollDiv
                        className="mt-14 text-center"
                        amount={0.5}
                        initialScale={0.8}
                        initialY={0}
                        delay={0.5}
                    >
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
                    </ScrollDiv>
                </div>
            </ScrollSection>


            {/* Pricing Section */}
            <ScrollSection
                className="bg-linear-to-tr from-[#2A056D] to-[#6F0767] flex justify-center my-4 md:m-4 rounded-0 md:rounded-2xl"
                amount={0.1}
            >
                <div className="container max-w-6xl px-4 py-12 sm:py-[120px]">
                    <ScrollH2
                        className="text-[28px] sm:text-5xl md:text-6xl lg:text-[76px] font-semibold text-white leading-10 lg:leading-[120px] text-center"
                        amount={0.5}
                    >
                        أسعار مرنة لكل طالب يبغي يتفوق في القدرات
                    </ScrollH2>
                    <ScrollP
                        className="mt-3 sm:mt-6 text-white text-center text-sm sm:text-base"
                        amount={0.5}
                        delay={0.1}
                    >
                        اختر الخطة التي تناسب ميزانيتك وتدعم هدفك
                    </ScrollP>

                    <main className="max-w-6xl mx-auto flex flex-col px-0 md:px-4 py-6">
                        <div id="plansGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
                            {pricingPlans.map((plan, index) => (
                                <ScrollDiv
                                    key={plan.id}
                                    className="bg-white shadow-md rounded-2xl p-6 w-full flex flex-col cursor-pointer hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
                                    amount={0.2}
                                    initialRotateX={-15}
                                    delay={index * 0.15}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-[18px] font-semibold">
                                            {plan.title_ar}
                                        </h3>
                                        {plan.promotional_badge != null && plan.promotional_badge > 0 && (
                                            <motion.span
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    repeatDelay: 1
                                                }}
                                                className="text-white text-xs font-semibold px-3 py-1 rounded-full"
                                                style={{ backgroundColor: '#C445A6' }}
                                            >
                                                وفر {plan.promotional_badge}%
                                            </motion.span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4">
                                        {plan.description_ar}
                                    </p>
                                    <p className="text-3xl font-bold text-[#671E5A]">
                                        {plan.price_display}
                                        <span className="text-3xl font-bold text-[#671E5A] pr-2">ر.س</span>
                                    </p>
                                    <p className="text-xs mb-6 border-b border-[#D9D9D9] pb-[12px]">
                                        {plan.terms_ar}
                                    </p>
                                    <ul className="space-y-3 mb-6 grow">
                                        {plan.features && plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <motion.span
                                                    whileHover={{ scale: 1.2, rotate: 360 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="w-4 h-4 bg-[#671E5b] rounded-full flex items-center justify-center shrink-0"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M2.5 5.99994L5 8.49994L10 3.49994" stroke="white" strokeWidth="1.125" strokeLinejoin="round" />
                                                    </svg>
                                                </motion.span>
                                                <span className="text-[14px] font-bold text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href="/packages">
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            className="relative w-full border border-[#671E5A] text-[#671E5A] rounded-full py-2 font-semibold mt-6 overflow-hidden group"
                                        >
                                            <div className="absolute inset-0 bg-[#671E5A] rounded-full translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
                                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                                                ابدأ {plan.title_ar}
                                            </span>
                                        </motion.button>
                                    </Link>
                                </ScrollDiv>
                            ))}
                        </div>
                    </main>
                </div>
            </ScrollSection>

            <Footer />
        </div>
    );
}
