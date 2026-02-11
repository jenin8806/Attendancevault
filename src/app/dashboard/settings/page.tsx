"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Settings, User, Bell, Palette, Shield } from "lucide-react";

export default function SettingsPage() {
    const sections = [
        { icon: <User />, title: "Account", desc: "Manage your personal information" },
        { icon: <Bell />, title: "Notifications", desc: "Configure your alert preferences" },
        { icon: <Palette />, title: "Appearance", desc: "Customize the theme and layout" },
        { icon: <Shield />, title: "Privacy", desc: "Secure your attendance data" },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-[1000px] mx-auto space-y-12">
                <header>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight">Settings <span className="text-indigo-500">.</span></h1>
                    <p className="text-gray-500 font-bold uppercase tracking-[0.3em] mt-2">Personalize Your Experience</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sections.map((section, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="glass p-8 rounded-[40px] border-white/5 flex items-start gap-6 cursor-pointer hover:bg-white/5 transition-all"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                                {section.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-black mb-1">{section.title}</h3>
                                <p className="text-gray-500 font-medium text-sm leading-relaxed">{section.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
