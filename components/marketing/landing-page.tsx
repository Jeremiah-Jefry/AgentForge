"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Menu,
  MoveRight,
  PlayCircle,
  Sparkles,
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
} from "@/data/mock-data";

export function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [faqIndex, setFaqIndex] = useState(0);
  const { toast } = useToast();

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

        <section className="grid gap-8 px-2 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <Badge className="w-fit">Futuristic agency OS</Badge>
            <div className="space-y-6">
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-[var(--heading)] md:text-7xl">
                Manage your agency with <span className="text-gradient">cinematic clarity</span>.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--text-secondary)] md:text-xl">
                A billion-dollar-feeling SaaS dashboard for elite teams—crafted with responsive layouts,
                glassmorphism, motion, and modular React architecture.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard">
                <Button size="lg">
                  Open dashboard
                  <MoveRight className="size-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="lg" onClick={() => toast("Preview video coming soon!", "info")}>
                <PlayCircle className="size-4" />
                Watch preview
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
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-tertiary)]">Realtime workspace</p>
                  <h2 className="mt-2 text-2xl font-semibold text-[var(--heading)]">Immersive dashboard preview</h2>
                </div>
                <Sparkles className="size-5 text-cyan-500 dark:text-cyan-200" />
              </div>
              <div className="grid gap-4 xl:grid-cols-[0.38fr_0.62fr]">
                <div className="space-y-3 rounded-[24px] border border-[var(--card-inner-border)] bg-[var(--card-inner-bg)] p-4">
                  {["Overview", "Analytics", "Clients", "Billing", "Settings"].map((item, index) => (
                    <div
                      key={item}
                      className={`rounded-2xl px-4 py-3 text-sm ${
                        index === 0
                          ? "text-white shadow-[0_12px_30px_rgba(78,107,255,0.15)]"
                          : "bg-transparent text-[var(--text-secondary)]"
                      }`}
                      style={index === 0 ? { background: "var(--active-nav-bg)" } : undefined}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {["Revenue", "Growth"].map((item, index) => (
                      <div key={item} className="rounded-[24px] border border-[var(--card-inner-border)] bg-[var(--card-inner-bg)] p-4">
                        <p className="text-sm text-[var(--text-tertiary)]">{item}</p>
                        <p className="mt-4 text-2xl font-semibold text-[var(--heading)]">
                          {index === 0 ? "$82,490" : "+24.6%"}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-[28px] border border-[var(--card-inner-border)] bg-[linear-gradient(180deg,rgba(91,140,255,0.08),rgba(51,209,255,0.02))] p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[var(--text-secondary)]">Revenue signal</p>
                      <span className="text-xs text-[var(--text-tertiary)]">Last 6 months</span>
                    </div>
                    <div className="mt-8 flex h-48 items-end gap-3">
                      {revenueSeries.map((item) => (
                        <div key={item.name} className="flex flex-1 flex-col items-center gap-3">
                          <div
                            className="w-full rounded-t-2xl bg-[linear-gradient(180deg,#5b8cff,#33d1ff)]"
                            style={{ height: `${item.revenue / 550}px` }}
                          />
                          <span className="text-xs text-[var(--text-tertiary)]">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        <section className="space-y-8 py-10">
          <SectionHeading
            eyebrow="Why teams switch"
            title="Premium features for elite operators."
            description="Every block is built as a reusable component, tuned for responsive layouts and glowing, modern interactions."
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
            eyebrow="Proof"
            title="Trusted by ambitious operators."
            description="Purpose-built for modern digital agencies, fintech consultancies, and high-output product studios."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {["Linear-style speed", "Stripe-grade clarity", "Vercel-ready deployment"].map((item) => (
              <Card key={item} className="space-y-5">
                <CheckCircle2 className="size-5 text-cyan-500 dark:text-cyan-200" />
                <p className="text-lg font-semibold text-[var(--heading)]">{item}</p>
                <p className="text-sm leading-7 text-[var(--text-secondary)]">
                  Premium UI polish with modular architecture and a production-friendly codebase.
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-8 py-10">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple plans. Enterprise depth."
            description="Position your agency product like a real SaaS startup with clear commercial packaging."
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
            description="A portfolio-worthy frontend should feel complete, responsive, and immediately adaptable."
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

        <footer className="flex flex-col gap-4 border-t border-[var(--border)] px-2 py-10 text-sm text-[var(--text-secondary)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold tracking-[0.28em] text-[var(--text-primary)]">VEXORIUM</p>
            <p className="mt-2 text-[var(--text-tertiary)]">Built for modern digital agencies.</p>
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
