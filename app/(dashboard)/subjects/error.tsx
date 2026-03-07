"use client";

import { RouteSectionError } from "@/app/components/route-error";

export default function SubjectsError({
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
      title="Subjects Section Unavailable"
      description="Unable to load subject data. Please try again."
    />
  );
}
