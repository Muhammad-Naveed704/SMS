import type {
  ParentAttendanceData,
  ParentChild,
  ParentChildDetail,
  ParentConversation,
  ParentDashboardData,
  ParentDocument,
  ParentExamResult,
  ParentFeeSummary,
  ParentHomework,
  ParentMessage,
  ParentNotification,
  ParentProfile,
  UpdateParentProfilePayload,
} from "@/types/parent-panel.types";

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

const PARENT_ID = "p1";
const SCHOOL_NAME = "Springfield Academy";

/** Only children linked to this parent — never expose other students */
const LINKED_CHILDREN: ParentChild[] = [
  {
    id: "s1",
    firstName: "Ahmed",
    lastName: "Khan",
    rollNumber: "1001",
    className: "Grade 10",
    section: "A",
    schoolName: SCHOOL_NAME,
    attendancePercent: 94,
    feeStatus: "paid",
  },
  {
    id: "s1b",
    firstName: "Amina",
    lastName: "Khan",
    rollNumber: "2002",
    className: "Grade 5",
    section: "B",
    schoolName: SCHOOL_NAME,
    attendancePercent: 96,
    feeStatus: "pending",
  },
];

function assertChildAccess(childId: string): ParentChild {
  const child = LINKED_CHILDREN.find((c) => c.id === childId);
  if (!child) throw new Error("Access denied: child not linked to this parent");
  return child;
}

const CHILD_DETAILS: Record<string, Omit<ParentChildDetail, keyof ParentChild>> = {
  s1: {
    dateOfBirth: "2010-03-15",
    gender: "male",
    admissionDate: "2024-04-01",
    classTeacher: "Emily Davis",
    documents: [
      { id: "d1", childId: "s1", name: "Admission Certificate.pdf", type: "certificate", uploadedAt: "2024-04-01", size: "245 KB" },
      { id: "d2", childId: "s1", name: "Term 1 Report Card.pdf", type: "report", uploadedAt: "2026-03-15", size: "180 KB" },
      { id: "d3", childId: "s1", name: "Fee Invoice #INV-2026-001.pdf", type: "invoice", uploadedAt: "2026-06-01", size: "95 KB" },
    ],
  },
  s1b: {
    dateOfBirth: "2015-08-22",
    gender: "female",
    admissionDate: "2025-04-01",
    classTeacher: "Sarah Johnson",
    documents: [
      { id: "d4", childId: "s1b", name: "Admission Certificate.pdf", type: "certificate", uploadedAt: "2025-04-01", size: "230 KB" },
      { id: "d5", childId: "s1b", name: "Fee Invoice #INV-2026-042.pdf", type: "invoice", uploadedAt: "2026-06-01", size: "88 KB" },
    ],
  },
};

let notificationsStore: ParentNotification[] = [
  { id: "n1", title: "Mid-Term Exam Schedule", message: "Mid-term exams for Grade 10 begin June 20.", category: "exam", childId: "s1", sentAt: "2026-06-14T09:00:00Z", read: false },
  { id: "n2", title: "Fee Reminder", message: "Tuition fee for Amina Khan is due by June 30.", category: "fee", childId: "s1b", sentAt: "2026-06-13T10:00:00Z", read: false },
  { id: "n3", title: "School Holiday Notice", message: "School will remain closed on June 26 for staff training.", category: "notice", sentAt: "2026-06-12T08:00:00Z", read: true },
  { id: "n4", title: "Attendance Alert", message: "Ahmed was marked absent on June 11.", category: "attendance", childId: "s1", sentAt: "2026-06-11T16:00:00Z", read: true },
  { id: "n5", title: "PTM Invitation", message: "Parent-Teacher Meeting on June 25 at 10 AM.", category: "notice", sentAt: "2026-06-10T09:00:00Z", read: false },
];

