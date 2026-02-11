"use client";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
    children: React.ReactNode;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    duration?: number;
    className?: string;
    distance?: number;
}

export const ScrollReveal = ({
    children,
    direction = "up",
    delay = 0,
    duration = 0.8,
    className = "",
    distance = 40
}: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const variants: Variants = {
        hidden: {
            opacity: 0,
            x: direction === "left" ? -distance : direction === "right" ? distance : 0,
            y: direction === "up" ? distance : direction === "down" ? -distance : 0,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration,
                delay,
                ease: [0.25, 1, 0.5, 1],
            },
        },
    };

    return (
        <div ref={ref} className={className}>
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={variants}
            >
                {children}
            </motion.div>
        </div>
    );
};

export const FloatingElement = ({
    children,
    duration = 3,
    yOffset = 10,
    className = ""
}: {
    children: React.ReactNode;
    duration?: number;
    yOffset?: number;
    className?: string;
}) => {
    return (
        <motion.div
            className={className}
            animate={{
                y: [0, -yOffset, 0],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    );
};
