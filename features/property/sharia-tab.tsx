"use client";

import type { Property } from "@/types/domain";
import { useLanguage } from "@/lib/i18n/context";
import { buildShariaStructure } from "@/data/sharia";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewStatusBadge } from "@/components/disclaimer-banner";
import { DisclaimerBanner } from "@/components/disclaimer-banner";

export function ShariaTab({ property }: { property: Property }) {
  const { locale, pick } = useLanguage();
  const structure = buildShariaStructure(property.id, property.shariaReviewStatus);

  const rows: [string, string][] = [
    [locale === "nl" ? "Aankoopstructuur" : "Structure d'acquisition", pick(structure.acquisitionStructure)],
    [locale === "nl" ? "Verdeling eigendom" : "Répartition de la propriété", pick(structure.ownershipDistribution)],
    [locale === "nl" ? "Bewoningsregeling" : "Arrangement d'occupation", pick(structure.occupancyArrangement)],
    [locale === "nl" ? "Methodologie gebruiksvergoeding" : "Méthodologie de l'indemnité d'usage", pick(structure.usageFeeMethodology)],
    [locale === "nl" ? "Methodologie bijkoop" : "Méthodologie de rachat", pick(structure.buyoutMethodology)],
    [locale === "nl" ? "Verdeling risico" : "Répartition du risque", pick(structure.riskAllocation)],
    [locale === "nl" ? "Verdeling kosten" : "Répartition des frais", pick(structure.expenseAllocation)],
    [locale === "nl" ? "Exit-mechanisme" : "Mécanisme de sortie", pick(structure.exitMechanism)],
  ];

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>{locale === "nl" ? "Sharia-structuur" : "Structure charia"}</CardTitle>
          <ReviewStatusBadge status="requires_professional_validation" />
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-5 pt-0 md:grid-cols-2">
          {rows.map(([label, text]) => (
            <div key={label}>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-600/60">{label}</p>
              <p className="mt-1 text-sm text-ink-800">{text}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <ReviewWorkflow status={property.shariaReviewStatus} />

      <DisclaimerBanner variant="sharia" />
    </div>
  );
}

const STEPS = ["draft", "internal_review", "scholar_review", "approved"] as const;
const STEP_LABEL: Record<(typeof STEPS)[number], { nl: string; fr: string }> = {
  draft: { nl: "Ontwerp", fr: "Brouillon" },
  internal_review: { nl: "Interne toetsing", fr: "Révision interne" },
  scholar_review: { nl: "Toetsing door geleerde", fr: "Révision par un savant" },
  approved: { nl: "Goedgekeurd", fr: "Approuvé" },
};

function ReviewWorkflow({ status }: { status: Property["shariaReviewStatus"] }) {
  const { locale } = useLanguage();
  const currentIndex = STEPS.indexOf(status as (typeof STEPS)[number]);
  const needsRevision = status === "needs_revision";

  return (
    <Card className="p-5">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-ink-600/60">
        {locale === "nl" ? "Toetsingsproces" : "Processus de validation"}
      </p>
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {STEPS.map((step, i) => {
          const active = i <= currentIndex && !needsRevision;
          return (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex h-8 min-w-max items-center gap-2 rounded-full px-3 text-xs font-medium ${
                  active ? "bg-emerald-600 text-white" : "bg-ink-900/6 text-ink-600/60"
                }`}
              >
                {i + 1}. {STEP_LABEL[step][locale]}
              </div>
              {i < STEPS.length - 1 && <div className="h-px w-6 bg-ink-900/10" />}
            </div>
          );
        })}
      </div>
      {needsRevision && (
        <p className="mt-3 text-xs font-medium text-amber-700">
          {locale === "nl" ? "Status: herziening vereist — terug naar interne toetsing." : "Statut : révision requise — retour à la révision interne."}
        </p>
      )}
    </Card>
  );
}
