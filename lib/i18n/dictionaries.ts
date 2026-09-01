// Plain-language NL/FR copy. Written for readers WITHOUT a finance background:
// short sentences, everyday words, jargon always explained via the Glossary component.

interface GlossaryEntry {
  term: string;
  explain: string;
}

export interface Dictionary {
  brand: string;
  brandTag: string;
  nav: {
    home: string;
    portfolio: string;
    opportunities: string;
    family: string;
    ledger: string;
    governance: string;
    compliance: string;
    sharia: string;
    structureLab: string;
    simulator: string;
  };
  common: {
    perMonth: string;
    viewDetails: string;
    back: string;
    close: string;
    save: string;
    cancel: string;
    confirm: string;
    seeAll: string;
    status: string;
    date: string;
    amount: string;
    property: string;
    participant: string;
    of: string;
    active: string;
    pending: string;
  };
  disclaimer: {
    global: string;
    proposedStructure: string;
    pendingLegal: string;
    pendingTax: string;
    pendingSharia: string;
    requiresValidation: string;
    shariaFooter: string;
    riskWarning: string;
  };
  dashboard: {
    greeting: string;
    subtitle: string;
    familyNav: string;
    last12m: string;
    propertyValue: string;
    availableCapital: string;
    capitalDeployed: string;
    monthlyCashflow: string;
    portfolioGrowth: string;
    portfolioTitle: string;
    propertiesCount: string;
    opportunitiesTitle: string;
    activeCount: string;
    upcomingBuyouts: string;
    thisMonth: string;
    complianceTitle: string;
    itemsNeedAttention: string;
    governanceTitle: string;
    votePending: string;
  };
  glossary: {
    economicOwnership: GlossaryEntry;
    legalOwnership: GlossaryEntry;
    usageFee: GlossaryEntry;
    buyout: GlossaryEntry;
    capitalContribution: GlossaryEntry;
    diminishingMusharakah: GlossaryEntry;
    valuationMethod: GlossaryEntry;
    realisedResult: GlossaryEntry;
    unrealisedResult: GlossaryEntry;
    riskScore: GlossaryEntry;
    liquidityReserve: GlossaryEntry;
    ubo: GlossaryEntry;
  };
}

