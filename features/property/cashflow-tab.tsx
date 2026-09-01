"use client";

import type { Property } from "@/types/domain";
import { useLanguage } from "@/lib/i18n/context";
import { calculateUsageFee } from "@/lib/domain/usage-fee";
import { ledgerForProperty } from "@/data/ledger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Glossary } from "@/components/glossary";
import { formatDate, formatEUR, formatPercent } from "@/lib/utils";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";

export function CashFlowTab({ property }: { property: Property }) {
  const { locale, dict } = useLanguage();
  const residentOwnership =
    property.economicOwnership.find((o) => o.participantId === property.residentId)?.percentage ?? 0;

  const fee = calculateUsageFee(
    { currentValuation: property.currentValuation, residentOwnershipPercent: residentOwnership, monthlyRent: property.monthlyRent },
    property.valuationMethod
  );

  const payments = ledgerForProperty(property.id).filter((e) => e.type === "usage_payment");
  const expenses = ledgerForProperty(property.id).filter((e) => e.type === "property_expense");
  const chartData = payments.map((p) => ({ month: p.timestamp.slice(0, 7), amount: p.amount }));

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label={locale === "nl" ? "Extern eigendom" : "Propriété externe"} value={formatPercent(fee.investorOwnershipPercent)} />
        <Stat
          label={locale === "nl" ? "Referentiehuur" : "Loyer de référence"}
          value={formatEUR(fee.referenceRentalValueMonthly)}
          sub={dict.common.perMonth}
        />
        <Stat label={<><Glossary term="usageFee" /> {locale === "nl" ? "Gebruiksvergoeding" : "Indemnité d'usage"}</>} value={formatEUR(fee.usageFeeMonthly)} sub={dict.common.perMonth} highlight />
        <Stat
          label={locale === "nl" ? "Volgende herziening" : "Prochaine révision"}
          value={locale === "nl" ? "1 jan 2027" : "1 janv. 2027"}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{locale === "nl" ? "Betaalde gebruiksvergoedingen (6 maanden)" : "Indemnités d'usage payées (6 mois)"}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#39423b99" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v: number) => `€${v}`} tick={{ fontSize: 11, fill: "#39423b99" }} axisLine={false} tickLine={false} width={56} />
                <RTooltip formatter={(v: number) => formatEUR(v)} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="amount" fill="#33654a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{locale === "nl" ? "Kosten van de woning" : "Frais du bien"}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 pt-0">
          {expenses.map((e) => (
            <div key={e.id} className="flex items-center justify-between border-b border-ink-900/6 py-2 text-sm last:border-0">
              <span className="text-ink-700">{formatDate(e.timestamp, locale)}</span>
              <span className="font-medium text-ink-950">{formatEUR(e.amount)}</span>
            </div>
          ))}
          {expenses.length === 0 && (
            <p className="text-sm text-ink-600/70">{locale === "nl" ? "Geen kosten geregistreerd." : "Aucun frais enregistré."}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value, sub, highlight }: { label: React.ReactNode; value: string; sub?: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl2 border p-4 ${highlight ? "border-emerald-500/30 bg-emerald-50" : "border-ink-900/8 bg-white"}`}>
      <p className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-ink-600/60">{label}</p>
      <p className="mt-1 font-serif text-xl text-ink-950">{value}</p>
      {sub && <p className="text-[11px] text-ink-600/60">{sub}</p>}
    </div>
  );
}
