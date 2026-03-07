import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Integration Settings",
  "Manage third-party integrations used across the school platform."
);

export default function IntegrationSettingsPage() {
  return (
    <RouteShell
      title="Integration Settings"
      description="Connect communication, payment, and productivity integrations."
      primaryActionLabel="Configure Integrations"
      primaryActionHref="/communication/announcements"
      secondaryActionLabel="Back to Settings"
      secondaryActionHref="/settings"
      rows={createPlaceholderRows("settings-integrations")}
    />
  );
}
