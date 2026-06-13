"use server";

import { hashSync } from "bcryptjs";

import { db } from "@/lib/db";

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  const existing = await db.user.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = hashSync(data.password, 12);

  const user = await db.user.create({
    data: {
      email: data.email,
      name: data.name,
      passwordHash,
      role: "MEMBER",
      status: "Online",
    },
  });

  return { success: true, userId: user.id };
}

export async function getCurrentUser(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      avatarUrl: true,
      createdAt: true,
    },
  });

  return user;
}

export async function updateUserProfile(
  userId: string,
  data: { name?: string; email?: string },
) {
  const user = await db.user.update({
    where: { id: userId },
    data,
  });

  return { success: true, user };
}

export async function updateUserPassword(
  userId: string,
  data: { currentPassword: string; newPassword: string },
) {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return { error: "User not found." };
  }

  const { compareSync } = await import("bcryptjs");
  const match = compareSync(data.currentPassword, user.passwordHash);

  if (!match) {
    return { error: "Current password is incorrect." };
  }

  const passwordHash = hashSync(data.newPassword, 12);

  await db.user.update({
    where: { id: userId },
    data: { passwordHash },
  });

  return { success: true };
}
