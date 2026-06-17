import type {
  AttendanceRecord,
  CreateStudentPayload,
  Exam,
  FeeRecord,
  SchoolClass,
  SchoolDashboardData,
  SchoolNotification,
  SchoolSettingsData,
  SchoolStudent,
  SchoolTeacher,
  TimetableSlot,
} from "@/types/school-admin.types";

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export const MOCK_CLASSES: SchoolClass[] = [
  { id: "c1", name: "Grade 1", grade: "1", sections: ["A", "B"], studentCount: 58, classTeacherName: "Sarah Johnson", subjects: ["English", "Math", "Science"] },
  { id: "c2", name: "Grade 5", grade: "5", sections: ["A", "B", "C"], studentCount: 72, classTeacherName: "Teacher User", subjects: ["English", "Math", "Science", "History"] },
  { id: "c3", name: "Grade 8", grade: "8", sections: ["A", "B"], studentCount: 65, classTeacherName: "Michael Brown", subjects: ["English", "Math", "Physics", "Chemistry"] },
  { id: "c4", name: "Grade 10", grade: "10", sections: ["A", "B", "C"], studentCount: 84, classTeacherName: "Emily Davis", subjects: ["English", "Math", "Physics", "Biology"] },
  { id: "c5", name: "Grade 12", grade: "12", sections: ["A", "B"], studentCount: 56, classTeacherName: "Robert Wilson", subjects: ["English", "Math", "Physics", "Chemistry"] },
];

let studentsStore: SchoolStudent[] = [
  { id: "s1", firstName: "Ahmed", lastName: "Khan", rollNumber: "1001", classId: "c4", className: "Grade 10", section: "A", gender: "male", dateOfBirth: "2010-03-15", parentName: "Parent User", parentPhone: "+1 555-1001", parentEmail: "parent@sms.local", feeStatus: "paid", status: "active", admissionDate: "2024-04-01" },
  { id: "s2", firstName: "Fatima", lastName: "Ali", rollNumber: "1002", classId: "c4", className: "Grade 10", section: "A", gender: "female", dateOfBirth: "2010-07-22", parentName: "Hassan Ali", parentPhone: "+1 555-1002", feeStatus: "pending", status: "active", admissionDate: "2024-04-01" },
  { id: "s3", firstName: "Omar", lastName: "Hassan", rollNumber: "1003", classId: "c4", className: "Grade 10", section: "B", gender: "male", dateOfBirth: "2010-01-08", parentName: "Aisha Hassan", parentPhone: "+1 555-1003", feeStatus: "overdue", status: "active", admissionDate: "2023-04-01" },
  { id: "s4", firstName: "Ayesha", lastName: "Malik", rollNumber: "2001", classId: "c2", className: "Grade 5", section: "A", gender: "female", dateOfBirth: "2015-11-30", parentName: "Tariq Malik", parentPhone: "+1 555-2001", feeStatus: "paid", status: "active", admissionDate: "2025-04-01" },
  { id: "s5", firstName: "Bilal", lastName: "Ahmed", rollNumber: "3001", classId: "c3", className: "Grade 8", section: "B", gender: "male", dateOfBirth: "2012-05-18", parentName: "Sana Ahmed", parentPhone: "+1 555-3001", feeStatus: "partial", status: "active", admissionDate: "2024-04-01" },
  { id: "s6", firstName: "Zainab", lastName: "Iqbal", rollNumber: "4001", classId: "c5", className: "Grade 12", section: "A", gender: "female", dateOfBirth: "2008-09-12", parentName: "Kamran Iqbal", parentPhone: "+1 555-4001", feeStatus: "paid", status: "active", admissionDate: "2022-04-01" },
  { id: "s7", firstName: "Usman", lastName: "Raza", rollNumber: "1004", classId: "c4", className: "Grade 10", section: "A", gender: "male", dateOfBirth: "2010-12-05", parentName: "Nadia Raza", parentPhone: "+1 555-1004", feeStatus: "paid", status: "active", admissionDate: "2024-08-15" },
  { id: "s8", firstName: "Hira", lastName: "Shah", rollNumber: "1005", classId: "c4", className: "Grade 10", section: "B", gender: "female", dateOfBirth: "2010-04-20", parentName: "Imran Shah", parentPhone: "+1 555-1005", feeStatus: "pending", status: "active", admissionDate: "2025-01-10" },
];

