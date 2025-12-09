"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  hasSecondaryBar: boolean;
  setHasSecondaryBar: (value: boolean) => void;
  locked: boolean;
  setLocked: (value: boolean) => void;
  forceSetIsCollapsed: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, _setIsCollapsed] = useState(false);
  const [hasSecondaryBar, setHasSecondaryBar] = useState(false);
  const [locked, setLocked] = useState(false);

  const setIsCollapsed = (value: boolean) => {
    if (locked) return;
    _setIsCollapsed(value);
  };

  // Force set collapsed state, bypassing lock (used by ContentBuilderSidebar to enforce route-based state)
  const forceSetIsCollapsed = (value: boolean) => {
    _setIsCollapsed(value);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, hasSecondaryBar, setHasSecondaryBar, locked, setLocked, forceSetIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}
