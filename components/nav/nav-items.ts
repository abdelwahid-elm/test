import {
  LayoutGrid,
  Building2,
  Sparkles,
  Users,
  BookOpen,
  Vote,
  ShieldCheck,
  Landmark,
  LineChart,
} from "lucide-react";

export const navItems = [
  { href: "/", key: "home" as const, icon: LayoutGrid },
  { href: "/portfolio", key: "portfolio" as const, icon: Building2 },
  { href: "/opportunities", key: "opportunities" as const, icon: Sparkles },
  { href: "/family", key: "family" as const, icon: Users },
  { href: "/ledger", key: "ledger" as const, icon: BookOpen },
  { href: "/governance", key: "governance" as const, icon: Vote },
  { href: "/compliance", key: "compliance" as const, icon: ShieldCheck },
  { href: "/sharia", key: "sharia" as const, icon: Landmark },
  { href: "/structure-lab", key: "structureLab" as const, icon: Landmark },
  { href: "/simulator", key: "simulator" as const, icon: LineChart },
];

export const mobileNavItems = [
  { href: "/", key: "home" as const, icon: LayoutGrid },
  { href: "/portfolio", key: "portfolio" as const, icon: Building2 },
  { href: "/opportunities", key: "opportunities" as const, icon: Sparkles },
  { href: "/ledger", key: "ledger" as const, icon: BookOpen },
  { href: "/family/p-youssef", key: "family" as const, icon: Users },
];
