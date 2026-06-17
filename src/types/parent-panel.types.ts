export type FeeStatus = "paid" | "pending" | "overdue" | "partial";
export type HomeworkStatus = "pending" | "completed" | "late";
export type AttendanceDayStatus = "present" | "absent" | "late" | "leave" | "holiday" | "none";
export type ParentNotificationCategory = "notice" | "fee" | "exam" | "attendance";
export type MessageSenderType = "teacher" | "admin" | "parent";

export interface ParentChild {
  id: string;
  firstName: string;
  lastName: string;
  rollNumber: string;
  className: string;
  section: string;
  schoolName: string;
  avatarUrl?: string;
  attendancePercent: number;
  feeStatus: FeeStatus;
}

export interface ParentDashboardData {
  totalChildren: number;
  attendancePercentage: number;
  pendingFees: number;
  upcomingExams: number;
  newNotifications: number;
  children: ParentChild[];
  attendanceTrend: Array<{ month: string; percentage: number }>;
  performanceTrend: Array<{ month: string; average: number }>;
}

export interface ParentAttendanceDay {
  date: string;
  status: AttendanceDayStatus;
}

export interface ParentAttendanceData {
  childId: string;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  monthlyPercentage: number;
  calendar: ParentAttendanceDay[];
  monthlyTrend: Array<{ week: string; percentage: number }>;
}

export interface ParentFeeRecord {
  id: string;
  childId: string;
  invoiceNo: string;
  feeType: string;
  amount: number;
  paid: number;
  dueDate: string;
  status: FeeStatus;
}

export interface ParentFeeSummary {
  childId: string;
  totalFee: number;
  paidAmount: number;
  remainingAmount: number;
  records: ParentFeeRecord[];
}

export interface ParentSubjectResult {
  subject: string;
  marks: number;
  totalMarks: number;
  grade: string;
  teacherComment: string;
}

export interface ParentExamResult {
  id: string;
  childId: string;
  examName: string;
  academicYear: string;
  date: string;
  subjects: ParentSubjectResult[];
  overallPercentage: number;
}

export interface ParentHomework {
  id: string;
  childId: string;
  title: string;
  subject: string;
  teacherName: string;
  assignedDate: string;
  dueDate: string;
  status: HomeworkStatus;
}

export interface ParentNotification {
  id: string;
  title: string;
  message: string;
  category: ParentNotificationCategory;
  childId?: string;
  sentAt: string;
  read: boolean;
}

export interface ParentMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderType: MessageSenderType;
  content: string;
  sentAt: string;
  read: boolean;
}

export interface ParentConversation {
  id: string;
  title: string;
  participantName: string;
  participantType: MessageSenderType;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: ParentMessage[];
}

export interface ParentDocument {
  id: string;
  childId: string;
  name: string;
  type: "certificate" | "report" | "invoice" | "attachment";
  uploadedAt: string;
  size: string;
}

export interface ParentChildDetail extends ParentChild {
  dateOfBirth: string;
  gender: string;
  admissionDate: string;
  classTeacher: string;
  documents: ParentDocument[];
}

export interface ParentProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  children: ParentChild[];
  address?: string;
}

export interface UpdateParentProfilePayload {
  firstName: string;
  lastName: string;
  phone: string;
  address?: string;
}
