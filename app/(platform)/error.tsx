"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PlatformError({
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
    <div className="space-y-6 pb-6">
      <Card className="max-w-2xl space-y-6">
        <CardHeader>
          <div>
            <CardTitle>Workspace failed to load</CardTitle>
            <CardDescription>
              Retry the current view or return to the dashboard shell.
            </CardDescription>
          </div>
        </CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset}>Try again</Button>
          <Button asChild variant="outline">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}