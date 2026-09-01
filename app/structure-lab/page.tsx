"use client";

import { structureLabModels, structureLabRows } from "@/data/structure-lab";
import { useLanguage } from "@/lib/i18n/context";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DisclaimerBanner } from "@/components/disclaimer-banner";

export default function StructureLabPage() {
  const { locale, dict, pick } = useLanguage();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink-950">{dict.nav.structureLab}</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-600/70">
          {locale === "nl"
            ? "De definitieve Belgische juridische structuur is nog niet gekozen. Vergelijk hieronder vijf hypothetische modellen — niets hier is al bevestigd."
            : "La structure juridique belge définitive n'a pas encore été choisie. Comparez ci-dessous cinq modèles hypothétiques — rien n'est encore confirmé."}
        </p>
      </div>

      <DisclaimerBanner />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {structureLabModels.map((m) => (
          <Card key={m.model} className="p-4">
            <p className="font-serif text-sm text-ink-950">{pick(m.name)}</p>
            <p className="mt-1 text-xs text-ink-600/70">{pick(m.description)}</p>
          </Card>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl2 border border-ink-900/8 bg-white shadow-card">
        <table className="w-full min-w-[1100px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-ink-900/8">
              <th className="sticky left-0 z-10 bg-white px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-ink-600/60">
                {locale === "nl" ? "Aspect" : "Aspect"}
              </th>
              {structureLabModels.map((m) => (
                <th key={m.model} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-ink-600/60">
                  {locale === "nl" ? "Model" : "Modèle"} {m.model}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {structureLabRows.map((row) => (
              <tr key={row.key} className="border-b border-ink-900/6 last:border-0">
                <td className="sticky left-0 z-10 bg-white px-4 py-3 font-medium text-ink-900">{pick(row.label)}</td>
                {structureLabModels.map((m) => {
                  const text = pick(m.cells[row.key]);
                  const requiresValidation = text.toLowerCase().includes(locale === "nl" ? "vereist professionele" : "nécessite une");
                  return (
                    <td key={m.model} className="px-4 py-3 align-top text-ink-700">
                      {requiresValidation ? <Badge variant="warning">{text}</Badge> : text}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
