/**
 * Single Source of Truth for Platform Offers, Free Trial, and Promo Codes
 */

export const OFFER_CONFIG = {
  trial: {
    days: 1,
    daysAr: 'يوم ١ مجاني',
    badgeTextAr: '✨ يوم ١ مجاني',
    ctaButtonAr: 'احصل على تجربتك المجانية - يوم ١ مجاني!',
    startCtaAr: 'ابدأ مجاناً الآن',
    sideTeaserAr: 'تجربة مجانية',
    sideTeaserEn: 'Free Trial',
    termsAr: 'فترة تجريبية - يوم ١ مجاني، يمكنك الإلغاء في أي وقت بدون أي التزامات مالية.',
  },
  promo: {
    code: 'OCT20',
    discountPercent: 20,
    monthAr: 'شهر أكتوبر',
    textAr: 'استخدم الكود OCT20 واحصل على خصم 20% على جميع الاشتراكات طوال شهر أكتوبر.',
    ctaAr: 'اغتنم الفرصة الآن',
  },
} as const;
