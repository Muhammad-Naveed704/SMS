import { PanelLayout } from "@/components/layout/PanelLayout";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PanelLayout>{children}</PanelLayout>;
}
