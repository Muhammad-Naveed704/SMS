"use client";

import { RouteSectionError } from "@/app/components/route-error";

export default function CommunicationError({
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
      title="Communication Section Unavailable"
      description="Unable to load communication tools. Please try again."
    />
  );
}
