"use client";

import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/types/domain";
import { participantById } from "@/data/participants";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/context";
import { formatEUR } from "@/lib/utils";

export function PropertyCard({ property }: { property: Property }) {
  const { pick, locale } = useLanguage();
  const resident = participantById(property.residentId);
  const gain = property.currentValuation - property.purchasePrice;

  return (
    <Link href={`/portfolio/${property.id}`}>
      <Card className="group h-full overflow-hidden transition-shadow hover:shadow-elevated">
        <div className="relative h-44 w-full overflow-hidden bg-ink-900/10">
          <Image
            src={property.imageUrl}
            alt={pick(property.name)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute left-3 top-3 flex gap-1.5">
            <Badge variant="outline" className="bg-white/85">
              {property.energyLabel}
            </Badge>
            <Badge variant={property.riskScore <= 2 ? "emerald" : property.riskScore <= 3 ? "gold" : "warning"} className="bg-white/85">
              {locale === "nl" ? "Risico" : "Risque"} {property.riskScore}/5
            </Badge>
          </div>
        </div>
        <div className="p-5">
          <p className="font-serif text-lg text-ink-950">{pick(property.name)}</p>
          <p className="text-xs text-ink-600/70">{property.city}, {property.country}</p>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-ink-600/60">
                {locale === "nl" ? "Huidige waarde" : "Valeur actuelle"}
              </p>
              <p className="font-serif text-xl text-ink-950">{formatEUR(property.currentValuation)}</p>
            </div>
            <p className={gain >= 0 ? "text-xs font-medium text-emerald-700" : "text-xs font-medium text-red-600"}>
              {gain >= 0 ? "+" : ""}
              {formatEUR(gain)}
            </p>
          </div>

          <div className="mt-4 flex items-center gap-2 border-t border-ink-900/8 pt-3 text-xs text-ink-600/70">
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold text-white"
              style={{ backgroundColor: resident?.color }}
            >
              {resident?.initials}
            </span>
            {locale === "nl" ? "Bewoond door" : "Occupé par"} {resident?.name}
          </div>
        </div>
      </Card>
    </Link>
  );
}
