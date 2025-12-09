"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useUI } from "@/context/UIContext";
import { useSidebar } from "@/context/SidebarContext";
import ContentBuilderSidebar from "@/components/ContentBuilderSidebar";
import SectionSecondarySidebar from "@/components/SecondaryBars/SectionSecondarySidebar";
import PageHeader from "@/components/content-builder/PageHeader";
import EmptyStateCard from "@/components/content-builder/EmptyStateCard";

interface FieldType {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
}

const fieldTypes: FieldType[] = [
  {
    id: "text",
    icon: "📝",
    title: "Text Field",
    description: "Used for short or long texts, names, rich texts, etc.",
    href: "/Dashboard/content-builder/home/berita",
  },
  {
    id: "location",
    icon: "📍",
    title: "Location",
    description:
      "Used for geographic data via address inputs or map contributions.",
    href: "/dashboard/content-builder/home/create/location",
  },
  {
    id: "media",
    icon: "🖼️",
    title: "Media Field",
    description:
      "Used for uploading and managing files like images, videos, audios or documents.",
    href: "/dashboard/content-builder/home/create/media",
  },
  {
    id: "multiple",
    icon: "📊",
    title: "Multiple Content",
    description:
      "Used for managing multiple content, allowing flexible combinations components.",
    href: "/dashboard/content-builder/home/create/multiple",
  },
  {
    id: "number",
    icon: "🔢",
    title: "Number Field",
    description:
      "Used for numeric values with optional format for integers and decimals.",
    href: "/dashboard/content-builder/home/create/number",
  },
  {
    id: "relation",
    icon: "🔗",
    title: "Relation",
    description:
      "Used for linking entries across content types with configurable cardinality.",
    href: "/dashboard/content-builder/home/create/relation",
  },
  {
    id: "datetime",
    icon: "📅",
    title: "Date and Time",
    description:
      "Used for temporal data with calendar inputs, time, and configurable formatting.",
    href: "/dashboard/content-builder/home/create/datetime",
  },
];

export default function ContentBuilderHomePage() {
  const { isDark } = useUI();
  const { isCollapsed, forceSetIsCollapsed, setLocked } = useSidebar();
  const [showFieldTypes, setShowFieldTypes] = useState(false);
  const title = "Home";

  useEffect(() => {
    forceSetIsCollapsed(true);
    setLocked(true);
  }, [forceSetIsCollapsed, setLocked]);

  const handleAddField = () => {
    setShowFieldTypes(true);
  };

  // wrapper rada luwih terang, card luwih peteng supaya misah
  const wrapperBg = isDark
    ? "bg-slate-800"
    : "bg-gradient-to-r from-blue-500 to-blue-600";

  const cardBg = isDark ? "bg-slate-900" : "bg-white";
  const cardTitle = isDark ? "text-slate-50" : "text-slate-900";
  const cardText = isDark ? "text-slate-300" : "text-slate-600";

  return (
    <div
      className={`min-h-screen w-full ${
        isDark ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-900"
      }`}
    >
      <ContentBuilderSidebar />
      <SectionSecondarySidebar />

      <main
        className={`min-h-screen px-8 py-8 transition-all duration-300 ease-in-out flex flex-col ${
          isCollapsed ? "ml-[calc(5rem+16rem)]" : "ml-[calc(18rem+16rem)]"
        }`}
      >
        <PageHeader title={title} onAddField={handleAddField} />

        <div className="flex justify-center flex-1 items-center">
          {!showFieldTypes ? (
            <EmptyStateCard pageTitle={title} onAddField={handleAddField} />
          ) : (
            <div
              className={`
                ${wrapperBg}
                rounded-2xl px-6 py-5 w-full max-w-3xl
                shadow-[0_10px_30px_rgba(15,23,42,0.55)]
                border border-slate-700/70
              `}
            >
              <h1 className="text-white text-base font-semibold mb-3">
                Add Field Type
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {fieldTypes.map((field) => (
                  <Link
                    key={field.id}
                    href={field.href}
                    className={`
                      group rounded-xl px-3.5 py-3
                      ${cardBg}
                      transition-all duration-200
                      shadow-[0_6px_18px_rgba(15,23,42,0.55)]
                      hover:shadow-[0_10px_28px_rgba(15,23,42,0.85)]
                      hover:-translate-y-0.5
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`
                          flex h-9 w-9 items-center justify-center rounded-md text-lg flex-shrink-0
                          ${isDark ? "bg-slate-800" : "bg-slate-100"}
                        `}
                      >
                        {field.icon}
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-semibold text-xs mb-0.5 ${cardTitle}`}
                        >
                          {field.title}
                        </h3>
                        <p
                          className={`text-[11px] leading-snug ${cardText}`}
                        >
                          {field.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
