import type { ComplianceRequirement } from "@/types/domain";

export const complianceRequirements: ComplianceRequirement[] = [
  { id: "cmp-1", category: "aml_kyc", label: { nl: "Identiteit geverifieerd", fr: "Identité vérifiée" }, status: "complete" },
  { id: "cmp-2", category: "aml_kyc", label: { nl: "Herkomst van middelen gedocumenteerd", fr: "Origine des fonds documentée" }, status: "attention_required", propertyId: "prop-kortenberg", detail: { nl: "Documentatie voor de inbreng van Abdelatif Toumi ontbreekt nog.", fr: "La documentation de l'apport d'Abdelatif Toumi manque encore." } },
  { id: "cmp-3", category: "ubo", label: { nl: "UBO-informatie volledig", fr: "Informations UBO complètes" }, status: "complete" },
  { id: "cmp-4", category: "notarial", label: { nl: "Eigendomsakte opgeladen", fr: "Acte de propriété téléversé" }, status: "complete", propertyId: "prop-vilvoorde" },
  { id: "cmp-5", category: "notarial", label: { nl: "Eigendomsakte opgeladen", fr: "Acte de propriété téléversé" }, status: "in_progress", propertyId: "prop-kapellen" },
  { id: "cmp-6", category: "accounting", label: { nl: "Waardering uitgevoerd", fr: "Évaluation réalisée" }, status: "complete", propertyId: "prop-mechelen" },
  { id: "cmp-7", category: "regulatory", label: { nl: "Verzekering geverifieerd", fr: "Assurance vérifiée" }, status: "attention_required", propertyId: "prop-grimbergen", detail: { nl: "Polis loopt af op 30/09/2026, hernieuwing nog te bevestigen.", fr: "La police expire le 30/09/2026, renouvellement à confirmer." } },
  { id: "cmp-8", category: "legal", label: { nl: "Bewonersovereenkomst ondertekend", fr: "Convention d'occupation signée" }, status: "complete", propertyId: "prop-leuven" },
  { id: "cmp-9", category: "legal", label: { nl: "Participatieovereenkomst ondertekend", fr: "Convention de participation signée" }, status: "in_progress", propertyId: "prop-kortenberg" },
  { id: "cmp-10", category: "sharia", label: { nl: "Sharia-toetsing afgerond", fr: "Validation charia terminée" }, status: "in_progress", propertyId: "prop-kortenberg" },
  { id: "cmp-11", category: "tax", label: { nl: "Fiscale toetsing afgerond", fr: "Validation fiscale terminée" }, status: "attention_required", detail: { nl: "Globale kwalificatie van gebruiksvergoedingen nog te bevestigen met een fiscalist.", fr: "La qualification fiscale globale des indemnités d'usage doit encore être confirmée par un fiscaliste." } },
  { id: "cmp-12", category: "regulatory", label: { nl: "Regelgevende classificatie beoordeeld (FSMA/AICB)", fr: "Classification réglementaire évaluée (FSMA/AICB)" }, status: "attention_required", detail: { nl: "Nog geen formele beoordeling of dit platform onder AICB- of aanbiedingsregels valt.", fr: "Aucune évaluation formelle si cette plateforme relève des règles AICB ou d'offre au public." } },
  { id: "cmp-13", category: "accounting", label: { nl: "Boekhouding per vastgoedvehikel bijgewerkt", fr: "Comptabilité par véhicule immobilier à jour" }, status: "complete" },
  { id: "cmp-14", category: "aml_kyc", label: { nl: "Periodieke KYC-herziening", fr: "Révision KYC périodique" }, status: "complete" },
];
