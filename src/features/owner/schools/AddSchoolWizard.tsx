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
import { useCreateSchool } from "@/features/owner/hooks/useOwnerQueries";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

const schema = z.object({
  schoolName: z.string().min(2, "School name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(5, "Phone is required"),
  address: z.string().min(3, "Address is required"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  adminName: z.string().min(2, "Admin name is required"),
  adminEmail: z.string().email("Valid email required"),
  adminPassword: z.string().min(8, "Min 8 characters"),
  plan: z.enum(["starter", "professional", "enterprise"]),
  startDate: z.string().min(1, "Start date required"),
  expiryDate: z.string().min(1, "Expiry date required"),
});

type FormValues = z.infer<typeof schema>;

const STEPS = ["School Info", "Admin Account", "Subscription"];

interface AddSchoolWizardProps {
  open: boolean;
  onClose: () => void;
}

export function AddSchoolWizard({ open, onClose }: AddSchoolWizardProps) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const createSchool = useCreateSchool();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      plan: "starter",
      startDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(Date.now() + 365 * 86400000).toISOString().split("T")[0],
    },
  });

  const fieldsPerStep: (keyof FormValues)[][] = [
    ["schoolName", "email", "phone", "address", "country", "city"],
    ["adminName", "adminEmail", "adminPassword"],
    ["plan", "startDate", "expiryDate"],
  ];

  const next = async () => {
    const valid = await trigger(fieldsPerStep[step]);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      await createSchool.mutateAsync(values);
      setDone(true);
      toast.success("School created", `${values.schoolName} has been onboarded.`);
    } catch {
      toast.error("Failed", "Could not create school. Please try again.");
    }
  };

  const handleClose = () => {
    reset();
    setStep(0);
    setDone(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={done ? "School Created" : "Add New School"}
      description={done ? undefined : `Step ${step + 1} of ${STEPS.length}: ${STEPS[step]}`}
      size="lg"
    >
      {done ? (
        <div className="flex flex-col items-center py-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-success" />
          <h3 className="mt-4 text-lg font-semibold">School onboarded successfully</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            The school admin can now log in with their credentials.
          </p>
          <Button className="mt-6" onClick={handleClose}>Done</Button>
        </div>
      ) : (
        <>
          <div className="mb-6 flex gap-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold",
                    i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}
                >
                  {i + 1}
                </div>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {step === 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="School Name" error={errors.schoolName?.message} {...register("schoolName")} />
                <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
                <Input label="Phone" error={errors.phone?.message} {...register("phone")} />
                <Input label="Country" error={errors.country?.message} {...register("country")} />
                <Input label="City" error={errors.city?.message} {...register("city")} />
                <Input label="Address" className="sm:col-span-2" error={errors.address?.message} {...register("address")} />
              </div>
            )}
            {step === 1 && (
              <div className="space-y-4">
                <Input label="Admin Name" error={errors.adminName?.message} {...register("adminName")} />
                <Input label="Admin Email" type="email" error={errors.adminEmail?.message} {...register("adminEmail")} />
                <Input label="Password" type="password" error={errors.adminPassword?.message} {...register("adminPassword")} />
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <Select
                  label="Plan"
                  options={[
                    { label: "Starter — $49/mo", value: "starter" },
                    { label: "Professional — $99/mo", value: "professional" },
                    { label: "Enterprise — $249/mo", value: "enterprise" },
                  ]}
                  error={errors.plan?.message}
                  {...register("plan")}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Start Date" type="date" error={errors.startDate?.message} {...register("startDate")} />
                  <Input label="Expiry Date" type="date" error={errors.expiryDate?.message} {...register("expiryDate")} />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => (step > 0 ? setStep((s) => s - 1) : handleClose())}
              >
                <ChevronLeft className="h-4 w-4" />
                {step > 0 ? "Back" : "Cancel"}
              </Button>
              {step < STEPS.length - 1 ? (
                <Button type="button" onClick={next}>
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" loading={createSchool.isPending}>
                  Create School
                </Button>
              )}
            </div>
          </form>
        </>
      )}
    </Modal>
  );
}
