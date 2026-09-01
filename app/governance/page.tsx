"use client";

import { useState } from "react";
import { governanceProposals as initialProposals, governanceRules } from "@/data/governance";
import { participants } from "@/data/participants";
import { useLanguage } from "@/lib/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { formatDate, formatEUR } from "@/lib/utils";
import type { GovernanceProposal, Vote } from "@/types/domain";
import { CheckCircle2 } from "lucide-react";

const CURRENT_USER_ID = "p-youssef";

export default function GovernancePage() {
  const { locale, dict } = useLanguage();
  const [proposals, setProposals] = useState<GovernanceProposal[]>(initialProposals);

  function castVote(proposalId: string, choice: Vote["choice"]) {
    setProposals((prev) =>
      prev.map((p) => {
        if (p.id !== proposalId) return p;
        const me = participants.find((m) => m.id === CURRENT_USER_ID)!;
        const withoutMe = p.votes.filter((v) => v.participantId !== CURRENT_USER_ID);
        return { ...p, votes: [...withoutMe, { participantId: CURRENT_USER_ID, choice, weight: me.votingWeight, castAt: new Date().toISOString() }] };
      })
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink-950">{dict.nav.governance}</h1>
        <p className="mt-1 text-sm text-ink-600/70">
          {locale === "nl"
            ? "Belangrijke familiebeslissingen worden gestemd, niet informeel beslist."
            : "Les décisions familiales importantes sont votées, pas décidées de manière informelle."}
        </p>
      </div>

      <DisclaimerBanner />

      <Card className="p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-600/60">
          {locale === "nl" ? "Governance-regels" : "Règles de gouvernance"}
        </p>
        <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-3 lg:grid-cols-6">
          <RuleFact label={locale === "nl" ? "Min. bewonersbijdrage" : "Apport occupant min."} value={`${governanceRules.minResidentContributionPercent}%`} />
          <RuleFact label={locale === "nl" ? "Max. per woning" : "Max. par bien"} value={`${governanceRules.maxExposurePerPropertyPercent}%`} />
          <RuleFact label={locale === "nl" ? "Max. per lid" : "Max. par membre"} value={`${governanceRules.maxExposurePerParticipantPercent}%`} />
          <RuleFact label={locale === "nl" ? "Min. liquiditeit" : "Liquidité min."} value={`${governanceRules.minLiquidityReservePercent}%`} />
          <RuleFact label={locale === "nl" ? "Max. concentratie" : "Concentration max."} value={`${governanceRules.maxGeographicConcentrationPercent}%`} />
          <RuleFact label={locale === "nl" ? "Goedkeuringsdrempel" : "Seuil d'approbation"} value={`${governanceRules.approvalThresholdPercent}%`} />
        </div>
      </Card>

      <div className="flex flex-col gap-5">
        {proposals.map((p) => {
          const totalWeight = p.eligibleVoterIds.reduce((s, id) => s + (participants.find((m) => m.id === id)?.votingWeight ?? 0), 0);
          const forWeight = p.votes.filter((v) => v.choice === "for").reduce((s, v) => s + v.weight, 0);
          const againstWeight = p.votes.filter((v) => v.choice === "against").reduce((s, v) => s + v.weight, 0);
          const abstainWeight = p.votes.filter((v) => v.choice === "abstain").reduce((s, v) => s + v.weight, 0);
          const myVote = p.votes.find((v) => v.participantId === CURRENT_USER_ID);
          const forPct = (forWeight / totalWeight) * 100;
          const againstPct = (againstWeight / totalWeight) * 100;
          const abstainPct = (abstainWeight / totalWeight) * 100;

          return (
            <Card key={p.id}>
              <CardHeader className="flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-ink-950">{p.title[locale]}</CardTitle>
                  <p className="mt-1 max-w-2xl text-sm text-ink-600/80">{p.memo[locale]}</p>
                </div>
                <Badge variant={p.status === "open" ? "gold" : p.status === "passed" ? "emerald" : "neutral"}>
                  {p.status === "open"
                    ? locale === "nl" ? "Open" : "Ouvert"
                    : p.status === "passed"
                    ? locale === "nl" ? "Aangenomen" : "Adopté"
                    : locale === "nl" ? "Verworpen" : "Rejeté"}
                </Badge>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 pt-0">
                <div className="flex flex-wrap gap-4 text-xs text-ink-600/70">
                  {p.requiredCapital > 0 && (
                    <span>
                      {locale === "nl" ? "Vereist kapitaal" : "Capital requis"}: <strong className="text-ink-900">{formatEUR(p.requiredCapital)}</strong>
                    </span>
                  )}
                  <span>
                    {locale === "nl" ? "Stemdeadline" : "Date limite"}: <strong className="text-ink-900">{formatDate(p.votingDeadline, locale)}</strong>
                  </span>
                  <span>
                    {locale === "nl" ? "Stemgerechtigden" : "Votants éligibles"}: <strong className="text-ink-900">{p.eligibleVoterIds.length}</strong>
                  </span>
                </div>

                <div className="h-2.5 w-full overflow-hidden rounded-full bg-ink-900/8">
                  <div className="flex h-full">
                    <div className="h-full bg-emerald-600" style={{ width: `${forPct}%` }} />
                    <div className="h-full bg-red-400" style={{ width: `${againstPct}%` }} />
                    <div className="h-full bg-ink-900/20" style={{ width: `${abstainPct}%` }} />
                  </div>
                </div>
                <div className="flex gap-4 text-xs text-ink-600/70">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-600" /> {locale === "nl" ? "Voor" : "Pour"} {forWeight}</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-400" /> {locale === "nl" ? "Tegen" : "Contre"} {againstWeight}</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-ink-900/20" /> {locale === "nl" ? "Onthouding" : "Abstention"} {abstainWeight}</span>
                </div>

                {p.status === "open" && (
                  <div className="flex items-center gap-2 border-t border-ink-900/8 pt-4">
                    {myVote ? (
                      <span className="flex items-center gap-1.5 text-sm text-emerald-700">
                        <CheckCircle2 className="h-4 w-4" />
                        {locale === "nl" ? "Jouw stem" : "Votre vote"}: {myVote.choice}
                      </span>
                    ) : (
                      <>
                        <Button size="sm" variant="emerald" onClick={() => castVote(p.id, "for")}>
                          {locale === "nl" ? "Voor" : "Pour"}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => castVote(p.id, "against")}>
                          {locale === "nl" ? "Tegen" : "Contre"}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => castVote(p.id, "abstain")}>
                          {locale === "nl" ? "Onthouden" : "S'abstenir"}
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function RuleFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-ink-600/60">{label}</p>
      <p className="font-medium text-ink-900">{value}</p>
    </div>
  );
}
