"use client";

import ContentBuilderSidebar from "@/components/ContentBuilderSidebar";
import { useUI } from "@/context/UIContext";
import { useSidebar } from "@/context/SidebarContext";
import { FolderPlus, Plus } from "lucide-react";
import Link from "next/link";

export default function MediaAssetPage() {
  const { isDark } = useUI();
  const { isCollapsed } = useSidebar();

  const pageBg = isDark
    ? "bg-slate-900 text-slate-100"
    : "bg-slate-100 text-slate-900";
  const cardBg = isDark
    ? "bg-slate-800/90 border border-slate-700 text-slate-100"
    : "bg-[#2c72c8] text-white";

  return (
    <div className={`min-h-screen w-full ${pageBg}`}>
      <ContentBuilderSidebar />

      <main
        className={`min-h-screen px-8 md:px-12 py-12 transition-all duration-300 ease-in-out flex flex-col ${
          isCollapsed ? "ml-20" : "ml-72"
        }`}
      >
        {/* Header: breadcrumb + actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            <span>Pages</span> <span className="mx-1 text-slate-400">/</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              Media Asset
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(16,185,129,0.35)] transition hover:bg-emerald-600"
            >
              <FolderPlus className="h-4 w-4" strokeWidth={2.5} />
              Create New Folder
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(37,99,235,0.35)] transition hover:bg-blue-700"
            >
              <Link
                href="/Dashboard/content-builder/media-asset/add"
                className="inline-flex items-center gap-2"
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
                Add Assets
              </Link>
            </button>
          </div>
        </div>

        {/* Empty state card - centered */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className={`${cardBg} relative w-full max-w-5xl rounded-2xl px-8 md:px-10 py-10 shadow-[0_26px_70px_rgba(0,0,0,0.22)]`}
          >
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-bold tracking-tight">
                Media Assets
              </h1>

              <p className="flex items-center gap-2 text-base font-semibold">
                <span className="text-xl">📁</span> No Media Assets Yet
              </p>

              <p className="text-sm leading-relaxed max-w-3xl">
                It looks like you haven&apos;t uploaded any media files yet.
                Upload your first asset to get started, or create a folder to
                organize your content.
              </p>

              <div className="space-y-2 rounded-lg bg-white/10 px-4 py-3 text-sm backdrop-blur-sm dark:bg-slate-700/40">
                <p className="font-semibold">Tips:</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>
                    Click &quot;Add new assets&quot; to upload images, videos,
                    or other media.
                  </li>
                  <li>
                    Use &quot;Create new folder&quot; to keep your files
                    organized.
                  </li>
                </ul>
              </div>

              <p className="flex items-start gap-2 text-sm">
                <span className="text-lg leading-none">🖼️</span>
                <span>(The image currently displayed is a placeholder)</span>
              </p>
            </div>

            <div className="pointer-events-none absolute inset-x-6 bottom-4 h-12 rounded-2xl bg-black/10 blur-3xl dark:bg-black/30" />
          </div>
        </div>
      </main>
    </div>
  );
}
