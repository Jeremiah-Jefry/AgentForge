"use server";

import { db } from "@/lib/db";

export async function getClients() {
  const clients = await db.client.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      invoices: {
        select: { id: true, status: true, amount: true },
      },
    },
  });

  return clients;
}

export async function getClientById(id: string) {
  const client = await db.client.findUnique({
    where: { id },
    include: {
      invoices: true,
    },
  });

  return client;
}

export async function createClient(data: {
  name: string;
  project: string;
  stage?: string;
  payment?: string;
  performance?: string;
  health?: string;
}) {
  const client = await db.client.create({
    data: {
      name: data.name,
      project: data.project,
      stage: data.stage ?? "Discovery",
      payment: data.payment ?? "Pending",
      performance: data.performance ?? "0%",
      health: data.health ?? "0%",
    },
  });

  return { success: true, client };
}

export async function updateClient(
  id: string,
  data: {
    name?: string;
    project?: string;
    stage?: string;
    payment?: string;
    performance?: string;
    health?: string;
  },
) {
  const client = await db.client.update({
    where: { id },
    data,
  });

  return { success: true, client };
}

export async function deleteClient(id: string) {
  await db.client.delete({
    where: { id },
  });

  return { success: true };
}
