import { CreditCard, Download, Receipt } from "lucide-react";

import { RevenueChart } from "@/components/charts/revenue-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { billingRows } from "@/data/mock-data";

export default function BillingPage() {
  return (
    <div className="space-y-4 pb-6">
      <section className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>Current commercial package and renewal timing.</CardDescription>
            </div>
            <Badge>Pro plan</Badge>
          </CardHeader>
          <div className="space-y-3 text-sm text-zinc-400">
            <p>Pro Plan — $99/mo</p>
            <p>Next renewal: June 18</p>
            <p>Seats included: 20 team members</p>
          </div>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Usage analytics</CardTitle>
              <CardDescription>Revenue and billing performance by recent month.</CardDescription>
            </div>
            <CreditCard className="size-5 text-cyan-200" />
          </CardHeader>
          <RevenueChart />
        </Card>
      </section>
      <section className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Payment method</CardTitle>
              <CardDescription>Default collection details and backup routing.</CardDescription>
            </div>
          </CardHeader>
          <div className="space-y-4">
            <div className="rounded-[24px] border border-white/8 bg-white/5 p-4">
              <p className="text-sm text-zinc-500">Primary card</p>
              <p className="mt-3 text-lg font-semibold text-white">Visa •••• 4401</p>
            </div>
            <Button variant="ghost">Update card</Button>
          </div>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Invoices & transactions</CardTitle>
              <CardDescription>Download-ready billing history with account status.</CardDescription>
            </div>
            <Receipt className="size-5 text-cyan-200" />
          </CardHeader>
          <div className="space-y-3">
            {billingRows.map((row) => (
              <div
                key={row.invoice}
                className="flex flex-col gap-3 rounded-[24px] border border-white/8 bg-white/5 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-medium text-white">{row.invoice}</p>
                  <p className="text-sm text-zinc-500">{row.date}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm text-zinc-300">{row.amount}</span>
                  <Badge variant={row.status === "Paid" ? "success" : "warning"}>
                    {row.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="size-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
