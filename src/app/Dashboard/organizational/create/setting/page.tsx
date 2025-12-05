"use client";

import { useState } from "react";
import Image from "next/image";
import { useUI } from "@/context/UIContext";

export default function SettingPage() {
  const { isDark } = useUI();
  const [formData, setFormData] = useState({
    organizationId: "12345",
    organizationName: "CMS",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved:", formData);
  };

  const handleDelete = () => {
    console.log("Organization deleted");
  };

  return (
    <div className={`${isDark ? "bg-slate-900" : "bg-[#F4F5FA]"} min-h-screen`}>
      <div className="mx-auto max-w-[1300px] px-6 py-6 space-y-6">
        
        {/* Header: Judul + Filter (kiri) */}
        <div>
          <h1 className={`text-3xl font-bold mb-4 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
            Setting
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

        {/* Information Section */}
        <div className={`rounded-xl overflow-hidden shadow-sm border ${isDark ? "bg-slate-800/60 border-slate-700" : "bg-white border-slate-200"}`}>
          <div className={`${isDark ? "bg-slate-700 text-slate-100" : "bg-[#3B82F6] text-white"} px-6 py-4`}>
            <h2 className="text-lg font-semibold">Information</h2>
          </div>

          <div className={`p-6 space-y-4 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Organization ID */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  Organization ID
                </label>
                <input
                  type="text"
                  value={formData.organizationId}
                  disabled
                  className={`w-full px-4 py-2 rounded-lg border cursor-not-allowed
                    ${isDark ? "bg-slate-700/50 border-slate-600 text-slate-100" : "bg-slate-100 border-slate-300 text-slate-900"}`}
                />
              </div>

              {/* Organization Name */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={`block text-sm font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    Organization Name
                  </label>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className={`text-sm font-medium hover:underline ${isDark ? "text-blue-400" : "text-blue-600"}`}
                    >
                      Change Name
                    </button>
                  )}
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${isDark ? "bg-slate-700 border-slate-600 text-slate-100" : "bg-white border-slate-300 text-slate-900"}`}
                    autoFocus
                  />
                ) : (
                  <input
                    type="text"
                    value={formData.organizationName}
                    disabled
                    className={`w-full px-4 py-2 rounded-lg border cursor-not-allowed
                      ${isDark ? "bg-slate-700/50 border-slate-600 text-slate-100" : "bg-slate-100 border-slate-300 text-slate-900"}`}
                  />
                )}
              </div>
            </div>

            {/* Save / Cancel Buttons */}
            {isEditing && (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className={`px-6 py-2 font-medium rounded-lg transition-colors
                    ${isDark ? "bg-slate-600 hover:bg-slate-500 text-slate-100" : "bg-slate-300 hover:bg-slate-400 text-slate-900"}`}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Danger Zone Section */}
        <div className={`rounded-xl overflow-hidden shadow-sm border ${isDark ? "bg-slate-800/60 border-slate-700" : "bg-white border-slate-200"}`}>
          <div className={`${isDark ? "bg-red-900/60 text-red-100" : "bg-red-600 text-white"} px-6 py-4`}>
            <h2 className="text-lg font-semibold">Danger Zone</h2>
          </div>

          <div className={`p-6 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
            <div
              className={`rounded-lg p-4 flex items-center justify-between border
                ${isDark ? "border-red-900/50 bg-red-900/10" : "border-red-200 bg-red-50"}`}
            >
              <div>
                <h3 className="font-semibold mb-1">Delete Organization</h3>
                <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  If you delete this organization, it will be permanently deleted and you cannot recover it.
                </p>
              </div>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className={`p-3 rounded-lg transition-colors flex-shrink-0 ml-4
                  ${isDark ? "hover:bg-red-900/30" : "hover:bg-red-50"}`}
                title="Delete Organization"
                aria-label="Delete Organization"
              >
                <Image src="/trash.png" alt="Delete" width={24} height={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div
              className={`rounded-lg shadow-lg p-6 max-w-md w-full
                ${isDark ? "bg-slate-800" : "bg-white"}`}
            >
              <h3 className={`text-lg font-bold mb-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                Delete Organization
              </h3>
              <p className={`mb-6 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Are you sure you want to delete this organization? This action cannot be undone.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className={`px-4 py-2 font-medium rounded-lg transition-colors
                    ${isDark ? "bg-slate-600 hover:bg-slate-500 text-slate-100" : "bg-slate-300 hover:bg-slate-400 text-slate-900"}`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDelete();
                    setShowDeleteConfirm(false);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
