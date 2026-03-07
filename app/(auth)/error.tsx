"use client";

import { RouteSectionError } from "@/app/components/route-error";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-md">
      <RouteSectionError
        error={error}
        reset={reset}
        title="Authentication Error"
        description="We could not load this authentication screen. Please try again."
      />
    </div>
  );
}
