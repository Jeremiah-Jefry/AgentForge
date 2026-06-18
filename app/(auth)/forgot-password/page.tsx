"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/lib/validation";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const handleReset = (values: ForgotPasswordValues) => {
    void values;
    toast("Reset link sent! Check your inbox.", "success");
    form.reset();
  };

  return (
    <AuthShell
      title="Reset password"
      description="Enter your email to receive a password reset link."
      footer={
        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--heading)] transition"
          >
            <MoveLeft className="size-4" />
            Back to login
          </Link>
        </div>
      }
    >
      <form onSubmit={form.handleSubmit(handleReset)} className="space-y-4" noValidate>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--heading)]" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="name@agency.com"
            {...form.register("email")}
            aria-invalid={!!form.formState.errors.email}
            className={form.formState.errors.email ? "border-red-400/40 focus:border-red-400 focus:ring-red-400/20" : undefined}
          />
          {form.formState.errors.email ? (
            <p className="text-xs text-red-400">{form.formState.errors.email.message}</p>
          ) : null}
        </div>
        <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
          Send reset link
        </Button>
      </form>
    </AuthShell>
  );
}
