"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { schoolApi } from "@/services/api/school.api";

export function useSchoolDashboard() {
  const statsQuery = useQuery({
    queryKey: QUERY_KEYS.school.dashboard,
    queryFn: () => schoolApi.getDashboardStats(),
  });

  const attendanceQuery = useQuery({
    queryKey: [...QUERY_KEYS.school.attendance, "overview"],
    queryFn: () => schoolApi.getAttendanceOverview(),
  });

  const feesQuery = useQuery({
    queryKey: [...QUERY_KEYS.school.fees, "summary"],
    queryFn: () => schoolApi.getFeeCollectionSummary(),
  });

  return { statsQuery, attendanceQuery, feesQuery };
}
