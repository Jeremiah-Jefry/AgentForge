"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useMemo,
} from "react";

import { useLocalStorage } from "@/hooks/use-local-storage";

export type BoardColumn = "todo" | "progress" | "done";

export type TaskItem = {
  id: string;
  title: string;
  owner: string;
  due: string;
  column: BoardColumn;
};

type NotificationItem = {
  id: number;
  title: string;
  detail: string;
  time: string;
  unread: boolean;
};

type SettingsState = {
  emailUpdates: boolean;
  invoiceReminders: boolean;
  productAnnouncements: boolean;
  weeklyDigest: boolean;
};

type WorkspaceContextValue = {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  dashboardRange: string;
  setDashboardRange: Dispatch<SetStateAction<string>>;
  notifications: NotificationItem[];
  setNotifications: Dispatch<SetStateAction<NotificationItem[]>>;
  settings: SettingsState;
  setSettings: Dispatch<SetStateAction<SettingsState>>;
  tasks: TaskItem[];
  setTasks: Dispatch<SetStateAction<TaskItem[]>>;
};

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "Orbit Labs renewed their retainer",
    detail: "A $12.4k annual contract was approved by finance.",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "Launch review moved forward",
    detail: "Northline requested an accelerated stakeholder demo.",
    time: "11 min ago",
    unread: true,
  },
  {
    id: 3,
    title: "Automation rule executed",
    detail: "Billing reminders were sent to 8 pending accounts.",
    time: "38 min ago",
    unread: false,
  },
];

const initialSettings: SettingsState = {
  emailUpdates: true,
  invoiceReminders: true,
  productAnnouncements: false,
  weeklyDigest: true,
};

const initialTasks: TaskItem[] = [
  {
    id: "task-1",
    title: "Finalize onboarding flow",
    owner: "Aisha",
    due: "Today",
    column: "todo",
  },
  {
    id: "task-2",
    title: "Review proposal drafts",
    owner: "Luca",
    due: "Tomorrow",
    column: "todo",
  },
  {
    id: "task-3",
    title: "Launch Q2 analytics panel",
    owner: "Jin",
    due: "In 2 days",
    column: "progress",
  },
  {
    id: "task-4",
    title: "Automate overdue reminders",
    owner: "Maya",
    due: "This week",
    column: "progress",
  },
  {
    id: "task-5",
    title: "Refactor billing metrics cards",
    owner: "Kai",
    due: "Done",
    column: "done",
  },
  {
    id: "task-6",
    title: "Deploy client health insights",
    owner: "Noa",
    due: "Done",
    column: "done",
  },
];

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useLocalStorage<boolean>(
    "vexorium-sidebar-open",
    false,
  );
  const [dashboardRange, setDashboardRange] = useLocalStorage<string>(
    "vexorium-dashboard-range",
    "30d",
  );
  const [notifications, setNotifications] = useLocalStorage<NotificationItem[]>(
    "vexorium-notifications",
    initialNotifications,
  );
  const [settings, setSettings] = useLocalStorage<SettingsState>(
    "vexorium-settings",
    initialSettings,
  );
  const [tasks, setTasks] = useLocalStorage<TaskItem[]>(
    "vexorium-tasks",
    initialTasks,
  );

  const value = useMemo(
    () => ({
      sidebarOpen,
      setSidebarOpen,
      dashboardRange,
      setDashboardRange,
      notifications,
      setNotifications,
      settings,
      setSettings,
      tasks,
      setTasks,
    }),
    [
      dashboardRange,
      notifications,
      settings,
      sidebarOpen,
      tasks,
      setDashboardRange,
      setNotifications,
      setSettings,
      setSidebarOpen,
      setTasks,
    ],
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error("useWorkspace must be used within WorkspaceProvider");
  }

  return context;
}
