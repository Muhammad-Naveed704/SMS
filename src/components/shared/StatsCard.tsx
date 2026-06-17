import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
  loading?: boolean;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  loading = false,
}: StatsCardProps) {
  const changeColors = {
    positive: "text-success",
    negative: "text-danger",
    neutral: "text-muted-foreground",
  };

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          {loading ? (
            <div className="mt-2 h-8 w-24 animate-pulse rounded bg-muted" />
          ) : (
            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              {value}
            </p>
          )}
          {change && !loading && (
            <p className={cn("mt-1 text-xs", changeColors[changeType])}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="shrink-0 rounded-lg bg-primary/10 p-2.5 text-primary">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
