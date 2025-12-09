"use client";

import { useUI } from "@/context/UIContext";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";

export default function BeritaSecondarySidebar() {
  const { isDark } = useUI();
  const { isCollapsed } = useSidebar();

  const leftClass = isCollapsed ? "left-20" : "left-72";

  const containerBg = isDark ? "bg-slate-900" : "bg-white";
  const textColor = isDark ? "text-slate-100" : "text-slate-900";
  const logoBg = "bg-blue-500";

  return (
    <aside
      className={`fixed top-0 ${leftClass} h-screen z-30 select-none`}
      aria-hidden={false}
    >
      <div
        className={`
          relative h-full w-24 rounded-r-xl
          ${containerBg}
          flex flex-col items-center justify-between py-3
        `}
        style={{
          boxShadow: isDark
            ? "4px 0 18px rgba(15,23,42,0.7)"
            : "4px 0 16px rgba(15,23,42,0.25)",
        }}
      >
        {/* thin top bar mung ing light mode, ben ora ono gap biru ing dark */}
        {!isDark && (
          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-tr-xl bg-blue-500" />
        )}

        <div className="flex flex-col items-center w-full">
          {/* logo kotak putih + icon biru */}
          <div className="mt-1">
            <div className="h-11 w-11 rounded-lg bg-white flex items-center justify-center shadow-md">
              <div
                className={`
                  h-9 w-9 rounded-md ${logoBg}
                  flex items-center justify-center overflow-hidden
                `}
              >
                <Image
                  src="/logo-cms.png"
                  alt="logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* label CB */}
          <div className={`mt-1 text-xs font-semibold tracking-wide ${textColor}`}>
            CB
          </div>

          {/* search button nganggo ikon custom, tanpa background biru */}
          <div className="mt-3">
            <button
              className={`
                flex items-center justify-center
                h-11 w-11 rounded-lg shadow-md
                bg-transparent hover:bg-white/5 transition-colors
              `}
            >
              <Image
                src="/search.png"
                alt="Search"
                width={48}
                height={48}
                className="object-contain"
              />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
