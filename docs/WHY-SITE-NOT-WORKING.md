# Why https://historicreenactors.com Was Not Showing the New Site

## What we found

| URL | Result |
|-----|--------|
| https://historicreenactors.com | **200** – Served the **old site** (“Bring History to Life Today”, different layout, Unsplash gallery) |
| https://historicreenactors.com/about | **404** – Not found |
| https://historicreenactors.com/api/contact | **404** – Not found |

The domain was **not** serving the Next.js app from this repo; it was serving a different, older site (likely static HTML or PHP from another folder or builder).

## Root cause

1. **The web server’s document root** for historicreenactors.com pointed at the **old site’s files**, not at the Next.js app we deploy.
2. **Next.js is a Node.js app.** The files we uploaded (`.next`, `app`, `package.json`, etc.) only work when a **Node process** runs `npm start`. The host was not running Node for this domain; it was just serving static/PHP files from that document root.
3. So even though we uploaded the new app, the server never **executed** it.

## What we did: Option B (static export)

The project is now configured for **static export** so the site can be served as plain HTML/JS/CSS from the host’s document root—no Node required.

1. **Static export** – `next.config.ts` has `output: 'export'`. Running `npm run build` produces a static `out/` folder.
2. **Deploy** – Run `npm run deploy` (or `npm run deploy:static`) to build and upload the **contents of `out/`** to FTP. Set `FTP_REMOTE_DIR` in `.env` to your domain’s **document root** (e.g. `public_html`) so the host serves `index.html` at the domain root.
3. **Forms** – There is no `/api/contact` in a static export. Set **Formspree** (or another form endpoint) in `.env`:
   - `NEXT_PUBLIC_CONTACT_FORM_ACTION=https://formspree.io/f/your-contact-form-id`
   - `NEXT_PUBLIC_BOOKING_FORM_ACTION=https://formspree.io/f/your-booking-form-id`  
   Rebuild and redeploy after setting these so the forms post to Formspree.

## Alternative: Option A (run Node on the server)

If the host supports Node and you prefer to run the full Next.js app (and use `/api/contact`):

1. **Confirm the domain’s document root** (e.g. in cPanel: Domains → historicreenactors.com → Document Root).
2. Put the app there and on the server run: `npm install --omit=dev`, `npm run build`, then start the app (e.g. `pm2 start npm -- start`).
3. Configure the host to proxy the domain to the Node app (e.g. port 3000).

You would need to remove `output: 'export'` from `next.config.ts` and use the SSH deploy (or run `npm start` on the server) instead of the static deploy.

## Summary

- **Why it wasn’t working:** The domain was serving the old site’s document root, and no Node process was running the new Next.js app.
- **Current setup:** Static export; deploy with `npm run deploy` to upload `out/` to the document root; forms use Formspree (or env-configured endpoints) when set.
