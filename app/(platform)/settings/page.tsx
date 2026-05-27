"use client";

import { ShieldCheck, SlidersHorizontal } from "lucide-react";

import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const { settings, setSettings } = useWorkspace();

  return (
    <div className="space-y-4 pb-6">
      <section className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your workspace identity and company data.</CardDescription>
            </div>
            <SlidersHorizontal className="size-5 text-cyan-200" />
          </CardHeader>
          <div className="grid gap-3">
            <Input placeholder="Full name" defaultValue="Jeremiah Jefry" />
            <Input placeholder="Company" defaultValue="VEXORIUM Studio" />
            <Button className="w-fit">Save profile</Button>
          </div>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Security</CardTitle>
              <CardDescription>Protect the workspace with premium defaults.</CardDescription>
            </div>
            <ShieldCheck className="size-5 text-cyan-200" />
          </CardHeader>
          <div className="grid gap-3">
            <Input placeholder="Current password" type="password" />
            <Input placeholder="New password" type="password" />
            <Button variant="ghost" className="w-fit">
              Update password
            </Button>
          </div>
        </Card>
      </section>
      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Persisted settings powered by localStorage.</CardDescription>
            </div>
          </CardHeader>
          <div className="space-y-4">
            {[
              { key: "emailUpdates", label: "Email updates" },
              { key: "invoiceReminders", label: "Invoice reminders" },
              { key: "productAnnouncements", label: "Product announcements" },
              { key: "weeklyDigest", label: "Weekly digest" },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between rounded-[24px] border border-white/8 bg-white/5 px-4 py-4"
              >
                <div>
                  <p className="font-medium text-white">{item.label}</p>
                  <p className="text-sm text-zinc-500">Stored locally for this demo workspace.</p>
                </div>
                <Switch
                  checked={settings[item.key as keyof typeof settings]}
                  onCheckedChange={(checked) =>
                    setSettings((current) => ({ ...current, [item.key]: checked }))
                  }
                />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect the tooling your agency depends on.</CardDescription>
            </div>
          </CardHeader>
          <div className="space-y-3">
            {["Slack", "Notion", "Stripe", "GitHub"].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-[24px] border border-white/8 bg-white/5 px-4 py-4"
              >
                <div>
                  <p className="font-medium text-white">{item}</p>
                  <p className="text-sm text-zinc-500">Ready to connect when APIs are added.</p>
                </div>
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
