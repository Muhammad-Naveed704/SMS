"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";
import { useCreateStudent, useSchoolClasses } from "@/features/school/hooks/useSchoolQueries";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

const schema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  dateOfBirth: z.string().min(1, "Required"),
  gender: z.enum(["male", "female", "other"]),
  classId: z.string().min(1, "Select class"),
  section: z.string().min(1, "Required"),
  rollNumber: z.string().min(1, "Required"),
  admissionDate: z.string().min(1, "Required"),
  parentName: z.string().min(2, "Required"),
  parentPhone: z.string().min(5, "Required"),
  parentEmail: z.string().email().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;
const STEPS = ["Basic Info", "Academic", "Parent", "Confirm"];

export function AddStudentWizard({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const createStudent = useCreateStudent();
  const { data: classes = [] } = useSchoolClasses();
  const toast = useToast();

  const { register, handleSubmit, trigger, watch, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { gender: "male", admissionDate: new Date().toISOString().split("T")[0] },
  });

  const fields: (keyof FormValues)[][] = [
    ["firstName", "lastName", "dateOfBirth", "gender"],
    ["classId", "section", "rollNumber", "admissionDate"],
    ["parentName", "parentPhone", "parentEmail"],
    [],
  ];

  const values = watch();
  const selectedClass = classes.find((c) => c.id === values.classId);

  const onSubmit = async (data: FormValues) => {
    try {
      await createStudent.mutateAsync({ ...data, parentEmail: data.parentEmail || undefined });
      setDone(true);
      toast.success("Student enrolled", `${data.firstName} ${data.lastName} added successfully.`);
    } catch {
      toast.error("Failed", "Could not add student.");
    }
  };

  const close = () => { reset(); setStep(0); setDone(false); onClose(); };

  return (
    <Modal open={open} onClose={close} title={done ? "Enrollment Complete" : "Add Student"} size="lg"
      description={done ? undefined : `Step ${step + 1}: ${STEPS[step]}`}>
      {done ? (
        <div className="flex flex-col items-center py-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-success" />
          <h3 className="mt-4 text-lg font-semibold">Student enrolled successfully</h3>
          <Button className="mt-6" onClick={close}>Done</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 flex gap-2">
            {STEPS.map((l, i) => (
              <div key={l} className="flex flex-1 flex-col items-center gap-1">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold", i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{i + 1}</div>
                <span className="text-xs text-muted-foreground">{l}</span>
              </div>
            ))}
          </div>
          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="First Name" error={errors.firstName?.message} {...register("firstName")} />
              <Input label="Last Name" error={errors.lastName?.message} {...register("lastName")} />
              <DatePicker label="Date of Birth" error={errors.dateOfBirth?.message} {...register("dateOfBirth")} />
              <Select label="Gender" options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }, { label: "Other", value: "other" }]} error={errors.gender?.message} {...register("gender")} />
            </div>
          )}
          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Select label="Class" options={classes.map((c) => ({ label: c.name, value: c.id }))} placeholder="Select class" error={errors.classId?.message} {...register("classId")} />
              <Select label="Section" options={(selectedClass?.sections ?? ["A", "B"]).map((s) => ({ label: s, value: s }))} error={errors.section?.message} {...register("section")} />
              <Input label="Roll Number" error={errors.rollNumber?.message} {...register("rollNumber")} />
              <DatePicker label="Admission Date" error={errors.admissionDate?.message} {...register("admissionDate")} />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <Input label="Parent Name" error={errors.parentName?.message} {...register("parentName")} />
              <Input label="Parent Phone" error={errors.parentPhone?.message} {...register("parentPhone")} />
              <Input label="Parent Email" type="email" error={errors.parentEmail?.message} {...register("parentEmail")} />
            </div>
          )}
          {step === 3 && (
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm space-y-2">
              <p><span className="text-muted-foreground">Name:</span> {values.firstName} {values.lastName}</p>
              <p><span className="text-muted-foreground">Class:</span> {selectedClass?.name} - {values.section}</p>
              <p><span className="text-muted-foreground">Roll No:</span> {values.rollNumber}</p>
              <p><span className="text-muted-foreground">Parent:</span> {values.parentName} ({values.parentPhone})</p>
            </div>
          )}
          <div className="mt-6 flex justify-between">
            <Button type="button" variant="outline" onClick={() => step > 0 ? setStep((s) => s - 1) : close()}>
              <ChevronLeft className="h-4 w-4" />{step > 0 ? "Back" : "Cancel"}
            </Button>
            {step < 3 ? (
              <Button type="button" onClick={async () => { if (await trigger(fields[step])) setStep((s) => s + 1); }}>
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" loading={createStudent.isPending}>Confirm Enrollment</Button>
            )}
          </div>
        </form>
      )}
    </Modal>
  );
}
