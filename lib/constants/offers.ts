/**
 * Single Source of Truth for Platform Offers, Free Trial, and Promo Codes
 */

export const OFFER_CONFIG = {
  trial: {
    days: 0,
    daysAr: '',
    badgeTextAr: '✨ باقات مميزة',
    ctaButtonAr: 'استكشف الباقات واشترك الآن!',
    startCtaAr: 'ابدأ الآن',
    sideTeaserAr: 'الباقات والاشتراكات',
    sideTeaserEn: 'Packages',
    termsAr: 'يمكنك اختيار الباقة المناسبة والاشتراك بكل سهولة.',
  },
  promo: {
    code: 'Exam30',
    discountPercent: 30,
    monthAr: 'لفترة محدودة',
    textAr: 'استخدم الكود Exam30 واحصل على خصم 30% على جميع الاشتراكات لفترة محدودة.',
    ctaAr: 'اغتنم الفرصة الآن',
  },
} as const;
