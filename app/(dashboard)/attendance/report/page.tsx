import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Attendance Report",
  "Analyze attendance percentages by class, section, and student."
);

export default function AttendanceReportPage() {
  return (
    <RouteShell
      title="Attendance Report"
      description="Review consolidated attendance performance across academic periods."
      primaryActionLabel="Export Report"
      primaryActionHref="/reports/attendance"
      secondaryActionLabel="Attendance Home"
      secondaryActionHref="/attendance"
      rows={createPlaceholderRows("attendance-report")}
    />
  );
}
