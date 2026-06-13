"use client";

import { useSyncExternalStore } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { useRevenueSeries } from "@/hooks/use-dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export function RevenueChart() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const { data: revenueSeries, isLoading } = useRevenueSeries();

  if (!mounted || isLoading) {
    return <Skeleton className="h-72 w-full rounded-[24px]" />;
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%" minHeight={0} minWidth={0}>
        <AreaChart data={revenueSeries}>
          <defs>
            <linearGradient id="revenue" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#5b8cff" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#5b8cff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="forecast" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#33d1ff" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#33d1ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis
            dataKey="name"
            stroke="rgba(255,255,255,0.4)"
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(10,10,10,0.96)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "18px",
              color: "white",
            }}
          />
          <Area
            type="monotone"
            dataKey="forecast"
            stroke="#33d1ff"
            strokeWidth={2}
            fill="url(#forecast)"
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#8db7ff"
            strokeWidth={3}
            fill="url(#revenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
