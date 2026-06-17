import type { PaginationParams } from "@/lib/validators";
import type { PaginatedResponse } from "@/types/school.types";
import type { Student, StudentListItem } from "@/types/student.types";
import { api } from "./axios";

export const studentApi = {
  getAll: async (
    params?: PaginationParams
  ): Promise<PaginatedResponse<StudentListItem>> => {
    const response = await api.get<{
      data: PaginatedResponse<StudentListItem>;
    }>("/students", { params });
    return response.data.data;
  },

  getById: async (id: string): Promise<Student> => {
    const response = await api.get<{ data: Student }>(`/students/${id}`);
    return response.data.data;
  },

  create: async (payload: Partial<Student>): Promise<Student> => {
    const response = await api.post<{ data: Student }>("/students", payload);
    return response.data.data;
  },

  update: async (id: string, payload: Partial<Student>): Promise<Student> => {
    const response = await api.patch<{ data: Student }>(
      `/students/${id}`,
      payload
    );
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/students/${id}`);
  },
};
