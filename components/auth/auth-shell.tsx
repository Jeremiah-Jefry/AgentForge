"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";

export function AuthShell({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const { toast } = useToast();
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(78,107,255,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(51,209,255,0.16),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(78,107,255,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(51,209,255,0.16),transparent_30%)] light:bg-[radial-gradient(circle_at_top_left,rgba(78,107,255,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(51,209,255,0.06),transparent_30%)]" />
      <Card className="relative z-10 w-full max-w-md space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xs font-semibold tracking-[0.35em] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition">
            VEXORIUM
          </Link>
          <Button variant="ghost" size="icon" onClick={() => toast("✨ AI assistant coming soon!", "info")}>
            <Sparkles className="size-4 text-cyan-500 dark:text-cyan-200" />
          </Button>
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-[var(--heading)]">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
        </div>
        {children}
        <div className="text-sm text-[var(--text-tertiary)]">{footer}</div>
      </Card>
    </div>
  );
}
