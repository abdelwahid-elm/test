"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { propertyById } from "@/data/properties";
import { participantById } from "@/data/participants";
import { useLanguage } from "@/lib/i18n/context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatEUR } from "@/lib/utils";
import { OverviewTab } from "@/features/property/overview-tab";
import { OwnershipTab } from "@/features/property/ownership-tab";
import { CashFlowTab } from "@/features/property/cashflow-tab";
import { BuyoutTab } from "@/features/property/buyout-tab";
import { ShariaTab } from "@/features/property/sharia-tab";
import { ComplianceTab } from "@/features/property/compliance-tab";
import { GovernanceTab } from "@/features/property/governance-tab";
import { TransactionsTab } from "@/features/property/transactions-tab";
import { DocumentsTab } from "@/features/property/documents-tab";

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const property = propertyById(params.id);
  const { locale, pick } = useLanguage();

  if (!property) return notFound();

  const resident = participantById(property.residentId);

  const tabs = [
    { value: "overview", label: locale === "nl" ? "Overzicht" : "Aperçu", content: <OverviewTab property={property} /> },
    { value: "ownership", label: locale === "nl" ? "Eigendom" : "Propriété", content: <OwnershipTab property={property} /> },
    { value: "cashflow", label: locale === "nl" ? "Cashflow" : "Trésorerie", content: <CashFlowTab property={property} /> },
    { value: "buyout", label: locale === "nl" ? "Bijkoop" : "Rachat", content: <BuyoutTab property={property} /> },
    { value: "sharia", label: locale === "nl" ? "Sharia" : "Charia", content: <ShariaTab property={property} /> },
    { value: "compliance", label: locale === "nl" ? "Regels" : "Règles", content: <ComplianceTab property={property} /> },
    { value: "governance", label: locale === "nl" ? "Beslissingen" : "Décisions", content: <GovernanceTab property={property} /> },
    { value: "transactions", label: locale === "nl" ? "Transacties" : "Transactions", content: <TransactionsTab property={property} /> },
    { value: "documents", label: locale === "nl" ? "Documenten" : "Documents", content: <DocumentsTab property={property} /> },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Link href="/portfolio" className="flex w-fit items-center gap-1.5 text-sm text-ink-600/70 hover:text-ink-950">
        <ArrowLeft className="h-4 w-4" />
        {locale === "nl" ? "Terug naar portefeuille" : "Retour au portefeuille"}
      </Link>

      <div className="relative h-56 w-full overflow-hidden rounded-xl2 bg-ink-900/10 sm:h-72">
        <Image src={property.imageUrl} alt={pick(property.name)} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5 text-cream-50 sm:p-7">
          <p className="text-sm text-cream-100/80">{property.address} · {property.country}</p>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl">{pick(property.name)}</h1>
          <p className="mt-1 text-sm text-cream-100/70">
            {formatEUR(property.currentValuation)} ·{" "}
            {locale === "nl" ? "bewoond door" : "occupé par"} {resident?.name}
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          {tabs.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((t) => (
          <TabsContent key={t.value} value={t.value} className="mt-5">
            {t.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
