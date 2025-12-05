"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function LineChart() {
  const labels = ["Objek", "Objek", "Objek", "Objek", "Objek", "Objek"];

  const data = {
    labels,
    datasets: [
      {
        label: "Growth",
        data: [25, 30, 28, 35, 45, 55],
        fill: true,
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
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
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Chart</h3>
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
