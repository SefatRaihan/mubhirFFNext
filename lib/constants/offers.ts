/**
 * Single Source of Truth for Platform Offers, Free Trial, and Promo Codes
 */

export const OFFER_CONFIG = {
  trial: {
    days: 3,
    daysAr: '٣ أيام',
    badgeTextAr: '✨ تجربة مجانية لمدة ٣ أيام',
    ctaButtonAr: 'احصل على تجربتك المجانية لمدة ٣ أيام!',
    startCtaAr: 'ابدأ مجاناً الآن',
    sideTeaserAr: 'تجربة مجانية | خصم 20%',
    sideTeaserEn: 'Free Trial | 20% OFF',
    termsAr: 'فترة تجريبية مجانية لمدة ٣ أيام، يمكنك الإلغاء في أي وقت بدون أي التزامات مالية.',
  },
  promo: {
    code: 'OCT20',
    discountPercent: 20,
    monthAr: 'شهر أكتوبر',
    textAr: 'استخدم الكود OCT20 واحصل على خصم 20% على جميع الاشتراكات طوال شهر أكتوبر.',
    ctaAr: 'اغتنم الفرصة الآن',
  },
} as const;
