"use client";

import { Select } from "@/components/ui/Select";
import type { ParentChild } from "@/types/parent-panel.types";

interface ChildSwitcherProps {
  children: ParentChild[];
  value: string;
  onChange: (childId: string) => void;
  label?: string;
  showAll?: boolean;
}

export function ChildSwitcher({ children, value, onChange, label = "Select Child", showAll = false }: ChildSwitcherProps) {
  const options = [
    ...(showAll ? [{ label: "All Children", value: "all" }] : []),
    ...children.map((c) => ({
      label: `${c.firstName} ${c.lastName} (${c.className} - ${c.section})`,
      value: c.id,
    })),
  ];

  return (
    <Select
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={options}
    />
  );
}
