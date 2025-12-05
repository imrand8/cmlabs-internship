"use client";
import { useEffect, useState } from "react";
import { useUI } from "@/context/UIContext";

export default function ShellControls() {
  const { collapsed, toggleCollapsed } = useUI();

  // THEME
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefersDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);
  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // Posisi hamburger mengikuti lebar sidebar
  const leftPx = collapsed ? 96 : 272;

  return (
    <>
      {/* Hamburger global - di luar Sidebar */}
      <button
        onClick={toggleCollapsed}
        type="button"
        aria-label="Toggle sidebar"
        title="Toggle sidebar"
        className="fixed top-4 z-40 inline-flex items-center justify-center rounded-xl bg-white/15 text-white hover:bg-white/25 backdrop-blur-md transition-[left,background-color] duration-300 shadow-md md:flex"
        style={{ left: `${leftPx}px`, width: 40, height: 40 }}
      >
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Bar kontrol kanan: tidak menumpuk */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-3">
        {/* Toggle tema pill bergulir */}
        <button
          onClick={toggleTheme}
          type="button"
          aria-label="Toggle theme"
          title="Toggle theme"
          className="group"
        >
          <div className="relative h-10 w-[74px] rounded-full border-2 border-violet-600">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 text-violet-700">
              <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90">
                <path fill="none" stroke="currentColor" strokeWidth="2" d="M12 4v2m0 12v2m8-8h-2M6 12H4m11.314-5.314l-1.414 1.414M8.1 16.9l-1.414 1.414M18.364 17.657l-1.414-1.414M7.05 7.05L5.636 5.636M12 8a4 4 0 110 8a4 4 0 010-8z" />
              </svg>
              <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90">
                <path fill="none" stroke="currentColor" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            </div>
            <span
              className={[
                "absolute top-1/2 left-1.5 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full",
                "bg-violet-600 text-white shadow-md transition-transform duration-300 ease-out",
                isDark ? "translate-x-9 rotate-180" : "translate-x-0 rotate-0",
              ].join(" ")}
            >
              {isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M21 12.79A9 9 0 1111.21 3A7 7 0 1021 12.79z" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79l1.8-1.79zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zM4.84 19.24l1.79 1.8l1.8-1.8l-1.8-1.79l-1.79 1.79zM20 11v2h3v-2h-3zm-2.76-6.16l1.8-1.79l1.79 1.79l-1.79 1.79l-1.8-1.79zM11 1h2v3h-2V1zm6.24 18.24l1.79 1.8l1.79-1.8l-1.79-1.79l-1.79 1.79zM12 8a4 4 0 100 8a4 4 0 000-8z" /></svg>
              )}
            </span>
          </div>
        </button>
      </div>
    </>
  );
}
