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
    sideTeaserAr: 'تجربة مجانية | خصم 10%',
    sideTeaserEn: 'Free Trial | 10% OFF',
    termsAr: 'فترة تجريبية مجانية لمدة ٣ أيام، يمكنك الإلغاء في أي وقت بدون أي التزامات مالية.',
  },
  promo: {
    code: 'SEP10',
    discountPercent: 10,
    monthAr: 'شهر سبتمبر',
    textAr: 'استخدم الكود SEP10 واحصل على خصم 10% على جميع الاشتراكات طوال شهر سبتمبر.',
    ctaAr: 'اغتنم الفرصة الآن',
  },
} as const;
