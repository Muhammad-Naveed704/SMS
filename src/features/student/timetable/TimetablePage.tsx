"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Card } from "@/components/ui/Card";
import { useStudentTimetable } from "@/features/student/hooks/useStudentQueries";
import { cn } from "@/lib/utils";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const PERIODS = [1, 2, 3, 4, 5];

export function TimetablePage() {
  const { data: slots = [], isLoading, isError, refetch } = useStudentTimetable();

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  const getSlot = (day: string, period: number) => slots.find((s) => s.day === day && s.period === period);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Student", href: "/student/dashboard" }, { label: "Timetable" }]} />
      <PageHeader title="My Timetable" description="Your weekly class schedule" />

      {/* Desktop grid */}
      <div className="hidden overflow-x-auto rounded-xl border border-border md:block">
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Period</th>
              {DAYS.map((d) => <th key={d} className="px-4 py-3 text-left font-medium text-muted-foreground">{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {PERIODS.map((period) => (
              <tr key={period} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-muted-foreground">
                  P{period}
                  {slots.find((s) => s.period === period) && (
                    <span className="block text-xs">{slots.find((s) => s.period === period)?.startTime}</span>
                  )}
                </td>
                {DAYS.map((day) => {
                  const slot = getSlot(day, period);
                  return (
                    <td key={day} className="px-2 py-2">
                      {slot ? (
                        <Card padding="sm" className="bg-primary/5">
                          <p className="font-medium">{slot.subject}</p>
                          <p className="text-xs text-muted-foreground">{slot.teacherName}</p>
                          <p className="text-xs text-muted-foreground">{slot.startTime}-{slot.endTime} · {slot.room}</p>
                        </Card>
                      ) : (
                        <div className={cn("rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground")}>Free</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-4 md:hidden">
        {DAYS.map((day) => {
          const daySlots = slots.filter((s) => s.day === day);
          if (!daySlots.length) return null;
          return (
            <Card key={day} padding="md">
              <h3 className="mb-3 font-semibold">{day}</h3>
              <div className="space-y-2">
                {daySlots.map((slot) => (
                  <div key={slot.id} className="rounded-lg border border-border p-3">
                    <div className="flex justify-between">
                      <span className="font-medium">{slot.subject}</span>
                      <span className="text-xs text-muted-foreground">{slot.startTime}-{slot.endTime}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{slot.teacherName} · Room {slot.room}</p>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
