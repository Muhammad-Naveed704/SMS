import { PanelLayout } from "@/components/layout/PanelLayout";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PanelLayout>{children}</PanelLayout>;
}
