import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Students",
  "Manage student records, enrollment status, and profile information."
);

export default function StudentsPage() {
  return (
    <RouteShell
      title="Students"
      description="Manage admissions, profiles, and status updates for all students."
      primaryActionLabel="Add Student"
      primaryActionHref="/students/new"
      secondaryActionLabel="Student Reports"
      secondaryActionHref="/students/reports"
      rows={createPlaceholderRows("student")}
    />
  );
}
