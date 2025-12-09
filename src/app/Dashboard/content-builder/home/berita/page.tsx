"use client";

import { useEffect, useState } from "react";
import { useUI } from "@/context/UIContext";
import { useSidebar } from "@/context/SidebarContext";
import ContentBuilderSidebar from "@/components/ContentBuilderSidebar";
import BeritaSecondarySidebar from "@/components/SecondaryBars/BeritaSecondarySidebar";
import { Trash2, GripVertical, Settings } from "lucide-react";

interface Field {
  id: string;
  name: string;
  type: string;
}

export default function BeritaPage() {
  const { isDark } = useUI();
  const { isCollapsed } = useSidebar();

  const [fields, setFields] = useState<Field[]>([
    { id: "1", name: "Berita Kandang", type: "Short Field" },
    { id: "2", name: "Berita Kandang", type: "Short Field" },
  ]);

  const [name, setName] = useState("");
  const [apiId, setApiId] = useState("");

  const handleDelete = (id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  // auto generate API Id saka Name (slug)
  useEffect(() => {
    if (!name) {
      setApiId("");
      return;
    }
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
    setApiId(slug);
  }, [name]);

  const leftOffsetClass = isCollapsed
    ? "ml-[calc(5rem+4rem)]"
    : "ml-[calc(18rem+4rem)]";

  const rightPanelBg = isDark ? "bg-[#111827]" : "bg-[#2563EB]";
  const rightCardBg = isDark ? "bg-[#1F2937]" : "bg-[#1E4FD8]";
  const rightTextMuted = isDark ? "text-slate-300" : "text-blue-100";

  return (
    <div className={`${isDark ? "bg-slate-900" : "bg-[#F4F5FA]"} min-h-screen`}>
      <ContentBuilderSidebar />
      <BeritaSecondarySidebar />

      <main
        className={`flex min-h-screen ${leftOffsetClass} pr-[340px] py-6 gap-6 transition-all duration-300 ease-in-out`}
      >
        {/* MAIN CONTENT */}
        <section className="flex-1 flex justify-center">
          <div className="w-full max-w-[760px] space-y-6">
            <div className={`text-sm ${isDark ? "text-slate-300" : "text-slate-500"}`}>
              Pages / Content Builder / <span className="font-medium">Home</span>
            </div>

            {/* Header + buttons */}
            <div className="flex items-center justify-between gap-4">
              <div
                className={`
                  flex items-center gap-3 rounded-xl border border-dashed px-4 py-3 shadow-sm
                  ${isDark ? "border-slate-600 bg-slate-800" : "border-slate-300 bg-white"}
                `}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3A7AC3] text-white shadow">
                  <div className="h-6 w-6 rounded-md bg-white" />
                </div>
                <div className="leading-tight">
                  <h1
                    className={`text-base font-semibold ${
                      isDark ? "text-slate-50" : "text-slate-900"
                    }`}
                  >
                    Home
                  </h1>
                  <p
                    className={`text-[11px] ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Built your content structure
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                {/* Create Field Group */}
                <button
                  className={`
                    inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow
                    ${
                      isDark
                        ? "bg-blue-600 text-white hover:bg-blue-500"
                        : "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                    }
                  `}
                >
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-white text-[10px] font-bold text-[#2563EB]">
                    F
                  </span>
                  Create Field Group
                </button>

                {/* Add Field */}
                <button
                  className={`
                    inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow
                    ${
                      isDark
                        ? "bg-slate-800 text-slate-100 hover:bg-slate-700"
                        : "bg-white text-slate-900 hover:bg-slate-50"
                    }
                  `}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2563EB] text-xs font-bold text-white">
                    +
                  </span>
                  Add Field
                </button>
              </div>
            </div>

            {/* List field */}
            <div className="space-y-3">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className={`
                    flex items-center justify-between rounded-xl border px-4 py-3 shadow-sm
                    ${
                      isDark
                        ? "border-slate-700 bg-slate-800"
                        : "border-blue-200 bg-white"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <button
                      className={`
                        flex h-8 w-8 items-center justify-center rounded-md
                        ${
                          isDark
                            ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                            : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                        }
                      `}
                    >
                      <GripVertical className="h-4 w-4" />
                    </button>
                    <div
                      className={`
                        flex h-10 w-14 items-center justify-center rounded-md
                        ${isDark ? "bg-slate-700" : "bg-slate-100"}
                      `}
                    >
                      <div
                        className={`
                          h-7 w-10 rounded-sm
                          ${isDark ? "bg-slate-500" : "bg-slate-200"}
                        `}
                      />
                    </div>
                    <div>
                      <div
                        className={`text-sm font-semibold ${
                          isDark ? "text-slate-50" : "text-slate-900"
                        }`}
                      >
                        {field.name}
                      </div>
                      <div
                        className={`text-[11px] ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {field.type}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(field.id)}
                    className={`
                      flex h-8 w-8 items-center justify-center rounded-md text-red-500
                      ${isDark ? "hover:bg-red-900/40" : "hover:bg-red-100"}
                    `}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <aside
          className={`
            fixed right-0 top-0 z-30
            flex h-screen w-[320px] flex-col
            ${rightPanelBg} px-6 pt-6 pb-4 text-white
            shadow-[-16px_0_40px_rgba(15,23,42,0.8)]
          `}
        >
          {/* garis pembatas kiri */}
          <div className="absolute inset-y-0 left-0 w-px bg-white/10" />

          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <Settings className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Setting</p>
              <p className="text-[11px] text-blue-100">Configuration</p>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto">
            {/* Basic Configuration */}
            <div className={`space-y-4 rounded-2xl px-4 py-4 ${rightCardBg}`}>
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Basic Configuration</span>
                <span className="text-lg leading-none">▾</span>
              </div>

              <div className="space-y-3 text-xs">
                {/* Name input */}
                <div>
                  <p className="mb-1">Name</p>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`
                      h-9 w-full rounded-md px-3 text-[11px] outline-none
                      ${
                        isDark
                          ? "bg-slate-800 text-slate-200 placeholder-slate-500"
                          : "bg-white text-slate-900 placeholder-slate-400"
                      }
                    `}
                    placeholder="Enter name"
                  />
                </div>

                {/* API Id input */}
                <div>
                  <p className="mb-1">API Id</p>
                  <input
                    value={apiId}
                    onChange={(e) => setApiId(e.target.value)}
                    className={`
                      h-9 w-full rounded-md px-3 text-[11px] outline-none
                      ${
                        isDark
                          ? "bg-slate-800 text-slate-200 placeholder-slate-500"
                          : "bg-white text-slate-900 placeholder-slate-400"
                      }
                    `}
                    placeholder="Generated automatically"
                  />
                  <p className={`mt-1 text-[10px] ${rightTextMuted}`}>
                    It&apos;s generated automatically and used to generate API routes
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="flex items-start gap-2 text-[11px]">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-0.5 h-3.5 w-3.5 rounded border-white/70 bg-white/10"
                    />
                    <span>
                      <span className="font-semibold">Required</span>
                      <br />
                      <span className={`text-[10px] font-normal ${rightTextMuted}`}>
                        Field must be filled before saving. Empty entries will be rejected.
                      </span>
                    </span>
                  </label>

                  <label className="flex items-start gap-2 text-[11px]">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-3.5 w-3.5 rounded border-white/70 bg-white/10"
                    />
                    <span>
                      <span className="font-semibold">Unique</span>
                      <br />
                      <span className={`text-[10px] font-normal ${rightTextMuted}`}>
                        Duplicate entries are most allowed. Value must be unique across all
                        records.
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Advanced Configuration */}
            <button
              className={`
                flex w-full items-center justify-between rounded-2xl px-4 py-3 text-xs font-semibold
                ${rightCardBg}
              `}
            >
              <span>Advanced Configuration</span>
              <span className="text-lg leading-none">▾</span>
            </button>
          </div>

          <button className="mt-4 w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600">
            Save Configuration
          </button>
        </aside>
      </main>
    </div>
  );
}
