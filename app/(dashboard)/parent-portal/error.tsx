"use client";

import { RouteSectionError } from "@/app/components/route-error";

export default function ParentPortalError({
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
      title="Parent Portal Unavailable"
      description="Unable to load parent portal data. Please try again."
    />
  );
}
