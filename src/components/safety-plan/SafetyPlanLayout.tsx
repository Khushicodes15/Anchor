"use client";

import { ReactNode } from "react";
import { crisisTheme } from "@/styles/Theme";
import AppNavbar from "@/components/navigation/AppNavbar";

type SafetyPlanLayoutProps = {
  children: ReactNode;
};

export default function SafetyPlanLayout({
  children,
}: SafetyPlanLayoutProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `
          radial-gradient(
            1000px 500px at 50% -250px,
            ${crisisTheme.colors.primarySoft} 0%,
            transparent 65%
          ),
          linear-gradient(
            180deg,
            #fffdf7 0%,
            ${crisisTheme.colors.background} 100%
          )
        `,
      }}
    >
      <AppNavbar />

      <main
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 16,
          paddingBottom: 24,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 680,
            padding: "0 20px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* Header */}
          <header>
            <h1
              style={{
                margin: 0,
                fontSize: "2.5rem",
                fontWeight: 540,
                lineHeight: 1.2,
                color: crisisTheme.colors.textPrimary,
              }}
            >
              Your Safety Plan
            </h1>

            <p
              style={{
                marginTop: 4,
                marginBottom: 0,
                fontSize: "0.95rem",
                color: crisisTheme.colors.textSecondary,
                maxWidth: 520,
              }}
            >
              Something you prepare for yourself, so it’s there when you need it.
            </p>
          </header>

          {/* Card */}
          <section
            style={{
              background: crisisTheme.colors.surface,
              borderRadius: crisisTheme.radius.lg,
              padding: 24,
              boxShadow: "0 24px 48px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {children}
          </section>
        </div>
      </main>
    </div>
  );
}
