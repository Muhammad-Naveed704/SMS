"use client";

import Link from "next/link";
import {
  Users,
  CalendarCheck,
  Wallet,
  ClipboardList,
  Bell,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { StatsCard } from "@/components/shared/StatsCard";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { AttendanceTrendChart } from "./AttendanceTrendChart";
import { PerformanceTrendChart } from "./PerformanceTrendChart";
import { useParentDashboard } from "@/features/parent/hooks/useParentQueries";
import { cn, formatCurrency, formatPercentage, getInitials } from "@/lib/utils";

const feeVariant = (s: string) => (s === "paid" ? "success" : s === "overdue" ? "danger" : "warning");

export function ParentDashboard() {
  const { data, isLoading, isError, refetch } = useParentDashboard();

  if (isLoading) return <PageSkeleton />;
  if (isError || !data) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Parent", href: "/parent/dashboard" }, { label: "Dashboard" }]} />
      <PageHeader title="Parent Dashboard" description="Monitor your children's progress, fees, and school updates" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatsCard title="Total Children" value={data.totalChildren} icon={<Users className="h-5 w-5" />} />
        <StatsCard title="Attendance" value={formatPercentage(data.attendancePercentage)} icon={<CalendarCheck className="h-5 w-5" />} changeType="positive" />
        <StatsCard title="Pending Fees" value={formatCurrency(data.pendingFees)} icon={<Wallet className="h-5 w-5" />} changeType="negative" />
        <StatsCard title="Upcoming Exams" value={data.upcomingExams} icon={<ClipboardList className="h-5 w-5" />} />
        <StatsCard title="New Notifications" value={data.newNotifications} icon={<Bell className="h-5 w-5" />} />
      </div>

      <div>
        <h3 className="mb-4 text-base font-semibold">Your Children</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.children.map((child) => (
            <Card key={child.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                    {getInitials(`${child.firstName} ${child.lastName}`)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold">{child.firstName} {child.lastName}</h4>
                    <p className="text-sm text-muted-foreground">{child.className} — Section {child.section}</p>
                    <p className="text-xs text-muted-foreground">Roll No: {child.rollNumber}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="success">{formatPercentage(child.attendancePercent)} attendance</Badge>
                      <Badge variant={feeVariant(child.feeStatus)} className="capitalize">{child.feeStatus}</Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href="/parent/fees" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>Pay Fee</Link>
                  <Link href="/parent/results" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>View Result</Link>
                  <Link href="/parent/attendance" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>Check Attendance</Link>
                  <Link href={`/parent/children/${child.id}`} className={cn(buttonVariants({ variant: "primary", size: "sm" }))}>View Details</Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <AttendanceTrendChart data={data.attendanceTrend} />
        <PerformanceTrendChart data={data.performanceTrend} />
      </div>

      <Card>
        <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Link href="/parent/fees" className={cn(buttonVariants({ variant: "outline" }))}><Wallet className="h-4 w-4" />Pay Fee</Link>
          <Link href="/parent/results" className={cn(buttonVariants({ variant: "outline" }))}><ClipboardList className="h-4 w-4" />View Results</Link>
          <Link href="/parent/attendance" className={cn(buttonVariants({ variant: "outline" }))}><CalendarCheck className="h-4 w-4" />Check Attendance</Link>
          <Link href="/parent/notifications" className={cn(buttonVariants({ variant: "outline" }))}><Bell className="h-4 w-4" />Notifications</Link>
        </CardContent>
      </Card>
    </div>
  );
}
