import { schoolApi } from "@/services/api/school.api";
import { studentApi } from "@/services/api/student.api";
import { schoolDataService } from "@/features/school/data/school-data.service";
import { USE_MOCK_DATA } from "@/lib/env";
import type {
  CreateStudentPayload,
  SchoolSettingsData,
  SchoolStudent,
  SchoolTeacher,
} from "@/types/school-admin.types";

async function withMockFallback<T>(apiFn: () => Promise<T>, mockFn: () => T | Promise<T>): Promise<T> {
  try {
    return await apiFn();
  } catch {
    if (USE_MOCK_DATA) return mockFn();
    throw new Error("API request failed");
  }
}

function mapStudentListItem(item: {
  id: string;
  studentId?: string;
  firstName: string;
  lastName: string;
  className?: string;
  section?: string;
  status?: string;
  enrollmentDate?: string;
}): SchoolStudent {
  return {
    id: item.id,
    firstName: item.firstName,
    lastName: item.lastName,
    rollNumber: item.studentId ?? item.id,
    classId: "c1",
    className: item.className ?? "—",
    section: item.section ?? "A",
    gender: "male",
    dateOfBirth: "2010-01-01",
    parentName: "—",
    parentPhone: "—",
    feeStatus: "pending",
    status: (item.status as SchoolStudent["status"]) ?? "active",
    admissionDate: item.enrollmentDate ?? new Date().toISOString().split("T")[0],
  };
}

export const schoolQueries = {
  dashboard: () =>
    withMockFallback(
      async () => {
        const [stats, attendance, fees] = await Promise.all([
          schoolApi.getDashboardStats(),
          schoolApi.getAttendanceOverview(),
          schoolApi.getFeeCollectionSummary(),
        ]);
        const full = await schoolDataService.getDashboard();
        return {
          ...full,
          totalStudents: stats.totalStudents,
          totalTeachers: stats.totalTeachers,
          totalClasses: stats.totalClasses,
          pendingFees: stats.pendingFees,
          collectedFees: stats.collectedFees,
          attendanceRate: stats.attendanceRate,
          recentEnrollments: full.recentEnrollments,
          attendanceOverview: attendance.map((a) => ({
            date: a.date,
            present: a.present,
            absent: a.absent,
            late: a.late,
          })),
          feeCollection: fees.map((f) => ({
            month: f.month,
            collected: f.collected,
            pending: f.pending,
          })),
        };
      },
      () => schoolDataService.getDashboard()
    ),

  students: () =>
    withMockFallback(
      async () => {
        const result = await schoolApi.getStudents({ page: 1, limit: 200 });
        return result.data.map(mapStudentListItem);
      },
      () => schoolDataService.getStudents()
    ),

  student: (id: string) =>
    withMockFallback(
      async () => {
        const item = await schoolApi.getStudent(id);
        return mapStudentListItem(item);
      },
      () => schoolDataService.getStudent(id)
    ),

  teachers: () =>
    withMockFallback(
      async () => {
        const result = await schoolApi.getTeachers({ page: 1, limit: 200 });
        return result.data;
      },
      () => schoolDataService.getTeachers()
    ),

  classes: () =>
    withMockFallback(() => schoolApi.getClasses(), () => schoolDataService.getClasses()),

  class: (id: string) =>
    withMockFallback(() => schoolApi.getClass(id), () => schoolDataService.getClass(id)),

  attendance: (classId: string, date: string) =>
    withMockFallback(
      () => schoolApi.getAttendance(classId, date),
      () => schoolDataService.getAttendance(classId, date)
    ),

  fees: () => withMockFallback(() => schoolApi.getFees(), () => schoolDataService.getFees()),

  exams: () => withMockFallback(() => schoolApi.getExams(), () => schoolDataService.getExams()),

  timetable: () =>
    withMockFallback(() => schoolApi.getTimetable(), () => schoolDataService.getTimetable()),

  notifications: () =>
    withMockFallback(() => schoolApi.getNotifications(), () => schoolDataService.getNotifications()),

  settings: () =>
    withMockFallback(() => schoolApi.getSettings(), () => schoolDataService.getSettings()),

  createStudent: (p: CreateStudentPayload) =>
    withMockFallback(
      () =>
        studentApi.create({
          firstName: p.firstName,
          lastName: p.lastName,
          className: p.classId,
          section: p.section,
          enrollmentDate: p.admissionDate,
        }).then(mapStudentListItem),
      () => schoolDataService.createStudent(p)
    ),

  updateStudentStatus: (id: string, status: SchoolStudent["status"]) =>
    withMockFallback(
      () => studentApi.update(id, { status }).then(() => undefined),
      () => schoolDataService.updateStudentStatus(id, status)
    ),

  updateTeacherStatus: (id: string, status: SchoolTeacher["status"]) =>
    schoolDataService.updateTeacherStatus(id, status),

  updateSettings: (d: Partial<SchoolSettingsData>) =>
    withMockFallback(
      () => schoolApi.updateSettings(d),
      () => schoolDataService.updateSettings(d)
    ),
};
