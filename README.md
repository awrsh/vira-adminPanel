# Persian SaaS Starter Kit Pro

Premium Persian/English SaaS starter with **Atlas Editorial** design language, true RTL, modular architecture, and a Mock API — built to sell on RTL marketplaces.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript (strict)
- Tailwind CSS v4 · customized shadcn/ui · Framer Motion · Lucide
- TanStack Query · TanStack Table · React Hook Form · Zod · Zustand
- next-intl · ECharts · Axios (services) · Mock API (no backend)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000/fa](http://localhost:3000/fa).

**Demo login:** `admin@atlas.dev` / `password`  
Any `@atlas.dev` email with password `password` also works.

## Routes

| Path | Description |
|------|-------------|
| `/[locale]` | Marketing landing |
| `/[locale]/login` … `/two-factor` | Auth flows |
| `/[locale]/dashboard` | Widget home |
| `/[locale]/users` · `/products` · `/orders` | CRUD + DataTable |
| `/[locale]/settings` | Workspace settings |
| `/[locale]/design-system` | Design System QA |

Locales: `fa` (RTL, Vazirmatn) · `en` (LTR, Inter).

## Architecture

```
src/
  app/[locale]/          # App Router groups: marketing, auth, dashboard
  components/ui/         # Design System primitives (tokens only)
  components/layout/     # Floating shell
  components/shared/     # Empty/Error/Loading, PageHeader, DataTable, Chart
  features/*/module.ts   # Module registry entries
  lib/modules/registry.ts
  mocks/                 # Seeded DB (≥300 records) + delayed CRUD APIs
  services/              # Swap this layer for a real backend
  styles/tokens.css      # Atlas Editorial tokens
```

### Add a module (no shell rewrite)

1. Create `src/features/<name>/module.ts` exporting a `ModuleDefinition` (nav, commands, widgets, permissions).
2. Register it in [`src/lib/modules/registry.ts`](src/lib/modules/registry.ts).
3. Add an App Router page under `src/app/[locale]/(dashboard)/...`.
4. Add i18n keys to `messages/fa.json` and `messages/en.json`.

Nav, command palette, and permission gating pick up the module automatically.

### Design System rule

Screens consume CSS variables / Tailwind tokens from `src/styles/tokens.css` — do not hardcode hex, radii, or shadows in feature components.

Theme: light · dark · system. Dark canvas is `#121417`, not pure black.

## Scripts

```bash
npm run dev      # development
npm run build    # production build
npm run start    # serve build
npm run lint     # ESLint
```

## License

Commercial marketplace starter — configure your marketplace license terms before publishing.
