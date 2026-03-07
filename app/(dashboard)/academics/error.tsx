"use client";

import { RouteSectionError } from "@/app/components/route-error";

export default function AcademicsError({
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
      title="Academics Section Unavailable"
      description="Unable to load academic data. Please try again."
    />
  );
}
