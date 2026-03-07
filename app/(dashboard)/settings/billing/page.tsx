import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Billing Settings",
  "Manage subscription, invoicing preferences, and billing controls."
);

export default function BillingSettingsPage() {
  return (
    <RouteShell
      title="Billing Settings"
      description="Configure subscription plans, billing contacts, and payment methods."
      primaryActionLabel="View Fee Reports"
      primaryActionHref="/fees/reports"
      secondaryActionLabel="Back to Settings"
      secondaryActionHref="/settings"
      rows={createPlaceholderRows("settings-billing")}
    />
  );
}
