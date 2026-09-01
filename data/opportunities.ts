import type { Opportunity } from "@/types/domain";

export const opportunities: Opportunity[] = [
  {
    id: "opp-zemst",
    property: {
      name: { nl: "Familiewoning Zemst", fr: "Maison familiale à Zemst" },
      city: "Zemst",
      imageUrl: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1400&q=80",
      purchasePrice: 105000,
      currentValuation: 105000,
      energyLabel: "C",
      riskScore: 2,
    },
    residentContribution: 55000,
    capitalRequired: 50000,
    committed: 34000,
    proposedStructure: {
      nl: "Model A — rechtstreekse mede-eigendom. De bewoner brengt €55.000 in, de familie zoekt nog €50.000 aan aanvullend kapitaal.",
      fr: "Modèle A — copropriété directe. L'occupant apporte 55 000 €, la famille recherche encore 50 000 € de capital complémentaire.",
    },
    proposedOccupancy: {
      nl: "De toekomstige bewoner betaalt een gebruiksvergoeding op het deel dat de familie-investeerders bezitten, met een maandelijkse bijkoopoptie.",
      fr: "Le futur occupant paiera une indemnité d'usage sur la part détenue par les investisseurs familiaux, avec option de rachat mensuel.",
    },
    closingDate: "2026-11-30",
  },
  {
    id: "opp-zaventem",
    property: {
      name: { nl: "Appartement Zaventem", fr: "Appartement à Zaventem" },
      city: "Zaventem",
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
      purchasePrice: 78000,
      currentValuation: 78000,
      energyLabel: "B",
      riskScore: 2,
    },
    residentContribution: 39000,
    capitalRequired: 39000,
    committed: 16000,
    proposedStructure: {
      nl: "Model A — rechtstreekse mede-eigendom, 50/50 startverdeling tussen bewoner en familie-investeerders.",
      fr: "Modèle A — copropriété directe, répartition de départ 50/50 entre l'occupant et les investisseurs familiaux.",
    },
    proposedOccupancy: {
      nl: "Volledige bewoning door één familielid, gebruiksvergoeding herzien om de 12 maanden.",
      fr: "Occupation complète par un membre de la famille, indemnité d'usage révisée tous les 12 mois.",
    },
    closingDate: "2027-01-15",
  },
  {
    id: "opp-tervuren",
    property: {
      name: { nl: "Landhuis Tervuren", fr: "Maison de campagne à Tervuren" },
      city: "Tervuren",
      imageUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80",
      purchasePrice: 130000,
      currentValuation: 132000,
      energyLabel: "A",
      riskScore: 1,
    },
    residentContribution: 78000,
    capitalRequired: 52000,
    committed: 52000,
    proposedStructure: {
      nl: "Model B — aparte vastgoedvennootschap (SPV) voor deze woning. Volledig gefinancierd, notariële afhandeling gepland.",
      fr: "Modèle B — société immobilière dédiée (SPV) pour ce bien. Entièrement financé, passation notariale planifiée.",
    },
    proposedOccupancy: {
      nl: "Bewoner koopt vanaf jaar 2 actief bij, in lijn met het 'Pad naar 100%' principe.",
      fr: "L'occupant rachète activement des parts dès l'année 2, conformément au principe du « Chemin vers 100 % ».",
    },
    closingDate: "2026-10-01",
  },
];
