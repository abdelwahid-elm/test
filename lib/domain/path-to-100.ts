export interface PathTo100Input {
  currentOwnershipPercent: number;
  currentValuation: number;
  monthlyAcquisitionBudget: number;
  annualAppreciationRate?: number; // default 2%
}

export interface PathTo100Result {
  months: number;
  years: number;
  remainingMonths: number;
  reachesFullOwnership: boolean;
  projection: { month: number; ownershipPercent: number }[];
}

const MAX_MONTHS = 40 * 12;

export function simulatePathTo100(input: PathTo100Input): PathTo100Result {
  const appreciation = input.annualAppreciationRate ?? 0.02;
  const monthlyAppreciation = Math.pow(1 + appreciation, 1 / 12) - 1;

  let ownership = input.currentOwnershipPercent;
  let valuation = input.currentValuation;
  const projection: { month: number; ownershipPercent: number }[] = [
    { month: 0, ownershipPercent: ownership },
  ];

  let month = 0;
  while (ownership < 100 && month < MAX_MONTHS) {
    month += 1;
    valuation = valuation * (1 + monthlyAppreciation);
    if (input.monthlyAcquisitionBudget <= 0) {
      projection.push({ month, ownershipPercent: ownership });
      if (month >= 24) break; // no progress, stop projecting early
      continue;
    }
    const pctAcquired = (input.monthlyAcquisitionBudget / valuation) * 100;
    ownership = Math.min(100, ownership + pctAcquired);
    if (month % 3 === 0 || ownership >= 100) {
      projection.push({ month, ownershipPercent: Math.round(ownership * 10) / 10 });
    }
  }

  const reachesFullOwnership = ownership >= 100;
  return {
    months: month,
    years: Math.floor(month / 12),
    remainingMonths: month % 12,
    reachesFullOwnership,
    projection,
  };
}
