"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Bell, Sparkles } from "lucide-react";

export default function AlertsPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6"
                >
                    <Bell className="w-12 h-12 text-indigo-500" />
                </motion.div>
                <h1 className="text-4xl font-black mb-2">Alerts Center</h1>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-8">Stay updated with AI notifications</p>

                <div className="glass p-12 rounded-[50px] border-white/5 max-w-lg">
                    <Sparkles className="w-10 h-10 text-gray-700 mx-auto mb-6" />
                    <p className="text-gray-400 font-medium italic">
                        "Your AI advisor is currently analyzing your attendance trends. No urgent alerts at the moment."
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
}
