"use server";

import { db } from "@/lib/db";

export async function getTasks() {
  const tasks = await db.task.findMany({
    orderBy: { createdAt: "asc" },
  });

  return tasks;
}

export async function createTask(data: {
  title: string;
  owner: string;
  due: string;
  column?: string;
  userId?: string;
}) {
  const task = await db.task.create({
    data: {
      title: data.title,
      owner: data.owner,
      due: data.due,
      column: data.column ?? "TODO",
      userId: data.userId,
    },
  });

  return { success: true, task };
}

export async function moveTask(id: string, column: string) {
  const task = await db.task.update({
    where: { id },
    data: { column },
  });

  return { success: true, task };
}

export async function updateTask(
  id: string,
  data: {
    title?: string;
    owner?: string;
    due?: string;
    column?: string;
  },
) {
  const task = await db.task.update({
    where: { id },
    data,
  });

  return { success: true, task };
}

export async function deleteTask(id: string) {
  await db.task.delete({
    where: { id },
  });

  return { success: true };
}
