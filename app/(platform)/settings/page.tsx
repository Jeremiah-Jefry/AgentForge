"use client";

import { useState } from "react";

import { updateUserProfile, updateUserPassword } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/toast";
import { useCurrentSession } from "@/hooks/use-session";

export default function SettingsPage() {
  const { toast } = useToast();
  const { user } = useCurrentSession();

  // Local notification settings (kept client-side for now)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: false,
  });

  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) return;

    setSaving(true);
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;

    try {
      await updateUserProfile(user.id, {
        name: `${firstName} ${lastName}`.trim(),
        email,
      });
      toast("Profile saved successfully!", "success");
    } catch {
      toast("Failed to save profile.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) return;

    setChangingPassword(true);
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      toast("Passwords do not match.", "error");
      setChangingPassword(false);
      return;
    }

    if (newPassword.length < 6) {
      toast("Password must be at least 6 characters.", "error");
      setChangingPassword(false);
      return;
    }

    try {
      const result = await updateUserPassword(user.id, {
        currentPassword,
        newPassword,
      });

      if ("error" in result && result.error) {
        toast(result.error, "error");
      } else {
        toast("Password updated!", "success");
        (e.target as HTMLFormElement).reset();
      }
    } catch {
      toast("Failed to update password.", "error");
    } finally {
      setChangingPassword(false);
    }
  };

  const nameParts = user?.name?.split(" ") ?? ["", ""];

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
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--heading)]" htmlFor="firstName">First Name</label>
                  <Input id="firstName" name="firstName" defaultValue={nameParts[0]} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--heading)]" htmlFor="lastName">Last Name</label>
                  <Input id="lastName" name="lastName" defaultValue={nameParts.slice(1).join(" ")} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--heading)]" htmlFor="email">Email</label>
                <Input id="email" name="email" type="email" defaultValue={user?.email ?? ""} />
              </div>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your password and authentication.</CardDescription>
              </div>
            </CardHeader>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--heading)]" htmlFor="currentPassword">Current Password</label>
                <Input id="currentPassword" name="currentPassword" type="password" required />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--heading)]" htmlFor="newPassword">New Password</label>
                  <Input id="newPassword" name="newPassword" type="password" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--heading)]" htmlFor="confirmPassword">Confirm Password</label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" required />
                </div>
              </div>
              <Button variant="outline" type="submit" disabled={changingPassword}>
                {changingPassword ? "Updating..." : "Update Password"}
              </Button>
            </form>
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
