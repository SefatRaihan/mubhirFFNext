"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import WhatsappIcon from "@/public/icons/WhatsappIcon";
import InstaIcon from "@/public/icons/InstaIcon";
import TiktokIcon from "@/public/icons/TiktokIcon";
import TelegramIcon from "@/public/icons/TelegramIcon";
import XIcon from "@/public/icons/XIcon";
import SnapIcon from "@/public/icons/SnapIcon";
import { CONTACT_CONFIG } from "@/lib/constants/contact";

export interface SocialLinksProps {
  className?: string;
  style?: React.CSSProperties;
  /**
   * "default": framer-motion entrance animation
   * "plain": plain wrapper div (e.g. when animated externally by GSAP)
   */
  variant?: "default" | "plain";
}

const socialItems = [
  {
    key: "whatsapp",
    href: CONTACT_CONFIG.social.whatsapp.url,
    ariaLabel: CONTACT_CONFIG.social.whatsapp.ariaLabel,
    Icon: WhatsappIcon,
    bg: "bg-white",
    delay: 1.3,
  },
  {
    key: "instagram",
    href: CONTACT_CONFIG.social.instagram.url,
    ariaLabel: CONTACT_CONFIG.social.instagram.ariaLabel,
    Icon: InstaIcon,
    bg: "bg-[#C445A6]",
    delay: 1.4,
  },
  {
    key: "tiktok",
    href: CONTACT_CONFIG.social.tiktok.url,
    ariaLabel: CONTACT_CONFIG.social.tiktok.ariaLabel,
    Icon: TiktokIcon,
    bg: "bg-white",
    delay: 1.5,
  },
  {
    key: "telegram",
    href: CONTACT_CONFIG.social.telegram.url,
    ariaLabel: CONTACT_CONFIG.social.telegram.ariaLabel,
    Icon: TelegramIcon,
    bg: "bg-white",
    delay: 1.6,
  },
  {
    key: "x",
    href: CONTACT_CONFIG.social.x.url,
    ariaLabel: CONTACT_CONFIG.social.x.ariaLabel,
    Icon: XIcon,
    bg: "bg-white",
    delay: 1.7,
  },
  {
    key: "snapchat",
    href: CONTACT_CONFIG.social.snapchat.url,
    ariaLabel: CONTACT_CONFIG.social.snapchat.ariaLabel,
    Icon: SnapIcon,
    bg: "bg-white",
    delay: 1.8,
  },
];

const SocialLinks = forwardRef<HTMLDivElement, SocialLinksProps>(
  ({ className, style, variant = "default" }, ref) => {
    const baseClassName =
      className ||
      "flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 order-2 md:order-2 mt-6 md:mt-0 mb-[60px]";

    if (variant === "plain") {
      return (
        <div ref={ref} className={baseClassName} style={style}>
          {socialItems.map(({ key, href, ariaLabel, Icon, bg }) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
              >
                <div className={`${bg} rounded-full p-2.5 md:p-[8.18px]`}>
                  <Icon />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
        className={baseClassName}
        style={style}
      >
        {socialItems.map(({ key, href, ariaLabel, Icon, bg, delay }) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ scale: 1.15, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ariaLabel}
              className={`rounded-full p-2 md:p-[8.18px] inline-flex items-center justify-center transition-shadow hover:shadow-lg ${bg}`}
            >
              <Icon />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    );
  }
);

SocialLinks.displayName = "SocialLinks";

export default SocialLinks;
