import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Announcements",
  "Publish school-wide notices, alerts, and event updates."
);

export default function AnnouncementsPage() {
  return (
    <RouteShell
      title="Announcements"
      description="Broadcast important updates to classes, staff, and guardians."
      primaryActionLabel="Publish Announcement"
      primaryActionHref="/communication/messages"
      secondaryActionLabel="Messages"
      secondaryActionHref="/communication/messages"
      rows={createPlaceholderRows("announcement")}
    />
  );
}
