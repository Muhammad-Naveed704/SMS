"use client";

import { RouteSectionError } from "@/app/components/route-error";

export default function StudentPortalError({
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
      title="Student Portal Unavailable"
      description="Unable to load student portal data. Please try again."
    />
  );
}
