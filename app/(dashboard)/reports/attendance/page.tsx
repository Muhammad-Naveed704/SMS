import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Attendance Reports",
  "Generate and export attendance intelligence for classes and individuals."
);

export default function ReportsAttendancePage() {
  return (
    <RouteShell
      title="Attendance Reports"
      description="Analyze absentee patterns, punctuality, and section-level trends."
      primaryActionLabel="Export Attendance"
      primaryActionHref="/attendance/report"
      secondaryActionLabel="Back to Reports"
      secondaryActionHref="/reports"
      rows={createPlaceholderRows("reports-attendance")}
    />
  );
}
