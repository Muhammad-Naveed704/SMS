"use client";

import { RouteSectionError } from "@/app/components/route-error";

export default function ReportsError({
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
      title="Reports Section Unavailable"
      description="Unable to load reporting data. Please try again."
    />
  );
}
