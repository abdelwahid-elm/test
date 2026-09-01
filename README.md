# Dar Capital (werknaam / nom provisoire)

Interactief prototype van een Belgisch halal familie-vastgoedplatform. Gebouwd met Next.js
(App Router), TypeScript, Tailwind CSS en Recharts. Beschikbaar in het Nederlands en Frans.

**Dit is geen juridisch, fiscaal of religieus advies.** Alle structuren, cijfers en
statussen zijn voorbeelddata voor een werkend ontwerp-prototype.

## Starten

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structuur

- `app/` — pagina's per module (dashboard, portefeuille, kansen, familie, kasboek,
  beslissingen, regels & controle, sharia, structuren vergelijken, toekomstsimulatie)
- `components/` — herbruikbare UI-bouwstenen
- `features/property/` — tabs van de woningdetailpagina (eigendom, cashflow, bijkoop, sharia, ...)
- `lib/domain/` — pure, testbare financiële rekenlogica (eigendom, gebruiksvergoeding,
  pad-naar-100%, bijkoopsimulatie, familievermogen-simulator)
- `lib/i18n/` — NL/FR-vertaalsysteem en begrippenlijst (tooltips in eenvoudige taal)
- `data/` — demo-dataset (15 familieleden, 12 woningen in België en Marokko, kansen, kasboek, governance, compliance)
- `types/domain.ts` — het domeinmodel (eigendom, kapitaal, transacties, governance, compliance, sharia)
