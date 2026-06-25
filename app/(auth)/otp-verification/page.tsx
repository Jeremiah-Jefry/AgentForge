"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { otpSchema, type OtpValues } from "@/lib/validation";

export default function OtpVerificationPage() {
  const router = useRouter();

  const form = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  const handleVerify = () => {
    router.push("/dashboard");
  };

  return (
    <AuthShell
      title="Check your email"
      description="We've sent a 6-digit verification code to your email address."
      footer={
        <div className="text-center">
          Didn&apos;t receive a code?{" "}
          <button
            type="button"
            className="font-medium text-cyan-500 hover:text-cyan-400 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            Resend
          </button>
        </div>
      }
    >
      <form
        onSubmit={form.handleSubmit(handleVerify)}
        className="space-y-6"
        noValidate
      >
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-[var(--heading)]"
            htmlFor="code"
          >
            Verification code
          </label>

          <Input
            id="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="123456"
            maxLength={6}
            {...form.register("code")}
            aria-invalid={!!form.formState.errors.code}
            className={[
              "text-center text-lg tracking-[0.35em]",
              form.formState.errors.code
                ? "border-red-400/40 focus:border-red-400 focus:ring-red-400/20"
                : null,
            ]
              .filter(Boolean)
              .join(" ")}
          />

          <p className="text-xs text-[var(--text-tertiary)]">
            Enter the 6-digit code from your inbox.
          </p>

          {form.formState.errors.code ? (
            <p className="text-xs text-red-400">
              {form.formState.errors.code.message}
            </p>
          ) : null}
        </div>

        <Button
          className="w-full"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          Verify
        </Button>
      </form>
    </AuthShell>
  );
}