"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { MoreVertical, Home as HomeIcon } from "lucide-react";
import { useUI } from "@/context/UIContext";

interface PageHeaderProps {
  title: string;
  onAddField?: () => void;
}

export default function PageHeader({ title, onAddField }: PageHeaderProps) {
  const { isDark } = useUI();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="flex items-center justify-between mb-6">
      <div ref={menuRef} className="flex items-center gap-3 relative">
        {/* ICON – warna ikut theme */}
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full shadow-[0_8px_18px_rgba(15,23,42,0.35)] ${
            isDark
              ? "bg-slate-800"
              : "bg-gradient-to-br from-blue-500 to-blue-400 shadow-[0_8px_18px_rgba(37,99,235,0.45)]"
          }`}
        >
          <HomeIcon
            className="w-5 h-5"
            strokeWidth={2.3}
            color={isDark ? "#e5e7eb" : "#ffffff"}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <h1
              className={`text-lg font-semibold tracking-tight ${
                isDark ? "text-slate-50" : "text-slate-900"
              }`}
            >
              {title}
            </h1>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={`p-1 rounded-full active:scale-95 transition ${
                isDark ? "hover:bg-slate-800" : "hover:bg-slate-100"
              }`}
            >
              <MoreVertical
                className="w-4 h-4"
                color={isDark ? "#9ca3af" : "#64748b"}
              />
            </button>
          </div>

          <p
            className={`text-[11px] leading-snug ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Built your content structure for this page.
          </p>
        </div>

        {open && (
          <div
            className={`
              absolute left-11 top-9 z-30 w-56 overflow-hidden rounded-xl border
              ${isDark
                ? "bg-slate-900/95 border-slate-700/80"
                : "bg-slate-900/95 border-slate-800/80"}
              backdrop-blur shadow-[0_18px_45px_rgba(0,0,0,0.65)]
            `}
          >
            <button
              type="button"
              className="flex w-full items-center gap-2 px-4 py-2.5 text-xs text-slate-100 hover:bg-slate-800/80 transition-colors"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-slate-800 text-[11px]">
                📄
              </span>
              <span className="tracking-tight">To content Management</span>
            </button>

            <button
              type="button"
              className="flex w-full items-center gap-2 px-4 py-2.5 text-xs text-slate-100 hover:bg-slate-800/80 transition-colors"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-slate-800 text-[11px]">
                ✏️
              </span>
              <span className="tracking-tight">Edit Page</span>
            </button>

            <div className="h-px bg-slate-700/70 mx-3" />

            <button
              type="button"
              className="flex w-full items-center gap-2 px-4 py-2.5 text-xs text-red-400 hover:bg-red-900/40 transition-colors"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-red-900/60 text-[11px]">
                🗑️
              </span>
              <span className="font-medium tracking-tight">Delete Page</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Link
          href="/dashboard/content-builder/create-field-group"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3.5 py-2 text-xs font-medium text-white hover:bg-blue-700 shadow-[0_6px_14px_rgba(37,99,235,0.55)]"
        >
          📁 Create Field Group
        </Link>
        <button
          type="button"
          onClick={onAddField}
          className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-3.5 py-2 text-xs font-medium text-white hover:bg-blue-600 shadow-[0_6px_14px_rgba(37,99,235,0.45)]"
        >
          ＋ Add Field
        </button>
      </div>
    </div>
  );
}
