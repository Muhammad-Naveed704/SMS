import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Subject-wise Attendance",
  "Mark and review attendance by subject and teaching period."
);

export default function SubjectWiseAttendancePage() {
  return (
    <RouteShell
      title="Subject-wise Attendance"
      description="Record attendance for each subject session with quick class filters."
      primaryActionLabel="Save Attendance"
      primaryActionHref="/attendance"
      secondaryActionLabel="History"
      secondaryActionHref="/attendance/history"
      rows={createPlaceholderRows("attendance-subject")}
    />
  );
}
