"use client";

import Link from "next/link";
import { ArrowUpRight, Building2, Sparkles, Wallet2, ShieldAlert, Vote } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { KpiCard } from "@/components/kpi-card";
import { PortfolioGrowthChart } from "@/components/charts/portfolio-growth-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Glossary } from "@/components/glossary";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { familyKpis, portfolioGrowthSeries } from "@/lib/domain/family-kpis";
import { properties } from "@/data/properties";
import { opportunities } from "@/data/opportunities";
import { complianceRequirements } from "@/data/compliance";
import { governanceProposals } from "@/data/governance";
import { formatEUR } from "@/lib/utils";

export default function HomePage() {
  const { dict, pick } = useLanguage();
  const kpis = familyKpis();
  const series = portfolioGrowthSeries();
  const growth12m = kpis.familyNav - series[Math.max(0, series.length - 13)].value;
  const attentionItems = complianceRequirements.filter((c) => c.status === "attention_required").length;
  const openVotes = governanceProposals.filter((g) => g.status === "open").length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink-950 lg:text-3xl">
          {dict.dashboard.greeting}, Abdelwahid
        </h1>
        <p className="mt-1 max-w-xl text-sm text-ink-600/80">{dict.dashboard.subtitle}</p>
      </div>

      <DisclaimerBanner />

      <Card className="overflow-hidden bg-ink-950 text-cream-50">
        <CardContent className="p-6 lg:p-8">
          <p className="text-xs font-medium uppercase tracking-wide text-cream-100/50">
            {dict.dashboard.familyNav}
          </p>
          <div className="mt-2 flex flex-wrap items-end gap-4">
            <p className="font-serif text-4xl lg:text-5xl">{formatEUR(kpis.familyNav)}</p>
            <span className="mb-1 flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-300">
              <ArrowUpRight className="h-3.5 w-3.5" />
              {formatEUR(Math.max(0, growth12m))} ({dict.dashboard.last12m})
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <MiniStat label={dict.dashboard.propertyValue} value={formatEUR(kpis.totalPropertyValue)} />
            <MiniStat label={dict.dashboard.availableCapital} value={formatEUR(kpis.availableCapital)} />
            <MiniStat label={dict.dashboard.capitalDeployed} value={formatEUR(kpis.capitalDeployed)} />
            <MiniStat label={dict.dashboard.monthlyCashflow} value={formatEUR(kpis.monthlyCashflow)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{dict.dashboard.portfolioGrowth}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <PortfolioGrowthChart data={series} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          href="/portfolio"
          icon={<Building2 className="h-4 w-4 text-emerald-700" />}
          title={dict.dashboard.portfolioTitle}
          value={`${properties.length}`}
          sub={dict.dashboard.propertiesCount}
        />
        <SummaryCard
          href="/opportunities"
          icon={<Sparkles className="h-4 w-4 text-gold-600" />}
          title={dict.dashboard.opportunitiesTitle}
          value={`${opportunities.length}`}
          sub={dict.dashboard.activeCount}
        />
        <SummaryCard
          href="/portfolio/prop-vilvoorde?tab=buyout"
          icon={<Wallet2 className="h-4 w-4 text-emerald-700" />}
          title={dict.dashboard.upcomingBuyouts}
          value={formatEUR(4300)}
          sub={dict.dashboard.thisMonth}
        />
        <SummaryCard
          href="/compliance"
          icon={<ShieldAlert className="h-4 w-4 text-amber-600" />}
          title={dict.dashboard.complianceTitle}
          value={`${attentionItems}`}
          sub={dict.dashboard.itemsNeedAttention}
          variant={attentionItems > 0 ? "warning" : "neutral"}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SummaryCard
          href="/governance"
          icon={<Vote className="h-4 w-4 text-emerald-700" />}
          title={dict.dashboard.governanceTitle}
          value={`${openVotes}`}
          sub={dict.dashboard.votePending}
        />
        <Card className="flex items-center gap-3 p-5">
          <span className="text-sm text-ink-600">
            <Glossary term="economicOwnership" /> {" "}
            {pick({
              nl: "Economisch eigendom kan afwijken van wie op papier eigenaar staat — bekijk dit per woning.",
              fr: "La propriété économique peut différer du propriétaire sur papier — consultez cela par logement.",
            })}
          </span>
        </Card>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-cream-100/45">{label}</p>
      <p className="mt-1 font-serif text-lg text-cream-50">{value}</p>
    </div>
  );
}

function SummaryCard({
  href,
  icon,
  title,
  value,
  sub,
  variant = "neutral",
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  value: string;
  sub: string;
  variant?: "neutral" | "warning";
}) {
  return (
    <Link href={href}>
      <Card className="h-full p-5 transition-shadow hover:shadow-elevated">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-ink-600/70">{title}</p>
          {icon}
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <p className="font-serif text-2xl text-ink-950">{value}</p>
          <Badge variant={variant === "warning" ? "warning" : "neutral"}>{sub}</Badge>
        </div>
      </Card>
    </Link>
  );
}
