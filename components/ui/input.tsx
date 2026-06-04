import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full rounded-2xl border border-[var(--card-inner-border)] bg-[var(--card-inner-bg)] px-4 py-2 text-sm text-[var(--heading)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] outline-none placeholder:text-[var(--text-tertiary)] transition duration-300 focus:border-cyan-400/45 focus:bg-[var(--card-inner-bg)] focus:ring-2 focus:ring-cyan-400/20",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
