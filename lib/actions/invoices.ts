"use server";

import { db } from "@/lib/db";

export async function getInvoices() {
  const invoices = await db.invoice.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      client: {
        select: { id: true, name: true },
      },
    },
  });

  return invoices;
}

export async function createInvoice(data: {
  invoiceNumber: string;
  date: string;
  amount: string;
  status?: string;
  clientId?: string;
}) {
  const invoice = await db.invoice.create({
    data: {
      invoiceNumber: data.invoiceNumber,
      date: data.date,
      amount: data.amount,
      status: data.status ?? "Pending",
      clientId: data.clientId,
    },
  });

  return { success: true, invoice };
}

export async function updateInvoiceStatus(id: string, status: string) {
  const invoice = await db.invoice.update({
    where: { id },
    data: { status },
  });

  return { success: true, invoice };
}
