# Deploy to production (https://historicreenactors.com)

Deployment is **git → FTP**: publish updates to the repo, then deploy to production using FTP credentials from `.env`.

## 1. Publish updates to Git

```bash
git add -A
git commit -m "Your message"
git push origin master
```

## 2. Deploy to production via FTP

From the project root (with `.env` containing `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD`):

```bash
npm run deploy
```

This builds the app and uploads to production at https://historicreenactors.com (via FTP credentials in `.env`).

- **FTP-only upload** (skip build, use existing `.next`):  
  `npm run deploy:ftp`
- **Test FTP connectivity**:  
  `npm run test-ftp`

---

## On the production server (after FTP upload)

On the host that serves https://historicreenactors.com:

```bash
npm install --omit=dev
npm start
```

(Or `npm install --production` and set `PORT` if the host requires it.)

---

## Troubleshooting

| Issue | Action |
|-------|--------|
| Port in use | `set PORT=3080 && npm start` (or host’s port) |
| No .next | Run `npm run deploy` (full build + upload), not only `deploy:ftp` |
| FTP fails | Run `npm run test-ftp`; check `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD` in `.env` |
| Node version | Next.js 15 needs Node 18.18+ (`node -v`) |
