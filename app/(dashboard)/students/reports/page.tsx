import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Student Reports",
  "Analyze student-level academic, attendance, and behavioral trends."
);

export default function StudentReportsPage() {
  return (
    <RouteShell
      title="Student Reports"
      description="Generate class-wise and student-wise reports for school leadership."
      primaryActionLabel="Generate Report"
      primaryActionHref="/reports/academic"
      secondaryActionLabel="Back to Students"
      secondaryActionHref="/students"
      rows={createPlaceholderRows("student-report")}
    />
  );
}
