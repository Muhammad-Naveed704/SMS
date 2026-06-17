import type {
  CreateAssignmentPayload,
  SaveMarksPayload,
  TeacherAssignment,
  TeacherAttendanceRecord,
  TeacherClass,
  TeacherClassStudent,
  TeacherDashboardData,
  TeacherExam,
  TeacherMarkEntry,
  TeacherNotification,
  TeacherProfile,
  TeacherStudent,
  TeacherTimetableSlot,
} from "@/types/teacher-panel.types";

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

const TEACHER_ID = "t1";

const ASSIGNED_CLASSES: TeacherClass[] = [
  {
    id: "tc1",
    classId: "c4",
    name: "Grade 10",
    section: "A",
    subject: "Mathematics",
    studentCount: 4,
    schedule: "Mon, Wed, Fri — 08:00",
    room: "101",
  },
  {
    id: "tc2",
    classId: "c4",
    name: "Grade 10",
    section: "B",
    subject: "Mathematics",
    studentCount: 2,
    schedule: "Tue, Thu — 08:00",
    room: "101",
  },
];

const CLASS_STUDENTS: Record<string, TeacherClassStudent[]> = {
  tc1: [
    { id: "s1", firstName: "Ahmed", lastName: "Khan", rollNumber: "1001", section: "A", attendancePercent: 94, performanceScore: 88, parentName: "Parent User", parentPhone: "+1 555-1001" },
    { id: "s2", firstName: "Fatima", lastName: "Ali", rollNumber: "1002", section: "A", attendancePercent: 91, performanceScore: 92, parentName: "Hassan Ali", parentPhone: "+1 555-1002" },
    { id: "s7", firstName: "Usman", lastName: "Raza", rollNumber: "1004", section: "A", attendancePercent: 89, performanceScore: 76, parentName: "Nadia Raza", parentPhone: "+1 555-1004" },
    { id: "s2b", firstName: "Sara", lastName: "Noor", rollNumber: "1006", section: "A", attendancePercent: 96, performanceScore: 95, parentName: "Ali Noor", parentPhone: "+1 555-1006" },
  ],
  tc2: [
    { id: "s3", firstName: "Omar", lastName: "Hassan", rollNumber: "1003", section: "B", attendancePercent: 85, performanceScore: 72, parentName: "Aisha Hassan", parentPhone: "+1 555-1003" },
    { id: "s8", firstName: "Hira", lastName: "Shah", rollNumber: "1005", section: "B", attendancePercent: 93, performanceScore: 84, parentName: "Imran Shah", parentPhone: "+1 555-1005" },
  ],
};

let assignmentsStore: TeacherAssignment[] = [
  { id: "a1", title: "Quadratic Equations Worksheet", description: "Complete exercises 1-20 from chapter 4.", classId: "c4", className: "Grade 10", section: "A", subject: "Mathematics", dueDate: "2026-06-18", status: "active", submittedCount: 3, totalStudents: 4, createdAt: "2026-06-10" },
  { id: "a2", title: "Trigonometry Practice", description: "Solve all problems on sine and cosine ratios.", classId: "c4", className: "Grade 10", section: "B", subject: "Mathematics", dueDate: "2026-06-20", status: "active", submittedCount: 1, totalStudents: 2, createdAt: "2026-06-12" },
  { id: "a3", title: "Algebra Revision", description: "Review chapters 1-3 for upcoming test.", classId: "c4", className: "Grade 10", section: "A", subject: "Mathematics", dueDate: "2026-06-05", status: "closed", submittedCount: 4, totalStudents: 4, createdAt: "2026-05-28" },
];

const EXAMS: TeacherExam[] = [
  { id: "e1", name: "Mid-Term Examination", classId: "c4", className: "Grade 10", section: "A", subject: "Mathematics", date: "2026-06-20", totalMarks: 100, status: "upcoming" },
  { id: "e2", name: "Unit Test - Algebra", classId: "c4", className: "Grade 10", section: "B", subject: "Mathematics", date: "2026-06-10", totalMarks: 50, status: "completed" },
  { id: "e3", name: "Unit Test - Geometry", classId: "c4", className: "Grade 10", section: "A", subject: "Mathematics", date: "2026-06-15", totalMarks: 50, status: "upcoming" },
];

