import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Teacher Reports",
  "Review faculty productivity, attendance, and class outcomes."
);

export default function TeacherReportsPage() {
  return (
    <RouteShell
      title="Teacher Reports"
      description="Monitor faculty performance and workload distribution metrics."
      primaryActionLabel="Generate Report"
      primaryActionHref="/reports/academic"
      secondaryActionLabel="Back to Teachers"
      secondaryActionHref="/teachers"
      rows={createPlaceholderRows("teacher-report")}
    />
  );
}
