"use client";

import DownArrowIcon from "@/public/icons/DownArrowIcon";
import UpArrowIcon from "@/public/icons/UpArrowIcon";

interface FaqItemProps {
    question: string;
    answer: string;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}

const delayClassMap: Record<number, string> = {
    0: "faq-item-delay-0",
    1: "faq-item-delay-1",
    2: "faq-item-delay-2",
    3: "faq-item-delay-3",
    4: "faq-item-delay-4",
    5: "faq-item-delay-5",
    6: "faq-item-delay-6",
    7: "faq-item-delay-7",
};

export default function FaqItem({ question, answer, index, isOpen, onToggle }: FaqItemProps) {
    return (
        <div
            className={`bg-gray-50 p-4 rounded-lg cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_10px_30px_-10px_rgba(103,30,90,0.2)] animate-faq-item ${delayClassMap[index] ?? ""}`}
        >
            <button
                className="w-full flex justify-between items-center focus:outline-none"
                onClick={onToggle}
            >
                <h3
                    className={`text-base sm:text-xl font-semibold text-right transition-colors duration-300 ${
                        isOpen ? "text-[#671E5A]" : "text-black"
                    }`}
                >
                    {question}
                </h3>
                <span
                    className={`w-9 h-9 shrink-0 transition-transform duration-300 ease-in-out ${
                        isOpen ? "rotate-180" : "rotate-0"
                    }`}
                >
                    {isOpen ? <UpArrowIcon /> : <DownArrowIcon />}
                </span>
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                        ? "grid-rows-[1fr] opacity-100 pt-4"
                        : "grid-rows-[0fr] opacity-0 pt-0"
                }`}
            >
                <div className="min-h-0 text-gray-700 text-right">
                    {answer}
                </div>
            </div>
        </div>
    );
}
