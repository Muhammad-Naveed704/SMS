import type { PaginationParams } from "@/lib/validators";
import type { PaginatedResponse } from "@/types/school.types";
import type { Teacher, TeacherListItem } from "@/types/teacher.types";
import { apiDelete, apiGet, apiPatch, apiPost } from "./client";

export const teacherApi = {
  getAll: (params?: PaginationParams) =>
    apiGet<PaginatedResponse<TeacherListItem>>("/school/teachers", { params }),

  getById: (id: string) => apiGet<Teacher>(`/school/teachers/${id}`),

  create: (payload: Partial<Teacher>) => apiPost<Teacher>("/school/teachers", payload),

  update: (id: string, payload: Partial<Teacher>) =>
    apiPatch<Teacher>(`/school/teachers/${id}`, payload),

  delete: (id: string) => apiDelete(`/school/teachers/${id}`),
};
