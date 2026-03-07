"use client";

import { RouteSectionError } from "@/app/components/route-error";

export default function FeesError({
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
      title="Fees Section Unavailable"
      description="Unable to load fee data. Please try again."
    />
  );
}
