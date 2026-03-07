import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Attendance",
  "Track daily attendance and monitor student participation trends."
);

export default function AttendancePage() {
  return (
    <RouteShell
      title="Attendance"
      description="Capture attendance status and monitor class-level presence metrics."
      primaryActionLabel="Subject-wise Entry"
      primaryActionHref="/attendance/subject-wise"
      secondaryActionLabel="Attendance Report"
      secondaryActionHref="/attendance/report"
      rows={createPlaceholderRows("attendance")}
    />
  );
}
