"use client";

import { useRouter } from "next/navigation";
import AppNavbar from "@/components/navigation/AppNavbar";
import { crisisTheme } from "@/styles/Theme";
import Button from "@/components/ui/Button";

export default function NoSafetyPlanPage() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: crisisTheme.colors.background,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppNavbar />

      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <div
          style={{
            maxWidth: 520,
            background: crisisTheme.colors.surface,
            borderRadius: crisisTheme.radius.lg,
            padding: 32,
            boxShadow: "0 24px 48px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "1.4rem",
              color: crisisTheme.colors.textPrimary,
            }}
          >
            You don’t have a safety plan yet
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: "0.95rem",
              color: crisisTheme.colors.textSecondary,
            }}
          >
            Crisis Mode works best when you’ve created a safety plan ahead of
            time. It only takes a few minutes, and you can update it anytime.
          </p>

          <Button
            variant="primary"
            onClick={() => router.push("/safety-plan")}
          >
            Create a safety plan
          </Button>

          <Button
            variant="secondary"
            onClick={() => router.push("/dashboard")}
          >
            Go to dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}
