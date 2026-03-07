import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "New Class",
  "Create a class and set section, room, and teacher allocation."
);

export default function NewClassPage() {
  return (
    <RouteShell
      title="New Class"
      description="Define class details, section structure, and academic term setup."
      primaryActionLabel="Save Class"
      primaryActionHref="/classes"
      secondaryActionLabel="Back to Classes"
      secondaryActionHref="/classes"
      rows={createPlaceholderRows("new-class")}
    />
  );
}
