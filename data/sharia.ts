import type { LocalText, ReviewStatus } from "@/types/domain";

export interface ShariaStructureContent {
  propertyId: string;
  status: ReviewStatus;
  acquisitionStructure: LocalText;
  ownershipDistribution: LocalText;
  occupancyArrangement: LocalText;
  usageFeeMethodology: LocalText;
  buyoutMethodology: LocalText;
  riskAllocation: LocalText;
  expenseAllocation: LocalText;
  exitMechanism: LocalText;
}

const genericStructure = (): Omit<ShariaStructureContent, "propertyId" | "status"> => ({
  acquisitionStructure: {
    nl: "Familieleden brengen samen kapitaal in en verwerven gezamenlijk economisch eigendom van de woning — geen onderlinge lening.",
    fr: "Les membres de la famille apportent ensemble du capital et acquièrent conjointement la propriété économique du bien — sans prêt entre eux.",
  },
  ownershipDistribution: {
    nl: "Eigendom wordt toegekend naar verhouding van elke kapitaalinbreng, en gewijzigd bij elke bijkooptransactie.",
    fr: "La propriété est attribuée proportionnellement à chaque apport en capital, et modifiée à chaque rachat.",
  },
  occupancyArrangement: {
    nl: "De bewoner bezet de woning op basis van een aparte bewonersovereenkomst, los van de eigendomsverhoudingen.",
    fr: "L'occupant occupe le bien sur la base d'une convention d'occupation distincte, indépendante des parts de propriété.",
  },
  usageFeeMethodology: {
    nl: "De gebruiksvergoeding wordt berekend op het niet door de bewoner bezeten deel, op basis van een referentiehuurwaarde — geen vaste rente.",
    fr: "L'indemnité d'usage est calculée sur la part non détenue par l'occupant, sur la base d'une valeur locative de référence — pas d'intérêt fixe.",
  },
  buyoutMethodology: {
    nl: "Bijkopen gebeuren tegen de op dat moment geldende waarderingsmethode, niet tegen een vooraf vastgelegde 'aflossingstabel'.",
    fr: "Les rachats se font selon la méthode d'évaluation en vigueur à ce moment, et non selon un « tableau de remboursement » fixé à l'avance.",
  },
  riskAllocation: {
    nl: "Winst en verlies op de woning worden gedeeld naar rato van economisch eigendom — investeerders dragen mee het risico van waardedaling.",
    fr: "Les gains et pertes sur le bien sont partagés au prorata de la propriété économique — les investisseurs supportent aussi le risque de baisse de valeur.",
  },
  expenseAllocation: {
    nl: "Structurele kosten worden verdeeld volgens eigendomspercentage; gewoon onderhoud kan contractueel bij de bewoner liggen.",
    fr: "Les frais structurels sont répartis selon le pourcentage de propriété ; l'entretien courant peut contractuellement incomber à l'occupant.",
  },
  exitMechanism: {
    nl: "Bij verkoop, overlijden of geschil wordt de woning gewaardeerd en uitgekocht volgens vooraf overeengekomen governance-regels.",
    fr: "En cas de vente, décès ou litige, le bien est évalué et racheté selon des règles de gouvernance convenues à l'avance.",
  },
});

export function buildShariaStructure(propertyId: string, status: ReviewStatus): ShariaStructureContent {
  return { propertyId, status, ...genericStructure() };
}
