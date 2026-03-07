"use client";

import { RouteSectionError } from "@/app/components/route-error";

export default function TeachersError({
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
      title="Teachers Section Unavailable"
      description="Unable to load teacher data. Please try again."
    />
  );
}
