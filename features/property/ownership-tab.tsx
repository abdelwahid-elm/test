"use client";

import type { Property } from "@/types/domain";
import { useLanguage } from "@/lib/i18n/context";
import { legalEntities } from "@/data/entities";
import { participantById } from "@/data/participants";
import { ledgerForProperty } from "@/data/ledger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OwnershipBar } from "@/components/ownership-bar";
import { Glossary } from "@/components/glossary";
import { formatDate, formatPercent } from "@/lib/utils";

export function OwnershipTab({ property }: { property: Property }) {
  const { locale, dict } = useLanguage();
  const isEntity = property.legalOwnership.length === 1 && property.legalOwnership[0].participantId.startsWith("entity-");
  const timeline = ledgerForProperty(property.id).filter((e) => e.type === "participation_acquisition");

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Card className="p-5">
        <p className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-ink-900">
          {dict.glossary.economicOwnership.term}
          <Glossary term="economicOwnership" />
        </p>
        <p className="mb-4 text-xs text-ink-600/70">{dict.glossary.economicOwnership.explain}</p>
        <OwnershipBar entries={property.economicOwnership} currentValuation={property.currentValuation} />
      </Card>

      <Card className="p-5">
        <p className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-ink-900">
          {dict.glossary.legalOwnership.term}
          <Glossary term="legalOwnership" />
        </p>
        <p className="mb-4 text-xs text-ink-600/70">{dict.glossary.legalOwnership.explain}</p>
        {isEntity ? (
          <div className="rounded-xl border border-gold-500/30 bg-gold-200/15 p-4 text-sm text-ink-800">
            <p className="font-medium">100% — {legalEntities[property.legalOwnership[0].participantId]?.[locale]}</p>
            <p className="mt-2 text-xs text-ink-600/70">
              {locale === "nl"
                ? "De familieleden hierboven bezitten economisch (via kapitaalrekeningen) het aangegeven percentage, ook al staat de vennootschap op papier als juridisch eigenaar."
                : "Les membres de la famille ci-dessus détiennent économiquement (via des comptes capital) le pourcentage indiqué, même si la société est le propriétaire juridique sur papier."}
            </p>
          </div>
        ) : (
          <OwnershipBar entries={property.legalOwnership} currentValuation={property.currentValuation} />
        )}
      </Card>

      <Card className="p-5 lg:col-span-2">
        <CardHeader className="p-0 pb-4">
          <CardTitle>{locale === "nl" ? "Evolutie van eigendom" : "Évolution de la propriété"}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {timeline.length === 0 ? (
            <p className="text-sm text-ink-600/70">
              {locale === "nl" ? "Nog geen bijkopen geregistreerd voor deze woning." : "Aucun rachat encore enregistré pour ce bien."}
            </p>
          ) : (
            <ol className="relative ml-2 border-l border-ink-900/10 pl-6">
              {timeline.map((t) => (
                <li key={t.id} className="mb-6 last:mb-0">
                  <span className="absolute -ml-[29px] mt-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-600" />
                  <p className="text-xs text-ink-600/60">{formatDate(t.timestamp, locale)}</p>
                  <p className="text-sm font-medium text-ink-900">
                    {participantById(t.participantId)?.name} {locale === "nl" ? "koopt bij" : "rachète"} —{" "}
                    {formatPercent(t.economicOwnershipBefore ?? 0)} → {formatPercent(t.economicOwnershipAfter ?? 0)}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
