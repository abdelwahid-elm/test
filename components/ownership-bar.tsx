import { participantById } from "@/data/participants";
import { formatEUR, formatPercent } from "@/lib/utils";

export function OwnershipBar({
  entries,
  currentValuation,
}: {
  entries: { participantId: string; percentage: number }[];
  currentValuation: number;
}) {
  const sorted = [...entries].sort((a, b) => b.percentage - a.percentage);
  return (
    <div className="flex flex-col gap-4">
      {sorted.map((entry) => {
        const p = participantById(entry.participantId);
        return (
          <div key={entry.participantId}>
            <div className="mb-1.5 flex items-baseline justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-700">
                {p?.name ?? entry.participantId}
              </p>
              <p className="text-xs text-ink-600/70">
                {formatPercent(entry.percentage)} · {formatEUR((entry.percentage / 100) * currentValuation)}
              </p>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full ownership-bar-track bg-ink-900/5">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${entry.percentage}%`, backgroundColor: p?.color ?? "#33654a" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
