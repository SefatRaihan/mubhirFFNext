"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navber/Navbar";
import Footer from "@/components/Footer/Footer";
import FaqItem from "@/components/FaqItem/FaqItem";
import LeftClrArrow from "@/public/icons/LeftClrArrow";

export default function ArBlogPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqData = [
        {
            question: "كيف يقوم الذكاء الاصطناعي في مبهر بتخصيص تجربتك التعليمية ؟",
            answer:
                "يعتمد الذكاء الاصطناعي في مبهر على تحليل أدائك بشكل مستمر، من خلال متابعة طريقة إجاباتك، وقياس أداء مستواك، وتحديد نقاط القوة والاحتياج لديك بدقة",
        },
        {
            question: "هل يوجد اختبارات تجريبية استطيع التدرب عليها داخل مبهر؟",
            answer:
                "اكتشف اختبارات متنوعة ومحدثة باستمرار، مدعومة بتسريبات دقيقة تحاكي الامتحان الحقيقي، لتتدرب بثقة وتصل ليوم الاختبار مستعدا لتحقيق أفضل النتائج",
        },
        {
            question: "هل يمكنني استخدام مبهر على جهازي اللوحي / الكمبيوتر / الجوال ؟",
            answer:
                "نعم، يعمل مبهر بسلاسة على الأجهزة اللوحية والكمبيوترات ليمنحك تجربة استخدام مرنة وسريعة وواضحة. يمكنك متابعة مذاكرتك بسهولة في أي مكان وفي الوقت الذي يناسبك كذلك يعمل على الجوال ولكن كل مميزات مبهر تظهر بشكل أفضل على جهازك اللوحي أو الكمبيوتر",
        },
        {
            question: "هل يوجد تجربة مجانية ؟",
            answer:
                "نعم، تقدر تبدأ بـ تجربة مجانية لمدة 5 أيام للتعرف على طريقة عمل مبهر وتجربة بعض الأسئلة والميزات قبل الاشتراك",
        },
        {
            question: "هل أحتاج خبرة سابقة في القدرات قبل اشتراكي مع مبهر؟",
            answer:
                "لا، مبهر مبني ليبدأ معك من الصفر ويوضح لك كل خطوة. ويطورك حتى تصل للمستوى المطلوب",
        },
        {
            question: "هل سيكون معي أحد للمساعدة والإجابة عن استفساراتي ؟",
            answer:
                "نعم. في مبهر لن تكون وحيدا. فريق الدعم سيكون معك خطوة بخطوة للإجابة على أسئلتك، ويوجهك لتبقى دايما على الطريق الصحيح نحو هدفك",
        },
    ];

    return (
        <div className="bg-white font-sans" dir="rtl">
            {/* First Section: Nav to Blog Cards */}
            <header style={{ backgroundColor: "#f7e8f5" }} className="m-4 rounded-2xl">
                <div className="p-4">
                    <Navbar />

                    {/* Main Content */}
                    <main className="max-w-5xl mx-auto px-4 py-6">
                        {/* Title and Search */}
                        <div className="mb-6 text-center mt-[60px]">
                            <h1 className="text-2xl md:text-[56px] font-semibold leading-tight md:leading-none">
                                مدونات مبھر{" "}
                                <span className="relative inline-block pb-2">
                                    للطلاب
                                    <Image
                                        src="/image/Vector 1.svg"
                                        alt="تسطير"
                                        width={100}
                                        height={10}
                                        className="absolute right-0 bottom-0 w-full h-[10px] pointer-events-none"
                                    />
                                </span>
                            </h1>

                            <div className="relative mb-4 max-w-2xl mx-auto mt-[20px]">
                                <input
                                    type="text"
                                    placeholder="ابحث في المدونات هنا..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full p-3 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-right"
                                />
                                <svg
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>
                            </div>
                        </div>

                        {/* Hero Section - Row 1: Image + Box with Text and Button */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div
                                className="bg-[#FFF5F7] rounded-lg shadow-md p-6 custom-card order-1 md:order-2"
                                style={{
                                    width: "100%",
                                    minHeight: "300px",
                                }}
                            >
                                <div>
                                    <span className="text-[16px] font-semibold px-[12px] py-[4px] bg-[#ffffff] text-[#671E5A] rounded-2xl">
                                        الذكاء الاصطناعي وتكنولوجيا التعليم
                                    </span>
                                    <h2 className="text-xl font-bold text-gray-800 my-2">
                                        كيف يغير الذكاء الاصطناعي طريقة تحضير الطلاب لـ قدرات
                                    </h2>
                                    <p className="text-gray-600 mb-4">
                                        اكتشف كيف يجعل التعلم المخصص بالذكاء الاصطناعي تحضير قدرات أكثر كفاءة وجاذبية.
                                    </p>
                                    <span className="text-sm text-gray-500">16 أبريل 2025 - 5 دقائق للقراءة</span>
                                </div>

                                <Link href="/ar-blogDetails">
                                    <button className="flex items-center bg-[#671e5a] text-white font-medium rounded-full pr-5 pl-2 py-2 shadow-lg mt-[64px]">
                                        اقرأ المدونة
                                        <span className="flex items-center justify-center mr-6 w-8 h-8 bg-white text-white rounded-full">
                                            <LeftClrArrow />
                                        </span>
                                    </button>
                                </Link>
                            </div>
                            <div className="bg-white rounded-lg shadow-md order-2 md:order-1" style={{ width: "100%", minHeight: "300px" }}>
                                <Image
                                    src="/image/c1.png"
                                    alt="صورة المدونة"
                                    width={500}
                                    height={400}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Row 3: Two Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white rounded-t-lg shadow-md order-1 md:order-2" style={{ width: "100%", minHeight: "300px" }}>
                                <Image
                                    src="/image/c4.png"
                                    alt="صورة المدونة"
                                    width={500}
                                    height={240}
                                    className="w-full h-[240px] object-cover rounded-lg mb-4"
                                />
                                <div className="p-4">
                                    <span className="text-sm text-gray-500">الذكاء الاصطناعي وتكنولوجيا التعليم</span>
                                    <h2 className="text-lg font-bold text-gray-800 mb-2">أفضل 10 نصائح لزيادة درجاتك في قدرات</h2>
                                    <span className="text-sm text-gray-500">16 أبريل 2025 - 5 دقائق للقراءة</span>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-4 order-2 md:order-1" style={{ width: "100%", minHeight: "300px" }}>
                                <Image
                                    src="/image/c5.png"
                                    alt="صورة المدونة"
                                    width={500}
                                    height={240}
                                    className="w-full h-[240px] object-cover rounded-lg mb-4"
                                />
                                <span className="text-sm text-gray-500">الذكاء الاصطناعي وتكنولوجيا التعليم</span>
                                <h2 className="text-lg font-bold text-gray-800 mb-2">أفضل 10 نصائح لزيادة درجاتك في قدرات</h2>
                                <span className="text-sm text-gray-500">16 أبريل 2025 - 5 دقائق للقراءة</span>
                            </div>
                        </div>

                        {/* See All Blogs Button */}
                        <div className="flex justify-center mt-6 pb-12">
                            <button className="flex items-center bg-[#671e5a] text-white font-medium rounded-full pr-5 pl-2 py-2 shadow-lg mt-[64px]">
                                اقرأ المدونة
                                <span className="flex items-center justify-center mr-6 w-8 h-8 bg-white text-white rounded-full">
                                    <LeftClrArrow />
                                </span>
                            </button>
                        </div>
                    </main>
                </div>
            </header>

            {/* FAQ Section */}
            <section className="bg-[#eaecf0] flex justify-center m-4 rounded-2xl">
                <div className="container max-w-6xl px-4 py-[120px]">
                    <h2 className="text-[56px] font-semibold text-center text-black">
                        كل إستفسارات طلاب القدرات
                        <br />
                    </h2>
                    <p className="mt-2 text-center text-gray-600">الأسئلة الشائعة</p>
                    <div className="mt-10 space-y-4">
                        {faqData.map((faq, index) => (
                            <FaqItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                index={index}
                                isOpen={openFaq === index}
                                onToggle={() => toggleFaq(index)}
                            />
                        ))}
                    </div>
                    <p className="text-black font-medium mb-[12px] mt-[32px] text-center">
                        ما زلت لديك أسئلة؟
                    </p>
                    <div className="mt-6 flex justify-center items-center space-x-6 space-x-reverse">
                        <Link href="/ar-contactUs">
                            <button className="flex items-center bg-[#671e5a] text-white font-medium rounded-full pr-5 pl-2 py-2 shadow-lg">
                                تواصل معنا
                                <span className="flex items-center justify-center mr-6 w-8 h-8 bg-white text-white rounded-full">
                                    <LeftClrArrow />
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#691d5e] text-white rounded-lg px-4 pt-12 md:pt-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
                    {/* Right Content */}
                    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-right space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-snug">
                            ابدأ{" "}
                            <span className="relative inline-block pb-2">
                                رحلتك اليوم!
                                <Image
                                    src="/image/Vector 1.svg"
                                    alt="underline"
                                    width={100}
                                    height={8}
                                    className="bottom-0 w-full h-2 -z-10 pointer-events-none"
                                />
                            </span>
                        </h1>
                        <p className="text-base md:text-lg">
                            ستكون في طريقك إلى نجاح قدرات في أي وقت من الأوقات.
                        </p>
                    </div>

                    {/* Image */}
                    <div className="order-last md:order-0 flex justify-center items-center">
                        <Image
                            src="/image/مهبر cover.png"
                            alt="طالبة"
                            width={350}
                            height={350}
                            className="h-[350px] object-cover"
                        />
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
        @media (min-width: 768px) {
          .custom-card {
            width: 500px;
            height: 400px;
          }
        }

        @media (max-width: 767px) {
          .custom-card {
            width: 100%;
            height: auto;
            min-height: 300px;
          }
        }
      `}</style>
        </div>
    );
}
