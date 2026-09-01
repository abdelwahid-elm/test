"use client";

import { LanguageProvider } from "@/lib/i18n/context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Shell } from "@/components/shell";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <TooltipProvider>
        <Shell>{children}</Shell>
      </TooltipProvider>
    </LanguageProvider>
  );
}
