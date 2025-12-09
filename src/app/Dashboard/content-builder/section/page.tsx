"use client";

import Link from "next/link";
import { useState } from "react";
import { useUI } from "@/context/UIContext";
import { useSidebar } from "@/context/SidebarContext";
import ContentBuilderSidebar from "@/components/ContentBuilderSidebar";
import SectionSecondarySidebar from "@/components/SecondaryBars/SectionSecondarySidebar";
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
    href: "/dashboard/content-builder/section/create/text",
  },
  {
    id: "location",
    icon: "📍",
    title: "Location",
    description: "Used for geographic data via address inputs or map contributions.",
    href: "/dashboard/content-builder/section/create/location",
  },
  {
    id: "media",
    icon: "🖼️",
    title: "Media Field",
    description: "Used for uploading and managing files like images, videos, audios or documents.",
    href: "/dashboard/content-builder/section/create/media",
  },
  {
    id: "multiple",
    icon: "📊",
    title: "Multiple Content",
    description: "Used for managing multiple content, allowing flexible combinations components.",
    href: "/dashboard/content-builder/section/create/multiple",
  },
  {
    id: "number",
    icon: "🔢",
    title: "Number Field",
    description: "Used for numeric values with optional format for integers and decimals.",
    href: "/dashboard/content-builder/section/create/number",
  },
  {
    id: "relation",
    icon: "🔗",
    title: "Relation",
    description: "Used for linking entries across content types with configurable cardinality.",
    href: "/dashboard/content-builder/section/create/relation",
  },
  {
    id: "datetime",
    icon: "📅",
    title: "Date and Time",
    description: "Used for temporal data with calendar inputs, time, and configurable formatting.",
    href: "/dashboard/content-builder/section/create/datetime",
  },
];

export default function SectionPage() {
  const { isDark } = useUI();
  const { isCollapsed, setIsCollapsed, setLocked } = useSidebar();
  const [showFieldTypes, setShowFieldTypes] = useState(false);
  const title = "Section";

  const handleAddField = () => {
    setShowFieldTypes(true);
  };

  const handleCollapseClick = () => {
    // collapse and lock the sidebar when interacting inside Section page
    setIsCollapsed(true);
    setLocked(true);
  };

  return (
    <div className={`min-h-screen w-full ${isDark ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-900"}`}>
      <ContentBuilderSidebar />
      <SectionSecondarySidebar />

      <main onClick={handleCollapseClick} className={`min-h-screen px-8 py-16 transition-all duration-300 ease-in-out flex flex-col justify-center ${
        isCollapsed ? "ml-[calc(5rem+16rem)]" : "ml-[calc(18rem+16rem)]"
      }`}>
        {/* Conditional Render */}
        {!showFieldTypes ? (
          // Empty State
          <div className="flex justify-center">
            <EmptyStateCard pageTitle={title} onAddField={handleAddField} />
          </div>
        ) : (
          // Field Types Grid
          <div className="flex justify-center mt-6">
            <div
              className={`rounded-xl p-6 bg-gradient-to-r from-blue-500 to-blue-600 w-full max-w-4xl`}
            >
              <h2 className="text-white text-lg font-semibold mb-4">Add Field Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {fieldTypes.map((field) => (
                  <Link
                    key={field.id}
                    href={field.href}
                    className={`group rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-md bg-white hover:bg-slate-50`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded text-lg flex-shrink-0 bg-gray-200`}
                      >
                        {field.icon}
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-semibold text-sm text-slate-900 mb-0.5`}
                        >
                          {field.title}
                        </h3>
                        <p
                          className={`text-xs leading-snug text-slate-600`}
                        >
                          {field.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
