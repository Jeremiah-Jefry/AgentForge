"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const handleOAuth = () => {
    toast("OAuth sign-in coming soon", "info");
  };

  return (
    <AuthShell
      title="Welcome back"
      description="Enter your credentials to access your agency dashboard."
      footer={
        <div className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-cyan-500 hover:text-cyan-400 dark:text-cyan-400 dark:hover:text-cyan-300">
            Sign up
          </Link>
        </div>
      }
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--heading)]" htmlFor="email">
            Email
          </label>
          <Input id="email" type="email" placeholder="name@agency.com" required />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[var(--heading)]" htmlFor="password">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-cyan-500 hover:text-cyan-400 dark:text-cyan-400 dark:hover:text-cyan-300 transition"
            >
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button className="w-full" type="submit">
          Login
        </Button>
      </form>

      <div className="relative flex items-center py-2 text-sm text-[var(--text-tertiary)] before:flex-1 before:border-t before:border-[var(--card-inner-border)] before:content-[''] after:flex-1 after:border-t after:border-[var(--card-inner-border)] after:content-['']">
        <span className="px-3">or continue with</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" type="button" onClick={handleOAuth}>
          Google
        </Button>
        <Button variant="outline" type="button" onClick={handleOAuth}>
          <Github className="size-4" />
          GitHub
        </Button>
      </div>
    </AuthShell>
  );
}
