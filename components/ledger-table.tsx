"use client";

import type { LedgerEntry } from "@/types/domain";
import { TRANSACTION_TYPE_LABEL } from "@/data/ledger";
import { participantById } from "@/data/participants";
import { propertyById } from "@/data/properties";
import { useLanguage } from "@/lib/i18n/context";
import { formatDate, formatEUR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ReviewStatusBadge } from "@/components/disclaimer-banner";

export function LedgerTable({ entries, showProperty = true }: { entries: LedgerEntry[]; showProperty?: boolean }) {
  const { locale, dict } = useLanguage();

  return (
    <div className="overflow-x-auto rounded-xl2 border border-ink-900/8 bg-white shadow-card">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink-900/8 text-[11px] uppercase tracking-wide text-ink-600/60">
            <th className="px-4 py-3 font-medium">{dict.common.date}</th>
            <th className="px-4 py-3 font-medium">{locale === "nl" ? "Type" : "Type"}</th>
            {showProperty && <th className="px-4 py-3 font-medium">{dict.common.property}</th>}
            <th className="px-4 py-3 font-medium">{dict.common.participant}</th>
            <th className="px-4 py-3 font-medium text-right">{dict.common.amount}</th>
            <th className="px-4 py-3 font-medium">{dict.common.status}</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => {
            const participant = participantById(e.participantId);
            const property = propertyById(e.propertyId);
            return (
              <tr key={e.id} className="border-b border-ink-900/5 last:border-0 hover:bg-ink-900/[0.02]">
                <td className="whitespace-nowrap px-4 py-3 text-ink-600/80">{formatDate(e.timestamp, locale)}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Badge variant="neutral">{TRANSACTION_TYPE_LABEL[e.type][locale]}</Badge>
                </td>
                {showProperty && (
                  <td className="whitespace-nowrap px-4 py-3 text-ink-700">
                    {property ? property.name[locale] : e.propertyId}
                  </td>
                )}
                <td className="whitespace-nowrap px-4 py-3 text-ink-700">{participant?.name ?? e.participantId}</td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-ink-950">
                  {formatEUR(e.amount)}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {e.legalReviewStatus === "approved" ? (
                    <Badge variant="emerald">{locale === "nl" ? "Goedgekeurd" : "Approuvé"}</Badge>
                  ) : (
                    <ReviewStatusBadge status={e.legalReviewStatus} />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
