"use client";
import { LayoutDashboard, Calendar, Bell, Settings, LogOut, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            router.push("/");
        }
    };

    const menuItems = [
        { icon: <LayoutDashboard className="w-6 h-6" />, label: "Dashboard", href: "/dashboard" },
        { icon: <Calendar className="w-6 h-6" />, label: "Calendar", href: "/dashboard/calendar" },
        { icon: <Bell className="w-6 h-6" />, label: "Alerts", href: "/dashboard/alerts" },
        { icon: <Settings className="w-6 h-6" />, label: "Settings", href: "/dashboard/settings" },
    ];

    return (
        <div className="min-h-screen bg-black text-white flex overflow-hidden">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex flex-col w-72 glass m-6 rounded-[40px] p-8 gap-10 border-white/5">
                <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2">
                    ATTENDIFY
                </div>

                <nav className="flex flex-col gap-3 flex-grow">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    className={`flex items-center gap-4 p-4 rounded-3xl transition-all duration-300 ${isActive
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl shadow-indigo-600/30 text-white'
                                        : 'hover:bg-white/5 text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute left-0 w-1 y-8 bg-white rounded-full"
                                        />
                                    )}
                                    {item.icon}
                                    <span className="font-bold tracking-tight">{item.label}</span>
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 p-4 rounded-3xl hover:bg-red-500/10 text-red-500 transition-all font-bold group"
                >
                    <motion.div whileHover={{ rotate: -15 }}>
                        <LogOut className="w-6 h-6" />
                    </motion.div>
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <div className="flex-grow flex flex-col min-w-0 overflow-hidden relative">
                {/* Mobile Header */}
                <header className="lg:hidden flex justify-between items-center p-6 border-b border-white/10 glass mb-4">
                    <div className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                        ATTENDIFY
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(true)}>
                        <Menu className="w-6 h-6 text-indigo-400" />
                    </button>
                </header>

                <main className="flex-grow overflow-y-auto p-4 lg:p-10 lg:pl-0 scrollbar-hide">
                    {children}
                </main>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl lg:hidden flex flex-col p-10"
                    >
                        <div className="flex justify-between items-center mb-16">
                            <div className="text-3xl font-black">ATTENDIFY</div>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 glass rounded-2xl">
                                <Menu className="w-8 h-8 text-indigo-400 rotate-90" />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-6">
                            {menuItems.map((item) => (
                                <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                                    <div className="text-3xl font-black text-gray-400 hover:text-white transition-colors flex items-center gap-6">
                                        {item.icon} {item.label}
                                    </div>
                                </Link>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="text-3xl font-black text-red-500 transition-colors flex items-center gap-6 mt-6"
                            >
                                <LogOut className="w-8 h-8" /> Logout
                            </button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
