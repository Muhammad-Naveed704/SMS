import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Generate Timetable",
  "Auto-generate timetable plans based on class and teacher availability."
);

export default function GenerateTimetablePage() {
  return (
    <RouteShell
      title="Generate Timetable"
      description="Run timetable generation with conflict checks for rooms and faculty."
      primaryActionLabel="Run Generator"
      primaryActionHref="/timetable"
      secondaryActionLabel="Back to Timetable"
      secondaryActionHref="/timetable"
      rows={createPlaceholderRows("timetable-generate")}
    />
  );
}
