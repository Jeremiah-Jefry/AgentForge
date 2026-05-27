"use client";

import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <Card className="group space-y-4 overflow-hidden">
        <div className="text-sm text-zinc-400">{label}</div>
        <div className="flex items-end justify-between gap-3">
          <div className="text-3xl font-semibold text-white">{value}</div>
          <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200 transition duration-300 group-hover:shadow-[0_0_24px_rgba(109,255,191,0.25)]">
            {delta}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
