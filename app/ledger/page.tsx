"use client";

import { useMemo, useState } from "react";
import { ledgerEntries, TRANSACTION_TYPE_LABEL } from "@/data/ledger";
import { properties } from "@/data/properties";
import { useLanguage } from "@/lib/i18n/context";
import { LedgerTable } from "@/components/ledger-table";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import type { LedgerTransactionType } from "@/types/domain";

export default function LedgerPage() {
  const { locale, dict } = useLanguage();
  const [propertyFilter, setPropertyFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return ledgerEntries
      .filter((e) => propertyFilter === "all" || e.propertyId === propertyFilter)
      .filter((e) => typeFilter === "all" || e.type === typeFilter)
      .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
  }, [propertyFilter, typeFilter]);

  const types = Object.keys(TRANSACTION_TYPE_LABEL) as LedgerTransactionType[];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink-950">{dict.nav.ledger}</h1>
        <p className="mt-1 text-sm text-ink-600/70">
          {locale === "nl"
            ? `${ledgerEntries.length} transacties — een volledig auditeerbaar overzicht van elke beweging.`
            : `${ledgerEntries.length} transactions — un aperçu entièrement auditable de chaque mouvement.`}
        </p>
      </div>

      <DisclaimerBanner />

      <div className="flex flex-wrap gap-3">
        <select
          value={propertyFilter}
          onChange={(e) => setPropertyFilter(e.target.value)}
          className="rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
        >
          <option value="all">{locale === "nl" ? "Alle woningen" : "Tous les biens"}</option>
          {properties.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name[locale]}
            </option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
        >
          <option value="all">{locale === "nl" ? "Alle types" : "Tous les types"}</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {TRANSACTION_TYPE_LABEL[t][locale]}
            </option>
          ))}
        </select>
      </div>

      <LedgerTable entries={filtered} />
    </div>
  );
}