const TIMETABLE: TeacherTimetableSlot[] = [
  { id: "tt1", day: "Monday", period: 1, startTime: "08:00", endTime: "08:45", subject: "Mathematics", className: "Grade 10", section: "A", room: "101" },
  { id: "tt2", day: "Monday", period: 4, startTime: "10:30", endTime: "11:15", subject: "Mathematics", className: "Grade 10", section: "A", room: "101" },
  { id: "tt3", day: "Tuesday", period: 1, startTime: "08:00", endTime: "08:45", subject: "Mathematics", className: "Grade 10", section: "B", room: "101" },
  { id: "tt4", day: "Wednesday", period: 2, startTime: "08:50", endTime: "09:35", subject: "Mathematics", className: "Grade 10", section: "A", room: "101" },
  { id: "tt5", day: "Thursday", period: 1, startTime: "08:00", endTime: "08:45", subject: "Mathematics", className: "Grade 10", section: "B", room: "101" },
  { id: "tt6", day: "Friday", period: 3, startTime: "09:40", endTime: "10:25", subject: "Mathematics", className: "Grade 10", section: "A", room: "101" },
];

const NOTIFICATIONS: TeacherNotification[] = [
  { id: "n1", title: "Mid-Term Exam Schedule", message: "Mid-term exams begin June 20. Ensure all marks are entered by June 19.", type: "exam", sentAt: "2026-06-14T09:00:00Z", read: false },
  { id: "n2", title: "Staff Meeting", message: "All teachers are required to attend the staff meeting on June 18 at 3 PM.", type: "announcement", sentAt: "2026-06-13T10:00:00Z", read: false },
  { id: "n3", title: "Assignment Submissions Due", message: "3 students have not submitted the Quadratic Equations worksheet.", type: "assignment", sentAt: "2026-06-12T14:00:00Z", read: true },
  { id: "n4", title: "PTM Reminder", message: "Parent-Teacher Meeting scheduled for June 25.", type: "announcement", sentAt: "2026-06-11T08:00:00Z", read: true },
];

const PROFILE: TeacherProfile = {
  id: TEACHER_ID,
  firstName: "Teacher",
  lastName: "User",
  email: "teacher@sms.local",
  phone: "+1 555-2001",
  subjects: ["Mathematics"],
  classes: ["Grade 10-A", "Grade 10-B"],
  joinDate: "2023-08-01",
  employeeId: "EMP-001",
  qualification: "M.Sc. Mathematics",
  documents: [
    { id: "d1", name: "Teaching Certificate.pdf", uploadedAt: "2023-08-01" },
    { id: "d2", name: "Degree Certificate.pdf", uploadedAt: "2023-08-01" },
  ],
};

let marksStore: Record<string, TeacherMarkEntry[]> = {
  "e2-c4": [
    { studentId: "s3", studentName: "Omar Hassan", rollNumber: "1003", marks: 38, grade: "B", totalMarks: 50 },
    { studentId: "s8", studentName: "Hira Shah", rollNumber: "1005", marks: 44, grade: "A", totalMarks: 50 },
  ],
};

function calcGrade(marks: number, total: number): string {
  const pct = (marks / total) * 100;
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B";
  if (pct >= 60) return "C";
  if (pct >= 50) return "D";
  return "F";
}

function getAllStudents(): TeacherStudent[] {
  return Object.values(CLASS_STUDENTS).flat().map((s) => {
    const cls = ASSIGNED_CLASSES.find((c) => CLASS_STUDENTS[c.id]?.some((st) => st.id === s.id));
    return {
      id: s.id,
      firstName: s.firstName,
      lastName: s.lastName,
      className: cls?.name ?? "Grade 10",
      section: s.section,
      parentName: s.parentName,
      parentPhone: s.parentPhone,
      attendancePercent: s.attendancePercent,
      performanceScore: s.performanceScore,
    };
  });
}

