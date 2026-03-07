import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Messages",
  "Manage direct communication between school staff, parents, and students."
);

export default function MessagesPage() {
  return (
    <RouteShell
      title="Messages"
      description="Coordinate school communication through secure in-app messaging."
      primaryActionLabel="New Message"
      primaryActionHref="/communication/announcements"
      secondaryActionLabel="Announcements"
      secondaryActionHref="/communication/announcements"
      rows={createPlaceholderRows("message")}
    />
  );
}
