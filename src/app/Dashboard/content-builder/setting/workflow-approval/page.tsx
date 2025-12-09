"use client";

import { useState, useEffect } from "react";
import { useUI } from "@/context/UIContext";
import { useSidebar } from "@/context/SidebarContext";
import ContentBuilderSidebar from "@/components/ContentBuilderSidebar";
import ApiSidebar from "@/components/ApiSidebar";

interface WorkflowStage {
  id: number;
  stageName: string;
  roleAllowed: string;
  highlightColor: string;
}

export default function WorkflowApprovalPage() {
  const { isDark } = useUI();
  const { isCollapsed, setHasSecondaryBar } = useSidebar();

  // Set hasSecondaryBar to true when component mounts to hide logo in ContentBuilderSidebar
  useEffect(() => {
    setHasSecondaryBar(true);
    return () => setHasSecondaryBar(false);
  }, [setHasSecondaryBar]);

  const [formData, setFormData] = useState({
    workflowName: "Publishing Article",
    relatedTo: "Content Management",
    keyApprovalStage: "Any Stage",
  });

  const [stages, setStages] = useState<WorkflowStage[]>([
    {
      id: 1,
      stageName: "To Do",
      roleAllowed: "Super Admin, Editor, SEO Manager",
      highlightColor: "Soft Pink",
    },
    {
      id: 2,
      stageName: "Ready to review",
      roleAllowed: "Super Admin, Editor, SEO Manager",
      highlightColor: "Peach Orange",
    },
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStageChange = (
    stageId: number,
    field: keyof WorkflowStage,
    value: string
  ) => {
    setStages((prev) =>
      prev.map((stage) =>
        stage.id === stageId ? { ...stage, [field]: value } : stage
      )
    );
  };

  const handleAddStage = () => {
    const newStage: WorkflowStage = {
      id: stages.length + 1,
      stageName: "",
      roleAllowed: "",
      highlightColor: "",
    };
    setStages([...stages, newStage]);
  };

  const handleRemoveStage = (stageId: number) => {
    setStages((prev) => prev.filter((stage) => stage.id !== stageId));
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
      <ApiSidebar />

      <main
        className="min-h-screen px-8 py-8 transition-all duration-300 ease-in-out"
        style={{ marginLeft: `${totalLeftMargin}px` }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Header with Title and Save Button */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1
                className={`text-3xl font-bold mb-2 ${
                  isDark ? "text-slate-100" : "text-slate-900"
                }`}
              >
                Create a New Workflow Approval
              </h1>
              <p
                className={`text-sm ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Optimize your content review process management
              </p>
            </div>
            <button
              type="button"
              className="px-6 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
            >
              Save
            </button>
          </div>

          {/* Workflow Details Section */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Workflow Name */}
            <div>
              <label
                className={`block text-sm font-semibold mb-2 px-3 py-1.5 rounded bg-blue-500 text-white inline-block ${
                  isDark ? "bg-blue-600" : "bg-blue-500"
                }`}
              >
                Workflow Name*
              </label>
              <input
                type="text"
                name="workflowName"
                value={formData.workflowName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-slate-700 text-slate-100 border-slate-600 placeholder:text-slate-400"
                    : "bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                }`}
              />
            </div>

            {/* Related to */}
            <div>
              <label
                className={`block text-sm font-semibold mb-2 px-3 py-1.5 rounded bg-blue-500 text-white inline-block ${
                  isDark ? "bg-blue-600" : "bg-blue-500"
                }`}
              >
                Related to
              </label>
              <div className="relative">
                <select
                  name="relatedTo"
                  value={formData.relatedTo}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${
                    isDark
                      ? "bg-slate-700 text-slate-100 border-slate-600"
                      : "bg-white text-slate-900 border-slate-300"
                  }`}
                >
                  <option value="Content Management">Content Management</option>
                  <option value="Article">Article</option>
                  <option value="Page">Page</option>
                </select>
                <div
                  className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Key Approval Stage Section */}
          <div className="mb-6">
            <label
              className={`block text-sm font-semibold mb-2 px-3 py-1.5 rounded bg-blue-500 text-white inline-block ${
                isDark ? "bg-blue-600" : "bg-blue-500"
              }`}
            >
              Key Approval Stage*
            </label>
            <div className="relative">
              <select
                name="keyApprovalStage"
                value={formData.keyApprovalStage}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${
                  isDark
                    ? "bg-slate-700 text-slate-100 border-slate-600"
                    : "bg-white text-slate-900 border-slate-300"
                }`}
              >
                <option value="Any Stage">Any Stage</option>
                <option value="To Do">To Do</option>
                <option value="Ready to review">Ready to review</option>
              </select>
              <div
                className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <p
              className={`mt-2 text-xs ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Publication of entries is restricted until they are at the correct
              stage.
            </p>
          </div>

          {/* Workflow Stages */}
          <div className="space-y-6">
            {stages.map((stage, idx) => (
              <div
                key={stage.id}
                className={`rounded-lg shadow-lg overflow-hidden ${
                  isDark
                    ? "bg-slate-800 border border-slate-700"
                    : "bg-white border border-slate-200"
                }`}
              >
                {/* Stage Header */}
                <div
                  className={`px-4 py-3 ${
                    isDark ? "bg-teal-600" : "bg-teal-500"
                  } text-white font-semibold`}
                >
                  {stage.stageName || `Stage ${idx + 1}`}
                </div>

                {/* Stage Content */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4">
                    {/* Stage Name */}
                    <div>
                      <label
                        className={`block text-xs font-medium mb-2 ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        Stage Name
                      </label>
                      <input
                        type="text"
                        value={stage.stageName}
                        onChange={(e) =>
                          handleStageChange(
                            stage.id,
                            "stageName",
                            e.target.value
                          )
                        }
                        className={`w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDark
                            ? "bg-slate-700 text-slate-100 border-slate-600 placeholder:text-slate-400"
                            : "bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                        }`}
                        placeholder="Enter stage name"
                      />
                    </div>

                    {/* Role Allowed */}
                    <div>
                      <label
                        className={`block text-xs font-medium mb-2 ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        Role Allowed to edit this page
                      </label>
                      <input
                        type="text"
                        value={stage.roleAllowed}
                        onChange={(e) =>
                          handleStageChange(
                            stage.id,
                            "roleAllowed",
                            e.target.value
                          )
                        }
                        className={`w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDark
                            ? "bg-slate-700 text-slate-100 border-slate-600 placeholder:text-slate-400"
                            : "bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                        }`}
                        placeholder="Enter roles"
                      />
                    </div>

                    {/* Highlight Color */}
                    <div>
                      <label
                        className={`block text-xs font-medium mb-2 ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        Highlight Color
                      </label>
                      <input
                        type="text"
                        value={stage.highlightColor}
                        onChange={(e) =>
                          handleStageChange(
                            stage.id,
                            "highlightColor",
                            e.target.value
                          )
                        }
                        className={`w-full px-4 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDark
                            ? "bg-slate-700 text-slate-100 border-slate-600 placeholder:text-slate-400"
                            : "bg-white text-slate-900 border-slate-300 placeholder:text-slate-400"
                        }`}
                        placeholder="Enter color"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Stage Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleAddStage}
              className="px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              + Add New Stage
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

