"use client";

import { complianceRequirements } from "@/data/compliance";
import { propertyById } from "@/data/properties";
import { useLanguage } from "@/lib/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { CheckCircle2, Circle, AlertTriangle, ShieldQuestion } from "lucide-react";
import type { ComplianceRequirement } from "@/types/domain";

const CATEGORY_LABEL: Record<ComplianceRequirement["category"], { nl: string; fr: string }> = {
  legal: { nl: "Juridisch", fr: "Juridique" },
  tax: { nl: "Fiscaal", fr: "Fiscal" },
  regulatory: { nl: "Regelgeving", fr: "Réglementaire" },
  aml_kyc: { nl: "AML/KYC", fr: "AML/KYC" },
  ubo: { nl: "UBO", fr: "UBO" },
  notarial: { nl: "Notarieel", fr: "Notarial" },
  accounting: { nl: "Boekhouding", fr: "Comptabilité" },
  sharia: { nl: "Sharia", fr: "Charia" },
};

const STATUS_ICON = {
  complete: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
  in_progress: <Circle className="h-4 w-4 text-ink-600/40" />,
  attention_required: <AlertTriangle className="h-4 w-4 text-amber-600" />,
  not_applicable: <Circle className="h-4 w-4 text-ink-600/20" />,
};

const REGULATORY_ITEMS: { nl: string; fr: string }[] = [
  { nl: "FSMA-beoordeling", fr: "Évaluation FSMA" },
  { nl: "AIF/AICB-classificatie", fr: "Classification AIF/AICB" },
  { nl: "Regels voor openbaar aanbod", fr: "Règles relatives à l'offre publique" },
  { nl: "AML/KYC-verplichtingen", fr: "Obligations AML/KYC" },
  { nl: "Consumentenbescherming", fr: "Protection des consommateurs" },
  { nl: "Vastgoedregelgeving", fr: "Réglementation immobilière" },
];

export default function CompliancePage() {
  const { locale, pick, dict } = useLanguage();
  const categories = Object.keys(CATEGORY_LABEL) as ComplianceRequirement["category"][];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink-950">{dict.nav.compliance}</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-600/70">
          {locale === "nl"
            ? "Een familieplatform zijn maakt deze structuur niet automatisch vrijgesteld van Belgische financiële regelgeving. Elk punt hieronder moet nog formeel bevestigd worden."
            : "Le fait d'être une plateforme familiale n'exempte pas automatiquement cette structure de la réglementation financière belge. Chaque point ci-dessous doit encore être confirmé formellement."}
        </p>
      </div>

      <DisclaimerBanner />

      <Card className="border-gold-500/30 bg-gold-200/10 p-5">
        <div className="mb-3 flex items-center gap-2">
          <ShieldQuestion className="h-4 w-4 text-gold-600" />
          <p className="text-sm font-semibold text-ink-900">
            {locale === "nl" ? "Regelgevende beoordeling (nog te bevestigen)" : "Évaluation réglementaire (à confirmer)"}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {REGULATORY_ITEMS.map((item) => (
            <div key={item.nl} className="flex items-center justify-between rounded-lg bg-white/70 px-3 py-2 text-xs">
              <span className="text-ink-800">{item[locale]}</span>
              <Badge variant="warning">{locale === "nl" ? "Juridische beoordeling vereist" : "Évaluation juridique requise"}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {categories.map((cat) => {
          const items = complianceRequirements.filter((c) => c.category === cat);
          if (items.length === 0) return null;
          return (
            <Card key={cat}>
              <CardHeader>
                <CardTitle>{CATEGORY_LABEL[cat][locale]}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col divide-y divide-ink-900/6 pt-0">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 py-3 first:pt-0">
                    {STATUS_ICON[item.status]}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ink-900">{pick(item.label)}</p>
                      {item.propertyId && (
                        <p className="text-xs text-ink-600/60">{propertyById(item.propertyId)?.name[locale]}</p>
                      )}
                      {item.detail && <p className="mt-0.5 text-xs text-ink-600/70">{pick(item.detail)}</p>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
