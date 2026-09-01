"use client";

import Link from "next/link";
import { participants } from "@/data/participants";
import { participantKpis } from "@/lib/domain/participant-kpis";
import { useLanguage } from "@/lib/i18n/context";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatEUR } from "@/lib/utils";

const ROLE_LABEL: Record<string, { nl: string; fr: string }> = {
  resident: { nl: "Bewoner", fr: "Occupant" },
  investor: { nl: "Investeerder", fr: "Investisseur" },
  family_admin: { nl: "Familiebeheerder", fr: "Administrateur familial" },
  finance_admin: { nl: "Financieel beheerder", fr: "Administrateur financier" },
  legal_reviewer: { nl: "Juridisch reviewer", fr: "Réviseur juridique" },
  sharia_reviewer: { nl: "Sharia-reviewer", fr: "Réviseur charia" },
  auditor: { nl: "Auditor", fr: "Auditeur" },
};

export default function FamilyPage() {
  const { locale } = useLanguage();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink-950">{locale === "nl" ? "Familieleden" : "Membres de la famille"}</h1>
        <p className="mt-1 text-sm text-ink-600/70">
          {locale === "nl"
            ? `${participants.length} leden — sommige financiële gegevens zijn enkel zichtbaar voor beheerders.`
            : `${participants.length} membres — certaines données financières sont réservées aux administrateurs.`}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {participants.map((p) => {
          const kpis = participantKpis(p.id);
          return (
            <Link key={p.id} href={`/family/${p.id}`}>
              <Card className="flex h-full flex-col gap-3 p-5 transition-shadow hover:shadow-elevated">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-950">{p.name}</p>
                    <div className="flex flex-wrap gap-1">
                      {p.role.slice(0, 2).map((r) => (
                        <Badge key={r} variant="neutral">
                          {ROLE_LABEL[r]?.[locale] ?? r}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 border-t border-ink-900/8 pt-3 text-xs">
                  <div>
                    <p className="text-ink-600/60">{locale === "nl" ? "Portefeuillewaarde" : "Valeur du portefeuille"}</p>
                    <p className="font-medium text-ink-950">{formatEUR(kpis.portfolioValue)}</p>
                  </div>
                  <div>
                    <p className="text-ink-600/60">{locale === "nl" ? "Beschikbaar kapitaal" : "Capital disponible"}</p>
                    <p className="font-medium text-ink-950">{formatEUR(p.availableCapital)}</p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
