"use client";

import AppNavbar from "@/components/navigation/AppNavbar";
import SettingsLayout from "@/components/settings/SettingsLayout";

import ProfileSection from "@/components/settings/ProfileSection";
import LanguageSection from "@/components/settings/LanguageSection";
import NotificationsSection from "@/components/settings/NotificationsSection";
import SecuritySection from "@/components/settings/SecuritySection";
import AboutSection from "@/components/settings/AboutSection";
import LogoutSection from "@/components/settings/LogoutSection";
import Loading from "@/app/crisis/loading"; 
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { crisisTheme } from "@/styles/Theme";

export default function SettingsPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  // While auth state is resolving, let loading.tsx handle UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <AppNavbar />

      <SettingsLayout>
        {/* If NOT signed in */}
        {/* {!isAuthenticated && (
          <div
            className="rounded-3xl p-8 text-center"
            style={{
              background: crisisTheme.colors.surface,
              border: `1px solid ${crisisTheme.colors.border}`,
            }}
          >
            <h2
              className="text-2xl font-semibold mb-2"
              style={{ color: crisisTheme.colors.textPrimary }}
            >
              Sign in to access settings
            </h2>

            <p
              className="text-sm mb-6"
              style={{ color: crisisTheme.colors.textSecondary }}
            >
              You need to be signed in to view and manage your account settings.
            </p>

            <Button size="md" onClick={() => router.push("/login")}>
              Sign In
            </Button>
          </div>
        )} */}

        {/* If signed in */}
        {/* {isAuthenticated && (
          <>
            <ProfileSection />
            <LanguageSection />
            <NotificationsSection />
            <SecuritySection />
            <AboutSection />
            <LogoutSection />
          </>
        )} */}

        {/* DEV ONLY delete after fully working backend*/}
        {true && (
        <>
            <ProfileSection />
            <NotificationsSection />
            <LanguageSection />
            <SecuritySection />
            <AboutSection />
            <LogoutSection />
        </>
        )}

      </SettingsLayout>
    </>
  );
}
