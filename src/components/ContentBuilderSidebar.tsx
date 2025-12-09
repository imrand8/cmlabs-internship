"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useSidebar } from "@/context/SidebarContext";
import { useUI } from "@/context/UIContext";
import { usePathname } from "next/navigation";

export default function ContentBuilderSidebar() {
  const {
    isCollapsed,
    setIsCollapsed,
    hasSecondaryBar,
    setLocked,
    forceSetIsCollapsed,
  } = useSidebar();
  const { isDark } = useUI();
  const pathname = usePathname();

  const inContentBuilder = pathname
    ?.toLowerCase()
    .startsWith("/dashboard/content-builder");
  const disableToggle = inContentBuilder;

  useEffect(() => {
    if (!inContentBuilder) {
      setLocked(false);
      return;
    }

    const isSection = pathname
      ?.toLowerCase()
      .startsWith("/dashboard/content-builder/section");
    const isBerita = pathname
      ?.toLowerCase()
      .startsWith("/dashboard/content-builder/home/berita");
    const isHome = pathname
      ?.toLowerCase()
      .startsWith("/dashboard/content-builder/home");
    const isSingle = pathname
      ?.toLowerCase()
      .startsWith("/dashboard/content-builder/single-page");
    const isMultiPage = pathname
      ?.toLowerCase()
      .startsWith("/dashboard/content-builder/multi-page");
    const isSetting = pathname
      ?.toLowerCase()
      .startsWith("/dashboard/content-builder/setting");
    const isMediaAsset = pathname
      ?.toLowerCase()
      .startsWith("/dashboard/content-builder/media-asset");

    forceSetIsCollapsed(
      isSection ||
        isBerita ||
        isHome ||
        isSingle ||
        isMultiPage ||
        isSetting ||
        isMediaAsset
    );
    setLocked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const navBg = isDark
    ? "bg-slate-700/60 hover:bg-slate-600/70"
    : "bg-white/10 hover:bg-white/20";

  const getActiveBg = (href: string) => {
    // Untuk Dashboard, hanya aktif jika exact match
    if (href === "/Dashboard/content-builder") {
      const isActive = pathname === href || pathname === href + "/";
      if (isActive) {
        return isDark ? "bg-blue-600" : "bg-blue-500";
      }
      return navBg;
    }
    // Untuk item lain, aktif jika pathname dimulai dengan href
    const isActive = pathname === href || pathname?.startsWith(href + "/");
    if (isActive) {
      return isDark ? "bg-blue-600" : "bg-blue-500";
    }
    return navBg;
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen py-6 z-40 transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-20 px-3" : "w-72 px-6"}
        ${isDark ? "bg-[#0F172A] text-slate-100" : "bg-[#2563EB] text-white"}
      `}
      style={{
        boxShadow: isDark
          ? "4px 0 18px rgba(0,0,0,0.55)" // pemisah halus di dark mode
          : "4px 0 16px rgba(15,23,42,0.35)", // pemisah halus di light mode
      }}
    >
      {/* Toggle Button */}
      {!disableToggle && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
            absolute -right-3 top-6 w-6 h-6 rounded-full flex items-center justify-center text-white shadow-md transition-colors z-50
            ${
              isDark
                ? "bg-slate-700 hover:bg-slate-600"
                : "bg-blue-600 hover:bg-blue-500"
            }
          `}
        >
          {isCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          )}
        </button>
      )}

      {/* Header logo - Hidden when secondary bar is active */}
      {!hasSecondaryBar && (
        <div
          className={`flex items-center mb-6 transition-all duration-300 ease-in-out overflow-hidden ${
            isCollapsed ? "justify-center" : "gap-3"
          }`}
        >
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
          <span
            className={`text-2xl font-semibold whitespace-nowrap transition-all duration-300 ease-in-out ${
              isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            }`}
          >
            CMS
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className={`space-y-3 ${hasSecondaryBar ? "mt-6" : ""}`}>
        {/* Dashboard */}
        <Link href="/Dashboard/content-builder" className="block">
          <div
            className={`
              w-full flex items-center rounded-md transition-all duration-300 ease-in-out overflow-hidden
              ${isCollapsed ? "justify-center py-3" : "gap-3 px-4 py-3"}
              ${getActiveBg("/Dashboard/content-builder")}
            `}
          >
            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
              <Image
                src="/logo-dash.png"
                alt="Dashboard"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <span
              className={`font-medium whitespace-nowrap transition-all duration-300 ease-in-out ${
                isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
              }`}
            >
              Dashboard
            </span>
          </div>
        </Link>

        {/* Section - Full */}
        {!isCollapsed && (
          <div className="space-y-2">
            <p className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-200/80 whitespace-nowrap">
              Section
            </p>
            <Link href="/Dashboard/content-builder/section" className="block">
              <div
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors overflow-hidden ${getActiveBg(
                  "/Dashboard/content-builder/section"
                )}`}
              >
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/section.png"
                    alt="Section"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <span className="font-medium whitespace-nowrap">
                  Section Project
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* Section - Collapsed */}
        {isCollapsed && (
          <Link href="/Dashboard/content-builder/section" className="block">
            <div
              className={`w-full flex items-center justify-center py-3 rounded-md transition-colors ${getActiveBg(
                "/Dashboard/content-builder/section"
              )}`}
            >
              <div className="w-7 h-7 flex items-center justify-center">
                <Image
                  src="/section.png"
                  alt="Section"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
            </div>
          </Link>
        )}

        {/* Single Page - Full */}
        {!isCollapsed && (
          <div className="space-y-2">
            {/* <p className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-200/80 whitespace-nowrap">
              Single Page
            </p> */}
            <Link
              href="/Dashboard/content-builder/single-page"
              className="block"
            >
              <div
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors overflow-hidden ${getActiveBg(
                  "/Dashboard/content-builder/single-page"
                )}`}
              >
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/personal.png"
                    alt="Single Page"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <span className="font-medium whitespace-nowrap">
                  Content Builder
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* Single Page - Collapsed */}
        {isCollapsed && (
          <Link href="/Dashboard/content-builder/single-page" className="block">
            <div
              className={`w-full flex items-center justify-center py-3 rounded-md transition-colors ${getActiveBg(
                "/Dashboard/content-builder/single-page"
              )}`}
            >
              <div className="w-7 h-7 flex items-center justify-center">
                <Image
                  src="/personal.png"
                  alt="Single Page"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
            </div>
          </Link>
        )}

        {/* Multiple Page - Full */}
        {!isCollapsed && (
          <div className="space-y-2">
            {/* <p className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-200/80 whitespace-nowrap">
              Multiple Page
            </p> */}
            <Link
              href="/Dashboard/content-builder/multiple-page"
              className="block"
            >
              <div
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors overflow-hidden ${getActiveBg(
                  "/Dashboard/content-builder/multi-page"
                )}`}
              >
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/personal.png"
                    alt="Multiple Page"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <span className="font-medium whitespace-nowrap">
                  Content Management
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* Multiple Page - Collapsed */}
        {isCollapsed && (
          <Link href="/Dashboard/content-builder/multi-page" className="block">
            <div
              className={`w-full flex items-center justify-center py-3 rounded-md transition-colors ${getActiveBg(
                "/Dashboard/content-builder/multi-page"
              )}`}
            >
              <div className="w-7 h-7 flex items-center justify-center">
                <Image
                  src="/personal.png"
                  alt="Multiple Page"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
            </div>
          </Link>
        )}

        {/* Components - Full */}
        {!isCollapsed && (
          <div className="space-y-2">
            {/* <p className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-200/80 whitespace-nowrap">
              Components
            </p> */}

            {/* Create Folder */}
            <Link
              href="/Dashboard/content-builder/media-asset"
              className="block"
            >
              <div
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors overflow-hidden ${getActiveBg(
                  "/Dashboard/content-builder/media-asset"
                )}`}
              >
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/organizational.png"
                    alt="Folder"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <span className="font-medium whitespace-nowrap">
                  Media Assets
                </span>
              </div>
            </Link>

            {/* Create Components */}
            <Link
              href="/Dashboard/content-builder/components"
              className="block"
            >
              <div
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors overflow-hidden ${getActiveBg(
                  "/Dashboard/content-builder/components"
                )}`}
              >
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/personal.png"
                    alt="Components"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <span className="font-medium whitespace-nowrap">
                  Create Components
                </span>
              </div>
            </Link>

            {/* Setting */}
            <Link href="/Dashboard/content-builder/setting" className="block">
              <div
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors overflow-hidden ${getActiveBg(
                  "/Dashboard/content-builder/setting"
                )}`}
              >
                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/setting.png"
                    alt="Setting"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <span className="font-medium whitespace-nowrap">Setting</span>
              </div>
            </Link>
          </div>
        )}

        {/* Components - Collapsed (Folder, Components, Setting) */}
        {isCollapsed && (
          <>
            <Link
              href="/Dashboard/content-builder/media-asset"
              className="block"
            >
              <div
                className={`w-full flex items-center justify-center py-3 rounded-md transition-colors ${getActiveBg(
                  "/Dashboard/content-builder/media-asset"
                )}`}
              >
                <div className="w-7 h-7 flex items-center justify-center">
                  <Image
                    src="/organizational.png"
                    alt="Folder"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
              </div>
            </Link>

            <Link
              href="/Dashboard/content-builder/components"
              className="block"
            >
              <div
                className={`w-full flex items-center justify-center py-3 rounded-md transition-colors ${getActiveBg(
                  "/Dashboard/content-builder/components"
                )}`}
              >
                <div className="w-7 h-7 flex items-center justify-center">
                  <Image
                    src="/personal.png"
                    alt="Components"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
              </div>
            </Link>

            <Link href="/Dashboard/content-builder/setting" className="block">
              <div
                className={`w-full flex items-center justify-center py-3 rounded-md transition-colors ${getActiveBg(
                  "/Dashboard/content-builder/setting"
                )}`}
              >
                <div className="w-7 h-7 flex items-center justify-center">
                  <Image
                    src="/setting.png"
                    alt="Setting"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
              </div>
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}
