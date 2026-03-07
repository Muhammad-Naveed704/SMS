import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Academic Reports",
  "Review academic outcomes, grade distributions, and subject performance."
);

export default function ReportsAcademicPage() {
  return (
    <RouteShell
      title="Academic Reports"
      description="Track exam performance and curriculum outcomes across classes."
      primaryActionLabel="View Grades"
      primaryActionHref="/academics/exams/grades"
      secondaryActionLabel="Back to Reports"
      secondaryActionHref="/reports"
      rows={createPlaceholderRows("reports-academic")}
    />
  );
}
