"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Plus, Pencil, Trash2, Search, CalendarCheck2 } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

interface PlaceholderMetric {
  label: string;
  value: string;
  hint: string;
}

interface PlaceholderRecord {
  id: string;
  name: string;
  status: string;
  updatedAt: string;
}

interface RouteShellClientProps {
  title: string;
  description: string;
  primaryActionLabel: string;
  primaryActionHref: string;
  secondaryActionLabel: string;
  secondaryActionHref: string;
  metrics: PlaceholderMetric[];
  rows: PlaceholderRecord[];
}

interface DemoRecord extends PlaceholderRecord {
  note?: string;
}

const STATUS_OPTIONS = ["Active", "Pending", "Archived"] as const;

function formatLabel(input: string) {
  return input
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (value) => value.toUpperCase());
}

export function RouteShellClient({
  title,
  description,
  primaryActionLabel,
  primaryActionHref,
  secondaryActionLabel,
  secondaryActionHref,
  metrics,
  rows,
}: RouteShellClientProps) {
  const pathname = usePathname();
  const entityKey = useMemo(() => {
    const first = pathname.split("/").filter(Boolean)[0];
    return first || title.toLowerCase().replace(/\s+/g, "-");
  }, [pathname, title]);

  const storageKey = `sms_demo_route_${entityKey}`;

  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [recordName, setRecordName] = useState("");
  const [recordStatus, setRecordStatus] =
    useState<(typeof STATUS_OPTIONS)[number]>("Active");
  const [recordNote, setRecordNote] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const [records, setRecords] = useState<DemoRecord[]>(() => {
    if (typeof window === "undefined") {
      return rows;
    }

    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as DemoRecord[];
        if (parsed.length > 0) {
          return parsed;
        }
      } catch {
        // fallback to initial rows
      }
    }

    localStorage.setItem(storageKey, JSON.stringify(rows));
    return rows;
  });

  const saveRecords = (next: DemoRecord[]) => {
    setRecords(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch =
        record.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        record.id.toLowerCase().includes(searchValue.toLowerCase()) ||
        (record.note ?? "").toLowerCase().includes(searchValue.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || record.status.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, searchValue, statusFilter]);

  const computedMetrics = useMemo(() => {
    const total = records.length;
    const active = records.filter((record) => record.status === "Active").length;
    const pending = records.filter((record) => record.status === "Pending").length;
    const archived = records.filter((record) => record.status === "Archived").length;

    return [
      { label: "Total Records", value: String(total), hint: "Saved locally for preview" },
      {
        label: "Active",
        value: String(active),
        hint: `${total ? Math.round((active / total) * 100) : 0}% active rate`,
      },
      { label: "Pending", value: String(pending), hint: `${archived} archived` },
    ] as PlaceholderMetric[];
  }, [records]);
  const displayedMetrics = useMemo(() => {
    const base = metrics.length > 0 ? metrics : computedMetrics;
    return base.map((metric, index) => ({
      ...metric,
      value: computedMetrics[index]?.value ?? metric.value,
      hint: computedMetrics[index]?.hint ?? metric.hint,
    }));
  }, [computedMetrics, metrics]);

  const attendanceStudents = useMemo(() => {
    if (entityKey !== "attendance") {
      return [];
    }
    if (typeof window === "undefined") {
      return records.slice(0, 8);
    }
    const studentsRaw = localStorage.getItem("sms_demo_route_students");
    if (!studentsRaw) {
      return records.slice(0, 8);
    }
    try {
      const parsed = JSON.parse(studentsRaw) as DemoRecord[];
      return parsed.slice(0, 10);
    } catch {
      return records.slice(0, 8);
    }
  }, [entityKey, records]);

  const upsertRecord = () => {
    if (!recordName.trim()) {
      return;
    }

    const now = new Date().toLocaleString();

    if (editId) {
      const next = records.map((record) =>
        record.id === editId
          ? {
              ...record,
              name: recordName.trim(),
              status: recordStatus,
              note: recordNote.trim(),
              updatedAt: now,
            }
          : record
      );
      saveRecords(next);
      setEditId(null);
    } else {
      const id = `${entityKey}-${Date.now().toString().slice(-6)}`;
      const next: DemoRecord[] = [
        {
          id,
          name: recordName.trim(),
          status: recordStatus,
          note: recordNote.trim(),
          updatedAt: now,
        },
        ...records,
      ];
      saveRecords(next);
    }

    setRecordName("");
    setRecordStatus("Active");
    setRecordNote("");
  };

  const startEdit = (record: DemoRecord) => {
    setEditId(record.id);
    setRecordName(record.name);
    setRecordStatus(
      STATUS_OPTIONS.includes(record.status as (typeof STATUS_OPTIONS)[number])
        ? (record.status as (typeof STATUS_OPTIONS)[number])
        : "Active"
    );
    setRecordNote(record.note ?? "");
  };

  const deleteRecord = (id: string) => {
    saveRecords(records.filter((record) => record.id !== id));
    if (editId === id) {
      setEditId(null);
      setRecordName("");
      setRecordStatus("Active");
      setRecordNote("");
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <Badge variant="outline">Live Frontend Demo</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-xs text-muted-foreground">
            Module: <span className="font-medium text-foreground">{formatLabel(entityKey)}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href={secondaryActionHref}>{secondaryActionLabel}</Link>
          </Button>
          <Button asChild>
            <Link href={primaryActionHref}>{primaryActionLabel}</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {displayedMetrics.map((metric) => (
          <Card key={metric.label} className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <CardHeader className="pb-2">
              <CardDescription>{metric.label}</CardDescription>
              <CardTitle>{metric.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{metric.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="records" className="space-y-4">
        <TabsList>
          <TabsTrigger value="records">Records</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          {entityKey === "attendance" && (
            <TabsTrigger value="mark-attendance">Mark Attendance</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">
                {editId ? "Edit Record" : `Add ${formatLabel(entityKey)} Record`}
              </CardTitle>
              <CardDescription>
                Create, update, and manage records locally without backend.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`${entityKey}-name`}>Name / Title</Label>
                <Input
                  id={`${entityKey}-name`}
                  placeholder={`Enter ${formatLabel(entityKey)} name`}
                  value={recordName}
                  onChange={(event) => setRecordName(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${entityKey}-status`}>Status</Label>
                <select
                  id={`${entityKey}-status`}
                  className="flex h-9 w-full rounded-md border border-border bg-input-background px-3 py-1 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={recordStatus}
                  onChange={(event) =>
                    setRecordStatus(event.target.value as (typeof STATUS_OPTIONS)[number])
                  }
                >
                  {STATUS_OPTIONS.map((statusOption) => (
                    <option key={statusOption} value={statusOption}>
                      {statusOption}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end gap-2">
                <Button type="button" className="w-full" onClick={upsertRecord}>
                  <Plus className="mr-1 h-4 w-4" />
                  {editId ? "Update" : "Add"}
                </Button>
              </div>
              <div className="space-y-2 md:col-span-4">
                <Label htmlFor={`${entityKey}-note`}>Note</Label>
                <Input
                  id={`${entityKey}-note`}
                  placeholder="Optional notes, remarks, or context"
                  value={recordNote}
                  onChange={(event) => setRecordNote(event.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>{formatLabel(entityKey)} Table</CardTitle>
                  <CardDescription>
                    Search, filter, and manage all saved records.
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-8"
                      placeholder="Search records..."
                      value={searchValue}
                      onChange={(event) => setSearchValue(event.target.value)}
                    />
                  </div>
                  <select
                    className="flex h-9 min-w-[140px] rounded-md border border-border bg-input-background px-3 py-1 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No records found for the current filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>{record.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{record.status}</Badge>
                        </TableCell>
                        <TableCell>{record.updatedAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => startEdit(record)}
                            >
                              <Pencil className="mr-1 h-3.5 w-3.5" />
                              Edit
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteRecord(record.id)}
                            >
                              <Trash2 className="mr-1 h-3.5 w-3.5" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow">
          <Card>
            <CardHeader>
              <CardTitle>Operational Workflow</CardTitle>
              <CardDescription>
                Frontend-ready flow inspired by production school SaaS patterns.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border border-border p-3">
                <p className="font-medium">Step 1: Create / import records</p>
                <p className="text-sm text-muted-foreground">
                  Add items from this module and keep data in local browser storage.
                </p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="font-medium">Step 2: Track status updates</p>
                <p className="text-sm text-muted-foreground">
                  Use status filters to mimic real operations and pending queues.
                </p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="font-medium">Step 3: Review + route to related modules</p>
                <p className="text-sm text-muted-foreground">
                  Use quick actions for cross-module navigation and QA testing.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {entityKey === "attendance" && (
          <TabsContent value="mark-attendance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarCheck2 className="h-5 w-5" />
                  Class-wise Attendance Marking
                </CardTitle>
                <CardDescription>
                  Toggle presence from enrolled students and save locally.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-3 md:grid-cols-2">
                  {attendanceStudents.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No students found. Add students first from Students module.
                    </p>
                  ) : (
                    attendanceStudents.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between rounded-lg border border-border p-3"
                      >
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.id}</p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const exists = records.find((item) => item.id === student.id);
                            if (exists) {
                              saveRecords(records.filter((item) => item.id !== student.id));
                              return;
                            }
                            saveRecords([
                              {
                                id: student.id,
                                name: student.name,
                                status: "Active",
                                updatedAt: new Date().toLocaleString(),
                                note: "Present",
                              },
                              ...records,
                            ]);
                          }}
                        >
                          Mark Present
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </section>
  );
}

