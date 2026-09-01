import type { ValuationMethod } from "@/types/domain";

export interface UsageFeeInput {
  currentValuation: number;
  residentOwnershipPercent: number; // economic ownership of the resident
  referenceRentalYieldAnnual?: number; // gross reference yield, default 4.2%
  occupiedSharePercent?: number; // usually 100
}

export interface UsageFeeResult {
  investorOwnershipPercent: number;
  referenceRentalValueMonthly: number;
  usageFeeMonthly: number;
  valuationMethod: ValuationMethod;
}

/**
 * The resident only pays a usage fee on the portion of the home they occupy
 * but do NOT economically own. As resident ownership rises (via buy-outs),
 * the usage fee falls proportionally — never a fixed/guaranteed yield.
 */
export function calculateUsageFee(
  input: UsageFeeInput,
  valuationMethod: ValuationMethod
): UsageFeeResult {
  const referenceYield = input.referenceRentalYieldAnnual ?? 0.042;
  const occupied = (input.occupiedSharePercent ?? 100) / 100;
  const investorOwnershipPercent = Math.max(0, 100 - input.residentOwnershipPercent);

  const referenceRentalValueMonthly = (input.currentValuation * referenceYield * occupied) / 12;
  const usageFeeMonthly = referenceRentalValueMonthly * (investorOwnershipPercent / 100);

  return {
    investorOwnershipPercent,
    referenceRentalValueMonthly: Math.round(referenceRentalValueMonthly),
    usageFeeMonthly: Math.round(usageFeeMonthly),
    valuationMethod,
  };
}
