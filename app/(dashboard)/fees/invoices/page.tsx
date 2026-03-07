import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Fee Invoices",
  "Create and manage fee invoices for students and guardians."
);

export default function FeeInvoicesPage() {
  return (
    <RouteShell
      title="Fee Invoices"
      description="Issue and monitor invoice lifecycle, due dates, and reminders."
      primaryActionLabel="New Invoice"
      primaryActionHref="/fees/invoices/INV-001"
      secondaryActionLabel="Collections"
      secondaryActionHref="/fees/collections"
      rows={createPlaceholderRows("invoice")}
    />
  );
}
