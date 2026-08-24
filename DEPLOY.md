# Deploying redwaterrev.com

**As of 2026-07-17 this site is hosted on Vercel, not GitHub Pages.** We moved off Pages because
GitHub's terms don't allow using Pages to host a commercial business site.

## Deploy

```bash
VERCEL_TOKEN=$VERCEL_TOKEN_BUSINESS npx vercel deploy --prod --yes
```

Run it from the repo root, with `VERCEL_TOKEN_BUSINESS` from `Recovered/.env`.

> **Corrected 2026-08-24.** This file previously said `--token $VERCEL_TOKEN_NICK --scope
> nick-1485s-projects`. **`VERCEL_TOKEN_NICK` does not exist** on any machine and never did.
> This project (`redwater-site-vercel`) lives in the same team as the demo hub,
> `nick-1485s-projects` / `team_zOv3ovwPkca8EdoWCo5DKrzq`, so the one real token deploys both.
> The scope flag is unnecessary once the folder is linked.
>
> Also: the repo ships **no `.vercel/` linkage**. Running `vercel deploy` from an unlinked
> folder creates a NEW project named after the directory instead of deploying this site. If
> `.vercel/project.json` is missing, write it pointing at `prj_gNxsPNhXqQYyGrA5G4wCV6eTs0Y7`
> before deploying.

That's the whole deploy — there is no git-push-triggered build anymore
(Vercel isn't connected to GitHub here, because that link needs an interactive OAuth login).

Drop `--prod` for a preview deploy you can check before promoting.

## Why `vercel.json` exists

```json
{ "installCommand": "npm install --legacy-peer-deps" }
```

`react-helmet-async` declares a React peer range that conflicts with the React version this project
resolves to. GitHub Actions never hit it because CI installed straight from the lockfile; Vercel's
default `npm install` re-resolves the tree and fails with `ERESOLVE`. The override keeps installs
working. If the dependency conflict is ever fixed properly, this file can go.

## Notes

- The old GitHub Pages workflow and `public/CNAME` are leftovers from Pages. Vercel ignores them.
  Safe to remove once the DNS cutover has settled and we're sure we aren't going back.
- Build is a plain `vite build` (output `dist/`); Vercel detects the framework automatically.
