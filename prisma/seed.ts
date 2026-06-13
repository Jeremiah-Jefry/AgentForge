import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.activity.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.task.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  // --- Users ---
  const admin = await prisma.user.create({
    data: {
      email: "alex@vexorium.com",
      name: "Alex Rivera",
      passwordHash: hashSync("password123", 12),
      role: "ADMIN",
      status: "Online",
    },
  });

  const aisha = await prisma.user.create({
    data: {
      email: "aisha@vexorium.com",
      name: "Aisha Morgan",
      passwordHash: hashSync("password123", 12),
      role: "MANAGER",
      status: "Online",
    },
  });

  const luca = await prisma.user.create({
    data: {
      email: "luca@vexorium.com",
      name: "Luca Tan",
      passwordHash: hashSync("password123", 12),
      role: "MANAGER",
      status: "Online",
    },
  });

  const jin = await prisma.user.create({
    data: {
      email: "jin@vexorium.com",
      name: "Jin Walker",
      passwordHash: hashSync("password123", 12),
      role: "MEMBER",
      status: "Away",
    },
  });

  const maya = await prisma.user.create({
    data: {
      email: "maya@vexorium.com",
      name: "Maya Chen",
      passwordHash: hashSync("password123", 12),
      role: "MEMBER",
      status: "Focus",
    },
  });

  console.log("  ✅ Users created");

  // --- Clients ---
  const orbitLabs = await prisma.client.create({
    data: {
      name: "Orbit Labs",
      project: "Website Redesign",
      stage: "In progress",
      payment: "Paid",
      performance: "91%",
      health: "94%",
    },
  });

  const novaSystems = await prisma.client.create({
    data: {
      name: "Nova Systems",
      project: "CRM Migration",
      stage: "Delivered",
      payment: "Paid",
      performance: "95%",
      health: "88%",
    },
  });

  const northline = await prisma.client.create({
    data: {
      name: "Northline",
      project: "Brand Campaign",
      stage: "Review",
      payment: "Pending",
      performance: "78%",
      health: "82%",
    },
  });

  const aetherAI = await prisma.client.create({
    data: {
      name: "Aether AI",
      project: "Retention Funnel",
      stage: "On track",
      payment: "Upcoming",
      performance: "89%",
      health: "91%",
    },
  });

  console.log("  ✅ Clients created");

  // --- Tasks ---
  await prisma.task.createMany({
    data: [
      {
        title: "Finalize onboarding flow",
        owner: "Aisha",
        due: "Today",
        column: "TODO",
        userId: aisha.id,
      },
      {
        title: "Review proposal drafts",
        owner: "Luca",
        due: "Tomorrow",
        column: "TODO",
        userId: luca.id,
      },
      {
        title: "Launch Q2 analytics panel",
        owner: "Jin",
        due: "In 2 days",
        column: "PROGRESS",
        userId: jin.id,
      },
      {
        title: "Automate overdue reminders",
        owner: "Maya",
        due: "This week",
        column: "PROGRESS",
        userId: maya.id,
      },
      {
        title: "Refactor billing metrics cards",
        owner: "Alex",
        due: "Done",
        column: "DONE",
        userId: admin.id,
      },
      {
        title: "Deploy client health insights",
        owner: "Aisha",
        due: "Done",
        column: "DONE",
        userId: aisha.id,
      },
    ],
  });

  console.log("  ✅ Tasks created");

  // --- Invoices ---
  await prisma.invoice.createMany({
    data: [
      {
        invoiceNumber: "#348",
        date: "May 18",
        amount: "$1,240",
        status: "Paid",
        clientId: orbitLabs.id,
      },
      {
        invoiceNumber: "#347",
        date: "Apr 18",
        amount: "$980",
        status: "Paid",
        clientId: novaSystems.id,
      },
      {
        invoiceNumber: "#346",
        date: "Mar 18",
        amount: "$1,120",
        status: "Pending",
        clientId: northline.id,
      },
      {
        invoiceNumber: "#345",
        date: "Feb 18",
        amount: "$960",
        status: "Paid",
        clientId: aetherAI.id,
      },
    ],
  });

  console.log("  ✅ Invoices created");

  // --- Activities ---
  await prisma.activity.createMany({
    data: [
      {
        title: "Aisha updated website redesign assets",
        detail: "Figma design system synced to production backlog.",
        time: "08:12",
        userId: aisha.id,
      },
      {
        title: "Invoice #348 was paid by Orbit Labs",
        detail: "Finance marked the wire as settled and reconciled.",
        time: "09:04",
        userId: admin.id,
      },
      {
        title: "Northline requested scope expansion",
        detail: "Stakeholder notes are attached for pricing review.",
        time: "11:25",
        userId: luca.id,
      },
      {
        title: "Standup action items distributed",
        detail: "Team owners assigned for each active launch stream.",
        time: "12:10",
        userId: jin.id,
      },
    ],
  });

  console.log("  ✅ Activities created");
  console.log("🎉 Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
