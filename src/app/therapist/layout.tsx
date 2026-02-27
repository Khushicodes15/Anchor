"use client";

import { ReactNode } from "react";
import AppNavbar from "@/components/navigation/AppNavbar";

type Props = {
  children: ReactNode;
};

export default function TherapistLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <AppNavbar />

      {/* Page Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}