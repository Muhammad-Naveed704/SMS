import type { PaginationParams } from "@/lib/validators";
import type {
  AttendanceOverview,
  FeeCollectionSummary,
  PaginatedResponse,
  SchoolDashboardStats,
} from "@/types/school.types";
import type {
  AttendanceRecord,
  Exam,
  FeeRecord,
  SchoolClass,
  SchoolNotification,
  SchoolSettingsData,
  SchoolTeacher,
  TimetableSlot,
} from "@/types/school-admin.types";
import type { StudentListItem } from "@/types/student.types";
import { apiGet, apiPatch } from "./client";

export const schoolApi = {
  getDashboardStats: () => apiGet<SchoolDashboardStats>("/school/dashboard"),

  getAttendanceOverview: () => apiGet<AttendanceOverview[]>("/school/attendance/overview"),

  getFeeCollectionSummary: () => apiGet<FeeCollectionSummary[]>("/school/fees/summary"),

  getStudents: (params?: PaginationParams) =>
    apiGet<PaginatedResponse<StudentListItem>>("/school/students", { params }),

  getStudent: (id: string) => apiGet<StudentListItem>(`/school/students/${id}`),

  getTeachers: (params?: PaginationParams) =>
    apiGet<PaginatedResponse<SchoolTeacher>>("/school/teachers", { params }),

  getClasses: () => apiGet<SchoolClass[]>("/school/classes"),

  getClass: (id: string) =>
    apiGet<SchoolClass & { students?: Array<{ id: string; firstName: string; lastName: string; rollNumber: string; section: string }> }>(
      `/school/classes/${id}`
    ),

  getAttendance: (classId: string, date: string) =>
    apiGet<AttendanceRecord[]>("/school/attendance", { params: { classId, date } }),

  getFees: () => apiGet<FeeRecord[]>("/school/fees"),

  getExams: () => apiGet<Exam[]>("/school/exams"),

  getTimetable: () => apiGet<TimetableSlot[]>("/school/timetable"),

  getNotifications: () => apiGet<SchoolNotification[]>("/school/notifications"),

  getSettings: () => apiGet<SchoolSettingsData>("/school/settings"),

  updateSettings: (payload: Partial<SchoolSettingsData>) =>
    apiPatch<SchoolSettingsData>("/school/settings", payload),
};
