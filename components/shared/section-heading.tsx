import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl space-y-4", className)}>
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--heading)] md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="text-base leading-7 text-[var(--text-secondary)] md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
