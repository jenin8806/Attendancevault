"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    startOfWeek,
    endOfWeek,
    isToday
} from "date-fns";
import { ChevronLeft, ChevronRight, Sparkles, Check, X, Loader2 } from "lucide-react";
import { generateSessions } from "@/services/calendarEngine";
import { HOLIDAYS } from "@/constants/calendar";
import { SessionType, AttendanceStatus, ClassSession } from "@/types";
import { saveAttendance, fetchAttendance } from "@/services/attendanceService";

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [sessions, setSessions] = useState<ClassSession[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load initial sessions and sync with Supabase
    useEffect(() => {
        const initData = async () => {
            const rawSessions = generateSessions();
            const dbRecords = await fetchAttendance();

            // Map DB records back to sessions
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

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    const getDaySessions = (date: Date) => {
        return sessions.filter(s => isSameDay(new Date(s.date), date));
    };

    const handleStatusChange = async (session: ClassSession, newStatus: AttendanceStatus) => {
        // Optimistic UI update
        setSessions(prev => prev.map(s =>
            s.id === session.id ? { ...s, status: newStatus } : s
        ));

        // Save to Supabase
        await saveAttendance(session, newStatus);
    };

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

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
            <div className="max-w-[1400px] mx-auto space-y-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl lg:text-5xl font-black tracking-tight"
                        >
                            Calendar <span className="text-indigo-500">.</span>
                        </motion.h1>
                        <p className="text-gray-500 font-bold uppercase tracking-[0.3em] mt-2">Academic Schedule</p>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-xl">
                        <button
                            onClick={prevMonth}
                            className="p-3 hover:bg-white/5 rounded-xl transition-all active:scale-90"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-black min-w-[150px] text-center">
                            {format(currentDate, "MMMM yyyy")}
                        </h2>
                        <button
                            onClick={nextMonth}
                            className="p-3 hover:bg-white/5 rounded-xl transition-all active:scale-90"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Calendar Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="xl:col-span-2 glass rounded-[40px] p-8 border-white/5 overflow-hidden"
                    >
                        <div className="grid grid-cols-7 mb-6">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                                <div key={day} className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 py-4">
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                            {calendarDays.map((day, i) => {
                                const daySessions = getDaySessions(day);
                                const holiday = HOLIDAYS[format(day, "yyyy-MM-dd")];
                                const isSelected = isSameDay(day, selectedDate);
                                const currentMonth = isSameMonth(day, monthStart);

                                return (
                                    <motion.div
                                        key={day.toString()}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => setSelectedDate(day)}
                                        className={`
                      relative min-h-[140px] p-4 rounded-2xl cursor-pointer transition-all border
                      ${isSelected ? 'bg-indigo-500/10 border-indigo-500/50 shadow-lg shadow-indigo-500/10' : 'hover:bg-white/5 border-transparent'}
                      ${!currentMonth ? 'opacity-20 grayscale' : 'opacity-100'}
                      ${holiday ? 'bg-orange-500/5' : ''}
                    `}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-lg font-black ${isToday(day) ? 'text-indigo-400' : ''}`}>
                                                {format(day, "d")}
                                            </span>
                                            {holiday && (
                                                <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            {daySessions.slice(0, 3).map((session, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`
                            text-[10px] font-bold px-2 py-1 rounded-md truncate flex items-center gap-1.5
                            ${session.sessionType === SessionType.LAB ? 'bg-emerald-500/20 text-emerald-400' :
                                                            session.sessionType === SessionType.TUTORIAL ? 'bg-amber-500/20 text-amber-400' :
                                                                'bg-indigo-500/20 text-indigo-400'}
                          `}
                                                >
                                                    <div className={`w-1.5 h-1.5 rounded-full ${session.status === AttendanceStatus.PRESENT ? 'bg-green-500' :
                                                        session.status === AttendanceStatus.ABSENT ? 'bg-red-500' : 'bg-gray-500/50'
                                                        }`} />
                                                    {session.subjectId}
                                                </div>
                                            ))}
                                        </div>

                                        {holiday && isSameMonth(day, monthStart) && (
                                            <div className="absolute inset-x-0 bottom-2 px-2">
                                                <div className="text-[9px] font-black text-orange-400/70 truncate text-center">
                                                    {holiday}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Day Details Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="xl:col-span-1"
                    >
                        <div className="glass rounded-[40px] p-6 border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-transparent min-h-[600px]">
                            <div className="mb-8">
                                <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Timeline</div>
                                <h3 className="text-3xl font-black">
                                    {format(selectedDate, "EEE, MMM d")}
                                </h3>
                            </div>

                            <div className="space-y-8">
                                <AnimatePresence mode="popLayout">
                                    {getDaySessions(selectedDate).length > 0 ? (
                                        getDaySessions(selectedDate).map((session, i) => (
                                            <motion.div
                                                key={session.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="relative pl-6 border-l-2 border-white/10 group"
                                            >
                                                <div className={`
                          absolute -left-[5px] top-0 w-2 h-2 rounded-full transition-all duration-500
                          ${session.status === AttendanceStatus.PRESENT ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)] scale-125' :
                                                        session.status === AttendanceStatus.ABSENT ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)] scale-125' :
                                                            'bg-gray-600'}
                        `} />

                                                <div className="flex flex-col gap-1 mb-4">
                                                    <div className="flex justify-between items-start">
                                                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                                                            {session.startTime} - {session.endTime}
                                                        </span>
                                                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${session.status === AttendanceStatus.PRESENT ? 'border-green-500/50 text-green-400 bg-green-500/10' :
                                                            session.status === AttendanceStatus.ABSENT ? 'border-red-500/50 text-red-400 bg-red-500/10' :
                                                                'border-white/10 text-gray-500'
                                                            }`}>
                                                            {session.status}
                                                        </span>
                                                    </div>
                                                    <span className="text-xl font-black">
                                                        {session.subjectId}
                                                    </span>
                                                    <span className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                                        {session.sessionType}
                                                    </span>
                                                </div>

                                                {/* Attendance Marking Buttons */}
                                                <div className="flex flex-col gap-2 mt-3">
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleStatusChange(session, AttendanceStatus.PRESENT)}
                                                        className={`
                                                          w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                              ${session.status === AttendanceStatus.PRESENT
                                                                ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                                                                : 'bg-white/5 border border-white/10 text-green-500 hover:bg-green-500/10'}
                            `}
                                                    >
                                                        <Check className="w-3 h-3" /> Present
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleStatusChange(session, AttendanceStatus.ABSENT)}
                                                        className={`
                                                          w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                              ${session.status === AttendanceStatus.ABSENT
                                                                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                                                                : 'bg-white/5 border border-white/10 text-red-500 hover:bg-red-500/10'}
                            `}
                                                    >
                                                        <X className="w-3 h-3" /> Absent
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="text-center py-20">
                                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Sparkles className="w-8 h-8 text-gray-700" />
                                            </div>
                                            <p className="text-gray-500 font-black uppercase text-[10px] tracking-widest leading-relaxed">
                                                No Classes Scheduled
                                            </p>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    );
}
