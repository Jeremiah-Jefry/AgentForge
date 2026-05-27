import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset password"
      description="We'll send recovery instructions to your email."
      footer={
        <Link href="/login" className="text-cyan-200">
          Back to login
        </Link>
      }
    >
      <div className="grid gap-3">
        <Input type="email" placeholder="Email" />
        <Button>Send reset link</Button>
      </div>
    </AuthShell>
  );
}
