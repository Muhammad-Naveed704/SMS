"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { parentQueries } from "../api/parent-queries";
import type { UpdateParentProfilePayload } from "@/types/parent-panel.types";

export function useParentDashboard() {
  return useQuery({ queryKey: QUERY_KEYS.parent.dashboard, queryFn: parentQueries.dashboard });
}

export function useParentChildren() {
  return useQuery({ queryKey: QUERY_KEYS.parent.children, queryFn: parentQueries.children });
}

export function useParentChild(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.parent.children, id],
    queryFn: () => parentQueries.child(id),
    enabled: Boolean(id),
  });
}

export function useParentAttendance(childId: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.parent.attendance, childId],
    queryFn: () => parentQueries.attendance(childId),
    enabled: Boolean(childId),
  });
}

export function useParentFees(childId?: string) {
  return useQuery({
    queryKey: childId ? [...QUERY_KEYS.parent.fees, childId] : QUERY_KEYS.parent.fees,
    queryFn: () => parentQueries.fees(childId),
  });
}

export function useParentResults(childId?: string, academicYear?: string, examName?: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.parent.results, childId ?? "all", academicYear ?? "all", examName ?? "all"],
    queryFn: () => parentQueries.results(childId, academicYear, examName),
  });
}

export function useParentHomework(childId?: string) {
  return useQuery({
    queryKey: childId ? [...QUERY_KEYS.parent.homework, childId] : QUERY_KEYS.parent.homework,
    queryFn: () => parentQueries.homework(childId),
  });
}

export function useParentNotifications() {
  return useQuery({ queryKey: QUERY_KEYS.parent.notifications, queryFn: parentQueries.notifications });
}

export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => parentQueries.markNotificationRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.parent.notifications }),
  });
}

export function useMarkAllNotificationsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => parentQueries.markAllNotificationsRead(),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.parent.notifications }),
  });
}

export function useParentConversations() {
  return useQuery({ queryKey: QUERY_KEYS.parent.messages, queryFn: parentQueries.conversations });
}

export function useParentConversation(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.parent.messages, id],
    queryFn: () => parentQueries.conversation(id),
    enabled: Boolean(id),
  });
}

export function useSendMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ conversationId, content }: { conversationId: string; content: string }) =>
      parentQueries.sendMessage(conversationId, content),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.parent.messages }),
  });
}

export function useParentDocuments(childId: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.parent.documents, childId],
    queryFn: () => parentQueries.documents(childId),
    enabled: Boolean(childId),
  });
}

export function useParentProfile() {
  return useQuery({ queryKey: QUERY_KEYS.parent.profile, queryFn: parentQueries.profile });
}

export function useUpdateParentProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: UpdateParentProfilePayload) => parentQueries.updateProfile(p),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.parent.profile }),
  });
}
