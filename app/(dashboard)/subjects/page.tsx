import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Subjects",
  "Manage curriculum subjects, codes, and class mappings."
);

export default function SubjectsPage() {
  return (
    <RouteShell
      title="Subjects"
      description="Track subject catalog, departments, and class-level availability."
      primaryActionLabel="Add Subject"
      primaryActionHref="/subjects/new"
      secondaryActionLabel="Classes"
      secondaryActionHref="/classes"
      rows={createPlaceholderRows("subject")}
    />
  );
}
