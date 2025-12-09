"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUI } from "@/context/UIContext";
import { useSidebar } from "@/context/SidebarContext";

interface NavItemProps {
  href: string;
  label: string;
}

const NavItem = ({ href, label }: NavItemProps) => {
  const pathname = usePathname();
  const { isDark } = useUI();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-white
        ${
          isActive
            ? isDark
              ? "bg-blue-600 text-white"
              : "bg-blue-400 text-white"
            : isDark
            ? "bg-slate-800/60 text-slate-200 hover:bg-slate-800/80"
            : "bg-blue-300/50 text-white hover:bg-blue-300/70"
        }
      `}
    >
      {label}
    </Link>
  );
};

export default function ApiSidebar() {
  const { isDark } = useUI();
  const { isCollapsed } = useSidebar();

  // Calculate left position based on main sidebar state
  const sidebarWidth = isCollapsed ? 80 : 288; // w-20 = 80px, w-72 = 288px

  return (
    <aside
      className={`
        hidden md:flex md:flex-col fixed top-0 h-screen
        flex-shrink-0 z-40 w-64 text-white
        shadow-[2px_0_8px_rgba(0,0,0,0.08),4px_0_12px_rgba(0,0,0,0.05)]
        dark:shadow-[2px_0_8px_rgba(0,0,0,0.2),4px_0_12px_rgba(0,0,0,0.15)]
        border-r border-transparent dark:border-transparent
        transition-all duration-300 ease-in-out overflow-x-hidden overflow-y-auto
        ${
          isDark ? "bg-slate-900" : "bg-gradient-to-b from-blue-500 to-blue-600"
        }
      `}
      style={{
        left: `${sidebarWidth}px`,
      }}
    >
      {/* Logo Section */}
      <div className="flex-shrink-0 p-6 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/15 flex items-center justify-center flex-shrink-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
            <Image
              src="/logo-cms.png"
              alt="CMS Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-white">
            CMS
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 pt-2 space-y-4 overflow-y-auto">
        {/* Main Setting Section */}
        <div className="space-y-2">
          <h2 className="px-2 text-sm font-semibold uppercase tracking-wide text-white">
            Main Setting
          </h2>
          <div className="space-y-1.5">
            <NavItem
              href="/Dashboard/content-builder/setting/activity-logs"
              label="Activity Logs"
            />
            <NavItem
              href="/Dashboard/content-builder/setting/workflow-approval"
              label="Workflow Approval"
            />
          </div>
        </div>

        {/* Administration Panel Section */}
        <div className="space-y-2">
          <h2 className="px-2 text-sm font-semibold uppercase tracking-wide text-white">
            Administration Panel
          </h2>
          <div className="space-y-1.5">
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
