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
import LeftClrArrow from "@/public/icons/LeftClrArrow";
import FaqItem from "@/components/FaqItem/FaqItem";

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
                #سؤال
              </span>
              <span className="transform -rotate-15 md:-rotate-25 md:absolute md:left-40 md:top-50 bg-purple-600 text-white px-4 py-1 rounded-full text-xs md:text-sm font-semibold shadow-md">
                #قدرات
              </span>
            </div>

            <h1 className="text-4xl md:text-[76px] font-bold leading-tight md:leading-none">
              نجاحك الحقيقي في
              <br />
              القدرات يبدأ بخطوة نحو
              <br />
              التميز
            </h1>

            <p className="mt-4 text-base md:text-lg max-w-md md:max-w-xl mx-auto text-gray-200">
              نطلق العنان لك لتعيش تجربة تعليمية فريدة تمكنك من اجتياز اختبارات
              القدرات بذكاء وتميز، باستخدام أساليب تعليمية متطورة. تعلم بذكاء،
              واصنع نجاحك بنفسك، تحت إشراف نخبة من أكفأ المدربين المتخصصين،
              وتوجيه مستمر ودعم فعال يساعدك على تحقيق أعلى النتائج بثقة وتمّيز.
            </p>

            <div className="mt-6 flex justify-center items-center space-x-reverse space-x-4">
              <div className="relative inline-block">
                <Link href="https://cms.mubhir.ai/ar-select-package">
                  <button className="flex items-center pt-1 pr-6 pb-1 pl-1 bg-white text-[#671e5a] font-medium rounded-full shadow-lg hover:bg-[#671e5a] hover:text-white">
                    إستعد الأن
                    <span className="relative flex items-center justify-center mr-3 bg-[#671e5a] text-white rounded-full">
                      <LeftArrow />
                    </span>
                  </button>
                </Link>
                <Image
                  src="/image/bitcoin2.png"
                  className="absolute right-30 md:right-33 top-7"
                  alt="أيقونة بتكوين"
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
              className="flex space-x-4 space-x-reverse"
              style={{ marginBottom: "60px" }}
            >
              <Link href="https://wa.me/966568876934">
                <div className="bg-white rounded-full p-2 md:p-[8.18px]">
                  <WhatsappIcon />
                </div>
              </Link>
              <Link href="https://www.instagram.com/mubhirai?igsh=MXBtcXdwOWV5NjdpOA==">
                <div className="rounded-full p-2 md:p-[8.18px] bg-[#671e5a]">
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

      {/* Mission Section */}
      <section className="bg-[#f7e8f5] py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block text-gray-500 text-[16px] font-medium mb-4">
            رسالتنا
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-6 leading-tight">
            مبهر منصة تعليمية احترافية تؤمن بأن لكل طالب الحق في <br /> الوصول
            إلى التميز والنجاح. لهذا السبب، ابتكرنا أقوى
          </h1>
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mt-10 leading-tight">
            منصة متقدمة للتحضير لأختبارات القدرات، مدعومة بأحدث <br /> تقنيات
            الذكاء الإصطناعي. نطمح إلى بناء جيل قوي، واع <br />
            ومؤهل لقيادة نهضة المملكة وتطوير مستقبلها، من خلال تعلم ذكي
            <br /> وموجه يساعد الطالب على إتقان اختبار ٍالقدرات بثقة وتميز،{" "}
            <br />
            وتحقيق أعلى الدرجات.
          </h1>
        </div>
      </section>

      {/* Why Choose Mubhir Section */}
      <section className="bg-white bg-[url('data:image/svg+xml,%3Csvg%20width=%2720%27%20height=%2720%27%20viewBox=%270%200%2020%2020%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill=%27%23e0e0e0%27%20fill-opacity=%270.4%27%20fill-rule=%27evenodd%27%3E%3Ccircle%20cx=%2713%27%20cy=%273%27%20r=%271%27/%3E%3Ccircle%20cx=%273%27%20cy=%2713%27%20r=%271%27/%3E%3C/g%3E%3C/svg%3E')] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-semibold leading-tight text-center">
            لماذا تختار
            <span className="relative inline-block pb-2 z-10">
              مبھر
              <Image
                src="/image/Vector 1.svg"
                alt="تسطير"
                width={100}
                height={10}
                className="absolute right-0 bottom-0 w-full h-2 sm:h-[10px] -z-10 pointer-events-none"
              />
            </span>
          </h1>
          <p className="mt-3 sm:mt-[12px] text-center text-sm sm:text-base mb-[56px]">
            كل ما تحتاجه للتميز في القدرات العامة يبدأ من هنا...أكتشف أفضل ما
            يميز اختباراتنا الذكية
          </p>

          {/* First Row: 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#F9FAFC] rounded-lg p-6 flex flex-col justify-between min-h-48">
              <span className="text-blue-500">
                <Image
                  className="w-8 h-8"
                  src="/image/icon/Type=user.png"
                  alt=""
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
            </div>

            <div className="bg-[#F9FAFC] rounded-lg p-6 flex flex-col justify-between min-h-48">
              <span className="text-blue-500">
                <Image
                  className="w-8 h-8"
                  src="/image/icon/Type=OnlineLearning03.png"
                  alt=""
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
            </div>
          </div>

          {/* Second Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F9FAFC] rounded-lg p-6 flex flex-col justify-between min-h-48">
              <span className="text-blue-500">
                <Image
                  className="w-8 h-8"
                  src="/image/icon/Type=AIRecognition.png"
                  alt=""
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
            </div>

            <div className="bg-[#F9FAFC] rounded-lg p-6 flex flex-col justify-between min-h-48">
              <span className="text-blue-500">
                <Image
                  className="w-8 h-8"
                  src="/image/icon/Type=OnlineLearning01.png"
                  alt=""
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
            </div>

            <div className="bg-[#F9FAFC] rounded-lg p-6 flex flex-col justify-between min-h-48">
              <span className="text-blue-500">
                <Image
                  className="w-8 h-8"
                  src="/image/icon/Type=AudioBook.png"
                  alt=""
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
            </div>
          </div>

          <div className="mt-6 flex justify-center items-center space-x-6 space-x-reverse">
            <Link href="https://cms.mubhir.ai/ar-select-package">
              <button className="flex items-center bg-[#671e5a] text-white font-medium rounded-full pr-5 pl-2 py-2 shadow-lg">
                ابدأ الآن
                <span className="flex items-center justify-center mr-6 w-8 h-8 bg-white text-white rounded-full">
                  <LeftClrArrow />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Founder Statement Section */}
      <section className="bg-[#F2F4F7] py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-center">
          {/* Right Side: Heading and Description */}
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[56px] font-semibold leading-tight">
              تعرف على مؤسس منصة مبهر
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-6">
              نؤمن بأن لكل طالب طموح، هناك درجة يستحقها و نحن هنا لنساعدك على
              الوصول إليها
            </p>
          </div>

          {/* Left Side: Testimonial Card */}
          <div className="bg-white rounded-lg p-6 shadow-md flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-reverse md:space-x-4">
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
              <p className="text-gray-800 font-semibold text-sm sm:text-base mt-[114px]">
                عبدالله الغامدي
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">
                مؤسس منصة مبهر
              </p>
            </div>
          </div>
        </div>
      </section>

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
              ابدأ
              <span className="relative inline-block pb-2">
                اليوم!
                <Image
                  src="/image/Vector 1.svg"
                  alt="underline"
                  width={100}
                  height={8}
                  className="bottom-0 w-[47%] h-2 -z-10 pointer-events-none"
                />
              </span>
            </h1>
            <p className="text-base md:text-lg">
              انضم إلى آلاف الطلاب الذين يستعدون بذكاء، وليس بجهد أكبر. سجّل
              الآن وابدأ اختبارك التجريبي الأول مجانًا!
            </p>
          </div>

          {/* Image */}
          <div className="order-last md:order-0 flex justify-center items-center">
            <Image
              src="/image/review-cover.png"
              alt="طالبة"
              width={350}
              height={350}
              className="h-[350px] object-cover"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
