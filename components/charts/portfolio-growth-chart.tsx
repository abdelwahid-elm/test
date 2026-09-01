"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatEUR } from "@/lib/utils";

export function PortfolioGrowthChart({ data }: { data: { month: string; value: number }[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="navFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#33654a" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#33654a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            tickFormatter={(m: string) => m.slice(2, 7)}
            tick={{ fontSize: 11, fill: "#39423b99" }}
            axisLine={false}
            tickLine={false}
            interval={3}
          />
          <YAxis
            tickFormatter={(v: number) => `€${Math.round(v / 1000)}k`}
            tick={{ fontSize: 11, fill: "#39423b99" }}
            axisLine={false}
            tickLine={false}
            width={52}
          />
          <Tooltip
            formatter={(v: number) => formatEUR(v)}
            labelFormatter={(m: string) => m}
            contentStyle={{ borderRadius: 12, border: "1px solid rgba(11,13,12,0.08)", fontSize: 12 }}
          />
          <Area type="monotone" dataKey="value" stroke="#294f3b" strokeWidth={2} fill="url(#navFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
