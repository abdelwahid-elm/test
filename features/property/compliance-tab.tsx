"use client";

import type { Property } from "@/types/domain";
import { useLanguage } from "@/lib/i18n/context";
import { complianceRequirements } from "@/data/compliance";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, AlertTriangle } from "lucide-react";

const STATUS_ICON = {
  complete: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
  in_progress: <Circle className="h-4 w-4 text-ink-600/40" />,
  attention_required: <AlertTriangle className="h-4 w-4 text-amber-600" />,
  not_applicable: <Circle className="h-4 w-4 text-ink-600/20" />,
};

export function ComplianceTab({ property }: { property: Property }) {
  const { locale, pick } = useLanguage();
  const items = complianceRequirements.filter((c) => !c.propertyId || c.propertyId === property.id);

  return (
    <Card className="flex flex-col divide-y divide-ink-900/6 p-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-3 p-3.5">
          {STATUS_ICON[item.status]}
          <div className="flex-1">
            <p className="text-sm font-medium text-ink-900">{pick(item.label)}</p>
            {item.detail && <p className="mt-0.5 text-xs text-ink-600/70">{pick(item.detail)}</p>}
          </div>
          <Badge variant={item.status === "complete" ? "emerald" : item.status === "attention_required" ? "warning" : "neutral"}>
            {item.status === "complete"
              ? locale === "nl" ? "Voltooid" : "Terminé"
              : item.status === "attention_required"
              ? locale === "nl" ? "Aandacht nodig" : "Attention requise"
              : item.status === "in_progress"
              ? locale === "nl" ? "Bezig" : "En cours"
              : locale === "nl" ? "N.v.t." : "N/A"}
          </Badge>
        </div>
      ))}
      {items.length === 0 && (
        <p className="p-4 text-sm text-ink-600/70">
          {locale === "nl" ? "Geen specifieke compliance-items voor deze woning." : "Aucun élément de conformité spécifique pour ce bien."}
        </p>
      )}
    </Card>
  );
}
