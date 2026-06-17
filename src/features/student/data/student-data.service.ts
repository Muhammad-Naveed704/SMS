import type {
  StudentAssignment,
  StudentAttendanceData,
  StudentDashboardData,
  StudentDocument,
  StudentExam,
  StudentHomework,
  StudentNotification,
  StudentProfile,
  StudentResultsData,
  StudentSubject,
  StudentSubjectDetail,
  StudentTimetableSlot,
  SubmitAssignmentPayload,
  UpdateStudentProfilePayload,
} from "@/types/student-panel.types";

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

const STUDENT_ID = "s1";
const SCHOOL_NAME = "Springfield Academy";

/** Logged-in student — only own data is ever returned */
const STUDENT: StudentProfile = {
  id: STUDENT_ID,
  firstName: "Ahmed",
  lastName: "Khan",
  email: "student@sms.local",
  phone: "+1 555-3001",
  dateOfBirth: "2010-03-15",
  gender: "male",
  address: "456 Family Lane, Springfield",
  rollNumber: "1001",
  className: "Grade 10",
  section: "A",
  schoolName: SCHOOL_NAME,
  admissionDate: "2024-04-01",
  classTeacher: "Emily Davis",
};

const SUBJECTS: StudentSubject[] = [
  { id: "sub1", name: "Mathematics", teacherName: "Teacher User", teacherEmail: "teacher@sms.local", schedule: "Mon, Wed, Fri 08:00", room: "101", description: "Algebra, geometry, trigonometry, and calculus fundamentals." },
  { id: "sub2", name: "English", teacherName: "Sarah Johnson", teacherEmail: "sarah@springfield.edu", schedule: "Mon, Tue, Thu 08:50", room: "102", description: "Literature, composition, and communication skills." },
  { id: "sub3", name: "Physics", teacherName: "Emily Davis", teacherEmail: "emily@springfield.edu", schedule: "Tue, Wed 09:40", room: "Lab 1", description: "Mechanics, optics, and modern physics." },
  { id: "sub4", name: "Chemistry", teacherName: "Robert Wilson", teacherEmail: "robert@springfield.edu", schedule: "Thu, Fri 10:30", room: "Lab 2", description: "Organic and inorganic chemistry principles." },
];

let assignmentsStore: StudentAssignment[] = [
  { id: "a1", title: "Quadratic Equations Worksheet", subject: "Mathematics", teacherName: "Teacher User", description: "Complete exercises 1-20 from chapter 4.", dueDate: "2026-06-18", status: "active" },
  { id: "a2", title: "Essay: Climate Change", subject: "English", teacherName: "Sarah Johnson", description: "Write a 500-word essay on climate change impacts.", dueDate: "2026-06-15", status: "submitted", submittedAt: "2026-06-14" },
  { id: "a3", title: "Lab Report - Refraction", subject: "Physics", teacherName: "Emily Davis", description: "Submit lab report with observations and conclusions.", dueDate: "2026-06-10", status: "overdue" },
  { id: "a4", title: "Chemical Bonding Quiz Prep", subject: "Chemistry", teacherName: "Robert Wilson", description: "Review chapters 5-6 for upcoming quiz.", dueDate: "2026-06-22", status: "active" },
];

const HOMEWORK: StudentHomework[] = [
  { id: "h1", title: "Quadratic Equations Practice", subject: "Mathematics", teacherName: "Teacher User", assignedDate: "2026-06-10", dueDate: "2026-06-18", status: "pending" },
  { id: "h2", title: "Reading: Chapter 8", subject: "English", teacherName: "Sarah Johnson", assignedDate: "2026-06-08", dueDate: "2026-06-15", status: "completed" },
  { id: "h3", title: "Physics Problems Set 3", subject: "Physics", teacherName: "Emily Davis", assignedDate: "2026-06-05", dueDate: "2026-06-12", status: "late" },
  { id: "h4", title: "Periodic Table Review", subject: "Chemistry", teacherName: "Robert Wilson", assignedDate: "2026-06-11", dueDate: "2026-06-20", status: "pending" },
];

const EXAMS: StudentExam[] = [
  { id: "e1", name: "Mid-Term Examination", subject: "Mathematics", date: "2026-06-20", time: "09:00 - 11:00", room: "101", totalMarks: 100 },
  { id: "e2", name: "Mid-Term Examination", subject: "English", date: "2026-06-21", time: "09:00 - 11:00", room: "102", totalMarks: 100 },
  { id: "e3", name: "Unit Test - Geometry", subject: "Mathematics", date: "2026-06-15", time: "08:00 - 09:00", room: "101", totalMarks: 50 },
  { id: "e4", name: "Mid-Term Examination", subject: "Physics", date: "2026-06-22", time: "09:00 - 11:00", room: "Lab 1", totalMarks: 100 },
];

