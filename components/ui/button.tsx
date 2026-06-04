import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl border text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(88,166,255,0.45)] disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-4 shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border-[var(--border)] bg-[linear-gradient(135deg,rgba(91,140,255,0.45),rgba(154,124,255,0.35))] text-white shadow-[0_12px_40px_rgba(78,107,255,0.22)] hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(78,107,255,0.32)]",
        ghost:
          "border-[var(--card-inner-border)] bg-[var(--card-inner-bg)] text-[var(--heading)] hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-400/10",
        secondary:
          "border-cyan-400/20 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/15",
        outline:
          "border-[var(--border)] bg-transparent text-[var(--heading)] hover:border-violet-400/35 hover:bg-violet-400/10",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-xl px-3",
        lg: "h-12 rounded-2xl px-6 text-sm",
        icon: "size-10 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? "span" : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
