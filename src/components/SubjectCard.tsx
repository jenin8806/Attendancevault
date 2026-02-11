"use client";
import { motion } from "framer-motion";
import { Subject, SessionType } from "@/types";
import { BookOpen, FlaskConical, GraduationCap } from "lucide-react";

interface SubjectCardProps {
    subject: Subject;
}

export const SubjectCard = ({ subject }: SubjectCardProps) => {
    const getStatusColor = (percentage: number) => {
        if (percentage >= 85) return "text-green-400";
        if (percentage >= 75) return "text-yellow-400";
        return "text-red-400";
    };

    const getBadgeBg = (percentage: number) => {
        if (percentage >= 85) return "bg-green-400/10 border-green-400/20";
        if (percentage >= 75) return "bg-yellow-400/10 border-yellow-400/20";
        return "bg-red-400/10 border-red-400/20";
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="glass rounded-[40px] p-8 group relative overflow-hidden flex flex-col h-full border-white/5 hover:border-white/20 transition-all duration-500"
        >
            {/* Background Glow */}
            <div
                className="absolute top-0 right-0 w-40 h-40 blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: subject.color }}
            />

            <div className="flex justify-between items-start mb-6">
                <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20 group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundColor: subject.color }}
                >
                    <span className="font-black text-xl">{subject.id[0]}</span>
                </div>
                <div className={`px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest ${getBadgeBg(subject.attended / (subject.total || 1) * 100)} ${getStatusColor(subject.attended / (subject.total || 1) * 100)}`}>
                    {subject.attended / (subject.total || 1) * 100 >= 85 ? "Optimal" : "At Risk"}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-2xl font-black mb-1 group-hover:text-indigo-400 transition-colors">{subject.name}</h3>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">{subject.code}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                    { icon: <GraduationCap className="w-4 h-4" />, label: "Lecture", stats: subject.lectureStats, color: "text-blue-400" },
                    { icon: <FlaskConical className="w-4 h-4" />, label: "Lab", stats: subject.labStats, color: "text-purple-400" },
                    { icon: <BookOpen className="w-4 h-4" />, label: "Tutorial", stats: subject.tutorialStats, color: "text-amber-400" },
                ].map((type, i) => (
                    <div key={i} className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] group-hover:bg-white/[0.05] transition-colors">
                        <div className={`${type.color} mb-1.5`}>{type.icon}</div>
                        <span className="text-[10px] font-black uppercase text-gray-500 mb-1">{type.label}</span>
                        <span className="text-sm font-black text-white">{type.stats.percentage}%</span>
                        <span className="text-[9px] text-gray-400">{type.stats.attended}/{type.stats.total}</span>
                    </div>
                ))}
            </div>

            <div className="mt-auto space-y-4">
                <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Aggregate</span>
                        <span className="text-4xl font-black">{subject.total > 0 ? Math.round((subject.attended / subject.total) * 100) : 100}%</span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-gray-500 font-bold block mb-1 uppercase tracking-widest">Next Class</span>
                        <span className="text-sm font-black text-indigo-400">Tomorrow, 09:50</span>
                    </div>
                </div>

                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.total > 0 ? (subject.attended / subject.total) * 100 : 100}%` }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: subject.color }}
                    />
                </div>
            </div>
        </motion.div>
    );
};
