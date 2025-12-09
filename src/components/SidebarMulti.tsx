"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUI } from "@/context/UIContext";
import { useSidebar } from "@/context/SidebarContext";
import { useState } from "react";

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const NavItem = ({ href, label, icon }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-medium
        transition-all duration-200
        ${
          isActive
            ? "bg-white/30 text-white"
            : "bg-white/15 text-white hover:bg-white/25"
        }
      `}
    >
      <span className="flex items-center justify-center flex-shrink-0 w-5 h-5">
        {icon}
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </Link>
  );
};

export default function SidebarMulti() {
  const { isDark } = useUI();
  const { isCollapsed } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate left position based on main sidebar state
  const sidebarWidth = isCollapsed ? 80 : 288; // w-20 = 80px, w-72 = 288px

  return (
    <aside
      className={`
        hidden md:flex md:flex-col fixed top-0 h-screen
        flex-shrink-0 z-30 w-64 text-white
        shadow-[2px_0_8px_rgba(0,0,0,0.08),4px_0_12px_rgba(0,0,0,0.05)]
        dark:shadow-[2px_0_8px_rgba(0,0,0,0.2),4px_0_12px_rgba(0,0,0,0.15)]
        border-r border-transparent dark:border-transparent
        transition-all duration-300 ease-in-out overflow-x-hidden overflow-y-auto
      `}
      style={{
        left: `${sidebarWidth}px`,
        background: isDark
          ? "rgba(15, 23, 42, 0.75)"
          : "rgba(37, 99, 235, 0.75)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        isolation: "isolate",
      }}
    >
      {/* Logo Section */}
      <div className="flex-shrink-0 p-6">
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
          <h1 className="text-3xl font-medium tracking-tight">CMS</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-shrink-0 px-4 pb-2">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-lg pl-10 pr-3 py-2.5 bg-white/15 text-white placeholder:text-white/60 border-none focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 p-4 space-y-4 overflow-y-auto"
        style={{ paddingTop: "20px" }}
      >
        {/* Single Page Section */}
        <div className="space-y-2.5">
          <div className="px-1 text-xs font-semibold tracking-wide text-white/80 uppercase">
            Single Page
          </div>
          <NavItem
            href="/Dashboard/content-builder/single-page"
            label="Home"
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            }
          />
        </div>

        {/* Multiple Page Section */}
        <div className="space-y-2.5">
          <div className="px-1 text-xs font-semibold tracking-wide text-white/80 uppercase">
            Multiple Page
          </div>
          <NavItem
            href="/Dashboard/content-builder/multi-page"
            label="Pages"
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            }
          />
        </div>
      </nav>
    </aside>
  );
}