let profileStore: ParentProfile = {
  id: PARENT_ID,
  firstName: "Parent",
  lastName: "User",
  email: "parent@sms.local",
  phone: "+1 555-1001",
  address: "456 Family Lane, Springfield",
  children: LINKED_CHILDREN,
};

const FEES: Record<string, ParentFeeSummary> = {
  s1: {
    childId: "s1",
    totalFee: 2500,
    paidAmount: 2500,
    remainingAmount: 0,
    records: [
      { id: "f1", childId: "s1", invoiceNo: "INV-2026-001", feeType: "Tuition", amount: 2000, paid: 2000, dueDate: "2026-06-30", status: "paid" },
      { id: "f2", childId: "s1", invoiceNo: "INV-2026-002", feeType: "Transport", amount: 500, paid: 500, dueDate: "2026-06-30", status: "paid" },
    ],
  },
  s1b: {
    childId: "s1b",
    totalFee: 1800,
    paidAmount: 900,
    remainingAmount: 900,
    records: [
      { id: "f3", childId: "s1b", invoiceNo: "INV-2026-042", feeType: "Tuition", amount: 1500, paid: 750, dueDate: "2026-06-30", status: "partial" },
      { id: "f4", childId: "s1b", invoiceNo: "INV-2026-043", feeType: "Activity", amount: 300, paid: 150, dueDate: "2026-06-30", status: "pending" },
    ],
  },
};

const RESULTS: ParentExamResult[] = [
  {
    id: "r1", childId: "s1", examName: "Unit Test - Algebra", academicYear: "2025-2026", date: "2026-05-15", overallPercentage: 88,
    subjects: [
      { subject: "Mathematics", marks: 44, totalMarks: 50, grade: "A", teacherComment: "Excellent problem-solving skills." },
      { subject: "English", marks: 38, totalMarks: 50, grade: "B", teacherComment: "Good essay writing. Improve vocabulary." },
      { subject: "Physics", marks: 42, totalMarks: 50, grade: "A", teacherComment: "Strong grasp of concepts." },
    ],
  },
  {
    id: "r2", childId: "s1", examName: "Mid-Term Examination", academicYear: "2025-2026", date: "2026-03-20", overallPercentage: 85,
    subjects: [
      { subject: "Mathematics", marks: 85, totalMarks: 100, grade: "A", teacherComment: "Consistent performance." },
      { subject: "English", marks: 78, totalMarks: 100, grade: "B", teacherComment: "Well structured answers." },
      { subject: "Physics", marks: 82, totalMarks: 100, grade: "A", teacherComment: "Good lab work." },
      { subject: "Chemistry", marks: 76, totalMarks: 100, grade: "B", teacherComment: "Needs more practice." },
    ],
  },
  {
    id: "r3", childId: "s1b", examName: "Unit Test", academicYear: "2025-2026", date: "2026-05-10", overallPercentage: 92,
    subjects: [
      { subject: "English", marks: 46, totalMarks: 50, grade: "A+", teacherComment: "Outstanding reading comprehension." },
      { subject: "Mathematics", marks: 44, totalMarks: 50, grade: "A", teacherComment: "Great improvement." },
    ],
  },
];

const HOMEWORK: ParentHomework[] = [
  { id: "h1", childId: "s1", title: "Quadratic Equations Worksheet", subject: "Mathematics", teacherName: "Teacher User", assignedDate: "2026-06-10", dueDate: "2026-06-18", status: "pending" },
  { id: "h2", childId: "s1", title: "Essay: Climate Change", subject: "English", teacherName: "Sarah Johnson", assignedDate: "2026-06-08", dueDate: "2026-06-15", status: "completed" },
  { id: "h3", childId: "s1", title: "Lab Report - Refraction", subject: "Physics", teacherName: "Emily Davis", assignedDate: "2026-06-05", dueDate: "2026-06-12", status: "late" },
  { id: "h4", childId: "s1b", title: "Reading Comprehension", subject: "English", teacherName: "Sarah Johnson", assignedDate: "2026-06-11", dueDate: "2026-06-20", status: "pending" },
];

