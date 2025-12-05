"use client";

import React from "react";
import { useUI } from "@/context/UIContext";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { isDark } = useUI();

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div
        className={`flex-1 flex flex-col min-h-screen ${
          isDark ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"
        }`}
      >
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
