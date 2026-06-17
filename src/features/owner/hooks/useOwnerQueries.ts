"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { ownerQueries } from "../api/owner-queries";
import type { CreateSchoolPayload, OwnerSchool, OwnerSettings } from "@/types/owner.types";

export function useOwnerDashboardData() {
  return useQuery({
    queryKey: [...QUERY_KEYS.owner.dashboard, "full"],
    queryFn: ownerQueries.dashboard,
  });
}

export function useOwnerSchools() {
  return useQuery({
    queryKey: QUERY_KEYS.owner.schools,
    queryFn: ownerQueries.schools,
  });
}

export function useOwnerSchool(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.owner.schools, id],
    queryFn: () => ownerQueries.school(id),
    enabled: Boolean(id),
  });
}

export function useOwnerUsers() {
  return useQuery({
    queryKey: QUERY_KEYS.owner.users,
    queryFn: ownerQueries.users,
  });
}

export function useOwnerBilling() {
  return useQuery({
    queryKey: QUERY_KEYS.owner.billing,
    queryFn: ownerQueries.billing,
  });
}

export function useOwnerAnalytics() {
  return useQuery({
    queryKey: QUERY_KEYS.owner.analytics,
    queryFn: ownerQueries.analytics,
  });
}

export function useOwnerSettings() {
  return useQuery({
    queryKey: ["owner", "settings"],
    queryFn: ownerQueries.settings,
  });
}

export function useCreateSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSchoolPayload) => ownerQueries.createSchool(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.owner.schools });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.owner.dashboard });
    },
  });
}

export function useUpdateSchoolStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OwnerSchool["status"] }) =>
      ownerQueries.updateSchoolStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.owner.schools });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.owner.dashboard });
    },
  });
}

export function useDeleteSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ownerQueries.deleteSchool(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.owner.schools });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.owner.dashboard });
    },
  });
}

export function useUpdateUserStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: "active" | "inactive" }) =>
      ownerQueries.updateUserStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.owner.users }),
  });
}

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<OwnerSettings>) => ownerQueries.updateSettings(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["owner", "settings"] }),
  });
}
