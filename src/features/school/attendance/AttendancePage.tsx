"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";
import { Tabs } from "@/components/ui/Tabs";
import { AttendanceChart } from "@/components/charts/DashboardCharts";
import { schoolQueries } from "@/features/school/api/school-queries";
import { useSchoolClasses, useSchoolDashboardData } from "@/features/school/hooks/useSchoolQueries";
import { useToast } from "@/components/ui/Toast";
import type { AttendanceRecord } from "@/types/school-admin.types";
import type { Column } from "@/components/ui/Table";

export function AttendancePage() {
  const toast = useToast();
  const today = new Date().toISOString().split("T")[0];
  const { data: classes = [] } = useSchoolClasses();
  const { data: dashboard } = useSchoolDashboardData();
  const [tab, setTab] = useState("daily");
  const [date, setDate] = useState(today);
  const [classId, setClassId] = useState("c4");
  const [section, setSection] = useState("A");
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (classes.length && !classId) setClassId(classes[0].id);
  }, [classes, classId]);

  const loadAttendance = async () => {
    if (!classId) return;
    setLoading(true);
    try {
      const data = await schoolQueries.attendance(classId, date);
      setRecords(data);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = (studentId: string) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.studentId === studentId
          ? { ...r, status: r.status === "present" ? "absent" : "present" }
          : r
      )
    );
  };

  const columns: Column<AttendanceRecord>[] = [
    { key: "studentName", header: "Student", sortable: true },
    { key: "rollNumber", header: "Roll No" },
    {
      key: "status",
      header: "Attendance",
      render: (r) => (
        <Button
          variant={r.status === "present" ? "primary" : "outline"}
          size="sm"
          onClick={() => toggleStatus(r.studentId)}
          className="min-w-24 capitalize"
        >
          {r.status}
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "School", href: "/school/dashboard" }, { label: "Attendance" }]} />
      <PageHeader title="Attendance" description="Mark and track daily attendance" />

      <Tabs
        tabs={[
          { id: "daily", label: "Daily Attendance" },
          { id: "reports", label: "Reports" },
        ]}
        activeTab={tab}
        onChange={setTab}
      />

      {tab === "daily" && (
        <>
          <div className="grid gap-4 rounded-xl border border-border bg-card p-4 sm:grid-cols-4">
            <DatePicker label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
            <Select
              label="Class"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              options={classes.map((c) => ({ label: c.name, value: c.id }))}
            />
            <Select
              label="Section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              options={[
                { label: "A", value: "A" },
                { label: "B", value: "B" },
                { label: "C", value: "C" },
              ]}
            />
            <div className="flex items-end">
              <Button className="w-full" loading={loading} onClick={loadAttendance}>
                Load Students
              </Button>
            </div>
          </div>
          {records.length > 0 ? (
            <>
              <DataTable columns={columns} data={records} keyExtractor={(r) => r.studentId} />
              <div className="flex flex-wrap items-center justify-end gap-2">
                <Badge variant="success">
                  {records.filter((r) => r.status === "present").length} Present
                </Badge>
                <Badge variant="danger">
                  {records.filter((r) => r.status === "absent").length} Absent
                </Badge>
                <Button onClick={() => toast.success("Saved", "Attendance saved successfully")}>
                  Save Attendance
                </Button>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-border py-12 text-center text-muted-foreground">
              Select class and click Load Students to mark attendance
            </div>
          )}
        </>
      )}

      {tab === "reports" && dashboard?.attendanceOverview && (
        <AttendanceChart data={dashboard.attendanceOverview} />
      )}
    </div>
  );
}
