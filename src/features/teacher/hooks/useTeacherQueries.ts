"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { teacherQueries } from "../api/teacher-queries";
import type { CreateAssignmentPayload, SaveMarksPayload } from "@/types/teacher-panel.types";

export function useTeacherDashboard() {
  return useQuery({ queryKey: QUERY_KEYS.teacher.dashboard, queryFn: teacherQueries.dashboard });
}

export function useTeacherClasses() {
  return useQuery({ queryKey: QUERY_KEYS.teacher.classes, queryFn: teacherQueries.classes });
}

export function useTeacherClass(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.teacher.classes, id],
    queryFn: () => teacherQueries.class(id),
    enabled: Boolean(id),
  });
}

export function useTeacherAttendance(classId: string, date: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.teacher.attendance, classId, date],
    queryFn: () => teacherQueries.attendance(classId, date),
    enabled: Boolean(classId),
  });
}

export function useTeacherAssignments() {
  return useQuery({ queryKey: QUERY_KEYS.teacher.assignments, queryFn: teacherQueries.assignments });
}

export function useCreateAssignment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: CreateAssignmentPayload) => teacherQueries.createAssignment(p),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.teacher.assignments }),
  });
}

export function useTeacherExams() {
  return useQuery({ queryKey: QUERY_KEYS.teacher.exams, queryFn: teacherQueries.exams });
}

export function useTeacherMarks(examId: string, classId: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.teacher.results, examId, classId],
    queryFn: () => teacherQueries.marks(examId, classId),
    enabled: Boolean(examId && classId),
  });
}

export function useSaveMarks() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: SaveMarksPayload) => teacherQueries.saveMarks(p),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.teacher.results }),
  });
}

export function useTeacherTimetable() {
  return useQuery({ queryKey: QUERY_KEYS.teacher.timetable, queryFn: teacherQueries.timetable });
}

export function useTeacherStudents() {
  return useQuery({ queryKey: QUERY_KEYS.teacher.students, queryFn: teacherQueries.students });
}

export function useTeacherProfile() {
  return useQuery({ queryKey: QUERY_KEYS.teacher.profile, queryFn: teacherQueries.profile });
}

export function useTeacherNotifications() {
  return useQuery({ queryKey: QUERY_KEYS.teacher.notifications, queryFn: teacherQueries.notifications });
}
