"use client";

import ContentBuilderSidebar from "@/components/ContentBuilderSidebar";
import { useUI } from "@/context/UIContext";
import { useSidebar } from "@/context/SidebarContext";
import { FolderPlus, Plus, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { uploadAssets } from "@/services/mediaAsset";

export default function MediaAssetAddPage() {
  const { isDark } = useUI();
  const { isCollapsed } = useSidebar();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const pageBg = isDark
    ? "bg-slate-900 text-slate-100"
    : "bg-white text-slate-900";
  const cardBg = isDark
    ? "bg-slate-800/95 border border-slate-700 text-slate-100"
    : "bg-[#2c72c8] text-white";
  const innerBg = isDark
    ? "bg-slate-900 border-slate-700"
    : "bg-white border-blue-200";
  const plusBg = isDark ? "bg-slate-700 text-white" : "bg-[#2c72c8] text-white";
  const hoverClose = isDark
    ? "hover:bg-slate-700/70 text-slate-200"
    : "hover:bg-blue-500/30 text-white";
  const badgeBg = isDark
    ? "bg-emerald-600 text-white"
    : "bg-emerald-500 text-white";

  const handlePlusClick = () => {
    fileInputRef.current?.click();
  };

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || !files.length) return;
    const newFiles = Array.from(files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemove = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (!selectedFiles.length) return;
    setUploading(true);
    setError(null);
    setSuccess(false);
    uploadAssets(selectedFiles)
      .then(() => {
        setSuccess(true);
        setSelectedFiles([]);
      })
      .catch((err) => {
        setError(err.message || "Upload failed");
      })
      .finally(() => setUploading(false));
  };

  const fileCount = selectedFiles.length;

  const filePreviews = useMemo(
    () =>
      selectedFiles.map((file, idx) => {
        const isPdf =
          file.type === "application/pdf" ||
          file.name.toLowerCase().endsWith(".pdf");
        const isImage = file.type.startsWith("image/");
        const previewUrl = isImage ? URL.createObjectURL(file) : null;
        return { file, idx, isPdf, previewUrl };
      }),
    [selectedFiles]
  );

  return (
    <div className={`min-h-screen w-full ${pageBg}`}>
      <ContentBuilderSidebar />

      <main
        className={`min-h-screen px-8 md:px-12 py-12 transition-all duration-300 ease-in-out flex flex-col ${
          isCollapsed ? "ml-20" : "ml-72"
        }`}
      >
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            <span>Pages</span> <span className="mx-1 text-slate-400">/</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              Media Asset
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(16,185,129,0.35)] transition hover:bg-emerald-600"
            >
              <FolderPlus className="h-4 w-4" strokeWidth={2.5} />
              Create New Folder
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(37,99,235,0.35)] transition hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              Add Assets
            </button>
          </div>
        </div>

        {/* Modal-style uploader centered */}
        <div className="flex-1 flex items-center justify-center pb-6">
          <div
            className={`${cardBg} relative w-full max-w-4xl rounded-2xl px-8 md:px-10 py-8 shadow-[0_26px_70px_rgba(0,0,0,0.22)]`}
          >
            {/* Title & close */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Add Assets</h2>
                {fileCount > 0 && (
                  <span
                    className={`inline-flex items-center justify-center rounded px-2 py-1 text-xs font-semibold ${badgeBg}`}
                  >
                    {fileCount}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => router.back()}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition ${hoverClose}`}
                aria-label="Close"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>

            {/* Content */}
            {fileCount === 0 ? (
              <div
                className={`rounded-xl border ${innerBg} px-6 py-10 md:px-10 md:py-12 flex flex-col items-center gap-5 text-center`}
              >
                <button
                  type="button"
                  onClick={handlePlusClick}
                  className={`flex h-16 w-16 items-center justify-center rounded-full ${plusBg} shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition hover:opacity-90 active:scale-[0.98]`}
                  aria-label="Choose files"
                >
                  <Plus className="h-8 w-8" strokeWidth={3} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  aria-hidden="true"
                  onChange={(e) => handleFilesSelected(e.target.files)}
                />
                <div
                  className={`${
                    isDark ? "text-slate-200" : "text-slate-800"
                  } text-sm leading-relaxed`}
                >
                  <p>Drag files here or</p>
                  <p>select from your device</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                <p className="text-xs md:text-sm text-slate-100/80">
                  Manage the asset before saving it to Media Library
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filePreviews.map(({ file, idx, isPdf, previewUrl }) => (
                    <div
                      key={idx}
                      className="relative rounded-lg bg-white text-slate-900 shadow-sm p-3 border border-blue-100 flex flex-col gap-2"
                    >
                      <button
                        type="button"
                        onClick={() => handleRemove(idx)}
                        className="absolute right-2 top-2 text-blue-500 hover:text-blue-700"
                        aria-label={`Remove ${file.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="flex flex-col items-center gap-2 pt-4">
                        <div className="h-20 w-20 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                          {previewUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={previewUrl}
                              alt={file.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center gap-1 text-sm text-blue-600">
                              {isPdf ? "PDF" : "FILE"}
                            </div>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 truncate w-full text-center">
                          {file.name}
                        </p>
                        <div className="h-2 w-16 rounded-full bg-slate-200 overflow-hidden">
                          <div className="h-full w-2/3 bg-blue-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {error && (
                  <p className="text-xs text-red-200 bg-red-900/30 border border-red-700/50 rounded px-3 py-2">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="text-xs text-emerald-100 bg-emerald-900/30 border border-emerald-700/50 rounded px-3 py-2">
                    Upload success
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handlePlusClick}
                    className="inline-flex items-center gap-2 rounded bg-emerald-500 px-3 py-2 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(16,185,129,0.35)] transition hover:bg-emerald-600"
                  >
                    <Plus className="h-4 w-4" />
                    Add More
                  </button>
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={uploading}
                    className={`inline-flex items-center gap-2 rounded px-3 py-2 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.35)] transition ${
                      uploading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    <Upload className="h-4 w-4" />
                    {uploading ? "Uploading..." : "Upload Assets"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
