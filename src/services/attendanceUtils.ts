import { ClassSession, SessionType, SessionTypeStats, Subject, AttendanceStatus } from "@/types";
import { format, isSameDay, parseISO } from "date-fns";

export const calculateSessionTypeStats = (
    sessions: ClassSession[],
    type: SessionType
): SessionTypeStats => {
    const typeSessions = sessions.filter(s => s.sessionType === type);
    const total = typeSessions.length;
    const attended = typeSessions.filter(s => s.status === AttendanceStatus.PRESENT).length;
    const percentage = total > 0 ? Math.round((attended / total) * 100) : 100;
    return { attended, total, percentage };
};

export const getAggregatedSubject = (
    subjectBase: { id: string; name: string; code: string; color: string },
    sessions: ClassSession[]
): Subject => {
    const subSessions = sessions.filter(s => s.subjectId === subjectBase.id);
    const total = subSessions.length;
    const attended = subSessions.filter(s => s.status === AttendanceStatus.PRESENT).length;

    return {
        ...subjectBase,
        attended,
        total,
        lectureStats: calculateSessionTypeStats(subSessions, SessionType.LECTURE),
        labStats: calculateSessionTypeStats(subSessions, SessionType.LAB),
        tutorialStats: calculateSessionTypeStats(subSessions, SessionType.TUTORIAL),
    };
};

export const getLocalDateString = (date: Date = new Date()) => {
    return format(date, 'yyyy-MM-dd');
};

export const isSameDayFormatted = (d1: string, d2: Date) => {
    return d1 === getLocalDateString(d2);
};
