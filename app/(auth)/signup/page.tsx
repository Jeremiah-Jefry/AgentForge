import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create your workspace"
      description="Launch your agency OS in seconds."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-200">
            Login
          </Link>
        </>
      }
    >
      <div className="grid gap-3">
        <Input type="text" placeholder="Full name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button>Start free</Button>
      </div>
    </AuthShell>
  );
}
