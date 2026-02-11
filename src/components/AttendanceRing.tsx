"use client";
import { motion } from "framer-motion";

interface AttendanceRingProps {
    percentage: number;
    size?: "sm" | "lg";
}

export const AttendanceRing = ({ percentage, size = "lg" }: AttendanceRingProps) => {
    const stroke = size === "lg" ? 14 : 8;
    const radius = size === "lg" ? 100 : 40;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg
                height={radius * 2}
                width={radius * 2}
                className={`transform rotate-[-90deg] ${size === "lg" ? "drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]" : ""}`}
            >
                <circle
                    stroke="rgba(255,255,255,0.05)"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <motion.circle
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 2, ease: "circOut" }}
                    stroke="url(#gradient-ring)"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + " " + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <defs>
                    <linearGradient id="gradient-ring" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="50%" stopColor="#9333ea" />
                        <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className={`${size === "lg" ? "text-6xl" : "text-xl"} font-black text-white tracking-tighter`}
                >
                    {percentage}%
                </motion.span>
                {size === "lg" && (
                    <span className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] mt-1">Overall</span>
                )}
            </div>
        </div>
    );
};
