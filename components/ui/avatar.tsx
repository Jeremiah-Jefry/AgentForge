import { cn } from "@/lib/utils";

export function Avatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(78,107,255,0.85),rgba(154,124,255,0.85))] text-sm font-semibold text-white shadow-[0_10px_30px_rgba(78,107,255,0.35)]",
        className,
      )}
    >
      {initials}
    </div>
  );
}
