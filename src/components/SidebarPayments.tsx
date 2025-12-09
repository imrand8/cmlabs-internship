"use client";

import Link from "next/link";
import Image from "next/image";
import { useUI } from "@/context/UIContext";

export default function SidebarPayment() {
  const { isDark } = useUI();

  return (
    <aside
      className={`
        fixed
        left-6 top-6
        h-[calc(100vh-3rem)]
        w-24
        rounded-md
        flex items-start justify-center pt-5
        z-30
        backdrop-blur-2xl
        ${isDark
          ? "bg-slate-900/70 border border-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
          : "bg-[#3479c9] border border-white/20 shadow-[0_18px_40px_rgba(15,23,42,0.25)]"
        }
      `}
    >
      <Link
        href="/Dashboard/dash"
        className={`
          inline-flex h-14 w-14 items-center justify-center rounded-md
          bg-white
          shadow-[0_12px_30px_rgba(15,23,42,0.35)]
        `}
        title="Back to Dashboard"
      >
        <Image
          src="/logo-cms.png"
          alt="CMS Logo"
          width={40}
          height={40}
          className="object-contain"
        />
      </Link>
    </aside>
  );
}
