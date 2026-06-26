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
import { apiGet, apiPost } from "./client";

export const teacherPanelApi = {
  getDashboard: () => apiGet<TeacherDashboardData>("/teacher/dashboard"),

  getClasses: () => apiGet<TeacherClass[]>("/teacher/classes"),

  getClass: (id: string) =>
    apiGet<TeacherClass & { students: TeacherClassStudent[] }>(`/teacher/classes/${id}`),

  getAttendance: (classId: string, date: string) =>
    apiGet<TeacherAttendanceRecord[]>("/teacher/attendance", { params: { classId, date } }),

  getAssignments: () => apiGet<TeacherAssignment[]>("/teacher/assignments"),

  createAssignment: (payload: CreateAssignmentPayload) =>
    apiPost<TeacherAssignment>("/teacher/assignments", payload),

  getExams: () => apiGet<TeacherExam[]>("/teacher/exams"),

  getMarks: (examId: string, classId: string) =>
    apiGet<TeacherMarkEntry[]>("/teacher/marks", { params: { examId, classId } }),

  saveMarks: (payload: SaveMarksPayload) => apiPost<SaveMarksPayload>("/teacher/marks", payload),

  getTimetable: () => apiGet<TeacherTimetableSlot[]>("/teacher/timetable"),

  getStudents: () => apiGet<TeacherStudent[]>("/teacher/students"),

  getProfile: () => apiGet<TeacherProfile>("/teacher/profile"),

  getNotifications: () => apiGet<TeacherNotification[]>("/teacher/notifications"),
};
