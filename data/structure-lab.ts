import type { LocalText, StructureModel } from "@/types/domain";

export interface StructureLabRow {
  key: string;
  label: LocalText;
}

export const structureLabRows: StructureLabRow[] = [
  { key: "legalOwner", label: { nl: "Juridische eigenaar", fr: "Propriétaire juridique" } },
  { key: "economicBeneficiaries", label: { nl: "Economische begunstigden", fr: "Bénéficiaires économiques" } },
  { key: "transferRequirements", label: { nl: "Vereisten eigendomsoverdracht", fr: "Exigences de transfert de propriété" } },
  { key: "notarialEvents", label: { nl: "Notariële gebeurtenissen", fr: "Événements notariés" } },
  { key: "registrationTax", label: { nl: "Registratiebelasting", fr: "Droits d'enregistrement" } },
  { key: "corporateTax", label: { nl: "Vennootschapsbelasting", fr: "Impôt des sociétés" } },
  { key: "personalTax", label: { nl: "Personenbelasting", fr: "Impôt des personnes physiques" } },
  { key: "inheritance", label: { nl: "Successie", fr: "Succession" } },
  { key: "regulatory", label: { nl: "Regelgeving", fr: "Réglementation" } },
  { key: "fsmaAif", label: { nl: "FSMA/AICB-beoordeling", fr: "Évaluation FSMA/AICB" } },
  { key: "sharia", label: { nl: "Sharia-beoordeling", fr: "Évaluation charia" } },
];

const REQUIRES_VALIDATION: LocalText = {
  nl: "Vereist professionele validatie",
  fr: "Nécessite une validation professionnelle",
};

