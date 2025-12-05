"use client";

import { useEffect } from "react";
import { useUI } from "@/context/UIContext";
import StatsCard from "@/components/statscard";
import DoughnutChart from "@/components/charts/doughnutchart";
import BarChart from "@/components/charts/barcharts";
import LineChart from "@/components/charts/linechart";

export default function DashboardPage() {
  const { collapsed } = useUI();

  // Paksa komponen responsive re-measure setelah sidebar animasi
  useEffect(() => {
    const t = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 320); // selaraskan dengan duration-300 pada sidebar
    return () => clearTimeout(t);
  }, [collapsed]);

  return (
    <div className="w-full p-8 space-y-6 min-w-0">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full min-w-0">
        <StatsCard
          title="Total Personal Project"
          value="42"
          gradient="from-sky-400 via-blue-500 to-indigo-500"
        />
        <StatsCard
          title="Total Organizational Project"
          value="18"
          gradient="from-indigo-500 via-purple-500 to-purple-600"
        />
        <StatsCard
          title="Total Organizational Project"
          value="63"
          gradient="from-purple-500 via-purple-600 to-purple-700"
        />
        <StatsCard
          title="Total Organization"
          value="12"
          gradient="from-rose-500 via-red-500 to-red-600"
        />
      </div>

      {/* Charts Row 1 - Doughnut & Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full min-w-0">
        <div className="w-full min-w-0 overflow-hidden">
          <DoughnutChart />
        </div>
        <div className="w-full min-w-0 overflow-hidden">
          <BarChart />
        </div>
      </div>

      {/* Charts Row 2 - Line */}
      <div className="w-full min-w-0 overflow-hidden">
        <LineChart />
      </div>
    </div>
  );
}
