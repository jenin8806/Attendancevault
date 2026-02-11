import { ClassSession, AttendanceStatus } from "@/types";
import { HOLIDAYS, ACADEMIC_PHASES } from "@/constants/calendar";
import { addDays, format, isWeekend, parseISO, startOfDay } from "date-fns";

export interface LeaveSimulationResult {
    isSafe: 'Safe' | 'Risky' | 'Danger';
    newPercentage: number;
    impact: number;
    message: string;
}

export const detectHolidayStreaks = (sessions: ClassSession[]) => {
    const streaks: { date: string; name: string; length: number }[] = [];
    const holidayDates = Object.keys(HOLIDAYS);

    holidayDates.forEach(dateStr => {
        const date = parseISO(dateStr);
        // Check if it's a Thursday or Tuesday (potential streaks)
        const day = format(date, 'EEEE');

        if (day === 'Thursday') {
            streaks.push({ date: dateStr, name: HOLIDAYS[dateStr], length: 4 }); // Thu + Fri + Sat + Sun
        } else if (day === 'Tuesday') {
            streaks.push({ date: dateStr, name: HOLIDAYS[dateStr], length: 4 }); // Sat + Sun + Mon + Tue
        }
    });

    return streaks;
};

export const simulateLeave = (
    allSessions: ClassSession[],
    leaveDates: string[]
): LeaveSimulationResult => {
    const currentAttended = allSessions.filter(s => s.status === AttendanceStatus.PRESENT).length;
    const currentTotal = allSessions.filter(s => s.status !== AttendanceStatus.PENDING).length;
    const currentPct = currentTotal > 0 ? (currentAttended / currentTotal) * 100 : 100;

    const sessionsToMiss = allSessions.filter(s => leaveDates.includes(s.date));
    const newTotal = currentTotal + sessionsToMiss.length;
    const newPct = newTotal > 0 ? (currentAttended / newTotal) * 100 : 100;

    const impact = currentPct - newPct;

    let isSafe: 'Safe' | 'Risky' | 'Danger' = 'Safe';
    if (newPct < 75) isSafe = 'Danger';
    else if (newPct < 85) isSafe = 'Risky';

    // Check if leave dates overlap with exams or review windows
    const isBlockingPhase = ACADEMIC_PHASES.some(phase =>
        leaveDates.some(ld => ld >= phase.start && ld <= phase.end && (phase.name.includes('Exam') || phase.name.includes('Review')))
    );

    return {
        isSafe: isBlockingPhase ? 'Danger' : isSafe,
        newPercentage: Math.round(newPct * 10) / 10,
        impact: Math.round(impact * 10) / 10,
        message: isBlockingPhase
            ? "Cannot take leave during Exam/Review weeks!"
            : `This leave will reduce your attendance by ${Math.round(impact * 10) / 10}%.`
    };
};
