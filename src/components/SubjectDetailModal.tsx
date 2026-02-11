"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Subject, SessionType } from "@/types";
import { X, TrendingUp, AlertCircle, CheckCircle2, MoreHorizontal, Info } from "lucide-react";

interface SubjectDetailModalProps {
    subject: Subject | null;
    onClose: () => void;
}

export const SubjectDetailModal = ({ subject, onClose }: SubjectDetailModalProps) => {
    if (!subject) return null;

    const recoveryCount = subject.percentage < 85 ? Math.ceil((0.85 * (subject.total + 10) - subject.attended) / 1) : 0;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 lg:p-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass rounded-[40px] border-white/10 shadow-3xl bg-black/40 flex flex-col lg:flex-row pb-10"
                >
                    {/* Close Button */}
                    <button onClick={onClose} className="absolute top-8 right-8 p-3 glass rounded-2xl hover:bg-white/10 transition-colors z-10">
                        <X className="w-6 h-6" />
                    </button>

                    {/* Left Column: Summary */}
                    <div className="lg:w-1/3 p-10 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col gap-8">
                        <div
                            className="w-20 h-20 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-2xl"
                            style={{ backgroundColor: subject.color }}
                        >
                            {subject.id[0]}
                        </div>

                        <div>
                            <h2 className="text-4xl font-black mb-2">{subject.name}</h2>
                            <p className="text-indigo-400 font-bold uppercase tracking-[0.2em]">{subject.code}</p>
                        </div>

                        <div className="p-8 rounded-[30px] bg-white/[0.03] border border-white/5">
                            <span className="text-sm text-gray-500 font-bold uppercase tracking-widest block mb-1">Overall Percentage</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-6xl font-black">{Math.round((subject.attended / (subject.total || 1)) * 100)}%</span>
                                <span className={`text-sm font-bold ${subject.attended / (subject.total || 1) * 100 >= 85 ? "text-green-400" : "text-red-400"}`}>
                                    {subject.attended / (subject.total || 1) * 100 >= 85 ? "✓ Optimal" : "⚠ Below 85%"}
                                </span>
                            </div>
                        </div>

                        {subject.attended / (subject.total || 1) * 100 < 85 && (
                            <div className="p-6 rounded-[30px] bg-red-500/10 border border-red-500/20">
                                <div className="flex items-center gap-3 text-red-400 mb-3 font-bold">
                                    <AlertCircle className="w-5 h-5" /> Recovery Roadmap
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                                    You need to attend at least <span className="text-white font-black">{recoveryCount} more</span> consecutive classes to reach the 85% safety threshold.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Deep Dive */}
                    <div className="flex-grow p-10 space-y-10">
                        {/* Session Type Breakdown */}
                        <section>
                            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                <TrendingUp className="w-5 h-5 text-indigo-400" /> Attendance by Type
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { label: "Theory Lectures", stats: subject.lectureStats, color: "bg-blue-500" },
                                    { label: "Laboratory Practical", stats: subject.labStats, color: "bg-purple-500" },
                                    { label: "Academic Tutorials", stats: subject.tutorialStats, color: "bg-amber-500" },
                                ].map((type, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-gray-400">
                                            <span>{type.label}</span>
                                            <span className="text-white">{type.stats.attended} / {type.stats.total} sessions</span>
                                        </div>
                                        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${type.stats.percentage}%` }}
                                                className={`h-full ${type.color} shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-black/20`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Recovery Roadmaps / AI Suggestion */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 glass rounded-[35px] border-indigo-500/20">
                                <h4 className="font-black mb-4 text-indigo-400 uppercase tracking-widest text-sm">Bunk Calculator</h4>
                                <div className="space-y-2">
                                    <p className="text-3xl font-black">2 Classes</p>
                                    <p className="text-gray-400 text-sm font-medium italic">Classes you can safely skip while staying above 85%.</p>
                                </div>
                            </div>
                            <div className="p-8 glass rounded-[35px] border-purple-500/20">
                                <h4 className="font-black mb-4 text-purple-400 uppercase tracking-widest text-sm">Subject Insight</h4>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-500/10 rounded-2xl">
                                        <Info className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <p className="text-sm text-gray-300 font-medium leading-relaxed">
                                        "Labs are your strong point, but Tutorials need attention. Missing the next Tut will put you at 74%."
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
