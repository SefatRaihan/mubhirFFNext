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
    code: 'OCT20',
    discountPercent: 20,
    monthAr: 'شهر أكتوبر',
    textAr: 'استخدم الكود OCT20 واحصل على خصم 20% على جميع الاشتراكات طوال شهر أكتوبر.',
    ctaAr: 'اغتنم الفرصة الآن',
  },
} as const;
