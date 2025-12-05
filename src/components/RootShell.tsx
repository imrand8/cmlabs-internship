"use client";

import { usePathname } from "next/navigation";
import DashboardSidebar from "@/components/sidebar";
import Header from "@/components/header";
import { useUI } from "@/context/UIContext";
import {
  DashboardSidebarProvider,
  useDashboardSidebar,
} from "@/context/DashboardSidebarContext";

function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isDark } = useUI();
  const { isCollapsed } = useDashboardSidebar();

  return (
    <div
      className={`h-screen w-full overflow-hidden flex ${
        isDark ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-900"
      }`} /* make parent a flex row so sidebar and content sit side-by-side */
    >
      {/* SIDEBAR */}
      <DashboardSidebar />

      {/* WRAPPER KANAN: HEADER + MAIN (flex-1 so it fills remaining space, min-w-0 to allow flex shrinking) */}
      <div className="flex-1 h-screen flex flex-col min-w-0">
        {/* HEADER: tetap di atas, tanpa background wrapper supaya header sendiri yang menampilkan efek kaca */}
        <header
          className={`flex items-center transition-all duration-300 ease-in-out w-full flex-shrink-0`}
        >
          <Header />
        </header>

        {/* MAIN CONTENT: scrollable di sini, tanpa ml pl yang membuat celah */}
        <main
          className={`flex-1 overflow-y-auto pb-8 px-6 md:px-10 transition-all duration-300 ease-in-out min-w-0`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isContentBuilder = pathname?.startsWith("/Dashboard/content-builder");

  const isMainDashboard =
    pathname === "/Dashboard" ||
    pathname?.startsWith("/Dashboard/dash") ||
    pathname?.startsWith("/Dashboard/organizational") ||
    pathname?.startsWith("/Dashboard/personal") ||
    pathname?.startsWith("/Dashboard/notification");

  if (isContentBuilder) {
    return <>{children}</>;
  }

  if (isMainDashboard) {
    return (
      <DashboardSidebarProvider>
        <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>
      </DashboardSidebarProvider>
    );
  }

  return <>{children}</>;
}
