"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUI } from "@/context/UIContext";

interface Project {
  id: number;
  name: string;
  lastUpdate: string;
}

export default function PersonalProjectPage() {
  const { isDark } = useUI();
  const [q, setQ] = useState("");

  const projects: Project[] = [
    { id: 1, name: "CMS CMLABS", lastUpdate: "03 Minute ago" },
    { id: 2, name: "CMS Pegadaian", lastUpdate: "20 Hours ago" },
    { id: 3, name: "CMS Polinema", lastUpdate: "21 Mar 2025, 10.00" },
  ];

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(q.trim().toLowerCase())
  );

  // BASE PATH DISESUAIKAN DENGAN LOKASI EDITOR ANDA
  // Jika page ini berada di /dashboard/personal, maka editornya di:
  const BASE_PATH = "/Dashboard/personal/create"; 

  return (
    <div className={`${isDark ? "bg-slate-900" : "bg-[#F4F5FA]"} min-h-screen`}>
      <div className="mx-auto max-w-[1300px] px-6 py-6" style={{ marginTop: '50px' }}>
        
        {/* Header: Judul + Filter (kiri) dan Create (kanan) */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className={`text-3xl font-bold mb-4 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
              Projects
            </h1>
            <button
              type="button"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors
                ${isDark ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-slate-300 text-slate-700 hover:bg-slate-50"}`}
            >
              <span>Filter Data</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.5a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 3v-6.172a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
            </button>
          </div>

          <Link
            href="content-builder"
            className="inline-flex items-center justify-center rounded-lg bg-[#F59E0B] px-6 py-3 text-white font-semibold shadow-sm hover:bg-[#D97706] transition-colors"
          >
            Create Projects
          </Link>
        </div>

        {/* Search */}
        <div className="mb-5">
          <div className="relative max-w-4xl">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className={`w-full rounded-lg pl-10 pr-3 py-2.5 border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
                ${isDark ? "bg-slate-800 text-slate-100 border-slate-700 placeholder:text-slate-400" :
                               "bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"}`}
            />
          </div>
        </div>

        {/* Tabel */}
        <div className={`rounded-xl overflow-hidden shadow-sm ${isDark ? "bg-slate-800/60 border border-slate-700" : "bg-white border border-slate-200"}`}>
          <div className={`${isDark ? "bg-slate-700 text-slate-100" : "bg-[#3B82F6] text-white"}`}>
            <div className="grid grid-cols-3 gap-4">
              <div className="px-6 py-3.5 text-left text-sm font-semibold">Project Name</div>
              <div className="px-6 py-3.5 text-left text-sm font-semibold">Last Update</div>
              <div className="px-6 py-3.5 text-left text-sm font-semibold">Action</div>
            </div>
          </div>

          <div>
            {filtered.length ? (
              filtered.map((p, idx) => (
                <div
                  key={p.id}
                  className={`grid grid-cols-3 gap-4 items-center ${isDark ? "text-slate-100" : "text-slate-800"}
                              ${isDark ? (idx % 2 ? "bg-slate-800/40" : "bg-slate-800/70") : (idx % 2 ? "bg-[#FAFAFD]" : "bg-white")}
                              border-t ${isDark ? "border-slate-700" : "border-slate-200"} hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors`}
                >
                  {/* Project Name */}
                  <div className="px-6 py-4 font-semibold">
                    {p.name}
                  </div>

                  {/* Last Update */}
                  <div className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {p.lastUpdate}
                  </div>

                  {/* Actions */}
                  <div className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* 1. Delete */}
                      <button className="hover:opacity-80 transition-opacity" title="Delete" aria-label="Delete">
                        <Image src="/sampah.png" alt="Delete" width={30} height={30} />
                      </button>
                      
                      {/* 2. EDIT/LINKED: PERBAIKAN LINK DINAMIS */}
                      <Link 
                        href={`${BASE_PATH}/${p.id}`} // Contoh: /dashboard/personal/create/2
                        className="hover:opacity-80 transition-opacity" 
                        title="Edit" 
                        aria-label="Edit"
                      >
                        <Image src="/linked.png" alt="Edit" width={30} height={30} />
                      </Link>
                      
                      {/* 3. View */}
                      <button className="hover:opacity-80 transition-opacity" title="View" aria-label="View">
                        <Image src="/add.png" alt="View" width={30} height={30} />
                      </button>
                      
                      {/* 4. More */}
                      <button className="hover:opacity-80 transition-opacity" title="More" aria-label="More">
                        <Image src="/sync.png" alt="More" width={30} height={30} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={`py-12 text-center ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                No projects found
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}