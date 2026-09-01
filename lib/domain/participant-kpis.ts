import { properties } from "@/data/properties";
import { ledgerEntries } from "@/data/ledger";

export interface ParticipantExposure {
  propertyId: string;
  percentage: number;
  value: number;
  role: "resident" | "investor";
}

export function participantKpis(participantId: string) {
  const exposures: ParticipantExposure[] = [];
  let portfolioValue = 0;
  let capitalDeployed = 0;
  let unrealisedResults = 0;

  for (const p of properties) {
    const stake = p.economicOwnership.find((o) => o.participantId === participantId);
    if (!stake) continue;
    const value = (stake.percentage / 100) * p.currentValuation;
    const originalValue = (stake.percentage / 100) * p.purchasePrice;
    portfolioValue += value;
    capitalDeployed += stake.capitalAccountValue;
    unrealisedResults += value - originalValue;
    exposures.push({
      propertyId: p.id,
      percentage: stake.percentage,
      value,
      role: p.residentId === participantId ? "resident" : "investor",
    });
  }

  const own = ledgerEntries.filter((e) => e.participantId === participantId);
  const realisedResults = own
    .filter((e) => e.type === "usage_payment" && exposures.some((ex) => ex.propertyId === e.propertyId && ex.role === "investor"))
    .reduce((s, e) => s + e.amount, 0);

  const monthlyCashflow = own
    .filter((e) => e.type === "usage_payment" && e.timestamp >= "2026-08-01")
    .reduce((s, e) => s - e.amount, 0); // negative: resident pays out
  const monthlyIncome = ledgerEntries
    .filter(
      (e) =>
        e.type === "usage_payment" &&
        e.timestamp >= "2026-08-01" &&
        exposures.some((ex) => ex.propertyId === e.propertyId && ex.role === "investor")
    )
    .reduce((s, e) => s + e.amount * ((exposures.find((ex) => ex.propertyId === e.propertyId)?.percentage ?? 0) / 100), 0);

  return {
    exposures,
    portfolioValue: Math.round(portfolioValue),
    capitalDeployed: Math.round(capitalDeployed),
    unrealisedResults: Math.round(unrealisedResults),
    realisedResults: Math.round(realisedResults),
    monthlyCashflow: Math.round(monthlyCashflow + monthlyIncome),
    residentOf: exposures.filter((e) => e.role === "resident").map((e) => e.propertyId),
  };
}
