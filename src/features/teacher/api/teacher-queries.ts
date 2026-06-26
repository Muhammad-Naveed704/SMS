import { teacherPanelApi } from "@/services/api/teacher-panel.api";
import { teacherDataService } from "@/features/teacher/data/teacher-data.service";
import { USE_MOCK_DATA } from "@/lib/env";
import type { CreateAssignmentPayload, SaveMarksPayload } from "@/types/teacher-panel.types";

async function withMockFallback<T>(apiFn: () => Promise<T>, mockFn: () => T | Promise<T>): Promise<T> {
  try {
    return await apiFn();
  } catch {
    if (USE_MOCK_DATA) return mockFn();
    throw new Error("API request failed");
  }
}

export const teacherQueries = {
  dashboard: () =>
    withMockFallback(() => teacherPanelApi.getDashboard(), () => teacherDataService.getDashboard()),

  classes: () =>
    withMockFallback(() => teacherPanelApi.getClasses(), () => teacherDataService.getClasses()),

  class: (id: string) =>
    withMockFallback(() => teacherPanelApi.getClass(id), () => teacherDataService.getClass(id)),

  attendance: (classId: string, date: string) =>
    withMockFallback(
      () => teacherPanelApi.getAttendance(classId, date),
      () => teacherDataService.getAttendance(classId, date)
    ),

  assignments: () =>
    withMockFallback(() => teacherPanelApi.getAssignments(), () => teacherDataService.getAssignments()),

  createAssignment: (p: CreateAssignmentPayload) =>
    withMockFallback(
      () => teacherPanelApi.createAssignment(p),
      () => teacherDataService.createAssignment(p)
    ),

  exams: () =>
    withMockFallback(() => teacherPanelApi.getExams(), () => teacherDataService.getExams()),

  marks: (examId: string, classId: string) =>
    withMockFallback(
      () => teacherPanelApi.getMarks(examId, classId),
      () => teacherDataService.getMarks(examId, classId)
    ),

  saveMarks: (p: SaveMarksPayload) =>
    withMockFallback(
      () => teacherPanelApi.saveMarks(p),
      async () => {
        await teacherDataService.saveMarks(p);
        return p;
      }
    ),

  timetable: () =>
    withMockFallback(() => teacherPanelApi.getTimetable(), () => teacherDataService.getTimetable()),

  students: () =>
    withMockFallback(() => teacherPanelApi.getStudents(), () => teacherDataService.getStudents()),

  profile: () =>
    withMockFallback(() => teacherPanelApi.getProfile(), () => teacherDataService.getProfile()),

  notifications: () =>
    withMockFallback(
      () => teacherPanelApi.getNotifications(),
      () => teacherDataService.getNotifications()
    ),
};
