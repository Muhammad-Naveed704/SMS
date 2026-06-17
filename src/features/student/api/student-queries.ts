import { studentDataService } from "@/features/student/data/student-data.service";
import type { SubmitAssignmentPayload, UpdateStudentProfilePayload } from "@/types/student-panel.types";

export const studentQueries = {
  dashboard: () => studentDataService.getDashboard(),
  profile: () => studentDataService.getProfile(),
  updateProfile: (p: UpdateStudentProfilePayload) => studentDataService.updateProfile(p),
  subjects: () => studentDataService.getSubjects(),
  subject: (id: string) => studentDataService.getSubject(id),
  attendance: () => studentDataService.getAttendance(),
  timetable: () => studentDataService.getTimetable(),
  homework: () => studentDataService.getHomework(),
  assignments: () => studentDataService.getAssignments(),
  assignment: (id: string) => studentDataService.getAssignment(id),
  submitAssignment: (p: SubmitAssignmentPayload) => studentDataService.submitAssignment(p),
  exams: () => studentDataService.getExams(),
  results: () => studentDataService.getResults(),
  notifications: () => studentDataService.getNotifications(),
  markNotificationRead: (id: string) => studentDataService.markNotificationRead(id),
  markAllNotificationsRead: () => studentDataService.markAllNotificationsRead(),
  documents: () => studentDataService.getDocuments(),
};
