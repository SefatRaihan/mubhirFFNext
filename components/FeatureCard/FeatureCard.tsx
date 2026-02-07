"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface FeatureCardProps {
    iconSrc: string;
    text: string;
    alt?: string;
    index?: number;
}

export default function FeatureCard({ iconSrc, text, alt, index = 0 }: FeatureCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
            }}
            whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
            }}
            className="feature-card rounded-2xl border border-slate-100 bg-slate-50/50 shadow-sm p-6 transition-colors hover:bg-white cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
        >
            <div className="flex items-start justify-between">
                <motion.span
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full p-2 bg-white border border-slate-200 shadow-sm"
                >
                    <Image src={iconSrc} width={40} height={40} alt={alt || text} />
                </motion.span>
            </div>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="mt-12 text-[18px] font-medium leading-8"
            >
                {text}
            </motion.p>
        </motion.article>
    );
}
