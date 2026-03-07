"use client";

import { RouteSectionError } from "@/app/components/route-error";

export default function SettingsError({
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
      title="Settings Section Unavailable"
      description="Unable to load settings data. Please try again."
    />
  );
}
