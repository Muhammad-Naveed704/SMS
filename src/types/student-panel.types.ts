export type StudentAttendanceStatus = "present" | "absent" | "late" | "leave" | "holiday" | "none";
export type HomeworkStatus = "pending" | "submitted" | "completed" | "late";
export type AssignmentStatus = "active" | "submitted" | "overdue";
export type StudentNotificationCategory = "notice" | "exam" | "homework" | "assignment";

export interface StudentProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  gender: string;
  address?: string;
  rollNumber: string;
  className: string;
  section: string;
  schoolName: string;
  admissionDate: string;
  classTeacher: string;
  avatarUrl?: string;
}

export interface StudentDashboardData {
  attendancePercentage: number;
  upcomingExams: number;
  pendingHomework: number;
  completedAssignments: number;
  currentGpa: number;
  currentGrade: string;
  profile: StudentProfile;
  attendanceTrend: Array<{ month: string; percentage: number }>;
  performanceTrend: Array<{ month: string; average: number }>;
  upcomingExamsList: StudentExam[];
  recentNotifications: StudentNotification[];
  latestAssignments: StudentAssignment[];
}

export interface StudentSubject {
  id: string;
  name: string;
  teacherName: string;
  teacherEmail: string;
  schedule: string;
  room: string;
  description: string;
}

export interface StudentSubjectDetail extends StudentSubject {
  assignments: StudentAssignment[];
  homework: StudentHomework[];
  studyMaterials: Array<{ id: string; title: string; type: string; uploadedAt: string }>;
}

export interface StudentAttendanceDay {
  date: string;
  status: StudentAttendanceStatus;
}

export interface StudentAttendanceData {
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  monthlyPercentage: number;
  calendar: StudentAttendanceDay[];
  monthlyTrend: Array<{ month: string; percentage: number }>;
}

export interface StudentTimetableSlot {
  id: string;
  day: string;
  period: number;
  startTime: string;
  endTime: string;
  subject: string;
  teacherName: string;
  room: string;
}

export interface StudentHomework {
  id: string;
  title: string;
  subject: string;
  teacherName: string;
  assignedDate: string;
  dueDate: string;
  status: HomeworkStatus;
}

export interface StudentAssignment {
  id: string;
  title: string;
  subject: string;
  teacherName: string;
  description: string;
  dueDate: string;
  status: AssignmentStatus;
  attachmentUrl?: string;
  submittedAt?: string;
}

export interface StudentExam {
  id: string;
  name: string;
  subject: string;
  date: string;
  time: string;
  room: string;
  totalMarks: number;
}

export interface StudentSubjectResult {
  subject: string;
  marks: number;
  totalMarks: number;
  grade: string;
  remarks: string;
}

export interface StudentResultsData {
  overallGrade: string;
  gpa: number;
  rank?: number;
  totalStudents?: number;
  academicYear: string;
  subjects: StudentSubjectResult[];
  performanceTrend: Array<{ exam: string; percentage: number }>;
}

export interface StudentNotification {
  id: string;
  title: string;
  message: string;
  category: StudentNotificationCategory;
  sentAt: string;
  read: boolean;
}

export interface StudentDocument {
  id: string;
  name: string;
  type: "certificate" | "result" | "report" | "school";
  uploadedAt: string;
  size: string;
}

export interface UpdateStudentProfilePayload {
  phone?: string;
  address?: string;
}

export interface SubmitAssignmentPayload {
  assignmentId: string;
  note?: string;
}
