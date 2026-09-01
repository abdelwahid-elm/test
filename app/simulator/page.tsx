"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import {
  DEFAULT_SIMULATOR_INPUT,
  simulateFamilyWealth,
  type ScenarioKey,
  type WealthSimulatorInput,
} from "@/lib/domain/wealth-simulator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { cn, formatEUR, formatPercent } from "@/lib/utils";
import { Area, AreaChart, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from "recharts";

const SCENARIOS: { key: ScenarioKey; label: { nl: string; fr: string } }[] = [
  { key: "base", label: { nl: "Basisscenario", fr: "Scénario de base" } },
  { key: "bull", label: { nl: "Positief scenario", fr: "Scénario optimiste" } },
  { key: "bear", label: { nl: "Voorzichtig scenario", fr: "Scénario prudent" } },
  { key: "stress", label: { nl: "Stressscenario", fr: "Scénario de stress" } },
];

const HORIZON_YEARS = [1, 5, 10, 15, 20, 30];

export default function SimulatorPage() {
  const { locale, dict } = useLanguage();
  const [input, setInput] = useState<WealthSimulatorInput>(DEFAULT_SIMULATOR_INPUT);
  const [scenario, setScenario] = useState<ScenarioKey>("base");

  const snapshots = useMemo(() => simulateFamilyWealth(input, scenario, 30), [input, scenario]);

  function update<K extends keyof WealthSimulatorInput>(key: K, value: number) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink-950">{dict.nav.simulator}</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-600/70">
          {locale === "nl"
            ? "Een langetermijnverkenning van hoe het familiekapitaal zich kan ontwikkelen — geen voorspelling, wel een denkoefening."
            : "Une exploration à long terme de l'évolution possible du capital familial — pas une prédiction, mais un exercice de réflexion."}
        </p>
      </div>

      <DisclaimerBanner />

      <Card className="p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-600/60">
          {locale === "nl" ? "Scenario" : "Scénario"}
        </p>
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map((s) => (
            <button
              key={s.key}
              onClick={() => setScenario(s.key)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                scenario === s.key ? "border-emerald-600 bg-emerald-600 text-white" : "border-ink-900/15 text-ink-700 hover:border-emerald-500"
              )}
            >
              {s.label[locale]}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-1">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-ink-600/60">
            {locale === "nl" ? "Aannames" : "Hypothèses"}
          </p>
          <div className="flex flex-col gap-4">
            <NumberField label={locale === "nl" ? "Aantal familieleden" : "Nombre de membres"} value={input.numberOfMembers} onChange={(v) => update("numberOfMembers", v)} />
            <NumberField label={locale === "nl" ? "Startkapitaal" : "Capital de départ"} value={input.startingCapital} onChange={(v) => update("startingCapital", v)} step={5000} prefix="€" />
            <NumberField label={locale === "nl" ? "Maandelijkse inleg (totaal)" : "Apport mensuel (total)"} value={input.monthlyContributionsTotal} onChange={(v) => update("monthlyContributionsTotal", v)} step={100} prefix="€" />
            <NumberField label={locale === "nl" ? "Aankoopprijs per woning" : "Prix d'achat par bien"} value={input.propertyAcquisitionPrice} onChange={(v) => update("propertyAcquisitionPrice", v)} step={5000} prefix="€" />
            <NumberField label={locale === "nl" ? "Bijdrage bewoner (%)" : "Apport occupant (%)"} value={input.residentContributionPercent} onChange={(v) => update("residentContributionPercent", v)} step={1} suffix="%" />
            <NumberField label={locale === "nl" ? "Waardestijging per jaar (%)" : "Appréciation annuelle (%)"} value={Math.round(input.appreciationRateAnnual * 1000) / 10} onChange={(v) => update("appreciationRateAnnual", v / 100)} step={0.1} suffix="%" />
            <NumberField label={locale === "nl" ? "Onderhoud per jaar (%)" : "Entretien annuel (%)"} value={Math.round(input.maintenanceCostRateAnnual * 1000) / 10} onChange={(v) => update("maintenanceCostRateAnnual", v / 100)} step={0.1} suffix="%" />
            <NumberField label={locale === "nl" ? "Bijkoopsnelheid per woning/jaar" : "Vitesse de rachat par bien/an"} value={input.buyoutSpeedMonthlyPerProperty} onChange={(v) => update("buyoutSpeedMonthlyPerProperty", v)} step={50} prefix="€" />
            <NumberField label={locale === "nl" ? "Nieuwe woning elke (jaar)" : "Nouveau bien tous les (ans)"} value={input.newPropertyEveryYears} onChange={(v) => update("newPropertyEveryYears", v)} step={1} />
          </div>
        </Card>

        <div className="flex flex-col gap-5 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{locale === "nl" ? "Familiekapitaal (NAV) over 30 jaar" : "Patrimoine familial (NAV) sur 30 ans"}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={snapshots}>
                    <defs>
                      <linearGradient id="simFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#33654a" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#33654a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#39423b99" }} axisLine={false} tickLine={false} />
                    <YAxis
                      tickFormatter={(v: number) => `€${Math.round(v / 1000)}k`}
                      tick={{ fontSize: 11, fill: "#39423b99" }}
                      axisLine={false}
                      tickLine={false}
                      width={56}
                    />
                    <RTooltip formatter={(v: number) => formatEUR(v)} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                    <Area type="monotone" dataKey="familyNav" stroke="#294f3b" strokeWidth={2} fill="url(#simFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{locale === "nl" ? "Resultaten per periode" : "Résultats par période"}</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto pt-0">
              <table className="w-full min-w-[640px] text-left text-xs">
                <thead>
                  <tr className="border-b border-ink-900/8 text-[10px] uppercase tracking-wide text-ink-600/60">
                    <th className="py-2 pr-4">{locale === "nl" ? "Jaar" : "Année"}</th>
                    <th className="py-2 pr-4">NAV</th>
                    <th className="py-2 pr-4">{locale === "nl" ? "Woningen" : "Biens"}</th>
                    <th className="py-2 pr-4">{locale === "nl" ? "Cash" : "Liquidités"}</th>
                    <th className="py-2 pr-4">{locale === "nl" ? "Eigendom bewoner" : "Propriété occupant"}</th>
                    <th className="py-2 pr-4">{locale === "nl" ? "Concentratierisico" : "Risque de concentration"}</th>
                  </tr>
                </thead>
                <tbody>
                  {HORIZON_YEARS.map((y) => {
                    const s = snapshots[y - 1];
                    if (!s) return null;
                    return (
                      <tr key={y} className="border-b border-ink-900/6 last:border-0">
                        <td className="py-2 pr-4 font-medium text-ink-900">{y}</td>
                        <td className="py-2 pr-4">{formatEUR(s.familyNav)}</td>
                        <td className="py-2 pr-4">{s.numberOfProperties}</td>
                        <td className="py-2 pr-4">{formatEUR(s.availableCash)}</td>
                        <td className="py-2 pr-4">{formatPercent(s.residentOwnershipAvgPercent)}</td>
                        <td className="py-2 pr-4">{formatPercent(s.concentrationRiskPercent)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  step = 1,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-xs">
      <span className="font-medium text-ink-600/70">{label}</span>
      <div className="flex items-center gap-1">
        {prefix && <span className="text-ink-600/50">{prefix}</span>}
        <input
          type="number"
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-full rounded-lg border border-ink-900/15 px-2.5 py-1.5 text-sm outline-none focus:border-emerald-500"
        />
        {suffix && <span className="text-ink-600/50">{suffix}</span>}
      </div>
    </label>
  );
}
