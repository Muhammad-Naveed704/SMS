export type StudentStatus = "active" | "inactive" | "graduated" | "transferred";
export type FeeStatus = "paid" | "pending" | "overdue" | "partial";
export type TeacherStatus = "active" | "inactive" | "on_leave";
export type ExamStatus = "upcoming" | "ongoing" | "completed";
export type AttendanceStatus = "present" | "absent" | "late";

export interface SchoolStudent {
  id: string;
  firstName: string;
  lastName: string;
  rollNumber: string;
  classId: string;
  className: string;
  section: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  avatarUrl?: string;
  parentName: string;
  parentPhone: string;
  parentEmail?: string;
  phone?: string;
  feeStatus: FeeStatus;
  status: StudentStatus;
  admissionDate: string;
  address?: string;
}

export interface SchoolTeacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  classes: string[];
  status: TeacherStatus;
  joinDate: string;
  avatarUrl?: string;
}

export interface SchoolClass {
  id: string;
  name: string;
  grade: string;
  sections: string[];
  studentCount: number;
  classTeacherId?: string;
  classTeacherName?: string;
  subjects: string[];
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  rollNumber: string;
  status: AttendanceStatus;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  feeType: string;
  amount: number;
  paid: number;
  dueDate: string;
  status: FeeStatus;
}

export interface Exam {
  id: string;
  name: string;
  date: string;
  classes: string[];
  subjects: string[];
  status: ExamStatus;
  totalMarks: number;
}

export interface TimetableSlot {
  id: string;
  day: string;
  period: number;
  startTime: string;
  endTime: string;
  className: string;
  section: string;
  subject: string;
  teacherName: string;
  room: string;
}

export interface SchoolNotification {
  id: string;
  title: string;
  message: string;
  audience: "teachers" | "parents" | "students" | "all";
  channels: ("in_app" | "email" | "sms")[];
  sentAt: string;
  status: "sent" | "scheduled" | "draft";
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  type: "exam" | "meeting" | "holiday" | "event";
}

export interface SchoolDashboardData {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  todayAttendance: number;
  pendingFees: number;
  upcomingExams: number;
  collectedFees: number;
  attendanceRate: number;
  recentEnrollments: SchoolStudent[];
  todayAttendanceList: AttendanceRecord[];
  upcomingEvents: SchoolEvent[];
  attendanceOverview: Array<{ date: string; present: number; absent: number; late: number }>;
  feeCollection: Array<{ month: string; collected: number; pending: number }>;
  studentGrowth: Array<{ month: string; students: number }>;
}

export interface CreateStudentPayload {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  classId: string;
  section: string;
  rollNumber: string;
  admissionDate: string;
  parentName: string;
  parentPhone: string;
  parentEmail?: string;
}

export interface SchoolSettingsData {
  schoolName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  academicYear: string;
  timezone: string;
  logoUrl?: string;
}
