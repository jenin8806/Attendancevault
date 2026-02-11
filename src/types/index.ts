export enum Role {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN'
}

export enum SessionType {
  LECTURE = 'LECTURE',
  LAB = 'LAB',
  TUTORIAL = 'TUTORIAL'
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED'
}

export interface SessionTypeStats {
  attended: number;
  total: number;
  percentage: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  color: string;
  attended: number;
  total: number;
  lectureStats: SessionTypeStats;
  labStats: SessionTypeStats;
  tutorialStats: SessionTypeStats;
}

export interface ClassSession {
  id: string;
  subjectId: string;
  date: string; // ISO format
  startTime: string;
  endTime: string;
  sessionType: SessionType;
  status: AttendanceStatus;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}
