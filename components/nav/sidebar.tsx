"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./nav-items";
import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const { dict } = useLanguage();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-ink-900/8 bg-ink-950 px-4 py-6 text-cream-100 lg:flex">
      <div className="mb-8 flex items-center gap-2.5 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 font-serif text-sm font-semibold text-cream-50">
          DC
        </div>
        <div>
          <p className="font-serif text-base leading-tight">{dict.brand}</p>
          <p className="text-[10px] uppercase tracking-wider text-cream-100/40">{dict.brandTag}</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5">
        {navItems.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active ? "bg-cream-50/10 text-cream-50" : "text-cream-100/60 hover:bg-cream-50/5 hover:text-cream-50"
              )}
            >
              <Icon className="h-4 w-4" />
              {dict.nav[item.key]}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-[11px] leading-relaxed text-emerald-100/80">
        {dict.disclaimer.global}
      </div>
    </aside>
  );
}
