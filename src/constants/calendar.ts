export const SEMESTER_START = '2025-12-22';
export const SEMESTER_END = '2026-04-18';

export const HOLIDAYS: Record<string, string> = {
    '2025-12-25': 'Christmas',
    '2026-01-14': 'Makar Sankranti',
    '2026-01-26': 'Republic Day',
    '2026-02-15': 'Maha Shivratri',
    '2026-03-04': 'Holi (Dhuleti)',
    '2026-03-21': 'Eid-ul-Fitr',
    '2026-03-26': 'Ram Navmi',
    '2026-03-31': 'Mahavir Jayanti',
    '2026-04-14': 'Ambedkar Jayanti'
};

export const ACADEMIC_PHASES = [
    { name: 'Teaching Phase-I', start: '2025-12-22', end: '2026-02-24' },
    { name: 'Attendance Review-I', start: '2026-02-05', end: '2026-02-10' },
    { name: 'Sessional Exams', start: '2026-02-25', end: '2026-02-27' },
    { name: 'Teaching Phase-II', start: '2026-03-02', end: '2026-04-17' },
    { name: 'Attendance Review-II', start: '2026-03-23', end: '2026-03-25' },
    { name: 'LPW Exams', start: '2026-04-08', end: '2026-04-17' },
    { name: 'Final Freeze', start: '2026-04-18', end: '2026-04-18' }
];
