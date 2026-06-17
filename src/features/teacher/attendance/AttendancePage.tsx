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
import { teacherQueries } from "@/features/teacher/api/teacher-queries";
import { useTeacherClasses, useTeacherDashboard } from "@/features/teacher/hooks/useTeacherQueries";
import { useToast } from "@/components/ui/Toast";
import type { TeacherAttendanceRecord } from "@/types/teacher-panel.types";
import type { Column } from "@/components/ui/Table";

export function AttendancePage() {
  const toast = useToast();
  const today = new Date().toISOString().split("T")[0];
  const { data: classes = [] } = useTeacherClasses();
  const { data: dashboard } = useTeacherDashboard();
  const [tab, setTab] = useState("daily");
  const [date, setDate] = useState(today);
  const [classId, setClassId] = useState("c4");
  const [subject, setSubject] = useState("Mathematics");
  const [records, setRecords] = useState<TeacherAttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (classes.length && !classes.find((c) => c.classId === classId)) {
      setClassId(classes[0].classId);
    }
  }, [classes, classId]);

  const loadAttendance = async () => {
    setLoading(true);
    try {
      const data = await teacherQueries.attendance(classId, date);
      setRecords(data);
    } finally {
      setLoading(false);
    }
  };

  const setStatus = (studentId: string, status: TeacherAttendanceRecord["status"]) => {
    setRecords((prev) => prev.map((r) => (r.studentId === studentId ? { ...r, status } : r)));
  };

  const columns: Column<TeacherAttendanceRecord>[] = [
    { key: "studentName", header: "Student Name", sortable: true },
    { key: "rollNumber", header: "Roll Number", sortable: true },
    {
      key: "status", header: "Status",
      render: (r) => (
        <div className="flex gap-1">
          {(["present", "absent", "late"] as const).map((s) => (
            <Button key={s} variant={r.status === s ? "primary" : "outline"} size="sm" className="capitalize"
              onClick={() => setStatus(r.studentId, s)}>
              {s}
            </Button>
          ))}
        </div>
      ),
    },
  ];

  const handleSave = () => {
    toast.success("Attendance saved", "Daily attendance recorded successfully.");
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Teacher", href: "/teacher/dashboard" }, { label: "Attendance" }]} />
      <PageHeader title="Attendance" description="Mark daily attendance for your classes" />

      <Tabs tabs={[
        { id: "daily", label: "Daily Attendance" },
        { id: "reports", label: "Reports" },
      ]} activeTab={tab} onChange={setTab} />

      {tab === "daily" && (
        <>
          <div className="grid gap-4 rounded-xl border border-border bg-card p-4 sm:grid-cols-4">
            <DatePicker label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
            <Select label="Class" value={classId} onChange={(e) => setClassId(e.target.value)}
              options={classes.map((c) => ({ label: `${c.name} - ${c.section}`, value: c.classId }))} />
            <Select label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}
              options={[{ label: "Mathematics", value: "Mathematics" }]} />
            <div className="flex items-end">
              <Button className="w-full" loading={loading} onClick={loadAttendance}>Load Students</Button>
            </div>
          </div>
          {records.length > 0 ? (
            <>
              <DataTable columns={columns} data={records} keyExtractor={(r) => r.studentId} />
              <div className="flex flex-wrap items-center justify-end gap-2">
                <Badge variant="success">{records.filter((r) => r.status === "present").length} Present</Badge>
                <Badge variant="danger">{records.filter((r) => r.status === "absent").length} Absent</Badge>
                <Badge variant="warning">{records.filter((r) => r.status === "late").length} Late</Badge>
                <Button onClick={handleSave}>Save Attendance</Button>
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
        <div className="space-y-4">
          <AttendanceChart data={dashboard.attendanceOverview} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border p-4">
              <p className="text-sm text-muted-foreground">Weekly Average</p>
              <p className="mt-1 text-2xl font-semibold">92.5%</p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-sm text-muted-foreground">Monthly Average</p>
              <p className="mt-1 text-2xl font-semibold">91.2%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
