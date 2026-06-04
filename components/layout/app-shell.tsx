"use client";

import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { ParticleField } from "@/components/shared/particle-field";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, setSidebarOpen } = useWorkspace();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleField />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1560px] gap-4 px-4 py-4 lg:px-6">
        <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-[285px] shrink-0 lg:block">
          <Sidebar />
        </aside>
        <AnimatePresence>
          {sidebarOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 p-4 backdrop-blur-sm lg:hidden"
              style={{ background: "var(--overlay-bg)" }}
              onClick={() => setSidebarOpen(false)}
            >
              <div className="max-h-screen overflow-y-auto" onClick={(event) => event.stopPropagation()}>
                <Sidebar mobile />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <div className="dashboard-scroll flex min-h-[calc(100vh-2rem)] flex-1 flex-col gap-4 overflow-x-hidden">
          <div className="flex items-center justify-between lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="size-4" />
            </Button>
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-tertiary)]">VEXORIUM</p>
          </div>
          <Topbar />
          {children}
        </div>
      </div>
    </div>
  );
}
