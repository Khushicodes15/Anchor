"use client";

import AppNavbar from "@/components/navigation/AppNavbar";
import SettingsLayout from "@/components/settings/SettingsLayout";

import ProfileSection from "@/components/settings/ProfileSection";
import PreferencesSection from "@/components/settings/PreferencesSection";
import NotificationsSection from "@/components/settings/NotificationsSection";
import SecuritySection from "@/components/settings/SecuritySection";
import AboutSection from "@/components/settings/AboutSection";
import LogoutSection from "@/components/settings/LogoutSection";

import Loading from "@/app/crisis/loading";
import Button from "@/components/ui/Button";

import { useAuth } from "@/hooks/useAuth";
import { useSettings } from "@/hooks/useSettings";
import { useRouter } from "next/navigation";
import { crisisTheme } from "@/styles/Theme";

export default function SettingsPage() {
  const { loading: authLoading, isAuthenticated } = useAuth();
  const { settings, status } = useSettings();
  const router = useRouter();

  if (authLoading || status === "loading") {
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
        {!isAuthenticated && (
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
              You need to be signed in to manage your account settings.
            </p>

            <Button onClick={() => router.push("/signup")}>
              Sign In
            </Button>
          </div>
        )}

        {isAuthenticated && settings && (
          <>
            <ProfileSection profile={settings.profile} />
            <PreferencesSection preferences={settings.preferences} />
            <NotificationsSection />
            <SecuritySection />
            <AboutSection />
            <LogoutSection />
          </>
        )}
      </SettingsLayout>
    </>
  );
}

