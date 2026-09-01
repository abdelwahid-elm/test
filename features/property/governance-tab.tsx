"use client";

import Link from "next/link";
import type { Property } from "@/types/domain";
import { useLanguage } from "@/lib/i18n/context";
import { governanceProposals } from "@/data/governance";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export function GovernanceTab({ property }: { property: Property }) {
  const { locale, pick } = useLanguage();
  const related = governanceProposals.filter((g) => pick(g.title).toLowerCase().includes(property.city.toLowerCase()));

  return (
    <div className="flex flex-col gap-4">
      {related.length === 0 && (
        <Card className="p-5 text-sm text-ink-600/70">
          {locale === "nl"
            ? "Geen actieve familie-beslissingen specifiek voor deze woning."
            : "Aucune décision familiale active spécifique à ce bien."}
        </Card>
      )}
      {related.map((g) => (
        <Card key={g.id} className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-serif text-lg text-ink-950">{pick(g.title)}</p>
              <p className="mt-1 text-sm text-ink-600/70">{pick(g.memo)}</p>
            </div>
            <Badge variant={g.status === "open" ? "gold" : g.status === "passed" ? "emerald" : "neutral"}>
              {g.status}
            </Badge>
          </div>
          <p className="mt-3 text-xs text-ink-600/60">
            {locale === "nl" ? "Stemdeadline" : "Date limite de vote"}: {formatDate(g.votingDeadline, locale)}
          </p>
        </Card>
      ))}
      <Link href="/governance" className="text-sm font-medium text-emerald-700 hover:underline">
        {locale === "nl" ? "Bekijk alle familie-beslissingen →" : "Voir toutes les décisions familiales →"}
      </Link>
    </div>
  );
}
