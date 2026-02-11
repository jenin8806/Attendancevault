"use client";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, TrendingUp, Zap, Shield, Brain, Sparkles, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const TypingText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}</span>;
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />

      {/* Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]" />
        <div className="absolute top-40 right-0 w-80 h-80 bg-cyan-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 px-6 lg:px-12 py-6 flex justify-between items-center border-b border-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-black text-lg">
            A
          </div>
          <span className="text-xl font-bold">Attendify</span>
        </div>
        <div className="flex gap-3 items-center">
          <Link href="/login">
            <button className="px-6 py-2.5 rounded-xl font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all">
              Sign In
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-8"
              >
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-indigo-300">AI-Powered Tracking</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl lg:text-7xl font-bold mb-6 leading-[1.1]"
              >
                Smart Attendance
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400">
                  Management
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-400 mb-10 leading-relaxed"
              >
                <TypingText text="Never drop below 85%. Track lectures, labs, and tutorials with AI-powered insights." />
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/signup">
                  <button className="group px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 flex items-center gap-2">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/dashboard">
                  <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition-all">
                    View Demo
                  </button>
                </Link>
              </motion.div>

              {/* Features List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 grid grid-cols-2 gap-4"
              >
                {["Real-time Sync", "Holiday Planner", "AI Predictions", "Recovery Plans"].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-indigo-400" />
                    {feature}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Visual - Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                {/* Attendance Ring */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.05)" strokeWidth="10" fill="none" />
                      <motion.circle
                        initial={{ strokeDashoffset: 440 }}
                        animate={{ strokeDashoffset: 88 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="url(#ring-gradient)"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray="440"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-4xl font-bold">92%</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Overall</div>
                    </div>
                  </div>
                </div>

                {/* Subject Cards */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Operating Systems", code: "OS", percent: 94, color: "from-blue-500 to-cyan-500" },
                    { name: "DBMS", code: "DB", percent: 88, color: "from-emerald-500 to-teal-500" },
                    { name: "Java", code: "JP", percent: 91, color: "from-violet-500 to-purple-500" },
                    { name: "Networks", code: "DC", percent: 95, color: "from-orange-500 to-amber-500" },
                  ].map((subject, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${subject.color} flex items-center justify-center text-xs font-bold`}>
                          {subject.code}
                        </div>
                        <div className="text-xs text-gray-400 truncate">{subject.name}</div>
                      </div>
                      <div className="text-2xl font-bold">{subject.percent}%</div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full mt-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${subject.percent}%` }}
                          transition={{ delay: 0.8 + i * 0.1, duration: 1 }}
                          className={`h-full bg-gradient-to-r ${subject.color} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -right-4 top-20 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Safe Zone</div>
                    <div className="text-xs text-gray-400">3 bunks available</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">stay on track</span>
            </h2>
            <p className="text-xl text-gray-400">Powerful features designed for students</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Brain className="w-6 h-6" />,
                title: "AI Predictions",
                desc: "Smart algorithms analyze your attendance patterns and predict future trends.",
                gradient: "from-indigo-500 to-purple-500",
              },
              {
                icon: <Calendar className="w-6 h-6" />,
                title: "Holiday Planner",
                desc: "Automatically detects long weekends and calculates leave impact.",
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Recovery Plans",
                desc: "Get personalized roadmaps to recover if you fall below threshold.",
                gradient: "from-emerald-500 to-teal-500",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Real-time Sync",
                desc: "Cloud-based tracking ensures data is always up-to-date.",
                gradient: "from-amber-500 to-orange-500",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Secure & Private",
                desc: "Your data is encrypted and never shared with third parties.",
                gradient: "from-rose-500 to-pink-500",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Beautiful UI",
                desc: "Clean, modern interface with smooth animations.",
                gradient: "from-violet-500 to-purple-500",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all"
              >
                <div className={`inline-flex p-3 bg-gradient-to-br ${feature.gradient} rounded-xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-600/20 to-cyan-600/20 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-12 lg:p-16 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to take control of your attendance?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Join thousands of students tracking smarter, not harder.
            </p>
            <Link href="/signup">
              <button className="group px-10 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 inline-flex items-center gap-3">
                Start Free Today
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-bold">
              A
            </div>
            <span className="font-bold">Attendify</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 Attendify. Built for students.</p>
        </div>
      </footer>
    </div>
  );
}
