"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, MapPin } from "lucide-react";
import { opportunities } from "@/data/opportunities";
import { useLanguage } from "@/lib/i18n/context";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { formatEUR, formatPercent } from "@/lib/utils";
import type { Opportunity } from "@/types/domain";

export default function OpportunitiesPage() {
  const { locale } = useLanguage();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink-950">
          {locale === "nl" ? "Investeringskansen" : "Opportunités d'investissement"}
        </h1>
        <p className="mt-1 text-sm text-ink-600/70">
          {locale === "nl"
            ? "Nieuwe woningen waarvoor de familie nog kapitaal zoekt."
            : "Nouveaux logements pour lesquels la famille recherche encore du capital."}
        </p>
      </div>

      <DisclaimerBanner />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {opportunities.map((o) => (
          <OpportunityCard key={o.id} opportunity={o} />
        ))}
      </div>
    </div>
  );
}

function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const { locale, pick } = useLanguage();
  const [expressed, setExpressed] = useState(false);
  const progress = (opportunity.committed / opportunity.capitalRequired) * 100;

  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative h-40 w-full bg-ink-900/10">
        <Image src={opportunity.property.imageUrl} alt={pick(opportunity.property.name)} fill className="object-cover" sizes="33vw" />
        <Badge variant="outline" className="absolute left-3 top-3 bg-white/85">
          {opportunity.property.energyLabel}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="font-serif text-lg text-ink-950">{pick(opportunity.property.name)}</p>
          <p className="flex items-center gap-1 text-xs text-ink-600/70">
            <MapPin className="h-3 w-3" /> {opportunity.property.city}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <Fact label={locale === "nl" ? "Aankoopprijs" : "Prix d'achat"} value={formatEUR(opportunity.property.purchasePrice)} />
          <Fact label={locale === "nl" ? "Bijdrage bewoner" : "Apport occupant"} value={formatEUR(opportunity.residentContribution)} />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-ink-600/70">
              {formatEUR(opportunity.committed)} {locale === "nl" ? "van" : "sur"} {formatEUR(opportunity.capitalRequired)}
            </span>
            <span className="font-semibold text-emerald-700">{formatPercent(progress)}</span>
          </div>
          <Progress value={progress} />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-auto">
              {locale === "nl" ? "Bekijk details" : "Voir les détails"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="font-serif text-xl text-ink-950">{pick(opportunity.property.name)}</DialogTitle>
            <p className="mt-1 text-xs text-ink-600/70">{opportunity.property.city}</p>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <p className="text-ink-700">{pick(opportunity.proposedStructure)}</p>
              <p className="text-ink-700">{pick(opportunity.proposedOccupancy)}</p>
              <div className="grid grid-cols-2 gap-3 rounded-xl bg-ink-900/[0.03] p-3 text-xs">
                <Fact label={locale === "nl" ? "Vereist kapitaal" : "Capital requis"} value={formatEUR(opportunity.capitalRequired)} />
                <Fact label={locale === "nl" ? "Reeds toegezegd" : "Déjà engagé"} value={formatEUR(opportunity.committed)} />
                <Fact label={locale === "nl" ? "Risicoscore" : "Score de risque"} value={`${opportunity.property.riskScore}/5`} />
                <Fact label={locale === "nl" ? "Streefdatum" : "Date cible"} value={opportunity.closingDate} />
              </div>
            </div>

            {!expressed ? (
              <Button variant="emerald" className="mt-5 w-full" onClick={() => setExpressed(true)}>
                {locale === "nl" ? "Interesse tonen om te investeren" : "Manifester son intérêt à investir"}
              </Button>
            ) : (
              <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
                <CheckCircle2 className="h-4 w-4" />
                {locale === "nl"
                  ? "Je interesse is genoteerd. De familie-administrator neemt contact op."
                  : "Votre intérêt a été enregistré. L'administrateur familial vous contactera."}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-ink-600/50">{label}</p>
      <p className="font-medium text-ink-900">{value}</p>
    </div>
  );
}
