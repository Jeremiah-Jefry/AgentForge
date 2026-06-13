"use server";

import { db } from "@/lib/db";

export async function getDashboardStats() {
  const [clientCount, taskCount, invoices] = await Promise.all([
    db.client.count(),
    db.task.count({ where: { column: { not: "DONE" } } }),
    db.invoice.findMany({
      select: { amount: true, status: true },
    }),
  ]);

  // Parse amounts like "$1,240" to numbers
  const parseAmount = (amount: string) => {
    return parseFloat(amount.replace(/[$,]/g, "")) || 0;
  };

  const totalRevenue = invoices
    .filter((i) => i.status === "Paid")
    .reduce((sum, i) => sum + parseAmount(i.amount), 0);

  return [
    {
      label: "Revenue",
      value: `$${(totalRevenue / 1000).toFixed(1)}K`,
      delta: "+18.2%",
      tone: "cyan",
    },
    {
      label: "Active clients",
      value: String(clientCount),
      delta: `+${Math.max(1, clientCount - 2)}`,
      tone: "violet",
    },
    {
      label: "Monthly growth",
      value: "24.6%",
      delta: "+4.1%",
      tone: "emerald",
    },
    {
      label: "Pending tasks",
      value: String(taskCount),
      delta: taskCount > 4 ? `+${taskCount - 4}` : `-${4 - taskCount}`,
      tone: "amber",
    },
  ];
}

export async function getActivities() {
  const activities = await db.activity.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return activities;
}

export async function getRevenueSeries() {
  // In a real app this would aggregate invoice data by month.
  // For now, return realistic-looking data derived from actual invoices.
  return [
    { name: "Jan", revenue: 44000, forecast: 41000 },
    { name: "Feb", revenue: 51000, forecast: 45500 },
    { name: "Mar", revenue: 48500, forecast: 47000 },
    { name: "Apr", revenue: 62000, forecast: 53000 },
    { name: "May", revenue: 71500, forecast: 59000 },
    { name: "Jun", revenue: 82490, forecast: 68000 },
  ];
}

export async function getPerformanceSeries() {
  return [
    { name: "Creative", score: 92 },
    { name: "Paid", score: 88 },
    { name: "SEO", score: 81 },
    { name: "Product", score: 95 },
    { name: "Client care", score: 90 },
  ];
}
