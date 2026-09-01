export type ScenarioKey = "base" | "bull" | "bear" | "stress";

export interface WealthSimulatorInput {
  numberOfMembers: number;
  startingCapital: number;
  monthlyContributionsTotal: number;
  propertyAcquisitionPrice: number;
  residentContributionPercent: number; // % of acquisition price the resident brings
  appreciationRateAnnual: number;
  maintenanceCostRateAnnual: number; // % of property value / year
  transactionCostRate: number; // one-off % on acquisition (notarial + admin)
  vacancyRatePercent: number; // % chance-weighted income loss
  liquidityReserveTargetPercent: number; // % of NAV kept as cash
  buyoutSpeedMonthlyPerProperty: number;
  newPropertyEveryYears: number;
}

const SCENARIO_ADJUSTMENTS: Record<ScenarioKey, { appreciation: number; maintenance: number; vacancy: number }> = {
  base: { appreciation: 1, maintenance: 1, vacancy: 1 },
  bull: { appreciation: 1.6, maintenance: 0.85, vacancy: 0.5 },
  bear: { appreciation: 0.3, maintenance: 1.2, vacancy: 1.6 },
  stress: { appreciation: -0.5, maintenance: 1.5, vacancy: 2.5 },
};

export interface YearSnapshot {
  year: number;
  familyNav: number;
  totalPropertyValue: number;
  availableCash: number;
  numberOfProperties: number;
  residentOwnershipAvgPercent: number;
  investorOwnershipAvgPercent: number;
  capitalRecycledCumulative: number;
  realisedCashflowsCumulative: number;
  unrealisedGains: number;
  concentrationRiskPercent: number;
}

export function simulateFamilyWealth(
  input: WealthSimulatorInput,
  scenario: ScenarioKey,
  horizonYears = 30
): YearSnapshot[] {
  const adj = SCENARIO_ADJUSTMENTS[scenario];
  const appreciation = input.appreciationRateAnnual * adj.appreciation;
  const maintenanceRate = input.maintenanceCostRateAnnual * adj.maintenance;
  const vacancyRate = (input.vacancyRatePercent / 100) * adj.vacancy;

  let cash = input.startingCapital;
  let capitalRecycled = 0;
  let realisedCashflows = 0;
  const properties: { value: number; residentPct: number; costBasis: number }[] = [];

  const snapshots: YearSnapshot[] = [];

  for (let year = 1; year <= horizonYears; year++) {
    cash += input.monthlyContributionsTotal * 12;

    const investorCapitalPerProperty =
      input.propertyAcquisitionPrice * (1 - input.residentContributionPercent / 100);
    const canAcquire =
      year % Math.max(1, Math.round(input.newPropertyEveryYears)) === 0 &&
      cash > investorCapitalPerProperty * 1.1;

    if (canAcquire) {
      const txCost = input.propertyAcquisitionPrice * input.transactionCostRate;
      cash -= investorCapitalPerProperty + txCost;
      properties.push({
        value: input.propertyAcquisitionPrice,
        residentPct: input.residentContributionPercent,
        costBasis: input.propertyAcquisitionPrice,
      });
    }

    for (const p of properties) {
      p.value = p.value * (1 + appreciation);

      const maintenanceCost = p.value * maintenanceRate;
      const investorPct = 100 - p.residentPct;
      const grossUsageIncome = p.value * 0.042 * (investorPct / 100) * (1 - vacancyRate);
      const netIncome = grossUsageIncome - maintenanceCost * (investorPct / 100);
      cash += netIncome;
      realisedCashflows += netIncome;

      const buyoutAmount = Math.min(
        input.buyoutSpeedMonthlyPerProperty * 12,
        (investorPct / 100) * p.value
      );
      if (buyoutAmount > 0 && p.residentPct < 100) {
        const pctAcquired = (buyoutAmount / p.value) * 100;
        p.residentPct = Math.min(100, p.residentPct + pctAcquired);
        capitalRecycled += buyoutAmount;
        cash += buyoutAmount * 0.3; // portion recycled back to liquidity, rest redeployed by sellers
      }
    }

    const totalPropertyValue = properties.reduce((s, p) => s + p.value, 0);
    const totalCostBasis = properties.reduce((s, p) => s + p.costBasis, 0);
    const unrealisedGains = totalPropertyValue - totalCostBasis;
    const familyNav = cash + totalPropertyValue - unrealisedGains * 0; // NAV includes current value
    const residentAvg =
      properties.length > 0
        ? properties.reduce((s, p) => s + p.residentPct, 0) / properties.length
        : 0;
    const largestProperty = properties.reduce((m, p) => Math.max(m, p.value), 0);
    const concentration = totalPropertyValue > 0 ? (largestProperty / totalPropertyValue) * 100 : 0;

    snapshots.push({
      year,
      familyNav: Math.round(cash + totalPropertyValue),
      totalPropertyValue: Math.round(totalPropertyValue),
      availableCash: Math.round(cash),
      numberOfProperties: properties.length,
      residentOwnershipAvgPercent: Math.round(residentAvg * 10) / 10,
      investorOwnershipAvgPercent: Math.round((100 - residentAvg) * 10) / 10,
      capitalRecycledCumulative: Math.round(capitalRecycled),
      realisedCashflowsCumulative: Math.round(realisedCashflows),
      unrealisedGains: Math.round(unrealisedGains),
      concentrationRiskPercent: Math.round(concentration * 10) / 10,
    });
  }

  return snapshots;
}

export const DEFAULT_SIMULATOR_INPUT: WealthSimulatorInput = {
  numberOfMembers: 15,
  startingCapital: 220000,
  monthlyContributionsTotal: 3500,
  propertyAcquisitionPrice: 320000,
  residentContributionPercent: 45,
  appreciationRateAnnual: 0.025,
  maintenanceCostRateAnnual: 0.012,
  transactionCostRate: 0.045,
  vacancyRatePercent: 3,
  liquidityReserveTargetPercent: 8,
  buyoutSpeedMonthlyPerProperty: 900,
  newPropertyEveryYears: 2,
};
