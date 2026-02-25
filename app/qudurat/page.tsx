"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navber/Navbar";
import SnapIcon from "@/public/icons/SnapIcon";
import XIcon from "@/public/icons/XIcon";
import TelegramIcon from "@/public/icons/TelegramIcon";
import TiktokIcon from "@/public/icons/TiktokIcon";
import InstaIcon from "@/public/icons/InstaIcon";
import WhatsappIcon from "@/public/icons/WhatsappIcon";
import Footer from "@/components/Footer/Footer";
import FaqItem from "@/components/FaqItem/FaqItem";
import LeftArrow from "@/public/icons/LeftArrow";
import CircleCorrectIcon from "@/public/icons/CircleCorrectIcon";
import CorrectIcon from "@/public/icons/CorrectIcon";
import LeftClrArrow from "@/public/icons/LeftClrArrow";
import { motion, AnimatePresence } from "framer-motion";
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

export default function ArSatPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [faqOpen, setFaqOpen] = useState<number[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };


  // FAQ data
  const faqData = [
    {
      question: 'كيف يقوم الذكاء الاصطناعي في مبهر بتخصيص تجربتك التعليمية ؟',
      answer: 'يعتمد الذكاء الاصطناعي في مبهر على تحليل أدائك بشكل مستمر، من خلال متابعة طريقة إجاباتك، وقياس أداء مستواك، وتحديد نقاط القوة والاحتياج لديك بدقة'
    },
    {
      question: 'هل يوجد اختبارات تجريبية استطيع التدرب عليها داخل مبهر؟',
      answer: 'اكتشف اختبارات متنوعة ومحدثة باستمرار، مدعومة بتسريبات دقيقة تحاكي الامتحان الحقيقي، لتتدرب بثقة وتصل ليوم الاختبار مستعدا لتحقيق أفضل النتائج'
    },
    {
      question: 'هل يمكنني استخدام مبهر على جهازي اللوحي / الكمبيوتر / الجوال ؟',
      answer: 'نعم، يعمل مبهر بسلاسة على الأجهزة اللوحية والكمبيوترات ليمنحك تجربة استخدام مرنة وسريعة وواضحة. يمكنك متابعة مذاكرتك بسهولة في أي مكان وفي الوقت الذي يناسبك كذلك يعمل على الجوال ولكن كل مميزات مبهر تظهر بشكل أفضل على جهازك اللوحي أو الكمبيوتر'
    },
    {
      question: 'هل يوجد تجربة مجانية ؟',
      answer: 'نعم، تقدر تبدأ بـ تجربة مجانية لمدة 5 أيام للتعرف على طريقة عمل مبهر وتجربة بعض الأسئلة والميزات قبل الاشتراك'
    },
    {
      question: 'هل أحتاج خبرة سابقة في القدرات قبل اشتراكي مع مبهر؟',
      answer: 'لا، مبهر مبني ليبدأ معك من الصفر ويوضح لك كل خطوة. ويطورك حتى تصل للمستوى المطلوب'
    },
    {
      question: 'هل سيكون معي أحد للمساعدة والإجابة عن استفساراتي ؟',
      answer: 'نعم. في مبهر لن تكون وحيدا. فريق الدعم سيكون معك خطوة بخطوة للإجابة على أسئلتك، ويوجهك لتبقى دايما على الطريق الصحيح نحو هدفك'
    }
  ];

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
    <div className="bg-white overflow-x-hidden" dir="rtl">

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
              >
                #سؤال
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0, rotate: 15 }}
                animate={{ opacity: 1, scale: 1, rotate: 15 }}
                transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
                className="transform rotate-15 md:rotate-25 md:absolute md:left-40 md:top-60 bg-purple-600 text-white px-4 py-1 rounded-full text-xs md:text-sm font-semibold shadow-md"
              >
                #قدرات
              </motion.span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="text-4xl md:text-[76px] font-bold md:leading-[95px] leading-[44px]"
            >
              نجاحك الحقيقي في
              <br />
              القدرات يبدأ بخطوة نحو
              <br />
              التميز
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="mt-4 text-base md:text-lg max-w-md md:max-w-xl mx-auto text-gray-200"
            >
              نطلق العنان لك لتعيش تجربة تعليمية فريدة تمكنك من اجتياز اختبارات
              القدرات بذكاء وتميز، باستخدام أساليب تعليمية متطورة. تعلم بذكاء،
              واصنع نجاحك بنفسك، تحت إشراف نخبة من أكفأ المدربين المتخصصين،
              وتوجيه مستمر ودعم فعال يساعدك على تحقيق أعلى النتائج بثقة وتمّيز.
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
                    className="flex items-center pt-1 pr-6 pb-1 pl-1 bg-white text-[#671e5a] font-medium rounded-full shadow-lg hover:bg-[#671e5a] hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    بدء الاستخدام
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
      </header >

      {/* We help Section */}
      <ScrollSection className="font-sans text-gray-900 bg-[#F7E8F5] my-4 md:m-4 rounded-0 md:rounded-2xl" amount={0.1}>
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-[120px]">
          <ScrollH2 className="text-4xl text-center md:text-[56px] font-bold md:leading-[75px] leading-[44px]" amount={0.3}>
            نحن نساعد جميع طلاب القدرات في <br /> المملكة العربية السعودية
          </ScrollH2>
          <ScrollP className="text-sm text-black mt-6 text-center" amount={0.3} delay={0.1}>
            تقدم مبهر دعم مميز لترتقي بطموحاتك الأكاديمية لأعلى المستويات،
            وتساعدك على تحقيق أعلى الدرجات في اختبارات القدرات <br /> بأقصر
            وأفضل طريقة
          </ScrollP>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollDiv className="bg-white rounded-lg shadow-md p-6 flex flex-col hover:-translate-y-2 transition-transform duration-300" amount={0.3} delay={0.1}>
              <Image
                className="w-10 h-10 text-purple-500"
                src="/image/icon/Type=stationery.png"
                alt="طريقة تعلم مخصصة لك"
                width={40}
                height={40}
              />
              <div className="mt-20">
                <h2 className="text-xl font-bold">طريقة تعلم مخصصة لك</h2>
                <p className="text-[#667085] mt-2 font-normal text-[16px]">
                  اطرح الأسئلة بسهولة عن طريق تحميل صورة أو كتابة استفسارك -
                  يتعامل الذكاء الاصطناعي لدينا مع كليهما بسلاسة.
                </p>
              </div>
            </ScrollDiv>

            <ScrollDiv className="bg-white rounded-lg shadow-md p-6 flex flex-col hover:-translate-y-2 transition-transform duration-300" amount={0.3} delay={0.2}>
              <Image
                className="w-10 h-10 text-purple-500"
                src="/image/icon/Type=saturn.png"
                alt="محاكاة امتحانات حقيقية"
                width={40}
                height={40}
              />
              <div className="mt-20">
                <h2 className="text-xl font-bold"> محاكاة امتحانات حقيقية </h2>
                <p className="text-[#667085] mt-2 font-normal text-[16px]">
                  تدعمك المنصة باختبارات محاكية للأختبار الفعلي وتحدد مستوى
                  الطالب ويتنبأ بدرجة تقريبية لمستواه.
                </p>
              </div>
            </ScrollDiv>

            <ScrollDiv className="bg-white rounded-lg shadow-md p-6 flex flex-col hover:-translate-y-2 transition-transform duration-300" amount={0.3} delay={0.3}>
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
                <p className="text-[#667085] mt-2 font-normal text-[16px]">
                  تعرف على مواضع قوتك ونقاط ضعفك بالذكاء الإصطناعي وأعمل على
                  تحسينها.
                </p>
              </div>
            </ScrollDiv>
          </div>
        </div>
      </ScrollSection>

      {/* All in one place Section */}
      <ScrollSection className="font-sans text-gray-900 bg-[#F7F5FF] my-4 md:m-4 rounded-0 md:rounded-2xl" amount={0.1}>
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-[120px]">
          {/* Header (Centered) */}
          <div className="text-center">
            <ScrollH2 className="text-4xl text-center md:text-[56px] font-bold leading-tight md:leading-none" amount={0.3}>
              ماذا تقدم منصة مبهر في اختبار القدرات العامة؟
            </ScrollH2>
            <ScrollP className="text-sm text-black mt-4" amount={0.3} delay={0.1}>
              منصة مبهر تقدم اقوى الأختبارات التي تساعدك على رفع درجاتك وتحقيق
              هدفك في الوصول إلى أفضل الجامعات العالمية وتشمل:
            </ScrollP>
          </div>

          {/* Main Content */}
          <div className="mt-8 flex flex-col lg:flex-row-reverse gap-6 lg:items-stretch">
            {/* Second Card (Verbal) */}
            <ScrollDiv className="bg-white rounded-lg shadow-md p-6 flex-1 flex flex-col hover:-translate-y-2 transition-transform duration-300" amount={0.3} delay={0.1} initialX={-50} initialY={0}>
              {/* Image Section */}
              <div className="order-3">
                <Image
                  src="/image/arabic_content/verbalSection.jpg"
                  alt="القسم اللفظي"
                  width={500}
                  height={300}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Verbal Section */}
              <div className="mt-6 order-4">
                <h2 className="text-[28px] font-semibold">القسم اللفظي:</h2>
                <p className="text-black font-medium text-[16px] mt-2">
                  الخطأ السياقي ، إكمال الجمل ، استيعاب المقروء ، التناظر اللفظي ، المفردة الشاذة
                </p>
              </div>
            </ScrollDiv>

            {/* First Card (Quant) */}
            <ScrollDiv className="bg-white rounded-lg shadow-md p-6 flex-1 mt-6 lg:mt-0 flex flex-col hover:-translate-y-2 transition-transform duration-300" amount={0.3} delay={0.2} initialX={50} initialY={0}>
              {/* Image Section */}
              <div className="order-1">
                <Image
                  src="/image/arabic_content/quantitativeSection.jpg"
                  alt="القسم الكمي"
                  width={500}
                  height={300}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Quant Section */}
              <div className="mt-6 order-2">
                <h2 className="text-[28px] font-semibold">القسم الكمي:</h2>
                <p className="text-black font-medium text-[16px] mt-2">
                  المسائل الجبرية، المسائل الحسابية، المسائل الهندسية، تحليل
                  البيانات، ومفاهيم رياضية متقدمة.
                </p>
              </div>
            </ScrollDiv>
          </div>

          {/* Contact Us Button */}
          <ScrollDiv className="mt-14 text-center" amount={0.5} delay={0.3}>
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

      {/* All exam Section */}
      <ScrollSection className="font-sans text-gray-900 bg-white my-4 md:m-4 rounded-0 md:rounded-2xl"
        style={{ backgroundImage: "url('/image/Vector.svg')" }}
        amount={0.1}
      >
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-[120px]">
          {/* Header (Centered) */}
          <div className="text-center">
            <ScrollH2 className="text-4xl text-center md:text-[56px] pb-4 font-bold leading-tight md:leading-none" amount={0.3}>
              أقسام اختبارات القدرات
            </ScrollH2>
            <ScrollP className="text-sm text-gray-500 mt-1" amount={0.3} delay={0.1}>
              أفضل منصة للتدرب على اختبار القدرات العامة
            </ScrollP>
          </div>

          {/* Quantitative Section */}
          <div className="mt-[56px]">
            <div className="flex flex-col lg:flex-row bg-[#F2F4F7] rounded-lg py-16 px-10 gap-8 lg:gap-32">
              <div className="flex-1">
                {/* Button Section */}
                <div className="inline-flex items-center rounded-full bg-[#F9FAFB] text-[#671E5A] border-2 border-[#EAECF0] px-4 py-1 text-sm font-semibold mb-3">
                  القسم الكمي
                </div>
                <h3 className="text-2xl font-semibold mt-2 mb-[76px]">
                  طور مهاراتك في <br />
                  الكمي مع مبهر
                </h3>

                <p className="text-gray-600 font-normal text-[16px] lg:w-[413px] mt-18 mb-6">
                  في هذا القسم، ستتحدى قدراتك في حل المشكلات، والقياس، والأستنتاج
                  المنطقي. استعد لتوظيف مهاراتك الكمية في مواقف متنوعة تتطلب
                  تفكيرا دقيقا وحلولا ذكية. أثبت نفسك، وكن مستعًدا لأكتشاف مدى
                  قوة تحليلك.
                </p>
              </div>
              <div className="w-full lg:w-[465px]">
                <Image
                  src="/image/arabic_content/2-MQuantitative.png"
                  className="w-full"
                  alt="القسم الكمي"
                  width={465}
                  height={300}
                />
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mt-6">
              <div
                className="bg-[#F2F4F7] rounded-lg p-4 text-right shadow-sm space-y-28"
                style={{
                  boxShadow:
                    "0 4px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05)",
                }}
              >
                <Image
                  className="w-14 h-14 text-purple-500"
                  src="/image/icon/HeartOfAlgebra.png"
                  alt="العمليات الحسابية"
                  width={56}
                  height={56}
                />
                <p className="mt-2 text-[20px] font-semibold">العمليات الحسابية</p>
              </div>
              <div
                className="bg-[#F2F4F7] rounded-lg p-4 text-right shadow-sm space-y-28"
                style={{
                  boxShadow:
                    "0 4px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05)",
                }}
              >
                <Image
                  className="w-14 h-14 text-purple-500"
                  src="/image/icon/Problem-SolvingSkills.png"
                  alt="الجبر"
                  width={56}
                  height={56}
                />
                <p className="mt-2 text-[20px] font-semibold">الجبر</p>
              </div>
              <div
                className="bg-[#F2F4F7] rounded-lg p-4 text-right shadow-sm space-y-28"
                style={{
                  boxShadow:
                    "0 4px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05)",
                }}
              >
                <Image
                  className="w-14 h-14 text-purple-500"
                  src="/image/icon/Type=PassportToAdvancedMath.png"
                  alt="الهندسة"
                  width={56}
                  height={56}
                />
                <p className="mt-2 text-[20px] font-semibold">الهندسة</p>
              </div>
              <div
                className="bg-[#F2F4F7] rounded-lg p-4 text-right shadow-sm space-y-28"
                style={{
                  boxShadow:
                    "0 4px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05)",
                }}
              >
                <Image
                  className="w-14 h-14 text-purple-500"
                  src="/image/icon/Type=math.png"
                  alt="التحليل البياني"
                  width={56}
                  height={56}
                />
                <p className="mt-2 text-[20px] font-semibold">التحليل البياني</p>
              </div>
              <div
                className="bg-[#F2F4F7] rounded-lg p-4 text-right shadow-sm space-y-28"
                style={{
                  boxShadow:
                    "0 4px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05)",
                }}
              >
                <Image
                  className="w-14 h-14 text-purple-500"
                  src="/image/icon/Type=PassportToAdvancedMath.png"
                  alt="القياس والمنطق"
                  width={56}
                  height={56}
                />
                <p className="mt-2 text-[20px] font-semibold">القياس والمنطق</p>
              </div>
              <div
                className="bg-[#F2F4F7] rounded-lg p-4 text-right shadow-sm space-y-28"
                style={{
                  boxShadow:
                    "0 4px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05)",
                }}
              >
                <Image
                  className="w-14 h-14 text-purple-500"
                  src="/image/icon/Type=math.png"
                  alt="مسائل عقلية"
                  width={56}
                  height={56}
                />
                <p className="mt-2 text-[20px] font-semibold">مسائل عقلية</p>
              </div>
            </div>
          </div>

          {/* Verbal Section */}
          <div className="mt-[56px]">
            <div className="flex flex-col lg:flex-row bg-[#F2F4F7] rounded-lg py-16 px-10 gap-8 lg:gap-32">
              <div className="flex-1">
                {/* Button Section */}
                <div className="inline-flex items-center rounded-full bg-[#F9FAFB] text-[#671E5A] border-2 border-[#EAECF0] px-4 py-1 text-sm font-semibold mb-3">
                  القسم اللفظي
                </div>
                <h3 className="text-2xl font-semibold mt-2 mb-[76px]">
                  أتقن مهاراتك اللفظية
                </h3>

                <p className="text-gray-600 font-normal text-[16px] lg:w-[413px] mt-[144px] mb-6">
                  ففي هذا القسم من اختبار القدرات العامة، تقاس مهاراتك اللغوية
                  بكل دقة وذكاء. ستتدرب على فهم النصوص، واستخلاص المعاني، وإكمال
                  الجمل، والتعامل مع التناظر اللفظي بكل سلاسة.
                </p>
              </div>
              <div className="w-full">
                <Image
                  src="/image/arabic_content/2-MVerbal.png"
                  className="w-full"
                  alt="القسم اللفظي"
                  width={600}
                  height={400}
                />
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
              <div className="bg-[#F2F4F7] rounded-lg p-4 shadow-[0_4px_15px_rgba(0,0,0,0.1),0_1px_6px_rgba(0,0,0,0.05)] min-h-[160px] flex flex-col justify-between">
                <Image
                  className="w-14 h-14 object-contain"
                  src="/image/icon/Type=ReadingComprehension.png"
                  alt="الخطأ السياقي"
                  width={56}
                  height={56}
                />
                <p className="mt-3 text-[20px] font-semibold">الخطأ السياقي</p>
              </div>

              <div className="bg-[#F2F4F7] rounded-lg p-4 shadow-[0_4px_15px_rgba(0,0,0,0.1),0_1px_6px_rgba(0,0,0,0.05)] min-h-[160px] flex flex-col justify-between">
                <Image
                  className="w-14 h-14 object-contain"
                  src="/image/icon/Type=VocabularyInContext.png"
                  alt="إكمال الجمل"
                  width={56}
                  height={56}
                />
                <p className="mt-3 text-[20px] font-semibold">إكمال الجمل</p>
              </div>

              <div className="bg-[#F2F4F7] rounded-lg p-4 shadow-[0_4px_15px_rgba(0,0,0,0.1),0_1px_6px_rgba(0,0,0,0.05)] min-h-[160px] flex flex-col justify-between">
                <Image
                  className="w-14 h-14 object-contain"
                  src="/image/icon/Type=Grammar&Usage.png"
                  alt="استيعاب المقروء استخدام"
                  width={56}
                  height={56}
                />
                <p className="mt-3 text-[20px] font-semibold">
                  استيعاب المقروء استخدام
                </p>
              </div>

              <div className="bg-[#F2F4F7] rounded-lg p-4 shadow-[0_4px_15px_rgba(0,0,0,0.1),0_1px_6px_rgba(0,0,0,0.05)] min-h-[160px] flex flex-col justify-between">
                <Image
                  className="w-14 h-14 object-contain"
                  src="/image/icon/Type=CommandOfEvidence.png"
                  alt="المفردة الشاذة"
                  width={56}
                  height={56}
                />
                <p className="mt-3 text-[20px] font-semibold">المفردة الشاذة</p>
              </div>

              <div className="bg-[#F2F4F7] rounded-lg p-4 shadow-[0_4px_15px_rgba(0,0,0,0.1),0_1px_6px_rgba(0,0,0,0.05)] min-h-[160px] flex flex-col justify-between">
                <Image
                  className="w-14 h-14 object-contain"
                  src="/image/icon/Type=RhetoricalSkills.png"
                  alt="القياس والمنطق"
                  width={56}
                  height={56}
                />
                <p className="mt-3 text-[20px] font-semibold">القياس والمنطق</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollSection >

      {/* How Mubhir helps Section */}
      <ScrollSection className="font-sans text-gray-900 bg-[#EAECF0] my-4 md:m-4 rounded-0 md:rounded-2xl" amount={0.1}>
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-[120px]">
          {/* Header (Centered) */}
          <div className="mx-auto max-w-[610px] space-y-4">
            <ScrollH2 className="text-4xl text-center md:text-[56px] font-bold leading-tight md:leading-none" amount={0.3}>
              كيف يساعدك مبهر على التفوق في اختبار القدرات
            </ScrollH2>
            <ScrollP className="text-[16px] text-black mt-1 text-center" amount={0.3} delay={0.1}>
              ابدأ تجربتك المجانية اليوم واستكشف منصتنا المميزة المصممة خصيصا لنجاحك
            </ScrollP>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8 sm:mb-16 mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 w-full max-w-3xl">
              {['وضع التدريب', 'محاكاة اختبار القدرات', 'بنك الأسئلة', 'منهج متكامل', 'مكافآت الإحالة'].map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(`tab${index + 1}`)}
                  className={`py-1 text-center font-medium text-sm sm:text-[18px] border-b-4 transition-colors cursor-pointer ${activeTab === `tab${index + 1}`
                    ? 'text-black border-[#4F46F4]'
                    : 'text-[#98A2B3] border-[#D0D5DD]'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {/* Tab 1: وضع التدريب */}
            {activeTab === 'tab1' && (
              <motion.div
                key="tab1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mx-auto max-w-7xl lg:px-8 py-10"
              >
                <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    <div className="order-1 lg:order-2">
                      <div className="inline-flex items-center rounded-full bg-[#F9FAFB] text-[#671E5A] border-2 border-[#EAECF0] px-4 py-1 text-sm font-semibold mb-3">
                        وضع التدريب المكثف
                      </div>
                      <h2 className="text-3xl sm:text-4xl xl:text-4xl font-semibold leading-tight tracking-tight">
                        تدريب شخصي مصمم خصيصاً لك، لتتعلم بذكاء وتنجح بثقة
                      </h2>
                      <p className="mt-3 text-gray-600 text-[16px] font-normal leading-relaxed">
                        نحن نساعد جميع طلاب المملكة على تحقيق أقصى درجاتهم في اختبار القدرات العامة بأذكى الطرق وأعلى كفاءة.
                      </p>
                      <ul className="mt-40 space-y-3 text-gray-800">
                        {[
                          'صمم اختباراتٍ تجريبية حسب مستوى الصعوبة والوقت والموضوعات.',
                          'احصل على تعليقاتٍ فورية وتفسيرات فيديو لكل سؤال.',
                          'ركز على نقاط ضعفك وقم ببناء الثقة خطوة بخطوة.'
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#7E22CE]/20">
                              <CircleCorrectIcon />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="order-2 lg:order-1">
                      <div className="relative rounded-2xl bg-[#F9FAFB] shadow-md ring-1 ring-gray-100 overflow-hidden">
                        <Image src="/image/trainingMode.jpg" alt="واجهة تفاعلية" width={600} height={400} className="w-full h-auto object-cover px-7 py-24" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 2: محاكاة اختبار القدرات */}
            {activeTab === 'tab2' && (
              <motion.div
                key="tab2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mx-auto max-w-7xl lg:px-8 py-10"
              >
                <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
                  <div className="flex justify-center">
                    <div className="inline-flex items-center rounded-full bg-[#F9FAFB] text-[#671E5A] px-4 py-1 border-2 border-[#EAECF0] text-sm font-semibold mb-3">
                      محاكاة قدرات
                    </div>
                  </div>
                  <h2 className="mt-4 text-center text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-[-1.5px]">
                    تدريب مثل الاختبار الحقيقي
                  </h2>
                  <p className="mt-4 max-w-3xl mx-auto text-center text-gray-600 text-base">
                    نحن نساعد الطلاب في جميع أنحاء الشرق الأوسط على زيادة درجات قدرات الخاصة بهم بكفاءة.
                  </p>
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                      { text: 'قم بإجراء +1,000 اختبار وهمي مصمم من قبل الخبراء', color: '#EEE3FF', stroke: '#761DFF' },
                      { text: 'جرّب ظروف اختبار قدرات الحقيقية', color: '#E0F7FF', stroke: '#00AFE6' },
                      { text: 'تحليلات مفصلة وتتبع الأداء', color: '#FFE9F5', stroke: '#FF0086' }
                    ].map((card, idx) => (
                      <div key={idx} className="relative rounded-3xl bg-[#F9FAFB] shadow-soft p-8">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill={card.color} />
                          <path d="M22.6668 16C22.6668 12.3181 19.6821 9.33329 16.0002 9.33329C12.3183 9.33329 9.3335 12.3181 9.3335 16C9.3335 19.6819 12.3183 22.6666 16.0002 22.6666C19.6821 22.6666 22.6668 19.6819 22.6668 16Z" stroke={card.stroke} />
                          <path d="M13.3335 16.5C13.3335 16.5 14.4002 17.1084 14.9335 18C14.9335 18 16.5335 14.5 18.6668 13.3334" stroke={card.stroke} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-10 text-lg">{card.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 3: بنك الأسئلة */}
            {activeTab === 'tab3' && (
              <motion.div
                key="tab3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mx-auto max-w-7xl lg:px-8 py-10"
              >
                <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
                  <div className="flex justify-center">
                    <div className="inline-flex items-center rounded-full bg-[#F9FAFB] text-[#671E5A] px-4 py-1 border-2 border-[#EAECF0] text-sm font-semibold mb-3">
                      بنك الأسئلة
                    </div>
                  </div>
                  <h2 className="mt-4 text-center text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-[-1.5px]">
                    ابق في الطليعة
                  </h2>
                  <p className="mt-4 max-w-3xl mx-auto text-center text-black text-base">
                    نحن نساعد الطلاب في جميع أنحاء <br /> الشرق الأوسط على زيادة درجات <br /> قدرات الخاصة بهم بكفاءة.
                  </p>
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      'الآلاف من أحدث أسئلة قدرات مطابقة',
                      'يغطي جميع مستويات الصعوبة ، من المبتدئين إلى المتقدمين',
                      'أسئلة برعاية معلمين خبراء لضمان الدقة'
                    ].map((text, idx) => (
                      <div key={idx} className="text-center">
                        <Image src="/image/questionBank.jpg" alt="Question Bank" width={300} height={200} className="rounded-3xl bg-[#F9FAFB] shadow-sm p-8 mx-auto" />
                        <p className="mt-3 text-lg">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 4: منهج متكامل */}
            {activeTab === 'tab4' && (
              <motion.div
                key="tab4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mx-auto max-w-7xl lg:px-8 py-10"
              >
                <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    <div className="order-2 lg:order-1">
                      <div className="inline-flex items-center rounded-full bg-[#F9FAFB] text-[#671E5A] border-2 border-[#EAECF0] px-4 py-1 text-sm font-semibold mb-3">
                        دروس فيديو
                      </div>
                      <h2 className="text-3xl sm:text-4xl xl:text-4xl font-semibold leading-tight tracking-tight">
                        تعلم أكثر ذكاء وليس أصعب
                      </h2>
                      <p className="mt-3 text-gray-600 text-[16px] font-normal leading-relaxed">
                        نحن نساعد جميع طلاب المملكة على تحقيق أقصى درجاتهم في اختبار القدرات العامة بأذكى الطرق وأعلى كفاءة.
                      </p>
                      <ul className="mt-40 space-y-3 text-gray-800">
                        {[
                          'حلول فيديو خطوة بخطوة لكل سؤال.',
                          'يتم تدريسها من قبل مدربين خبراء لتبسيط المفاهيم المعقدة.',
                          'تعزيز التعلم باستخدام تقنيات حل المشكلات التفاعلية.'
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#7E22CE]/20">
                              <CircleCorrectIcon />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="order-1 lg:order-2">
                      <div className="relative rounded-2xl bg-[#F9FAFB] shadow-md ring-1 ring-gray-100 overflow-hidden">
                        <Image src="/image/integratedApproach.jpg" alt="واجهة تفاعلية" width={600} height={400} className="w-full h-auto object-cover px-7 py-24" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 5: مكافآت الإحالة */}
            {activeTab === 'tab5' && (
              <motion.div
                key="tab5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mx-auto max-w-7xl lg:px-8 py-10"
              >
                <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
                  <div className="flex justify-center">
                    <div className="inline-flex items-center rounded-full bg-[#F9FAFB] text-[#671E5A] px-4 py-1 border-2 border-[#EAECF0] text-sm font-semibold mb-3">
                      مكافآت الإحالة
                    </div>
                  </div>
                  <h2 className="mt-4 text-center text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-[-1.5px]">
                    مكافآت الإحالة - دعوة واكسب
                  </h2>
                  <p className="mt-4 max-w-3xl mx-auto text-center text-gray-600 text-base">
                    نحن نساعد الطلاب في جميع أنحاء الشرق الأوسط على زيادة درجات قدرات الخاصة بهم بكفاءة.
                  </p>
                  <section className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    <div className="relative rounded-3xl bg-[#F9FAFB] p-6 sm:p-8 shadow-soft">
                      <div className="rounded-3xl bg-[#F9FAFB] shadow-soft">
                        <Image src="/image/icon/gift.png" alt="شارك مبهر مع الأصدقاء واكسب أرصدة ومكافآت اختبار حصرية." width={64} height={64} />
                      </div>
                      <p className="mt-10 sm:mt-12 text-lg leading-9 text-gray-900">
                        شارك مبهر مع الأصدقاء واكسب أرصدة ومكافآت اختبار حصرية.
                      </p>
                    </div>
                    <div className="relative rounded-3xl bg-[#F9FAFB] p-6 sm:p-8 shadow-soft">
                      <div className="rounded-3xl bg-[#F9FAFB] shadow-soft">
                        <Image src="/image/icon/mortarboard-01.png" alt="ساعد أصدقائك على النجاح مع الحصول على مكافآت لنفسك" width={64} height={64} />
                      </div>
                      <p className="mt-10 sm:mt-12 text-lg leading-9 text-gray-900">
                        ساعد أصدقائك على النجاح مع الحصول على مكافآت لنفسك
                      </p>
                    </div>
                  </section>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollSection>

      {/* Pricing */}
      <ScrollSection className="bg-linear-to-tr from-[#2A056D] to-[#6F0767] flex justify-center my-4 md:m-4 rounded-0 md:rounded-2xl" amount={0.1}>
        <div className="container max-w-6xl px-4 py-12 sm:py-[120px]">
          <ScrollH2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-semibold text-white md:leading-[95px] leading-[44px] text-center" amount={0.3}>
            أسعار مرنة لكل طالب يبغي يتفوق في القدرات
          </ScrollH2>
          <ScrollP className="mt-3 sm:mt-6 text-white text-center text-sm sm:text-base" amount={0.3} delay={0.1}>
            اختر الخطة التي تناسب ميزانيتك وتدعم هدفك
          </ScrollP>

          <main className="max-w-6xl mx-auto flex flex-col px-0 md:px-4 py-6">
            <div id="plansGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
              {pricingPlans.map((plan) => (
                <div key={plan.id} className="bg-white shadow-md rounded-2xl p-6 w-full flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[18px] font-semibold">{plan.title_ar}</h3>
                    {plan.promotional_badge != null && plan.promotional_badge > 0 && (
                      <span
                        className="text-white text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ backgroundColor: '#C445A6' }}
                      >
                        وفر {plan.promotional_badge}%
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{plan.description_ar}</p>
                  <p className="text-3xl font-bold text-[#671E5A]">
                    {plan.price_display}
                    <span className="text-3xl font-bold text-[#671E5A] pr-2">ر.س</span>
                  </p>
                  <p className="text-xs mb-6 border-b border-[#D9D9D9] pb-[12px]">{plan.terms_ar}</p>
                  <ul className="space-y-3 mb-6 grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-4 h-4 bg-[#671E5b] rounded-full flex items-center justify-center shrink-0">
                          <CorrectIcon />
                        </span>
                        <span className="text-[14px] font-bold text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {/* <Link href="https://cms.mubhir.ai/ar-checkout"> */}
                  <Link href="/checkout">
                    <button className="w-full border border-[#671E5A] text-[#671E5A] hover:bg-[#671E5A] hover:text-white transition rounded-full py-2 font-semibold mt-6">
                      ابدأ {plan.title_ar}
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </main>
        </div>
      </ScrollSection>

      {/* Your Questions Answered Section */}
      <ScrollSection className="bg-[#eaecf0] flex justify-center my-4 md:m-4 rounded-0 md:rounded-2xl" amount={0.1}>
        <div className="container max-w-6xl px-4 py-12 sm:py-[120px]">
          <ScrollH2 className="text-[56px] font-semibold text-center text-black" amount={0.3}>
            كل إستفسارات طلاب القدرات
            <br />
          </ScrollH2>
          <ScrollP className="mt-2 text-center text-gray-600" amount={0.3} delay={0.1}>الأسئلة الشائعة</ScrollP>
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

          <ScrollP className="text-black font-medium mb-[12px] mt-[32px] text-center" amount={0.5} delay={0.2}>
            ما زلت لديك أسئلة؟
          </ScrollP>
          <ScrollDiv className="mt-6 flex justify-center items-center space-x-6 space-x-reverse" amount={0.5} delay={0.3}>
            <Link href="/ar-contactUs">
              <button className="flex items-center bg-[#671e5a] text-white font-medium rounded-full pr-5 pl-2 py-2 shadow-lg">
                تواصل معنا
                <span className="flex items-center justify-center mr-6 w-8 h-8 bg-white text-white rounded-full">
                  <LeftClrArrow />
                </span>
              </button>
            </Link>
          </ScrollDiv>
        </div>
      </ScrollSection>

      {/* CTA Section */}
      <ScrollSection className="bg-[#691d5e] text-white px-4 pt-12 md:pt-20 my-4 md:m-4 rounded-0 md:rounded-2xl" amount={0.2}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Right Content */}
          <ScrollDiv className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-right space-y-6" initialX={50} initialY={0} amount={0.3} delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-semibold leading-snug">
              قم بأخذ اختبار محاكاة<br />قدرات الأول
              <span className="relative inline-block pb-2">
                الخاص
                <Image
                  src="/image/Vector 1.svg"
                  alt="underline"
                  width={100}
                  height={8}
                  className="bottom-0 w-[57%] h-2 -z-10 pointer-events-none"
                />
              </span>
              <br />بك مجانًا!
            </h2>
            <p className="text-base md:text-lg">
              سجل وابدأ التدريب اليوم!
            </p>
          </ScrollDiv>

          {/* Image (Adjusted to Prevent Cropping) */}
          <ScrollDiv className="order-last md:order-0 flex justify-center items-center" initialX={-50} initialY={0} amount={0.3} delay={0.2}>
            <Image
              src="/image/review-cover.png"
              alt="طالبة"
              width={350}
              height={350}
              className="h-[350px] object-cover"
            />
          </ScrollDiv>
        </div>
      </ScrollSection>

      <Footer />
    </div >
  );
}
