"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUI } from "@/context/UIContext";
import { useSidebar } from "@/context/SidebarContext";
import ContentBuilderSidebar from "@/components/ContentBuilderSidebar";
import ApiSidebar from "@/components/ApiSidebar";

interface ApiToken {
  id: number;
  name: string;
  description: string;
  created: string;
  lastUsed: string;
  expired: string;
}

export default function SettingPage() {
  const { isDark } = useUI();
  const { isCollapsed, setHasSecondaryBar } = useSidebar();

  // Set hasSecondaryBar to true when component mounts to hide logo in ContentBuilderSidebar
  useEffect(() => {
    setHasSecondaryBar(true);
    return () => setHasSecondaryBar(false);
  }, [setHasSecondaryBar]);

  // Sample data
  const apiTokens: ApiToken[] = [
    {
      id: 1,
      name: "Full Access",
      description:
        "A master API token with full access to all endpoints, including write and delete actions",
      created: "March 08, 2025 08:00:05 WIB",
      lastUsed: "June 08, 2025 08:00:05 WIB",
      expired: "July 08, 2025 08:00:05 WIB",
    },
    {
      id: 2,
      name: "Custom Token",
      description: "Tokens that can only be CUD",
      created: "July 08, 2025 08:00:05 WIB",
      lastUsed: "July 08, 2025 08:00:05 WIB",
      expired: "July 08, 2025 08:00:05 WIB",
    },
  ];

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
      <ApiSidebar />

      <main
        className="min-h-screen px-8 py-8 transition-all duration-300 ease-in-out"
        style={{ marginLeft: `${totalLeftMargin}px` }}
      >
        {/* Header with Title and Button - Fixed at top */}
        <div className="w-full max-w-7xl mx-auto mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1
                className={`text-3xl font-bold mb-2 ${
                  isDark ? "text-slate-100" : "text-slate-900"
                }`}
              >
                API and Integration
              </h1>
              <p
                className={`text-sm ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Optimize your API and Integration management
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? "bg-slate-700 hover:bg-slate-600 text-slate-300"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-600"
                }`}
                title="Settings"
                aria-label="Settings"
              >
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
              <Link href="/Dashboard/content-builder/setting/API-token">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  + New API Token
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Table Container - Centered */}
        <div className="flex items-center justify-center min-h-[calc(100vh-250px)]">
          <div className="w-full max-w-7xl mx-auto">
            {/* Table */}
            <div
              className={`rounded-lg shadow-lg overflow-hidden ${
                isDark
                  ? "bg-slate-800 border border-slate-700"
                  : "bg-white border border-slate-200"
              }`}
            >
              {/* Table Header */}
              <div
                className={`grid grid-cols-6 gap-4 px-6 py-3.5 ${
                  isDark ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
                }`}
              >
                <div className="text-sm font-semibold">Name</div>
                <div className="text-sm font-semibold">Description</div>
                <div className="text-sm font-semibold">Created</div>
                <div className="text-sm font-semibold">Last Used</div>
                <div className="text-sm font-semibold">Expired</div>
                <div className="text-sm font-semibold text-center">Action</div>
              </div>

              {/* Table Body */}
              <div>
                {apiTokens.map((token, idx) => (
                  <div
                    key={token.id}
                    className={`grid grid-cols-6 gap-4 items-center px-6 py-4 border-t ${
                      isDark
                        ? "border-slate-700 text-slate-100"
                        : "border-slate-200 text-slate-800"
                    } ${
                      isDark
                        ? idx % 2
                          ? "bg-slate-800/40"
                          : "bg-slate-800/70"
                        : idx % 2
                        ? "bg-[#FAFAFD]"
                        : "bg-white"
                    } hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors`}
                  >
                    {/* Name */}
                    <div className="font-medium">{token.name}</div>

                    {/* Description */}
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {token.description}
                    </div>

                    {/* Created */}
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {token.created}
                    </div>

                    {/* Last Used */}
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {token.lastUsed}
                    </div>

                    {/* Expired */}
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {token.expired}
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-center gap-4">
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
                      <Link
                        href={`/Dashboard/content-builder/setting/API-token/${token.id}`}
                        className="hover:opacity-80 transition-opacity"
                        title="View/Edit"
                        aria-label="View/Edit"
                      >
                        <Image
                          src="/exit.png"
                          alt="View/Edit"
                          width={22}
                          height={22}
                        />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
