"use client";

import { ShieldAlert } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function DisclaimerBanner({ variant = "global", className }: { variant?: "global" | "sharia" | "risk"; className?: string }) {
  const { dict } = useLanguage();
  const text =
    variant === "sharia"
      ? dict.disclaimer.shariaFooter
      : variant === "risk"
      ? dict.disclaimer.riskWarning
      : dict.disclaimer.global;

  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-xl border border-gold-500/25 bg-gold-200/20 px-4 py-3 text-xs leading-relaxed text-ink-700",
        className
      )}
    >
      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
      <p>{text}</p>
    </div>
  );
}

const STATUS_LABEL_KEY: Record<string, "proposedStructure" | "pendingLegal" | "pendingTax" | "pendingSharia" | "requiresValidation"> = {
  draft: "proposedStructure",
  pending_legal_review: "pendingLegal",
  pending_tax_review: "pendingTax",
  pending_sharia_review: "pendingSharia",
  requires_professional_validation: "requiresValidation",
};

export function ReviewStatusBadge({ status }: { status: string }) {
  const { dict } = useLanguage();
  const key = STATUS_LABEL_KEY[status];
  const label = key ? dict.disclaimer[key] : status.replaceAll("_", " ");
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700">
      {label}
    </span>
  );
}
