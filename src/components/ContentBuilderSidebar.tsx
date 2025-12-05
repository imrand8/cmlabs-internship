"use client";

import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";

export default function ContentBuilderSidebar() {
  const { isCollapsed, setIsCollapsed, hasSecondaryBar } = useSidebar();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#0F172A] text-slate-100 py-6 z-40 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-72"
      } ${isCollapsed ? "px-3" : "px-6"}`}
      style={{
        boxShadow: "4px 0 20px rgba(0, 0, 0, 0.5)"
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-white shadow-md transition-colors z-50"
      >
        {isCollapsed ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        )}
      </button>

      {/* Header logo - Hidden when secondary bar is active */}
      {!hasSecondaryBar && (
        <div className={`flex items-center mb-6 transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? "justify-center" : "gap-3"}`}>
          <Link href="/Dashboard/dash">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden cursor-pointer flex-shrink-0">
              <Image
                src="/logo-cms.png"
                alt="CMS Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          </Link>
          <span className={`text-2xl font-semibold whitespace-nowrap transition-all duration-300 ease-in-out ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
            CMS
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className={`space-y-3 ${hasSecondaryBar ? "mt-6" : ""}`}>
        {/* Dashboard */}
        <Link href="/Dashboard/content-builder" className="block">
          <div className={`w-full flex items-center rounded-md bg-slate-700/60 hover:bg-slate-600/70 transition-all duration-300 ease-in-out overflow-hidden ${
            isCollapsed ? "justify-center py-3" : "gap-3 px-4 py-3"
          }`}>
            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
              <Image src="/logo-dash.png" alt="Dashboard" width={28} height={28} className="object-contain" />
            </div>
            <span className={`font-medium whitespace-nowrap transition-all duration-300 ease-in-out ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
              Dashboard
            </span>
          </div>
        </Link>

        {/* Section - Full */}
        {!isCollapsed && (
          <div className="space-y-2">
            <p className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-400 whitespace-nowrap">
              Section
            </p>
            <Link href="/Dashboard/content-builder/section" className="block">
              <div className="w-full flex items-center gap-3 px-4 py-3 rounded-md bg-slate-700/60 hover:bg-slate-600/70 transition-colors overflow-hidden">
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                  <Image src="/section.png" alt="Section" width={28} height={28} className="object-contain" />
                </div>
                <span className="font-medium whitespace-nowrap">Section Project</span>
              </div>
            </Link>
          </div>
        )}

        {/* Section - Collapsed */}
        {isCollapsed && (
          <Link href="/Dashboard/content-builder/section" className="block">
            <div className="w-full flex items-center justify-center py-3 rounded-md bg-slate-700/60 hover:bg-slate-600/70 transition-colors">
              <div className="w-7 h-7 flex items-center justify-center">
                <Image src="/section.png" alt="Section" width={28} height={28} className="object-contain" />
              </div>
            </div>
          </Link>
        )}

        {/* Single Page - Full */}
        {!isCollapsed && (
          <div className="space-y-2">
            <p className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-400 whitespace-nowrap">
              Single Page
            </p>
            <Link href="/Dashboard/content-builder/single-page" className="block">
              <div className="w-full flex items-center gap-3 px-4 py-3 rounded-md bg-slate-700/60 hover:bg-slate-600/70 transition-colors overflow-hidden">
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                  <Image src="/personal.png" alt="Single Page" width={28} height={28} className="object-contain" />
                </div>
                <span className="font-medium whitespace-nowrap">Create Single Page</span>
              </div>
            </Link>
          </div>
        )}

        {/* Single Page - Collapsed */}
        {isCollapsed && (
          <Link href="/Dashboard/content-builder/single-page" className="block">
            <div className="w-full flex items-center justify-center py-3 rounded-md bg-slate-700/60 hover:bg-slate-600/70 transition-colors">
              <div className="w-7 h-7 flex items-center justify-center">
                <Image src="/personal.png" alt="Single Page" width={28} height={28} className="object-contain" />
              </div>
            </div>
          </Link>
        )}

        {/* Multiple Page - Full */}
        {!isCollapsed && (
          <div className="space-y-2">
            <p className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-400 whitespace-nowrap">
              Multiple Page
            </p>
            <Link href="/Dashboard/content-builder/multiple-page" className="block">
              <div className="w-full flex items-center gap-3 px-4 py-3 rounded-md bg-slate-700/60 hover:bg-slate-600/70 transition-colors overflow-hidden">
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                  <Image src="/personal.png" alt="Multiple Page" width={28} height={28} className="object-contain" />
                </div>
                <span className="font-medium whitespace-nowrap">Create Multiple Page</span>
              </div>
            </Link>
          </div>
        )}

        {/* Multiple Page - Collapsed */}
        {isCollapsed && (
          <Link href="/Dashboard/content-builder/multiple-page" className="block">
            <div className="w-full flex items-center justify-center py-3 rounded-md bg-slate-700/60 hover:bg-slate-600/70 transition-colors">
              <div className="w-7 h-7 flex items-center justify-center">
                <Image src="/personal.png" alt="Multiple Page" width={28} height={28} className="object-contain" />
              </div>
            </div>
          </Link>
        )}

        {/* Components - Full */}
        {!isCollapsed && (
          <div className="space-y-2">
            <p className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-400 whitespace-nowrap">
              Components
            </p>
            <Link href="/Dashboard/content-builder/components" className="block">
              <div className="w-full flex items-center gap-3 px-4 py-3 rounded-md bg-slate-700/60 hover:bg-slate-600/70 transition-colors overflow-hidden">
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                  <Image src="/organizational.png" alt="Folder" width={28} height={28} className="object-contain" />
                </div>
                <span className="font-medium whitespace-nowrap">Create Folder</span>
              </div>
            </Link>
            <Link href="/Dashboard/content-builder/components" className="block">
              <div className="w-full flex items-center gap-3 px-4 py-3 rounded-md bg-slate-700/60 hover:bg-slate-600/70 transition-colors overflow-hidden">
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                  <Image src="/personal.png" alt="Components" width={28} height={28} className="object-contain" />
                </div>
                <span className="font-medium whitespace-nowrap">Create Components</span>
              </div>
            </Link>
          </div>
        )}

        {/* Components - Collapsed (2 icons) */}
        {isCollapsed && (
          <>
            <Link href="/Dashboard/content-builder/components" className="block">
              <div className="w-full flex items-center justify-center py-3 rounded-md bg-slate-700/60 hover:bg-slate-600/70 transition-colors">
                <div className="w-7 h-7 flex items-center justify-center">
                  <Image src="/organizational.png" alt="Folder" width={28} height={28} className="object-contain" />
                </div>
              </div>
            </Link>
            <Link href="/Dashboard/content-builder/components" className="block">
              <div className="w-full flex items-center justify-center py-3 rounded-md bg-slate-700/60 hover:bg-slate-600/70 transition-colors">
                <div className="w-7 h-7 flex items-center justify-center">
                  <Image src="/personal.png" alt="Components" width={28} height={28} className="object-contain" />
                </div>
              </div>
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}
