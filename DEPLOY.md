# Deploy to production (https://historicreenactors.com)

This project uses **static export** so the site can be served from a static document root (no Node required). See [docs/WHY-SITE-NOT-WORKING.md](docs/WHY-SITE-NOT-WORKING.md) for context.

**If the live site still shows the old design:** the domain is serving files from a folder on your host. You must upload the new site (contents of `out/`) into that **exact document root** (e.g. `public_html`). Use either option below.

---

## Deploy options

### Option A: Push to Git → automatic deploy (recommended)

1. **One-time:** In the repo go to **Settings → Secrets and variables → Actions**. Add:
   - `FTP_HOST` – your FTP hostname  
   - `FTP_USER` – FTP username  
   - `FTP_PASSWORD` – FTP password  
   - `FTP_REMOTE_DIR` – **document root** for historicreenactors.com (e.g. `public_html`). Find it in your host’s panel (e.g. Domains → document root).
2. Commit and push to `master`:
   ```bash
   git add -A && git commit -m "Deploy static site" && git push origin master
   ```
3. GitHub Actions will build and upload `out/` to `FTP_REMOTE_DIR`. After the workflow succeeds, https://historicreenactors.com should show the new site.

### Option B: Deploy from your machine

1. Set `.env` as in **§2** below (FTP_* and optionally FTP_REMOTE_DIR).
2. Run: `npm run deploy`

---

## 1. One-time: Forms (static export has no API)

Contact and booking forms need an external endpoint. Recommended: [Formspree](https://formspree.io).

1. Create two forms at Formspree (Contact, Booking).
2. In `.env` set:
   - `NEXT_PUBLIC_CONTACT_FORM_ACTION=https://formspree.io/f/your-contact-form-id`
   - `NEXT_PUBLIC_BOOKING_FORM_ACTION=https://formspree.io/f/your-booking-form-id`
3. Rebuild and redeploy so the built site uses these URLs.

---

## 2. One-time: FTP and document root

For **Option B** (local deploy), in `.env` set:

- `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD` (your host’s FTP credentials).
- `FTP_REMOTE_DIR` = the **document root** for historicreenactors.com (e.g. `public_html`). The script uploads the contents of `out/` into this folder so `index.html` is at the domain root. If you don’t set this, uploads go to your FTP user’s home directory, which may not be what the domain serves.

---

## 3. Deploy (every time)

From your machine:

```bash
npm run deploy
```

This runs `next build` (producing `out/`) then uploads the contents of `out/` to `FTP_REMOTE_DIR`. After upload, the live site is the new static site.

- **Upload only** (reuse existing build): `npm run deploy -- --ftp-only` or `SKIP_BUILD=1 node scripts/deploy-static.mjs`
- **Build only** (no upload): `npm run build` — output is in `out/`.

---

## Other methods

- **SSH deploy** (if you later run Node on the server): `npm run deploy:ssh`. Requires repo cloned on server and `SSH_*` in `.env`. See GitHub Actions and server setup in repo history if needed.
- **FTP legacy** (uploads source + .next for Node): `npm run deploy:ftp` — only use if you switch back to running the app with Node.

---

## Troubleshooting

| Issue | Action |
|-------|--------|
| Forms don’t submit | Set `NEXT_PUBLIC_CONTACT_FORM_ACTION` and `NEXT_PUBLIC_BOOKING_FORM_ACTION` in `.env`, then rebuild and redeploy. |
| Old site still showing | Ensure `FTP_REMOTE_DIR` is the domain’s actual document root and run `npm run deploy` again. |
| FTP connection fails | Check `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD`; use `npm run test-ftp` to verify. |
