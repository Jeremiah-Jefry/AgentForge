"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OtpVerificationPage() {
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <AuthShell
      title="Check your email"
      description="We've sent a 6-digit verification code to your email address."
      footer={
        <div className="text-center">
          Didn&apos;t receive a code?{" "}
          <button type="button" className="font-medium text-cyan-500 hover:text-cyan-400 dark:text-cyan-400 dark:hover:text-cyan-300">
            Resend
          </button>
        </div>
      }
    >
      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex justify-between gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Input
              key={i}
              className="h-12 w-12 text-center text-lg md:h-14 md:w-14"
              maxLength={1}
              required
            />
          ))}
        </div>
        <Button className="w-full" type="submit">
          Verify
        </Button>
      </form>
    </AuthShell>
  );
}
