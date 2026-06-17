"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { schoolQueries } from "../api/school-queries";
import type { CreateStudentPayload, SchoolSettingsData, SchoolStudent, SchoolTeacher } from "@/types/school-admin.types";

export function useSchoolDashboardData() {
  return useQuery({ queryKey: [...QUERY_KEYS.school.dashboard, "full"], queryFn: schoolQueries.dashboard });
}

export function useSchoolStudents() {
  return useQuery({ queryKey: QUERY_KEYS.school.students, queryFn: schoolQueries.students });
}

export function useSchoolStudent(id: string) {
  return useQuery({ queryKey: [...QUERY_KEYS.school.students, id], queryFn: () => schoolQueries.student(id), enabled: Boolean(id) });
}

export function useSchoolTeachers() {
  return useQuery({ queryKey: QUERY_KEYS.school.teachers, queryFn: schoolQueries.teachers });
}

export function useSchoolClasses() {
  return useQuery({ queryKey: QUERY_KEYS.school.classes, queryFn: schoolQueries.classes });
}

export function useSchoolClass(id: string) {
  return useQuery({ queryKey: [...QUERY_KEYS.school.classes, id], queryFn: () => schoolQueries.class(id), enabled: Boolean(id) });
}

export function useSchoolAttendance(classId: string, date: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.school.attendance, classId, date],
    queryFn: () => schoolQueries.attendance(classId, date),
    enabled: Boolean(classId),
  });
}

export function useSchoolFees() {
  return useQuery({ queryKey: QUERY_KEYS.school.fees, queryFn: schoolQueries.fees });
}

export function useSchoolExams() {
  return useQuery({ queryKey: QUERY_KEYS.school.exams, queryFn: schoolQueries.exams });
}

export function useSchoolTimetable() {
  return useQuery({ queryKey: QUERY_KEYS.school.timetable, queryFn: schoolQueries.timetable });
}

export function useSchoolNotifications() {
  return useQuery({ queryKey: QUERY_KEYS.school.notifications, queryFn: schoolQueries.notifications });
}

export function useSchoolSettings() {
  return useQuery({ queryKey: QUERY_KEYS.school.settings, queryFn: schoolQueries.settings });
}

export function useCreateStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: CreateStudentPayload) => schoolQueries.createStudent(p),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.school.students });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.school.dashboard });
    },
  });
}

export function useUpdateStudentStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: SchoolStudent["status"] }) =>
      schoolQueries.updateStudentStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.school.students }),
  });
}

export function useUpdateTeacherStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: SchoolTeacher["status"] }) =>
      schoolQueries.updateTeacherStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.school.teachers }),
  });
}

export function useUpdateSchoolSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (d: Partial<SchoolSettingsData>) => schoolQueries.updateSettings(d),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.school.settings }),
  });
}
