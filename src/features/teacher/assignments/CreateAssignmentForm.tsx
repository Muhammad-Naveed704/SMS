"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/Button";
import { useTeacherClasses } from "@/features/teacher/hooks/useTeacherQueries";

const schema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  classId: z.string().min(1, "Select a class"),
  section: z.string().min(1, "Select a section"),
  subject: z.string().min(1, "Subject is required"),
  dueDate: z.string().min(1, "Due date is required"),
});

export type CreateAssignmentFormValues = z.infer<typeof schema>;

interface CreateAssignmentFormProps {
  onSubmit: (values: CreateAssignmentFormValues) => void;
  loading?: boolean;
}

export function CreateAssignmentForm({ onSubmit, loading }: CreateAssignmentFormProps) {
  const { data: classes = [] } = useTeacherClasses();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CreateAssignmentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { subject: "Mathematics", classId: classes[0]?.classId ?? "c4", section: classes[0]?.section ?? "A" },
  });

  const classId = watch("classId");
  const sections = classes.filter((c) => c.classId === classId).map((c) => ({ label: `Section ${c.section}`, value: c.section }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Title" placeholder="Assignment title" error={errors.title?.message} {...register("title")} />
      <Input label="Description" placeholder="Assignment instructions..." error={errors.description?.message} {...register("description")} />
      <Select label="Class" error={errors.classId?.message} {...register("classId")}
        options={Array.from(new Map(classes.map((c) => [c.classId, { label: c.name, value: c.classId }])).values())}
        onChange={(e) => { setValue("classId", e.target.value); setValue("section", classes.find((c) => c.classId === e.target.value)?.section ?? "A"); }} />
      <Select label="Section" error={errors.section?.message} {...register("section")} options={sections.length ? sections : [{ label: "A", value: "A" }]} />
      <Input label="Subject" error={errors.subject?.message} {...register("subject")} />
      <DatePicker label="Due Date" error={errors.dueDate?.message} {...register("dueDate")} />
      <div className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
        Attachment upload — drag & drop or click to browse
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit" loading={loading}>Create Assignment</Button>
      </div>
    </form>
  );
}
