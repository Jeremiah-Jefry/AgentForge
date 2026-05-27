import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to your VEXORIUM workspace."
      footer={
        <>
          No account?{" "}
          <Link href="/signup" className="text-cyan-200">
            Create one
          </Link>
        </>
      }
    >
      <div className="grid gap-3">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <div className="flex items-center justify-between text-sm text-zinc-500">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>
          <Link href="/forgot-password" className="text-cyan-200">
            Forgot password?
          </Link>
        </div>
        <Button>Login</Button>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="ghost">Google</Button>
          <Button variant="ghost">GitHub</Button>
        </div>
      </div>
    </AuthShell>
  );
}
