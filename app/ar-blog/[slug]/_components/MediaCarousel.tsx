"use client";

import { useState } from "react";
import Image from "next/image";
import CarLeftArrowIcon from "@/public/icons/CarLeftArrowIcon";
import CarRightArrowIcon from "@/public/icons/CarRightArrowIcon";
import type { BlogBlock } from "@/lib/types/blog";

interface MediaCarouselProps {
    mediaGroup: BlogBlock[];
    blogTitle: string;
}

const isVideo = (fileType: string | null): boolean => {
    if (!fileType) return false;
    const lowerType = fileType.toLowerCase();
    return lowerType === 'video' || lowerType.startsWith('video/') || ['mp4', 'webm', 'ogg', 'mov'].includes(lowerType);
};

export default function MediaCarousel({ mediaGroup, blogTitle }: MediaCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentMedia = mediaGroup[currentIndex];
    const isVideoBlock = isVideo(currentMedia.file_type);

    const nextImage = () => {
        setCurrentIndex(prev => (prev + 1) % mediaGroup.length);
    };

    const prevImage = () => {
        setCurrentIndex(prev => (prev - 1 + mediaGroup.length) % mediaGroup.length);
    };

    return (
        <div className="mb-8">
            {isVideoBlock ? (
                <video
                    src={currentMedia.file_url || ''}
                    controls
                    className="w-full h-auto rounded-lg shadow-md"
                    playsInline
                />
            ) : (
                <Image
                    src={currentMedia.file_url || '/image/c1.png'}
                    alt={currentMedia.alt_text || blogTitle}
                    width={800}
                    height={500}
                    className="w-full h-auto rounded-lg shadow-md"
                />
            )}

            {currentMedia.alt_text && (
                <p className="text-center text-sm text-gray-600 mt-2">{currentMedia.alt_text}</p>
            )}

            {mediaGroup.length > 1 && (
                <div className="flex justify-end mt-4 gap-3">
                    <button
                        onClick={prevImage}
                        className="w-12 h-12 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                        aria-label="الصورة السابقة"
                    >
                        <CarLeftArrowIcon />
                    </button>

                    <button
                        onClick={nextImage}
                        className="w-12 h-12 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                        aria-label="الصورة التالية"
                    >
                        <CarRightArrowIcon />
                    </button>
                </div>
            )}
        </div>
    );
}
