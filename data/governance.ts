import type { GovernanceProposal } from "@/types/domain";

export const governanceProposals: GovernanceProposal[] = [
  {
    id: "gov-vilvoorde-2",
    title: { nl: "Tweede woning aankopen in Vilvoorde voor €330.000", fr: "Acquérir un second bien à Vilvoorde pour 330 000 €" },
    memo: {
      nl: "Voorstel om een tweede familiewoning te verwerven in Vilvoorde, vlakbij de bestaande woning. Voorgestelde structuur: Model A, bewoner nog te bepalen. Vereist €180.000 aan aanvullend kapitaal bovenop de bijdrage van de toekomstige bewoner.",
      fr: "Proposition d'acquérir un second bien familial à Vilvoorde, à proximité du bien existant. Structure proposée : Modèle A, occupant à déterminer. Nécessite 180 000 € de capital complémentaire en plus de l'apport du futur occupant.",
    },
    requiredCapital: 180000,
    votingDeadline: "2026-09-20",
    eligibleVoterIds: [
      "p-youssef", "p-omar", "p-sara", "p-nadia", "p-hamid", "p-yasmine",
      "p-karim", "p-fatima", "p-rachid", "p-amina", "p-tarik", "p-leila",
    ],
    votes: [
      { participantId: "p-omar", choice: "for", weight: 10, castAt: "2026-08-20" },
      { participantId: "p-hamid", choice: "for", weight: 9, castAt: "2026-08-21" },
      { participantId: "p-yasmine", choice: "for", weight: 9, castAt: "2026-08-22" },
      { participantId: "p-fatima", choice: "abstain", weight: 8, castAt: "2026-08-23" },
      { participantId: "p-tarik", choice: "against", weight: 8, castAt: "2026-08-24" },
    ],
    status: "open",
  },
  {
    id: "gov-liquidity-rule",
    title: { nl: "Minimale liquiditeitsreserve verhogen naar 10%", fr: "Augmenter la réserve de liquidités minimale à 10 %" },
    memo: {
      nl: "Voorstel om de minimale liquiditeitsreserve van de familie te verhogen van 8% naar 10% van de totale familiewaarde, als buffer voor onderhoud en tegenslagen.",
      fr: "Proposition d'augmenter la réserve de liquidités minimale de la famille de 8 % à 10 % de la valeur totale familiale, comme tampon pour l'entretien et les imprévus.",
    },
    requiredCapital: 0,
    votingDeadline: "2026-07-01",
    eligibleVoterIds: [
      "p-youssef", "p-omar", "p-sara", "p-nadia", "p-hamid", "p-yasmine",
      "p-karim", "p-fatima", "p-rachid", "p-amina", "p-tarik", "p-leila",
    ],
    votes: [
      { participantId: "p-youssef", choice: "for", weight: 12, castAt: "2026-06-15" },
      { participantId: "p-omar", choice: "for", weight: 10, castAt: "2026-06-16" },
      { participantId: "p-sara", choice: "for", weight: 8, castAt: "2026-06-16" },
      { participantId: "p-nadia", choice: "for", weight: 7, castAt: "2026-06-17" },
      { participantId: "p-hamid", choice: "for", weight: 9, castAt: "2026-06-17" },
      { participantId: "p-yasmine", choice: "against", weight: 9, castAt: "2026-06-18" },
      { participantId: "p-karim", choice: "for", weight: 6, castAt: "2026-06-18" },
      { participantId: "p-fatima", choice: "for", weight: 8, castAt: "2026-06-19" },
      { participantId: "p-rachid", choice: "abstain", weight: 7, castAt: "2026-06-19" },
      { participantId: "p-amina", choice: "for", weight: 6, castAt: "2026-06-20" },
      { participantId: "p-tarik", choice: "for", weight: 8, castAt: "2026-06-20" },
      { participantId: "p-leila", choice: "for", weight: 6, castAt: "2026-06-21" },
    ],
    status: "passed",
  },
];

export const governanceRules = {
  minResidentContributionPercent: 30,
  maxExposurePerPropertyPercent: 20,
  maxExposurePerParticipantPercent: 25,
  minLiquidityReservePercent: 8,
  maxGeographicConcentrationPercent: 35,
  approvalThresholdPercent: 60,
};
