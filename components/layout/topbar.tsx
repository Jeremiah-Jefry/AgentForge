"use client";

import { MoonStar, Search, SunMedium, WandSparkles } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { NotificationDropdown } from "@/components/dashboard/notification-dropdown";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

const ranges = [
  { label: "7d", value: "7d" },
  { label: "30d", value: "30d" },
  { label: "90d", value: "90d" },
];

const quickActions = [
  "Create project room",
  "Start billing reminder",
  "Open launch review",
];

export function Topbar() {
  const { dashboardRange, setDashboardRange } = useWorkspace();
  const { resolvedTheme, setTheme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!modalOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [modalOpen]);

  return (
    <>
      <div className="flex flex-col gap-4 rounded-[28px] border border-[var(--border)] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl lg:flex-row lg:items-center lg:justify-between" style={{ background: "var(--topbar-gradient)" }}>
        <div className="relative w-full max-w-lg">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <Input className="pl-11" placeholder="Search projects, clients, invoices" />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-full border border-[var(--card-inner-border)] bg-[var(--card-inner-bg)] p-1">
            {ranges.map((range) => (
              <button
                key={range.value}
                type="button"
                onClick={() => setDashboardRange(range.value)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  dashboardRange === range.value
                    ? "bg-[var(--heading)] text-[var(--background)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--heading)]"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          <NotificationDropdown />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            {resolvedTheme === "dark" ? (
              <SunMedium className="size-4" />
            ) : (
              <MoonStar className="size-4" />
            )}
          </Button>
          <Button onClick={() => setModalOpen(true)}>
            <WandSparkles className="size-4" />
            Quick action
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {modalOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 backdrop-blur-sm"
            style={{ background: "var(--overlay-bg)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 18 }}
              className="w-full max-w-md rounded-[32px] border border-[var(--border)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.52)]"
              style={{ background: "var(--modal-bg)" }}
            >
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-400">Quick action</p>
              <h3 className="mt-3 text-2xl font-semibold text-[var(--heading)]">
                Launch a premium workflow
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                Prototype a new client room, generate a billing reminder, or open a launch war-room.
              </p>
              <div className="mt-6 grid gap-3">
                {quickActions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      toast(`${item} initiated successfully!`, "success");
                      setModalOpen(false);
                    }}
                    className="rounded-2xl border border-[var(--card-inner-border)] bg-[var(--card-inner-bg)] px-4 py-3 text-left text-sm text-[var(--text-primary)] transition hover:border-cyan-400/30 hover:bg-cyan-400/10"
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setModalOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => {
                  toast("Workflow saved successfully!", "success");
                  setModalOpen(false);
                }}>Save workflow</Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
