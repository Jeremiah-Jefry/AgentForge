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

type WorkspaceContextValue = {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  dashboardRange: string;
  setDashboardRange: Dispatch<SetStateAction<string>>;
};

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

  const value = useMemo(
    () => ({
      sidebarOpen,
      setSidebarOpen,
      dashboardRange,
      setDashboardRange,
    }),
    [
      dashboardRange,
      sidebarOpen,
      setDashboardRange,
      setSidebarOpen,
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
