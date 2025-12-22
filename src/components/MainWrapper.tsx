"use client";

import { usePathname } from "next/navigation";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <main className={`flex-1 ${isHomePage ? "pt-0 pb-0" : "pt-10 pb-16"}`}>
      {children}
    </main>
  );
}

