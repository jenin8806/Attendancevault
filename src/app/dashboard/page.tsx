"use client";
import { useState, useMemo, useEffect } from "react";
import { format, isSameDay } from "date-fns";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { AttendanceRing } from "@/components/AttendanceRing";
import { SubjectCard } from "@/components/SubjectCard";
import { SubjectDetailModal } from "@/components/SubjectDetailModal";
import { INITIAL_SUBJECTS } from "@/data/timetable";
import { generateSessions } from "@/services/calendarEngine";
import { getAggregatedSubject } from "@/services/attendanceUtils";
import { Loader2 } from "lucide-react";
import { Subject, AttendanceStatus, ClassSession } from "@/types";
import { saveAttendance, fetchAttendance } from "@/services/attendanceService";

export default function Dashboard() {
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [sessions, setSessions] = useState<ClassSession[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Sync with Supabase on load
    useEffect(() => {
        const initData = async () => {
            const rawSessions = generateSessions();
            const dbRecords = await fetchAttendance();

            const syncedSessions = rawSessions.map(session => {
                const record = dbRecords.find((r: any) =>
                    r.date === format(new Date(session.date), "yyyy-MM-dd") &&
                    r.subject_id === session.subjectId &&
                    r.session_type === session.sessionType
                );
                return record ? { ...session, status: record.status as AttendanceStatus } : session;
            });

            setSessions(syncedSessions);
            setIsLoading(false);
        };
        initData();
    }, []);

    const handleStatusChange = async (session: ClassSession, newStatus: AttendanceStatus) => {
        // Optimistic UI update
        setSessions(prev => prev.map(s =>
            s.id === session.id ? { ...s, status: newStatus } : s
        ));

        // Save to Supabase
        await saveAttendance(session, newStatus);
    };

    const subjects = useMemo(() => {
        return INITIAL_SUBJECTS.map(subBase => getAggregatedSubject(subBase, sessions));
    }, [sessions]);

    const todaySessions = useMemo(() => {
        return sessions.filter(s => isSameDay(new Date(s.date), new Date()));
    }, [sessions]);

    const overallAttendance = useMemo(() => {
        const total = subjects.reduce((acc, sub) => acc + sub.total, 0);
        const attended = subjects.reduce((acc, sub) => acc + sub.attended, 0);
        return total > 0 ? Math.round((attended / total) * 100) : 100;
    }, [subjects]);

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-[60vh]">
                    <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-[1400px] mx-auto flex flex-col gap-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl lg:text-5xl font-black tracking-tight"
                        >
                            Dashboard <span className="text-indigo-500">.</span>
                        </motion.h1>
                        <p className="text-gray-500 font-bold uppercase tracking-[0.3em] mt-2">Semester Fall 2026</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    <div className="xl:col-span-4 glass rounded-[50px] p-10 flex items-center justify-center border-white/5 bg-gradient-to-br from-indigo-500/5 to-transparent">
                        <AttendanceRing percentage={overallAttendance} />
                    </div>

                    <motion.div className="xl:col-span-8 glass rounded-[50px] p-10 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 border-indigo-500/30 relative overflow-hidden group">
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-white text-black rounded-2xl font-black">AI</div>
                                    <span className="text-sm font-black uppercase tracking-[0.2em] text-white/50">Smart Leave Planner</span>
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-black mb-4">Long Weekend! ⛱️</h2>
                                <p className="text-lg text-white/70 font-medium">Next Thu is a holiday. Skip Wed to get a 5-day streak. Your attendance stays safe at 88%.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <section className="space-y-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-3xl font-black tracking-tight">Today's Agenda</h2>
                        <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-400">
                            {format(new Date(), "EEEE, MMM d")}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {todaySessions.length > 0 ? todaySessions.map((session) => (
                            <motion.div
                                key={session.id}
                                whileHover={{ y: -5 }}
                                className="glass p-6 rounded-[35px] border-white/5 relative group overflow-hidden"
                            >
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{session.startTime}</div>
                                        <div className={`w-2 h-2 rounded-full ${session.status === AttendanceStatus.PRESENT ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' :
                                            session.status === AttendanceStatus.ABSENT ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                                                'bg-gray-600'
                                            }`} />
                                    </div>
                                    <h3 className="text-2xl font-black mb-1">{session.subjectId}</h3>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-6">{session.sessionType}</p>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleStatusChange(session, AttendanceStatus.PRESENT)}
                                            className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${session.status === AttendanceStatus.PRESENT ? 'bg-green-500 text-white' : 'bg-white/5 hover:bg-green-500/10 text-green-400'
                                                }`}
                                        >
                                            In
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(session, AttendanceStatus.ABSENT)}
                                            className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${session.status === AttendanceStatus.ABSENT ? 'bg-red-500 text-white' : 'bg-white/5 hover:bg-red-500/10 text-red-400'
                                                }`}
                                        >
                                            Out
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="col-span-full glass p-10 rounded-[40px] text-center text-gray-500 font-black uppercase tracking-widest text-xs">
                                Relax! No classes scheduled for today.
                            </div>
                        )}
                    </div>
                </section>

                <section className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {subjects.map((subject, i) => (
                            <div key={subject.id} onClick={() => setSelectedSubject(subject)} className="cursor-pointer">
                                <SubjectCard subject={subject} />
                            </div>
                        ))}
                    </div>
                </section>
                <footer className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
                    {[
                        { label: "Bunks Available", value: (subjects.reduce((acc, s) => acc + (s.total - s.attended), 0) / 2).toFixed(0), color: "text-green-400" },
                        { label: "Aggregate Status", value: overallAttendance + "%", color: "text-indigo-400" },
                        { label: "Forecast (14d)", value: (overallAttendance + 2) + "%", color: "text-purple-400" },
                    ].map((stat, i) => (
                        <div key={i} className="glass p-8 rounded-[35px] text-center border-white/5">
                            <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-2">{stat.label}</div>
                            <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                        </div>
                    ))}
                </footer>

                <SubjectDetailModal
                    subject={selectedSubject}
                    onClose={() => setSelectedSubject(null)}
                />
            </div>
        </DashboardLayout>
    );
}
