"use client";

import { RouteSectionError } from "@/app/components/route-error";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteSectionError
      error={error}
      reset={reset}
      title="Dashboard Unavailable"
      description="Something failed while loading dashboard content. Please retry."
    />
  );
}
