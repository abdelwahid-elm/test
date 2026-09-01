import type { ValuationMethod } from "@/types/domain";

export interface UsageFeeInput {
  currentValuation: number;
  residentOwnershipPercent: number; // economic ownership of the resident
  monthlyRent?: number; // actual estimated market rent for the property, when known
  referenceRentalYieldAnnual?: number; // fallback gross yield if no monthlyRent is given, default 4.2%
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
 *
 * The reference rental value uses the property's actual estimated market rent
 * (monthlyRent) when available; only falls back to a generic yield formula
 * when no rent figure has been entered for the property.
 */
export function calculateUsageFee(
  input: UsageFeeInput,
  valuationMethod: ValuationMethod
): UsageFeeResult {
  const occupied = (input.occupiedSharePercent ?? 100) / 100;
  const investorOwnershipPercent = Math.max(0, 100 - input.residentOwnershipPercent);

  const referenceRentalValueMonthly =
    input.monthlyRent != null
      ? input.monthlyRent * occupied
      : (input.currentValuation * (input.referenceRentalYieldAnnual ?? 0.042) * occupied) / 12;

  const usageFeeMonthly = referenceRentalValueMonthly * (investorOwnershipPercent / 100);

  return {
    investorOwnershipPercent,
    referenceRentalValueMonthly: Math.round(referenceRentalValueMonthly),
    usageFeeMonthly: Math.round(usageFeeMonthly),
    valuationMethod,
  };
}
