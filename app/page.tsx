"use client";

import Footer from "@/components/Footer/Footer";
import FaqItem from "@/components/FaqItem/FaqItem";
import FeatureCard from "@/components/FeatureCard/FeatureCard";
import Navbar from "@/components/Navber/Navbar";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";
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
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReviewModal from "@/components/ReviewModal";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LeftArrowRQ from "@/public/icons/LeftArrowRQ";

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
  package_type?: string;
}

interface Review {
  id: number;
  reviewer_name: string;
  reviewer_avatar: string | null;
  rating: number;
  content: string;
  date_submitted: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [pricingType, setPricingType] = useState<'qudrat' | 'tahsili'>('qudrat');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playButtonRef = useRef<HTMLDivElement>(null);

  // 3D Mouse Tracking State
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  // Badge Hover State for popup images
  const [hoveredBadge, setHoveredBadge] = useState<'badge1' | 'badge2' | null>(null);

  // Ref to track activeTab inside GSAP callbacks (avoids stale closures)
  const activeTabRef = useRef('tab1');

  // Hero 3D Animation Refs
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroTitleWordsRef = useRef<HTMLSpanElement[]>([]);
  const heroBadge1Ref = useRef<HTMLSpanElement>(null);
  const heroBadge2Ref = useRef<HTMLSpanElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroSocialRef = useRef<HTMLDivElement>(null);
  const heroStudentsRef = useRef<HTMLDivElement>(null);

  // Section Refs for ScrollTrigger
  const featuresGridRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  // AI SAT Section Refs for ScrollTrigger
  const aiSatSectionRef = useRef<HTMLElement>(null);
  const aiSatCircleRef = useRef<HTMLDivElement>(null);
  const aiSatHeadingRef = useRef<HTMLDivElement>(null);
  const aiSatTabsRef = useRef<HTMLDivElement>(null);
  const aiSatContentRef = useRef<HTMLDivElement>(null);

  // Badge Popup Refs for GSAP
  const badgePopup1Ref = useRef<HTMLDivElement>(null);
  const badgePopup2Ref = useRef<HTMLDivElement>(null);

