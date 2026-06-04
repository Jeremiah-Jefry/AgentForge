"use client";

import { Bell } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const { notifications, setNotifications } = useWorkspace();
  const unread = notifications.filter((item) => item.unread).length;
  const containerRef = useRef<HTMLDivElement>(null);

  const markAllRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        unread: false,
      })),
    );
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <Button variant="ghost" size="icon" onClick={() => setOpen((value) => !value)}>
        <Bell className="size-4" />
        {unread ? (
          <span className="absolute right-2 top-2 size-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(51,209,255,0.8)]" />
        ) : null}
      </Button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 z-20 mt-3 w-[340px] rounded-[28px] border border-[var(--border)] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
            style={{ background: "var(--dropdown-bg)" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--heading)]">Notifications</p>
                <p className="text-xs text-[var(--text-tertiary)]">{unread} unread updates</p>
              </div>
              <button
                type="button"
                onClick={markAllRead}
                className="text-xs text-cyan-500 transition hover:text-cyan-400 dark:text-cyan-200 dark:hover:text-cyan-100"
              >
                Mark all read
              </button>
            </div>
            <div className="space-y-3">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[var(--card-inner-border)] bg-[var(--card-inner-bg)] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-[var(--heading)]">{item.title}</p>
                      <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">{item.detail}</p>
                    </div>
                    {item.unread ? (
                      <span className="mt-1 size-2 rounded-full bg-cyan-300" />
                    ) : null}
                  </div>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
