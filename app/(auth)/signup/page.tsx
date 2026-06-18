"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { registerUser } from "@/lib/actions/auth";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { signupSchema, type SignupValues } from "@/lib/validation";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const handleSignup = async (values: SignupValues) => {
    try {
      const result = await registerUser({
        email: values.email,
        password: values.password,
        name: `${values.firstName} ${values.lastName}`.trim(),
      });

      if ("error" in result && result.error) {
        form.setError("root", { message: result.error });
        toast(result.error, "error");
      } else {
        // Auto sign-in after registration
        const signInResult = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (signInResult?.error) {
          toast("Account created! Please log in.", "success");
          router.push("/login");
        } else {
          toast("Welcome to VEXORIUM!", "success");
          router.push("/dashboard");
          router.refresh();
        }
      }
    } catch {
      form.setError("root", { message: "Something went wrong. Please try again." });
      toast("An unexpected error occurred.", "error");
    }
  };

  const handleOAuth = () => {
    toast("OAuth providers require API keys. Configure in production.", "info");
  };

  return (
    <AuthShell
      title="Create account"
      description="Start your free trial. No credit card required."
      footer={
        <div className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-cyan-500 hover:text-cyan-400 dark:text-cyan-400 dark:hover:text-cyan-300">
            Log in
          </Link>
        </div>
      }
    >
      <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4" noValidate>
        {form.formState.errors.root ? (
          <div className="rounded-xl border border-red-400/25 bg-red-400/8 px-4 py-3 text-sm text-red-400">
            {form.formState.errors.root.message}
          </div>
        ) : null}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--heading)]" htmlFor="firstName">
              First name
            </label>
            <Input
              id="firstName"
              placeholder="Alex"
              {...form.register("firstName")}
              aria-invalid={!!form.formState.errors.firstName}
              className={form.formState.errors.firstName ? "border-red-400/40 focus:border-red-400 focus:ring-red-400/20" : undefined}
            />
            {form.formState.errors.firstName ? (
              <p className="text-xs text-red-400">{form.formState.errors.firstName.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--heading)]" htmlFor="lastName">
              Last name
            </label>
            <Input
              id="lastName"
              placeholder="Johnson"
              {...form.register("lastName")}
              aria-invalid={!!form.formState.errors.lastName}
              className={form.formState.errors.lastName ? "border-red-400/40 focus:border-red-400 focus:ring-red-400/20" : undefined}
            />
            {form.formState.errors.lastName ? (
              <p className="text-xs text-red-400">{form.formState.errors.lastName.message}</p>
            ) : null}
          </div>
        </div>
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
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--heading)]" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Min 6 characters"
            {...form.register("password")}
            aria-invalid={!!form.formState.errors.password}
            className={form.formState.errors.password ? "border-red-400/40 focus:border-red-400 focus:ring-red-400/20" : undefined}
          />
          {form.formState.errors.password ? (
            <p className="text-xs text-red-400">{form.formState.errors.password.message}</p>
          ) : null}
        </div>
        <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Creating account..." : "Start free"}
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
          <GithubIcon className="size-4" />
          GitHub
        </Button>
      </div>
    </AuthShell>
  );
}
