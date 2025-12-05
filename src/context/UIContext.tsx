"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

interface UIContextProps {
  isDark: boolean;
  toggleDark: () => void;
  collapsed: boolean;
  toggleCollapsed: () => void;
  secondaryOpen: boolean;
  setSecondaryOpen: (v: boolean) => void;
}

const UIContext = createContext<UIContextProps | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [secondaryOpen, setSecondaryOpen] = useState(false);

  // Init dari storage atau prefers-color-scheme
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const s = localStorage.getItem("site:isDark");
      const c = localStorage.getItem("site:sidebarCollapsed");
      const prefersDark = window.matchMedia?.(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(s != null ? s === "true" : !!prefersDark);
      if (c != null) setCollapsed(c === "true");
    } catch {}
  }, []);

  // Persist preferensi
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("site:isDark", String(isDark));
    } catch {}
  }, [isDark]);

  // Sync Tailwind 'dark' class on <html> with isDark state
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const el = document.documentElement;
      if (isDark) el.classList.add("dark");
      else el.classList.remove("dark");
    } catch {}
  }, [isDark]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("site:sidebarCollapsed", String(collapsed));
    } catch {}
  }, [collapsed]);

  // Saat secondary sidebar aktif, auto-collapse sekali (tanpa mengunci)
  useEffect(() => {
    if (secondaryOpen) setCollapsed(true);
  }, [secondaryOpen]);

  const toggleDark = useCallback(() => setIsDark((v) => !v), []);
  const toggleCollapsed = useCallback(() => setCollapsed((v) => !v), []);

  return (
    <UIContext.Provider
      value={{
        isDark,
        toggleDark,
        collapsed,
        toggleCollapsed,
        secondaryOpen,
        setSecondaryOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
