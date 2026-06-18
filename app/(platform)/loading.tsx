import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlatformLoading() {
  return (
    <div className="space-y-6 pb-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="space-y-4">
            <Skeleton className="h-4 w-24 rounded-full" />
            <Skeleton className="h-10 w-20 rounded-2xl" />
            <Skeleton className="h-3 w-28 rounded-full" />
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40 rounded-full" />
            <Skeleton className="mt-2 h-4 w-64 rounded-full" />
          </CardHeader>
          <Skeleton className="h-[280px] w-full rounded-[22px]" />
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-44 rounded-full" />
            <Skeleton className="mt-2 h-4 w-52 rounded-full" />
          </CardHeader>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-[72px] w-full rounded-[22px]" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}