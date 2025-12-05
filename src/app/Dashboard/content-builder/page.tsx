"use client";

import { useUI } from "@/context/UIContext";
import ContentBuilderSidebar from "@/components/ContentBuilderSidebar";

export default function ContentBuilderPage() {
  const { isDark } = useUI();

  return (
    <div
      className={`min-h-screen w-full ${
        isDark ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-900"
      }`}
    >
      <ContentBuilderSidebar />

      <main className="ml-72 min-h-screen px-10 md:px-16 py-12">
        <div className="w-full max-w-5xl bg-[#2563EB] text-white rounded-2xl px-8 md:px-10 py-8 md:py-10 shadow-2xl">
          <h1 className="text-3xl font-bold mb-2">Content Builder</h1>
          <p className="text-lg font-semibold mb-6">Build your first layout.</p>

          <p className="text-sm mb-4 leading-relaxed max-w-3xl">
            The Content Builder allows you to visually create and structure your page using
            flexible and customizable components. It supports various content types to suit
            your project needs.
          </p>

          <ul className="space-y-3 text-sm leading-relaxed">
            <li>
              <span className="font-bold">Single Page</span> – Layout terhubung hanya ke
              satu konten, cocok untuk halaman seperti &quot;Home&quot; atau
              &quot;Profile&quot;.
            </li>
            <li>
              <span className="font-bold">Multiple Page</span> – Untuk koleksi dinamis
              seperti blog post atau listing produk, satu layout bisa dipakai banyak entri.
            </li>
            <li>
              <span className="font-bold">Component</span> – Komponen visual reusable
              seperti section teks atau gambar yang bisa disusun bebas di layout.
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
