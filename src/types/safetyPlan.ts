// src/types/safetyPlan.ts

export type SafeContact = {
  name: string;
  phone?: string;
  email?: string;
};

export type SafetyPlan = {
  id: string;
  uid: string;
  triggers: string[];
  coping_strategies: string[];
  safe_contacts: SafeContact[];
  reason_to_live?: string;
};

export type SafetyPlanCreate = {
  triggers: string[];
  coping_strategies: string[];
  safe_contacts: SafeContact[];
  reason_to_live?: string;
};