export const teacherDataService = {
  async getDashboard(): Promise<TeacherDashboardData> {
    await delay();
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const todaySlots = TIMETABLE.filter((s) => s.day === today).map((s) => ({
      id: s.id,
      time: `${s.startTime} - ${s.endTime}`,
      className: s.className,
      section: s.section,
      subject: s.subject,
      room: s.room,
    }));
    return {
      assignedClasses: ASSIGNED_CLASSES.length,
      totalStudents: getAllStudents().length,
      todaysClasses: todaySlots.length,
      pendingAttendance: 1,
      upcomingExams: EXAMS.filter((e) => e.status === "upcoming").length,
      pendingAssignments: assignmentsStore.filter((a) => a.status === "active" && a.submittedCount < a.totalStudents).length,
      todaySchedule: todaySlots.length ? todaySlots : [
        { id: "demo", time: "08:00 - 08:45", className: "Grade 10", section: "A", subject: "Mathematics", room: "101" },
      ],
      attendanceOverview: [
        { date: "Mon", present: 5, absent: 1, late: 0 },
        { date: "Tue", present: 6, absent: 0, late: 0 },
        { date: "Wed", present: 5, absent: 0, late: 1 },
        { date: "Thu", present: 6, absent: 0, late: 0 },
        { date: "Fri", present: 5, absent: 1, late: 0 },
      ],
      performanceOverview: [
        { month: "Jan", average: 78 },
        { month: "Feb", average: 81 },
        { month: "Mar", average: 79 },
        { month: "Apr", average: 84 },
        { month: "May", average: 86 },
        { month: "Jun", average: 88 },
      ],
      notifications: NOTIFICATIONS,
    };
  },

  async getClasses(): Promise<TeacherClass[]> {
    await delay();
    return ASSIGNED_CLASSES;
  },

  async getClass(id: string): Promise<TeacherClass & { students: TeacherClassStudent[] }> {
    await delay();
    const cls = ASSIGNED_CLASSES.find((c) => c.id === id);
    if (!cls) throw new Error("Class not found");
    return { ...cls, students: CLASS_STUDENTS[id] ?? [] };
  },

  async getAttendance(classId: string, _date: string): Promise<TeacherAttendanceRecord[]> {
    await delay();
    const tc = ASSIGNED_CLASSES.find((c) => c.classId === classId);
    const students = tc ? CLASS_STUDENTS[tc.id] ?? [] : [];
    return students.map((s) => ({
      studentId: s.id,
      studentName: `${s.firstName} ${s.lastName}`,
      rollNumber: s.rollNumber,
      status: "present" as const,
    }));
  },

  async getAssignments(): Promise<TeacherAssignment[]> {
    await delay();
    return assignmentsStore;
  },

  async createAssignment(payload: CreateAssignmentPayload): Promise<TeacherAssignment> {
    await delay();
    const cls = ASSIGNED_CLASSES.find((c) => c.classId === payload.classId && c.section === payload.section);
    const assignment: TeacherAssignment = {
      id: `a${Date.now()}`,
      title: payload.title,
      description: payload.description,
      classId: payload.classId,
      className: cls?.name ?? "Grade 10",
      section: payload.section,
      subject: payload.subject,
      dueDate: payload.dueDate,
      status: "active",
      submittedCount: 0,
      totalStudents: cls?.studentCount ?? 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    assignmentsStore = [assignment, ...assignmentsStore];
    return assignment;
  },

  async getExams(): Promise<TeacherExam[]> {
    await delay();
    return EXAMS;
  },

  async getMarks(examId: string, classId: string): Promise<TeacherMarkEntry[]> {
    await delay();
    const key = `${examId}-${classId}`;
    if (marksStore[key]) return marksStore[key];
    const tc = ASSIGNED_CLASSES.find((c) => c.classId === classId);
    const exam = EXAMS.find((e) => e.id === examId);
    const students = tc ? CLASS_STUDENTS[tc.id] ?? [] : [];
    return students.map((s) => ({
      studentId: s.id,
      studentName: `${s.firstName} ${s.lastName}`,
      rollNumber: s.rollNumber,
      marks: null,
      grade: "-",
      totalMarks: exam?.totalMarks ?? 100,
    }));
  },

  async saveMarks(payload: SaveMarksPayload): Promise<void> {
    await delay();
    const exam = EXAMS.find((e) => e.id === payload.examId);
    const total = exam?.totalMarks ?? 100;
    const key = `${payload.examId}-${payload.classId}`;
    marksStore[key] = payload.entries.map((e) => {
      const existing = Object.values(CLASS_STUDENTS).flat().find((s) => s.id === e.studentId);
      return {
        studentId: e.studentId,
        studentName: existing ? `${existing.firstName} ${existing.lastName}` : "",
        rollNumber: existing?.rollNumber ?? "",
        marks: e.marks,
        grade: calcGrade(e.marks, total),
        totalMarks: total,
      };
    });
  },

  async getTimetable(): Promise<TeacherTimetableSlot[]> {
    await delay();
    return TIMETABLE;
  },

  async getStudents(): Promise<TeacherStudent[]> {
    await delay();
    return getAllStudents();
  },

  async getProfile(): Promise<TeacherProfile> {
    await delay();
    return PROFILE;
  },

  async getNotifications(): Promise<TeacherNotification[]> {
    await delay();
    return NOTIFICATIONS;
  },
};
