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

export default function FaqItem({ question, answer, index, isOpen, onToggle }: FaqItemProps) {
    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <button
                className="w-full flex justify-between items-center focus:outline-none"
                onClick={onToggle}
            >
                <h3 className="text-xl font-semibold text-[#671E5A] text-right">
                    {question}
                </h3>
                <span className="w-9 h-9 shrink-0">
                    {isOpen ? <UpArrowIcon /> : <DownArrowIcon />}
                </span>
            </button>
            <div className={`mt-4 text-gray-700 text-right ${isOpen ? '' : 'hidden'}`}>
                {answer}
            </div>
        </div>
    );
}
