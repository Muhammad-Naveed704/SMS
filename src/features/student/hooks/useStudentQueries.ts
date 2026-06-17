"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { studentQueries } from "../api/student-queries";
import type { SubmitAssignmentPayload, UpdateStudentProfilePayload } from "@/types/student-panel.types";

export function useStudentDashboard() {
  return useQuery({ queryKey: QUERY_KEYS.student.dashboard, queryFn: studentQueries.dashboard });
}

export function useStudentProfile() {
  return useQuery({ queryKey: QUERY_KEYS.student.profile, queryFn: studentQueries.profile });
}

export function useUpdateStudentProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: UpdateStudentProfilePayload) => studentQueries.updateProfile(p),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.student.profile });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.student.dashboard });
    },
  });
}

export function useStudentSubjects() {
  return useQuery({ queryKey: QUERY_KEYS.student.classes, queryFn: studentQueries.subjects });
}

export function useStudentSubject(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.student.classes, id],
    queryFn: () => studentQueries.subject(id),
    enabled: Boolean(id),
  });
}

export function useStudentAttendance() {
  return useQuery({ queryKey: QUERY_KEYS.student.attendance, queryFn: studentQueries.attendance });
}

export function useStudentTimetable() {
  return useQuery({ queryKey: QUERY_KEYS.student.timetable, queryFn: studentQueries.timetable });
}

export function useStudentHomework() {
  return useQuery({ queryKey: QUERY_KEYS.student.homework, queryFn: studentQueries.homework });
}

export function useStudentAssignments() {
  return useQuery({ queryKey: QUERY_KEYS.student.assignments, queryFn: studentQueries.assignments });
}

export function useStudentAssignment(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.student.assignments, id],
    queryFn: () => studentQueries.assignment(id),
    enabled: Boolean(id),
  });
}

export function useSubmitAssignment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: SubmitAssignmentPayload) => studentQueries.submitAssignment(p),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.student.assignments }),
  });
}

export function useStudentExams() {
  return useQuery({ queryKey: QUERY_KEYS.student.exams, queryFn: studentQueries.exams });
}

export function useStudentResults() {
  return useQuery({ queryKey: QUERY_KEYS.student.results, queryFn: studentQueries.results });
}

export function useStudentNotifications() {
  return useQuery({ queryKey: QUERY_KEYS.student.notifications, queryFn: studentQueries.notifications });
}

export function useMarkStudentNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => studentQueries.markNotificationRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.student.notifications }),
  });
}

export function useMarkAllStudentNotificationsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => studentQueries.markAllNotificationsRead(),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.student.notifications }),
  });
}

export function useStudentDocuments() {
  return useQuery({ queryKey: QUERY_KEYS.student.documents, queryFn: studentQueries.documents });
}
