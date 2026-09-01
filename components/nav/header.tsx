"use client";

import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  return (
    <div className="flex items-center rounded-full border border-ink-900/10 bg-white p-0.5 text-xs font-medium shadow-card">
      {(["nl", "fr"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={cn(
            "rounded-full px-3 py-1.5 transition-colors",
            locale === l ? "bg-ink-950 text-cream-50" : "text-ink-600 hover:text-ink-950"
          )}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function TopHeader() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-end gap-3 border-b border-ink-900/6 bg-cream-100/80 px-4 py-3 backdrop-blur lg:px-8">
      <LanguageSwitcher />
    </header>
  );
}
