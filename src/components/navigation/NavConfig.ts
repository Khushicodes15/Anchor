import {
  LayoutGrid,
  BookOpen,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  HeartHandshake,
} from "lucide-react";

export type NavItemConfig = {
  label: string;
  href: string;
  icon: any;
  section: "main" | "utility";
};

export const navConfig: NavItemConfig[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutGrid,
    section: "main",
  },
  {
    label: "Narrative Journal",
    href: "/journal",
    icon: BookOpen,
    section: "main",
  },
  {
    label: "Safety Plan Builder",
    href: "/safety-plan",
    icon: ShieldCheck,
    section: "main",
  },
  {
    label: "Crisis Mode",
    href: "/crisis",
    icon: AlertCircle,
    section: "main",
  },
  {
    label: "Anchor Wrapped",
    href: "/wrapped",
    icon: Sparkles,
    section: "main",
  },
  {
    label: "Community Library",
    href: "/community",
    icon: Users,
    section: "main",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    section: "main",
  },
    {
    label: "Therapist Support",
    href: "/therapist",
    icon: HeartHandshake,
    section: "main",
    },
  // utility
  {
    label: "Help",
    href: "/help",
    icon: HelpCircle,
    section: "utility",
  },
  {
    label: "Log out",
    href: "/signup",
    icon: LogOut,
    section: "utility",
  },
];
