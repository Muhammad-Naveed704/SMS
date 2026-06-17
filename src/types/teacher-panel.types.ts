export type AssignmentStatus = "active" | "draft" | "closed";
export type TeacherAttendanceStatus = "present" | "absent" | "late";
export type TeacherNotificationType = "announcement" | "exam" | "assignment";

export interface TeacherClass {
  id: string;
  classId: string;
  name: string;
  section: string;
  subject: string;
  studentCount: number;
  schedule: string;
  room: string;
}

export interface TeacherClassStudent {
  id: string;
  firstName: string;
  lastName: string;
  rollNumber: string;
  section: string;
  avatarUrl?: string;
  attendancePercent: number;
  performanceScore: number;
  parentName: string;
  parentPhone: string;
}

export interface TeacherScheduleSlot {
  id: string;
  time: string;
  className: string;
  section: string;
  subject: string;
  room: string;
}

export interface TeacherAttendanceRecord {
  studentId: string;
  studentName: string;
  rollNumber: string;
  status: TeacherAttendanceStatus;
}

export interface TeacherAssignment {
  id: string;
  title: string;
  description: string;
  classId: string;
  className: string;
  section: string;
  subject: string;
  dueDate: string;
  status: AssignmentStatus;
  submittedCount: number;
  totalStudents: number;
  createdAt: string;
}

export interface TeacherExam {
  id: string;
  name: string;
  classId: string;
  className: string;
  section: string;
  subject: string;
  date: string;
  totalMarks: number;
  status: "upcoming" | "ongoing" | "completed";
}

export interface TeacherMarkEntry {
  studentId: string;
  studentName: string;
  rollNumber: string;
  marks: number | null;
  grade: string;
  totalMarks: number;
}

export interface TeacherTimetableSlot {
  id: string;
  day: string;
  period: number;
  startTime: string;
  endTime: string;
  subject: string;
  className: string;
  section: string;
  room: string;
}

export interface TeacherStudent {
  id: string;
  firstName: string;
  lastName: string;
  className: string;
  section: string;
  parentName: string;
  parentPhone: string;
  attendancePercent: number;
  performanceScore: number;
}

export interface TeacherProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subjects: string[];
  classes: string[];
  joinDate: string;
  avatarUrl?: string;
  employeeId: string;
  qualification?: string;
  documents: Array<{ id: string; name: string; uploadedAt: string }>;
}

export interface TeacherNotification {
  id: string;
  title: string;
  message: string;
  type: TeacherNotificationType;
  sentAt: string;
  read: boolean;
}

export interface TeacherDashboardData {
  assignedClasses: number;
  totalStudents: number;
  todaysClasses: number;
  pendingAttendance: number;
  upcomingExams: number;
  pendingAssignments: number;
  todaySchedule: TeacherScheduleSlot[];
  attendanceOverview: Array<{ date: string; present: number; absent: number; late: number }>;
  performanceOverview: Array<{ month: string; average: number }>;
  notifications: TeacherNotification[];
}

export interface CreateAssignmentPayload {
  title: string;
  description: string;
  classId: string;
  section: string;
  subject: string;
  dueDate: string;
}

export interface SaveMarksPayload {
  examId: string;
  classId: string;
  subject: string;
  entries: Array<{ studentId: string; marks: number }>;
}
