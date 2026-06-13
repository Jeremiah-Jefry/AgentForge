"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Menu,
  MoveRight,
  PlayCircle,
  Sparkles,
  BarChart3,
  CheckSquare,
  Users2,
  Sliders,
  Plus,
  RefreshCw,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { AnimatedCounter } from "@/components/shared/animated-counter";
import { ParticleField } from "@/components/shared/particle-field";
import { PricingCard } from "@/components/cards/pricing-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import {
  faqs,
  landingStats,
  marketingFeatures,
  navItems,
  pricingPlans,
  revenueSeries,
} from "@/data/static-data";

export function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [faqIndex, setFaqIndex] = useState(0);
  const { toast } = useToast();

  // Sandbox Live States
  const [sandboxTab, setSandboxTab] = useState<"overview" | "tasks" | "clients" | "settings">("overview");

  const [sandboxTasks, setSandboxTasks] = useState([
    { id: 1, title: "Onboard Nova Systems", col: "todo" as const, owner: "Aisha M.", due: "Today" },
    { id: 2, title: "Optimize campaign spend", col: "progress" as const, owner: "Luca T.", due: "Tomorrow" },
    { id: 3, title: "Reconcile Q2 invoices", col: "done" as const, owner: "Jin W.", due: "Completed" },
  ]);

  const [sandboxClients, setSandboxClients] = useState([
    { name: "Orbit Labs", project: "Web Redesign", status: "Active", health: "94%", payment: "Paid" },
    { name: "Nova Systems", project: "CRM Sync", status: "Onboarding", health: "88%", payment: "Pending" },
    { name: "Aether AI", project: "Marketing Funnel", status: "Review", health: "91%", payment: "Paid" },
  ]);

  const [growthSim, setGrowthSim] = useState(24.6);
  const [revenueSim, setRevenueSim] = useState(82490);

  const moveSandboxTask = (id: number, direction: "left" | "right") => {
    const order = ["todo", "progress", "done"] as const;
    setSandboxTasks((current) =>
      current.map((task) => {
        if (task.id !== id) return task;
        const index = order.indexOf(task.col);
        const target = direction === "left" ? Math.max(0, index - 1) : Math.min(2, index + 1);
        return { ...task, col: order[target] };
      })
    );
  };

  const addSandboxTask = () => {
    const titles = [
      "Review SLA contract",
      "Setup team permissions",
      "Configure Stripe webhooks",
      "Design client dashboard view",
      "Audit API performance",
    ];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const id = Date.now();
    setSandboxTasks((current) => [
      ...current,
      { id, title: randomTitle, col: "todo", owner: "You", due: "Today" },
    ]);
    toast("Added random task to To Do column!", "success");
  };

  const resetSandbox = () => {
    setSandboxTasks([
      { id: 1, title: "Onboard Nova Systems", col: "todo", owner: "Aisha M.", due: "Today" },
      { id: 2, title: "Optimize campaign spend", col: "progress", owner: "Luca T.", due: "Tomorrow" },
      { id: 3, title: "Reconcile Q2 invoices", col: "done", owner: "Jin W.", due: "Completed" },
    ]);
    setSandboxClients([
      { name: "Orbit Labs", project: "Web Redesign", status: "Active", health: "94%", payment: "Paid" },
      { name: "Nova Systems", project: "CRM Sync", status: "Onboarding", health: "88%", payment: "Pending" },
      { name: "Aether AI", project: "Marketing Funnel", status: "Review", health: "91%", payment: "Paid" },
    ]);
    setGrowthSim(24.6);
    setRevenueSim(82490);
    toast("Sandbox states reset!", "info");
  };

  const nudgeClient = (name: string) => {
    setSandboxClients((current) =>
      current.map((client) =>
        client.name === name ? { ...client, payment: "Paid" as const } : client
      )
    );
    toast(`Sent nudge reminder to ${name}! Payment marked as Paid.`, "success");
  };

  const sandboxTabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "tasks", label: "Task Board", icon: CheckSquare },
    { id: "clients", label: "Clients Pipeline", icon: Users2 },
    { id: "settings", label: "Sandbox Controls", icon: Sliders },
  ] as const;

  return (
    <div className="relative overflow-hidden">
      <ParticleField />
      <div className="relative z-10 mx-auto max-w-[1320px] px-4 pb-16 pt-6 md:px-6">
        <header className="sticky top-4 z-20 rounded-[28px] border border-[var(--border)] px-4 py-4 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl" style={{ background: "var(--nav-header-bg)" }}>
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="text-sm font-semibold tracking-[0.36em] text-[var(--heading)]">
              VEXORIUM
            </Link>
            <nav className="hidden items-center gap-8 text-sm text-[var(--text-secondary)] lg:flex">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-[var(--heading)] transition">
                  {item.title}
                </Link>
              ))}
            </nav>
            <div className="hidden items-center gap-3 lg:flex">
              <Button variant="ghost" onClick={() => toast("Demo request sent! We'll reach out shortly.", "success")}>Book demo</Button>
              <Link href="/dashboard">
                <Button>
                  Open app
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-2xl border border-[var(--card-inner-border)] p-2 text-[var(--text-secondary)] lg:hidden"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </header>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 p-4 backdrop-blur-sm lg:hidden"
              style={{ background: "var(--overlay-bg)" }}
              onClick={() => setMobileOpen(false)}
            >
              <motion.div
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                className="space-y-3 rounded-[28px] border border-[var(--border)] p-4"
                style={{ background: "var(--modal-bg)" }}
                onClick={(event) => event.stopPropagation()}
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-2xl border border-[var(--card-inner-border)] bg-[var(--card-inner-bg)] px-4 py-3 text-[var(--text-primary)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <section className="grid gap-8 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <Badge className="w-fit">VEXORIUM 2.0 IS LIVE</Badge>
            <div className="space-y-6">
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-[var(--heading)] md:text-7xl">
                The cinematic OS for <span className="text-gradient">elite agencies</span>.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--text-secondary)] md:text-xl">
                Unify your client relations, interactive task sprintboards, automated billing pipelines, 
                and real-time business telemetry in one gorgeous, high-performance workspace.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard">
                <Button size="lg">
                  Open dashboard
                  <MoveRight className="size-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="lg" onClick={() => {
                setSandboxTab("settings");
                toast("Interactive Sandbox is active on the right! Use controls to adjust simulator metrics.", "info");
              }}>
                <PlayCircle className="size-4" />
                Try Live Sandbox
              </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {landingStats.map((stat, index) => (
                <Card key={stat.label} className="space-y-3">
                  <p className="text-sm text-[var(--text-tertiary)]">{stat.label}</p>
                  <div className="text-2xl font-semibold text-[var(--heading)]">
                    {index === 0 ? (
                      <AnimatedCounter value={12840} />
                    ) : (
                      stat.value
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="flex items-center"
          >
            <Card className="w-full space-y-6 p-5 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-tertiary)]">Live interactive sandbox</p>
                  <h2 className="mt-2 text-2xl font-semibold text-[var(--heading)]">Product Playground</h2>
                </div>
                <Sparkles className="size-5 text-cyan-500 dark:text-cyan-200 animate-pulse" />
              </div>
              
              <div className="grid gap-4 xl:grid-cols-[0.38fr_0.62fr]">
                {/* Vertical Navigation Tabs */}
                <div className="space-y-2 rounded-[24px] border border-[var(--card-inner-border)] bg-[var(--card-inner-bg)] p-3">
                  {sandboxTabs.map((tab) => {
                    const Icon = tab.icon;
                    const active = sandboxTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setSandboxTab(tab.id)}
                        className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition duration-300 ${
                          active
                            ? "text-white shadow-[0_12px_30px_rgba(78,107,255,0.15)]"
                            : "text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.03)] hover:text-[var(--heading)]"
                        }`}
                        style={active ? { background: "var(--active-nav-bg)" } : undefined}
                      >
                        <Icon className="size-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Contents */}
                <div className="min-h-[220px]">
                  {sandboxTab === "overview" && (
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[24px] border border-[var(--card-inner-border)] bg-[var(--card-inner-bg)] p-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Est. Revenue</p>
                          <p className="mt-2 text-2xl font-semibold text-[var(--heading)]">
                            {(revenueSim * (1 + growthSim / 100)).toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              maximumFractionDigits: 0,
                            })}
                          </p>
                        </div>
                        <div className="rounded-[24px] border border-[var(--card-inner-border)] bg-[var(--card-inner-bg)] p-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Growth Velocity</p>
                          <p className="mt-2 text-2xl font-semibold text-cyan-400">
                            +{growthSim.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      <div className="rounded-[28px] border border-[var(--card-inner-border)] bg-[linear-gradient(180deg,rgba(91,140,255,0.08),rgba(51,209,255,0.02))] p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-[var(--text-secondary)]">Revenue signal</p>
                          <span className="text-xs text-[var(--text-tertiary)]">Last 6 months</span>
                        </div>
                        <div className="mt-6 flex h-32 items-end gap-2.5">
                          {revenueSeries.map((item) => {
                            const baseHeight = item.revenue / 600;
                            const scale = 1 + (growthSim - 24.6) / 100;
                            const dynamicHeight = Math.max(15, Math.min(120, baseHeight * scale));
                            return (
                              <div key={item.name} className="flex flex-1 flex-col items-center gap-2">
                                <div className="relative group w-full">
                                  <div
                                    className="w-full rounded-t-xl bg-[linear-gradient(180deg,#5b8cff,#33d1ff)] transition-all duration-500 ease-out"
                                    style={{ height: `${dynamicHeight}px` }}
                                  />
                                </div>
                                <span className="text-[10px] text-[var(--text-tertiary)]">{item.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {sandboxTab === "tasks" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[var(--heading)]">Interactive Sprint Sandbox</p>
                        <Badge variant="violet" className="text-[9px] px-2 py-0.5">Live Play</Badge>
                      </div>
                      
                      <div className="grid gap-3 grid-cols-3">
                        {(["todo", "progress", "done"] as const).map((columnKey) => {
                          const tasksInCol = sandboxTasks.filter((t) => t.col === columnKey);
                          return (
                            <div
                              key={columnKey}
                              className="rounded-2xl border border-[var(--card-inner-border)] bg-[rgba(255,255,255,0.01)] p-2.5 space-y-2 min-h-[160px]"
                            >
                              <div className="flex items-center justify-between border-b border-[var(--card-inner-border)] pb-1.5">
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                                  {columnKey === "todo" ? "To Do" : columnKey === "progress" ? "In Progress" : "Done"}
                                </span>
                                <Badge variant="default" className="text-[9px] px-1 py-0">{tasksInCol.length}</Badge>
                              </div>
                              <div className="space-y-2 overflow-y-auto max-h-[160px] pr-0.5">
                                {tasksInCol.map((task) => (
                                  <div
                                    key={task.id}
                                    className="rounded-xl border border-[var(--card-inner-border)] bg-[var(--card-inner-bg)] p-2 space-y-1.5 text-left"
                                  >
                                    <p className="text-[11px] font-medium leading-tight text-[var(--heading)] line-clamp-2">
                                      {task.title}
                                    </p>
                                    <div className="flex items-center justify-between text-[9px] text-[var(--text-tertiary)]">
                                      <span>{task.owner}</span>
                                      <div className="flex gap-1">
                                        <button
                                          type="button"
                                          disabled={columnKey === "todo"}
                                          onClick={() => moveSandboxTask(task.id, "left")}
                                          className="text-[var(--text-secondary)] hover:text-white disabled:opacity-20 disabled:pointer-events-none"
                                        >
                                          ◀
                                        </button>
                                        <button
                                          type="button"
                                          disabled={columnKey === "done"}
                                          onClick={() => moveSandboxTask(task.id, "right")}
                                          className="text-[var(--text-secondary)] hover:text-white disabled:opacity-20 disabled:pointer-events-none"
                                        >
                                          ▶
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {sandboxTab === "clients" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[var(--heading)]">Client Pipeline Status</p>
                        <Badge className="text-[9px] px-2 py-0.5">Operational</Badge>
                      </div>
                      
                      <div className="overflow-hidden rounded-2xl border border-[var(--card-inner-border)] bg-[rgba(255,255,255,0.01)]">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[var(--table-header-bg)] text-[var(--text-tertiary)]">
                            <tr>
                              <th className="px-3 py-2 font-medium">Client</th>
                              <th className="px-3 py-2 font-medium">Project</th>
                              <th className="px-3 py-2 font-medium">Payment</th>
                              <th className="px-3 py-2 font-medium text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sandboxClients.map((client) => (
                              <tr key={client.name} className="border-t border-[var(--card-inner-border)] text-[var(--text-secondary)]">
                                <td className="px-3 py-2.5 font-medium text-[var(--heading)]">{client.name}</td>
                                <td className="px-3 py-2.5">{client.project}</td>
                                <td className="px-3 py-2.5">
                                  <Badge variant={client.payment === "Paid" ? "success" : "warning"} className="text-[9px] px-1 py-0">
                                    {client.payment}
                                  </Badge>
                                </td>
                                <td className="px-3 py-2.5 text-right">
                                  {client.payment === "Pending" ? (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-6 rounded-lg px-2 text-[10px]"
                                      onClick={() => nudgeClient(client.name)}
                                    >
                                      Nudge
                                    </Button>
                                  ) : (
                                    <span className="text-[10px] text-emerald-400 font-medium">Settled</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {sandboxTab === "settings" && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-[var(--heading)]">Sandbox Controls</p>
                        <p className="text-xs text-[var(--text-secondary)]">Simulate real-time agency scenarios below.</p>
                      </div>
                      
                      <div className="space-y-3 rounded-2xl border border-[var(--card-inner-border)] bg-[rgba(255,255,255,0.01)] p-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[var(--text-secondary)]">Growth Velocity</span>
                            <span className="font-semibold text-cyan-400">+{growthSim.toFixed(1)}% YoY</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="50"
                            step="0.5"
                            value={growthSim}
                            onChange={(e) => setGrowthSim(parseFloat(e.target.value))}
                            className="w-full h-1 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-cyan-500"
                          />
                        </div>

                        <div className="flex flex-wrap gap-2.5 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 rounded-xl text-xs gap-1"
                            onClick={addSandboxTask}
                          >
                            <Plus className="size-3.5" />
                            Add Test Task
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 rounded-xl text-xs gap-1"
                            onClick={resetSandbox}
                          >
                            <RefreshCw className="size-3.5" />
                            Reset Sandbox
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        <section className="space-y-8 py-10">
          <SectionHeading
            eyebrow="Why teams switch"
            title="Premium features for elite operators."
            description="VEXORIUM unifies your workflows, team, and finance data into a singular operating system."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {marketingFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <Card className="group h-full space-y-5 transition hover:-translate-y-1">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(51,209,255,0.2),rgba(154,124,255,0.25))] text-cyan-600 dark:text-cyan-100 shadow-[0_0_26px_rgba(51,209,255,0.18)]">
                    <feature.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--heading)]">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-16 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Performance"
            title="Built for enterprise velocity."
            description="High-performance tracking, secure portals, and lightning-fast workflows to streamline your business."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: "Sub-100ms Action", desc: "Instant response times, global keyboard navigation, and real-time synchronization across your team." },
              { title: "Stripe-Grade Billing", desc: "Automate invoicing, track recurring client retainers, and easily handle payouts in one secure system." },
              { title: "AI-Powered Automation", desc: "Reduce operational overhead with custom AI automated triggers for client followups, alerts, and task scheduling." }
            ].map((item) => (
              <Card key={item.title} className="space-y-5">
                <CheckCircle2 className="size-5 text-cyan-500 dark:text-cyan-200" />
                <p className="text-lg font-semibold text-[var(--heading)]">{item.title}</p>
                <p className="text-sm leading-7 text-[var(--text-secondary)]">
                  {item.desc}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-8 py-10">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple plans. Enterprise depth."
            description="Choose a plan that fits your agency's scale. Start with our free trial and upgrade as your team grows."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-16 lg:grid-cols-[1fr_0.95fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions from ambitious founders."
            description="Got questions? We have answers. Learn about our features, security, integrations, and trial policies."
          />
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const active = faqIndex === index;
              return (
                <Card key={faq.question} className="overflow-hidden p-0">
                  <button
                    type="button"
                    onClick={() => setFaqIndex(index)}
                    className="flex w-full items-center justify-between px-5 py-5 text-left hover:bg-[var(--card-inner-bg)] transition"
                  >
                    <span className="font-medium text-[var(--heading)]">{faq.question}</span>
                    <span className="text-[var(--text-tertiary)]">{active ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {active ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <p className="px-5 pb-5 text-sm leading-7 text-[var(--text-secondary)]">{faq.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </Card>
              );
            })}
          </div>
        </section>

        <footer className="flex flex-col gap-4 border-t border-[var(--border)] py-10 text-sm text-[var(--text-secondary)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold tracking-[0.28em] text-[var(--text-primary)]">VEXORIUM</p>
            <p className="mt-2 text-[var(--text-tertiary)]">The ultimate operating system for elite modern agencies.</p>
          </div>
          <div className="flex flex-wrap gap-5">
            <Link href="/dashboard" className="hover:text-[var(--heading)] transition">Dashboard</Link>
            <Link href="/clients" className="hover:text-[var(--heading)] transition">Clients</Link>
            <Link href="/billing" className="hover:text-[var(--heading)] transition">Billing</Link>
            <Link href="/settings" className="hover:text-[var(--heading)] transition">Settings</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
