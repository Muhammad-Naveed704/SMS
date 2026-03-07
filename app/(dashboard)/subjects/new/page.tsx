import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "New Subject",
  "Create a subject and assign department and class level."
);

export default function NewSubjectPage() {
  return (
    <RouteShell
      title="New Subject"
      description="Set subject code, category, and curriculum mapping for active classes."
      primaryActionLabel="Save Subject"
      primaryActionHref="/subjects"
      secondaryActionLabel="Back to Subjects"
      secondaryActionHref="/subjects"
      rows={createPlaceholderRows("new-subject")}
    />
  );
}
