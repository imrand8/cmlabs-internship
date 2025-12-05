"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
  const data = {
    labels: ["Collaborator 45%", "Visitor 55%"],
    datasets: [
      {
        data: [45, 55],
        backgroundColor: ["#10B981", "#5B21B6"],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 13,
            family: "Inter",
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Chart</h3>
      <div className="h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
