"use client";

import { useUI } from "@/context/UIContext";
import { useSidebar } from "@/context/SidebarContext";
import ContentBuilderSidebar from "@/components/ContentBuilderSidebar";
import SectionSecondarySidebar from "@/components/SecondaryBars/SectionSecondarySidebar";

export default function SectionPage() {
  const { isDark } = useUI();
  const { isCollapsed } = useSidebar();

  return (
    <div className={`min-h-screen w-full ${isDark ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-900"}`}>
      <ContentBuilderSidebar />
      <SectionSecondarySidebar />

      <main className={`min-h-screen px-10 py-12 transition-all duration-300 ease-in-out ${
        isCollapsed ? "ml-[calc(5rem+16rem)]" : "ml-[calc(18rem+16rem)]"
      }`}>
        <h1 className="text-3xl font-bold mb-4">Section Project</h1>
        <p className={isDark ? "text-slate-400" : "text-slate-600"}>
          Manage and create sections for your content builder.
        </p>
      </main>
    </div>
  );
}
