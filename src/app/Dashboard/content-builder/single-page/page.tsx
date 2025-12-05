"use client";

import { useState } from "react";
import { useUI } from "@/context/UIContext";
import { useSidebar } from "@/context/SidebarContext";
import ContentBuilderSidebar from "@/components/ContentBuilderSidebar";
import SectionSecondarySidebar from "@/components/SecondaryBars/SectionSecondarySidebar";

export default function SinglePageCreate() {
  const { isDark } = useUI();
  const { isCollapsed } = useSidebar();

  const [activeTab, setActiveTab] = useState<"basic" | "advanced">("basic");
  const [multiLang, setMultiLang] = useState(true);
  const [seo, setSeo] = useState(true);
  const [workflow, setWorkflow] = useState(false);

  return (
    <div
      className={`min-h-screen w-full ${
        isDark ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-900"
      }`}
    >
      <ContentBuilderSidebar />
      <SectionSecondarySidebar />

      <main
        className={`min-h-screen flex items-center justify-center px-4 md:px-8 py-10 transition-all duration-300 ease-in-out ${
          isCollapsed ? "ml-[calc(5rem+16rem)]" : "ml-[calc(18rem+16rem)]"
        }`}
      >
        {/* Card lebih kecil & fix width */}
        <div className="w-full max-w-3xl rounded-2xl bg-gradient-to-b from-[#1E88E5] to-[#1976D2] shadow-[0_18px_40px_rgba(0,0,0,0.25)] px-8 py-7 text-white">
          <h1 className="text-xl md:text-2xl font-semibold mb-5">
            Create Single Page
          </h1>

          {/* Tabs */}
          <div className="flex items-center gap-8 text-sm font-semibold mb-3">
            <button
              type="button"
              onClick={() => setActiveTab("basic")}
              className={`relative pb-2 transition-colors ${
                activeTab === "basic" ? "text-white" : "text-white/70"
              }`}
            >
              <span>Basic Configuration</span>
              {activeTab === "basic" && (
                <span className="absolute left-0 -bottom-1 h-[2px] w-28 rounded-full bg-white" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("advanced")}
              className={`relative pb-2 transition-colors ${
                activeTab === "advanced" ? "text-white" : "text-white/70"
              }`}
            >
              <span>Advanced Configuration</span>
              {activeTab === "advanced" && (
                <span className="absolute left-0 -bottom-1 h-[2px] w-32 rounded-full bg-white" />
              )}
            </button>
          </div>

          {/* Area konten tab – tinggi & lebar fix */}
          <div className="mt-2">
            <div className="relative overflow-hidden min-h-[200px]">
              {activeTab === "basic" && (
                <div className="animate-fade-in">
                  <form className="space-y-4">
                    <div>
                      <label className="block text-xs mb-1 opacity-80">
                        Page Name
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md bg-white text-slate-900 text-sm px-3 py-2 outline-none border border-white/40 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs mb-1 opacity-80">
                        API
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md bg-white text-slate-900 text-sm px-3 py-2 outline-none border border-white/40 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      />
                      <p className="mt-1 text-[10px] text-white/80">
                        It’s generated automatically and used to generate API
                        routes.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="mt-3 w-full rounded-md bg-emerald-500 hover:bg-emerald-600 text-sm font-semibold py-2.5 transition-colors"
                    >
                      Create Page
                    </button>
                  </form>
                </div>
              )}

              {activeTab === "advanced" && (
                <div className="animate-fade-in">
                  <div className="space-y-4 text-sm">
                    <AdvancedToggle
                      label="Multi Language"
                      description="Enable this feature to make the page support multiple languages. When activated, the page content can be displayed in different languages based on user preference."
                      enabled={multiLang}
                      onChange={setMultiLang}
                    />

                    <AdvancedToggle
                      label="SEO"
                      description="Enable this feature to activate SEO settings for this page. When turned on, you can optimize the page content for search engines and customize metadata to improve visibility in search results."
                      enabled={seo}
                      onChange={setSeo}
                    />

                    <AdvancedToggle
                      label="WorkFlow"
                      description="Enable this feature to activate automated workflows for user interactions. When turned on, the system will automatically implement a structured approval process."
                      enabled={workflow}
                      onChange={setWorkflow}
                    />

                    <button
                      type="button"
                      className="mt-3 w-full rounded-md bg-emerald-500 hover:bg-emerald-600 text-sm font-semibold py-2.5 transition-colors"
                    >
                      Create Page
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =============== TOGGLE COMPONENT =============== */

type ToggleProps = {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
};

function AdvancedToggle({
  label,
  description,
  enabled,
  onChange,
}: ToggleProps) {
  return (
    <div className="flex items-start gap-3">
      {/* Switch */}
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-7 w-12 rounded-full transition-all duration-200 ${
          enabled ? "bg-gradient-to-r from-[#1CD97B] to-[#0FBF61]" : "bg-[#E3E7F4]"
        }`}
        style={{
          boxShadow: enabled
            ? "0 5px 12px rgba(15,191,97,0.55)"
            : "inset 0 2px 4px rgba(0,0,0,0.18)",
        }}
      >
        <span
          className="absolute top-[3px] h-5 w-5 rounded-full bg-white transition-transform duration-200"
          style={{
            transform: enabled ? "translateX(23px)" : "translateX(4px)",
            boxShadow: "0 3px 6px rgba(0,0,0,0.25)",
          }}
        />
      </button>

      {/* Text */}
      <div>
        <p className="font-semibold text-sm mb-1">{label}</p>
        <p className="text-[11px] leading-snug text-white/90">
          {description}
        </p>
      </div>
    </div>
  );
}
