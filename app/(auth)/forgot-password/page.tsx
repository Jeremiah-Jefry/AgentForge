"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export default function ForgotPasswordPage() {
  const { toast } = useToast();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Reset link sent! Check your inbox.", "success");
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
      <form onSubmit={handleReset} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--heading)]" htmlFor="email">
            Email
          </label>
          <Input id="email" type="email" placeholder="name@agency.com" required />
        </div>
        <Button className="w-full" type="submit">
          Send reset link
        </Button>
      </form>
    </AuthShell>
  );
}
