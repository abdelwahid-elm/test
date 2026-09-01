import type { ValuationMethod } from "@/types/domain";

export const VALUATION_METHOD_LABEL: Record<ValuationMethod, { nl: string; fr: string }> = {
  original_price: { nl: "Oorspronkelijke aankoopprijs", fr: "Prix d'achat initial" },
  independent_valuation: { nl: "Onafhankelijke schatting (huidig)", fr: "Estimation indépendante (actuelle)" },
  indexed_valuation: { nl: "Geïndexeerde waarde", fr: "Valeur indexée" },
  manual_agreement: { nl: "Onderling akkoord", fr: "Accord mutuel" },
  custom_formula: { nl: "Eigen formule", fr: "Formule propre" },
};
