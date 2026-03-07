import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "New Teacher",
  "Create a teacher profile and assign subjects and classes."
);

export default function NewTeacherPage() {
  return (
    <RouteShell
      title="New Teacher"
      description="Onboard faculty members with department, subject, and class assignments."
      primaryActionLabel="Save Teacher"
      primaryActionHref="/teachers"
      secondaryActionLabel="Back to Teachers"
      secondaryActionHref="/teachers"
      rows={createPlaceholderRows("new-teacher")}
    />
  );
}
