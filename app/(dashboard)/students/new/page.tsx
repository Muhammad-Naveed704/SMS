import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "New Student",
  "Create a new student profile and assign academic details."
);

export default function NewStudentPage() {
  return (
    <RouteShell
      title="New Student Admission"
      description="Capture identity, guardian, and class allocation details for a new student."
      primaryActionLabel="Save Admission"
      primaryActionHref="/students"
      secondaryActionLabel="Back to Students"
      secondaryActionHref="/students"
      rows={createPlaceholderRows("new-student")}
    />
  );
}
