"use client";

import type { Property } from "@/types/domain";
import { ledgerForProperty } from "@/data/ledger";
import { LedgerTable } from "@/components/ledger-table";

export function TransactionsTab({ property }: { property: Property }) {
  const entries = [...ledgerForProperty(property.id)].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
  return <LedgerTable entries={entries} showProperty={false} />;
}
