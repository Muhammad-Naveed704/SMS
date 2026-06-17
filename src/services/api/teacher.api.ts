import type { PaginationParams } from "@/lib/validators";
import type { PaginatedResponse } from "@/types/school.types";
import type { Teacher, TeacherListItem } from "@/types/teacher.types";
import { api } from "./axios";

export const teacherApi = {
  getAll: async (
    params?: PaginationParams
  ): Promise<PaginatedResponse<TeacherListItem>> => {
    const response = await api.get<{
      data: PaginatedResponse<TeacherListItem>;
    }>("/teachers", { params });
    return response.data.data;
  },

  getById: async (id: string): Promise<Teacher> => {
    const response = await api.get<{ data: Teacher }>(`/teachers/${id}`);
    return response.data.data;
  },

  create: async (payload: Partial<Teacher>): Promise<Teacher> => {
    const response = await api.post<{ data: Teacher }>("/teachers", payload);
    return response.data.data;
  },

  update: async (id: string, payload: Partial<Teacher>): Promise<Teacher> => {
    const response = await api.patch<{ data: Teacher }>(
      `/teachers/${id}`,
      payload
    );
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/teachers/${id}`);
  },
};
