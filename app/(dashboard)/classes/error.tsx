"use client";

import { RouteSectionError } from "@/app/components/route-error";

export default function ClassesError({
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
      title="Classes Section Unavailable"
      description="Unable to load class data. Please try again."
    />
  );
}
