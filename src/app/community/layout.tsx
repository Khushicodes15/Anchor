import { ReactNode } from "react";
import AppNavbar from "@/components/navigation/AppNavbar";
import { crisisTheme } from "@/styles/Theme";
import { headingFont, bodyFont } from "@/styles/fonts";

export default function CommunityLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: crisisTheme.colors.background }}
    >
      {/* SOFT AMBIENT WARMTH */}
      <div
        className="pointer-events-none absolute top-[-25%] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,226,122,0.25), transparent 65%)",
        }}
      />

      {/* PAPER GRAIN TEXTURE */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "url('/textures/paper-grain.png')",
          backgroundRepeat: "repeat",
        }}
      />

      {/* STREET LIGHT DECOR — FIXED TO VIEWPORT */}
      <img
        src="/streetlight.png"
        alt=""
        className="
          pointer-events-none
          fixed
          left-[-100px]
          bottom-0
          h-[95vh]
          max-h-[720px]
          opacity-80
          hidden sm:block
        "
        style={{ zIndex: 1 }}
      />

      {/* NAVBAR WRAPPER */}
      <div
        style={{
          background: crisisTheme.colors.surface,
          borderBottom: `1px solid ${crisisTheme.colors.border}`,
          position: "relative",
          zIndex: 10,
        }}
      >
        <AppNavbar />
      </div>

      <main className="flex-1 flex justify-center px-6 py-16 relative z-10">
        <div className="w-full max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
