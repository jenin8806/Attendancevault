import { ClassSession, SessionType, AttendanceStatus, Subject } from "@/types";
import { MOCK_TIMETABLE, INITIAL_SUBJECTS } from "@/data/timetable";
import { SEMESTER_START, SEMESTER_END, HOLIDAYS } from "@/constants/calendar";
import { addDays, format, isBefore, isAfter, parseISO, startOfDay, eachDayOfInterval } from "date-fns";

export const generateSessions = (): ClassSession[] => {
    const sessions: ClassSession[] = [];
    const start = parseISO(SEMESTER_START);
    const end = parseISO(SEMESTER_END);

    const daysRange = eachDayOfInterval({ start, end });

    daysRange.forEach(date => {
        const dayName = format(date, 'EEEE');
        const dateStr = format(date, 'yyyy-MM-dd');

        // Skip holidays
        if (HOLIDAYS[dateStr]) return;

        // Map timetable to this day
        const dayEntries = MOCK_TIMETABLE.filter(entry => entry.day === dayName);

        dayEntries.forEach((entry, i) => {
            sessions.push({
                id: `${dateStr}-${entry.subjectId}-${i}`,
                subjectId: entry.subjectId,
                date: dateStr,
                startTime: entry.startTime,
                endTime: entry.endTime,
                sessionType: entry.sessionType,
                status: AttendanceStatus.PENDING
            });
        });
    });

    return sessions;
};
