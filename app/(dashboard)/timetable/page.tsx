import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Timetable",
  "Manage class schedules, period slots, and faculty allocations."
);

export default function TimetablePage() {
  return (
    <RouteShell
      title="Timetable"
      description="Review and manage class timetables for the current academic cycle."
      primaryActionLabel="Generate Timetable"
      primaryActionHref="/timetable/generate"
      secondaryActionLabel="View Classes"
      secondaryActionHref="/classes"
      rows={createPlaceholderRows("timetable")}
    />
  );
}
