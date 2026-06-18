import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AuthLoading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <Card className="w-full max-w-md space-y-6">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-10 w-2/3 rounded-2xl" />
        <div className="space-y-3">
          <Skeleton className="h-11 w-full rounded-2xl" />
          <Skeleton className="h-11 w-full rounded-2xl" />
        </div>
        <Skeleton className="h-11 w-full rounded-2xl" />
      </Card>
    </div>
  );
}