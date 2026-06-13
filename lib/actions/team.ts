"use server";

import { db } from "@/lib/db";

export async function getTeamMembers() {
  const members = await db.user.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      avatarUrl: true,
    },
  });

  return members.map((member) => ({
    ...member,
    initials: member.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase(),
  }));
}

export async function updateMemberRole(userId: string, role: string) {
  const user = await db.user.update({
    where: { id: userId },
    data: { role },
  });

  return { success: true, user };
}
