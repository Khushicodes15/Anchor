// src/types/settings.ts

export interface ProfileSettings {
  name: string;
  phone: string;
  email: string;
}

export interface PreferencesSettings {
  language: string;
  dark_mode: boolean;
  notifications_enabled: boolean;
}

export interface SecuritySettings {
  logout_all_devices: boolean;
}

/**
 * Canonical settings shape
 * Used across:
 * - useSettings hook
 * - settingsApi
 * - UI components
 */
export interface SettingsData {
  profile: ProfileSettings;
  preferences: PreferencesSettings;
  security: SecuritySettings;
}

/**
 * Backend GET /settings response
 */
export type SettingsResponse = SettingsData;

/**
 * Backend POST /settings payload
 */
export type SettingsPayload = SettingsData;