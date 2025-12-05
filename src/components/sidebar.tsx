"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUI } from "@/context/UIContext";
import type { ReactNode, MouseEvent } from "react";
import { useRef, useState } from "react";

interface NavItemProps {
  href: string;
  label: string;
  icon?: ReactNode;
}

const NavItem = ({ href, label, icon }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const { collapsed } = useUI();

  // Ripple
  const itemRef = useRef<HTMLAnchorElement | null>(null);
  const [ripple, setRipple] = useState<{
    x: number;
    y: number;
    size: number;
    ts: number;
  } | null>(null);

  const handleMouseDown = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = itemRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 1.4;
    setRipple({ x, y, size, ts: Date.now() });
    setTimeout(() => setRipple(null), 520);
  };

  return (
    <Link
      ref={itemRef}
      href={href}
      onMouseDown={handleMouseDown}
      className={[
        "relative overflow-hidden",
        "group flex items-center rounded-xl transition-all duration-200",
        collapsed ? "px-2.5 py-2.5" : "px-4 py-3",
        collapsed ? "justify-center" : "gap-2",
        isActive
          ? "bg-white/30 text-white"
          : "bg-white/15 text-white hover:bg-white/25 dark:bg-white/10 dark:hover:bg-white/20",
      ].join(" ")}
    >
      {ripple && (
        <span
          key={ripple.ts}
          className="pointer-events-none absolute rounded-full bg-white/40 dark:bg-white/30 scale-0 animate-[ripple_500ms_ease-out_forwards]"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      )}

      <span
        className={[
          "flex items-center justify-center flex-shrink-0 transition-all duration-200",
          collapsed ? "w-5 h-5" : "w-[18px] h-[18px]",
        ].join(" ")}
      >
        {icon}
      </span>

      {!collapsed && (
        <span className="whitespace-nowrap text-[13px] font-medium leading-tight tracking-wide">
          {label}
        </span>
      )}
    </Link>
  );
};

export default function Sidebar() {
  const { collapsed } = useUI();

  return (
    <aside
      className={[
        "hidden md:flex md:flex-col sticky top-0 h-screen",
        "flex-shrink-0",
        // Light: gradient biru
        "bg-gradient-to-b from-blue-500 to-blue-600 text-white",
        // Dark: matikan gradient + pakai warna gelap flat
        "dark:bg-none dark:bg-slate-900 dark:text-slate-100",
        // Opsional: pemisah bayangan kanan
        "shadow-[4px_0_10px_-2px_rgba(0,0,0,0.15)] dark:shadow-[4px_0_12px_-2px_rgba(0,0,0,0.35)]",
        "border-r border-transparent dark:border-transparent",
        "transition-all duration-300 ease-in-out overflow-x-hidden overflow-y-auto",
        collapsed ? "w-20" : "w-64",
      ].join(" ")}
    >
      {/* Logo Section (tanpa tombol garis 3) */}
      <div
        className={[
          // hapus border-b supaya tak ada garis di bawah header logo
          "flex-shrink-0 transition-all duration-300",
          collapsed ? "p-4" : "p-6",
        ].join(" ")}
      >
        <div
          className={[
            "flex items-center",
            collapsed ? "flex-col gap-3" : "gap-2",
          ].join(" ")}
        >
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

          {!collapsed && (
            <h1 className="text-3xl font-medium tracking-tight">CMS</h1>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
        {/* Dashboard */}
        <NavItem
          href="/Dashboard/dash"
          label="Dashboard"
          icon={
            <Image
              src="/logo-dashboard.png"
              alt="Dashboard"
              width={20}
              height={20}
              className="w-full h-full object-contain"
            />
          }
        />

        {/* Organizational */}
        <div className="space-y-2.5">
          <div className="px-1 text-xs font-semibold tracking-wide text-white">
            {/* tampilkan label hanya saat expanded */}
          </div>
          <NavItem
            href="/Dashboard/organizational"
            label="Organizational"
            icon={
              <Image
                src="/organizational.png"
                alt="Organizational"
                width={20}
                height={20}
                className="w-full h-full object-contain"
              />
            }
          />
        </div>

        {/* Personal */}
        <div className="space-y-2.5">
          <div className="px-1 text-xs font-semibold tracking-wide text-white">
            {/* tampilkan label hanya saat expanded */}
          </div>
          <NavItem
            href="/Dashboard/personal"
            label="Personal Project"
            icon={
              <Image
                src="/personal.png"
                alt="Personal"
                width={20}
                height={20}
                className="w-full h-full object-contain"
              />
            }
          />
        </div>

        {/* Notification */}
        <NavItem
          href="/Dashboard/notification"
          label="Notification"
          icon={
            <Image
              src="/notification.png"
              alt="Notification"
              width={20}
              height={20}
              className="w-full h-full object-contain"
            />
          }
        />
      </nav>
    </aside>
  );
}
