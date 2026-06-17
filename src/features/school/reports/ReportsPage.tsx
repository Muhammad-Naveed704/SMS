"use client";

import { FileDown, Users, CalendarCheck, Wallet, BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

const REPORTS = [
  { id: "students", title: "Student Report", description: "Enrollment, demographics, and class distribution", icon: Users },
  { id: "attendance", title: "Attendance Report", description: "Daily, monthly, and class-wise attendance", icon: CalendarCheck },
  { id: "fees", title: "Fee Report", description: "Collections, pending dues, and overdue analysis", icon: Wallet },
  { id: "performance", title: "Performance Report", description: "Exam results and academic performance", icon: BarChart3 },
];

export function ReportsPage() {
  const toast = useToast();

  const exportReport = (title: string, format: "pdf" | "excel") => {
    toast.success("Export started", `${title} (${format.toUpperCase()}) will download shortly.`);
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "School", href: "/school/dashboard" }, { label: "Reports" }]} />
      <PageHeader title="Reports" description="Generate and export school reports" />

      <div className="grid gap-4 sm:grid-cols-2">
        {REPORTS.map((report) => (
          <Card key={report.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                  <report.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{report.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{report.description}</p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => exportReport(report.title, "pdf")}>
                      <FileDown className="h-4 w-4" />PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => exportReport(report.title, "excel")}>
                      <FileDown className="h-4 w-4" />Excel
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
