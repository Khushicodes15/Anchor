// src/app/wrapped/layout.tsx
import { ReactNode } from "react";

export default function WrappedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      {children}
    </div>
  );
}
