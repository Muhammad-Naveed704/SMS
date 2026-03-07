import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Fees",
  "Manage fee structures, dues, and payment tracking workflows."
);

export default function FeesPage() {
  return (
    <RouteShell
      title="Fees"
      description="Monitor fee plans, outstanding balances, and collection status."
      primaryActionLabel="Collections"
      primaryActionHref="/fees/collections"
      secondaryActionLabel="Invoices"
      secondaryActionHref="/fees/invoices"
      rows={createPlaceholderRows("fees")}
    />
  );
}
