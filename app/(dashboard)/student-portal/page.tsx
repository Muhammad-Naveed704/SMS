import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Student Portal",
  "Provide students with assignments, grades, schedules, and announcements."
);

export default function StudentPortalPage() {
  return (
    <RouteShell
      title="Student Portal"
      description="Help students track daily academics, deadlines, and notices."
      primaryActionLabel="Assignments"
      primaryActionHref="/student-portal/assignments"
      secondaryActionLabel="Grades"
      secondaryActionHref="/student-portal/grades"
      rows={createPlaceholderRows("student-portal")}
    />
  );
}
