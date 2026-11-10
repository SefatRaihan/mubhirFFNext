/**
 * Single Source of Truth for Platform Contact Information & Social Links
 * Edit any number, email, or social link here and it will update everywhere across the platform.
 */

export const CONTACT_CONFIG = {
  phone: {
    raw: "+966590379939",
    display: "+966 590379939",
    tel: "tel:+966590379939",
  },
  email: {
    address: "info@mubhir.ai",
    mailto: "mailto:info@mubhir.ai",
  },
  location: {
    addressAr: "الرياض، المملكة العربية السعودية.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=الرياض، المملكة العربية السعودية",
  },
  social: {
    whatsapp: {
      url: "https://wa.me/966590379939",
      ariaLabel: "تواصل معنا عبر واتساب",
      label: "WhatsApp",
    },
    instagram: {
      url: "https://www.instagram.com/mubhirai?igsh=MXBtcXdwOWV5NjdpOA==",
      ariaLabel: "تواصل معنا عبر إنستغرام",
      label: "Instagram",
    },
    tiktok: {
      url: "https://www.tiktok.com/@mubhir.ai?_t=ZS-90FHdPykhaq&_r=1",
      ariaLabel: "تواصل معنا عبر تيك توك",
      label: "TikTok",
    },
    telegram: {
      url: "https://t.me/mubhirai",
      ariaLabel: "تواصل معنا عبر تيليجرام",
      label: "Telegram",
    },
    x: {
      url: "https://x.com/Mubhir_AI?t=jLDoMMLZ4zctIJrMYdh_qw&s=09",
      ariaLabel: "تواصل معنا عبر تويتر",
      label: "X",
    },
    snapchat: {
      url: "https://www.snapchat.com/add/mubhirai?share_id=KtsxCDNMDts&locale=en-US",
      ariaLabel: "تواصل معنا عبر سناب شات",
      label: "Snapchat",
    },
  },
} as const;

