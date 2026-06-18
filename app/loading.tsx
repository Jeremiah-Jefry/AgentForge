import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md space-y-4">
        <Skeleton className="h-4 w-28 rounded-full" />
        <Skeleton className="h-10 w-3/4 rounded-2xl" />
        <Skeleton className="h-5 w-full rounded-full" />
        <Skeleton className="h-12 w-full rounded-2xl" />
      </Card>
    </div>
  );
}