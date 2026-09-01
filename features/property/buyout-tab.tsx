"use client";

import { useMemo, useState } from "react";
import type { Property, ValuationMethod } from "@/types/domain";
import { useLanguage } from "@/lib/i18n/context";
import { participantById } from "@/data/participants";
import { simulateBuyout } from "@/lib/domain/ownership";
import { calculateUsageFee } from "@/lib/domain/usage-fee";
import { simulatePathTo100 } from "@/lib/domain/path-to-100";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OwnershipBar } from "@/components/ownership-bar";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Glossary } from "@/components/glossary";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { VALUATION_METHOD_LABEL } from "@/lib/domain/valuation-labels";
import { cn, formatEUR, formatPercent } from "@/lib/utils";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";

function valuationForMethod(property: Property, method: ValuationMethod): number {
  switch (method) {
    case "original_price":
      return property.purchasePrice;
    case "indexed_valuation":
      return Math.round(property.currentValuation * 1.03);
    case "manual_agreement":
    case "custom_formula":
    case "independent_valuation":
    default:
      return property.currentValuation;
  }
}

export function BuyoutTab({ property }: { property: Property }) {
  const { locale, dict } = useLanguage();
  const resident = participantById(property.residentId);
  const residentOwnership =
    property.economicOwnership.find((o) => o.participantId === property.residentId)?.percentage ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <PathTo100Card property={property} residentOwnership={residentOwnership} />
      <BuyoutSimulatorCard property={property} residentOwnership={residentOwnership} residentName={resident?.name ?? ""} />
    </div>
  );
}

