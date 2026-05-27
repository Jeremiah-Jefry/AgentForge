import { ArrowUpRight, Filter, SearchCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { clientTable } from "@/data/mock-data";

export default function ClientsPage() {
  return (
    <div className="space-y-4 pb-6">
      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <Card className="space-y-5">
          <Badge>Client management</Badge>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold text-white">Client insights at startup-grade polish.</h1>
            <p className="max-w-2xl text-sm leading-7 text-zinc-400">
              Track relationships, payment confidence, delivery quality, and expansion opportunities
              inside a premium, responsive workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button>
              Invite client
              <ArrowUpRight className="size-4" />
            </Button>
            <Button variant="ghost">
              <Filter className="size-4" />
              Filter pipeline
            </Button>
          </div>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Health snapshot</CardTitle>
              <CardDescription>Portfolio-level retention and delivery confidence.</CardDescription>
            </div>
            <SearchCheck className="size-5 text-cyan-200" />
          </CardHeader>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "Retention likelihood", value: "92%" },
              { label: "Paid accounts", value: "84%" },
              { label: "Expansion pipeline", value: "$41k" },
            ].map((item) => (
              <div key={item.label} className="rounded-[24px] border border-white/8 bg-white/5 p-4">
                <p className="text-sm text-zinc-500">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Portfolio table</CardTitle>
            <CardDescription>Realtime client tracking with payment and performance context.</CardDescription>
          </div>
        </CardHeader>
        <div className="overflow-hidden rounded-[22px] border border-white/8">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-zinc-300">
              <tr>
                {["Client", "Project status", "Payment", "Performance"].map((item) => (
                  <th key={item} className="px-4 py-3 font-medium">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clientTable.map((client) => (
                <tr key={client.name} className="border-t border-white/8 text-zinc-400">
                  <td className="px-4 py-4 text-white">
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-xs text-zinc-500">{client.project}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">{client.stage}</td>
                  <td className="px-4 py-4">{client.payment}</td>
                  <td className="px-4 py-4">{client.performance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
