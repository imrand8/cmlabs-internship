// src/components/SecondaryNav.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUI } from "@/context/UIContext";

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const NavItem = ({ href, label, icon }: NavItemProps) => {
  const pathname = usePathname();
  const currentPath = pathname?.toLowerCase();
  const targetHref = href.toLowerCase();

  // Logika: Setiap item hanya aktif ketika path exact match
  // "Projects" aktif hanya di /Dashboard/organizational/create (exact match)
  // Item lain hanya aktif di path exact mereka
  const isActive = currentPath === targetHref;

  return (
    <Link
      href={href}
      className={`
        flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium
        transition-all duration-300
        ${
          isActive
            ? "bg-white/20 dark:bg-slate-700/60 text-white"
            : "text-slate-100 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-slate-700/40 hover:text-white"
        }
      `}
    >
      <span className="flex items-center justify-center flex-shrink-0 w-6 h-6">
        {icon}
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </Link>
  );
};

export default function SecondaryNav() {
  const { isDark, collapsed } = useUI();
  const pathname = usePathname();

  // Tampilkan logo ketika di path organizational/create dan sub-path-nya
  const shouldShowLogo = pathname
    ?.toLowerCase()
    .startsWith("/dashboard/organizational/create");

  return (
    <div
      className={`
        // Perbaikan: Hapus 'hidden md:flex' karena selalu ditampilkan. FIXED dengan left dinamis.
        md:flex md:flex-col w-64 fixed z-30 transition-all duration-300
        ${
          isDark
            ? "bg-slate-800 text-slate-100 border-slate-700"
            : "bg-gradient-to-b from-blue-500 to-blue-600 text-white border-blue-800/20"
        }
        border-t border-slate-200/50 dark:border-white/10
        // Hapus border-r untuk menghindari gap dengan header
      `}
      style={{
        left: collapsed ? "80px" : "256px", // 20 = 80px (w-20), 64 = 256px (w-64)
        top: "0", // Mulai dari top karena header tidak menutupi SecondaryNav
        height: "100vh", // Full height karena tidak perlu offset header
        width: "256px", // Pastikan width tepat 256px (w-64)
        boxSizing: "border-box", // Pastikan border tidak menambah lebar
        // Pastikan tidak ada gap dengan header - hapus semua spacing dan border
        marginRight: "0",
        paddingRight: "0",
        borderRight: "none", // Pastikan tidak ada border kanan yang menyebabkan gap
        boxShadow: isDark
          ? "2px 0 8px rgba(0, 0, 0, 0.2), 4px 0 12px rgba(0, 0, 0, 0.15)"
          : "2px 0 8px rgba(0, 0, 0, 0.08), 4px 0 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Logo Section - Tampilkan ketika di path organizational/create */}
      {shouldShowLogo && (
        <div className="flex-shrink-0 p-6">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/15 flex items-center justify-center flex-shrink-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
              <Image
                src="/logo-cms.png"
                alt="CMS Logo"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-3xl font-medium tracking-tight text-white">
              CMS
            </h1>
          </div>
        </div>
      )}

      {/* Navigation - scrollable content */}
      <nav
        className="flex-1 p-4 space-y-2 overflow-y-auto"
        style={{ paddingTop: shouldShowLogo ? "0" : "80px" }}
      >
        <NavItem
          href="/Dashboard/organizational/create"
          label="Projects"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          }
        />
        <NavItem
          href="/Dashboard/organizational/create/collaborator"
          label="Collaborator"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 8.048M12 4.354L8.646 7.708M12 4.354l3.354 3.354M9 9H4.5M9 9v4.5M9 9l-4.5 4.5M15 9h4.5m0 0v4.5m0-4.5l4.5 4.5M9 20h6m-6 0a2 2 0 110-4m6 4a2 2 0 100-4"
              />
            </svg>
          }
        />
        <NavItem
          href="/Dashboard/organizational/create/setting"
          label="Setting"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
        />
      </nav>
    </div>
  );
}
