# Deploying redwaterrev.com

**As of 2026-07-17 this site is hosted on Vercel, not GitHub Pages.** We moved off Pages because
GitHub's terms don't allow using Pages to host a commercial business site.

## Deploy

```bash
npx vercel deploy --prod --yes --token $VERCEL_TOKEN_NICK --scope nick-1485s-projects
```

Run it from the repo root. That's the whole deploy — there is no git-push-triggered build anymore
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
