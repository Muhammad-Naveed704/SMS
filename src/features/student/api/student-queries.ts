import { studentPanelApi } from "@/services/api/student-panel.api";
import { studentDataService } from "@/features/student/data/student-data.service";
import { USE_MOCK_DATA } from "@/lib/env";
import type { SubmitAssignmentPayload, UpdateStudentProfilePayload } from "@/types/student-panel.types";

async function withMockFallback<T>(apiFn: () => Promise<T>, mockFn: () => T | Promise<T>): Promise<T> {
  try {
    return await apiFn();
  } catch {
    if (USE_MOCK_DATA) return mockFn();
    throw new Error("API request failed");
  }
}

export const studentQueries = {
  dashboard: () =>
    withMockFallback(() => studentPanelApi.getDashboard(), () => studentDataService.getDashboard()),

  profile: () =>
    withMockFallback(() => studentPanelApi.getProfile(), () => studentDataService.getProfile()),

  updateProfile: (p: UpdateStudentProfilePayload) =>
    withMockFallback(
      () => studentPanelApi.updateProfile(p),
      () => studentDataService.updateProfile(p)
    ),

  subjects: () =>
    withMockFallback(() => studentPanelApi.getSubjects(), () => studentDataService.getSubjects()),

  subject: (id: string) =>
    withMockFallback(() => studentPanelApi.getSubject(id), () => studentDataService.getSubject(id)),

  attendance: () =>
    withMockFallback(() => studentPanelApi.getAttendance(), () => studentDataService.getAttendance()),

  timetable: () =>
    withMockFallback(() => studentPanelApi.getTimetable(), () => studentDataService.getTimetable()),

  homework: () =>
    withMockFallback(() => studentPanelApi.getHomework(), () => studentDataService.getHomework()),

  assignments: () =>
    withMockFallback(() => studentPanelApi.getAssignments(), () => studentDataService.getAssignments()),

  assignment: (id: string) =>
    withMockFallback(() => studentPanelApi.getAssignment(id), () => studentDataService.getAssignment(id)),

  submitAssignment: (p: SubmitAssignmentPayload) =>
    withMockFallback(
      () => studentPanelApi.submitAssignment(p),
      () => studentDataService.submitAssignment(p)
    ),

  exams: () =>
    withMockFallback(() => studentPanelApi.getExams(), () => studentDataService.getExams()),

  results: () =>
    withMockFallback(() => studentPanelApi.getResults(), () => studentDataService.getResults()),

  notifications: () =>
    withMockFallback(
      () => studentPanelApi.getNotifications(),
      () => studentDataService.getNotifications()
    ),

  markNotificationRead: (id: string) =>
    withMockFallback(
      () => studentPanelApi.markNotificationRead(id),
      async () => {
        await studentDataService.markNotificationRead(id);
        return { id, read: true };
      }
    ),

  markAllNotificationsRead: () =>
    withMockFallback(
      () => studentPanelApi.markAllNotificationsRead(),
      async () => {
        await studentDataService.markAllNotificationsRead();
        return { success: true };
      }
    ),

  documents: () =>
    withMockFallback(() => studentPanelApi.getDocuments(), () => studentDataService.getDocuments()),
};
