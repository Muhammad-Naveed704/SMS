"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardContent } from "@/components/ui/Card";
import { useTeacherExams, useTeacherClasses, useTeacherMarks, useSaveMarks } from "@/features/teacher/hooks/useTeacherQueries";
import { useToast } from "@/components/ui/Toast";
import type { TeacherMarkEntry } from "@/types/teacher-panel.types";

export function ResultsPage() {
  const toast = useToast();
  const searchParams = useSearchParams();
  const { data: exams = [] } = useTeacherExams();
  const { data: classes = [] } = useTeacherClasses();
  const [examId, setExamId] = useState(searchParams.get("exam") ?? "");
  const [classId, setClassId] = useState(searchParams.get("class") ?? "c4");
  const [subject, setSubject] = useState("Mathematics");
  const [entries, setEntries] = useState<TeacherMarkEntry[]>([]);

  const { data: marks, isLoading, isError, refetch } = useTeacherMarks(examId, classId);
  const saveMarks = useSaveMarks();

  useEffect(() => {
    if (marks) setEntries(marks);
  }, [marks]);

  useEffect(() => {
    if (!examId && exams.length) setExamId(exams[0].id);
    if (!classId && classes.length) setClassId(classes[0].classId);
  }, [exams, classes, examId, classId]);

  const selectedExam = exams.find((e) => e.id === examId);
  const totalMarks = selectedExam?.totalMarks ?? 100;

  const updateMarks = (studentId: string, value: string) => {
    const marksVal = value === "" ? null : Math.min(totalMarks, Math.max(0, Number(value)));
    setEntries((prev) =>
      prev.map((e) => {
        if (e.studentId !== studentId) return e;
        const grade = marksVal == null ? "-" : calcGrade(marksVal, totalMarks);
        return { ...e, marks: marksVal, grade };
      })
    );
  };

  const handleSave = async () => {
    const valid = entries.filter((e) => e.marks != null);
    if (!valid.length) {
      toast.error("Enter marks for at least one student");
      return;
    }
    try {
      await saveMarks.mutateAsync({
        examId,
        classId,
        subject,
        entries: valid.map((e) => ({ studentId: e.studentId, marks: e.marks! })),
      });
      toast.success("Results saved", "Marks have been recorded successfully.");
    } catch {
      toast.error("Failed to save results");
    }
  };

  if (isLoading && examId) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Teacher", href: "/teacher/dashboard" }, { label: "Results" }]} />
      <PageHeader title="Enter Marks" description="Record exam results for your students" />

      <div className="grid gap-4 rounded-xl border border-border bg-card p-4 sm:grid-cols-3">
        <Select label="Exam" value={examId} onChange={(e) => setExamId(e.target.value)}
          options={exams.map((e) => ({ label: e.name, value: e.id }))} />
        <Select label="Class" value={classId} onChange={(e) => setClassId(e.target.value)}
          options={Array.from(new Map(classes.map((c) => [c.classId, { label: c.name, value: c.classId }])).values())} />
        <Select label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}
          options={[{ label: "Mathematics", value: "Mathematics" }]} />
      </div>

      {examId && entries.length > 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Student</th>
                    <th className="pb-3 pr-4 font-medium">Roll No</th>
                    <th className="pb-3 pr-4 font-medium">Marks / {totalMarks}</th>
                    <th className="pb-3 font-medium">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((e) => (
                    <tr key={e.studentId} className="border-b border-border last:border-0">
                      <td className="py-3 pr-4 font-medium">{e.studentName}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{e.rollNumber}</td>
                      <td className="py-3 pr-4">
                        <Input
                          type="number"
                          min={0}
                          max={totalMarks}
                          className="w-24"
                          value={e.marks ?? ""}
                          onChange={(ev) => updateMarks(e.studentId, ev.target.value)}
                        />
                      </td>
                      <td className="py-3 font-medium">{e.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleSave} loading={saveMarks.isPending}>Save Results</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-xl border border-dashed border-border py-12 text-center text-muted-foreground">
          Select an exam and class to enter marks
        </div>
      )}
    </div>
  );
}

function calcGrade(marks: number, total: number): string {
  const pct = (marks / total) * 100;
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B";
  if (pct >= 60) return "C";
  if (pct >= 50) return "D";
  return "F";
}
