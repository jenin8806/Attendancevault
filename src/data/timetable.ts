import { SessionType } from '@/types';

export interface TimetableEntry {
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
    startTime: string;
    endTime: string;
    subjectId: string;
    sessionType: SessionType;
}

export const MOCK_TIMETABLE: TimetableEntry[] = [
    // MONDAY
    { day: 'Monday', startTime: '08:40', endTime: '09:35', subjectId: 'DC', sessionType: SessionType.LECTURE },
    { day: 'Monday', startTime: '09:50', endTime: '11:40', subjectId: 'OS', sessionType: SessionType.LAB },
    { day: 'Monday', startTime: '12:35', endTime: '13:30', subjectId: 'CL', sessionType: SessionType.LECTURE },
    { day: 'Monday', startTime: '13:30', endTime: '14:25', subjectId: 'OS', sessionType: SessionType.LECTURE },

    // TUESDAY
    { day: 'Tuesday', startTime: '08:40', endTime: '09:35', subjectId: 'JP', sessionType: SessionType.LECTURE },
    { day: 'Tuesday', startTime: '12:35', endTime: '13:30', subjectId: 'CA', sessionType: SessionType.LECTURE },

    // WEDNESDAY
    { day: 'Wednesday', startTime: '07:45', endTime: '08:40', subjectId: 'OS', sessionType: SessionType.LECTURE },
    { day: 'Wednesday', startTime: '08:40', endTime: '09:35', subjectId: 'CA', sessionType: SessionType.TUTORIAL },
    { day: 'Wednesday', startTime: '09:50', endTime: '11:40', subjectId: 'CA', sessionType: SessionType.LECTURE },
    { day: 'Wednesday', startTime: '12:35', endTime: '13:30', subjectId: 'DBMS', sessionType: SessionType.LECTURE },
    { day: 'Wednesday', startTime: '13:30', endTime: '14:25', subjectId: 'JP', sessionType: SessionType.LAB },

    // THURSDAY
    { day: 'Thursday', startTime: '08:40', endTime: '09:35', subjectId: 'DC', sessionType: SessionType.LECTURE },
    { day: 'Thursday', startTime: '09:50', endTime: '11:40', subjectId: 'DBMS', sessionType: SessionType.LAB },
    { day: 'Thursday', startTime: '12:35', endTime: '13:30', subjectId: 'CL', sessionType: SessionType.TUTORIAL },

    // FRIDAY
    { day: 'Friday', startTime: '07:45', endTime: '09:35', subjectId: 'DC', sessionType: SessionType.LAB },
    { day: 'Friday', startTime: '09:50', endTime: '10:45', subjectId: 'CL', sessionType: SessionType.LECTURE },
    { day: 'Friday', startTime: '10:45', endTime: '11:40', subjectId: 'DBMS', sessionType: SessionType.LECTURE },
    { day: 'Friday', startTime: '13:30', endTime: '14:25', subjectId: 'JP', sessionType: SessionType.LECTURE },
];

export const INITIAL_SUBJECTS = [
    { id: 'OS', name: 'Operating Systems', code: 'CS301', color: '#3B82F6' },
    { id: 'JP', name: 'Java Programming', code: 'CS302', color: '#8B5CF6' },
    { id: 'DBMS', name: 'Database Management Systems', code: 'CS303', color: '#10B981' },
    { id: 'DC', name: 'Data Communication', code: 'CS304', color: '#F59E0B' },
    { id: 'CA', name: 'Computer Architecture', code: 'CS305', color: '#EF4444' },
    { id: 'CL', name: 'Contemporary Literature', code: 'HS301', color: '#EC4899' },
];
