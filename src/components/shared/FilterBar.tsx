"use client";

import { Search } from "lucide-react";
import { Select, type SelectOption } from "@/components/ui/Select";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: Array<{
    key: string;
    label: string;
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
  }>;
  className?: string;
  children?: React.ReactNode;
}

export function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  className,
  children,
}: FilterBarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end">
        <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="flex h-10 w-full rounded-lg border border-border bg-input-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        {filters.map((filter) => (
          <div key={filter.key} className="w-full sm:w-40">
            <Select
              label={filter.label}
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              options={filter.options}
            />
          </div>
        ))}
      </div>
      {children && <div className="flex shrink-0 gap-2">{children}</div>}
    </div>
  );
}
