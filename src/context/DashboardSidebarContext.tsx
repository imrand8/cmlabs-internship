"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type DashboardSidebarContextType = {
  isCollapsed: boolean;
  toggle: () => void;
};

const DashboardSidebarContext =
  createContext<DashboardSidebarContextType | null>(null);

export function DashboardSidebarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const value: DashboardSidebarContextType = {
    isCollapsed,
    toggle: () => setIsCollapsed((v) => !v),
  };

  return (
    <DashboardSidebarContext.Provider value={value}>
      {children}
    </DashboardSidebarContext.Provider>
  );
}

export function useDashboardSidebar() {
  const ctx = useContext(DashboardSidebarContext);
  if (!ctx) {
    throw new Error(
      "useDashboardSidebar must be used within DashboardSidebarProvider"
    );
  }
  return ctx;
}
