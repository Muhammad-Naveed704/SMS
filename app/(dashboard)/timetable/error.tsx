"use client";

import { RouteSectionError } from "@/app/components/route-error";

export default function TimetableError({
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
      title="Timetable Section Unavailable"
      description="Unable to load timetable data. Please try again."
    />
  );
}
