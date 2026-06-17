import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/Card";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div>
      <PageHeader title={title} description={description} />
      <Card>
        <p className="text-sm text-muted-foreground">
          This module is scaffolded and ready for implementation.
        </p>
      </Card>
    </div>
  );
}
