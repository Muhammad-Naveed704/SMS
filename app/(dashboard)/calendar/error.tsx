"use client";

import { RouteSectionError } from "@/app/components/route-error";

export default function CalendarError({
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
      title="Calendar Section Unavailable"
      description="Unable to load calendar data. Please try again."
    />
  );
}
