export function RouteSectionLoading() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-1/3 animate-pulse rounded bg-muted" />
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-24 animate-pulse rounded-xl border border-border bg-card"
          />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-xl border border-border bg-card" />
    </div>
  );
}
