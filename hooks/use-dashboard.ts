"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getDashboardStats,
  getActivities,
  getRevenueSeries,
  getPerformanceSeries,
} from "@/lib/actions/dashboard";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: () => getDashboardStats(),
  });
}

export function useActivities() {
  return useQuery({
    queryKey: ["dashboard", "activities"],
    queryFn: () => getActivities(),
  });
}

export function useRevenueSeries() {
  return useQuery({
    queryKey: ["dashboard", "revenue"],
    queryFn: () => getRevenueSeries(),
  });
}

export function usePerformanceSeries() {
  return useQuery({
    queryKey: ["dashboard", "performance"],
    queryFn: () => getPerformanceSeries(),
  });
}