const nl: Dictionary = {
  brand: "Dar Capital",
  brandTag: "Werknaam — later te vervangen",
  nav: {
    home: "Overzicht",
    portfolio: "Woningen",
    opportunities: "Kansen",
    family: "Familie",
    ledger: "Kasboek",
    governance: "Beslissingen",
    compliance: "Regels & controle",
    sharia: "Sharia-toetsing",
    structureLab: "Structuren vergelijken",
    simulator: "Toekomstsimulatie",
  },
  common: {
    perMonth: "per maand",
    viewDetails: "Bekijk details",
    back: "Terug",
    close: "Sluiten",
    save: "Opslaan",
    cancel: "Annuleren",
    confirm: "Bevestigen",
    seeAll: "Alles bekijken",
    status: "Status",
    date: "Datum",
    amount: "Bedrag",
    property: "Woning",
    participant: "Familielid",
    of: "van",
    active: "Actief",
    pending: "In behandeling",
  },
  disclaimer: {
    global:
      "Dit is een werkend prototype met voorbeeldcijfers. Niets op deze pagina's is al juridisch, fiscaal of religieus goedgekeurd.",
    proposedStructure: "Voorgestelde structuur",
    pendingLegal: "Nog niet juridisch getoetst",
    pendingTax: "Nog niet fiscaal getoetst",
    pendingSharia: "Nog niet religieus (sharia) getoetst",
    requiresValidation: "Moet nog door een specialist bevestigd worden",
    shariaFooter:
      "Of iets echt in lijn is met de sharia hangt af van de concrete contracten en hoe alles in de praktijk wordt uitgevoerd. Deze software spreekt zelf geen religieus oordeel (fatwa) uit.",
    riskWarning: "Geïnvesteerd geld deelt mee in het risico van het vastgoed — de waarde kan ook dalen.",
  },
  dashboard: {
    greeting: "Goedemorgen",
    subtitle: "Jullie familiekapitaal bouwt samen aan eigendom, generatie na generatie.",
    familyNav: "Totale waarde van de familie",
    last12m: "afgelopen 12 maanden",
    propertyValue: "Waarde van de woningen",
    availableCapital: "Beschikbaar kapitaal",
    capitalDeployed: "Geïnvesteerd kapitaal",
    monthlyCashflow: "Maandelijkse inkomsten",
    portfolioGrowth: "Groei van het familievermogen",
    portfolioTitle: "Familieportefeuille",
    propertiesCount: "woningen",
    opportunitiesTitle: "Investeringskansen",
    activeCount: "actief",
    upcomingBuyouts: "Aankomende bijkopen",
    thisMonth: "deze maand",
    complianceTitle: "Regels & controle",
    itemsNeedAttention: "punten hebben aandacht nodig",
    governanceTitle: "Beslissingen",
    votePending: "stemming loopt",
  },
  glossary: {
    economicOwnership: {
      term: "Economisch eigendom",
      explain:
        "Het deel van de waarde van de woning dat echt van jou is — alsof je dat percentage van het huis zelf bezit. Dit kan verschillen van wie op papier (juridisch) eigenaar staat.",
    },
    legalOwnership: {
      term: "Juridisch eigendom",
      explain:
        "Wie volgens de notariële akte officieel eigenaar is. Dit kan één persoon of een vennootschap zijn, ook als meerdere familieleden economisch meedelen.",
    },
    usageFee: {
      term: "Gebruiksvergoeding",
      explain:
        "Een vergoeding die de bewoner betaalt voor het deel van de woning dat nog niet van hem/haar is — vergelijkbaar met huur, maar alleen op het stuk dat anderen (investeerders) nog bezitten. Geen rente, geen lening.",
    },
    buyout: {
      term: "Bijkoop / participatie kopen",
      explain:
        "De bewoner koopt geleidelijk een extra stukje eigendom van de andere familieleden. Elke keer stijgt zijn/haar eigendomspercentage en daalt de gebruiksvergoeding.",
    },
    capitalContribution: {
      term: "Kapitaalinbreng",
      explain: "Het geld dat een familielid inlegt om mee eigenaar te worden van een woning. Geen lening — echte deelname in eigendom en risico.",
    },
    diminishingMusharakah: {
      term: "Afbouwend gedeeld eigendom (Musharakah Mutanaqisah)",
      explain:
        "Een model uit de islamitische financiering waarbij meerdere partijen samen een woning kopen, en de bewoner stap voor stap de rest overkoopt — zonder rente op leningen.",
    },
    valuationMethod: {
      term: "Waarderingsmethode",
      explain: "De manier waarop bepaald wordt hoeveel de woning nu waard is: de oorspronkelijke aankoopprijs, een onafhankelijke schatting, een geïndexeerde waarde, een onderling akkoord, of een eigen formule.",
    },
    realisedResult: {
      term: "Gerealiseerd resultaat",
      explain: "Winst of verlies dat al definitief is, bijvoorbeeld na verkoop van een woning of uitbetaalde gebruiksvergoedingen.",
    },
    unrealisedResult: {
      term: "Niet-gerealiseerd resultaat",
      explain: "Winst of verlies 'op papier' — de woning is bijvoorbeeld meer waard geworden, maar niemand heeft dat geld al in handen.",
    },
    riskScore: {
      term: "Risicoscore",
      explain: "Een eenvoudige inschatting (1 = laag risico, 5 = hoog risico) op basis van locatie, staat van de woning en marktomstandigheden.",
    },
    liquidityReserve: {
      term: "Liquiditeitsreserve",
      explain: "Geld dat de familie apart houdt (niet belegd in woningen) om onverwachte kosten of noden op te vangen.",
    },
    ubo: {
      term: "Uiteindelijke begunstigde (UBO)",
      explain: "De persoon die uiteindelijk economisch voordeel heeft bij een structuur — verplicht te registreren volgens Belgische wetgeving.",
    },
  },
};

