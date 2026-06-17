import { Card } from "@/components/ui/Card";

export function PageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-48 rounded bg-muted" />
        <div className="h-4 w-72 rounded bg-muted" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <div className="h-20 rounded bg-muted" />
          </Card>
        ))}
      </div>
      <Card>
        <div className="h-64 rounded bg-muted" />
      </Card>
    </div>
  );
}
