"use client";

import { useSyncExternalStore } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { usePerformanceSeries } from "@/hooks/use-dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export function PerformanceChart() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const { data: performanceSeries, isLoading } = usePerformanceSeries();

  if (!mounted || isLoading) {
    return <Skeleton className="h-72 w-full rounded-[24px]" />;
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%" minHeight={0} minWidth={0}>
        <BarChart data={performanceSeries}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="name"
            stroke="rgba(255,255,255,0.45)"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="rgba(255,255,255,0.35)"
            tickLine={false}
            axisLine={false}
            width={34}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(10,10,10,0.96)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "18px",
              color: "white",
            }}
          />
          <Bar dataKey="score" radius={[12, 12, 0, 0]} fill="#9a7cff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
