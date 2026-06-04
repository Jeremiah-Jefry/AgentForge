"use client";

import { cn } from "@/lib/utils";

export function Switch({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-7 w-12 items-center rounded-full border transition duration-300",
        checked
          ? "border-cyan-400/30 bg-cyan-400/20"
          : "border-[var(--card-inner-border)] bg-[var(--card-inner-bg)]",
      )}
    >
      <span
        className={cn(
          "block size-5 rounded-full shadow transition duration-300",
          checked
            ? "translate-x-6 bg-white"
            : "translate-x-1 bg-[var(--text-secondary)]",
        )}
      />
    </button>
  );
}
