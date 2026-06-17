import { PanelLayout } from "@/components/layout/PanelLayout";

export default function SchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PanelLayout>{children}</PanelLayout>;
}
