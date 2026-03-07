"use client";

import { RouteSectionError } from "@/app/components/route-error";

export default function StudentsError({
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
      title="Students Section Unavailable"
      description="Unable to load student data. Please try again."
    />
  );
}
