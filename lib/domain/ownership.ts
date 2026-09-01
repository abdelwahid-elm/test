import type { EconomicOwnership, ValuationMethod } from "@/types/domain";

export interface OwnershipEntry {
  participantId: string;
  percentage: number;
}

export function economicValue(percentage: number, currentValuation: number): number {
  return (percentage / 100) * currentValuation;
}

/**
 * Simulates one participant (typically the resident) acquiring an additional
 * amount of participation from one or more sellers, pro-rata to their current stake
 * unless specific sellers are given.
 *
 * This does NOT assume the paid amount reduces "original capital" 1:1 — the
 * amount purchases a percentage of the CURRENT valuation, under the active
 * valuation method.
 */
export interface BuyoutInput {
  ownershipBefore: OwnershipEntry[];
  currentValuation: number;
  buyerId: string;
  amount: number;
  sellerIds?: string[]; // defaults to all non-buyer holders, pro-rata
  adminCostRate?: number; // fraction of amount, default 0.015
  valuationMethod: ValuationMethod;
}

export interface BuyoutResult {
  ownershipBefore: OwnershipEntry[];
  ownershipAfter: OwnershipEntry[];
  percentageAcquired: number;
  adminCostEstimate: number;
  notarialEvent: boolean;
  taxReviewFlag: boolean;
  valuationMethod: ValuationMethod;
}

export function simulateBuyout(input: BuyoutInput): BuyoutResult {
  const { ownershipBefore, currentValuation, buyerId, amount, valuationMethod } = input;
  const adminCostRate = input.adminCostRate ?? 0.015;
  const adminCostEstimate = Math.round(amount * adminCostRate);

  const percentageAcquired = (amount / currentValuation) * 100;

  const sellers = input.sellerIds?.length
    ? ownershipBefore.filter((o) => input.sellerIds!.includes(o.participantId))
    : ownershipBefore.filter((o) => o.participantId !== buyerId);

  const sellerTotalBefore = sellers.reduce((sum, s) => sum + s.percentage, 0);

  const ownershipAfter: OwnershipEntry[] = ownershipBefore.map((entry) => {
    if (entry.participantId === buyerId) {
      return { ...entry, percentage: entry.percentage + percentageAcquired };
    }
    const isSeller = sellers.some((s) => s.participantId === entry.participantId);
    if (!isSeller || sellerTotalBefore === 0) return entry;
    const sellerShareOfAcquisition = entry.percentage / sellerTotalBefore;
    return {
      ...entry,
      percentage: entry.percentage - percentageAcquired * sellerShareOfAcquisition,
    };
  });

  return {
    ownershipBefore,
    ownershipAfter,
    percentageAcquired,
    adminCostEstimate,
    notarialEvent: percentageAcquired >= 5,
    taxReviewFlag: true,
    valuationMethod,
  };
}

export function toEconomicOwnershipMap(entries: EconomicOwnership[]): Record<string, number> {
  return Object.fromEntries(entries.map((e) => [e.participantId, e.percentage]));
}
