"use client";

import Navbar from "@/components/Navber/Navbar";
import InstaIcon from "@/public/icons/InstaIcon";
import LeftArrow from "@/public/icons/LeftArrow";
import MiddleIcon from "@/public/icons/MiddleIcon";
import SnapIcon from "@/public/icons/SnapIcon";
import TelegramIcon from "@/public/icons/TelegramIcon";
import TiktokIcon from "@/public/icons/TiktokIcon";
import WhatsappIcon from "@/public/icons/WhatsappIcon";
import XIcon from "@/public/icons/XIcon";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <div className="bg-white" dir="rtl">
      {/* Hero Section */}
      <section className="bg-linear-to-tr from-[#2A056D] to-[#6F0767] text-white m-4 rounded-2xl">
        {/* Navbar Component */}
        <Navbar />

        <div className="p-4">
          {/* Hero Content */}
          <div className="relative text-center mt-16 md:mt-[128px]">
            <div className="flex justify-center space-x-4 space-x-reverse md:space-x-0 mb-4 md:mb-0">
              <span className="transform rotate-[-15deg] md:rotate-[-25deg] md:absolute md:right-40 md:top-60 bg-blue-600 text-white px-4 py-1 rounded-full text-xs md:text-sm font-semibold shadow-md">
                #سؤال
              </span>
              <span className="transform rotate-15 md:rotate-25 md:absolute md:left-40 md:top-60 bg-purple-600 text-white px-4 py-1 rounded-full text-xs md:text-sm font-semibold shadow-md">
                #قدرات
              </span>
            </div>

            <h1 className="text-4xl md:text-[76px] font-bold md:leading-[86px] leading-[44px]">
              مبهر شريكك الذكي <br /> لطريق التفوق في اختبار <br /> القدرات
            </h1>

            <p className="mt-4 text-base md:text-lg max-w-md md:max-w-xl mx-auto text-gray-200">
              تحضير دقيق، خطة مدروسة ونتائج ملموسة تمكنك من التفوق في اختبار
              القدرات بالذكاء الإصطناعي
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
                <img
                  src="/image/bitcoin2.png"
                  className="absolute right-32 md:right-33 top-6"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* Social Media Links and Student Images */}
          <div className="mx-6 md:mx-[48px] mt-24 md:mt-[206px] flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
            <div className="flex items-center space-x-2 space-x-reverse mb-0 md:mb-[48px]">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 md:w-[55px] md:h-[55px] bg-gray-300 rounded-full border-2 border-white">
                  <img src="/image/Image-28.png" alt="" />
                </div>
                <div className="w-10 h-10 md:w-[55px] md:h-[55px] bg-gray-300 rounded-full border-2 border-white">
                  <img src="/image/Image-29.png" alt="" />
                </div>
                <div className="w-10 h-10 md:w-[55px] md:h-[55px] bg-gray-300 rounded-full border-2 border-white">
                  <img src="/image/Image-30.png" alt="" />
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
          <div className="relative">
            <div className="circle absolute right-[50%] transform translate-x-1/2 -top-10 w-[121px] h-[121px] bg-[#c44580] rounded-full flex items-center justify-center">
              <MiddleIcon />
              <div className="text w-full h-full absolute text-white">

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Based SAT Section */}
      <section className="bg-[#F7E8F5] flex justify-center m-2 sm:m-4 rounded-2xl">
        <div className="container max-w-6xl px-4 py-8 sm:py-[120px]">
          <div className="flex flex-col items-center text-center mb-8 sm:mb-[40px]">
            <h1 className="text-3xl sm:text-5xl md:text-[60px] leading-20 lg:leading-[76px] font-bold mb-3 sm:mb-4">
              استعد لأختبار القدرات <br />
              العامة بخطوات تفوق التوقعات مع مبهر
            </h1>
            <p className="text-sm sm:text-[16px] font-medium text-black mt-3">
              خطط مخصصة – تدريب ذكي – نتائج مبهرة
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8 sm:mb-16">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 w-full max-w-3xl">
              {["المدرسون", "توقع الدرجة", "الأختبارات", "الشروحات"].map(
                (tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(`tab${index + 1}`)}
                    className={`py-1 text-center font-medium text-sm sm:text-[18px] border-b ${activeTab === `tab${index + 1}`
                      ? "text-black border-[#4F46F4]"
                      : "text-[#98A2B3] border-[#D0D5DD]"
                      }`}
                    style={{ borderBottomWidth: "4px" }}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Tab Content - Simplified version showing structure */}
          <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_2fr] gap-4 sm:gap-6">
            <div className="border-2 border-dashed border-[#D0D5DD] rounded-xl p-4 sm:p-[32px]">
              <h3 className="text-xl sm:text-2xl md:text-[36px] font-medium mb-2 leading-tight sm:leading-[44px] text-right">
                {activeTab === "tab1" && "اسأل من خلال صورة أو نص"}
                {activeTab === "tab2" && "طريقة بديلة للإجابة"}
                {activeTab === "tab3" && "اقتراح اختبار"}
                {activeTab === "tab4" && "شرح الموضوع"}
              </h3>
              <p className="text-gray-600 mt-6 text-sm sm:text-[20px] font-normal text-right">
                {activeTab === "tab1" &&
                  "ضع استفساراتك بكل سهولة وستحصل على استجابة فورية ومفيدة"}
                {activeTab === "tab2" && "استكشف طرقا متعددة لحل المشكلات"}
                {activeTab === "tab3" && "احصل على تفسيرات واضحة وموجزة"}
                {activeTab === "tab4" &&
                  "احصل على تفسيرات واضحة وموجزة لأي موضوع"}
              </p>
            </div>
            <div className="bg-[#291548] rounded-xl p-4 sm:p-6 flex items-center justify-center">
              <img
                src={`/image/${activeTab === "tab1"
                  ? "المدرسين"
                  : activeTab === "tab2"
                    ? "توقع الدرجة"
                    : activeTab === "tab3"
                      ? "االختبارات"
                      : "الشروحات"
                  }.jpg`}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
