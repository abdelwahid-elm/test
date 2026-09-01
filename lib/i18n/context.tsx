"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { dictionaries } from "./dictionaries";
import type { Locale, LocalText } from "@/types/domain";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  dict: (typeof dictionaries)["nl"];
  pick: (text: LocalText) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("nl");

  const value = useMemo<LanguageContextValue>(() => {
    const dict = dictionaries[locale];
    return {
      locale,
      setLocale,
      dict,
      pick: (text: LocalText) => text[locale],
    };
  }, [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
