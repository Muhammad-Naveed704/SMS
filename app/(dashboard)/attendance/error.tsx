"use client";

import { RouteSectionError } from "@/app/components/route-error";

export default function AttendanceError({
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
      title="Attendance Section Unavailable"
      description="Unable to load attendance data. Please try again."
    />
  );
}
