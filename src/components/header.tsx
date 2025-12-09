"use client";

import { useUI } from "@/context/UIContext";
import { useSidebar } from "@/context/SidebarContext";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const { toggleCollapsed, isDark, toggleDark, collapsed } = useUI();
  const { isCollapsed: sidebarCollapsed } = useSidebar();
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // LOGIKA FINAL: Tombol disembunyikan jika sidebar fixed (baik maximized maupun minimized)
  const isFixedSizeRoute =
    pathname?.toLowerCase().startsWith("/dashboard/organizational/create") || // Fixed Minimized
    pathname?.toLowerCase().startsWith("/dashboard/dash") || // Fixed Maximized
    pathname
      ?.toLowerCase()
      .startsWith("/dashboard/content-builder/multi-page") || // Fixed untuk multi-page
    pathname?.toLowerCase().startsWith("/dashboard/content-builder/setting"); // Fixed untuk setting

  // Deteksi apakah di path organizational/create (ada SecondaryNav)
  const hasSecondaryNav = pathname
    ?.toLowerCase()
    .startsWith("/dashboard/organizational/create");

  // Deteksi apakah di path content-builder/multi-page (ada SidebarMulti)
  const hasSidebarMulti = pathname
    ?.toLowerCase()
    .startsWith("/dashboard/content-builder/multi-page");

  // Deteksi apakah di path content-builder/setting (ada SidebarSetting)
  const hasSidebarSetting = pathname
    ?.toLowerCase()
    .startsWith("/dashboard/content-builder/setting");

  // Hitung margin-left untuk header agar tidak menutupi SecondaryNav, SidebarMulti, atau SidebarSetting
  // Untuk SecondaryNav: Sidebar collapsed: 80px (w-20), SecondaryNav: 256px (w-64) = 336px total
  // Untuk SidebarMulti: ContentBuilderSidebar collapsed: 80px (w-20), SidebarMulti: 256px (w-64) = 336px
  //                     ContentBuilderSidebar expanded: 288px (w-72), SidebarMulti: 256px (w-64) = 544px
  // Untuk SidebarSetting: ContentBuilderSidebar collapsed: 80px (w-20), SidebarSetting: 256px (w-64) = 336px
  //                       ContentBuilderSidebar expanded: 288px (w-72), SidebarSetting: 256px (w-64) = 544px
  let headerMarginLeft = "0px";
  if (hasSecondaryNav && collapsed) {
    headerMarginLeft = "336px";
  } else if (hasSidebarMulti || hasSidebarSetting) {
    const sidebarWidth = sidebarCollapsed ? 80 : 288;
    const secondarySidebarWidth = 256;
    headerMarginLeft = `${sidebarWidth + secondarySidebarWidth}px`;
  }

  const getBreadcrumb = () => {
    const segments = pathname.split("/").filter(Boolean);

    const routeMap: Record<string, string> = {
      organizational: "Organizational Project",
      personal: "Personal Project",
      create: "Create Project",
      collaborator: "Collaborator",
      setting: "Setting",
    };

    if (segments.length > 0) {
      const mainSegment = segments[segments.length > 2 ? 2 : 1];
      if (!mainSegment) return "Dashboard";
      return (
        routeMap[mainSegment] ||
        mainSegment.charAt(0).toUpperCase() + mainSegment.slice(1)
      );
    }
    return "Dashboard";
  };

  const breadcrumbName = getBreadcrumb();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      // Menggunakan konfigurasi Liquid Glass yang sudah diperbaiki
      className={`sticky top-0 z-30 py-4 transition-all duration-300 ease-in-out
      border-b border-slate-200/50 dark:border-white/10
      ${
        (hasSecondaryNav && collapsed) || hasSidebarMulti || hasSidebarSetting
          ? "pl-0 pr-6 md:pr-8"
          : "px-6 md:px-8"
      }`}
      style={
        {
          height: "80px",
          marginLeft: headerMarginLeft,
          width:
            hasSecondaryNav && collapsed
              ? `calc(100% - 336px)`
              : hasSidebarMulti || hasSidebarSetting
              ? `calc(100% - ${headerMarginLeft.replace("px", "")}px)`
              : "100%",
          // Hilangkan gap dengan memastikan tidak ada margin negatif atau spacing
          marginTop: "0",
          marginBottom: "0",
          boxSizing: "border-box", // Pastikan border tidak menambah lebar
          paddingLeft:
            (hasSecondaryNav && collapsed) ||
            hasSidebarMulti ||
            hasSidebarSetting
              ? "24px"
              : undefined, // Padding untuk konten, bukan untuk gap
          // Liquid Glass Effect - Pastikan tidak ada override
          background: isDark
            ? "rgba(15, 23, 42, 0.75)"
            : "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          // Pastikan efek terlihat
          isolation: "isolate",
        } as React.CSSProperties
      }
    >
      <div className="flex items-center justify-between">
        {/* Kiri: Hamburger + Breadcrumb */}
        <div className="flex items-center gap-3">
          {/* PERBAIKAN: Tombol Hamburger di-hide jika isFixedSizeRoute TRUE */}
          {!isFixedSizeRoute && (
            <button
              onClick={toggleCollapsed} // Tombol ini mengontrol collapse/expand
              type="button"
              aria-label="Toggle sidebar"
              title="Toggle sidebar"
              className="inline-flex w-9 h-9 items-center justify-center rounded-xl
                          bg-slate-900/5 hover:bg-slate-900/10 text-slate-700
                          dark:bg-white/10 dark:hover:bg-white/20 dark:text-white
                          transition-colors shadow-sm"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500 dark:text-slate-400">Pages</span>
            <span className="text-slate-400">/</span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              {breadcrumbName}
            </span>
          </div>
        </div>

        {/* Kanan: Toggle Tema + Quick Access + Profil */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDark}
            type="button"
            aria-label="Toggle theme"
            title="Toggle theme"
            className="group theme-pill"
          >
            <div className="relative h-10 w-[74px] rounded-full border-2 border-violet-600">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 text-violet-700">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="opacity-50"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M12 4v2m0 12v2m8-8h-2M6 12H4m11.314-5.314l-1.414 1.414M8.1 16.9l-1.414 1.414M18.364 17.657l-1.414-1.414M7.05 7.05L5.636 5.636M12 8a4 4 0 110 8a4 4 0 010-8z"
                  />
                </svg>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="opacity-50"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                  />
                </svg>
              </div>

              <span
                className={[
                  "absolute top-1/2 left-1 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full",
                  "text-white shadow-md transition-transform duration-300 ease-out",
                  isDark ? "bg-violet-600" : "bg-slate-50",
                  isDark ? "translate-x-8 rotate-360" : "translate-x-0",
                ].join(" ")}
              >
                {isDark ? (
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path
                      fill="#FFFFFF"
                      d="M21 12.79A9 9 0 1111.21 3A7 7 0 1021 12.79z"
                    />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path
                      fill="#FF9500"
                      d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79l1.8-1.79zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zM4.84 19.24l1.79 1.8l1.8-1.8l-1.8-1.79l-1.79 1.79zM20 11v2h3v-2h-3zm-2.76-6.16l1.8-1.79l1.79 1.79l-1.79 1.79l-1.8-1.79zM11 1h2v3h-2V1zm6.24 18.24l1.79 1.8l1.79-1.8l-1.79-1.79l-1.79 1.79zM12 8a4 4 0 100 8a4 4 0 000-8z"
                    />
                  </svg>
                )}
              </span>
            </div>
          </button>

          {/* Quick Access Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              type="button"
              title="Quick Access"
              aria-label="Quick Access"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/50"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-violet-700 dark:text-violet-400 transition-colors"
                aria-hidden="true"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="3"
                  rx="0.5"
                  fill="currentColor"
                />
                <path
                  d="M4 7C3 7 3 8 3 9v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1 0-2-1-2H4z"
                  fill="currentColor"
                />
                <rect
                  x="8"
                  y="12"
                  width="8"
                  height="2.5"
                  rx="0.4"
                  className="fill-white dark:fill-slate-900"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div
                className={`absolute right-0 mt-2 w-56 rounded-lg shadow-xl overflow-hidden z-50 border 
                  ${
                    isDark
                      ? "bg-slate-800 border-slate-700"
                      : "bg-white border-slate-200"
                  }`}
              >
                <Link
                  href="/Dashboard/payment"
                  onClick={() => setShowDropdown(false)}
                  className={`flex items-center gap-3 px-4 py-3 border-b 
                  ${
                    isDark
                      ? "border-slate-700 text-slate-100 hover:bg-slate-700"
                      : "border-slate-200 text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-sm font-medium">Plan and Billing</span>
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setShowDropdown(false)}
                  className={`flex items-center gap-3 px-4 py-3 border-b 
                  ${
                    isDark
                      ? "border-slate-700 text-slate-100 hover:bg-slate-700"
                      : "border-slate-200 text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-sm font-medium">Settings</span>
                </Link>
                <button
                  onClick={() => setShowDropdown(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left 
                  ${
                    isDark
                      ? "text-red-500 hover:bg-slate-700"
                      : "text-red-600 hover:bg-slate-50"
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16 17v-3H9v-2h7V7l5 5-5 5z" />
                  </svg>
                  <span className="text-sm font-medium">Log Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Profil */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-200 font-semibold">
              B
            </div>
            <div className="text-sm">
              <div className="text-slate-400 text-xs">Welcome Back</div>
              <div className="text-slate-700 dark:text-slate-100 font-semibold">
                Bilal Al Ihsan
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
