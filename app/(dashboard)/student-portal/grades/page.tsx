import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Student Grades",
  "Display student grades and performance snapshots by exam period."
);

export default function StudentGradesPage() {
  return (
    <RouteShell
      title="Student Grades"
      description="Track assessment performance and grade trends over time."
      primaryActionLabel="Academic Reports"
      primaryActionHref="/reports/academic"
      secondaryActionLabel="Back to Portal"
      secondaryActionHref="/student-portal"
      rows={createPlaceholderRows("student-grades")}
    />
  );
}
