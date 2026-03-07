import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "School Calendar",
  "Plan academic events, holidays, and institutional milestones."
);

export default function CalendarPage() {
  return (
    <RouteShell
      title="School Calendar"
      description="Track upcoming events, examinations, and school activity timelines."
      primaryActionLabel="Create Event"
      primaryActionHref="/communication/announcements"
      secondaryActionLabel="Timetable"
      secondaryActionHref="/timetable"
      rows={createPlaceholderRows("calendar")}
    />
  );
}
