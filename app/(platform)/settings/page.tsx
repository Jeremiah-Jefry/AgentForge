"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { updateUserProfile, updateUserPassword } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/toast";
import { useCurrentSession } from "@/hooks/use-session";
import { passwordSchema, profileSchema, type PasswordValues, type ProfileValues } from "@/lib/validation";

export default function SettingsPage() {
  const { toast } = useToast();
  const { user } = useCurrentSession();
  const profileForm = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });
  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Local notification settings (kept client-side for now)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: false,
  });

  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    const [firstName = "", ...rest] = user.name?.split(" ") ?? [];

    profileForm.reset({
      firstName,
      lastName: rest.join(" "),
      email: user.email ?? "",
    });
  }, [profileForm, user]);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const handleSaveProfile = async (values: ProfileValues) => {
    if (!user?.id) return;

    setSaving(true);

    try {
      await updateUserProfile(user.id, {
        name: `${values.firstName} ${values.lastName}`.trim(),
        email: values.email,
      });
      toast("Profile saved successfully!", "success");
    } catch {
      toast("Failed to save profile.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (values: PasswordValues) => {
    if (!user?.id) return;

    setChangingPassword(true);

    try {
      const result = await updateUserPassword(user.id, {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      if ("error" in result && result.error) {
        passwordForm.setError("root", { message: result.error });
        toast(result.error, "error");
      } else {
        toast("Password updated!", "success");
        passwordForm.reset();
      }
    } catch {
      passwordForm.setError("root", { message: "Failed to update password." });
      toast("Failed to update password.", "error");
    } finally {
      setChangingPassword(false);
    }
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
              <form onSubmit={profileForm.handleSubmit(handleSaveProfile)} className="space-y-4" noValidate>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--heading)]" htmlFor="firstName">First Name</label>
                    <Input
                      id="firstName"
                      placeholder="Alex"
                      {...profileForm.register("firstName")}
                      aria-invalid={!!profileForm.formState.errors.firstName}
                      className={profileForm.formState.errors.firstName ? "border-red-400/40 focus:border-red-400 focus:ring-red-400/20" : undefined}
                    />
                    {profileForm.formState.errors.firstName ? (
                      <p className="text-xs text-red-400">{profileForm.formState.errors.firstName.message}</p>
                    ) : null}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--heading)]" htmlFor="lastName">Last Name</label>
                    <Input
                      id="lastName"
                      placeholder="Johnson"
                      {...profileForm.register("lastName")}
                      aria-invalid={!!profileForm.formState.errors.lastName}
                      className={profileForm.formState.errors.lastName ? "border-red-400/40 focus:border-red-400 focus:ring-red-400/20" : undefined}
                    />
                    {profileForm.formState.errors.lastName ? (
                      <p className="text-xs text-red-400">{profileForm.formState.errors.lastName.message}</p>
                    ) : null}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--heading)]" htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    {...profileForm.register("email")}
                    aria-invalid={!!profileForm.formState.errors.email}
                    className={profileForm.formState.errors.email ? "border-red-400/40 focus:border-red-400 focus:ring-red-400/20" : undefined}
                  />
                  {profileForm.formState.errors.email ? (
                    <p className="text-xs text-red-400">{profileForm.formState.errors.email.message}</p>
                  ) : null}
              </div>
                {profileForm.formState.errors.root ? (
                  <p className="text-xs text-red-400">{profileForm.formState.errors.root.message}</p>
                ) : null}
                <Button type="submit" disabled={saving || profileForm.formState.isSubmitting}>
                  {saving || profileForm.formState.isSubmitting ? "Saving..." : "Save Profile"}
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
              <form onSubmit={passwordForm.handleSubmit(handleChangePassword)} className="space-y-4" noValidate>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--heading)]" htmlFor="currentPassword">Current Password</label>
                  <Input
                    id="currentPassword"
                    type="password"
                    {...passwordForm.register("currentPassword")}
                    aria-invalid={!!passwordForm.formState.errors.currentPassword}
                    className={passwordForm.formState.errors.currentPassword ? "border-red-400/40 focus:border-red-400 focus:ring-red-400/20" : undefined}
                  />
                  {passwordForm.formState.errors.currentPassword ? (
                    <p className="text-xs text-red-400">{passwordForm.formState.errors.currentPassword.message}</p>
                  ) : null}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--heading)]" htmlFor="newPassword">New Password</label>
                    <Input
                      id="newPassword"
                      type="password"
                      {...passwordForm.register("newPassword")}
                      aria-invalid={!!passwordForm.formState.errors.newPassword}
                      className={passwordForm.formState.errors.newPassword ? "border-red-400/40 focus:border-red-400 focus:ring-red-400/20" : undefined}
                    />
                    {passwordForm.formState.errors.newPassword ? (
                      <p className="text-xs text-red-400">{passwordForm.formState.errors.newPassword.message}</p>
                    ) : null}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--heading)]" htmlFor="confirmPassword">Confirm Password</label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      {...passwordForm.register("confirmPassword")}
                      aria-invalid={!!passwordForm.formState.errors.confirmPassword}
                      className={passwordForm.formState.errors.confirmPassword ? "border-red-400/40 focus:border-red-400 focus:ring-red-400/20" : undefined}
                    />
                    {passwordForm.formState.errors.confirmPassword ? (
                      <p className="text-xs text-red-400">{passwordForm.formState.errors.confirmPassword.message}</p>
                    ) : null}
                </div>
              </div>
                {passwordForm.formState.errors.root ? (
                  <p className="text-xs text-red-400">{passwordForm.formState.errors.root.message}</p>
                ) : null}
                <Button variant="outline" type="submit" disabled={changingPassword || passwordForm.formState.isSubmitting}>
                  {changingPassword || passwordForm.formState.isSubmitting ? "Updating..." : "Update Password"}
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
