import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Exam Grades",
  "Manage grade entries, moderation, and final exam result publishing."
);

export default function ExamGradesPage() {
  return (
    <RouteShell
      title="Exam Grades"
      description="Publish and review exam grades with class-wise and subject-wise filters."
      primaryActionLabel="Publish Results"
      primaryActionHref="/reports/academic"
      secondaryActionLabel="Back to Exams"
      secondaryActionHref="/academics/exams"
      rows={createPlaceholderRows("exam-grades")}
    />
  );
}
