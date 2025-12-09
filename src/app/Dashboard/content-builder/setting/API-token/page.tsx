"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUI } from "@/context/UIContext";
import { useSidebar } from "@/context/SidebarContext";
import ContentBuilderSidebar from "@/components/ContentBuilderSidebar";
import SidebarSetting from "@/components/SidebarSetting";

export default function SettingPage() {
  const { isDark } = useUI();
  const { isCollapsed, setHasSecondaryBar } = useSidebar();

  // Set hasSecondaryBar to true when component mounts to hide logo in ContentBuilderSidebar
  useEffect(() => {
    setHasSecondaryBar(true);
    return () => setHasSecondaryBar(false);
  }, [setHasSecondaryBar]);

  const [formData, setFormData] = useState({
    apiTokenName: "Custom Token",
    description: "Tokens that can only be CUD",
    validityPeriod: "7 Days",
    accessScope: "Custom",
    permissions: {
      createContentModel: false,
      deleteContentModel: false,
      findOneContentModel: false,
      updateContentModel: false,
      findContentModel: false,
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (permission: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]:
          !prev.permissions[permission as keyof typeof prev.permissions],
      },
    }));
  };

  const handleSelectAll = () => {
    const allSelected = Object.values(formData.permissions).every(Boolean);
    setFormData((prev) => ({
      ...prev,
      permissions: {
        createContentModel: !allSelected,
        deleteContentModel: !allSelected,
        findOneContentModel: !allSelected,
        updateContentModel: !allSelected,
        findContentModel: !allSelected,
      },
    }));
  };

  // Calculate margin left based on sidebar state
  const sidebarWidth = isCollapsed ? 80 : 288; // w-20 = 80px, w-72 = 288px
  const secondaryNavWidth = 256; // w-64 = 256px
  const totalLeftMargin = sidebarWidth + secondaryNavWidth;

  const allSelected = Object.values(formData.permissions).every(Boolean);

  return (
    <div
      className={`min-h-screen w-full ${
        isDark ? "bg-slate-900" : "bg-slate-100"
      }`}
    >
      <ContentBuilderSidebar />
      <SidebarSetting />

      <main
        className="min-h-screen px-8 py-8 transition-all duration-300 ease-in-out"
        style={{ marginLeft: `${totalLeftMargin}px` }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header with Back and Save */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/Dashboard/content-builder/setting"
              className={`text-sm font-medium hover:underline ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              ← Back
            </Link>
            <button
              type="button"
              className="px-6 py-2.5 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
            >
              Save
            </button>
          </div>

          {/* Title Section */}
          <div className="mb-8">
            <h1
              className={`text-3xl font-bold mb-2 ${
                isDark ? "text-slate-100" : "text-slate-900"
              }`}
            >
              Create a New API Token
            </h1>
            <p
              className={`text-sm ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Optimize your API and Integration management
            </p>
          </div>

          {/* Form */}
          <div
            className={`rounded-lg shadow-lg ${
              isDark
                ? "bg-slate-800 border border-slate-700"
                : "bg-white border border-slate-200"
            }`}
          >
            <div className="p-6 space-y-6">
              {/* API Token Name */}
              <div>
                <label
                  className={`block text-sm font-semibold mb-2 px-3 py-1.5 rounded bg-blue-500 text-white inline-block ${
                    isDark ? "bg-blue-600" : "bg-blue-500"
                  }`}
                >
                  API Token Name*
                </label>
                <input
                  type="text"
                  name="apiTokenName"
                  value={formData.apiTokenName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? "bg-slate-700 text-slate-100 border-slate-600 placeholder:text-slate-400"
                      : "bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                  }`}
                />
              </div>

              {/* Description */}
              <div>
                <label
                  className={`block text-sm font-semibold mb-2 px-3 py-1.5 rounded bg-blue-500 text-white inline-block ${
                    isDark ? "bg-blue-600" : "bg-blue-500"
                  }`}
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? "bg-slate-700 text-slate-100 border-slate-600 placeholder:text-slate-400"
                      : "bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                  }`}
                />
              </div>

              {/* Validity Period */}
              <div>
                <label
                  className={`block text-sm font-semibold mb-2 px-3 py-1.5 rounded bg-blue-500 text-white inline-block ${
                    isDark ? "bg-blue-600" : "bg-blue-500"
                  }`}
                >
                  Validity Period*
                </label>
                <input
                  type="text"
                  name="validityPeriod"
                  value={formData.validityPeriod}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? "bg-slate-700 text-slate-100 border-slate-600 placeholder:text-slate-400"
                      : "bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                  }`}
                />
                <p
                  className={`mt-2 text-xs ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  If the Validity Period has passed, the API will be immediately
                  deleted from the API and Integration List.
                </p>
              </div>

              {/* Access Scope */}
              <div>
                <label
                  className={`block text-sm font-semibold mb-2 px-3 py-1.5 rounded bg-blue-500 text-white inline-block ${
                    isDark ? "bg-blue-600" : "bg-blue-500"
                  }`}
                >
                  Access Scope*
                </label>
                <input
                  type="text"
                  name="accessScope"
                  value={formData.accessScope}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? "bg-slate-700 text-slate-100 border-slate-600 placeholder:text-slate-400"
                      : "bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                  }`}
                />
              </div>

              {/* Access Permission */}
              <div
                className={`p-4 rounded-lg border ${
                  isDark
                    ? "bg-blue-500/10 border-blue-500/30"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-base font-semibold ${
                      isDark ? "text-slate-100" : "text-slate-900"
                    }`}
                  >
                    Access Permission
                  </h3>
                </div>

                <div
                  className={`p-3 rounded-lg mb-4 ${
                    isDark ? "bg-blue-600" : "bg-blue-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white">
                      Customizable Content Models and Schema
                    </h4>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={handleSelectAll}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-white">
                        Select All
                      </span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      key: "createContentModel",
                      label: "Create Content Model",
                    },
                    {
                      key: "deleteContentModel",
                      label: "Delete Content Model",
                    },
                    {
                      key: "findOneContentModel",
                      label: "Find One Content Model",
                    },
                    {
                      key: "updateContentModel",
                      label: "Update Content Model",
                    },
                    { key: "findContentModel", label: "Find Content Model" },
                  ].map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={
                          formData.permissions[
                            key as keyof typeof formData.permissions
                          ]
                        }
                        onChange={() => handleCheckboxChange(key)}
                        className={`w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 ${
                          isDark
                            ? "bg-slate-700 border-slate-600"
                            : "bg-white border-slate-300"
                        }`}
                      />
                      <span
                        className={`ml-2 text-sm ${
                          isDark ? "text-slate-200" : "text-slate-700"
                        }`}
                      >
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
