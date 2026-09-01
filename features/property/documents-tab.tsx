"use client";

import type { Property } from "@/types/domain";
import { useLanguage } from "@/lib/i18n/context";
import { documentsForProperty } from "@/data/documents";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";

const FOLDER_LABEL: Record<string, { nl: string; fr: string }> = {
  notarial_deeds: { nl: "Notariële akten", fr: "Actes notariés" },
  contracts: { nl: "Contracten", fr: "Contrats" },
  valuations: { nl: "Waarderingen", fr: "Évaluations" },
  insurance: { nl: "Verzekering", fr: "Assurance" },
  sharia_opinions: { nl: "Sharia-adviezen", fr: "Avis charia" },
  tax: { nl: "Fiscaliteit", fr: "Fiscalité" },
};

export function DocumentsTab({ property }: { property: Property }) {
  const { locale } = useLanguage();
  const docs = documentsForProperty(property.id);

  return (
    <Card className="flex flex-col divide-y divide-ink-900/6 p-2">
      {docs.map((d) => (
        <div key={d.id} className="flex items-center gap-3 p-3.5">
          <FileText className="h-4 w-4 text-ink-600/50" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-900">{d.name}</p>
            <p className="text-xs text-ink-600/60">
              {FOLDER_LABEL[d.folder]?.[locale] ?? d.folder} · {formatDate(d.uploadedAt, locale)}
            </p>
          </div>
          <Badge variant={d.status === "signed" ? "emerald" : d.status === "draft" ? "neutral" : "warning"}>
            {d.status === "signed"
              ? locale === "nl" ? "Ondertekend" : "Signé"
              : d.status === "draft"
              ? locale === "nl" ? "Ontwerp" : "Brouillon"
              : locale === "nl" ? "Handtekening in behandeling" : "Signature en attente"}
          </Badge>
        </div>
      ))}
    </Card>
  );
}