const fr: Dictionary = {
  brand: "Dar Capital",
  brandTag: "Nom provisoire — à remplacer plus tard",
  nav: {
    home: "Aperçu",
    portfolio: "Logements",
    opportunities: "Opportunités",
    family: "Famille",
    ledger: "Registre",
    governance: "Décisions",
    compliance: "Règles & contrôle",
    sharia: "Conformité charia",
    structureLab: "Comparer les structures",
    simulator: "Simulation d'avenir",
  },
  common: {
    perMonth: "par mois",
    viewDetails: "Voir les détails",
    back: "Retour",
    close: "Fermer",
    save: "Enregistrer",
    cancel: "Annuler",
    confirm: "Confirmer",
    seeAll: "Tout voir",
    status: "Statut",
    date: "Date",
    amount: "Montant",
    property: "Logement",
    participant: "Membre",
    of: "de",
    active: "Actif",
    pending: "En cours",
  },
  disclaimer: {
    global:
      "Ceci est un prototype fonctionnel avec des chiffres d'exemple. Rien sur ces pages n'a encore été validé sur le plan juridique, fiscal ou religieux.",
    proposedStructure: "Structure proposée",
    pendingLegal: "Pas encore validé juridiquement",
    pendingTax: "Pas encore validé fiscalement",
    pendingSharia: "Pas encore validé sur le plan religieux (charia)",
    requiresValidation: "Doit encore être confirmé par un spécialiste",
    shariaFooter:
      "La conformité réelle à la charia dépend des contrats concrets et de leur mise en œuvre. Ce logiciel ne rend lui-même aucun avis religieux (fatwa).",
    riskWarning: "L'argent investi partage le risque du bien immobilier — sa valeur peut aussi baisser.",
  },
  dashboard: {
    greeting: "Bonjour",
    subtitle: "Le capital familial construit ensemble une propriété durable, génération après génération.",
    familyNav: "Valeur totale de la famille",
    last12m: "12 derniers mois",
    propertyValue: "Valeur des logements",
    availableCapital: "Capital disponible",
    capitalDeployed: "Capital investi",
    monthlyCashflow: "Revenus mensuels",
    portfolioGrowth: "Croissance du patrimoine familial",
    portfolioTitle: "Portefeuille familial",
    propertiesCount: "logements",
    opportunitiesTitle: "Opportunités d'investissement",
    activeCount: "actives",
    upcomingBuyouts: "Prochains rachats",
    thisMonth: "ce mois-ci",
    complianceTitle: "Règles & contrôle",
    itemsNeedAttention: "points nécessitent votre attention",
    governanceTitle: "Décisions",
    votePending: "vote en cours",
  },
  glossary: {
    economicOwnership: {
      term: "Propriété économique",
      explain:
        "La part de la valeur du logement qui vous appartient réellement — comme si vous possédiez ce pourcentage du bien. Cela peut différer de qui est propriétaire sur papier (juridiquement).",
    },
    legalOwnership: {
      term: "Propriété juridique",
      explain:
        "La personne officiellement propriétaire selon l'acte notarié. Cela peut être une seule personne ou une société, même si plusieurs membres de la famille participent économiquement.",
    },
    usageFee: {
      term: "Indemnité d'usage",
      explain:
        "Une indemnité que l'occupant paie pour la part du logement qui ne lui appartient pas encore — comparable à un loyer, mais uniquement sur la part que d'autres (investisseurs) possèdent encore. Ce n'est pas un intérêt, ni un prêt.",
    },
    buyout: {
      term: "Rachat de participation",
      explain:
        "L'occupant rachète progressivement une part supplémentaire de propriété aux autres membres de la famille. À chaque rachat, sa part augmente et l'indemnité d'usage diminue.",
    },
    capitalContribution: {
      term: "Apport en capital",
      explain: "L'argent qu'un membre de la famille investit pour devenir copropriétaire d'un logement. Ce n'est pas un prêt — c'est une véritable participation à la propriété et au risque.",
    },
    diminishingMusharakah: {
      term: "Copropriété dégressive (Musharakah Mutanaqisah)",
      explain:
        "Un modèle de la finance islamique où plusieurs parties achètent ensemble un logement, et l'occupant rachète progressivement le reste — sans intérêt sur un prêt.",
    },
    valuationMethod: {
      term: "Méthode d'évaluation",
      explain: "La façon dont on détermine la valeur actuelle du bien : le prix d'achat initial, une estimation indépendante, une valeur indexée, un accord mutuel, ou une formule propre.",
    },
    realisedResult: {
      term: "Résultat réalisé",
      explain: "Un gain ou une perte déjà définitif, par exemple après la vente d'un logement ou des indemnités d'usage perçues.",
    },
    unrealisedResult: {
      term: "Résultat non réalisé",
      explain: "Un gain ou une perte 'sur papier' — le logement a par exemple pris de la valeur, mais personne n'a encore cet argent en main.",
    },
    riskScore: {
      term: "Score de risque",
      explain: "Une estimation simple (1 = risque faible, 5 = risque élevé) basée sur l'emplacement, l'état du bien et le marché.",
    },
    liquidityReserve: {
      term: "Réserve de liquidités",
      explain: "L'argent que la famille garde de côté (non investi dans des logements) pour faire face à des frais ou besoins imprévus.",
    },
    ubo: {
      term: "Bénéficiaire effectif (UBO)",
      explain: "La personne qui bénéficie économiquement, en dernier ressort, d'une structure — à enregistrer obligatoirement selon la loi belge.",
    },
  },
};

export const dictionaries = { nl, fr };
