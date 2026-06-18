"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <Card className="w-full max-w-md space-y-6">
        <CardHeader>
          <div>
            <CardTitle>Authentication unavailable</CardTitle>
            <CardDescription>
              Retry the form or return to the login screen.
            </CardDescription>
          </div>
        </CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset}>Retry</Button>
          <Button asChild variant="outline">
            <Link href="/login">Go to login</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}