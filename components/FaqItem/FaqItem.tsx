"use client";

import DownArrowIcon from "@/public/icons/DownArrowIcon";
import UpArrowIcon from "@/public/icons/UpArrowIcon";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItemProps {
    question: string;
    answer: string;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}

export default function FaqItem({ question, answer, index, isOpen, onToggle }: FaqItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 30px -10px rgba(103, 30, 90, 0.2)"
            }}
            className="bg-gray-50 p-4 rounded-lg cursor-pointer"
        >
            <button
                className="w-full flex justify-between items-center focus:outline-none"
                onClick={onToggle}
            >
                <motion.h3
                    animate={{ color: isOpen ? "#671E5A" : "#000000" }}
                    transition={{ duration: 0.3 }}
                    className="text-base sm:text-xl font-semibold text-right"
                >
                    {question}
                </motion.h3>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-9 h-9 shrink-0"
                >
                    {isOpen ? <UpArrowIcon /> : <DownArrowIcon />}
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <motion.div
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            exit={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 text-gray-700 text-right"
                        >
                            {answer}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
