"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUI } from "@/context/UIContext";

export default function CreatePersonalProjectPage() {
  const { isDark } = useUI();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    projectId: "12546",
    projectName: "CMS PEGADAIAN",
    lastUpload: "Status 30 Minute ago",
    statusProject: "Progress",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`${isDark ? "bg-slate-900" : "bg-[#F4F5FA]"} min-h-screen`}>
      <div className="mx-auto max-w-[1300px] px-6 py-6 space-y-6">
        {/* Header: Judul + Enter Button */}
        <div className="flex items-center justify-between">
          <h1
            className={`text-3xl font-bold ${
              isDark ? "text-slate-100" : "text-slate-900"
            }`}
          >
            {formData.projectName}
          </h1>
          <button
            type="button"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Enter Projects
          </button>
        </div>

        {/* Information Section */}
        <div
          className={`rounded-xl overflow-hidden shadow-sm border ${
            isDark
              ? "bg-slate-800/60 border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <div
            className={`${
              isDark ? "bg-slate-700 text-slate-100" : "bg-[#3B82F6] text-white"
            } px-6 py-4`}
          >
            <h2 className="text-lg font-semibold">Information</h2>
          </div>

          <div
            className={`p-6 space-y-4 ${
              isDark ? "text-slate-100" : "text-slate-900"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project ID */}
              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    isDark ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Project ID
                </label>
                <input
                  type="text"
                  value={formData.projectId}
                  disabled
                  className={`w-full px-4 py-2 rounded-lg border cursor-not-allowed
                    ${
                      isDark
                        ? "bg-slate-700/50 border-slate-600 text-slate-100"
                        : "bg-slate-100 border-slate-300 text-slate-900"
                    }`}
                />
              </div>

              {/* Project Name */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    className={`block text-sm font-semibold ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Project Name
                  </label>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className={`text-sm font-medium hover:underline ${
                        isDark ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      Change Status
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={formData.projectName}
                  disabled
                  className={`w-full px-4 py-2 rounded-lg border cursor-not-allowed
                    ${
                      isDark
                        ? "bg-slate-700/50 border-slate-600 text-slate-100"
                        : "bg-slate-100 border-slate-300 text-slate-900"
                    }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Last Upload */}
              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    isDark ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Last Upload
                </label>
                <input
                  type="text"
                  value={formData.lastUpload}
                  disabled
                  className={`w-full px-4 py-2 rounded-lg border cursor-not-allowed
                    ${
                      isDark
                        ? "bg-slate-700/50 border-slate-600 text-slate-100"
                        : "bg-slate-100 border-slate-300 text-slate-900"
                    }`}
                />
              </div>

              {/* Status Project */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    className={`block text-sm font-semibold ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Status Project
                  </label>
                  {isEditing && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className={`text-sm font-medium hover:underline ${
                          isDark ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className={`text-sm font-medium hover:underline ${
                          isDark ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                {isEditing ? (
                  <select
                    name="statusProject"
                    value={formData.statusProject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${
                        isDark
                          ? "bg-slate-700 border-slate-600 text-slate-100"
                          : "bg-white border-slate-300 text-slate-900"
                      }`}
                  >
                    <option value="Progress">Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                ) : (
                  <div className="inline-block">
                    <span className="px-3 py-1 bg-yellow-400 text-slate-900 font-semibold rounded-full text-sm">
                      {formData.statusProject}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Custom Domain Section */}
        <div
          className={`rounded-xl overflow-hidden shadow-sm border ${
            isDark
              ? "bg-slate-800/60 border-orange-900/50"
              : "bg-white border-orange-200"
          }`}
        >
          <div
            className={`${
              isDark
                ? "bg-orange-900/60 text-orange-100"
                : "bg-yellow-500 text-white"
            } px-6 py-4`}
          >
            <h2 className="text-lg font-semibold">Custom Domain</h2>
          </div>

          <div
            className={`p-6 space-y-4 ${
              isDark ? "text-slate-100" : "text-slate-900"
            }`}
          >
            <p
              className={`text-sm ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              By default, your site on CMS cmlabs can be reached through a
              subdomain based on your project name. To make it more
              personalized, add your own custom domain.
            </p>

            <div
              className={`flex items-center justify-between p-4 rounded-lg border
              ${
                isDark
                  ? "bg-slate-700/50 border-slate-600 text-slate-100"
                  : "bg-slate-50 border-slate-300 text-slate-900"
              }`}
            >
              <span className="font-semibold">cms-cmlabs.cmlabs.com</span>
              <button
                type="button"
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors"
              >
                Custom Domain
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone Section */}
        <div
          className={`rounded-xl overflow-hidden shadow-sm border ${
            isDark
              ? "bg-slate-800/60 border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <div
            className={`${
              isDark ? "bg-red-900/60 text-red-100" : "bg-red-600 text-white"
            } px-6 py-4`}
          >
            <h2 className="text-lg font-semibold">Danger Zone</h2>
          </div>

          <div
            className={`p-6 space-y-4 ${
              isDark ? "text-slate-100" : "text-slate-900"
            }`}
          >
            {/* Duplicate Projects */}
            <div
              className={`rounded-lg p-4 flex items-start justify-between border
                ${
                  isDark ? "border-red-900/50 bg-red-900/10" : "border-red-200"
                }`}
            >
              <div>
                <h3
                  className={`font-semibold mb-1 ${
                    isDark ? "text-red-400" : "text-red-600"
                  }`}
                >
                  Duplicate Projects
                </h3>
                <p
                  className={`text-sm ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  You are about to duplicate this project. A new copy will be
                  created with the same content and things.
                </p>
              </div>
              <button
                className="flex-shrink-0 ml-4 p-3 hover:opacity-80 transition-opacity"
                title="Duplicate"
                aria-label="Duplicate"
              >
                <Image
                  src="/trash.png"
                  alt="Duplicate"
                  width={24}
                  height={24}
                />
              </button>
            </div>

            {/* Duplicate to Personal */}
            <div
              className={`rounded-lg p-4 flex items-start justify-between border
                ${
                  isDark ? "border-red-900/50 bg-red-900/10" : "border-red-200"
                }`}
            >
              <div>
                <h3
                  className={`font-semibold mb-1 ${
                    isDark ? "text-red-400" : "text-red-600"
                  }`}
                >
                  Duplicate to Personal
                </h3>
                <p
                  className={`text-sm ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  You are about to transfer this project to another section. The
                  original project will remain unchanged.
                </p>
              </div>
              <button
                className="flex-shrink-0 ml-4 p-3 hover:opacity-80 transition-opacity"
                title="Duplicate to Personal"
                aria-label="Duplicate to Personal"
              >
                <Image
                  src="/trash.png"
                  alt="Duplicate"
                  width={24}
                  height={24}
                />
              </button>
            </div>

            {/* Delete Projects */}
            <div
              className={`rounded-lg p-4 flex items-start justify-between border
                ${
                  isDark ? "border-red-900/50 bg-red-900/10" : "border-red-200"
                }`}
            >
              <div>
                <h3
                  className={`font-semibold mb-1 ${
                    isDark ? "text-red-400" : "text-red-600"
                  }`}
                >
                  Delete Projects
                </h3>
                <p
                  className={`text-sm ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  If you delete this project, it will be permanently deleted and
                  you cannot recover it.
                </p>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex-shrink-0 ml-4 p-3 hover:opacity-80 transition-opacity"
                title="Delete"
                aria-label="Delete"
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
              <h3
                className={`text-lg font-bold mb-2 ${
                  isDark ? "text-slate-100" : "text-slate-900"
                }`}
              >
                Delete Project
              </h3>
              <p
                className={`mb-6 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Are you sure you want to delete this project? This action cannot
                be undone.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className={`px-4 py-2 font-medium rounded-lg transition-colors
                    ${
                      isDark
                        ? "bg-slate-600 hover:bg-slate-500 text-slate-100"
                        : "bg-slate-300 hover:bg-slate-400 text-slate-900"
                    }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
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
