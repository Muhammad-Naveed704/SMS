"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { ownerApi } from "@/services/api/owner.api";

export function useOwnerDashboard() {
  return useQuery({
    queryKey: QUERY_KEYS.owner.dashboard,
    queryFn: () => ownerApi.getDashboardStats(),
  });
}
