import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Dar Capital — Familiekapitaal voor vastgoed",
  description:
    "Werkend prototype: gecoördineerd familiekapitaal voor vastgoed, met halal-bewuste structuren. Geen juridisch, fiscaal of religieus advies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