const CONVERSATIONS: ParentConversation[] = [
  {
    id: "c1", title: "Mathematics", participantName: "Teacher User", participantType: "teacher",
    lastMessage: "Ahmed is doing well in class. Keep encouraging practice at home.", lastMessageAt: "2026-06-13T14:00:00Z", unreadCount: 1,
    messages: [
      { id: "m1", conversationId: "c1", senderId: "p1", senderName: "Parent User", senderType: "parent", content: "How is Ahmed progressing in Mathematics?", sentAt: "2026-06-12T10:00:00Z", read: true },
      { id: "m2", conversationId: "c1", senderId: "t1", senderName: "Teacher User", senderType: "teacher", content: "Ahmed is doing well in class. Keep encouraging practice at home.", sentAt: "2026-06-13T14:00:00Z", read: false },
    ],
  },
  {
    id: "c2", title: "School Administration", participantName: "School Admin", participantType: "admin",
    lastMessage: "Fee payment received. Thank you!", lastMessageAt: "2026-06-10T11:00:00Z", unreadCount: 0,
    messages: [
      { id: "m3", conversationId: "c2", senderId: "p1", senderName: "Parent User", senderType: "parent", content: "I have paid Ahmed's tuition fee online.", sentAt: "2026-06-10T09:00:00Z", read: true },
      { id: "m4", conversationId: "c2", senderId: "admin", senderName: "School Admin", senderType: "admin", content: "Fee payment received. Thank you!", sentAt: "2026-06-10T11:00:00Z", read: true },
    ],
  },
];

function generateCalendar(childId: string) {
  const days: ParentAttendanceData["calendar"] = [];
  for (let d = 1; d <= 30; d++) {
    const date = `2026-06-${String(d).padStart(2, "0")}`;
    const day = new Date(date).getDay();
    if (day === 0 || day === 6) {
      days.push({ date, status: "holiday" });
    } else if (childId === "s1" && d === 11) {
      days.push({ date, status: "absent" });
    } else if (d === 5) {
      days.push({ date, status: "leave" });
    } else if (d === 14) {
      days.push({ date, status: "late" });
    } else {
      days.push({ date, status: "present" });
    }
  }
  return days;
}

