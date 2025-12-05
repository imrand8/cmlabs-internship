"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useUI } from "@/context/UIContext";

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const NavItem = ({ href, label, icon }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.includes(label.toLowerCase());

  return (
    <Link
      href={href}
      className={`
        flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium
        transition-all duration-300
        ${isActive 
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
  const pathname = usePathname();
  const { setSecondaryOpen, isDark } = useUI();

  // SecondaryNav hanya untuk halaman create organizational
  const isOrganizationalCreatePage = pathname.includes("/Dashboard/organizational/create");

  // Tandai open/close -> memicu auto-collapse main sidebar via UIContext
  useEffect(() => {
    if (!isOrganizationalCreatePage) return;
    setSecondaryOpen(true);
    return () => setSecondaryOpen(false);
  }, [isOrganizationalCreatePage, setSecondaryOpen]);

  if (!isOrganizationalCreatePage) return null;

  return (
    <div
      className={`
        hidden md:flex md:flex-col w-64 sticky top-0 h-screen transition-all duration-300
        ${isDark 
          ? "bg-slate-800 text-slate-100 border-slate-700" 
          : "bg-gradient-to-b from-blue-500 to-blue-600 text-white border-blue-800/20"
        }
        border-r
      `}
      style={{
        boxShadow: isDark 
          ? "8px 0 16px rgba(0, 0, 0, 0.4), 12px 0 24px rgba(0, 0, 0, 0.3)" 
          : "8px 0 16px rgba(0, 0, 0, 0.15), 12px 0 24px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Navigation - scrollable content */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto pt-24">
        <NavItem
          href="/Dashboard/organizational/create"
          label="Projects"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          }
        />
        <NavItem
          href="/Dashboard/organizational/create/collaborator"
          label="Collaborator"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 4.354a4 4 0 110 8.048M12 4.354L8.646 7.708M12 4.354l3.354 3.354M9 9H4.5M9 9v4.5M9 9l-4.5 4.5M15 9h4.5m0 0v4.5m0-4.5l4.5 4.5M9 20h6m-6 0a2 2 0 110-4m6 4a2 2 0 100-4" />
            </svg>
          }
        />
        <NavItem
          href="/Dashboard/organizational/create/setting"
          label="Setting"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
      </nav>
    </div>
  );
}
