"use client";
import { motion } from "framer-motion";

export const AnimatedGradient = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 180, 270, 360],
                    x: [0, 100, -100, 0],
                    y: [0, -100, 100, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--gradient-color-1)_0%,_transparent_50%),_radial-gradient(circle_at_center,_var(--gradient-color-2)_0%,_transparent_50%)] opacity-30 blur-[100px]"
                style={{
                    "--gradient-color-1": "#4f46e5",
                    "--gradient-color-2": "#9333ea",
                } as any}
            />
        </div>
    );
};
