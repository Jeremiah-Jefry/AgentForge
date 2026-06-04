"use client";

import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/toast";

export default function SettingsPage() {
  const { settings, setSettings } = useWorkspace();
  const { toast } = useToast();

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-3xl font-semibold text-[var(--heading)]">Settings</h1>
        <p className="text-sm text-[var(--text-secondary)]">Manage your preferences and integrations.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.6fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
              </div>
            </CardHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--heading)]" htmlFor="firstName">First Name</label>
                  <Input id="firstName" defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--heading)]" htmlFor="lastName">Last Name</label>
                  <Input id="lastName" defaultValue="Rivera" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--heading)]" htmlFor="email">Email</label>
                <Input id="email" type="email" defaultValue="alex@vexorium.com" />
              </div>
              <Button onClick={() => toast("Profile saved successfully!", "success")}>Save Profile</Button>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your password and authentication.</CardDescription>
              </div>
            </CardHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--heading)]" htmlFor="currentPassword">Current Password</label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--heading)]" htmlFor="newPassword">New Password</label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--heading)]" htmlFor="confirmPassword">Confirm Password</label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
              <Button variant="outline" onClick={() => toast("Password updated!", "success")}>Update Password</Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Choose what you want to be notified about.</CardDescription>
              </div>
            </CardHeader>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[var(--heading)]">Email Alerts</p>
                  <p className="text-xs text-[var(--text-tertiary)]">Receive daily summaries.</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleToggle("emailNotifications")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[var(--heading)]">Desktop Push</p>
                  <p className="text-xs text-[var(--text-tertiary)]">Real-time alerts on your device.</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={() => handleToggle("pushNotifications")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[var(--heading)]">Weekly Reports</p>
                  <p className="text-xs text-[var(--text-tertiary)]">Detailed performance stats.</p>
                </div>
                <Switch
                  checked={settings.weeklyReports}
                  onCheckedChange={() => handleToggle("weeklyReports")}
                />
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Connect your favorite tools.</CardDescription>
              </div>
            </CardHeader>
            <div className="space-y-4">
              {["Slack", "Stripe", "GitHub"].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <p className="font-medium text-[var(--heading)]">{item}</p>
                  <Button variant="ghost" size="sm" onClick={() => toast(`${item} settings opened`, "info")}>
                    Manage
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
