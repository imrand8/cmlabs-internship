"use client";

import { useUI } from "@/context/UIContext";
import Link from "next/link";

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
    icon: "Text",
    title: "Text Field",
    description: "Used for short or long texts, names, rich texts, etc.",
    href: "/dashboard/content-builder/home/create/text",
  },
  {
    id: "location",
    icon: "Loc",
    title: "Location",
    description:
      "Used for geographic data via address inputs or map contributions.",
    href: "/dashboard/content-builder/home/create/location",
  },
  {
    id: "media",
    icon: "Med",
    title: "Media Field",
    description:
      "Used for uploading and managing files like images, videos, audios or documents.",
    href: "/dashboard/content-builder/home/create/media",
  },
  {
    id: "multiple",
    icon: "Mul",
    title: "Multiple Content",
    description:
      "Used for managing multiple content, allowing flexible combinations components.",
    href: "/dashboard/content-builder/home/create/multiple",
  },
  {
    id: "number",
    icon: "Num",
    title: "Number Field",
    description:
      "Used for numeric values with optional format for integers and decimals.",
    href: "/dashboard/content-builder/home/create/number",
  },
  {
    id: "relation",
    icon: "Rel",
    title: "Relation",
    description:
      "Used for linking entries across content types with configurable cardinality.",
    href: "/dashboard/content-builder/home/create/relation",
  },
  {
    id: "datetime",
    icon: "Cal",
    title: "Date and Time",
    description:
      "Used for temporal data with calendar inputs, time, and configurable formatting.",
    href: "/dashboard/content-builder/home/create/datetime",
  },
];

export default function AddFieldPage() {
  const { isDark } = useUI();

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-slate-900" : "bg-[#F4F5FA]"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-10 py-8 space-y-8">
        {/* Breadcrumb */}
        <div className="text-sm text-slate-500">
          Pages / <span className="font-medium">Content Builder</span> / Home
        </div>

        {/* Badge Home di atas kiri seperti desain */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-dashed border-slate-300 bg-white px-4 py-2 shadow-sm">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#3A7AC3] text-white shadow">
              {/* icon kotak putih di dalam */}
              <div className="h-6 w-6 rounded-md bg-white" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900">
                Home
              </div>
              <div className="text-[11px] text-slate-500">
                Built your content structure
              </div>
            </div>
          </div>
        </div>

        {/* Header kanan (judul + tombol) */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900">
            Add Field
          </h1>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-md bg-[#2563EB] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#1D4ED8]">
              {/* icon folder putih kotak */}
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-white text-[10px] font-bold text-[#2563EB]">
                F
              </span>
              Create Field Group
            </button>
            <button className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow hover:bg-slate-50">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2563EB] text-xs font-bold text-white">
                +
              </span>
              Add Field
            </button>
          </div>
        </div>

        {/* Kartu besar Add Field Type dengan gradient vertikal #3A7AC3 */}
        <div
          className="mx-auto mt-4 w-full max-w-[820px] rounded-3xl px-10 py-10 shadow-xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(58,122,195,1) 0%, rgba(58,122,195,0.7) 100%)",
          }}
        >
          <h2 className="mb-6 text-2xl font-semibold text-white">
            Add Field Type
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fieldTypes.map((field) => (
              <Link
                key={field.id}
                href={field.href}
                className="group rounded-xl bg-white/95 p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  {/* icon kotak abu-abu seperti di desain */}
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-[10px] font-semibold text-slate-500">
                    <div className="h-6 w-6 rounded-sm bg-slate-200" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 text-sm font-semibold text-slate-900">
                      {field.title}
                    </h3>
                    <p className="text-[11px] leading-relaxed text-slate-500">
                      {field.description}
                    </p>
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
