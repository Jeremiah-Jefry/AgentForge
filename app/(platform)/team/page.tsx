"use client";

import { Mail, Plus, Shield } from "lucide-react";
import { motion } from "framer-motion";

import { TeamCard } from "@/components/cards/team-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast";
import { useTeamMembers } from "@/hooks/use-team";

export default function TeamPage() {
  const { data: teamMembers, isLoading } = useTeamMembers();
  const { toast } = useToast();

  return (
    <div className="space-y-6 pb-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-semibold text-[var(--heading)]">Team</h1>
          <p className="text-sm text-[var(--text-secondary)]">Manage your agency members and permissions.</p>
        </div>
        <Button onClick={() => toast("Add member modal coming soon!", "info")}>
          <Plus className="size-4" />
          Add Member
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[160px] w-full rounded-[28px]" />
            ))
          : teamMembers?.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TeamCard
                  name={member.name}
                  role={member.role}
                  status={member.status}
                  initials={member.initials}
                />
              </motion.div>
            ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-500 dark:text-violet-200">
                <Shield className="size-5" />
              </div>
              <CardTitle>Role Permissions</CardTitle>
            </div>
          </CardHeader>
          <div className="space-y-4">
            {["Admin", "Manager", "Member"].map((role) => (
              <div
                key={role}
                className="flex items-center justify-between rounded-[22px] border border-[var(--card-inner-border)] bg-[var(--card-inner-bg)] px-4 py-4"
              >
                <p className="font-medium text-[var(--heading)]">{role}</p>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-500 dark:text-cyan-200">
                <Mail className="size-5" />
              </div>
              <CardTitle>Pending Invites</CardTitle>
            </div>
          </CardHeader>
          <div className="space-y-4">
            <div className="flex gap-3">
              <Input placeholder="name@agency.com" className="flex-1" />
              <Button onClick={() => toast("Invite sent!", "success")}>Send Invite</Button>
            </div>
            <div className="rounded-[22px] border border-[var(--card-inner-border)] bg-[var(--card-inner-bg)] px-4 py-8 text-center">
              <p className="text-sm text-[var(--text-tertiary)]">No pending invitations.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
