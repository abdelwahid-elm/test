"use client";

import type { Property } from "@/types/domain";
import { useLanguage } from "@/lib/i18n/context";
import { participantById } from "@/data/participants";
import { legalEntities } from "@/data/entities";
import { Card } from "@/components/ui/card";
import { OwnershipBar } from "@/components/ownership-bar";
import { Glossary } from "@/components/glossary";
import { VALUATION_METHOD_LABEL } from "@/lib/domain/valuation-labels";
import { formatEUR } from "@/lib/utils";

const STRUCTURE_LABEL: Record<Property["structureModel"], { nl: string; fr: string }> = {
  A: { nl: "Model A — rechtstreekse mede-eigendom", fr: "Modèle A — copropriété directe" },
  B: { nl: "Model B — aparte vastgoedvennootschap (SPV)", fr: "Modèle B — société immobilière dédiée (SPV)" },
  C: { nl: "Model C — centraal familievehikel", fr: "Modèle C — véhicule familial central" },
  D: { nl: "Model D — coöperatief model", fr: "Modèle D — modèle coopératif" },
  E: { nl: "Model E — aangepaste structuur", fr: "Modèle E — structure personnalisée" },
};

export function OverviewTab({ property }: { property: Property }) {
  const { locale, pick } = useLanguage();
  const resident = participantById(property.residentId);
  const gain = property.currentValuation - property.purchasePrice;
  const legalOwner = property.legalOwnership[0]?.participantId.startsWith("entity-")
    ? pick(legalEntities[property.legalOwnership[0].participantId])
    : participantById(property.legalOwnership[0]?.participantId ?? "")?.name;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <Card className="p-5 lg:col-span-2">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-600/60">
          {locale === "nl" ? "Huidige waardering" : "Valeur actuelle"}
        </p>
        <div className="mt-1 flex flex-wrap items-baseline gap-3">
          <p className="font-serif text-3xl text-ink-950">{formatEUR(property.currentValuation)}</p>
          <p className={gain >= 0 ? "text-sm font-medium text-emerald-700" : "text-sm font-medium text-red-600"}>
            {gain >= 0 ? "+" : ""}
            {formatEUR(gain)} {locale === "nl" ? "t.o.v. aankoop" : "vs achat"}
          </p>
        </div>
        <p className="mt-1 text-xs text-ink-600/60">
          {locale === "nl" ? "Aankoopprijs" : "Prix d'achat"}: {formatEUR(property.purchasePrice)} ·{" "}
          {locale === "nl" ? "Geschatte huur" : "Loyer estimé"}: {formatEUR(property.monthlyRent)}/
          {locale === "nl" ? "maand" : "mois"}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink-900/8 pt-5 sm:grid-cols-3">
          <Fact label={locale === "nl" ? "Energielabel" : "Label énergétique"} value={property.energyLabel} />
          <Fact label={locale === "nl" ? "Risicoscore" : "Score de risque"} value={`${property.riskScore}/5`} glossary="riskScore" />
          <Fact
            label={locale === "nl" ? "Waarderingsmethode" : "Méthode d'évaluation"}
            value={VALUATION_METHOD_LABEL[property.valuationMethod][locale]}
            glossary="valuationMethod"
          />
          <Fact label={locale === "nl" ? "Structuur" : "Structure"} value={pick(STRUCTURE_LABEL[property.structureModel])} />
          <Fact
            label={locale === "nl" ? "Juridisch eigenaar" : "Propriétaire juridique"}
            value={String(legalOwner)}
            glossary="legalOwnership"
          />
          <Fact
            label={locale === "nl" ? "Bewoner" : "Occupant"}
            value={resident?.name ?? "—"}
          />
        </div>
      </Card>

      <Card className="p-5">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ink-600/60">
          <Glossary term="economicOwnership" /> {locale === "nl" ? "Economisch eigendom" : "Propriété économique"}
        </p>
        <OwnershipBar entries={property.economicOwnership} currentValuation={property.currentValuation} />
      </Card>
    </div>
  );
}

function Fact({ label, value, glossary }: { label: string; value: string; glossary?: Parameters<typeof Glossary>[0]["term"] }) {
  return (
    <div>
      <p className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-ink-600/60">
        {label}
        {glossary && <Glossary term={glossary} />}
      </p>
      <p className="mt-1 text-sm font-medium capitalize text-ink-900">{value}</p>
    </div>
  );
}