let teachersStore: SchoolTeacher[] = [
  { id: "t1", firstName: "Teacher", lastName: "User", email: "teacher@sms.local", phone: "+1 555-2001", subject: "Mathematics", classes: ["Grade 10-A", "Grade 10-B"], status: "active", joinDate: "2023-08-01" },
  { id: "t2", firstName: "Sarah", lastName: "Johnson", email: "sarah@springfield.edu", phone: "+1 555-2002", subject: "English", classes: ["Grade 1-A", "Grade 1-B"], status: "active", joinDate: "2022-01-15" },
  { id: "t3", firstName: "Michael", lastName: "Brown", email: "michael@springfield.edu", phone: "+1 555-2003", subject: "Science", classes: ["Grade 8-A", "Grade 8-B"], status: "active", joinDate: "2021-06-01" },
  { id: "t4", firstName: "Emily", lastName: "Davis", email: "emily@springfield.edu", phone: "+1 555-2004", subject: "Physics", classes: ["Grade 10-A", "Grade 12-A"], status: "active", joinDate: "2020-09-01" },
  { id: "t5", firstName: "Robert", lastName: "Wilson", email: "robert@springfield.edu", phone: "+1 555-2005", subject: "Chemistry", classes: ["Grade 12-A", "Grade 12-B"], status: "on_leave", joinDate: "2019-03-01" },
];

const MOCK_FEES: FeeRecord[] = studentsStore.map((s, i) => ({
  id: `f${i + 1}`,
  studentId: s.id,
  studentName: `${s.firstName} ${s.lastName}`,
  className: `${s.className} - ${s.section}`,
  feeType: i % 2 === 0 ? "Tuition" : "Transport",
  amount: 500,
  paid: s.feeStatus === "paid" ? 500 : s.feeStatus === "partial" ? 250 : 0,
  dueDate: "2026-06-30",
  status: s.feeStatus,
}));

const MOCK_EXAMS: Exam[] = [
  { id: "e1", name: "Mid-Term Examination", date: "2026-06-20", classes: ["Grade 10", "Grade 12"], subjects: ["Math", "English", "Science"], status: "upcoming", totalMarks: 100 },
  { id: "e2", name: "Unit Test - Mathematics", date: "2026-06-10", classes: ["Grade 8", "Grade 10"], subjects: ["Mathematics"], status: "upcoming", totalMarks: 50 },
  { id: "e3", name: "Annual Examination", date: "2026-03-15", classes: ["All Grades"], subjects: ["All Subjects"], status: "completed", totalMarks: 100 },
];

const MOCK_TIMETABLE: TimetableSlot[] = [
  { id: "tt1", day: "Monday", period: 1, startTime: "08:00", endTime: "08:45", className: "Grade 10", section: "A", subject: "Mathematics", teacherName: "Teacher User", room: "101" },
  { id: "tt2", day: "Monday", period: 2, startTime: "08:50", endTime: "09:35", className: "Grade 10", section: "A", subject: "English", teacherName: "Sarah Johnson", room: "102" },
  { id: "tt3", day: "Monday", period: 3, startTime: "09:40", endTime: "10:25", className: "Grade 10", section: "A", subject: "Physics", teacherName: "Emily Davis", room: "Lab 1" },
  { id: "tt4", day: "Tuesday", period: 1, startTime: "08:00", endTime: "08:45", className: "Grade 10", section: "A", subject: "Chemistry", teacherName: "Robert Wilson", room: "Lab 2" },
  { id: "tt5", day: "Wednesday", period: 1, startTime: "08:00", endTime: "08:45", className: "Grade 10", section: "B", subject: "Mathematics", teacherName: "Teacher User", room: "101" },
];

const MOCK_NOTIFICATIONS: SchoolNotification[] = [
  { id: "n1", title: "Parent-Teacher Meeting", message: "PTM scheduled for June 25th at 10 AM.", audience: "parents", channels: ["in_app", "email"], sentAt: "2026-06-14T10:00:00Z", status: "sent" },
  { id: "n2", title: "Exam Schedule Released", message: "Mid-term exam timetable is now available.", audience: "all", channels: ["in_app"], sentAt: "2026-06-13T09:00:00Z", status: "sent" },
  { id: "n3", title: "Fee Reminder", message: "Please clear pending fees before June 30.", audience: "parents", channels: ["in_app", "sms", "email"], sentAt: "2026-06-12T08:00:00Z", status: "sent" },
];

let settingsStore: SchoolSettingsData = {
  schoolName: "Springfield Academy",
  email: "info@springfield.edu",
  phone: "+1 555-0101",
  address: "123 Education Blvd",
  city: "Springfield",
  country: "USA",
  academicYear: "2025-2026",
  timezone: "America/New_York",
};

