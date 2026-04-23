# Redwater Revenue — redwaterrev.com

Marketing site for Redwater Revenue, Nick Rougeau's AI automation agency. Target ICP: coaches, lawyers, consultants, professional services, and agencies.

## Stack

- React 19 + TypeScript + Vite
- Tailwind v4
- `motion` / `framer-motion` for animation
- `react-router-dom` v7 (SPA, lazy-loaded routes)
- `react-helmet-async` for per-route SEO
- `@supabase/supabase-js` for contact-form inserts (insert-only RLS)
- Custom Scheduler component (Google Calendar via Supabase Edge Function) — see `supabase/functions/calendar/`
- Honeypot + min-time-to-submit for bot protection
- Plausible for privacy-friendly analytics

## Local dev

```bash
cp .env.example .env.local   # fill in the values
npm ci --legacy-peer-deps
npm run dev
```

Open http://localhost:5173.

## Env vars

See `.env.example`. All client-side vars are prefixed `VITE_` and are public at build time. The Supabase anon key is protected by insert-only RLS on the `website_leads` table — never expose service-role keys here.

## Deploy

Push to `main`. GitHub Actions (`.github/workflows/deploy.yml`) runs:

```
npm ci --legacy-peer-deps
npm run build
# uploads dist/ → Pages → https://redwaterrev.com
```

`public/CNAME`, `public/404.html` (SPA fallback), `public/robots.txt`, and `public/sitemap.xml` survive builds. Configure build-time env vars as GitHub Actions secrets (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_CONVERTKIT_FORM_ID`, `VITE_SCHEDULER_API_URL`, `VITE_PLAUSIBLE_DOMAIN`).

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — `tsc --noEmit` type check
