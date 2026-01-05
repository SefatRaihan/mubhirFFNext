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
      iconSrc: '/image/icon/أحدث بنك للأسئلة مع أكثر من 10000سؤال مشروح بالتفصيل.jpg.png',
      text: 'أحدث بنك للأسئلة مع أكثر من 10000سؤال مشروح بالتفصيل'
    },
    {
      iconSrc: '/image/icon/شرح مبسط ومتكامل لجميع وحدات المنهج.png',
      text: 'شرح مبسط ومتكامل لجميع وحدات المنهج'
    },
    {
      iconSrc: '/image/icon/شروحات فيديو للمنهج كاملا.png',
      text: 'شروحات فيديو للمنهج كاملا'
    },
    {
      iconSrc: '/image/icon/قارن أدائك مع الاف الطلاب و واكب تطورك لحظة بلحظة.png',
      text: 'قارن أدائك مع الاف الطلاب و واكب تطورك لحظة بلحظة'
    },
    {
      iconSrc: '/image/icon/قرير تحليلي مطوّر لمتابعة أدائك وتحسين المستوى.png',
      text: 'تقرير تحليلي مطوّر لمتابعة أدائك وتحسين المستوى'
    },
    {
      iconSrc: '/image/icon/دورة تدريبية شاملة تمنحك كل ما يلزمك للتفوق.png',
      text: 'دورة تدريبية شاملة تمنحك كل ما يلزمك للتفوق'
    },
    {
      iconSrc: '/image/icon/منهج متكامل يغطي جميع المهارات في القسم الكمي واللفظي.png',
      text: 'منهج متكامل يغطي جميع المهارات في القسم الكمي واللفظي'
    },
    {
      iconSrc: '/image/icon/نظام تقييم متقدم يحدد نقاط قوتك وضعفك ويقترح حلول.png',
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
        const res = await fetch('https://sat.mubhir.ai/api/packages', { cache: 'no-store' });
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

  return (
    <div className="bg-white" dir="rtl">
      {/* Hero Section */}
      <section className="bg-linear-to-tr from-[#2A056D] to-[#6F0767] text-white mb-4 md:m-4 rounded-0 md:rounded-2xl">
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
                <Link href={`${process.env.NEXT_PUBLIC_API_CMS_URL}/ar-select-package`}>
                  <button className="flex items-center pt-1 pr-6 pb-1 pl-1 bg-white text-[#671e5a] font-medium rounded-full shadow-lg hover:bg-[#671e5a] hover:text-white">
                    أكتشف الأن
                    <span className="relative flex items-center justify-center mr-3 bg-[#671e5a] text-white rounded-full">
                      <LeftArrow />
                    </span>
                  </button>
                </Link>
                <Image
                  src="/image/bitcoin2.png"
                  width={50}
                  height={50}
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
                  <Image src="/image/Image-28.png" width={55} height={55} alt="" />
                </div>
                <div className="w-10 h-10 md:w-[55px] md:h-[55px] bg-gray-300 rounded-full border-2 border-white">
                  <Image src="/image/Image-29.png" width={55} height={55} alt="" />
                </div>
                <div className="w-10 h-10 md:w-[55px] md:h-[55px] bg-gray-300 rounded-full border-2 border-white">
                  <Image src="/image/Image-30.png" width={55} height={55} alt="" />
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
      <section className="bg-[#F7E8F5] flex justify-center my-4 md:m-4 rounded-0 md:rounded-2xl">
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
              {['المدرسون', 'توقع الدرجة', 'الأختبارات', 'الشروحات'].map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(`tab${index + 1}`)}
                  className={`py-1 text-center font-medium text-sm sm:text-[18px] border-b ${activeTab === `tab${index + 1}`
                    ? 'text-black border-[#4F46F4]'
                    : 'text-[#98A2B3] border-[#D0D5DD]'
                    }`}
                  style={{ borderBottomWidth: '4px' }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_2fr] gap-4 sm:gap-6">
            <div className="border-2 border-dashed border-[#D0D5DD] rounded-xl p-4 sm:p-[32px]">
              <div className="flex flex-col h-full">
                {/* SVG Icon */}
                <div className="mb-3 sm:mb-[16px]">
                  <IdeaIcon />
                </div>

                {/* Heading */}
                <h3 className="text-xl sm:text-2xl md:text-[36px] font-medium mb-2 leading-tight sm:leading-[44px] text-right">
                  {activeTab === 'tab1' && <>اسأل من خلال صورة  أو نص</>}
                  {activeTab === 'tab2' && <>طريقة بديلة  للإجابة</>}
                  {activeTab === 'tab3' && <>اقتراح  اختبار</>}
                  {activeTab === 'tab4' && <>شرح  الموضوع</>}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mt-6 sm:mt-[216px] text-sm sm:text-[20px] font-normal text-right leading-7">
                  {activeTab === 'tab1' && 'ضع استفساراتك بكل سهولة وستحصل على استجابة فورية ومفيدة كل ما عليك فعله قم بتحميل صورة أو قم بكتابة إستفسارك وستحصل على نتائج مذهلة'}
                  {activeTab === 'tab2' && 'استكشف طرقا متعددة لحل المشكلات واحصل على تفسيرات واضحة وموجزة'}
                  {activeTab === 'tab3' && 'احصل على تفسيرات واضحة وموجزة لأي موضوع تريده'}
                  {activeTab === 'tab4' && 'احصل على تفسيرات واضحة وموجزة لأي موضوع'}
                </p>

                {/* Link Button */}
                <div className="mt-3 sm:mt-[14px]">
                  <Link href="https://cms.mubhir.ai/ar-select-package">
                    <button className="flex items-center justify-between w-full text-[#4F46F4] font-medium text-sm sm:text-[18px]">
                      <span>ابدأ الأن</span>
                      <span>
                        <CardLeftArrowIcon />
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="bg-[#291548] rounded-xl p-4 sm:p-6 flex items-center justify-center">
              <Image src={`/image/${activeTab === 'tab1' ? 'المدرسين' : activeTab === 'tab2' ? 'توقع الدرجة' : activeTab === 'tab3' ? 'االختبارات' : 'الشروحات'}.jpg`} width={600} height={400} alt="" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section >

      {/* All in One Place */}
      < section className="py-10 px-5" >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-semibold text-center tracking-[-2px] leading-[52px] lg:leading-[120px]">
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
              />
            ))}
          </div>
        </div>
      </section >

      {/* Not Sure - Video Section */}
      < section className="bg-[#eaecf0] flex justify-center my-4 md:m-4 rounded-0 md:rounded-2xl" >
        <div className="container max-w-6xl px-4 py-8 sm:py-16 lg:py-[120px]">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-[36px] sm:text-[48px] lg:text-[76px] font-semibold text-black leading-20 lg:leading-[120px] text-center">
              ابدأ طريقك للتميز في القدرات مع منصة تثق فيها
            </h1>
            <p className="mt-3 sm:mt-[15px] text-black text-center text-sm sm:text-base">
              تجربة تعليمية تصنع فرق حقيقي
            </p>
          </div>

          {/* Video Section */}
          <div className="grid grid-cols-1">
            <div className="relative rounded-2xl overflow-hidden bg-black">
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
                <button
                  onClick={handlePlayButtonClick}
                  className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 sm:p-4 transition-all"
                >
                  <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-purple-600 text-white">
                    <PlayIcon />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Pricing */}
      < section className="bg-linear-to-tr from-[#2A056D] to-[#6F0767] flex justify-center my-4 md:m-4 rounded-0 md:rounded-2xl" >
        <div className="container max-w-6xl px-4 py-12 sm:py-[120px]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-semibold text-white leading-[52px] lg:leading-[120px] text-center">
            أسعار مرنة لكل طالب يبغي يتفوق في القدرات
          </h1>
          <p className="mt-3 sm:mt-6 text-white text-center text-sm sm:text-base">
            اختر الخطة التي تناسب ميزانيتك وتدعم هدفك
          </p>

          <main className="max-w-6xl mx-auto flex flex-col px-0 md:px-4 py-6">
            <div id="plansGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
              {pricingPlans.map((plan) => (
                <div key={plan.id} className="bg-white shadow-md rounded-2xl p-6 w-full flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[18px] font-semibold">{plan.title_ar}</h3>
                    {plan.promotional_badge && plan.promotional_badge > 0 && (
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 5.99994L5 8.49994L10 3.49994" stroke="white" strokeWidth="1.125" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="text-[14px] font-bold text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="https://cms.mubhir.ai/ar-checkout">
                    <button className="w-full border border-[#671E5A] text-[#671E5A] hover:bg-[#671E5A] hover:text-white transition rounded-full py-2 font-semibold mt-6">
                      ابدأ {plan.title_ar}
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </main>
        </div>
      </section >

      {/* Your Questions Answered Section */}
      < section className="bg-[#eaecf0] flex justify-center my-4 md:m-4 rounded-0 md:rounded-2xl" >
        <div className="container max-w-6xl px-4 py-[120px]">
          <h2 className="text-3xl sm:text-5xl md:text-[60px] font-semibold text-center text-black">
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
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#671e5a" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12H21" />
                  </svg>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section >

      {/* Review Section */}
      < section className="relative overflow-hidden bg-[#691d5e] my-4 md:m-4 rounded-0 md:rounded-2xl text-white  pt-12 md:pt-20" >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 md:pb-24 pb-0">
          {/* Desktop Portrait (Overlay) */}
          <div className="hidden lg:block pointer-events-none select-none absolute left-1/2 -translate-x-1/2 top-[-20px] w-full z-10">
            <Image src="/image/مهبر cover.png" width={1200} height={800} alt="طالبة" className="w-full h-auto object-contain" />
          </div>

          {/* Content Grid */}
          <div className="relative z-20 flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-10">
            {/* Title Section */}
            <div className="lg:col-span-6">
              <h1 className="text-[28px] md:text-5xl font-semibold mb-10 text-center lg:text-right">
                آراء طلابنا
              </h1>
            </div>

            {/* Testimonials Grid */}
            <div className="lg:col-span-12 lg:order-3 relative z-30 mt-4 lg:mt-10">
              <div className="flex flex-col lg:flex-row justify-center gap-5">
                {/* Testimonial Card 1 */}
                <div className="bg-white text-[#2B1A2F] rounded-[28px] w-full max-w-[340px] mx-auto p-7 shadow-lg">
                  <div className="flex gap-1 text-[#7A1F68] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 0 0 .95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 0 0-.36 1.12l1.07 3.29c.3.92-.75 1.69-1.54 1.12l-2.8-2.03a1 1 0 0 0-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 0 0-.36-1.12L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 0 0 .95-.69l1.07-3.29z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-extrabold mb-2">عبد المحسن الغامدي</p>
                  <p className="text-[15px] leading-relaxed text-[#3A2A40]">
                    ما شاء الله الموقع سهل ومريح
                  </p>
                </div>

                {/* Testimonial Card 2 */}
                <div className="bg-white text-[#2B1A2F] rounded-[28px] w-full max-w-[340px] mx-auto p-7 shadow-lg">
                  <div className="flex gap-1 text-[#7A1F68] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 0 0 .95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 0 0-.36 1.12l1.07 3.29c.3.92-.75 1.69-1.54 1.12l-2.8-2.03a1 1 0 0 0-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 0 0-.36-1.12L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 0 0 .95-.69l1.07-3.29z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-extrabold mb-2">عبدالله</p>
                  <p className="text-[15px] leading-relaxed text-[#3A2A40]">
                    اول مره أشوف موقع فيه كل هذي المميزات ما شاء الله.
                  </p>
                </div>

                {/* Testimonial Card 3 */}
                <div className="bg-white text-[#2B1A2F] rounded-[28px] w-full max-w-[340px] mx-auto p-7 shadow-lg">
                  <div className="flex gap-1 text-[#7A1F68] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 0 0 .95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 0 0-.36 1.12l1.07 3.29c.3.92-.75 1.69-1.54 1.12l-2.8-2.03a1 1 0 0 0-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 0 0-.36-1.12L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 0 0 .95-.69l1.07-3.29z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-extrabold mb-2">رهف</p>
                  <p className="text-[15px] leading-relaxed text-[#3A2A40]">
                    المقاطع مفيده وكنت انتظر موقع زي كذا من اول
                  </p>
                </div>

                {/* Testimonial Card 4 */}
                <div className="bg-white text-[#2B1A2F] rounded-[28px] w-full max-w-[340px] mx-auto p-7 shadow-lg">
                  <div className="flex gap-1 text-[#7A1F68] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 0 0 .95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 0 0-.36 1.12l1.07 3.29c.3.92-.75 1.69-1.54 1.12l-2.8-2.03a1 1 0 0 0-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 0 0-.36-1.12L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 0 0 .95-.69l1.07-3.29z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-extrabold mb-2">هيفاء أحمد</p>
                  <p className="text-[15px] leading-relaxed text-[#3A2A40]">
                    الاختبارات كانت مفيده لكن اللي استفدت منه اكثر أنهم متجاوبين مع اسئلتي
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Portrait */}
            <div className="lg:hidden mt-8 w-full">
              <Image src="/image/مهبر cover.png" width={1200} height={800} alt="طالبة" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </section >

      <Footer />
    </div>
  );
}