const TIMETABLE: StudentTimetableSlot[] = [
  { id: "tt1", day: "Monday", period: 1, startTime: "08:00", endTime: "08:45", subject: "Mathematics", teacherName: "Teacher User", room: "101" },
  { id: "tt2", day: "Monday", period: 2, startTime: "08:50", endTime: "09:35", subject: "English", teacherName: "Sarah Johnson", room: "102" },
  { id: "tt3", day: "Monday", period: 3, startTime: "09:40", endTime: "10:25", subject: "Physics", teacherName: "Emily Davis", room: "Lab 1" },
  { id: "tt4", day: "Tuesday", period: 1, startTime: "08:00", endTime: "08:45", subject: "English", teacherName: "Sarah Johnson", room: "102" },
  { id: "tt5", day: "Tuesday", period: 2, startTime: "08:50", endTime: "09:35", subject: "Mathematics", teacherName: "Teacher User", room: "101" },
  { id: "tt6", day: "Wednesday", period: 1, startTime: "08:00", endTime: "08:45", subject: "Mathematics", teacherName: "Teacher User", room: "101" },
  { id: "tt7", day: "Wednesday", period: 3, startTime: "09:40", endTime: "10:25", subject: "Physics", teacherName: "Emily Davis", room: "Lab 1" },
  { id: "tt8", day: "Thursday", period: 2, startTime: "08:50", endTime: "09:35", subject: "Chemistry", teacherName: "Robert Wilson", room: "Lab 2" },
  { id: "tt9", day: "Friday", period: 3, startTime: "09:40", endTime: "10:25", subject: "Mathematics", teacherName: "Teacher User", room: "101" },
  { id: "tt10", day: "Friday", period: 4, startTime: "10:30", endTime: "11:15", subject: "Chemistry", teacherName: "Robert Wilson", room: "Lab 2" },
];

let notificationsStore: StudentNotification[] = [
  { id: "n1", title: "Mid-Term Exam Schedule", message: "Mid-term exams begin June 20. Check your timetable for room assignments.", category: "exam", sentAt: "2026-06-14T09:00:00Z", read: false },
  { id: "n2", title: "Homework Due Tomorrow", message: "Quadratic Equations Practice is due June 18.", category: "homework", sentAt: "2026-06-13T10:00:00Z", read: false },
  { id: "n3", title: "School Sports Day", message: "Annual sports day on June 28. Register by June 20.", category: "notice", sentAt: "2026-06-12T08:00:00Z", read: true },
  { id: "n4", title: "Assignment Graded", message: "Your Climate Change essay has been graded. Score: 38/40.", category: "assignment", sentAt: "2026-06-11T14:00:00Z", read: true },
  { id: "n5", title: "Library Book Return", message: "Please return borrowed books by June 25.", category: "notice", sentAt: "2026-06-10T09:00:00Z", read: false },
];

const DOCUMENTS: StudentDocument[] = [
  { id: "d1", name: "Admission Certificate.pdf", type: "certificate", uploadedAt: "2024-04-01", size: "245 KB" },
  { id: "d2", name: "Term 1 Report Card.pdf", type: "result", uploadedAt: "2026-03-15", size: "180 KB" },
  { id: "d3", name: "Mid-Term Result Card.pdf", type: "result", uploadedAt: "2026-03-20", size: "156 KB" },
  { id: "d4", name: "School Handbook 2025-26.pdf", type: "school", uploadedAt: "2025-04-01", size: "2.1 MB" },
];

const SUBJECT_MATERIALS: Record<string, StudentSubjectDetail["studyMaterials"]> = {
  sub1: [
    { id: "m1", title: "Chapter 4 - Quadratic Equations", type: "PDF", uploadedAt: "2026-06-01" },
    { id: "m2", title: "Practice Problems Set", type: "PDF", uploadedAt: "2026-06-05" },
  ],
  sub2: [
    { id: "m3", title: "Essay Writing Guide", type: "PDF", uploadedAt: "2026-05-20" },
  ],
  sub3: [
    { id: "m4", title: "Lab Manual - Optics", type: "PDF", uploadedAt: "2026-06-01" },
  ],
  sub4: [
    { id: "m5", title: "Periodic Table Reference", type: "PDF", uploadedAt: "2026-05-15" },
  ],
};

function generateCalendar(): StudentAttendanceData["calendar"] {
  const days: StudentAttendanceData["calendar"] = [];
  for (let d = 1; d <= 30; d++) {
    const date = `2026-06-${String(d).padStart(2, "0")}`;
    const day = new Date(date).getDay();
    if (day === 0 || day === 6) days.push({ date, status: "holiday" });
    else if (d === 11) days.push({ date, status: "absent" });
    else if (d === 5) days.push({ date, status: "leave" });
    else if (d === 14) days.push({ date, status: "late" });
    else days.push({ date, status: "present" });
  }
  return days;
}