export const schoolDataService = {
  async getDashboard(): Promise<SchoolDashboardData> {
    await delay();
    const present = Math.round(studentsStore.length * 0.915);
    return {
      totalStudents: studentsStore.length,
      totalTeachers: teachersStore.filter((t) => t.status === "active").length,
      totalClasses: MOCK_CLASSES.length,
      todayAttendance: present,
      pendingFees: MOCK_FEES.filter((f) => f.status === "pending" || f.status === "overdue").reduce((s, f) => s + (f.amount - f.paid), 0),
      upcomingExams: MOCK_EXAMS.filter((e) => e.status === "upcoming").length,
      collectedFees: MOCK_FEES.reduce((s, f) => s + f.paid, 0),
      attendanceRate: 91.5,
      recentEnrollments: studentsStore.slice(-3).reverse(),
      todayAttendanceList: studentsStore.slice(0, 6).map((s) => ({
        studentId: s.id,
        studentName: `${s.firstName} ${s.lastName}`,
        rollNumber: s.rollNumber,
        status: Math.random() > 0.1 ? "present" : "absent" as const,
      })),
      upcomingEvents: [
        { id: "ev1", title: "Mid-Term Exams", date: "2026-06-20", type: "exam" },
        { id: "ev2", title: "Parent-Teacher Meeting", date: "2026-06-25", type: "meeting" },
        { id: "ev3", title: "Summer Break", date: "2026-07-01", type: "holiday" },
      ],
      attendanceOverview: [
        { date: "Mon", present: 420, absent: 28, late: 12 },
        { date: "Tue", present: 435, absent: 18, late: 9 },
        { date: "Wed", present: 428, absent: 22, late: 14 },
        { date: "Thu", present: 441, absent: 15, late: 8 },
        { date: "Fri", present: 430, absent: 20, late: 11 },
      ],
      feeCollection: [
        { month: "Jan", collected: 42000, pending: 8000 },
        { month: "Feb", collected: 45000, pending: 7500 },
        { month: "Mar", collected: 48000, pending: 6000 },
        { month: "Apr", collected: 51000, pending: 5500 },
        { month: "May", collected: 53000, pending: 4800 },
        { month: "Jun", collected: 55000, pending: 4200 },
      ],
      studentGrowth: [
        { month: "Jan", students: 780 }, { month: "Feb", students: 795 },
        { month: "Mar", students: 810 }, { month: "Apr", students: 825 },
        { month: "May", students: 835 }, { month: "Jun", students: studentsStore.length },
      ],
    };
  },

  async getStudents() { await delay(); return [...studentsStore]; },
  async getStudent(id: string) {
    await delay();
    const s = studentsStore.find((x) => x.id === id);
    if (!s) throw new Error("Student not found");
    return s;
  },
  async createStudent(payload: CreateStudentPayload) {
    await delay(400);
    const cls = MOCK_CLASSES.find((c) => c.id === payload.classId);
    const student: SchoolStudent = {
      id: `s${Date.now()}`,
      firstName: payload.firstName,
      lastName: payload.lastName,
      rollNumber: payload.rollNumber,
      classId: payload.classId,
      className: cls?.name ?? "Unknown",
      section: payload.section,
      gender: payload.gender,
      dateOfBirth: payload.dateOfBirth,
      parentName: payload.parentName,
      parentPhone: payload.parentPhone,
      parentEmail: payload.parentEmail,
      feeStatus: "pending",
      status: "active",
      admissionDate: payload.admissionDate,
    };
    studentsStore = [student, ...studentsStore];
    return student;
  },
  async updateStudentStatus(id: string, status: SchoolStudent["status"]) {
    await delay();
    studentsStore = studentsStore.map((s) => (s.id === id ? { ...s, status } : s));
    return studentsStore.find((s) => s.id === id)!;
  },

  async getTeachers() { await delay(); return [...teachersStore]; },
  async updateTeacherStatus(id: string, status: SchoolTeacher["status"]) {
    await delay();
    teachersStore = teachersStore.map((t) => (t.id === id ? { ...t, status } : t));
    return teachersStore.find((t) => t.id === id)!;
  },

  async getClasses() { await delay(); return [...MOCK_CLASSES]; },
  async getClass(id: string) {
    await delay();
    const c = MOCK_CLASSES.find((x) => x.id === id);
    if (!c) throw new Error("Class not found");
    return { ...c, students: studentsStore.filter((s) => s.classId === id) };
  },

  async getAttendance(classId: string, _date: string): Promise<AttendanceRecord[]> {
    await delay();
    return studentsStore
      .filter((s) => s.classId === classId)
      .map((s) => ({
        studentId: s.id,
        studentName: `${s.firstName} ${s.lastName}`,
        rollNumber: s.rollNumber,
        status: "present" as const,
      }));
  },

  async getFees() { await delay(); return [...MOCK_FEES]; },
  async getExams() { await delay(); return [...MOCK_EXAMS]; },
  async getTimetable() { await delay(); return [...MOCK_TIMETABLE]; },
  async getNotifications() { await delay(); return [...MOCK_NOTIFICATIONS]; },

  async getSettings() { await delay(); return { ...settingsStore }; },
  async updateSettings(data: Partial<SchoolSettingsData>) {
    await delay();
    settingsStore = { ...settingsStore, ...data };
    return settingsStore;
  },
};
