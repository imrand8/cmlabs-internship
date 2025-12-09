// src/app/dashboard/organizational/create/page.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUI } from "@/context/UIContext";
import { usePathname } from "next/navigation"; 
import SecondaryNav from "@/components/SecondaryNav";

// Interface proyek baru dengan role dan collaborator
interface Project {
  id: number;
  name: string;
  role: string;
  roleColor: string;
  lastUpdate: string;
  collaborators: Array<{ initial: string; color: string }>;
  extraCount?: number;
}


export default function OrganizationalProjectCreatePage() {
  const { isDark, setCollapsed } = useUI();
  const pathname = usePathname();
  const [q, setQ] = useState("");

  // Data Proyek Organisasi (Dibiarkan tetap)
  const projects: Project[] = [
    // ... (Data remains the same) ...
    {
      id: 1,
      name: "CMS CMLABS",
      role: "Super Admin",
      roleColor: "bg-blue-500",
      lastUpdate: "03 Minute ago",
      collaborators: [
        { initial: "M", color: "#10B981" },
        { initial: "E", color: "#F59E0B" },
        { initial: "D", color: "#3B82F6" },
        { initial: "S", color: "#8B5CF6" },
        { initial: "K", color: "#6B7280" },
      ],
      extraCount: 6,
    },
    {
      id: 2,
      name: "CMS Pegadaian",
      role: "Editor",
      roleColor: "bg-yellow-500",
      lastUpdate: "20 Hours ago",
      collaborators: [
        { initial: "M", color: "#10B981" },
        { initial: "E", color: "#F59E0B" },
        { initial: "D", color: "#3B82F6" },
        { initial: "S", color: "#8B5CF6" },
        { initial: "K", color: "#6B7280" },
      ],
    },
    {
      id: 3,
      name: "CMS Polinema",
      role: "SEO Manager",
      roleColor: "bg-purple-600",
      lastUpdate: "21 Mar 2025, 10.00",
      collaborators: [
        { initial: "M", color: "#10B981" },
        { initial: "E", color: "#F59E0B" },
        { initial: "D", color: "#3B82F6" },
        { initial: "S", color: "#8B5CF6" },
        { initial: "K", color: "#6B7280" },
      ],
      extraCount: 3,
    },
  ];

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(q.trim().toLowerCase())
  );

  const BASE_PATH = "/dashboard/personal/create";

  // LOGIKA UTAMA: FIXED MINIMIZED (true) - Sidebar otomatis collapse saat masuk ke halaman ini
  // Force sidebar ke collapsed state saat masuk ke halaman ini
  useEffect(() => {
    setCollapsed(true); // Set sidebar ke minimized (collapsed)
    return () => {
      setCollapsed(false); // Reset ke MAXIMIZED (expanded) saat keluar dari halaman
    };
  }, [setCollapsed, pathname]); // Tambahkan pathname sebagai dependency untuk memastikan re-run saat path berubah


  // Komponen Collaborator Avatar Stack (Dibiarkan tetap)
  const Collabs = ({
    list,
    extra,
  }: {
    list: Project["collaborators"];
    extra?: number;
  }) => {
    const max = 3;
    const shown = list.slice(0, max);
    return (
      <div className="flex items-center justify-center">
        {shown.map((c, i) => (
          <div
            key={`${c.initial}-${i}`}
            className="w-7 h-7 grid place-items-center rounded-full text-[11px] font-bold text-white border-2 border-white dark:border-slate-800"
            style={{
              backgroundColor: c.color,
              marginLeft: i ? -12 : 0,
              zIndex: max - i,
            }}
            title={c.initial}
          >
            {c.initial}
          </div>
        ))}
        {extra && extra > 0 && (
          <div
            className="w-7 h-7 grid place-items-center rounded-full text-[11px] font-bold text-white border-2 border-white dark:border-slate-800 bg-gray-500"
            style={{ marginLeft: -12 }}
            title={`+${extra}`}
          >
            +{extra}
          </div>
        )}
      </div>
    );
  };
  

  return (
    <div className={`${isDark ? "bg-slate-900" : "bg-[#F4F5FA]"} min-h-screen`}>
      {/* Secondary bar (Fixed, menempel di left-20) */}
      <SecondaryNav />

      {/* MAIN CONTENT: Menampilkan Tabel Organisasi */}
      <main
        className={`min-h-screen flex flex-col justify-center items-center transition-all duration-300 ease-in-out 
          pl-[21rem] pr-10
        `}
      >
        <div className="mx-auto w-full max-w-[1300px] py-10"> {/* Hapus pt-20 dan gunakan py-10 untuk centering */}
          
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h1
                className={`text-3xl font-bold mb-4 ${
                  isDark ? "text-slate-100" : "text-slate-900"
                }`}
              >
                Projects
              </h1>
              <button
                type="button"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors
                  ${
                    isDark
                      ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                      : "border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
              >
                <span>Filter Data</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.5a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 3v-6.172a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                  />
                </svg>
              </button>
            </div>

            {/* TOMBOL CREATE PROJECTS → LINK KE CONTENT BUILDER */}
            <Link href="/dashboard/content-builder">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg bg-[#F59E0B] px-6 py-3 text-white font-semibold shadow-sm hover:bg-[#D97706] transition-colors"
              >
                Create Projects
              </button>
            </Link>
          </div>

          {/* Search */}
          <div className="mb-5">
            <div className="relative max-w-4xl">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
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
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search"
                className={`w-full rounded-lg pl-10 pr-3 py-2.5 border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${
                    isDark
                      ? "bg-slate-800 text-slate-100 border-slate-700 placeholder:text-slate-400"
                      : "bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                  }`}
              />
            </div>
          </div>

          {/* Tabel */}
          <div
            className={`rounded-xl overflow-hidden shadow-sm ${
              isDark
                ? "bg-slate-800/60 border border-slate-700"
                : "bg-white border border-slate-200"
            }`}
          >
            <div
              className={`${
                isDark ? "bg-slate-700 text-slate-100" : "bg-[#3B82F6] text-white"
              }`}
            >
              <div className="grid grid-cols-4 gap-4">
                <div className="px-6 py-3.5 text-left text-sm font-semibold">
                  Project Name
                </div>
                <div className="px-6 py-3.5 text-left text-sm font-semibold">
                  Last Update
                </div>
                <div className="px-6 py-3.5 text-center text-sm font-semibold border-x border-white/30">
                  Collaborator
                </div>
                <div className="px-6 py-3.5 text-center text-sm font-semibold">
                  Action
                </div>
              </div>
            </div>

            <div>
              {filtered.length ? (
                filtered.map((p, idx) => (
                  <div
                    key={p.id}
                    className={`grid grid-cols-4 gap-4 items-center ${
                      isDark ? "text-slate-100" : "text-slate-800"
                    } ${
                      isDark
                        ? idx % 2
                          ? "bg-slate-800/40"
                          : "bg-slate-800/70"
                        : idx % 2
                        ? "bg-[#FAFAFD]"
                        : "bg-white"
                    } border-t ${
                      isDark ? "border-slate-700" : "border-slate-200"
                    } hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors`}
                  >
                    {/* Name + Badge */}
                    <div className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{p.name}</span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${p.roleColor}`}
                        >
                          {p.role}
                        </span>
                      </div>
                    </div>

                    {/* Last Update */}
                    <div className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {p.lastUpdate}
                    </div>

                    {/* Collaborator */}
                    <div
                      className={`px-6 py-4 border-x ${
                        isDark ? "border-slate-700" : "border-slate-200"
                      }`}
                    >
                      <Collabs list={p.collaborators} extra={p.extraCount} />
                    </div>

                    {/* Action */}
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4">
                        {/* Delete */}
                        <button
                          className="hover:opacity-80 transition-opacity"
                          title="Delete"
                          aria-label="Delete"
                        >
                          <Image
                            src="/trash.png"
                            alt="Delete"
                            width={22}
                            height={22}
                          />
                        </button>
                        {/* Exit/Edit Link */}
                        <Link 
                            href={`${BASE_PATH}/${p.id}`} // Link ke halaman editor spesifik
                            className="hover:opacity-80 transition-opacity"
                            title="Edit Project"
                            aria-label="Edit Project"
                        >
                          <Image
                            src="/exit.png"
                            alt="Exit/Edit"
                            width={22}
                            height={22}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className={`py-12 text-center ${
                    isDark ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  No projects found
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}