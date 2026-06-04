"use client";

import { CreditCard, Download, Receipt } from "lucide-react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { billingRows } from "@/data/mock-data";

export default function BillingPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-3xl font-semibold text-[var(--heading)]">Billing & Plans</h1>
        <p className="text-sm text-[var(--text-secondary)]">Manage your subscription and billing history.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.6fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>You are currently on the Pro plan.</CardDescription>
              </div>
              <Badge variant="violet">Pro</Badge>
            </CardHeader>
            <div className="space-y-6">
              <div className="flex items-end gap-2">
                <span className="text-5xl font-semibold text-[var(--heading)]">$299</span>
                <span className="text-[var(--text-secondary)] pb-1">/ month</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-[var(--text-secondary)]">
                  <span>Seats used</span>
                  <span className="text-[var(--heading)]">8 of 10</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[var(--card-inner-bg)]">
                  <div className="h-full w-4/5 bg-cyan-400" />
                </div>
              </div>
              <div className="flex gap-3">
                <Button>Upgrade Plan</Button>
                <Button variant="outline">Cancel Subscription</Button>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Invoice History</CardTitle>
                <CardDescription>Past payments and receipts.</CardDescription>
              </div>
            </CardHeader>
            <div className="space-y-3">
              {billingRows.map((row, index) => (
                <motion.div
                  key={row.invoice}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[22px] border border-[var(--card-inner-border)] bg-[var(--card-inner-bg)] px-4 py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-500 dark:text-violet-200">
                      <Receipt className="size-5" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--heading)]">{row.invoice}</p>
                      <p className="text-sm text-[var(--text-tertiary)]">{row.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium text-[var(--heading)]">{row.amount}</p>
                      <p className="text-xs text-emerald-500 dark:text-emerald-400">{row.status}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => toast(`Downloading invoice ${row.invoice}...`, "success")}>
                      <Download className="size-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-[22px] border border-[var(--card-inner-border)] bg-[var(--card-inner-bg)] px-4 py-4">
                <div className="flex size-10 items-center justify-center rounded-xl bg-slate-800 text-white">
                  <CreditCard className="size-5" />
                </div>
                <div>
                  <p className="font-medium text-[var(--heading)]">Visa ending in 4242</p>
                  <p className="text-xs text-[var(--text-tertiary)]">Expires 12/24</p>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={() => toast("Redirecting to payment portal...", "info")}>
                Update Card
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
