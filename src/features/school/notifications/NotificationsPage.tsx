"use client";

import { useState } from "react";
import { Plus, Bell, Mail, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useSchoolNotifications } from "@/features/school/hooks/useSchoolQueries";
import { useToast } from "@/components/ui/Toast";
import { formatRelativeTime } from "@/lib/format";
import type { SchoolNotification } from "@/types/school-admin.types";
import type { Column } from "@/components/ui/Table";

export function NotificationsPage() {
  const toast = useToast();
  const { data: notifications = [], isLoading, isError, refetch } = useSchoolNotifications();
  const [createOpen, setCreateOpen] = useState(false);

  const columns: Column<SchoolNotification>[] = [
    { key: "title", header: "Title", sortable: true },
    { key: "message", header: "Message", className: "max-w-xs truncate" },
    { key: "audience", header: "Audience", render: (r) => <Badge className="capitalize">{r.audience}</Badge> },
    {
      key: "channels",
      header: "Channels",
      render: (r) => (
        <div className="flex gap-1">
          {r.channels.includes("in_app") && <Bell className="h-4 w-4 text-primary" />}
          {r.channels.includes("email") && <Mail className="h-4 w-4 text-primary" />}
          {r.channels.includes("sms") && <MessageSquare className="h-4 w-4 text-primary" />}
        </div>
      ),
    },
    { key: "sentAt", header: "Sent", render: (r) => formatRelativeTime(r.sentAt), sortable: true },
    { key: "status", header: "Status", render: (r) => <Badge variant="success" className="capitalize">{r.status}</Badge> },
  ];

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "School", href: "/school/dashboard" }, { label: "Notifications" }]} />
      <PageHeader title="Notifications" description="Send announcements to teachers, parents, and students"
        action={<Button onClick={() => setCreateOpen(true)}><Plus className="h-4 w-4" />Create Notification</Button>} />
      <DataTable columns={columns} data={notifications} keyExtractor={(n) => n.id} />
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create Notification" size="md">
        <div className="space-y-4">
          <Input label="Title" placeholder="Notification title" />
          <Input label="Message" placeholder="Your message..." />
          <Select label="Audience" options={[
            { label: "All", value: "all" }, { label: "Teachers", value: "teachers" },
            { label: "Parents", value: "parents" }, { label: "Students", value: "students" },
          ]} />
          <div className="space-y-2">
            <p className="text-sm font-medium">Channels</p>
            {["In-app", "Email", "SMS"].map((ch) => (
              <label key={ch} className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked={ch !== "SMS"} className="rounded" /> {ch}
              </label>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={() => { toast.success("Notification sent"); setCreateOpen(false); }}>Send</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
