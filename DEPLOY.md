# Deployment & troubleshooting

## On the server (after FTP upload)

```bash
npm install --production
npm start
```

Or with newer npm:

```bash
npm install --omit=dev
npm start
```

---

## Common problems

### 1. **Port already in use** (`EADDRINUSE: address already in use :::3000`)

Something is already using port 3000.

- **Option A – use another port:**
  ```bash
  set PORT=3080 && npm start
  ```
  (Windows) or `PORT=3080 npm start` (Linux/macOS). Then open `http://your-server:3080`.

- **Option B – stop the process on 3000:**
  - Windows: `netstat -ano | findstr :3000` then `taskkill /PID <pid> /F`
  - Linux/macOS: `lsof -i :3000` then `kill <pid>`

### 2. **"Cannot find module 'next'"**

- Run a full install (no `--production`): `npm install`
- Ensure you’re in the project root (the folder that contains `package.json` and `.next`).

### 3. **No .next folder / "Could not find a production build"**

The app must be built before `npm start`. The deploy script builds locally and uploads `.next`. If you’re building on the server instead:

```bash
npm install
npm run build
npm start
```

### 4. **Node version**

Next.js 15 needs Node 18.18+. Check:

```bash
node -v
```

Install a newer Node (e.g. from [nodejs.org](https://nodejs.org)) or use nvm.

### 5. **Host only allows certain ports**

Many hosts use 8080 or a port they assign. Set it before starting:

```bash
set PORT=8080 && npm start
```

(Replace `8080` with the port your host provides.)

### 6. **npm install --production is slow or hangs**

- Check internet on the server.
- Try: `npm install --production --prefer-offline` or `npm ci --omit=dev` if you have a `package-lock.json` on the server.

---

## Quick checklist

| Check | Command / action |
|-------|-------------------|
| In project root | `dir` (Windows) or `ls` – you should see `package.json`, `.next`, `app` |
| Node version | `node -v` (need 18.18+) |
| Dependencies | `npm install --omit=dev` or `npm install --production` |
| Port free | Use another port with `set PORT=3080 && npm start` if 3000 is in use |
| Build exists | Folder `.next` must exist (from deploy or from `npm run build`) |

If you paste the **exact error message** (and whether you’re on the server or your PC), we can narrow it down further.
