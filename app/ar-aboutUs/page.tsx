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
import LeftClrArrow from "@/public/icons/LeftClrArrow";
import FaqItem from "@/components/FaqItem/FaqItem";
import { motion } from "framer-motion";
import { ScrollAnimated, ScrollSection, ScrollDiv, ScrollH2, ScrollP } from "@/components/ScrollAnimated/ScrollAnimated";

export default function ArAboutUsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
                dir="ltr"
              >
                #سؤال
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0, rotate: 15 }}
                animate={{ opacity: 1, scale: 1, rotate: 15 }}
                transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
                className="transform -rotate-15 md:-rotate-25 md:absolute md:left-40 md:top-60 bg-purple-600 text-white px-4 py-1 rounded-full text-xs md:text-sm font-semibold shadow-md"
              >
                #قدرات
              </motion.span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="text-4xl md:text-[76px] font-bold leading-tight md:leading-none"
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
              className="mt-6 flex justify-center items-center space-x-reverse space-x-4 cursor-pointer"
            >
              <div className="relative inline-block">
                {/* <Link href="https://cms.mubhir.ai/ar-select-package"> */}
                <Link href="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center pt-1 pr-6 pb-1 pl-1 bg-white text-[#671e5a] font-medium rounded-full shadow-lg hover:bg-[#671e5a] hover:text-white transition-colors duration-300"
                  >
                    إستعد الأن
                    <span className="relative flex items-center justify-center mr-3 bg-[#671e5a] text-white rounded-full">
                      <LeftArrow />
                    </span>
                  </motion.button>
                </Link>
                <Image
                  src="/image/bitcoin2.png"
                  className="absolute right-32 md:right-33 top-6"
                  alt="أيقونة بتكوين"
                  width={50}
                  height={50}
                  style={{ width: '50px', height: '50px' }}
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
                    src="/image/avt1.webp"
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
                    src="/image/avt4.webp"
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
                    src="/image/avt3.webp"
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
              className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 space-x-reverse order-2 md:order-2 mt-6 md:mt-0"
              style={{ marginBottom: "60px" }}
            >
              {[
                { href: "https://wa.me/966568876934", ariaLabel: "تواصل معنا عبر واتساب", Icon: WhatsappIcon, bg: "bg-white", delay: 1.3 },
                { href: "https://www.instagram.com/mubhirai?igsh=MXBtcXdwOWV5NjdpOA==", ariaLabel: "تواصل معنا عبر إنستغرام", Icon: InstaIcon, bg: "bg-[#671e5a]", delay: 1.4 },
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

      {/* Mission Section */}
      <ScrollSection
        className="bg-[#f7e8f5] my-4 md:m-4 rounded-0 md:rounded-2xl"
        amount={0.2}
      >
        <div className="max-w-5xl mx-auto text-center py-[120px]">
          <ScrollAnimated
            as="span"
            className="inline-block text-gray-500 text-[16px] font-medium mb-4"
            initialY={20}
            amount={0.5}
          >
            رسالتنا
          </ScrollAnimated>
          <ScrollH2
            className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-6 leading-tight"
            amount={0.5}
            delay={0.1}
          >
            مبهر منصة تعليمية احترافية تؤمن بأن لكل طالب الحق في <br /> الوصول
            إلى التميز والنجاح. لهذا السبب، ابتكرنا أقوى
          </ScrollH2>
          <ScrollH2
            className="text-3xl sm:text-4xl font-semibold text-gray-800 mt-10 leading-tight"
            amount={0.5}
            delay={0.2}
          >
            منصة متقدمة للتحضير لأختبارات القدرات، مدعومة بأحدث <br /> تقنيات
            الذكاء الإصطناعي. نطمح إلى بناء جيل قوي، واع <br />
            ومؤهل لقيادة نهضة المملكة وتطوير مستقبلها، من خلال تعلم ذكي
            <br /> وموجه يساعد الطالب على إتقان اختبار ٍالقدرات بثقة وتميز،{" "}
            <br />
            وتحقيق أعلى الدرجات.
          </ScrollH2>
        </div>
      </ScrollSection>

      {/* Why Choose Mubhir Section */}
      <ScrollSection
        className="bg-white my-4 md:m-4"
        style={{ backgroundImage: "url('/image/Vector.svg')" }}
        amount={0.1}
      >
        <div className="max-w-5xl mx-auto py-[120px]">
          <ScrollH2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-semibold leading-tight text-center"
            initialScale={0.9}
            initialY={0}
            amount={0.5}
          >
            لماذا تختار
            <span className="relative inline-block pb-2 z-10">
              مبھر
              <Image
                src="/image/Vector 1.svg"
                alt="تسطير"
                width={100}
                height={10}
                className="absolute right-0 bottom-0 w-full h-2 sm:h-[10px] -z-10 pointer-events-none"
                style={{ height: 'auto' }}
              />
            </span>
          </ScrollH2>
          <ScrollP
            className="mt-3 sm:mt-[12px] text-center text-sm sm:text-base mb-[56px]"
            amount={0.5}
            delay={0.1}
          >
            كل ما تحتاجه للتميز في القدرات العامة يبدأ من هنا...أكتشف أفضل ما
            يميز اختباراتنا الذكية
          </ScrollP>

          {/* First Row: 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ScrollDiv
              className="bg-[#F9FAFC] rounded-lg p-6 flex flex-col justify-between min-h-48 hover:-translate-y-2 transition-transform duration-300"
              initialX={-50}
              initialY={0}
              amount={0.3}
              delay={0.1}
            >
              <span className="text-blue-500">
                <Image
                  className="w-8 h-8"
                  src="/image/icon/Type=user.png"
                  alt="العديد من النماذج التجريبية المحاكية للأختبار الحقيقي"
                  width={32}
                  height={32}
                />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  العديد من النماذج التجريبية المحاكية للأختبار الحقيقي
                </h3>
                <p className="text-gray-600 text-sm">
                  بنك شامل من الأسئلة المصممة بعناية، محاكية للأختبارات النهائية
                  لتمنحك تجربة تدريبية واقعية ومتكاملة.
                </p>
              </div>
            </ScrollDiv>

            <ScrollDiv
              className="bg-[#F9FAFC] rounded-lg p-6 flex flex-col justify-between min-h-48 hover:-translate-y-2 transition-transform duration-300"
              initialX={50}
              initialY={0}
              amount={0.3}
              delay={0.2}
            >
              <span className="text-blue-500">
                <Image
                  className="w-8 h-8"
                  src="/image/icon/Type=OnlineLearning03.png"
                  alt="ممارسة شخصية وتدريب مكثف وأنت فى بيتك"
                  width={32}
                  height={32}
                />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  ممارسة شخصية وتدريب مكثف وأنت فى بيتك
                </h3>
                <p className="text-gray-600 text-sm">
                  من خلال منهج متكامل يضم مقاطع فيديو تعليمية واختبارات تفاعلية
                  محاكية، تساعدك على الفهم، التطبيق، والتفوق في اختبار القدرات
                </p>
              </div>
            </ScrollDiv>
          </div>

          {/* Second Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollDiv
              className="bg-[#F9FAFC] rounded-lg p-6 flex flex-col justify-between min-h-48 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300"
              amount={0.3}
              delay={0.1}
            >
              <span className="text-blue-500">
                <Image
                  className="w-8 h-8"
                  src="/image/icon/Type=AIRecognition.png"
                  alt="توقع نتيجتك مع مبهر"
                  width={32}
                  height={32}
                />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  توقع نتيجتك مع مبهر
                </h3>
                <p className="text-gray-600 text-sm">
                  في مبهر نحلل أدائك ونحدد نقاط ضعفك لتتجنبها ونعطيك توقعا دقيقا
                  للدرجة التي ستحصل عليها في الأختبار النهائي.
                </p>
              </div>
            </ScrollDiv>

            <ScrollDiv
              className="bg-[#F9FAFC] rounded-lg p-6 flex flex-col justify-between min-h-48 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300"
              amount={0.3}
              delay={0.2}
            >
              <span className="text-blue-500">
                <Image
                  className="w-8 h-8"
                  src="/image/icon/Type=OnlineLearning01.png"
                  alt="فيديو"
                  width={32}
                  height={32}
                />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  فيديوهات مفيدة ومختصرة لكل إجابة
                </h3>
                <p className="text-gray-600 text-sm">
                  فيديوهات قصيرة هادفة مصممة بواسطة مدربين خبراء محترفين
                  ومتخصصين
                </p>
              </div>
            </ScrollDiv>

            <ScrollDiv
              className="bg-[#F9FAFC] rounded-lg p-6 flex flex-col justify-between min-h-48 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300"
              amount={0.3}
              delay={0.3}
            >
              <span className="text-blue-500">
                <Image
                  className="w-8 h-8"
                  src="/image/icon/Type=AudioBook.png"
                  alt="كتاب صوتي"
                  width={32}
                  height={32}
                />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  تعلم مرن يناسب وقتك
                </h3>
                <p className="text-gray-600 text-sm">
                  يمكنك مع مبهر أن تتدرب من أي مكان، من أي جهاز، في أي وقت.
                </p>
              </div>
            </ScrollDiv>
          </div>

          <ScrollDiv
            className="mt-6 flex justify-center items-center space-x-6 space-x-reverse"
            amount={0.3}
            delay={0.4}
          >
            {/* <Link href="https://cms.mubhir.ai/ar-select-package"> */}
            <Link href="/signup">
              <button className="flex items-center bg-[#671e5a] text-white font-medium rounded-full pr-5 pl-2 py-2 shadow-lg">
                ابدأ الآن
                <span className="flex items-center justify-center mr-6 w-8 h-8 bg-white text-white rounded-full">
                  <LeftClrArrow />
                </span>
              </button>
            </Link>
          </ScrollDiv>
        </div>
      </ScrollSection>

      {/* Founder Statement Section */}
      <ScrollSection
        className="bg-[#F2F4F7] my-4 md:m-4 rounded-0 md:rounded-2xl"
        amount={0.2}
      >
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-center py-12 sm:py-[120px]">
          {/* Right Side: Heading and Description */}
          <ScrollDiv
            initialX={50}
            initialY={0}
            amount={0.3}
            delay={0.1}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[56px] font-semibold leading-tight text-center md:text-right">
              تعرف على مؤسس منصة مبهر
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-6 text-center md:text-right">
              نؤمن بأن لكل طالب طموح، هناك درجة يستحقها و نحن هنا لنساعدك على
              الوصول إليها
            </p>
          </ScrollDiv>

          {/* Left Side: Testimonial Card */}
          <ScrollDiv
            className="bg-white rounded-lg p-6 shadow-md flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4"
            initialX={-50}
            initialY={0}
            amount={0.3}
            delay={0.2}
          >
            <div className="w-full md:w-1/2 h-[300px] md:h-[430px] bg-gray-200 rounded-lg"></div>
            <div className="w-full md:w-1/2 text-right self-start">
              <p className="text-gray-600 text-xs sm:text-sm mb-4 italic">
                في مبهر، انطلقنا من إيمان عميق بأن لكل طالب القدرة على التميز،
                إذا توفرت له الأدوات الصحيحة. رأينا التحديات التي يواجهها الطالب
                في اختبارات القدرات، من إرتباك البداية إلى غياب التوجيه. ولهذا
                أبتكرنا مبهر، منصة تعليمية ذكية، مصممة لتجعل كل خطوة في رحلة
                الطالب واضحة، موجهة، ومليئة بالثقة. هدفنا لم يكن فقط مساعدة
                الطالب على اجتياز الأختبار، بل تمكينهم من تحقيق أعلى الدرجات
                بأقل توتر، وأكثر فاعلية.
              </p>
              <p className="text-gray-800 font-semibold text-sm sm:text-base mt-6 md:mt-[114px]">
                عبدالله الغامدي
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">
                مؤسس منصة مبهر
              </p>
            </div>
          </ScrollDiv>
        </div>
      </ScrollSection>

      {/* FAQ Section */}
      <ScrollSection
        className="bg-[#eaecf0] flex justify-center my-4 md:m-4 rounded-0 md:rounded-2xl"
        amount={0.1}
      >
        <div className="container max-w-6xl px-4 py-[120px]">
          <ScrollH2
            className="text-[56px] font-semibold text-center text-black"
            amount={0.5}
          >
            كل إستفسارات طلاب القدرات
            <br />
          </ScrollH2>
          <ScrollP
            className="mt-2 text-center text-gray-600"
            amount={0.5}
            delay={0.1}
          >
            الأسئلة الشائعة
          </ScrollP>
          <div className="mt-10 space-y-4">
            {faqData.map((faq, index) => (
              <ScrollDiv
                key={index}
                amount={0.3}
                delay={index * 0.1}
                initialY={30}
              >
                <FaqItem
                  question={faq.question}
                  answer={faq.answer}
                  index={index}
                  isOpen={openFaq === index}
                  onToggle={() => toggleFaq(index)}
                />
              </ScrollDiv>
            ))}
          </div>
          <ScrollP
            className="text-black font-medium mb-[12px] mt-[32px] text-center"
            amount={0.5}
            delay={0.3}
          >
            ما زلت لديك أسئلة؟
          </ScrollP>
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
      </ScrollSection>

      {/* CTA Section */}
      <ScrollSection
        className="bg-[#691d5e] text-white px-4 pt-12 md:pt-20 my-4 md:m-4 rounded-0 md:rounded-2xl"
        amount={0.2}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Right Content */}
          <ScrollDiv
            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-right space-y-6"
            initialX={50}
            initialY={0}
            amount={0.3}
            delay={0.1}
          >
            <h2 className="text-4xl md:text-5xl font-semibold leading-snug">
              ابدأ
              <span className="relative inline-block pb-2">
                اليوم!
                <Image
                  src="/image/Vector 1.svg"
                  alt="underline"
                  width={100}
                  height={8}
                  className="bottom-0 w-[47%] h-2 -z-10 pointer-events-none"
                  style={{ height: 'auto' }}
                />
              </span>
            </h2>
            <p className="text-base md:text-lg">
              انضم إلى آلاف الطلاب الذين يستعدون بذكاء، وليس بجهد أكبر. سجّل
              الآن وابدأ اختبارك التجريبي الأول مجانًا!
            </p>
          </ScrollDiv>

          {/* Image */}
          <ScrollDiv
            className="order-last md:order-0 flex justify-center items-center"
            initialX={-50}
            initialY={0}
            amount={0.3}
            delay={0.2}
          >
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
    </div>
  );
}
