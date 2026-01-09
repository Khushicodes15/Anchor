"use client";

import { ReactNode } from "react";
import AppNavbar from "@/components/navigation/AppNavbar";
import { crisisTheme } from "@/styles/Theme";


type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: crisisTheme.colors.background }}
    >
      {/* Top Navbar */}
      <AppNavbar />

      {/* Page Content */}
      <main className="flex-1 px-4 sm:px-6 md:px-10 py-6">
        {children}
      </main>
    </div>
  );
}
