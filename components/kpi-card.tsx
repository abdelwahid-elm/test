import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function KpiCard({
  label,
  value,
  sub,
  icon,
  className,
}: {
  label: ReactNode;
  value: string;
  sub?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl2 border border-ink-900/8 bg-white p-5 shadow-card", className)}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-600/70">{label}</p>
        {icon}
      </div>
      <p className="mt-2 font-serif text-2xl text-ink-950">{value}</p>
      {sub && <div className="mt-1 text-xs text-ink-600/70">{sub}</div>}
    </div>
  );
}
