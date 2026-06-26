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
import { apiGet, apiPatch, apiPost } from "./client";

export const studentPanelApi = {
  getDashboard: () => apiGet<StudentDashboardData>("/student/dashboard"),

  getProfile: () => apiGet<StudentProfile>("/student/profile"),

  updateProfile: (payload: UpdateStudentProfilePayload) =>
    apiPatch<StudentProfile>("/student/profile", payload),

  getSubjects: () => apiGet<StudentSubject[]>("/student/subjects"),

  getSubject: (id: string) => apiGet<StudentSubjectDetail>(`/student/subjects/${id}`),

  getAttendance: () => apiGet<StudentAttendanceData>("/student/attendance"),

  getTimetable: () => apiGet<StudentTimetableSlot[]>("/student/timetable"),

  getHomework: () => apiGet<StudentHomework[]>("/student/homework"),

  getAssignments: () => apiGet<StudentAssignment[]>("/student/assignments"),

  getAssignment: (id: string) => apiGet<StudentAssignment>(`/student/assignments/${id}`),

  submitAssignment: (payload: SubmitAssignmentPayload) =>
    apiPost<StudentAssignment>("/student/assignments/submit", payload),

  getExams: () => apiGet<StudentExam[]>("/student/exams"),

  getResults: () => apiGet<StudentResultsData>("/student/results"),

  getNotifications: () => apiGet<StudentNotification[]>("/student/notifications"),

  markNotificationRead: (id: string) =>
    apiPatch<{ id: string; read: boolean }>(`/student/notifications/${id}/read`),

  markAllNotificationsRead: () =>
    apiPatch<{ success: boolean }>("/student/notifications/read-all"),

  getDocuments: () => apiGet<StudentDocument[]>("/student/documents"),
};
