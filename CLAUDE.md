# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server with HMR → http://localhost:5173
npm run build     # TypeScript check + Vite production build → /dist
npm run preview   # Serve the production build locally
npm run lint      # ESLint (max-warnings 0 — all warnings are errors)
```

No test suite is configured.

## Architecture

**CsmbqWeb** is the public website for Clínica San Martín de Barranquilla — a React 18 + TypeScript SPA built with Vite. It is a pure frontend app with no backend; all external data comes from environment variables and third-party portals.

### Routing

`src/routes/index.tsx` — React Router v6, all pages are **lazy-loaded** via `React.lazy`. The `<Layout>` component wraps all routes and renders `<Navbar>`, `<Outlet>`, and `<Footer>`. The splash screen in `App.tsx` fires once per session (via `sessionStorage`).

Routes: `/` → HomePage, `/transparencia-financiera`, `/nosotros/historia`, `/nosotros/organigrama`, `/nosotros/plan-estrategico`, `/nosotros/politicas`, `/pacientes`.

### Content & Data

**All editable content lives in `src/constants/index.ts`** — nav links, specialties, services, stats, result portal URLs, contact info, and social links. When adding or changing displayed text/data, start here.

Types for all data structures are in `src/types/index.ts`.

### State Management

`src/store/appStore.ts` — Zustand store with two concerns: navbar scroll state (`isNavScrolled`) and mobile menu toggle (`isMobileMenuOpen`). `useNavScroll.ts` drives `isNavScrolled` on scroll events.

### Animations

Reusable Framer Motion variants are in `src/utils/animations.ts` (`fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`, `scaleIn`, `staggerContainer`, etc.). Use `VIEWPORT_CONFIG` (`{ once: true, amount: 0.2 }`) and `SPRING` timing constants from that file rather than defining new ones inline.

### Styling

Tailwind CSS with a clinic-branded theme defined in `tailwind.config.js`:
- Primary colors: `clinic-500` (#1B5EA6), `clinic-700` (#0D3B6E), `clinic-50` (#EBF3FF)
- Dark background: `dark` (#0A1628)
- Custom shadows: `shadow-clinic`, `shadow-glass`, `shadow-float`, `shadow-card`
- Custom animations: `animate-float`, `animate-shimmer`, `animate-slide-up`
- Fonts: `font-sans` (Inter), `font-display` (Outfit)

### Environment Variables

All prefixed `VITE_`. See `.env.example` for the full list. Key ones: `VITE_URL_LABORATORIO` and `VITE_URL_IMAGENES_DX` (external result portals), `VITE_GOOGLE_MAPS_EMBED_URL`, `VITE_GA_MEASUREMENT_ID`.

### Deployment

Build output goes to `/dist`. The `public/.htaccess` handles React Router client-side routing on the GoDaddy shared hosting target. The `public/logo.png` file must be present (it is referenced by Navbar, Footer, and the About section).

### Path Alias

`@/` maps to `./src/` in both TypeScript (`tsconfig.json`) and Vite (`vite.config.ts`). Always use `@/` imports instead of relative paths that go up more than one level.
