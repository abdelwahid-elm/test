"use client";

import Link from "next/link";
import { properties } from "@/data/properties";
import { useLanguage } from "@/lib/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { CheckCircle } from "lucide-react";

const PRINCIPLES: { nl: string; fr: string }[] = [
  { nl: "Geen riba (rente)", fr: "Pas de riba (intérêt)" },
  { nl: "Geen verkapte rentedragende lening", fr: "Pas de prêt portant intérêt déguisé" },
  { nl: "Identificeerbaar onderliggend echt actief", fr: "Actif réel sous-jacent identifiable" },
  { nl: "Echte eigendom / economische participatie", fr: "Véritable propriété / participation économique" },
  { nl: "Transparante contracten", fr: "Contrats transparents" },
  { nl: "Transparante risicoverdeling", fr: "Répartition transparente des risques" },
  { nl: "Duidelijke eigendomspercentages", fr: "Pourcentages de propriété clairs" },
  { nl: "Winst gekoppeld aan legitieme eigendom/activiteit", fr: "Profit lié à une propriété/activité légitime" },
  { nl: "Passende risicodeling in eigendom", fr: "Partage approprié du risque de propriété" },
  { nl: "Aparte contracten waar vereist", fr: "Contrats séparés lorsque requis" },
  { nl: "Geen automatisch gegarandeerd investeerdersrendement", fr: "Pas de rendement investisseur automatiquement garanti" },
];

const STATUS_BADGE: Record<string, "emerald" | "gold" | "warning" | "neutral"> = {
  approved: "emerald",
  scholar_review: "gold",
  internal_review: "warning",
  needs_revision: "warning",
  draft: "neutral",
};

const STATUS_LABEL: Record<string, { nl: string; fr: string }> = {
  approved: { nl: "Goedgekeurd (voorlopig)", fr: "Approuvé (provisoire)" },
  scholar_review: { nl: "Bij geleerde in toetsing", fr: "En révision par un savant" },
  internal_review: { nl: "Interne toetsing", fr: "Révision interne" },
  needs_revision: { nl: "Herziening vereist", fr: "Révision requise" },
  draft: { nl: "Ontwerp", fr: "Brouillon" },
};

export default function ShariaGovernancePage() {
  const { locale, dict } = useLanguage();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink-950">{dict.nav.sharia}</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-600/70">
          {locale === "nl"
            ? "Het platform is ontworpen rond onderstaande principes. Dit is geen fatwa en geen garantie — elke woning doorloopt een eigen toetsingsproces."
            : "La plateforme est conçue autour des principes ci-dessous. Ceci n'est ni une fatwa ni une garantie — chaque bien suit son propre processus de validation."}
        </p>
      </div>

      <DisclaimerBanner variant="sharia" />

      <Card>
        <CardHeader>
          <CardTitle>{locale === "nl" ? "Kernprincipes" : "Principes fondamentaux"}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 pt-0 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.nl} className="flex items-start gap-2 text-sm text-ink-800">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              {p[locale]}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{locale === "nl" ? "Toetsingsstatus per woning" : "Statut de validation par bien"}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col divide-y divide-ink-900/6 pt-0">
          {properties.map((p) => (
            <Link
              key={p.id}
              href={`/portfolio/${p.id}?tab=sharia`}
              className="flex items-center justify-between py-3 text-sm hover:text-emerald-700"
            >
              <span className="font-medium text-ink-900">{p.name[locale]}</span>
              <Badge variant={STATUS_BADGE[p.shariaReviewStatus] ?? "neutral"}>
                {STATUS_LABEL[p.shariaReviewStatus]?.[locale] ?? p.shariaReviewStatus}
              </Badge>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
