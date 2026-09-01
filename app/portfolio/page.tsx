"use client";

import { useLanguage } from "@/lib/i18n/context";
import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/property-card";
import { DisclaimerBanner } from "@/components/disclaimer-banner";

export default function PortfolioPage() {
  const { locale } = useLanguage();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink-950">
          {locale === "nl" ? "Familieportefeuille" : "Portefeuille familial"}
        </h1>
        <p className="mt-1 text-sm text-ink-600/70">
          {locale === "nl"
            ? `${properties.length} woningen — elk met een eigen eigendoms- en bewoningsstructuur.`
            : `${properties.length} logements — chacun avec sa propre structure de propriété et d'occupation.`}
        </p>
      </div>

      <DisclaimerBanner />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}
