# pandr.de — canonical site repo

Static website for **PANDR** (Pandr UG). Local folder: `webseite` (GitHub: `blockchain_berlin`).

**Live domains (Vercel):**
- [pandr.de](https://pandr.de) — primary
- [blockchainberlin.de](https://www.blockchainberlin.de) → redirects to `/berlin-blockchain/`

**GitHub:** [bettabeta/blockchain_berlin](https://github.com/bettabeta/blockchain_berlin)

> The former Next.js repo (`bettabeta/pandr`) is retired — not deployed. Do not use.

## Stack

Static HTML/CSS/JS — no build step. Deployed as-is from repo root via Vercel (`vercel.json`).

## Local preview

```bash
npx serve .
# or
python3 -m http.server 8765
```

Open [http://localhost:8765](http://localhost:8765).

## Structure

- `index.html` — DE homepage (pandr.de)
- `en/` — EN pages
- `berlin-blockchain/` — blockchainberlin.de content
- `css/`, `js/`, `assets/` — styles, scripts, images
- `vercel.json` — domain redirects, rewrites, security headers

## Deploy

Push to `main` → Vercel auto-deploys. Root directory is repo root; no build command.
