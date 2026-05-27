"use client";

import { CalendarDays, CheckCircle2, CreditCard, Rocket, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

import { PerformanceChart } from "@/components/charts/performance-chart";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { TaskBoard } from "@/components/dashboard/task-board";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  activities,
  billingRows,
  clientTable,
  dashboardStats,
  revenueSeries,
  teamMembers,
} from "@/data/mock-data";

const cards = [
  { icon: TrendingUp, title: "Revenue analytics", description: "Signal-rich growth tracking" },
  { icon: Users, title: "Client insights", description: "Health, payment, and delivery visibility" },
  { icon: CreditCard, title: "Billing overview", description: "Invoices, plan, and recoveries" },
  { icon: Rocket, title: "Active projects", description: "Launch momentum with premium oversight" },
];

export function DashboardOverview() {
  return (
    <div className="space-y-4 pb-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
          >
            <Card className="overflow-hidden">
              <div className="text-sm text-zinc-500">{stat.label}</div>
              <div className="mt-5 flex items-end justify-between gap-3">
                <div className="text-3xl font-semibold text-white">{stat.value}</div>
                <Badge variant={stat.delta.startsWith("-") ? "warning" : "success"}>
                  {stat.delta}
                </Badge>
              </div>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.45fr_0.95fr]">
        <Card className="overflow-hidden">
          <CardHeader>
            <div>
              <CardTitle>Revenue dynamics</CardTitle>
              <CardDescription>Current growth versus forecasted baseline.</CardDescription>
            </div>
            <Badge>ARR</Badge>
          </CardHeader>
          <RevenueChart />
        </Card>
        <Card className="overflow-hidden">
          <CardHeader>
            <div>
              <CardTitle>Performance stack</CardTitle>
              <CardDescription>Specialty team output across active service lines.</CardDescription>
            </div>
            <Badge variant="violet">Velocity</Badge>
          </CardHeader>
          <PerformanceChart />
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Client pipeline</CardTitle>
              <CardDescription>Projects, payments, and delivery confidence in one table.</CardDescription>
            </div>
          </CardHeader>
          <div className="overflow-hidden rounded-[22px] border border-white/8">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-zinc-300">
                <tr>
                  {["Client", "Project", "Stage", "Payment", "Performance"].map((item) => (
                    <th key={item} className="px-4 py-3 font-medium">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clientTable.map((client) => (
                  <tr key={client.name} className="border-t border-white/8 text-zinc-400">
                    <td className="px-4 py-4 text-white">{client.name}</td>
                    <td className="px-4 py-4">{client.project}</td>
                    <td className="px-4 py-4">{client.stage}</td>
                    <td className="px-4 py-4">{client.payment}</td>
                    <td className="px-4 py-4">{client.performance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Activity feed</CardTitle>
              <CardDescription>Real-time momentum from the workspace.</CardDescription>
            </div>
          </CardHeader>
          <div className="space-y-4">
            {activities.map((item) => (
              <div key={item.title} className="rounded-[22px] border border-white/8 bg-white/5 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{item.detail}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Task board</h3>
              <p className="text-sm text-zinc-400">Drag-style workflow movement with local persistence.</p>
            </div>
            <Badge variant="violet">Sprint</Badge>
          </div>
          <TaskBoard />
        </Card>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Upcoming checkpoints for launches and billing.</CardDescription>
              </div>
              <CalendarDays className="size-5 text-cyan-200" />
            </CardHeader>
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-zinc-500">
              {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
                <div key={day} className="py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 28 }, (_, index) => {
                const active = [5, 10, 18, 23].includes(index + 1);
                return (
                  <div
                    key={index}
                    className={`rounded-2xl border px-2 py-3 ${
                      active
                        ? "border-cyan-400/25 bg-cyan-400/12 text-cyan-100"
                        : "border-white/6 bg-white/4 text-zinc-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                );
              })}
            </div>
          </Card>
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Billing overview</CardTitle>
                <CardDescription>Latest invoices and account health.</CardDescription>
              </div>
            </CardHeader>
            <div className="space-y-3">
              {billingRows.slice(0, 3).map((row) => (
                <div
                  key={row.invoice}
                  className="flex items-center justify-between rounded-[22px] border border-white/8 bg-white/5 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-white">{row.invoice}</p>
                    <p className="text-xs text-zinc-500">{row.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white">{row.amount}</p>
                    <p className="text-xs text-zinc-500">{row.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Team pulse</CardTitle>
                <CardDescription>Availability and focus across key owners.</CardDescription>
              </div>
            </CardHeader>
            <div className="space-y-3">
              {teamMembers.slice(0, 3).map((member) => (
                <div
                  key={member.name}
                  className="flex items-center justify-between rounded-[22px] border border-white/8 bg-white/5 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-white">{member.name}</p>
                    <p className="text-xs text-zinc-500">{member.role}</p>
                  </div>
                  <CheckCircle2 className="size-4 text-emerald-300" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} className="space-y-4">
            <card.icon className="size-5 text-cyan-200" />
            <div>
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{card.description}</p>
            </div>
            <div className="h-2 rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#5b8cff,#33d1ff)]"
                style={{
                  width: `${Math.max(
                    42,
                    Math.min(94, Math.round((revenueSeries.at(-1)?.revenue ?? 50_000) / 1000)),
                  )}%`,
                }}
              />
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
