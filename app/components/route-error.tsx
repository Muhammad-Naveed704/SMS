"use client";

import { useEffect } from "react";
import { Button } from "@/app/components/ui/button";

interface RouteSectionErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
  description?: string;
}

export function RouteSectionError({
  error,
  reset,
  title = "Section Unavailable",
  description = "Something failed while loading this section. Please try again.",
}: RouteSectionErrorProps) {
  useEffect(() => {
    console.error("Route section error:", error);
  }, [error]);

  return (
    <div className="rounded-xl border border-destructive/40 bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <Button className="mt-4" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
