import type { PaginationParams } from "@/lib/validators";
import type { PaginatedResponse } from "@/types/school.types";
import type { Student, StudentListItem } from "@/types/student.types";
import { apiDelete, apiGet, apiPatch, apiPost } from "./client";

export const studentApi = {
  getAll: (params?: PaginationParams) =>
    apiGet<PaginatedResponse<StudentListItem>>("/students", { params }),

  getById: (id: string) => apiGet<Student>(`/students/${id}`),

  create: (payload: Partial<Student>) => apiPost<Student>("/students", payload),

  update: (id: string, payload: Partial<Student>) =>
    apiPatch<Student>(`/students/${id}`, payload),

  delete: (id: string) => apiDelete(`/students/${id}`),
};
