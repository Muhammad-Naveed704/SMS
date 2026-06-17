import type { PaginationParams } from "@/lib/validators";
import type {
  AttendanceOverview,
  FeeCollectionSummary,
  PaginatedResponse,
  SchoolDashboardStats,
} from "@/types/school.types";
import type { StudentListItem } from "@/types/student.types";
import type { TeacherListItem } from "@/types/teacher.types";
import { api } from "./axios";

export const schoolApi = {
  getDashboardStats: async (): Promise<SchoolDashboardStats> => {
    const response = await api.get<{ data: SchoolDashboardStats }>(
      "/school/dashboard"
    );
    return response.data.data;
  },

  getAttendanceOverview: async (): Promise<AttendanceOverview[]> => {
    const response = await api.get<{ data: AttendanceOverview[] }>(
      "/school/attendance/overview"
    );
    return response.data.data;
  },

  getFeeCollectionSummary: async (): Promise<FeeCollectionSummary[]> => {
    const response = await api.get<{ data: FeeCollectionSummary[] }>(
      "/school/fees/summary"
    );
    return response.data.data;
  },

  getStudents: async (
    params?: PaginationParams
  ): Promise<PaginatedResponse<StudentListItem>> => {
    const response = await api.get<{
      data: PaginatedResponse<StudentListItem>;
    }>("/school/students", { params });
    return response.data.data;
  },

  getTeachers: async (
    params?: PaginationParams
  ): Promise<PaginatedResponse<TeacherListItem>> => {
    const response = await api.get<{
      data: PaginatedResponse<TeacherListItem>;
    }>("/school/teachers", { params });
    return response.data.data;
  },
};
