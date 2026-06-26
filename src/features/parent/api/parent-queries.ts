import { parentPanelApi } from "@/services/api/parent-panel.api";
import { parentDataService } from "@/features/parent/data/parent-data.service";
import { USE_MOCK_DATA } from "@/lib/env";
import type { UpdateParentProfilePayload } from "@/types/parent-panel.types";

async function withMockFallback<T>(apiFn: () => Promise<T>, mockFn: () => T | Promise<T>): Promise<T> {
  try {
    return await apiFn();
  } catch {
    if (USE_MOCK_DATA) return mockFn();
    throw new Error("API request failed");
  }
}

export const parentQueries = {
  dashboard: () =>
    withMockFallback(() => parentPanelApi.getDashboard(), () => parentDataService.getDashboard()),

  children: () =>
    withMockFallback(() => parentPanelApi.getChildren(), () => parentDataService.getChildren()),

  child: (id: string) =>
    withMockFallback(() => parentPanelApi.getChild(id), () => parentDataService.getChild(id)),

  attendance: (childId: string) =>
    withMockFallback(
      () => parentPanelApi.getAttendance(childId),
      () => parentDataService.getAttendance(childId)
    ),

  fees: (childId?: string) =>
    withMockFallback(
      () => parentPanelApi.getFees(childId),
      () => parentDataService.getFees(childId)
    ),

  results: (childId?: string, academicYear?: string, examName?: string) =>
    withMockFallback(
      () => parentPanelApi.getResults(childId),
      () => parentDataService.getResults(childId, academicYear, examName)
    ),

  homework: (childId?: string) =>
    withMockFallback(
      () => parentPanelApi.getHomework(childId),
      () => parentDataService.getHomework(childId)
    ),

  notifications: () =>
    withMockFallback(
      () => parentPanelApi.getNotifications(),
      () => parentDataService.getNotifications()
    ),

  markNotificationRead: (id: string) =>
    withMockFallback(
      () => parentPanelApi.markNotificationRead(id),
      async () => {
        await parentDataService.markNotificationRead(id);
        return { id, read: true };
      }
    ),

  markAllNotificationsRead: () =>
    withMockFallback(
      () => parentPanelApi.markAllNotificationsRead(),
      async () => {
        await parentDataService.markAllNotificationsRead();
        return { success: true };
      }
    ),

  conversations: () =>
    withMockFallback(
      () => parentPanelApi.getConversations(),
      () => parentDataService.getConversations()
    ),

  conversation: (id: string) =>
    withMockFallback(
      () => parentPanelApi.getConversation(id),
      () => parentDataService.getConversation(id)
    ),

  sendMessage: (conversationId: string, content: string) =>
    withMockFallback(
      () => parentPanelApi.sendMessage(conversationId, content),
      () => parentDataService.sendMessage(conversationId, content)
    ),

  documents: (childId: string) =>
    withMockFallback(
      () => parentPanelApi.getDocuments(childId),
      () => parentDataService.getDocuments(childId)
    ),

  profile: () =>
    withMockFallback(() => parentPanelApi.getProfile(), () => parentDataService.getProfile()),

  updateProfile: (p: UpdateParentProfilePayload) =>
    withMockFallback(
      () => parentPanelApi.updateProfile(p),
      () => parentDataService.updateProfile(p)
    ),
};
