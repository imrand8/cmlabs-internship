"use client";

import { useState, useEffect } from "react";
import { useUI } from "@/context/UIContext";
import { useSidebar } from "@/context/SidebarContext";
import ContentBuilderSidebar from "@/components/ContentBuilderSidebar";
import SidebarMulti from "@/components/SidebarMulti";
import Header from "@/components/header";

export default function MultiPageCreate() {
  const { isDark } = useUI();
  const { isCollapsed, setHasSecondaryBar } = useSidebar();

  // Set hasSecondaryBar to true when component mounts to hide logo in ContentBuilderSidebar
  useEffect(() => {
    setHasSecondaryBar(true);
    return () => setHasSecondaryBar(false);
  }, [setHasSecondaryBar]);
  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    headerSection: null as File | null,
    footerSection: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, headerSection: file }));
  };

  // Calculate margin left based on sidebar state
  const sidebarWidth = isCollapsed ? 80 : 288; // w-20 = 80px, w-72 = 288px
  const secondaryNavWidth = 256; // w-64 = 256px
  const totalLeftMargin = sidebarWidth + secondaryNavWidth;

  return (
    <div
      className={`min-h-screen w-full ${
        isDark ? "bg-slate-900" : "bg-slate-100"
      }`}
    >
      <ContentBuilderSidebar />
      <SidebarMulti />
      <Header />

      <main
        className="min-h-screen pt-20 px-8 py-8 transition-all duration-300 ease-in-out"
        style={{ marginLeft: `${totalLeftMargin}px` }}
      >
        <div
          className={`mx-auto max-w-4xl rounded-2xl shadow-lg ${
            isDark
              ? "bg-slate-800 border border-slate-700"
              : "bg-white border border-slate-200"
          }`}
        >
          {/* Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab("content")}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "content"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab("seo")}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "seo"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              SEO Setting
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-6">
            {activeTab === "content" ? (
              <>
                {/* Name Field */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark
                        ? "bg-slate-700 text-slate-100 border-slate-600 placeholder:text-slate-400"
                        : "bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                    }`}
                    placeholder="Enter name"
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      isDark
                        ? "bg-slate-700 text-slate-100 border-slate-600 placeholder:text-slate-400"
                        : "bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                    }`}
                    placeholder="Enter description"
                  />
                </div>

                {/* Header Section - File Upload */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    Header Section
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                      isDark
                        ? "border-slate-600 bg-slate-700/50"
                        : "border-slate-300 bg-slate-50"
                    }`}
                  >
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                    <div className="flex flex-col items-center gap-3">
                      <svg
                        className={`w-12 h-12 ${
                          isDark ? "text-slate-400" : "text-slate-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p
                        className={`text-sm ${
                          isDark ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        Drag file here or click to upload
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Section */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    Footer Section
                  </label>
                  <input
                    type="text"
                    name="footerSection"
                    value={formData.footerSection}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark
                        ? "bg-slate-700 text-slate-100 border-slate-600 placeholder:text-slate-400"
                        : "bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                    }`}
                    placeholder="Text / Copyright"
                  />
                </div>
              </>
            ) : (
              <div
                className={`text-center py-12 ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                <p>SEO Settings will be available here</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                type="button"
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Add Social Media
              </button>
              <button
                type="button"
                className="px-6 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
              >
                Save Change
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
