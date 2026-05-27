import { Sparkles } from "lucide-react";

import { TeamCard } from "@/components/cards/team-card";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { activities, teamMembers } from "@/data/mock-data";

export default function TeamPage() {
  return (
    <div className="space-y-4 pb-6">
      <Card className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Team management</p>
        <h1 className="text-4xl font-semibold text-white">High-performance talent, beautifully orchestrated.</h1>
        <p className="max-w-2xl text-sm leading-7 text-zinc-400">
          Manage permissions, team visibility, and operating rhythm with premium cards designed for modern SaaS dashboards.
        </p>
      </Card>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {teamMembers.map((member) => (
          <TeamCard key={member.name} {...member} />
        ))}
      </section>
      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Team activity</CardTitle>
              <CardDescription>Live updates across shipping teams.</CardDescription>
            </div>
            <Sparkles className="size-5 text-cyan-200" />
          </CardHeader>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.title} className="rounded-[24px] border border-white/8 bg-white/5 p-4">
                <p className="font-medium text-white">{activity.title}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{activity.detail}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Permission presets</CardTitle>
              <CardDescription>Reusable access patterns for agency roles.</CardDescription>
            </div>
          </CardHeader>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              "Leadership access",
              "Client operations",
              "Design reviewers",
              "Billing managers",
            ].map((item) => (
              <div key={item} className="rounded-[24px] border border-white/8 bg-white/5 p-4">
                <p className="font-medium text-white">{item}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Granular permissions packaged for fast onboarding and cleaner handoffs.
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
