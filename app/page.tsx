"use client";

import Footer from "@/components/Footer/Footer";
import FaqItem from "@/components/FaqItem/FaqItem";
import FeatureCard from "@/components/FeatureCard/FeatureCard";
import Navbar from "@/components/Navber/Navbar";
import CardLeftArrowIcon from "@/public/icons/CardLeftArrowIcon";
import DownArrowIcon from "@/public/icons/DownArrowIcon";
import IdeaIcon from "@/public/icons/IdeaIcon";
import InstaIcon from "@/public/icons/InstaIcon";
import LeftArrow from "@/public/icons/LeftArrow";
import MiddleIcon from "@/public/icons/MiddleIcon";
import PlayIcon from "@/public/icons/PlayIcon";
import SnapIcon from "@/public/icons/SnapIcon";
import TelegramIcon from "@/public/icons/TelegramIcon";
import TiktokIcon from "@/public/icons/TiktokIcon";
import WhatsappIcon from "@/public/icons/WhatsappIcon";
import XIcon from "@/public/icons/XIcon";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Home() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playButtonRef = useRef<HTMLDivElement>(null);

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

  // Features data
  const featuresData = [
    {
      iconSrc: '/image/icon/feature-icon-1.png',
      text: 'أحدث بنك للأسئلة مع أكثر من 10000سؤال مشروح بالتفصيل'
    },
    {
      iconSrc: '/image/icon/feature-icon-2.png',
      text: 'شرح مبسط ومتكامل لجميع وحدات المنهج'
    },
    {
      iconSrc: '/image/icon/feature-icon-3.png',
      text: 'شروحات فيديو للمنهج كاملا'
    },
    {
      iconSrc: '/image/icon/feature-icon-4.png',
      text: 'قارن أدائك مع الاف الطلاب و واكب تطورك لحظة بلحظة'
    },
    {
      iconSrc: '/image/icon/feature-icon-5.png',
      text: 'تقرير تحليلي مطوّر لمتابعة أدائك وتحسين المستوى'
    },
    {
      iconSrc: '/image/icon/feature-icon-6.png',
      text: 'دورة تدريبية شاملة تمنحك كل ما يلزمك للتفوق'
    },
    {
      iconSrc: '/image/icon/feature-icon-7.png',
      text: 'منهج متكامل يغطي جميع المهارات في القسم الكمي واللفظي'
    },
    {
      iconSrc: '/image/icon/feature-icon-8.png',
      text: 'نظام تقييم متقدم يحدد نقاط قوتك وضعفك ويقترح حلول'
    }
  ];

  // Video player functionality
  useEffect(() => {
    const video = videoRef.current;
    const playButton = playButtonRef.current;

    if (!video || !playButton) return;

    const handlePlay = () => {
      playButton.style.opacity = '0';
      playButton.style.pointerEvents = 'none';
    };

    const handlePause = () => {
      playButton.style.opacity = '1';
      playButton.style.pointerEvents = 'auto';
    };

    const handleEnded = () => {
      playButton.style.opacity = '1';
      playButton.style.pointerEvents = 'auto';
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handlePlayButtonClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    }
  };

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
        console.error('Failed to load packages:', error);
      }
    };

    loadPlans();
  }, []);

  // Set page title
  useEffect(() => {
    document.title = 'مبهر - منصة التحضير للقدرات';
  }, []);

  return (
    <div className="bg-white" dir="rtl">
      {/* Hero Section */}
      <section className="bg-linear-to-tr from-[#2A056D] to-[#6F0767] text-white mb-4 md:m-4 rounded-0 md:rounded-2xl">
        {/* Navbar Component */}
        <Navbar />

        <div className="p-4">
          {/* Hero Content */}
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
              className="text-4xl md:text-[76px] font-bold md:leading-[86px] leading-[44px]"
            >
              مبهر شريكك الذكي <br /> لطريق التفوق في اختبار <br /> القدرات
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="mt-4 text-base md:text-lg max-w-md md:max-w-xl mx-auto text-gray-200"
            >
              تحضير دقيق، خطة مدروسة ونتائج ملموسة تمكنك من التفوق في اختبار
              القدرات بالذكاء الإصطناعي
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              className="mt-6 flex justify-center items-center space-x-4 space-x-reverse cursor-pointer"
            >
              <div className="relative inline-block">
                <Link href="/packages">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center pt-1 pr-6 pb-1 pl-1 bg-white text-[#671e5a] font-medium rounded-full shadow-lg hover:bg-[#671e5a] hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    أكتشف الأن
                    <span className="relative flex items-center justify-center mr-3 bg-[#671e5a] text-white rounded-full">
                      <LeftArrow />
                    </span>
                  </motion.button>
                </Link>
                {/* <motion.div
                  initial={{ opacity: 0, rotate: 0 }}
                  animate={{ opacity: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6, delay: 1, rotate: { duration: 2, repeat: Infinity, repeatDelay: 3 } }}
                >
                  <Image
                    src="/image/bitcoin2.png"
                    width={50}
                    height={50}
                    className="absolute right-32 md:right-33 top-6"
                    alt=""
                  />
                </motion.div> */}

                <Image
                  src="/image/bitcoin2.png"
                  width={50}
                  height={50}
                  className="absolute right-32 md:right-33 top-6"
                  alt=""
                />
              </div>
            </motion.div>
          </div>

          {/* Social Media Links and Student Images */}
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
                  <Image src="/image/Image-28.png" width={55} height={55} alt="" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.2, type: "spring", stiffness: 200 }}
                  className="w-10 h-10 md:w-[55px] md:h-[55px] bg-gray-300 rounded-full border-2 border-white"
                >
                  <Image src="/image/Image-29.png" width={55} height={55} alt="" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.3, type: "spring", stiffness: 200 }}
                  className="w-10 h-10 md:w-[55px] md:h-[55px] bg-gray-300 rounded-full border-2 border-white"
                >
                  <Image src="/image/Image-30.png" width={55} height={55} alt="" />
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
              ].map(({ href, Icon, bg, delay }, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link href={href}>
                    <div className={`${bg} rounded-full p-2.5 md:p-[8.18px]`}>
                      <Icon />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="relative">
            <div className="circle absolute hidden  md:flex right-[50%] transform translate-x-1/2 -top-10 w-[121px] h-[121px] bg-[#c44580] rounded-full  items-center justify-center z-10">
              <MiddleIcon />
              <div className="text w-full h-full absolute text-white">

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Based SAT Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#F7E8F5] flex justify-center my-4 md:m-4 rounded-0 md:rounded-2xl"
      >
        <div className="container max-w-6xl px-4 py-8 sm:py-[120px]">
          <div className="flex flex-col items-center text-center mb-8 sm:mb-[40px]">
            <h1 className="text-[28px] sm:text-5xl md:text-[60px] leading-10 lg:leading-[76px] font-bold mb-3 sm:mb-4">
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
              {['المدرسون', 'توقع الدرجة', 'الأختبارات', 'الشروحات'].map((tab, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTab(`tab${index + 1}`)}
                  initial={false}
                  animate={{
                    color: activeTab === `tab${index + 1}` ? '#000000' : '#98A2B3'
                  }}
                  className="relative py-1 text-center font-medium text-sm sm:text-[18px] transition-all duration-300 cursor-pointer"
                >
                  {tab}
                  {activeTab === `tab${index + 1}` && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-[#4F46F4]"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_2fr] gap-4 sm:gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="border-2 border-dashed border-[#D0D5DD] rounded-xl p-4 sm:p-[32px]"
              >
                <div className="flex flex-col h-full">
                  {/* SVG Icon */}
                  <div className="mb-3 sm:mb-[16px]">
                    <IdeaIcon />
                  </div>

                  {/* Heading */}
                  <h3 className="text-xl sm:text-2xl md:text-[35px] font-medium mb-2 leading-tight sm:leading-[44px] text-right">
                    {activeTab === 'tab1' && <>اسأل من خلال صورة  أو نص</>}
                    {activeTab === 'tab2' && <>طريقة بديلة  للإجابة</>}
                    {activeTab === 'tab3' && <>اقتراح  اختبار</>}
                    {activeTab === 'tab4' && <>شرح  الموضوع</>}
                  </h3>

                  {/* Description */}
                  {/* <p className="text-gray-600 mt-6 sm:mt-[216px] text-sm sm:text-[20px] font-normal text-right leading-7">
                    {activeTab === 'tab1' && 'ضع استفساراتك بكل سهولة وستحصل على استجابة فورية ومفيدة كل ما عليك فعله قم بتحميل صورة أو قم بكتابة إستفسارك وستحصل على نتائج مذهلة'}
                    {activeTab === 'tab2' && 'استكشف طرقا متعددة لحل المشكلات واحصل على تفسيرات واضحة وموجزة'}
                    {activeTab === 'tab3' && 'احصل على تفسيرات واضحة وموجزة لأي موضوع تريده'}
                    {activeTab === 'tab4' && 'احصل على تفسيرات واضحة وموجزة لأي موضوع'}
                  </p> */}
                  <p className={`text-gray-600 text-sm sm:text-[20px] font-normal text-right leading-7 ${activeTab === 'tab1' ? 'mt-6 sm:mt-[129px]' :
                    activeTab === 'tab2' ? 'mt-8 sm:mt-[186px]' :
                      activeTab === 'tab3' ? 'mt-4 sm:mt-[186px]' :
                        activeTab === 'tab4' ? 'mt-10 sm:mt-[214px]' : ''
                    }`}>
                    {activeTab === 'tab1' && 'ضع استفساراتك بكل سهولة وستحصل على استجابة فورية ومفيدة كل ما عليك فعله قم بتحميل صورة أو قم بكتابة إستفسارك وستحصل على نتائج مذهلة'}
                    {activeTab === 'tab2' && 'استكشف طرقا متعددة لحل المشكلات واحصل على تفسيرات واضحة وموجزة'}
                    {activeTab === 'tab3' && 'احصل على تفسيرات واضحة وموجزة لأي موضوع تريده'}
                    {activeTab === 'tab4' && 'احصل على تفسيرات واضحة وموجزة لأي موضوع'}
                  </p>

                  {/* Link Button */}
                  <div className="mt-3 sm:mt-[14px]">
                    {/* <Link href="https://cms.mubhir.ai/ar-select-package"> */}
                    <Link href="/packages">
                      <button className="flex items-center justify-between w-full text-[#4F46F4] font-medium text-sm sm:text-[18px] cursor-pointer">
                        <span>ابدأ الأن</span>
                        <span>
                          <CardLeftArrowIcon />
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Image Section */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${activeTab}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-[#291548] rounded-xl p-4 sm:p-6 flex items-center justify-center overflow-hidden"
              >
                <Image src={`/image/${activeTab === 'tab1' ? 'teachers' : activeTab === 'tab2' ? 'grade' : activeTab === 'tab3' ? 'test' : 'explanations'}.jpg`} width={600} height={400} alt="" className="w-full h-auto" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* All in One Place */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="my-4 md:m-4"
      >
        <div className="max-w-6xl mx-auto py-8 sm:py-[120px]">
          <div className="text-center mb-10">
            <h1 className="text-[28px] sm:text-5xl md:text-6xl lg:text-[76px] font-semibold text-center tracking-[-2px] leading-[52px] lg:leading-[120px]">
              ابدأ رحلتك للـ ١٠٠ مع أقوى منصة للقدرات العامة
            </h1>
            <p className="pt-4 text-base text-gray-600 mt-2">
              منصة رائعة تقدم لك تجربة تعليمية شاملة تضم
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuresData.map((feature, index) => (
              <FeatureCard
                key={index}
                iconSrc={feature.iconSrc}
                text={feature.text}
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Video Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#eaecf0] flex justify-center my-4 md:m-4 rounded-0 md:rounded-2xl"
      >
        <div className="container max-w-6xl px-4 py-8 sm:py-16 lg:py-[120px]">

          <div className="text-center mb-8 sm:mb-12">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[28px] sm:text-[48px] lg:text-[76px] font-semibold text-black leading-10 lg:leading-[120px] text-center"
            >
              ابدأ طريقك للتميز في القدرات مع منصة تثق فيها
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-3 sm:mt-[15px] text-black text-center text-sm sm:text-base"
            >
              تجربة تعليمية تصنع فرق حقيقي
            </motion.p>
          </div>

          <div className="grid grid-cols-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden bg-black"
            >
              <video
                ref={videoRef}
                id="videoPlayer"
                className="w-full h-full object-cover cursor-pointer"
                poster="/image/poster.png"
                preload="metadata"
                onClick={handleVideoClick}
              >
                <source src="/video/promo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div
                ref={playButtonRef}
                id="playButton"
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                style={{ opacity: 1, pointerEvents: 'auto' }}
              >
                <motion.button
                  onClick={handlePlayButtonClick}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 sm:p-4 transition-all"
                >
                  {/* Pulsing ripple effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: [1, 1.5, 1.8], opacity: [0.5, 0.2, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: [1, 1.5, 1.8], opacity: [0.5, 0.2, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.5
                    }}
                  />

                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-purple-600 text-white relative z-10"
                  >
                    <PlayIcon />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Pricing */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-linear-to-tr from-[#2A056D] to-[#6F0767] flex justify-center my-4 md:m-4 rounded-0 md:rounded-2xl"
      >
        <div className="container max-w-6xl px-4 py-12 sm:py-[120px]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[28px] sm:text-5xl md:text-6xl lg:text-[76px] font-semibold text-white leading-10 lg:leading-[120px] text-center"
          >
            أسعار مرنة لكل طالب يبغي يتفوق في القدرات
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-3 sm:mt-6 text-white text-center text-sm sm:text-base"
          >
            اختر الخطة التي تناسب ميزانيتك وتدعم هدفك
          </motion.p>

          <main className="max-w-6xl mx-auto flex flex-col px-0 md:px-4 py-6">
            <div id="plansGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "easeOut"
                  }}
                  whileHover={{
                    y: -12,
                    scale: 1.03,
                    boxShadow: "0 25px 50px -12px rgba(103, 30, 90, 0.25)",
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white shadow-md rounded-2xl p-6 w-full flex flex-col cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                      className="text-[18px] font-semibold"
                    >
                      {plan.title_ar}
                    </motion.h3>
                    {plan.promotional_badge != null && plan.promotional_badge > 0 && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.15 + 0.3,
                          type: "spring",
                          stiffness: 200,
                          scale: {
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1
                          }
                        }}
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        className="text-white text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ backgroundColor: '#C445A6' }}
                      >
                        وفر {plan.promotional_badge}%
                      </motion.span>
                    )}
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                    className="text-sm text-gray-500 mb-4"
                  >
                    {plan.description_ar}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15 + 0.4,
                      type: "spring",
                      stiffness: 150
                    }}
                    className="text-3xl font-bold text-[#671E5A]"
                  >
                    {plan.price_display}
                    <span className="text-3xl font-bold text-[#671E5A] pr-2">ر.س</span>
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
                    className="text-xs mb-6 border-b border-[#D9D9D9] pb-[12px]"
                  >
                    {plan.terms_ar}
                  </motion.p>
                  <ul className="space-y-3 mb-6 grow">
                    {plan.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.15 + 0.6 + (idx * 0.1)
                        }}
                        className="flex items-start gap-2"
                      >
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
                      </motion.li>
                    ))}
                  </ul>
                  {/* <Link href="https://cms.mubhir.ai/ar-checkout"> */}
                  <Link href="/checkout">
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.8 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-full border border-[#671E5A] text-[#671E5A] rounded-full py-2 font-semibold mt-6 overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-[#671E5A] rounded-full translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                        ابدأ {plan.title_ar}
                      </span>
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      </motion.section>

      {/* Your Questions Answered Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#eaecf0] flex justify-center my-4 md:m-4 rounded-0 md:rounded-2xl"
      >
        <div className="container max-w-6xl px-4 py-12 sm:py-[120px]">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[28px] sm:text-5xl md:text-[60px] font-semibold text-center text-black"
          >
            كل إستفسارات طلاب القدرات
            <br />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-2 text-center text-gray-600"
          >
            الأسئلة الشائعة
          </motion.p>
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-black font-medium mb-[12px] mt-[32px] text-center cursor-pointer"
          >
            ما زلت لديك أسئلة؟
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-6 flex justify-center items-center space-x-6 space-x-reverse"
          >
            <Link href="/ar-contactUs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center bg-[#671e5a] text-white font-medium rounded-full pr-5 pl-2 py-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                تواصل معنا
                <span className="flex items-center justify-center mr-6 w-8 h-8 bg-white text-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#671e5a" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12H21" />
                  </svg>
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Review Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden bg-[#691d5e] my-4 md:m-4 rounded-0 md:rounded-2xl text-white  pt-12 md:pt-20"
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 md:pb-24 pb-0">
          {/* Desktop Portrait (Overlay) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:block pointer-events-none select-none absolute left-1/2 -translate-x-1/2 top-[-20px] w-full z-10"
          >
            <Image src="/image/review-cover.png" width={1200} height={800} alt="طالبة" className="w-full h-auto object-contain" />
          </motion.div>

          {/* Content Grid */}
          <div className="relative z-20 flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-10">
            {/* Title Section */}
            <div className="lg:col-span-6">
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-[28px] md:text-5xl font-semibold mb-10 text-center lg:text-right"
              >
                آراء طلابنا
              </motion.h1>
            </div>

            {/* Testimonials Grid */}
            <div className="lg:col-span-12 lg:order-3 relative z-30 mt-4 lg:mt-10">
              <div className="flex flex-col lg:flex-row justify-center gap-5">
                {[
                  { name: "عبد المحسن الغامدي", review: "ما شاء الله الموقع سهل ومريح" },
                  { name: "عبدالله", review: "اول مره أشوف موقع فيه كل هذي المميزات ما شاء الله." },
                  { name: "رهف", review: "المقاطع مفيده وكنت انتظر موقع زي كذا من اول" },
                  { name: "هيفاء أحمد", review: "الاختبارات كانت مفيده لكن اللي استفدت منه اكثر أنهم متجاوبين مع اسئلتي" }
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, rotateX: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: "easeOut"
                    }}
                    whileHover={{
                      y: -10,
                      scale: 1.05,
                      boxShadow: "0 20px 40px -10px rgba(122, 31, 104, 0.3)",
                      transition: { duration: 0.3 }
                    }}
                    className="bg-white text-[#2B1A2F] rounded-[28px] w-full max-w-[340px] mx-auto p-7 shadow-lg cursor-pointer"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="flex gap-1 text-[#7A1F68] mb-3">
                      {[...Array(5)].map((_, i) => (
                        <motion.svg
                          key={i}
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.15 + 0.3 + (i * 0.1),
                            type: "spring",
                            stiffness: 200
                          }}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          className="w-5 h-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 0 0 .95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 0 0-.36 1.12l1.07 3.29c.3.92-.75 1.69-1.54 1.12l-2.8-2.03a1 1 0 0 0-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 0 0-.36-1.12L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 0 0 .95-.69l1.07-3.29z" />
                        </motion.svg>
                      ))}
                    </div>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.8 }}
                      className="font-bold mb-2"
                    >
                      {testimonial.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 1 }}
                      className="text-[15px] leading-relaxed text-[#3A2A40]"
                    >
                      {testimonial.review}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:hidden mt-8 w-full"
            >
              <Image src="/image/review-cover.png" width={1200} height={800} alt="طالبة" className="w-full h-auto object-contain" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
