// app/organizational/page.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUI } from "@/context/UIContext";

interface OrganizationalData {
  id: string;
  name: string;
  role: "Owner" | "Collaborator";
  collaborators: Array<{ name: string; color: string }>;
}

const SAMPLE_DATA: OrganizationalData[] = [
  {
    id: "1",
    name: "CMS",
    role: "Owner",
    collaborators: [
      { name: "ME", color: "#10B981" },
      { name: "JS", color: "#60A5FA" },
      { name: "K", color: "#8B5CF6" },
    ],
  },
  {
    id: "2",
    name: "SQUNCE",
    role: "Owner",
    collaborators: [
      { name: "ME", color: "#10B981" },
      { name: "JS", color: "#8B5CF6" },
    ],
  },
  {
    id: "3",
    name: "DIGI RAYA",
    role: "Owner",
    collaborators: [
      { name: "ME", color: "#10B981" },
      { name: "JS", color: "#60A5FA" },
      { name: "K", color: "#8B5CF6" },
    ],
  },
  {
    id: "4",
    name: "CMLABS",
    role: "Owner",
    collaborators: [
      { name: "ME", color: "#10B981" },
      { name: "JS", color: "#60A5FA" },
      { name: "K", color: "#8B5CF6" },
    ],
  },
  {
    id: "5",
    name: "PBL POLINEMA",
    role: "Collaborator",
    collaborators: [{ name: "KK", color: "#6D28D9" }],
  },
];

export default function OrganizationalPage() {
  const { isDark } = useUI();
  const [q, setQ] = useState("");

  const data = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return SAMPLE_DATA;
    return SAMPLE_DATA.filter((d) => d.name.toLowerCase().includes(s));
  }, [q]);

  const roleBadge = (role: OrganizationalData["role"]) =>
    role === "Owner" ? "bg-emerald-500 text-white" : "bg-amber-400 text-white";

  const Collabs = ({ list }: { list: OrganizationalData["collaborators"] }) => {
    const max = 3;
    const shown = list.slice(0, max);
    const more = Math.max(0, list.length - max);
    return (
      <div className="flex items-center justify-center">
        {shown.map((c, i) => (
          <div
            key={`${c.name}-${i}`}
            className="w-7 h-7 grid place-items-center rounded-full text-[11px] font-bold text-white border-2 border-white dark:border-slate-800"
            style={{
              backgroundColor: c.color,
              marginLeft: i ? -12 : 0,
              zIndex: max - i,
            }}
            title={c.name}
          >
            {c.name}
          </div>
        ))}
        {more > 0 && (
          <div
            className="w-7 h-7 grid place-items-center rounded-full text-[11px] font-bold text-white border-2 border-white dark:border-slate-800 bg-gray-500"
            style={{ marginLeft: -12 }}
            title={`+${more} more`}
          >
            +{more}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`${isDark ? "bg-slate-900" : "bg-[#F4F5FA]"} min-h-screen`}>
      <div
        className="mx-auto max-w-[1200px] px-6 py-6"
        style={{ marginTop: "50px" }}
      >
        {/* Bar atas: tombol biru kiri + tombol hijau kanan */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 rounded-md bg-[#3B82F6] px-4 py-2 text-white shadow-sm hover:bg-[#2563EB] transition-colors">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="opacity-95"
            >
              <path
                d="M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <Link
              href="/Dashboard/organizational/create"
              className="inline-flex items-center justify-center text-white font-semibold shadow-sm"
            >
              Organizational Project
            </Link>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-[#34D399] px-5 py-2.5 text-white font-semibold shadow-sm hover:bg-[#10B981] transition-colors"
          >
            Create Organizational
          </Link>
        </div>

        {/* Kotak pencarian */}
        <div className="mb-4">
          <div className="relative">
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
              placeholder="Search..."
              className={`w-full rounded-lg pl-10 pr-3 py-2.5 border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
                ${
                  isDark
                    ? "bg-slate-800 text-slate-100 border-slate-700 placeholder:text-slate-400"
                    : "bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                }`}
            />
          </div>
        </div>

        {/* Tabel utama */}
        <div
          className={`rounded-lg overflow-hidden ${
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
            <div className="grid grid-cols-3">
              <div className="px-6 py-3 text-left text-sm font-semibold">
                Nama Organizational
              </div>
              <div className="px-6 py-3 text-center text-sm font-semibold border-x border-white/30">
                Collaborator
              </div>
              <div className="px-6 py-3 text-center text-sm font-semibold">
                Action
              </div>
            </div>
          </div>

          <div>
            {data.map((item, idx) => (
              <Link
                key={item.id}
                href={`/Dashboard/organizational/prj/${item.id}`}
                className={`grid grid-cols-3 items-center ${
                  isDark ? "text-slate-100" : "text-slate-800"
                }
                            ${
                              isDark
                                ? idx % 2
                                  ? "bg-slate-800/40"
                                  : "bg-slate-800/70"
                                : idx % 2
                                ? "bg-[#FAFAFD]"
                                : "bg-white"
                            }
                            border-t ${
                              isDark ? "border-slate-700" : "border-slate-200"
                            } hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors`}
              >
                {/* Nama + badge */}
                <div className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{item.name}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${roleBadge(
                        item.role
                      )}`}
                    >
                      {item.role}
                    </span>
                  </div>
                </div>

                {/* Collaborator (dengan garis vertikal) */}
                <div
                  className={`px-6 py-4 border-x ${
                    isDark ? "border-slate-700" : "border-slate-200"
                  }`}
                >
                  <Collabs list={item.collaborators} />
                </div>

                {/* Action */}
                <div className="px-6 py-4">
                  <div className="flex items-center justify-center gap-4">
                    {item.role === "Owner" && (
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
                    )}
                    <button
                      className="hover:opacity-80 transition-opacity"
                      title={item.role === "Owner" ? "Edit" : "Exit"}
                      aria-label={item.role === "Owner" ? "Edit" : "Exit"}
                    >
                      <Image
                        src="/exit.png"
                        alt={item.role === "Owner" ? "Edit" : "Exit"}
                        width={22}
                        height={22}
                      />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
