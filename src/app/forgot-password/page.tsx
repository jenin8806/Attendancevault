"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Loader2, KeyRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
        }> = [];

        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
            });
        }

        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            ctx.fillStyle = "rgba(10, 10, 15, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, i) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const angle = Math.atan2(dy, dx);
                    particle.vx -= Math.cos(angle) * 0.02;
                    particle.vy -= Math.sin(angle) * 0.02;
                }

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(99, 102, 241, ${0.3 + Math.random() * 0.3})`;
                ctx.fill();

                particles.forEach((otherParticle, j) => {
                    if (i === j) return;
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />;
};

export default function ForgotPasswordPage() {
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [method, setMethod] = useState<'email' | 'phone'>('email');
    const [value, setValue] = useState("");

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            if (method === 'email') {
                const { error: resetError } = await supabase.auth.resetPasswordForEmail(value, {
                    redirectTo: `${window.location.origin}/reset-password`,
                });
                if (resetError) throw resetError;
                setSuccess(true);
            } else {
                // Phone reset logic (usually via OTP)
                const { error: otpError } = await supabase.auth.signInWithOtp({
                    phone: value,
                });
                if (otpError) throw otpError;
                setSuccess(true);
            }
        } catch (err: any) {
            setError(err.message || "Failed to send reset instructions");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center p-6 relative overflow-hidden">
            <ParticleBackground />

            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px]"
                />
            </div>

            <Link href="/login" className="absolute top-8 left-8 z-50">
                <motion.button
                    whileHover={{ x: -5 }}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-semibold backdrop-blur-sm bg-white/5 px-4 py-2 rounded-lg"
                >
                    <ArrowLeft className="w-5 h-5" /> Back to Login
                </motion.button>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
                    <div className="text-center mb-10">
                        <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 items-center justify-center mb-6 shadow-lg shadow-indigo-500/50">
                            <KeyRound className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Forgot Password?
                        </h1>
                        <p className="text-gray-400">Choose a method to reset your password</p>
                    </div>

                    {success ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <div className="mb-6 p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400">
                                <p className="font-bold mb-2">Instructions Sent!</p>
                                <p className="text-sm opacity-80">
                                    Check your {method === 'email' ? 'email' : 'phone'} for the reset link or code.
                                </p>
                            </div>
                            <Link href="/login">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-white/5 border border-white/10 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all"
                                >
                                    Return to Login
                                </motion.button>
                            </Link>
                        </motion.div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleReset}>
                            <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
                                <button
                                    type="button"
                                    onClick={() => { setMethod('email'); setValue(""); }}
                                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${method === 'email' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    Email
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setMethod('phone'); setValue(""); }}
                                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${method === 'phone' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    Phone
                                </button>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                    {method === 'email' ? 'Email Address' : 'Phone Number'}
                                </label>
                                <div className="relative group">
                                    {method === 'email' ? (
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                                    ) : (
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                                    )}
                                    <input
                                        required
                                        type={method === 'email' ? "email" : "tel"}
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        placeholder={method === 'email' ? "you@college.edu" : "+1 (555) 000-0000"}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white/10 transition-all placeholder:text-gray-600"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
                                    {error}
                                </div>
                            )}

                            <motion.button
                                disabled={isLoading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 py-4 rounded-xl font-bold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Send Reset Code"}
                            </motion.button>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
