// Domain data model for Dar Capital (werknaam / nom de travail).
// This models a PROPOSED economic structure only. Nothing here constitutes
// legal, tax, regulatory or Sharia advice — see ReviewStatus fields.

export type ReviewStatus =
  | "pending_legal_review"
  | "pending_tax_review"
  | "pending_sharia_review"
  | "requires_professional_validation"
  | "draft"
  | "internal_review"
  | "scholar_review"
  | "approved"
  | "needs_revision";

export type Locale = "nl" | "fr";

export interface LocalText {
  nl: string;
  fr: string;
}

export interface Participant {
  id: string;
  name: string;
  initials: string;
  role: ParticipantRole[];
  availableCapital: number;
  color: string; // accent used in ownership visualisations
  joinedAt: string;
  votingWeight: number;
  privacy: "family" | "administrators" | "private";
}

export type ParticipantRole =
  | "resident"
  | "investor"
  | "family_admin"
  | "finance_admin"
  | "legal_reviewer"
  | "sharia_reviewer"
  | "auditor";

export interface LegalOwnership {
  participantId: string;
  percentage: number; // legal title, may differ from economic ownership
  structureModel: StructureModel;
}

export interface EconomicOwnership {
  participantId: string;
  percentage: number;
  capitalAccountValue: number;
}

export interface CapitalContribution {
  id: string;
  propertyId: string;
  participantId: string;
  amount: number;
  date: string;
  note?: string;
}

export interface OccupancyAgreement {
  propertyId: string;
  residentId: string;
  occupiedSharePercent: number; // usually 100
  startDate: string;
  status: ReviewStatus;
}

export interface UsagePayment {
  id: string;
  propertyId: string;
  residentId: string;
  period: string; // e.g. "2026-08"
  amount: number;
  externalOwnershipPercentAtCalc: number;
  referenceRentalValue: number;
  valuationMethod: ValuationMethod;
}

export type ValuationMethod =
  | "original_price"
  | "independent_valuation"
  | "indexed_valuation"
  | "manual_agreement"
  | "custom_formula";

export interface ParticipationTransaction {
  id: string;
  propertyId: string;
  date: string;
  buyerId: string;
  sellerIds: string[];
  amount: number;
  valuationMethod: ValuationMethod;
  ownershipBefore: Record<string, number>;
  ownershipAfter: Record<string, number>;
  adminCostEstimate: number;
  notarialEvent: boolean;
  taxReviewFlag: boolean;
}

export interface PropertyValuation {
  id: string;
  propertyId: string;
  date: string;
  value: number;
  method: ValuationMethod;
  note?: string;
}

export type ExpenseCategory =
  | "property_tax"
  | "insurance"
  | "structural_maintenance"
  | "ordinary_maintenance"
  | "renovation"
  | "damage"
  | "vacancy"
  | "valuation_decline"
  | "transaction_costs"
  | "notarial_costs"
  | "administration_costs";

export interface PropertyExpense {
  id: string;
  propertyId: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  allocation: "pro_rata_ownership" | "resident" | "investors" | "shared_fixed";
}

export type StructureModel = "A" | "B" | "C" | "D" | "E";

export interface Property {
  id: string;
  name: LocalText;
  city: string;
  country: string;
  address: string;
  imageUrl: string;
  purchasePrice: number;
  currentValuation: number;
  monthlyRent: number;
  energyLabel: string;
  purchaseDate: string;
  structureModel: StructureModel;
  residentId: string;
  legalOwnership: LegalOwnership[];
  economicOwnership: EconomicOwnership[];
  valuationMethod: ValuationMethod;
  riskScore: 1 | 2 | 3 | 4 | 5;
  shariaReviewStatus: ReviewStatus;
  legalReviewStatus: ReviewStatus;
  taxReviewStatus: ReviewStatus;
}

export interface GovernanceProposal {
  id: string;
  title: LocalText;
  memo: LocalText;
  requiredCapital: number;
  votingDeadline: string;
  eligibleVoterIds: string[];
  votes: Vote[];
  status: "open" | "passed" | "rejected";
}

export interface Vote {
  participantId: string;
  choice: "for" | "against" | "abstain";
  weight: number;
  castAt: string;
}

export interface ComplianceRequirement {
  id: string;
  category:
    | "legal"
    | "tax"
    | "regulatory"
    | "aml_kyc"
    | "ubo"
    | "notarial"
    | "accounting"
    | "sharia";
  label: LocalText;
  status: "complete" | "in_progress" | "attention_required" | "not_applicable";
  propertyId?: string;
  detail?: LocalText;
}

export interface ShariaReview {
  id: string;
  propertyId: string;
  status: ReviewStatus;
  reviewer?: string;
  notes?: LocalText;
  updatedAt: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  folder:
    | "corporate"
    | "properties"
    | "participants"
    | "contracts"
    | "notarial_deeds"
    | "valuations"
    | "insurance"
    | "tax"
    | "accounting"
    | "sharia_opinions"
    | "governance_decisions";
  propertyId?: string;
  uploadedAt: string;
  status: "signed" | "draft" | "pending_signature";
}

export type LedgerTransactionType =
  | "capital_contribution"
  | "property_acquisition"
  | "usage_payment"
  | "participation_acquisition"
  | "property_expense"
  | "capital_distribution"
  | "property_sale"
  | "valuation_adjustment"
  | "administration_cost";

export interface LedgerEntry {
  id: string;
  timestamp: string;
  propertyId: string;
  participantId: string;
  type: LedgerTransactionType;
  amount: number;
  ownershipImpact: boolean;
  economicOwnershipBefore?: number;
  economicOwnershipAfter?: number;
  approvalStatus: "approved" | "pending" | "rejected";
  legalReviewStatus: ReviewStatus;
  shariaReviewStatus: ReviewStatus;
  documentRef?: string;
}

export interface Opportunity {
  id: string;
  property: Pick<
    Property,
    "name" | "city" | "imageUrl" | "purchasePrice" | "currentValuation" | "energyLabel" | "riskScore"
  >;
  residentContribution: number;
  capitalRequired: number;
  committed: number;
  proposedStructure: LocalText;
  proposedOccupancy: LocalText;
  closingDate: string;
}
