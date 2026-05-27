"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CreditCard, Home, Settings, Users2, X } from "lucide-react";
import { motion } from "framer-motion";

import { navItems } from "@/data/mock-data";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { cn } from "@/lib/utils";

const icons = [Home, Users2, CreditCard, BarChart3, Settings];

export function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const { setSidebarOpen } = useWorkspace();

  const content = (
    <div className="flex h-full flex-col gap-8 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">VEXORIUM</p>
          <h2 className="mt-2 text-lg font-semibold text-white">Agency OS</h2>
        </div>
        {mobile ? (
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-2xl border border-white/10 p-2 text-zinc-300"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>

      <nav className="space-y-2">
        {navItems.map((item, index) => {
          const Icon = icons[index];
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition duration-300",
                active
                  ? "bg-[linear-gradient(135deg,rgba(78,107,255,0.35),rgba(154,124,255,0.25))] text-white shadow-[0_18px_40px_rgba(78,107,255,0.2)]"
                  : "text-zinc-400 hover:bg-white/6 hover:text-white",
              )}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="size-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-[24px] border border-cyan-400/15 bg-cyan-400/10 p-4">
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">Automation</p>
        <p className="mt-3 text-sm leading-6 text-zinc-200">
          8 overdue reminders and 3 billing nudges scheduled for today.
        </p>
      </div>
    </div>
  );

  if (!mobile) return content;

  return (
    <motion.div
      initial={{ x: -28, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -28, opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="w-[285px]"
    >
      {content}
    </motion.div>
  );
}
