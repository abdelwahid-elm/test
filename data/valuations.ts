import type { PropertyValuation } from "@/types/domain";
import { properties } from "./properties";

function monthsBetween(a: Date, b: Date): number {
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
}

export const valuations: PropertyValuation[] = properties.flatMap((p) => {
  const start = new Date(p.purchaseDate);
  const now = new Date("2026-09-01");
  const totalMonths = Math.max(1, monthsBetween(start, now));
  const steps = Math.min(10, Math.max(3, Math.floor(totalMonths / 4)));
  const entries: PropertyValuation[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const date = new Date(start.getTime() + t * (now.getTime() - start.getTime()));
    const value = Math.round(p.purchasePrice + (p.currentValuation - p.purchasePrice) * t);
    entries.push({
      id: `${p.id}-val-${i}`,
      propertyId: p.id,
      date: date.toISOString().slice(0, 10),
      value,
      method: p.valuationMethod,
      note: i === 0 ? "Aankoopprijs" : i === steps ? "Actuele waardering" : undefined,
    });
  }
  return entries;
});

export function valuationsForProperty(propertyId: string): PropertyValuation[] {
  return valuations.filter((v) => v.propertyId === propertyId);
}
