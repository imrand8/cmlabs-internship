"use client";

import { useUI } from "@/context/UIContext";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const { toggleCollapsed, isDark, toggleDark } = useUI();
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      if (!mainSegment) return "Dashboard"; // fallback kalau undefined
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
    <header className="w-full sticky top-0 z-30 px-6 lg:px-8 py-4 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur border-slate-200 dark:border-slate-900">
      <div className="flex items-center justify-between">
        {/* Kiri: Hamburger + Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleCollapsed}
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
                  className="opacity-90"
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
                  className="opacity-90"
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

          {/* Quick Access Dropdown - ICON LANGSUNG DALAM HEADER */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              type="button"
              title="Quick Access"
              aria-label="Quick Access"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {/* SVG Icon Box langsung di sini */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-violet-700 dark:text-violet-400 transition-colors"
                aria-hidden="true"
              >
                {/* Tutup kotak (lid) */}
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="3"
                  rx="0.5"
                  fill="currentColor"
                />

                {/* Badan kotak */}
                <path
                  d="M4 7C3 7 3 8 3 9v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1 0-2-1-2H4z"
                  fill="currentColor"
                />

                {/* Slot putih */}
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
                className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg overflow-hidden z-50 border
                  ${
                    isDark
                      ? "bg-slate-800 border-slate-700"
                      : "bg-white border-slate-200"
                  }`}
              >
                <a
                  href="/Dashboard/payment"
                  className={`flex items-center gap-3 px-4 py-3 transition-colors border-b
                    ${
                      isDark
                        ? "border-slate-700 text-slate-100 hover:bg-slate-700"
                        : "border-slate-200 text-slate-900 hover:bg-slate-50"
                    }`}
                  onClick={() => setShowDropdown(false)}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-blue-600"
                  >
                    <path d="M4 6h16v2H4V6zm1 5h14v7H5v-7zm0 9h14v2H5v-2z" />
                  </svg>
                  <span className="text-sm font-medium">Plan and Billing</span>
                </a>

                <a
                  href="/settings"
                  className={`flex items-center gap-3 px-4 py-3 transition-colors border-b
                    ${
                      isDark
                        ? "border-slate-700 text-slate-100 hover:bg-slate-700"
                        : "border-slate-200 text-slate-900 hover:bg-slate-50"
                    }`}
                  onClick={() => setShowDropdown(false)}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-slate-600 dark:text-slate-400"
                  >
                    <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 110 4 2 2 0 010-4zm7.5-3h-3V4.5a1.5 1.5 0 00-3 0V7h-3a1.5 1.5 0 000 3h3v3a1.5 1.5 0 003 0v-3h3a1.5 1.5 0 000-3z" />
                  </svg>
                  <span className="text-sm font-medium">Settings</span>
                </a>

                <button
                  onClick={() => setShowDropdown(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left
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
