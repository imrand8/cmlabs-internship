"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { useUI } from "@/context/UIContext";

export default function SectionSecondarySidebar() {
  const pathname = usePathname();
  const { isCollapsed, setHasSecondaryBar } = useSidebar();
  const { isDark } = useUI();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSinglePageOpen, setIsSinglePageOpen] = useState(true);
  const [isMultiplePageOpen, setIsMultiplePageOpen] = useState(true);
  const [isComponentsOpen, setIsComponentsOpen] = useState(true);

  useEffect(() => {
    setHasSecondaryBar(true);
    return () => setHasSecondaryBar(false);
  }, [setHasSecondaryBar]);

  return (
    <aside 
      className={`fixed top-0 h-screen w-64 ${
        isDark ? "bg-slate-900" : "bg-white"
      } z-30 transition-all duration-300 ease-in-out ${
        isCollapsed ? "left-20" : "left-72"
      }`}
      style={{
        boxShadow: isDark 
          ? "4px 0 20px rgba(0, 0, 0, 0.5)" 
          : "4px 0 20px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Header with Logo */}
      <div className={`px-4 py-5 border-b ${isDark ? "border-slate-800" : "border-slate-100"}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
            <Image src="/logo-cms.png" alt="CMS Logo" width={32} height={32} className="object-contain" />
          </div>
          <div>
            <h2 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>CMS CMLABS</h2>
            <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>Content Builder</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-3 py-2 text-sm ${
              isDark 
                ? "bg-slate-800 border-slate-700 text-white" 
                : "bg-slate-100 border-slate-200 text-slate-900"
            } border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400 transition-colors`}
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="px-3 py-4 space-y-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 160px)" }}>
        {/* Single Page */}
        <div>
          <button
            onClick={() => setIsSinglePageOpen(!isSinglePageOpen)}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium ${
              isDark 
                ? "text-slate-300 hover:bg-slate-800" 
                : "text-slate-700 hover:bg-slate-100"
            } rounded-md transition-all duration-200`}
          >
            <span>Single Page</span>
            <svg className={`w-4 h-4 transition-transform duration-200 ${isSinglePageOpen ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {isSinglePageOpen && (
            <div className="ml-3 mt-1 space-y-1">
              <Link 
                href="/Dashboard/content-builder/single-page" 
                className={`flex items-center gap-2 px-3 py-1.5 text-sm ${
                  isDark
                    ? "text-blue-400 hover:bg-blue-900/20"
                    : "text-blue-600 hover:bg-blue-50"
                } rounded-md transition-all duration-200`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Single Page
              </Link>
            </div>
          )}
        </div>

        {/* Multiple Page */}
        <div>
          <button
            onClick={() => setIsMultiplePageOpen(!isMultiplePageOpen)}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium ${
              isDark 
                ? "text-slate-300 hover:bg-slate-800" 
                : "text-slate-700 hover:bg-slate-100"
            } rounded-md transition-all duration-200`}
          >
            <span>Multiple Page</span>
            <svg className={`w-4 h-4 transition-transform duration-200 ${isMultiplePageOpen ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {isMultiplePageOpen && (
            <div className="ml-3 mt-1 space-y-1">
              <Link 
                href="/Dashboard/content-builder/multiple-page/create" 
                className={`flex items-center gap-2 px-3 py-1.5 text-sm ${
                  isDark
                    ? "text-blue-400 hover:bg-blue-900/20"
                    : "text-blue-600 hover:bg-blue-50"
                } rounded-md transition-all duration-200`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Multiple Page
              </Link>
            </div>
          )}
        </div>

        {/* Components */}
        <div>
          <button
            onClick={() => setIsComponentsOpen(!isComponentsOpen)}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium ${
              isDark 
                ? "text-slate-300 hover:bg-slate-800" 
                : "text-slate-700 hover:bg-slate-100"
            } rounded-md transition-all duration-200`}
          >
            <span>Components</span>
            <svg className={`w-4 h-4 transition-transform duration-200 ${isComponentsOpen ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {isComponentsOpen && (
            <div className="ml-3 mt-1 space-y-1">
              <Link 
                href="/Dashboard/content-builder/components/create-folder" 
                className={`flex items-center gap-2 px-3 py-1.5 text-sm ${
                  isDark
                    ? "text-blue-400 hover:bg-blue-900/20"
                    : "text-blue-600 hover:bg-blue-50"
                } rounded-md transition-all duration-200`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Folder
              </Link>
              <Link 
                href="/Dashboard/content-builder/components/create" 
                className={`flex items-center gap-2 px-3 py-1.5 text-sm ${
                  isDark
                    ? "text-blue-400 hover:bg-blue-900/20"
                    : "text-blue-600 hover:bg-blue-50"
                } rounded-md transition-all duration-200`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Components
              </Link>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
