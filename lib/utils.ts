import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEUR(amount: number, decimals = 0): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals).replace(".", ",")}%`;
}

export function formatDate(iso: string, locale: "nl" | "fr" = "nl"): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(locale === "nl" ? "nl-BE" : "fr-BE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}
