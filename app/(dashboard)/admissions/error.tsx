"use client";

import { RouteSectionError } from "@/app/components/route-error";

export default function AdmissionsError({
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
      title="Admissions Section Unavailable"
      description="Unable to load admissions data. Please try again."
    />
  );
}
