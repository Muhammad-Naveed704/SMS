import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Fee Collections",
  "Track incoming fee payments and daily collection performance."
);

export default function FeeCollectionsPage() {
  return (
    <RouteShell
      title="Fee Collections"
      description="Review collection channels, receipts, and pending recovery actions."
      primaryActionLabel="Generate Receipt"
      primaryActionHref="/fees/invoices"
      secondaryActionLabel="Fee Reports"
      secondaryActionHref="/fees/reports"
      rows={createPlaceholderRows("fee-collection")}
    />
  );
}
