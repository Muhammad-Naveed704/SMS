import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Classes",
  "Manage classes, sections, and assigned homeroom teachers."
);

export default function ClassesPage() {
  return (
    <RouteShell
      title="Classes"
      description="Organize grades, sections, and class-teacher mappings."
      primaryActionLabel="Create Class"
      primaryActionHref="/classes/new"
      secondaryActionLabel="Students"
      secondaryActionHref="/students"
      rows={createPlaceholderRows("class")}
    />
  );
}
