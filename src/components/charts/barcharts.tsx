"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart() {
  const labels = ["Objek", "Objek", "Objek", "Objek", "Objek", "Objek", "Objek"];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [75, 58, 45, 70, 25, 82, 60],
        backgroundColor: "#10B981",
        borderRadius: 8,
        barThickness: 20,
      },
      {
        label: "Dataset 2",
        data: [50, 65, 72, 88, 48, 65, 85],
        backgroundColor: "#5B21B6",
        borderRadius: 8,
        barThickness: 20,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "Inter",
          },
          color: "#94A3B8",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#F1F5F9",
        },
        ticks: {
          font: {
            size: 12,
            family: "Inter",
          },
          color: "#94A3B8",
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Bar chart</h3>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
