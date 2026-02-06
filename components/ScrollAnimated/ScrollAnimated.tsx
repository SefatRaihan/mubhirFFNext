"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, MotionProps } from "framer-motion";

interface ScrollAnimatedProps extends MotionProps {
    children: React.ReactNode;
    className?: string;
    as?: keyof React.JSX.IntrinsicElements;
    amount?: number;
    delay?: number;
    // Animation variants
    initialY?: number;
    initialX?: number;
    initialScale?: number;
    initialRotateX?: number;
    duration?: number;
    // Fade out threshold: when this % of element is visible, fade out (default 0.2 = 20%)
    fadeOutThreshold?: number;
}

/**
 * ScrollAnimated Component
 * - Scroll DOWN: Elements fade in and STAY visible
 * - Scroll UP: Elements fade out when only 20% remains visible
 */
export function ScrollAnimated({
    children,
    className = "",
    as = "div",
    amount = 0.3,
    delay = 0,
    initialY = 50,
    initialX = 0,
    initialScale = 1,
    initialRotateX = 0,
    duration = 0.6,
    fadeOutThreshold = 0.2,
    style,
    ...motionProps
}: ScrollAnimatedProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Use refs for scroll tracking to avoid re-renders
    const lastScrollY = useRef(0);
    const scrollDirection = useRef<"up" | "down" | null>(null);
    const hasAnimatedIn = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine scroll direction
            if (currentScrollY > lastScrollY.current) {
                scrollDirection.current = "down";
            } else if (currentScrollY < lastScrollY.current) {
                scrollDirection.current = "up";
            }
            lastScrollY.current = currentScrollY;

            // Check element visibility
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementTop = rect.top;
            const elementBottom = rect.bottom;
            const elementHeight = rect.height;

            // Calculate visible portion
            const visibleFromBottom = Math.min(elementHeight, windowHeight - elementTop);
            const visibleFromTop = Math.min(elementHeight, elementBottom);
            const visibleHeight = Math.max(0, Math.min(visibleFromBottom, visibleFromTop));
            const visibilityRatio = elementHeight > 0 ? visibleHeight / elementHeight : 0;

            // Fade IN: when element enters viewport with enough visibility
            if (visibilityRatio >= amount && !hasAnimatedIn.current) {
                hasAnimatedIn.current = true;
                setIsVisible(true);
            } else if (visibilityRatio >= amount && hasAnimatedIn.current) {
                setIsVisible(true);
            }

            // Fade OUT: only when scrolling UP and element is leaving from bottom
            if (scrollDirection.current === "up" && hasAnimatedIn.current) {
                if (elementTop > windowHeight * (1 - fadeOutThreshold)) {
                    hasAnimatedIn.current = false;
                    setIsVisible(false);
                }
            }
        };

        // Initial check
        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [amount, fadeOutThreshold]);

    const MotionComponent = motion[as as keyof typeof motion] as any;

    return (
        <MotionComponent
            ref={ref}
            className={className}
            initial={{
                opacity: 0,
                y: initialY,
                x: initialX,
                scale: initialScale,
                rotateX: initialRotateX
            }}
            animate={isVisible ? {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                rotateX: 0
            } : {
                opacity: 0,
                y: initialY,
                x: initialX,
                scale: initialScale,
                rotateX: initialRotateX
            }}
            transition={{
                duration,
                delay,
                ease: "easeOut"
            }}
            style={{ ...style, transformStyle: initialRotateX ? "preserve-3d" : undefined }}
            {...motionProps}
        >
            {children}
        </MotionComponent>
    );
}

// Specific variants for common use cases
export function ScrollSection({ children, className = "", ...props }: Omit<ScrollAnimatedProps, "as">) {
    return (
        <ScrollAnimated as="section" className={className} initialY={0} {...props}>
            {children}
        </ScrollAnimated>
    );
}

export function ScrollDiv({ children, className = "", ...props }: Omit<ScrollAnimatedProps, "as">) {
    return (
        <ScrollAnimated as="div" className={className} {...props}>
            {children}
        </ScrollAnimated>
    );
}

export function ScrollH2({ children, className = "", ...props }: Omit<ScrollAnimatedProps, "as">) {
    return (
        <ScrollAnimated as="h2" className={className} initialY={30} {...props}>
            {children}
        </ScrollAnimated>
    );
}

export function ScrollP({ children, className = "", ...props }: Omit<ScrollAnimatedProps, "as">) {
    return (
        <ScrollAnimated as="p" className={className} initialY={20} {...props}>
            {children}
        </ScrollAnimated>
    );
}
