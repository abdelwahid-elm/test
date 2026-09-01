import { properties } from "@/data/properties";
import { participants } from "@/data/participants";
import { ledgerEntries } from "@/data/ledger";

export function familyKpis() {
  const totalPropertyValue = properties.reduce((s, p) => s + p.currentValuation, 0);
  const capitalDeployed = properties.reduce(
    (s, p) => s + p.economicOwnership.reduce((s2, o) => s2 + o.capitalAccountValue, 0),
    0
  );
  const availableCapital = participants.reduce((s, p) => s + p.availableCapital, 0);
  const familyNav = totalPropertyValue + availableCapital;

  const usagePayments = ledgerEntries.filter((e) => e.type === "usage_payment");
  const last30 = usagePayments.filter((e) => {
    const d = new Date(e.timestamp);
    return d >= new Date("2026-08-01");
  });
  const monthlyCashflow = last30.reduce((s, e) => s + e.amount, 0);

  const realisedResults = ledgerEntries
    .filter((e) => e.type === "usage_payment" || e.type === "property_sale")
    .reduce((s, e) => s + e.amount, 0);

  const unrealisedGains = properties.reduce((s, p) => s + (p.currentValuation - p.purchasePrice), 0);

  return {
    familyNav,
    totalPropertyValue,
    capitalDeployed,
    availableCapital,
    monthlyCashflow,
    realisedResults,
    unrealisedGains,
    numberOfProperties: properties.length,
    numberOfParticipants: participants.length,
    liquidityReserve: availableCapital,
  };
}

export function portfolioGrowthSeries() {
  // Approximate family NAV (property value + available capital) over the last 24 months.
  // Available capital is held roughly constant historically — a simplification for demo purposes.
  const availableCapital = participants.reduce((s, p) => s + p.availableCapital, 0);
  const months: { month: string; value: number }[] = [];
  const start = new Date("2024-09-01");
  for (let i = 0; i <= 24; i++) {
    const d = new Date(start);
    d.setMonth(d.getMonth() + i);
    const cutoff = d.toISOString().slice(0, 7);
    const propertyValue = properties.reduce((sum, p) => {
      const vals = p.currentValuation;
      const purchaseMonth = p.purchaseDate.slice(0, 7);
      if (purchaseMonth > cutoff) return sum;
      const progress = Math.min(1, i / 20);
      return sum + p.purchasePrice + (vals - p.purchasePrice) * progress;
    }, 0);
    months.push({ month: cutoff, value: Math.round(propertyValue + availableCapital * Math.min(1, 0.6 + i / 60)) });
  }
  return months;
}
