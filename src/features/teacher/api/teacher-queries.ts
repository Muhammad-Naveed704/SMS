import { teacherDataService } from "@/features/teacher/data/teacher-data.service";
import type { CreateAssignmentPayload, SaveMarksPayload } from "@/types/teacher-panel.types";

export const teacherQueries = {
  dashboard: () => teacherDataService.getDashboard(),
  classes: () => teacherDataService.getClasses(),
  class: (id: string) => teacherDataService.getClass(id),
  attendance: (classId: string, date: string) => teacherDataService.getAttendance(classId, date),
  assignments: () => teacherDataService.getAssignments(),
  createAssignment: (p: CreateAssignmentPayload) => teacherDataService.createAssignment(p),
  exams: () => teacherDataService.getExams(),
  marks: (examId: string, classId: string) => teacherDataService.getMarks(examId, classId),
  saveMarks: (p: SaveMarksPayload) => teacherDataService.saveMarks(p),
  timetable: () => teacherDataService.getTimetable(),
  students: () => teacherDataService.getStudents(),
  profile: () => teacherDataService.getProfile(),
  notifications: () => teacherDataService.getNotifications(),
};
