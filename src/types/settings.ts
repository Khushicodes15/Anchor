// src/types/settings.ts

export interface SettingsSectionConfig {
  id: string;
  title: string;
  description?: string;
}

export interface ProfileInfo {
  name: string | null;
  email: string | null;
  phone: string | null;
  provider: string | null;
}

export type LanguageCode = "en";

export interface AppMetadata {
  name: string;
  version: string;
}
