import {
  Activity,
  BriefcaseBusiness,
  CreditCard,
  Gauge,
  Sparkles,
  Users,
} from "lucide-react";

export const navItems = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Clients", href: "/clients" },
  { title: "Billing", href: "/billing" },
  { title: "Team", href: "/team" },
  { title: "Settings", href: "/settings" },
];

export const marketingFeatures = [
  {
    icon: Users,
    title: "Team collaboration",
    description:
      "Live workflows, rich permissions, and async decision-making in one cinematic workspace.",
  },
  {
    icon: Gauge,
    title: "Smart analytics",
    description:
      "Track revenue, utilization, and campaign velocity with real-time SaaS-grade telemetry.",
  },
  {
    icon: CreditCard,
    title: "Billing command center",
    description:
      "Invoices, subscriptions, and revenue recovery all surfaced through polished workflows.",
  },
  {
    icon: Activity,
    title: "Workflow automation",
    description:
      "Ship repeatable operations with automated reminders, approvals, and alerts.",
  },
  {
    icon: Sparkles,
    title: "Client insights",
    description:
      "Surface health scores, sentiment shifts, and renewal signals before risk appears.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Agency ops hub",
    description:
      "Projects, tasks, talent, and billing aligned in a single premium operating system.",
  },
];

export const landingStats = [
  { label: "Active users", value: "12.8K" },
  { label: "MRR tracked", value: "$2.4M" },
  { label: "Automation", value: "93%" },
];

export const dashboardStats = [
  { label: "Revenue", value: "$82.5K", delta: "+18.2%", tone: "cyan" },
  { label: "Active clients", value: "124", delta: "+7", tone: "violet" },
  { label: "Monthly growth", value: "24.6%", delta: "+4.1%", tone: "emerald" },
  { label: "Pending tasks", value: "18", delta: "-3", tone: "amber" },
];

export const revenueSeries = [
  { name: "Jan", revenue: 44000, forecast: 41000 },
  { name: "Feb", revenue: 51000, forecast: 45500 },
  { name: "Mar", revenue: 48500, forecast: 47000 },
  { name: "Apr", revenue: 62000, forecast: 53000 },
  { name: "May", revenue: 71500, forecast: 59000 },
  { name: "Jun", revenue: 82490, forecast: 68000 },
];

export const performanceSeries = [
  { name: "Creative", score: 92 },
  { name: "Paid", score: 88 },
  { name: "SEO", score: 81 },
  { name: "Product", score: 95 },
  { name: "Client care", score: 90 },
];

export const clientTable = [
  {
    name: "Orbit Labs",
    project: "Website Redesign",
    stage: "In progress",
    payment: "Paid",
    performance: "91%",
  },
  {
    name: "Nova Systems",
    project: "CRM Migration",
    stage: "Delivered",
    payment: "Paid",
    performance: "95%",
  },
  {
    name: "Northline",
    project: "Brand Campaign",
    stage: "Review",
    payment: "Pending",
    performance: "78%",
  },
  {
    name: "Aether AI",
    project: "Retention Funnel",
    stage: "On track",
    payment: "Upcoming",
    performance: "89%",
  },
];

export const activities = [
  {
    title: "Aisha updated website redesign assets",
    detail: "Figma design system synced to production backlog.",
    time: "08:12",
  },
  {
    title: "Invoice #348 was paid by Orbit Labs",
    detail: "Finance marked the wire as settled and reconciled.",
    time: "09:04",
  },
  {
    title: "Northline requested scope expansion",
    detail: "Stakeholder notes are attached for pricing review.",
    time: "11:25",
  },
  {
    title: "Standup action items distributed",
    detail: "Team owners assigned for each active launch stream.",
    time: "12:10",
  },
];

export const billingRows = [
  { invoice: "#348", date: "May 18", amount: "$1,240", status: "Paid" },
  { invoice: "#347", date: "Apr 18", amount: "$980", status: "Paid" },
  { invoice: "#346", date: "Mar 18", amount: "$1,120", status: "Pending" },
  { invoice: "#345", date: "Feb 18", amount: "$960", status: "Paid" },
];

export const teamMembers = [
  {
    name: "Aisha Morgan",
    role: "Product Lead",
    status: "Online",
    initials: "AM",
  },
  {
    name: "Luca Tan",
    role: "Design Director",
    status: "Online",
    initials: "LT",
  },
  {
    name: "Jin Walker",
    role: "Operations",
    status: "Away",
    initials: "JW",
  },
  {
    name: "Maya Chen",
    role: "Growth Strategist",
    status: "Focus",
    initials: "MC",
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    detail: "Clients, projects, tasks, and invoicing.",
    cta: "Choose Starter",
    featured: false,
  },
  {
    name: "Pro",
    price: "$99",
    detail: "Advanced analytics, automation, and team permissions.",
    cta: "Choose Pro",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    detail: "SSO, SOC-ready controls, and dedicated success support.",
    cta: "Contact Sales",
    featured: false,
  },
];

export const faqs = [
  {
    question: "Can I use VEXORIUM without a backend?",
    answer:
      "Yes. This frontend uses local state, mock data, and localStorage so it is instantly deployable for demos and client portfolios.",
  },
  {
    question: "Does the dashboard support mobile workflows?",
    answer:
      "Yes. The app ships with a responsive shell, animated mobile sidebar, condensed cards, and touch-friendly actions.",
  },
  {
    question: "Can I adapt the design for a real SaaS product?",
    answer:
      "Absolutely. The component structure is modular, the visual system is reusable, and the routes are ready to be wired to real APIs later.",
  },
];