export const structureLabModels: {
  model: StructureModel;
  name: LocalText;
  description: LocalText;
  cells: Record<string, LocalText>;
}[] = [
  {
    model: "A",
    name: { nl: "Model A — Rechtstreekse mede-eigendom", fr: "Modèle A — Copropriété directe" },
    description: {
      nl: "Familieleden staan rechtstreeks samen op de eigendomsakte.",
      fr: "Les membres de la famille figurent directement ensemble sur l'acte de propriété.",
    },
    cells: {
      legalOwner: { nl: "Alle participanten, rechtstreeks (onverdeeldheid)", fr: "Tous les participants, directement (indivision)" },
      economicBeneficiaries: { nl: "Gelijk aan juridische eigenaars", fr: "Identiques aux propriétaires juridiques" },
      transferRequirements: { nl: "Notariële akte bij elke wijziging", fr: "Acte notarié à chaque modification" },
      notarialEvents: { nl: "Bij aankoop en bij elke bijkoop ≥ drempel", fr: "À l'achat et à chaque rachat ≥ seuil" },
      registrationTax: REQUIRES_VALIDATION,
      corporateTax: { nl: "N.v.t. (geen vennootschap)", fr: "N/A (pas de société)" },
      personalTax: REQUIRES_VALIDATION,
      inheritance: { nl: "Volgt gewoon erfrecht op het aandeel", fr: "Suit le droit successoral ordinaire sur la quote-part" },
      regulatory: REQUIRES_VALIDATION,
      fsmaAif: REQUIRES_VALIDATION,
      sharia: { nl: "Conceptueel dicht bij directe mede-eigendom", fr: "Conceptuellement proche de la copropriété directe" },
    },
  },
  {
    model: "B",
    name: { nl: "Model B — Vastgoedvehikel per woning (SPV)", fr: "Modèle B — Véhicule immobilier par bien (SPV)" },
    description: {
      nl: "Elke woning wordt gehouden door een eigen vennootschap; familieleden bezitten aandelen.",
      fr: "Chaque bien est détenu par une société dédiée ; les membres de la famille détiennent des parts.",
    },
    cells: {
      legalOwner: { nl: "De SPV (vennootschap)", fr: "Le SPV (société)" },
      economicBeneficiaries: { nl: "Aandeelhouders van de SPV, naar aandelenverhouding", fr: "Actionnaires du SPV, au prorata des parts" },
      transferRequirements: { nl: "Overdracht van aandelen i.p.v. het pand zelf", fr: "Cession de parts plutôt que du bien lui-même" },
      notarialEvents: { nl: "Bij oprichting SPV en aankoop pand", fr: "À la constitution du SPV et à l'achat du bien" },
      registrationTax: REQUIRES_VALIDATION,
      corporateTax: REQUIRES_VALIDATION,
      personalTax: REQUIRES_VALIDATION,
      inheritance: { nl: "Overdracht van aandelen, mogelijk gunstiger te plannen", fr: "Transmission de parts, planification potentiellement plus flexible" },
      regulatory: REQUIRES_VALIDATION,
      fsmaAif: REQUIRES_VALIDATION,
      sharia: REQUIRES_VALIDATION,
    },
  },
  {
    model: "C",
    name: { nl: "Model C — Centraal familievehikel met dochterstructuren", fr: "Modèle C — Véhicule familial central avec filiales" },
    description: {
      nl: "Eén centrale familie-investeringsvennootschap, met een dochterstructuur per woning.",
      fr: "Une société d'investissement familiale centrale, avec une filiale par bien.",
    },
    cells: {
      legalOwner: { nl: "Dochtervennootschap per woning", fr: "Filiale par bien" },
      economicBeneficiaries: { nl: "Aandeelhouders van het centrale vehikel", fr: "Actionnaires du véhicule central" },
      transferRequirements: { nl: "Overdracht op niveau van het centrale vehikel mogelijk", fr: "Transfert possible au niveau du véhicule central" },
      notarialEvents: { nl: "Bij elke aankoop van een nieuwe woning", fr: "À chaque acquisition d'un nouveau bien" },
      registrationTax: REQUIRES_VALIDATION,
      corporateTax: REQUIRES_VALIDATION,
      personalTax: REQUIRES_VALIDATION,
      inheritance: REQUIRES_VALIDATION,
      regulatory: REQUIRES_VALIDATION,
      fsmaAif: { nl: "Verhoogd aandachtspunt bij meerdere participanten", fr: "Point d'attention accru avec plusieurs participants" },
      sharia: REQUIRES_VALIDATION,
    },
  },
  {
    model: "D",
    name: { nl: "Model D — Coöperatieve / participatieve structuur", fr: "Modèle D — Structure coopérative / participative" },
    description: {
      nl: "Familieleden nemen deel via een coöperatieve vennootschap.",
      fr: "Les membres de la famille participent via une société coopérative.",
    },
    cells: {
      legalOwner: { nl: "De coöperatie", fr: "La coopérative" },
      economicBeneficiaries: { nl: "Coöperanten, naar participatie", fr: "Coopérateurs, selon leur participation" },
      transferRequirements: REQUIRES_VALIDATION,
      notarialEvents: REQUIRES_VALIDATION,
      registrationTax: REQUIRES_VALIDATION,
      corporateTax: REQUIRES_VALIDATION,
      personalTax: REQUIRES_VALIDATION,
      inheritance: REQUIRES_VALIDATION,
      regulatory: REQUIRES_VALIDATION,
      fsmaAif: REQUIRES_VALIDATION,
      sharia: REQUIRES_VALIDATION,
    },
  },
  {
    model: "E",
    name: { nl: "Model E — Aangepaste structuur", fr: "Modèle E — Structure personnalisée" },
    description: {
      nl: "Een combinatie of volledig eigen structuur, op maat te bepalen met juridische en fiscale adviseurs.",
      fr: "Une combinaison ou une structure entièrement propre, à définir sur mesure avec des conseillers juridiques et fiscaux.",
    },
    cells: Object.fromEntries(structureLabRows.map((r) => [r.key, REQUIRES_VALIDATION])),
  },
];
