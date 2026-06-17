import { Suspense } from "react";
import { ResultsPage } from "@/features/teacher/results/ResultsPage";
import { PageSkeleton } from "@/components/shared/PageSkeleton";

export const metadata = { title: "Results" };

export default function TeacherResultsPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ResultsPage />
    </Suspense>
  );
}