export const parentDataService = {
  async getDashboard(): Promise<ParentDashboardData> {
    await delay();
    const avgAttendance = Math.round(
      LINKED_CHILDREN.reduce((s, c) => s + c.attendancePercent, 0) / LINKED_CHILDREN.length
    );
    const pendingFees = Object.values(FEES).reduce((s, f) => s + f.remainingAmount, 0);
    return {
      totalChildren: LINKED_CHILDREN.length,
      attendancePercentage: avgAttendance,
      pendingFees,
      upcomingExams: 2,
      newNotifications: notificationsStore.filter((n) => !n.read).length,
      children: LINKED_CHILDREN,
      attendanceTrend: [
        { month: "Jan", percentage: 91 },
        { month: "Feb", percentage: 93 },
        { month: "Mar", percentage: 92 },
        { month: "Apr", percentage: 94 },
        { month: "May", percentage: 95 },
        { month: "Jun", percentage: avgAttendance },
      ],
      performanceTrend: [
        { month: "Jan", average: 82 },
        { month: "Feb", average: 84 },
        { month: "Mar", average: 83 },
        { month: "Apr", average: 86 },
        { month: "May", average: 88 },
        { month: "Jun", average: 90 },
      ],
    };
  },

  async getChildren(): Promise<ParentChild[]> {
    await delay();
    return LINKED_CHILDREN;
  },

  async getChild(id: string): Promise<ParentChildDetail> {
    await delay();
    const child = assertChildAccess(id);
    const detail = CHILD_DETAILS[id];
    if (!detail) throw new Error("Child not found");
    return { ...child, ...detail };
  },

  async getAttendance(childId: string): Promise<ParentAttendanceData> {
    await delay();
    assertChildAccess(childId);
    const calendar = generateCalendar(childId);
    const presentDays = calendar.filter((d) => d.status === "present" || d.status === "late").length;
    const absentDays = calendar.filter((d) => d.status === "absent").length;
    const leaveDays = calendar.filter((d) => d.status === "leave").length;
    return {
      childId,
      presentDays,
      absentDays,
      leaveDays,
      monthlyPercentage: Math.round((presentDays / (presentDays + absentDays + leaveDays)) * 100) || 0,
      calendar,
      monthlyTrend: [
        { week: "Week 1", percentage: 95 },
        { week: "Week 2", percentage: 92 },
        { week: "Week 3", percentage: 94 },
        { week: "Week 4", percentage: 96 },
      ],
    };
  },

  async getFees(childId?: string): Promise<ParentFeeSummary[]> {
    await delay();
    if (childId) {
      assertChildAccess(childId);
      return [FEES[childId]];
    }
    return LINKED_CHILDREN.map((c) => FEES[c.id]);
  },

  async getResults(childId?: string, academicYear?: string, examName?: string): Promise<ParentExamResult[]> {
    await delay();
    let results = RESULTS.filter((r) => LINKED_CHILDREN.some((c) => c.id === r.childId));
    if (childId) {
      assertChildAccess(childId);
      results = results.filter((r) => r.childId === childId);
    }
    if (academicYear) results = results.filter((r) => r.academicYear === academicYear);
    if (examName) results = results.filter((r) => r.examName === examName);
    return results;
  },

  async getHomework(childId?: string): Promise<ParentHomework[]> {
    await delay();
    let hw = HOMEWORK.filter((h) => LINKED_CHILDREN.some((c) => c.id === h.childId));
    if (childId) {
      assertChildAccess(childId);
      hw = hw.filter((h) => h.childId === childId);
    }
    return hw;
  },

  async getNotifications(): Promise<ParentNotification[]> {
    await delay();
    return notificationsStore;
  },

  async markNotificationRead(id: string): Promise<void> {
    await delay();
    notificationsStore = notificationsStore.map((n) => (n.id === id ? { ...n, read: true } : n));
  },

  async markAllNotificationsRead(): Promise<void> {
    await delay();
    notificationsStore = notificationsStore.map((n) => ({ ...n, read: true }));
  },

  async getConversations(): Promise<ParentConversation[]> {
    await delay();
    return CONVERSATIONS;
  },

  async getConversation(id: string): Promise<ParentConversation> {
    await delay();
    const conv = CONVERSATIONS.find((c) => c.id === id);
    if (!conv) throw new Error("Conversation not found");
    return conv;
  },

  async sendMessage(conversationId: string, content: string): Promise<ParentMessage> {
    await delay();
    const conv = CONVERSATIONS.find((c) => c.id === conversationId);
    if (!conv) throw new Error("Conversation not found");
    const msg = {
      id: `m${Date.now()}`,
      conversationId,
      senderId: PARENT_ID,
      senderName: "Parent User",
      senderType: "parent" as const,
      content,
      sentAt: new Date().toISOString(),
      read: true,
    };
    conv.messages.push(msg);
    conv.lastMessage = content;
    conv.lastMessageAt = msg.sentAt;
    return msg;
  },

  async getDocuments(childId: string): Promise<ParentDocument[]> {
    await delay();
    assertChildAccess(childId);
    return CHILD_DETAILS[childId]?.documents ?? [];
  },

  async getProfile(): Promise<ParentProfile> {
    await delay();
    return { ...profileStore, children: LINKED_CHILDREN };
  },

  async updateProfile(payload: UpdateParentProfilePayload): Promise<ParentProfile> {
    await delay();
    profileStore = { ...profileStore, ...payload };
    return { ...profileStore, children: LINKED_CHILDREN };
  },
};
