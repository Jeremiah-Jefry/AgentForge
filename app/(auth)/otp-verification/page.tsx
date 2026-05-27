import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OtpVerificationPage() {
  return (
    <AuthShell
      title="Verify OTP"
      description="Enter the 6-digit code sent to your email."
      footer={
        <Link href="/login" className="text-cyan-200">
          Back to login
        </Link>
      }
    >
      <div className="grid gap-3">
        <Input type="text" placeholder="123456" />
        <Button>Verify</Button>
      </div>
    </AuthShell>
  );
}
