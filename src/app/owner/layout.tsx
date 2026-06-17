import { PanelLayout } from "@/components/layout/PanelLayout";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PanelLayout>{children}</PanelLayout>;
}
