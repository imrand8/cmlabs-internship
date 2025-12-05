"use client";

import { useEffect, useState } from "react";
import { useUI } from "@/context/UIContext";

export default function ClientDarkWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDark } = useUI();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply/remove dark class ke html element
  useEffect(() => {
    if (!mounted) return;
    
    const htmlElement = document.documentElement;
    
    if (isDark) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [isDark, mounted]);

  return <>{children}</>;
}