function PathTo100Card({ property, residentOwnership }: { property: Property; residentOwnership: number }) {
  const { locale } = useLanguage();
  const [monthly, setMonthly] = useState(1000);
  const presets = [500, 1000, 1750, 2500];

  const result = useMemo(
    () =>
      simulatePathTo100({
        currentOwnershipPercent: residentOwnership,
        currentValuation: property.currentValuation,
        monthlyAcquisitionBudget: monthly,
      }),
    [monthly, residentOwnership, property.currentValuation]
  );

  const equity = (residentOwnership / 100) * property.currentValuation;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
          {locale === "nl" ? "Jouw pad naar 100%" : "Votre chemin vers 100 %"}
        </p>

        <div className="mt-3 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div>
            <p className="font-serif text-4xl text-ink-950">{formatPercent(residentOwnership)}</p>
            <p className="mt-1 text-sm text-ink-600/70">
              {formatEUR(equity)} {locale === "nl" ? "eigen vermogen" : "de capitaux propres"}
            </p>
            <p className="mt-3 text-sm font-medium text-ink-800">
              {formatPercent(100 - residentOwnership)} {locale === "nl" ? "resterend" : "restant"}
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs text-ink-600/70">
              {locale === "nl" ? "Geschatte termijn tot 100% eigendom, bij" : "Délai estimé jusqu'à 100 % de propriété, à"}{" "}
              <span className="font-semibold text-ink-950">{formatEUR(monthly)}</span>/{locale === "nl" ? "maand" : "mois"}
            </p>
            <p className="mt-1 font-serif text-2xl text-emerald-700">
              {result.reachesFullOwnership
                ? locale === "nl"
                  ? `${result.years} jaar en ${result.remainingMonths} maanden`
                  : `${result.years} ans et ${result.remainingMonths} mois`
                : locale === "nl"
                ? "Nog geen volledig eigendom binnen 40 jaar aan dit tempo"
                : "Pas de pleine propriété d'ici 40 ans à ce rythme"}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => setMonthly(p)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                    monthly === p
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-ink-900/15 text-ink-700 hover:border-emerald-500"
                  )}
                >
                  €{p.toLocaleString("nl-BE")}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <Slider min={250} max={4000} step={50} value={[monthly]} onValueChange={(v) => setMonthly(v[0])} />
              <div className="mt-1 flex justify-between text-[11px] text-ink-600/50">
                <span>€250</span>
                <span>€4.000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={result.projection}>
              <defs>
                <linearGradient id="pathFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#33654a" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#33654a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                type="number"
                domain={["dataMin", "dataMax"]}
                ticks={Array.from({ length: Math.floor((result.projection.at(-1)?.month ?? 0) / 12) + 1 }, (_, i) => i * 12)}
                tickFormatter={(m: number) => `${Math.round(m / 12)}j`}
                tick={{ fontSize: 11, fill: "#39423b99" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(v: number) => `${v}%`}
                tick={{ fontSize: 11, fill: "#39423b99" }}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <RTooltip
                formatter={(v: number) => formatPercent(v)}
                labelFormatter={(m: number) => `${locale === "nl" ? "Maand" : "Mois"} ${m}`}
                contentStyle={{ borderRadius: 12, fontSize: 12 }}
              />
              <Area type="monotone" dataKey="ownershipPercent" stroke="#294f3b" strokeWidth={2} fill="url(#pathFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function BuyoutSimulatorCard({
  property,
  residentOwnership,
  residentName,
}: {
  property: Property;
  residentOwnership: number;
  residentName: string;
}) {
  const { locale, dict } = useLanguage();
  const [amount, setAmount] = useState(2000);
  const [method, setMethod] = useState<ValuationMethod>(property.valuationMethod);

  const valuation = valuationForMethod(property, method);

  const before = property.economicOwnership.map((o) => ({ participantId: o.participantId, percentage: o.percentage }));
  const beforeFee = calculateUsageFee(
    { currentValuation: property.currentValuation, residentOwnershipPercent: residentOwnership, monthlyRent: property.monthlyRent },
    property.valuationMethod
  );

  const result = simulateBuyout({
    ownershipBefore: before,
    currentValuation: valuation,
    buyerId: property.residentId,
    amount,
    valuationMethod: method,
  });

  const afterResidentPct =
    result.ownershipAfter.find((o) => o.participantId === property.residentId)?.percentage ?? residentOwnership;
  const afterFee = calculateUsageFee(
    { currentValuation: property.currentValuation, residentOwnershipPercent: afterResidentPct, monthlyRent: property.monthlyRent },
    method
  );

  const sellers = before.filter((o) => o.participantId !== property.residentId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Glossary term="buyout" /> {locale === "nl" ? "Bijkoop simuleren" : "Simuler un rachat"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 pt-0">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-xs font-medium uppercase tracking-wide text-ink-600/60">
              {locale === "nl" ? "Bedrag om bij te kopen" : "Montant à racheter"}
            </span>
            <input
              type="number"
              min={100}
              step={100}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="rounded-lg border border-ink-900/15 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-ink-600/60">
              {locale === "nl" ? "Waarderingsmethode" : "Méthode d'évaluation"}
              <Glossary term="valuationMethod" />
            </span>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as ValuationMethod)}
              className="rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
            >
              {(Object.keys(VALUATION_METHOD_LABEL) as ValuationMethod[]).map((m) => (
                <option key={m} value={m}>
                  {VALUATION_METHOD_LABEL[m][locale]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="rounded-xl2 border border-ink-900/8 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-600/60">
              {locale === "nl" ? "Voor" : "Avant"}
            </p>
            <OwnershipBar entries={before} currentValuation={property.currentValuation} />
            <p className="mt-4 text-xs text-ink-600/70">
              {locale === "nl" ? "Gebruiksvergoeding" : "Indemnité d'usage"}: <strong>{formatEUR(beforeFee.usageFeeMonthly)}</strong>/
              {locale === "nl" ? "maand" : "mois"}
            </p>
          </div>

          <div className="rounded-xl2 border border-gold-500/30 bg-gold-200/10 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-600/60">
              {locale === "nl" ? "Transactie" : "Transaction"}
            </p>
            <dl className="flex flex-col gap-2 text-xs text-ink-700">
              <Row label={locale === "nl" ? "Percentage verworven" : "Pourcentage acquis"} value={formatPercent(result.percentageAcquired)} />
              <Row label={locale === "nl" ? "Transactiewaarde" : "Valeur de transaction"} value={formatEUR(amount)} />
              <Row
                label={locale === "nl" ? "Verkoper(s)" : "Vendeur(s)"}
                value={sellers.map((s) => participantById(s.participantId)?.name).join(", ")}
              />
              <Row label={locale === "nl" ? "Geschatte administratiekosten" : "Frais administratifs estimés"} value={formatEUR(result.adminCostEstimate)} />
            </dl>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {result.notarialEvent && (
                <Badge variant="gold">{locale === "nl" ? "Notarieel event" : "Événement notarial"}</Badge>
              )}
              {result.taxReviewFlag && <Badge variant="warning">{dict.disclaimer.pendingTax}</Badge>}
            </div>
          </div>

          <div className="rounded-xl2 border border-emerald-500/30 bg-emerald-50 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-600/60">
              {locale === "nl" ? "Na" : "Après"}
            </p>
            <OwnershipBar entries={result.ownershipAfter} currentValuation={property.currentValuation} />
            <p className="mt-4 text-xs text-ink-600/70">
              {locale === "nl" ? "Nieuwe gebruiksvergoeding" : "Nouvelle indemnité d'usage"}:{" "}
              <strong className="text-emerald-700">{formatEUR(afterFee.usageFeeMonthly)}</strong>/{locale === "nl" ? "maand" : "mois"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <DisclaimerBanner className="sm:flex-1" />
          <Button variant="emerald" className="shrink-0">
            {locale === "nl" ? `Bijkoop voorstellen door ${residentName}` : `Proposer le rachat par ${residentName}`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-ink-600/70">{label}</dt>
      <dd className="text-right font-medium text-ink-900">{value}</dd>
    </div>
  );
}
