"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CreditCard, Home, LogOut, Settings, Users2, X } from "lucide-react";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";

import { navItems } from "@/data/static-data";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { useCurrentSession } from "@/hooks/use-session";
import { cn } from "@/lib/utils";

const icons = [Home, Users2, CreditCard, BarChart3, Settings];

export function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const { setSidebarOpen } = useWorkspace();
  const { user } = useCurrentSession();

  const content = (
    <div className="flex h-full flex-col gap-8 rounded-[28px] border border-[var(--border)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl" style={{ background: "var(--sidebar-gradient)" }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-tertiary)]">VEXORIUM</p>
          <h2 className="mt-2 text-lg font-semibold text-[var(--heading)]">Agency OS</h2>
        </div>
        {mobile ? (
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-2xl border border-[var(--card-inner-border)] p-2 text-[var(--text-secondary)]"
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
                  ? "text-white shadow-[0_18px_40px_rgba(78,107,255,0.2)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--card-inner-bg)] hover:text-[var(--heading)]",
              )}
              style={active ? { background: "var(--active-nav-bg)" } : undefined}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="size-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        {user ? (
          <div className="rounded-[24px] border border-[var(--card-inner-border)] bg-[var(--card-inner-bg)] p-4">
            <p className="font-medium text-[var(--heading)]">{user.name}</p>
            <p className="text-xs text-[var(--text-tertiary)]">{user.email}</p>
            <p className="mt-1 text-xs capitalize text-[var(--text-secondary)]">{user.role.toLowerCase()}</p>
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-[var(--text-secondary)] transition hover:bg-[var(--card-inner-bg)] hover:text-[var(--heading)]"
        >
          <LogOut className="size-4" />
          <span>Sign out</span>
        </button>
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
