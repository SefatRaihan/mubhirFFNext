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
    const isIcon = iconSrc.includes('/icon/');

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
            className="feature-card flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/50 shadow-sm transition-colors hover:bg-white cursor-pointer h-full"
            style={{ transformStyle: 'preserve-3d' }}
        >
            <div className="w-full">
                {isIcon ? (
                    <div className="p-6 pb-0 flex items-start justify-between">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="flex h-10 w-10 items-center justify-center"
                        >
                            <Image src={iconSrc} width={40} height={40} alt={alt || text} className="object-contain" />
                        </motion.div>
                    </div>
                ) : (
                    <div className="relative w-full h-[160px]">
                        <Image src={iconSrc} fill alt={alt || text} className="object-cover" />
                    </div>
                )}
            </div>
            <div className={`${isIcon ? 'p-6 pt-0 mt-12' : 'p-6'} flex-grow`}>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    className="text-[18px] font-medium leading-8"
                >
                    {text}
                </motion.p>
            </div>
        </motion.article>
    );
}
