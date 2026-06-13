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

export const revenueSeries = [
  { name: "Jan", revenue: 44000, forecast: 41000 },
  { name: "Feb", revenue: 51000, forecast: 45500 },
  { name: "Mar", revenue: 48500, forecast: 47000 },
  { name: "Apr", revenue: 62000, forecast: 53000 },
  { name: "May", revenue: 71500, forecast: 59000 },
  { name: "Jun", revenue: 82490, forecast: 68000 },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    detail: "Essential tools for small teams. Includes up to 5 team members, basic analytics, task tracking, and standard billing.",
    cta: "Start free trial",
    featured: false,
  },
  {
    name: "Pro",
    price: "$99",
    detail: "Complete operating system for growing agencies. Unlimited active clients, advanced workflow automations, custom branding, and team roles.",
    cta: "Get started",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    detail: "For scaling global agencies. Custom integrations, advanced security, SOC 2 compliance, dedicated success manager, and custom SLA agreements.",
    cta: "Contact Sales",
    featured: false,
  },
];

export const faqs = [
  {
    question: "How does VEXORIUM secure our agency and client data?",
    answer:
      "We take security seriously. All data is encrypted in transit and at rest using bank-grade AES-256 encryption. We also support single sign-on (SSO), granular role-based permissions, and our infrastructure is SOC 2 compliant.",
  },
  {
    question: "Can we collaborate directly with our clients?",
    answer:
      "Absolutely. VEXORIUM includes dedicated Client Portals where you can securely share project boards, files, invoices, and messaging, keeping your clients aligned without exposing internal team chatter.",
  },
  {
    question: "What platforms does VEXORIUM integrate with?",
    answer:
      "VEXORIUM integrates natively with standard agency tools including Slack, Stripe, GitHub, Figma, Google Calendar, and HubSpot. You can also build custom triggers and actions using our REST API or Zapier.",
  },
];
