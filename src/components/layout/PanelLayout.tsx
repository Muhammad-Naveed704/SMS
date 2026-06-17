"use client";

import { AppLayout } from "@/components/layout/AppLayout";

interface PanelLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function PanelLayout({ children, title, description }: PanelLayoutProps) {
  return (
    <AppLayout title={title} description={description}>
      {children}
    </AppLayout>
  );
}
