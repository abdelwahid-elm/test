import type { LedgerEntry, LedgerTransactionType, ReviewStatus } from "@/types/domain";
import { properties } from "./properties";
import { valuations } from "./valuations";
import { mulberry32 } from "./seeded-random";

const rand = mulberry32(20260901);
let counter = 0;
function nextId(prefix: string) {
  counter += 1;
  return `${prefix}-${counter.toString().padStart(4, "0")}`;
}

function addMonths(iso: string, months: number): string {
  const d = new Date(iso);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

const NOW = new Date("2026-09-01");

function monthsSince(iso: string): number {
  const d = new Date(iso);
  let months = (NOW.getFullYear() - d.getFullYear()) * 12 + (NOW.getMonth() - d.getMonth());
  if (NOW.getDate() < d.getDate()) months -= 1;
  return Math.max(0, months);
}

function pushEntry(
  list: LedgerEntry[],
  args: Omit<LedgerEntry, "id" | "timestamp" | "approvalStatus" | "legalReviewStatus" | "shariaReviewStatus"> & {
    timestamp: string;
    legalReviewStatus?: ReviewStatus;
    shariaReviewStatus?: ReviewStatus;
  }
) {
  list.push({
    id: nextId("txn"),
    approvalStatus: "approved",
    legalReviewStatus: args.legalReviewStatus ?? "approved",
    shariaReviewStatus: args.shariaReviewStatus ?? "approved",
    ...args,
  });
}

function generateLedger(): LedgerEntry[] {
  const entries: LedgerEntry[] = [];

  for (const property of properties) {
    // 1. Initial capital contributions + acquisition
    for (const owner of property.economicOwnership) {
      pushEntry(entries, {
        propertyId: property.id,
        participantId: owner.participantId,
        type: "capital_contribution",
        amount: Math.round((property.purchasePrice * owner.percentage) / 100),
        ownershipImpact: true,
        economicOwnershipBefore: 0,
        economicOwnershipAfter: owner.percentage,
        timestamp: property.purchaseDate,
        documentRef: `${property.id}-participation-agreement.pdf`,
      });
    }
    pushEntry(entries, {
      propertyId: property.id,
      participantId: property.residentId,
      type: "property_acquisition",
      amount: property.purchasePrice,
      ownershipImpact: false,
      timestamp: property.purchaseDate,
      legalReviewStatus: "approved",
      documentRef: `${property.id}-deed.pdf`,
    });

    // 2. Valuation adjustments (mirrors valuations.ts, excluding first point)
    const propValuations = valuations.filter((v) => v.propertyId === property.id);
    propValuations.slice(1).forEach((v) => {
      pushEntry(entries, {
        propertyId: property.id,
        participantId: property.residentId,
        type: "valuation_adjustment",
        amount: v.value,
        ownershipImpact: false,
        timestamp: v.date,
        legalReviewStatus: "requires_professional_validation",
      });
    });

    // 3. Usage payments — up to the last 6 months, never before the purchase date
    const monthsOwned = monthsSince(property.purchaseDate);
    const paymentMonths = Math.min(6, monthsOwned);
    for (let i = paymentMonths; i >= 1; i--) {
      const d = new Date(NOW);
      d.setMonth(d.getMonth() - i);
      const investorShare = 100 - (property.economicOwnership.find((o) => o.participantId === property.residentId)?.percentage ?? 50);
      const amount = Math.round(property.monthlyRent * (investorShare / 100) * (0.96 + rand() * 0.08));
      pushEntry(entries, {
        propertyId: property.id,
        participantId: property.residentId,
        type: "usage_payment",
        amount,
        ownershipImpact: false,
        timestamp: d.toISOString().slice(0, 10),
      });
    }

    // 4. Property expenses — one insurance premium, one maintenance event, both within the ownership period
    if (monthsOwned >= 2) {
      pushEntry(entries, {
        propertyId: property.id,
        participantId: property.residentId,
        type: "property_expense",
        amount: Math.round(property.currentValuation * 0.0028),
        ownershipImpact: false,
        timestamp: addMonths(property.purchaseDate, 2),
      });
    }
    if (monthsOwned >= 5) {
      pushEntry(entries, {
        propertyId: property.id,
        participantId: property.residentId,
        type: "property_expense",
        amount: Math.round(300 + rand() * 900),
        ownershipImpact: false,
        timestamp: addMonths(property.purchaseDate, 5),
      });
    }
  }

  // 5. Buy-out narrative for Vilvoorde: Abdelwahid 50% -> 58% over the first year, one step every 2 months
  const vilvoorde = properties.find((p) => p.id === "prop-vilvoorde")!;
  let youssefPct = 50;
  let omarPct = 30;
  let saraPct = 20;
  const vilvoordeMonthsOwned = monthsSince(vilvoorde.purchaseDate);
  const buyoutSteps = Math.min(6, Math.floor(vilvoordeMonthsOwned / 2));
  for (let i = 1; i <= buyoutSteps; i++) {
    const amount = 600 + Math.round(rand() * 200);
    const before = { "p-youssef": youssefPct, "p-omar": omarPct, "p-sara": saraPct };
    const acquiredPct = (amount / vilvoorde.currentValuation) * 100;
    const omarShare = omarPct / (omarPct + saraPct);
    omarPct -= acquiredPct * omarShare;
    saraPct -= acquiredPct * (1 - omarShare);
    youssefPct += acquiredPct;
    pushEntry(entries, {
      propertyId: vilvoorde.id,
      participantId: "p-youssef",
      type: "participation_acquisition",
      amount,
      ownershipImpact: true,
      economicOwnershipBefore: before["p-youssef"],
      economicOwnershipAfter: Math.round(youssefPct * 10) / 10,
      timestamp: addMonths(vilvoorde.purchaseDate, i * 2),
      legalReviewStatus: i % 3 === 0 ? "approved" : "pending_tax_review",
    });
    pushEntry(entries, {
      propertyId: vilvoorde.id,
      participantId: "p-youssef",
      type: "administration_cost",
      amount: Math.round(amount * 0.015),
      ownershipImpact: false,
      timestamp: addMonths(vilvoorde.purchaseDate, i * 2),
    });
  }

  // 6. One early buy-out for the more recently acquired Grimbergen home
  const grimbergen = properties.find((p) => p.id === "prop-grimbergen");
  if (grimbergen && monthsSince(grimbergen.purchaseDate) >= 3) {
    const amount = 500 + Math.round(rand() * 250);
    pushEntry(entries, {
      propertyId: grimbergen.id,
      participantId: grimbergen.residentId,
      type: "participation_acquisition",
      amount,
      ownershipImpact: true,
      economicOwnershipBefore: grimbergen.economicOwnership.find((o) => o.participantId === grimbergen.residentId)?.percentage,
      economicOwnershipAfter: (grimbergen.economicOwnership.find((o) => o.participantId === grimbergen.residentId)?.percentage ?? 0) + 1.2,
      timestamp: addMonths(grimbergen.purchaseDate, 3),
      legalReviewStatus: "pending_tax_review",
    });
    pushEntry(entries, {
      propertyId: grimbergen.id,
      participantId: grimbergen.residentId,
      type: "administration_cost",
      amount: Math.round(amount * 0.015),
      ownershipImpact: false,
      timestamp: addMonths(grimbergen.purchaseDate, 3),
    });
  }

  return entries.sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1));
}

export const ledgerEntries = generateLedger();

export function ledgerForProperty(propertyId: string): LedgerEntry[] {
  return ledgerEntries.filter((e) => e.propertyId === propertyId);
}

export function ledgerForParticipant(participantId: string): LedgerEntry[] {
  return ledgerEntries.filter((e) => e.participantId === participantId);
}

export const TRANSACTION_TYPE_LABEL: Record<LedgerTransactionType, { nl: string; fr: string }> = {
  capital_contribution: { nl: "Kapitaalinbreng", fr: "Apport en capital" },
  property_acquisition: { nl: "Aankoop woning", fr: "Acquisition du bien" },
  usage_payment: { nl: "Gebruiksvergoeding", fr: "Indemnité d'usage" },
  participation_acquisition: { nl: "Bijkoop participatie", fr: "Rachat de participation" },
  property_expense: { nl: "Kosten woning", fr: "Frais du bien" },
  capital_distribution: { nl: "Kapitaaluitkering", fr: "Distribution de capital" },
  property_sale: { nl: "Verkoop woning", fr: "Vente du bien" },
  valuation_adjustment: { nl: "Waardering bijgewerkt", fr: "Réévaluation" },
  administration_cost: { nl: "Administratiekosten", fr: "Frais administratifs" },
};
