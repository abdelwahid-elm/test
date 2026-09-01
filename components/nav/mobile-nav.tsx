"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobileNavItems } from "./nav-items";
import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const { dict } = useLanguage();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex items-stretch justify-around border-t border-ink-900/8 bg-white/95 backdrop-blur lg:hidden">
      {mobileNavItems.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.split("/").slice(0, 2).join("/"));
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
              active ? "text-emerald-700" : "text-ink-600/60"
            )}
          >
            <Icon className="h-5 w-5" />
            {dict.nav[item.key]}
          </Link>
        );
      })}
    </nav>
  );
}
