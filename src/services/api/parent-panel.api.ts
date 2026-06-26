import type {
  ParentChild,
  ParentChildDetail,
  ParentAttendanceData,
  ParentConversation,
  ParentDashboardData,
  ParentDocument,
  ParentExamResult,
  ParentFeeSummary,
  ParentHomework,
  ParentNotification,
  ParentProfile,
  UpdateParentProfilePayload,
} from "@/types/parent-panel.types";
import { apiGet, apiPatch, apiPost } from "./client";

export const parentPanelApi = {
  getDashboard: () => apiGet<ParentDashboardData>("/parent/dashboard"),

  getChildren: () => apiGet<ParentChild[]>("/parent/children"),

  getChild: (id: string) => apiGet<ParentChildDetail>(`/parent/children/${id}`),

  getAttendance: (childId: string) =>
    apiGet<ParentAttendanceData>(`/parent/children/${childId}/attendance`),

  getFees: (childId?: string) =>
    apiGet<ParentFeeSummary[]>("/parent/fees", { params: childId ? { childId } : undefined }),

  getResults: (childId?: string) =>
    apiGet<ParentExamResult[]>("/parent/results", { params: childId ? { childId } : undefined }),

  getHomework: (childId?: string) =>
    apiGet<ParentHomework[]>("/parent/homework", { params: childId ? { childId } : undefined }),

  getNotifications: () => apiGet<ParentNotification[]>("/parent/notifications"),

  markNotificationRead: (id: string) =>
    apiPatch<{ id: string; read: boolean }>(`/parent/notifications/${id}/read`),

  markAllNotificationsRead: () =>
    apiPatch<{ success: boolean }>("/parent/notifications/read-all"),

  getConversations: () => apiGet<ParentConversation[]>("/parent/messages"),

  getConversation: (id: string) => apiGet<ParentConversation>(`/parent/messages/${id}`),

  sendMessage: (conversationId: string, content: string) =>
    apiPost<unknown>(`/parent/messages/${conversationId}`, { content }),

  getDocuments: (childId: string) =>
    apiGet<ParentDocument[]>(`/parent/children/${childId}/documents`),

  getProfile: () => apiGet<ParentProfile>("/parent/profile"),

  updateProfile: (payload: UpdateParentProfilePayload) =>
    apiPatch<ParentProfile>("/parent/profile", payload),
};
