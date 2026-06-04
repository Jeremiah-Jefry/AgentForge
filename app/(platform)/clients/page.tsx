"use client";

import { FileText, MoreHorizontal, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { clientTable } from "@/data/mock-data";

export default function ClientsPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6 pb-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-semibold text-[var(--heading)]">Clients</h1>
          <p className="text-sm text-[var(--text-secondary)]">Manage your agency&apos;s active portfolio.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-tertiary)]" />
            <Input className="w-64 pl-10" placeholder="Search clients..." />
          </div>
          <Button onClick={() => toast("Client invitation sent!", "success")}>
            <Plus className="size-4" />
            Invite client
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle>Client Pipeline</CardTitle>
            <Button variant="outline" size="sm" onClick={() => toast("Pipeline filter applied", "info")}>
              Filter pipeline
            </Button>
          </div>
        </CardHeader>
        <div className="overflow-x-auto rounded-[22px] border border-[var(--card-inner-border)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--table-header-bg)] text-[var(--text-secondary)]">
              <tr>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="px-4 py-3 font-medium">Stage</th>
                <th className="px-4 py-3 font-medium">Payment</th>
                <th className="px-4 py-3 font-medium">Performance</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clientTable.map((client, index) => (
                <motion.tr
                  key={client.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t border-[var(--card-inner-border)] text-[var(--text-secondary)]"
                >
                  <td className="px-4 py-4 font-medium text-[var(--heading)]">{client.name}</td>
                  <td className="px-4 py-4">{client.project}</td>
                  <td className="px-4 py-4">
                    <Badge variant={client.stage === "Discovery" ? "violet" : "default"}>
                      {client.stage}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">{client.payment}</td>
                  <td className="px-4 py-4 text-emerald-500 dark:text-emerald-400">{client.performance}</td>
                  <td className="px-4 py-4 text-right">
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-500 dark:text-cyan-200">
                  <FileText className="size-5" />
                </div>
                <div>
                  <p className="font-medium text-[var(--heading)]">Onboarding Guide {i}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">PDF Document</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
