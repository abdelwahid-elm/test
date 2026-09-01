"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { participantById } from "@/data/participants";
import { propertyById } from "@/data/properties";
import { participantKpis } from "@/lib/domain/participant-kpis";
import { ledgerForParticipant } from "@/data/ledger";
import { useLanguage } from "@/lib/i18n/context";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KpiCard } from "@/components/kpi-card";
import { LedgerTable } from "@/components/ledger-table";
import { Glossary } from "@/components/glossary";
import { formatEUR, formatPercent } from "@/lib/utils";

const CURRENT_USER_ID = "p-youssef"; // demo "logged in" family administrator

export default function ParticipantPage() {
  const params = useParams<{ id: string }>();
  const participant = participantById(params.id);
  const { locale } = useLanguage();
  if (!participant) return notFound();

  const kpis = participantKpis(participant.id);
  const currentUser = participantById(CURRENT_USER_ID);
  const canSeeFull =
    participant.privacy === "family" ||
    participant.id === CURRENT_USER_ID ||
    currentUser?.role.includes("family_admin") ||
    currentUser?.role.includes("finance_admin");

  const entries = ledgerForParticipant(participant.id).sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

  return (
    <div className="flex flex-col gap-6">
      <Link href="/family" className="flex w-fit items-center gap-1.5 text-sm text-ink-600/70 hover:text-ink-950">
        <ArrowLeft className="h-4 w-4" />
        {locale === "nl" ? "Terug naar familieleden" : "Retour aux membres"}
      </Link>

      <div className="flex items-center gap-4">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold text-white"
          style={{ backgroundColor: participant.color }}
        >
          {participant.initials}
        </span>
        <div>
          <h1 className="font-serif text-2xl text-ink-950">{participant.name}</h1>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {participant.role.map((r) => (
              <Badge key={r} variant="outline">
                {r.replaceAll("_", " ")}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {!canSeeFull && (
        <Card className="flex items-center gap-2 border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          <Lock className="h-4 w-4" />
          {locale === "nl"
            ? "Deze financiële gegevens zijn enkel zichtbaar voor familiebeheerders."
            : "Ces données financières sont réservées aux administrateurs familiaux."}
        </Card>
      )}

      {canSeeFull && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <KpiCard label={locale === "nl" ? "Beschikbaar kapitaal" : "Capital disponible"} value={formatEUR(participant.availableCapital)} />
            <KpiCard label={locale === "nl" ? "Ingezet kapitaal" : "Capital investi"} value={formatEUR(kpis.capitalDeployed)} />
            <KpiCard label={locale === "nl" ? "Portefeuillewaarde" : "Valeur du portefeuille"} value={formatEUR(kpis.portfolioValue)} />
            <KpiCard
              label={locale === "nl" ? "Maandelijkse cashflow" : "Trésorerie mensuelle"}
              value={formatEUR(kpis.monthlyCashflow)}
              sub={kpis.monthlyCashflow < 0 ? (locale === "nl" ? "netto uitgaand" : "net sortant") : locale === "nl" ? "netto inkomend" : "net entrant"}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <KpiCard label={<span className="flex items-center gap-1">{locale === "nl" ? "Gerealiseerd" : "Réalisé"} <Glossary term="realisedResult" /></span>} value={formatEUR(kpis.realisedResults)} />
            <KpiCard label={<span className="flex items-center gap-1">{locale === "nl" ? "Niet-gerealiseerd" : "Non réalisé"} <Glossary term="unrealisedResult" /></span>} value={formatEUR(kpis.unrealisedResults)} />
            <KpiCard label={locale === "nl" ? "Stemgewicht" : "Poids de vote"} value={`${participant.votingWeight}`} />
          </div>

          <Card className="p-5">
            <p className="mb-4 text-sm font-semibold text-ink-900">
              {locale === "nl" ? "Blootstelling per woning" : "Exposition par bien"}
            </p>
            <div className="flex flex-col gap-3">
              {kpis.exposures.map((e) => {
                const prop = propertyById(e.propertyId);
                return (
                  <div key={e.propertyId} className="flex items-center justify-between rounded-lg border border-ink-900/8 p-3 text-sm">
                    <div>
                      <Link href={`/portfolio/${e.propertyId}`} className="font-medium text-ink-950 hover:underline">
                        {prop?.name[locale]}
                      </Link>
                      <p className="text-xs text-ink-600/60">
                        {e.role === "resident" ? (locale === "nl" ? "Bewoner" : "Occupant") : locale === "nl" ? "Investeerder" : "Investisseur"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-ink-950">{formatPercent(e.percentage)}</p>
                      <p className="text-xs text-ink-600/60">{formatEUR(e.value)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <div>
            <p className="mb-3 text-sm font-semibold text-ink-900">{locale === "nl" ? "Recente transacties" : "Transactions récentes"}</p>
            <LedgerTable entries={entries.slice(0, 12)} />
          </div>
        </>
      )}
    </div>
  );
}
