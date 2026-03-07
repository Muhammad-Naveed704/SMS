import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Invoice Detail",
  "View invoice breakdown, student linkage, and payment status."
);

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <RouteShell
      title={`Invoice ${id}`}
      description="Inspect invoice line items and settlement history."
      primaryActionLabel="View Collections"
      primaryActionHref="/fees/collections"
      secondaryActionLabel="All Invoices"
      secondaryActionHref="/fees/invoices"
      rows={createPlaceholderRows(`invoice-${id}`)}
    />
  );
}
