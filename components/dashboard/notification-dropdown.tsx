"use client";

import { Bell } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const { notifications, setNotifications } = useWorkspace();
  const unread = notifications.filter((item) => item.unread).length;

  const markAllRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        unread: false,
      })),
    );
  };

  return (
    <div className="relative">
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
            className="absolute right-0 z-20 mt-3 w-[340px] rounded-[28px] border border-white/10 bg-[rgba(10,10,10,0.92)] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Notifications</p>
                <p className="text-xs text-zinc-500">{unread} unread updates</p>
              </div>
              <button
                type="button"
                onClick={markAllRead}
                className="text-xs text-cyan-200 transition hover:text-cyan-100"
              >
                Mark all read
              </button>
            </div>
            <div className="space-y-3">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/8 bg-white/5 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="mt-1 text-xs leading-5 text-zinc-400">{item.detail}</p>
                    </div>
                    {item.unread ? (
                      <span className="mt-1 size-2 rounded-full bg-cyan-300" />
                    ) : null}
                  </div>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
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