  // Register GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Fetch reviews from API
  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/review-list`
      );

      if (response.data.status && response.data.data) {
        setReviews(response.data.data);
        setReviewsError(null);
        // Reset to first page when reviews are updated
        setCurrentReviewIndex(0);
      } else {
        setReviewsError('Failed to load reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviewsError('Failed to load reviews');
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Mouse tracking handler for 3D tilt effect
  const handleHeroMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!heroSectionRef.current) return;
    const rect = heroSectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x: x * 8, y: y * -8 }); // Max 8deg rotation
  }, []);

  const handleHeroMouseEnter = useCallback(() => setIsHoveringHero(true), []);
  const handleHeroMouseLeave = useCallback(() => {
    setIsHoveringHero(false);
    setMousePosition({ x: 0, y: 0 });
  }, []);

  // Hero title words for word-by-word animation
  const heroTitleWords = ['مبهر', 'شريكك', 'الذكي', 'لطريق', 'التفوق', 'في', 'اختبار', 'القدرات'];

  // GSAP Creative Hero Animations - Clean & Elegant
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a master timeline for orchestrated animations
      const masterTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // ========== HERO TITLE - ELEGANT BLUR-TO-FOCUS REVEAL ==========
      if (heroHeadingRef.current) {
        masterTL.fromTo(heroHeadingRef.current,
          {
            opacity: 0,
            y: 40,
            filter: 'blur(20px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
          },
          0.2
        );
      }

      // ========== BADGES - BOUNCY ENTRANCE + SUBTLE FLOAT ==========
      if (heroBadge1Ref.current) {
        masterTL.fromTo(heroBadge1Ref.current,
          { opacity: 0, scale: 0.3, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            ease: 'back.out(2)',
          },
          0.6
        );

        // Gentle floating - very subtle
        gsap.to(heroBadge1Ref.current, {
          y: -6,
          duration: 2.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 2
        });
      }

      if (heroBadge2Ref.current) {
        masterTL.fromTo(heroBadge2Ref.current,
          { opacity: 0, scale: 0.3, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            ease: 'back.out(2)',
          },
          0.75
        );

        // Gentle floating - offset timing
        gsap.to(heroBadge2Ref.current, {
          y: -8,
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 2.5
        });
      }

      // ========== CTA BUTTON - SMOOTH SLIDE UP ==========
      if (heroCtaRef.current) {
        masterTL.fromTo(heroCtaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          0.9
        );
      }

      // ========== STUDENTS SECTION - FADE SLIDE FROM RIGHT ==========
      if (heroStudentsRef.current) {
        masterTL.fromTo(heroStudentsRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
          },
          1.1
        );
      }

      // ========== SOCIAL ICONS - FADE SLIDE FROM LEFT ==========
      if (heroSocialRef.current) {
        masterTL.fromTo(heroSocialRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
          },
          1.2
        );
      }

      // ========== FEATURE CARDS - STAGGERED FADE UP ==========
      if (featuresGridRef.current) {
        const cards = featuresGridRef.current.querySelectorAll('.feature-card');
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: featuresGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // ========== VIDEO SECTION - SCALE FADE ==========
      if (videoSectionRef.current) {
        gsap.fromTo(videoSectionRef.current,
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: videoSectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  // ========== AI SAT SECTION - SCROLL ANIMATIONS + DESKTOP-ONLY PIN ==========
  useEffect(() => {
    if (!aiSatSectionRef.current) return;

    const tabKeys = ['tab1', 'tab2', 'tab3', 'tab4'];

    // Circle entrance animation — runs on ALL devices (safe one-shot animation)
    if (aiSatCircleRef.current) {
      gsap.fromTo(aiSatCircleRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1, rotation: 0, opacity: 1,
          duration: 1, ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: aiSatSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Heading blur-to-focus entrance — runs on ALL devices (safe one-shot animation)
    if (aiSatHeadingRef.current) {
      const heading = aiSatHeadingRef.current.querySelector('h2');
      const subtitle = aiSatHeadingRef.current.querySelector('p');
      if (heading) {
        gsap.fromTo(heading,
          { y: 40, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0, opacity: 1, filter: 'blur(0px)',
            duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: aiSatHeadingRef.current, start: 'top 90%', toggleActions: 'play none none none' }
          }
        );
      }
      if (subtitle) {
        gsap.fromTo(subtitle,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: aiSatHeadingRef.current, start: 'top 90%', toggleActions: 'play none none none' }
          }
        );
      }
    }

    // Pin + scroll-based tab cycling — DESKTOP ONLY (>=1024px)
    // Pinning breaks layout on tablet/mobile due to position:fixed injection
    const isDesktop = window.innerWidth >= 1024;
    let pinTrigger: ScrollTrigger | null = null;

    if (isDesktop) {
      pinTrigger = ScrollTrigger.create({
        trigger: aiSatSectionRef.current,
        start: 'center center',
        end: '+=200%',
        pin: true,
        pinSpacing: true,
        scrub: false,
        onUpdate: (self) => {
          const progress = self.progress;
          let targetTab: string;

          if (progress < 0.25) {
            targetTab = 'tab1';
          } else if (progress < 0.50) {
            targetTab = 'tab2';
          } else if (progress < 0.75) {
            targetTab = 'tab3';
          } else {
            targetTab = 'tab4';
          }

          if (activeTabRef.current !== targetTab) {
            activeTabRef.current = targetTab;
            setActiveTab(targetTab);
          }
        }
      });
    }

    return () => {
      pinTrigger?.kill();
    };
  }, []);

  // GSAP Badge Popup Hover Animations
  useEffect(() => {
    if (hoveredBadge === 'badge1' && badgePopup1Ref.current) {
      gsap.killTweensOf(badgePopup1Ref.current);
      gsap.fromTo(badgePopup1Ref.current,
        {
          opacity: 0,
          scale: 0.3,
          y: 50,
          rotateZ: -10,
          display: 'block'
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateZ: 3,
          duration: 0.5,
          ease: 'back.out(1.7)'
        }
      );
    } else if (badgePopup1Ref.current) {
      gsap.to(badgePopup1Ref.current, {
        opacity: 0,
        scale: 0.3,
        y: 50,
        rotateZ: -10,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          if (badgePopup1Ref.current) {
            gsap.set(badgePopup1Ref.current, { display: 'none' });
          }
        }
      });
    }

    if (hoveredBadge === 'badge2' && badgePopup2Ref.current) {
      gsap.killTweensOf(badgePopup2Ref.current);
      gsap.fromTo(badgePopup2Ref.current,
        {
          opacity: 0,
          scale: 0.3,
          y: 50,
          rotateZ: 10,
          display: 'block'
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateZ: -3,
          duration: 0.5,
          ease: 'back.out(1.7)'
        }
      );
    } else if (badgePopup2Ref.current) {
      gsap.to(badgePopup2Ref.current, {
        opacity: 0,
        scale: 0.3,
        y: 50,
        rotateZ: 10,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          if (badgePopup2Ref.current) {
            gsap.set(badgePopup2Ref.current, { display: 'none' });
          }
        }
      });
    }
  }, [hoveredBadge]);


  // Handle pagination dot click
  const handleDotClick = (dotIndex: number) => {
    setCurrentReviewIndex(dotIndex * 4);
  };

  // Calculate total number of pages (dots)
  const totalPages = Math.ceil(reviews.length / 4);

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
      iconSrc: '/image/icon/feature-icon-1.webp',
      text: 'أحدث بنك للأسئلة مع أكثر من 10000سؤال مشروح بالتفصيل',

    },
    {
      iconSrc: '/image/icon/feature-icon-2.webp',
      text: 'شرح مبسط ومتكامل لجميع وحدات المنهج',

    },
    {
      iconSrc: '/image/icon/feature-icon-3.webp',
      text: 'شروحات فيديو للمنهج كاملا',

    },
    {
      iconSrc: '/image/icon/feature-icon-4.webp',
      text: 'قارن أدائك مع الاف الطلاب و واكب تطورك لحظة بلحظة',

    },
    {
      iconSrc: '/image/icon/feature-icon-5.webp',
      text: 'تقرير تحليلي مطوّر لمتابعة أدائك وتحسين المستوى',

    },
    {
      iconSrc: '/image/icon/feature-icon-6.webp',
      text: 'دورة تدريبية شاملة تمنحك كل ما يلزمك للتفوق',

    },
    {
      iconSrc: '/image/icon/feature-icon-7.webp',
      text: 'منهج متكامل يغطي جميع المهارات في القسم الكمي واللفظي',

    },
    {
      iconSrc: '/image/icon/feature-icon-8.webp',
      text: 'نظام تقييم متقدم يحدد نقاط قوتك وضعفك ويقترح حلول',

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
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/packages`);
        const json = res.data;

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

          const plans = json.data.map((plan: any) => ({
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
    <div className="bg-white overflow-x-hidden" dir="rtl">
      {/* Hero Section */}
      <section
        ref={heroSectionRef}
        className="animated-gradient-bg text-white mb-4 md:m-4 rounded-0 md:rounded-2xl overflow-hidden relative"
      >
        {/* Liquid Effect Background - wrapped with overflow-hidden to preserve rounded corners */}
        <div className="absolute inset-0 overflow-hidden rounded-0 md:rounded-2xl">
          <LiquidEffectAnimation />
        </div>

        {/* Navbar Component */}
        <div className="relative z-50">
          <Navbar />
        </div>

        <div className="p-4 relative z-10">
          {/* Hero Content */}
          <div className="relative text-center mt-16 md:mt-[128px]">
            <div className="flex space-x-4 justify-between md:justify-center gap-0 space-x-reverse md:space-x-0 mb-4 md:mb-0">
              {/* Badge 1 - #سؤال with hover image */}
              <div
                className="relative group cursor-pointer transform rotate-[-15deg] md:rotate-[-25deg] md:absolute md:right-24 lg:right-40 md:top-60 p-4 z-20"
                onMouseEnter={() => setHoveredBadge('badge1')}
                onMouseLeave={() => setHoveredBadge(null)}
              >
                <span
                  ref={heroBadge1Ref}
                  className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs md:text-sm font-semibold shadow-md opacity-0 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 inline-block"
                >
                  #سؤال
                </span>
                {/* Popup Image for Badge 1 */}
                <div
                  ref={badgePopup1Ref}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-100 pointer-events-none"
                  style={{ opacity: 0, display: 'none' }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-500/50 to-purple-600/50 rounded-2xl blur-2xl scale-110" />
                    <Image
                      src="/image/arabic_content/content1.png"
                      width={1000}
                      height={800}
                      alt="سؤال"
                      className="rounded-2xl shadow-2xl border-4 border-white/40 relative z-10"
                      style={{ width: '400px', height: 'auto', maxWidth: 'none' }}
                    />
                  </div>
                </div>
              </div>

              {/* Badge 2 - #قدرات with hover image */}
              <div
                className="relative group cursor-pointer transform rotate-15 md:rotate-25 md:absolute md:left-24 lg:left-40 md:top-60 p-4 z-20"
                onMouseEnter={() => setHoveredBadge('badge2')}
                onMouseLeave={() => setHoveredBadge(null)}
              >
                <span
                  ref={heroBadge2Ref}
                  className="bg-purple-600 text-white px-4 py-1 rounded-full text-xs md:text-sm font-semibold shadow-md opacity-0 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 inline-block"
                >
                  #قدرات
                </span>
                {/* Popup Image for Badge 2 */}
                <div
                  ref={badgePopup2Ref}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-100 pointer-events-none"
                  style={{ opacity: 0, display: 'none' }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-br from-purple-500/50 to-pink-600/50 rounded-2xl blur-2xl scale-110" />
                    <Image
                      src="/image/arabic_content/content2.png"
                      width={1000}
                      height={800}
                      alt="قدرات"
                      className="rounded-2xl shadow-2xl border-4 border-white/40 relative z-10"
                      style={{ width: '400px', height: 'auto', maxWidth: 'none' }}
                    />
                  </div>
                </div>
              </div>
            </div>


            <h1
              ref={heroHeadingRef}
              className="text-4xl md:text-[48px] lg:text-[76px] font-bold leading-[44px] md:leading-[58px] lg:leading-[86px] text-glow-white opacity-0"
            >
              مبهر شريكك الذكي <br /> لطريق التفوق في اختبار <br /> القدرات
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="mt-4 text-base md:text-lg max-w-md md:max-w-xl mx-auto text-gray-200"
            >
              تحضير دقيق، خطة مدروسة ونتائج ملموسة تمكنك من التفوق في اختبار
              القدرات بالذكاء الإصطناعي
            </motion.p>

            <div
              ref={heroCtaRef}
              className="mt-6 flex justify-center items-center space-x-4 space-x-reverse cursor-pointer opacity-0"
            >
              <motion.div
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/signup">
                  <button
                    className="flex items-center pt-1 pr-6 pb-1 pl-1 bg-[#E834C7] text-white font-medium rounded-full shadow-lg hover:bg-white hover:text-[#E834C7] transition-colors duration-300 cursor-pointer"
                  >
                    احصل على تجربتك المجانية لمدة ٣٠ يومًا!
                    <span className="relative flex items-center justify-center mr-3 bg-white  rounded-full">
                      <LeftArrowRQ />
                    </span>
                  </button>
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
                  className="absolute left-0 -translate-x-1/2 top-6"
                  alt="bitcoin"
                />
              </motion.div>
            </div>
          </div>

          {/* Social Media Links and Student Images */}
          <div className="mx-6 md:mx-[48px] mt-24 md:mt-[206px] flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
            <div
              ref={heroStudentsRef}
              className="flex flex-col md:flex-row items-center md:space-x-2 md:space-x-reverse mb-0 md:mb-[48px] order-1 md:order-1 opacity-0"
            >
              <div className="flex -space-x-2 mb-4 md:mb-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.1, type: "spring", stiffness: 200 }}
                  className="w-10 h-10 md:w-[55px] md:h-[55px] bg-gray-300 rounded-full border-2 border-white"
                >
                  <Image src="/image/avt1.webp" width={55} height={55} alt="student1" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-10 h-10 md:w-[55px] md:h-[55px] bg-gray-300 rounded-full border-2 border-white"
                >
                  <Image src="/image/avt4.webp" width={55} height={55} alt="student2" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.3, type: "spring", stiffness: 200 }}
                  className="w-10 h-10 md:w-[55px] md:h-[55px] bg-gray-300 rounded-full border-2 border-white"
                >
                  <Image src="/image/avt3.webp" width={55} height={55} alt="student3" />
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
            </div>
            <div
              ref={heroSocialRef}
              className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 order-2 md:order-2 mt-6 md:mt-0 mb-[60px] opacity-0"
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
            </div>
          </div>
        </div>
      </section >

      {/* AI Based SAT Section */}
      < section
        ref={aiSatSectionRef}
        className="bg-[#F7E8F5] flex justify-center my-4 md:m-4 rounded-0 md:rounded-2xl relative"
      >
        {/* Circle Icon - positioned at top */}
        < div ref={aiSatCircleRef} className="circle absolute hidden md:flex left-1/2 transform -translate-x-1/2 -top-[60px] w-[121px] h-[121px] bg-[#c44580] rounded-full items-center justify-center z-10" >
          <MiddleIcon />
        </div >
        <div className="container max-w-6xl px-4 py-[48px] sm:py-[120px]">
          <div ref={aiSatHeadingRef} className="flex flex-col items-center text-center mb-8 sm:mb-[40px]">
            <h2 className="text-[28px] sm:text-5xl md:text-[60px] leading-10 md:leading-[70px] lg:leading-[76px] font-bold mb-3 sm:mb-4">
              استعد لأختبار القدرات <br />
              العامة بخطوات تفوق التوقعات مع مبهر
            </h2>
            <p className="text-sm sm:text-[16px] font-medium text-black mt-3">
              خطط مخصصة – تدريب ذكي – نتائج مبهرة
            </p>
          </div>

          {/* Tabs */}
          <div ref={aiSatTabsRef} className="flex justify-center mb-8 sm:mb-16">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 w-full max-w-3xl">
              {['المدرسون', 'توقع الدرجة', 'الأختبارات', 'الشروحات'].map((tab, index) => (
                <motion.button
                  key={index}
                  onClick={() => { activeTabRef.current = `tab${index + 1}`; setActiveTab(`tab${index + 1}`); }}
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
          <div ref={aiSatContentRef} className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-4 sm:gap-6">
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
                  <p className={`text-gray-600 text-sm sm:text-[20px] font-normal text-right leading-7 mt-auto pt-6`}>
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
                <Image
                  src={`/image/${activeTab === 'tab1' ? 'teachers' : activeTab === 'tab2' ? 'grade' : activeTab === 'tab3' ? 'test' : 'explanations'}.webp`}
                  width={600}
                  height={400}
                  alt={activeTab === 'tab1' ? 'اسأل من خلال صورة أو نص - المدرسون' : activeTab === 'tab2' ? 'توقع الدرجة - طريقة بديلة للإجابة' : activeTab === 'tab3' ? 'اقتراح اختبار - الاختبارات' : 'شرح الموضوع - الشروحات'}
                  className="w-full h-auto"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section >

      {/* All in One Place */}
      < motion.section
        initial={{ opacity: 0, y: 50 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="my-4 md:m-4"
      >
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-[120px]">
          <div className="text-center mb-10">
            <h2 className="text-[28px] sm:text-5xl md:text-6xl lg:text-[76px] font-semibold text-center tracking-[-2px] leading-tight sm:leading-[52px] lg:leading-[120px]">
              ابدأ رحلتك للـ ١٠٠ مع أقوى منصة للقدرات العامة
            </h2>
            <p className="pt-4 text-base text-gray-600 mt-2">
              منصة رائعة تقدم لك تجربة تعليمية شاملة تضم
            </p>
          </div>

          <div ref={featuresGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: '1000px' }}>
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
      </motion.section >

      {/* Video Section */}
      < motion.section
        ref={videoSectionRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#eaecf0] flex justify-center my-4 md:m-4 rounded-0 md:rounded-2xl"
      >
        <div className="container max-w-6xl px-4 py-12 sm:py-16 lg:py-[120px]">

          <div className="text-center mb-8 sm:mb-12">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[28px] sm:text-[48px] lg:text-[76px] font-semibold text-black leading-tight sm:leading-[52px] lg:leading-[120px] text-center"
            >
              ابدأ طريقك للتميز في القدرات مع منصة تثق فيها
            </motion.h2>
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
                poster="/image/poster.webp"
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
                  aria-label="Play video"
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
      </motion.section >

      {/* Pricing */}
      < motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-linear-to-tr from-[#2A056D] to-[#6F0767] flex justify-center my-4 md:m-4 rounded-0 md:rounded-2xl"
      >
        <div className="container max-w-6xl px-4 py-12 sm:py-[120px]">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[28px] sm:text-5xl md:text-6xl lg:text-[76px] font-semibold text-white leading-tight sm:leading-[52px] lg:leading-[120px] text-center"
          >
            أسعار مرنة لكل طالب يبغي يتفوق في القدرات
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-3 sm:mt-6 text-white text-center text-sm sm:text-base"
          >
            اختر الخطة التي تناسب ميزانيتك وتدعم هدفك
          </motion.p>

          {/* SAT1 / SAT2 Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center mt-6 sm:mt-8"
          >
            <div className="inline-flex rounded-full p-1 gap-2">
              {[
                { key: 'qudrat' as const, label: 'قدرات' },
                { key: 'tahsili' as const, label: 'تحصيلي' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setPricingType(item.key)}
                  className="relative flex items-center gap-2 rounded-2xl text-sm sm:text-base font-semibold transition-all duration-300 cursor-pointer text-[#671E5A] border border-[#A16A99]"
                  style={{
                    padding: '16px 20px 16px 16px',
                    backgroundColor: pricingType === item.key
                      ? '#F1E9F0'
                      : 'rgba(241, 233, 240, 0.9)',
                    boxShadow: pricingType === item.key
                      ? '0 0 20px 0 rgba(255, 255, 255, 0.5)'
                      : 'none',
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full border-2 border-[#A16A99] flex items-center justify-center transition-colors duration-300">
                      {pricingType === item.key && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2.5 h-2.5 rounded-full bg-[#671E5A]"
                        />
                      )}
                    </span>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          <main className="max-w-6xl mx-auto flex flex-col px-0 md:px-4 py-6">
            <div id="plansGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
              {pricingPlans.filter((plan) => {
                if (pricingType === 'qudrat') return plan.package_type === 'SAT 1';
                if (pricingType === 'tahsili') return plan.package_type === 'SAT 2';
                return true;
              }).map((plan, index) => (
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
      </motion.section >

      {/* Your Questions Answered Section */}
      < motion.section
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
      </motion.section >

      {/* Review Section */}
      < motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden bg-[#691d5e] my-4 md:m-4 rounded-0 md:rounded-2xl text-white pt-12 md:pt-20"
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
            <Image src="/image/review-cover.webp" width={1200} height={800} alt="طالبة" className="w-full h-auto object-contain" />
          </motion.div>

          {/* Content Grid */}
          <div className="relative z-20">
            {/* Title and Button - Positioned on Right */}
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="relative z-30">
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-[28px] md:text-5xl font-semibold mb-6 text-center lg:text-right"
                >
                  آراء طلابنا
                </motion.h2>

                {/* Button under title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="mb-6"
                >
                  <motion.button
                    onClick={() => setIsReviewModalOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center pt-1 pr-6 pb-1 pl-1 bg-white text-[#671e5a] font-medium rounded-full shadow-lg hover:bg-[#671e5a] hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    ابدأ تجربتك
                    <span className="relative flex items-center justify-center mr-3 bg-[#671e5a] text-white rounded-full">
                      <LeftArrow />
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className="relative z-30 mt-4 lg:mt-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {reviewsLoading ? (
                  // Loading skeleton
                  [...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-white/50 animate-pulse rounded-[28px] w-full p-7 shadow-lg"
                    >
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-5 h-5 bg-gray-300 rounded"></div>
                        ))}
                      </div>
                      <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
                      <div className="h-16 bg-gray-300 rounded"></div>
                    </div>
                  ))
                ) : reviewsError ? (
                  // Error state
                  <div className="text-center text-white py-10">
                    <p>{reviewsError}</p>
                  </div>
                ) : reviews.length === 0 ? (
                  // Empty state
                  <div className="text-center text-white py-10">
                    <p>لا توجد تعليقات حالياً</p>
                  </div>
                ) : (
                  // Display reviews (4 at a time with rotation)
                  reviews.slice(currentReviewIndex, currentReviewIndex + 4).map((review, index) => (
                    <motion.div
                      key={review.id}
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
                      className="bg-white text-[#2B1A2F] rounded-[28px] w-full p-7 shadow-lg cursor-pointer"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Star Rating */}
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
                            fill={i < review.rating ? "currentColor" : "none"}
                            stroke={i < review.rating ? "currentColor" : "#e5e7eb"}
                            strokeWidth={i < review.rating ? "0" : "1"}
                          >
                            <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 0 0 .95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 0 0-.36 1.12l1.07 3.29c.3.92-.75 1.69-1.54 1.12l-2.8-2.03a1 1 0 0 0-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 0 0-.36-1.12L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 0 0 .95-.69l1.07-3.29z" />
                          </motion.svg>
                        ))}
                      </div>

                      {/* Reviewer Name */}
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.15 + 0.8 }}
                        className="font-bold mb-2"
                      >
                        {review.reviewer_name}
                      </motion.p>

                      {/* Review Content */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.15 + 1 }}
                        className="text-[15px] leading-relaxed text-[#3A2A40]"
                      >
                        {review.content}
                      </motion.p>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Pagination Dots */}
              {!reviewsLoading && !reviewsError && reviews.length > 4 && (
                <div className="flex justify-center gap-3 mt-8">
                  {[...Array(totalPages)].map((_, dotIndex) => (
                    <motion.button
                      key={dotIndex}
                      onClick={() => handleDotClick(dotIndex)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${Math.floor(currentReviewIndex / 4) === dotIndex
                        ? 'bg-white w-8'
                        : 'bg-white/50 hover:bg-white/75'
                        }`}
                      aria-label={`Go to page ${dotIndex + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:hidden mt-8 w-full"
            >
              <Image src="/image/review-cover.webp" width={1200} height={800} alt="طالبة" className="w-full h-auto object-contain" />
            </motion.div>
          </div>
        </div>
      </motion.section >

      <Footer />

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onReviewSubmitted={fetchReviews}
      />
    </div >
  );
}
