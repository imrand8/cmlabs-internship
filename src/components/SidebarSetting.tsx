"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUI } from "@/context/UIContext";
import { useSidebar } from "@/context/SidebarContext";

interface NavItemProps {
  href: string;
  label: string;
}

const NavItem = ({ href, label }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
        ${
          isActive
            ? "bg-blue-500 text-white"
            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
        }
      `}
    >
      {label}
    </Link>
  );
};

export default function SidebarSetting() {
  const { isDark } = useUI();
  const { isCollapsed } = useSidebar();

  // Calculate left position based on main sidebar state
  const sidebarWidth = isCollapsed ? 80 : 288; // w-20 = 80px, w-72 = 288px

  return (
    <aside
      className={`
        hidden md:flex md:flex-col fixed top-0 h-screen
        flex-shrink-0 z-40 w-64
        shadow-[2px_0_8px_rgba(0,0,0,0.08),4px_0_12px_rgba(0,0,0,0.05)]
        dark:shadow-[2px_0_8px_rgba(0,0,0,0.2),4px_0_12px_rgba(0,0,0,0.15)]
        border-r border-transparent dark:border-transparent
        transition-all duration-300 ease-in-out overflow-x-hidden overflow-y-auto
      `}
      style={{
        left: `${sidebarWidth}px`,
        background: isDark
          ? "rgba(15, 23, 42, 0.75)"
          : "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        isolation: "isolate",
      }}
    >
      {/* Logo Section */}
      <div className="flex-shrink-0 p-6">
        <h1
          className={`text-xl font-semibold ${
            isDark ? "text-slate-100" : "text-slate-900"
          }`}
        >
          CMS CMLABS
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
        {/* Main Setting Section */}
        <div className="space-y-1">
          <h2
            className={`px-2 text-xs font-semibold uppercase tracking-wide ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Main Setting
          </h2>
          <div className="space-y-0.5">
            <NavItem
              href="/Dashboard/content-builder/setting/activity-logs"
              label="Activity Logs"
            />
            <NavItem
              href="/Dashboard/content-builder/setting/workflow-approval"
              label="Workflow Approval"
            />
            <NavItem
              href="/Dashboard/content-builder/setting/api-integration"
              label="API and Integration"
            />
          </div>
        </div>

        {/* Administration Panel Section */}
        <div className="space-y-1">
          <h2
            className={`px-2 text-xs font-semibold uppercase tracking-wide ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Administration Panel
          </h2>
          <div className="space-y-0.5">
            <NavItem
              href="/Dashboard/content-builder/setting/data-user"
              label="Data User"
            />
            <NavItem
              href="/Dashboard/content-builder/setting/role-management"
              label="Role Management"
            />
          </div>
        </div>
      </nav>
    </aside>
  );
}
