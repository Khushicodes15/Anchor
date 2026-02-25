"use client";

import { useRouter } from "next/navigation";
import AppNavbar from "@/components/navigation/AppNavbar";
import { crisisTheme } from "@/styles/Theme";
import Button from "@/components/ui/Button";

export default function CrisisSignInPage() {
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
            maxWidth: 420,
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
              fontSize: "1.5rem",
              color: crisisTheme.colors.textPrimary,
            }}
          >
            Sign in to use Crisis Mode
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: "0.95rem",
              color: crisisTheme.colors.textSecondary,
            }}
          >
            Crisis Mode uses your safety plan to offer personalized support.
            Signing in helps keep this information private and secure.
          </p>

          <Button
            variant="primary"
            onClick={() => router.push("/signup")}
          >
            Sign in
          </Button>

          <Button
            variant="secondary"
            onClick={() => router.push("/")}
          >
            Go back
          </Button>
        </div>
      </main>
    </div>
  );
}