export const studentDataService = {
  async getDashboard(): Promise<StudentDashboardData> {
    await delay();
    const calendar = generateCalendar();
    const present = calendar.filter((d) => d.status === "present" || d.status === "late").length;
    const total = calendar.filter((d) => !["holiday", "none"].includes(d.status)).length;
    return {
      attendancePercentage: Math.round((present / total) * 100) || 94,
      upcomingExams: EXAMS.filter((e) => new Date(e.date) >= new Date("2026-06-15")).length,
      pendingHomework: HOMEWORK.filter((h) => h.status === "pending").length,
      completedAssignments: assignmentsStore.filter((a) => a.status === "submitted").length,
      currentGpa: 3.7,
      currentGrade: "A",
      profile: { ...STUDENT },
      attendanceTrend: [
        { month: "Jan", percentage: 91 }, { month: "Feb", percentage: 93 },
        { month: "Mar", percentage: 92 }, { month: "Apr", percentage: 94 },
        { month: "May", percentage: 95 }, { month: "Jun", percentage: 94 },
      ],
      performanceTrend: [
        { month: "Jan", average: 82 }, { month: "Feb", average: 84 },
        { month: "Mar", average: 85 }, { month: "Apr", average: 87 },
        { month: "May", average: 88 }, { month: "Jun", average: 90 },
      ],
      upcomingExamsList: EXAMS.filter((e) => new Date(e.date) >= new Date("2026-06-15")).slice(0, 3),
      recentNotifications: notificationsStore.slice(0, 4),
      latestAssignments: assignmentsStore.filter((a) => a.status === "active").slice(0, 3),
    };
  },

  async getProfile(): Promise<StudentProfile> {
    await delay();
    return { ...STUDENT };
  },

  async updateProfile(payload: UpdateStudentProfilePayload): Promise<StudentProfile> {
    await delay();
    Object.assign(STUDENT, payload);
    return { ...STUDENT };
  },

  async getSubjects(): Promise<StudentSubject[]> {
    await delay();
    return SUBJECTS;
  },

  async getSubject(id: string): Promise<StudentSubjectDetail> {
    await delay();
    const subject = SUBJECTS.find((s) => s.id === id);
    if (!subject) throw new Error("Subject not found");
    return {
      ...subject,
      assignments: assignmentsStore.filter((a) => a.subject === subject.name),
      homework: HOMEWORK.filter((h) => h.subject === subject.name),
      studyMaterials: SUBJECT_MATERIALS[id] ?? [],
    };
  },

  async getAttendance(): Promise<StudentAttendanceData> {
    await delay();
    const calendar = generateCalendar();
    const presentDays = calendar.filter((d) => d.status === "present" || d.status === "late").length;
    const absentDays = calendar.filter((d) => d.status === "absent").length;
    const leaveDays = calendar.filter((d) => d.status === "leave").length;
    return {
      presentDays, absentDays, leaveDays,
      monthlyPercentage: 94,
      calendar,
      monthlyTrend: [
        { month: "Jan", percentage: 91 }, { month: "Feb", percentage: 93 },
        { month: "Mar", percentage: 92 }, { month: "Apr", percentage: 94 },
        { month: "May", percentage: 95 }, { month: "Jun", percentage: 94 },
      ],
    };
  },

  async getTimetable(): Promise<StudentTimetableSlot[]> {
    await delay();
    return TIMETABLE;
  },

  async getHomework(): Promise<StudentHomework[]> {
    await delay();
    return HOMEWORK;
  },

  async getAssignments(): Promise<StudentAssignment[]> {
    await delay();
    return assignmentsStore;
  },

  async getAssignment(id: string): Promise<StudentAssignment> {
    await delay();
    const a = assignmentsStore.find((x) => x.id === id);
    if (!a) throw new Error("Assignment not found");
    return a;
  },

  async submitAssignment(payload: SubmitAssignmentPayload): Promise<StudentAssignment> {
    await delay();
    const idx = assignmentsStore.findIndex((a) => a.id === payload.assignmentId);
    if (idx === -1) throw new Error("Assignment not found");
    assignmentsStore[idx] = {
      ...assignmentsStore[idx],
      status: "submitted",
      submittedAt: new Date().toISOString().split("T")[0],
    };
    return assignmentsStore[idx];
  },

  async getExams(): Promise<StudentExam[]> {
    await delay();
    return EXAMS;
  },

  async getResults(): Promise<StudentResultsData> {
    await delay();
    return {
      overallGrade: "A",
      gpa: 3.7,
      rank: 5,
      totalStudents: 84,
      academicYear: "2025-2026",
      subjects: [
        { subject: "Mathematics", marks: 85, totalMarks: 100, grade: "A", remarks: "Excellent problem-solving." },
        { subject: "English", marks: 78, totalMarks: 100, grade: "B", remarks: "Good essay writing." },
        { subject: "Physics", marks: 82, totalMarks: 100, grade: "A", remarks: "Strong lab performance." },
        { subject: "Chemistry", marks: 76, totalMarks: 100, grade: "B", remarks: "Needs more practice." },
      ],
      performanceTrend: [
        { exam: "Unit Test 1", percentage: 82 },
        { exam: "Unit Test 2", percentage: 85 },
        { exam: "Mid-Term", percentage: 88 },
      ],
    };
  },

  async getNotifications(): Promise<StudentNotification[]> {
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

  async getDocuments(): Promise<StudentDocument[]> {
    await delay();
    return DOCUMENTS;
  },
};
