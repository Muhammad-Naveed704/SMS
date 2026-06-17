import { schoolApi } from "@/services/api/school.api";
import { schoolDataService } from "@/features/school/data/school-data.service";
import type { CreateStudentPayload, SchoolSettingsData, SchoolStudent, SchoolTeacher } from "@/types/school-admin.types";

export const schoolQueries = {
  dashboard: async () => {
    try {
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
    } catch {
      return schoolDataService.getDashboard();
    }
  },
  students: () => schoolDataService.getStudents(),
  student: (id: string) => schoolDataService.getStudent(id),
  teachers: () => schoolDataService.getTeachers(),
  classes: () => schoolDataService.getClasses(),
  class: (id: string) => schoolDataService.getClass(id),
  attendance: (classId: string, date: string) => schoolDataService.getAttendance(classId, date),
  fees: () => schoolDataService.getFees(),
  exams: () => schoolDataService.getExams(),
  timetable: () => schoolDataService.getTimetable(),
  notifications: () => schoolDataService.getNotifications(),
  settings: () => schoolDataService.getSettings(),
  createStudent: (p: CreateStudentPayload) => schoolDataService.createStudent(p),
  updateStudentStatus: (id: string, status: SchoolStudent["status"]) =>
    schoolDataService.updateStudentStatus(id, status),
  updateTeacherStatus: (id: string, status: SchoolTeacher["status"]) =>
    schoolDataService.updateTeacherStatus(id, status),
  updateSettings: (d: Partial<SchoolSettingsData>) => schoolDataService.updateSettings(d),
};
