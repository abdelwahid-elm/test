"use client";

import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/lib/i18n/context";

type GlossaryKey =
  | "economicOwnership"
  | "legalOwnership"
  | "usageFee"
  | "buyout"
  | "capitalContribution"
  | "diminishingMusharakah"
  | "valuationMethod"
  | "realisedResult"
  | "unrealisedResult"
  | "riskScore"
  | "liquidityReserve"
  | "ubo";

export function Glossary({ term }: { term: GlossaryKey }) {
  const { dict } = useLanguage();
  const entry = dict.glossary[term];
  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={entry.term}
          className="inline-flex h-4 w-4 items-center justify-center rounded-full text-ink-600/50 hover:text-emerald-600 align-middle"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="mb-1 font-semibold text-cream-50">{entry.term}</p>
        <p>{entry.explain}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function GlossaryLabel({ term, label }: { term: GlossaryKey; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {label}
      <Glossary term={term} />
    </span>
  );
}
