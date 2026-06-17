import { parentDataService } from "@/features/parent/data/parent-data.service";
import type { UpdateParentProfilePayload } from "@/types/parent-panel.types";

export const parentQueries = {
  dashboard: () => parentDataService.getDashboard(),
  children: () => parentDataService.getChildren(),
  child: (id: string) => parentDataService.getChild(id),
  attendance: (childId: string) => parentDataService.getAttendance(childId),
  fees: (childId?: string) => parentDataService.getFees(childId),
  results: (childId?: string, academicYear?: string, examName?: string) =>
    parentDataService.getResults(childId, academicYear, examName),
  homework: (childId?: string) => parentDataService.getHomework(childId),
  notifications: () => parentDataService.getNotifications(),
  markNotificationRead: (id: string) => parentDataService.markNotificationRead(id),
  markAllNotificationsRead: () => parentDataService.markAllNotificationsRead(),
  conversations: () => parentDataService.getConversations(),
  conversation: (id: string) => parentDataService.getConversation(id),
  sendMessage: (conversationId: string, content: string) =>
    parentDataService.sendMessage(conversationId, content),
  documents: (childId: string) => parentDataService.getDocuments(childId),
  profile: () => parentDataService.getProfile(),
  updateProfile: (p: UpdateParentProfilePayload) => parentDataService.updateProfile(p),
};
