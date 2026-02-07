/**
 * Static export deploy: run `next build` (produces out/), then upload contents of out/ to FTP.
 * Use this when the host only serves static files (no Node). Set FTP_REMOTE_DIR to the
 * document root (e.g. public_html) so index.html is served at the domain root.
 *
 * Requires .env: FTP_HOST, FTP_USER, FTP_PASSWORD. Optional: FTP_REMOTE_DIR (default ".")
 */

import { Client } from "basic-ftp";
import { existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "out");

function loadEnv() {
  if (process.env.FTP_HOST && process.env.FTP_USER && process.env.FTP_PASSWORD) {
    return; // CI or env already set
  }
  const path = join(root, ".env");
  if (!existsSync(path)) {
    console.error("No .env file and FTP_HOST/FTP_USER/FTP_PASSWORD not set. Add them to .env or env.");
    process.exit(1);
  }
  const content = readFileSync(path, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const eq = trimmed.indexOf("=");
      if (eq > 0) {
        const key = trimmed.slice(0, eq).trim();
        const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
        process.env[key] = value;
      }
    }
  }
}

function runBuild() {
  console.log("Running npm run build (static export)...");
  execSync("npm run build", { cwd: root, stdio: "inherit" });
  if (!existsSync(outDir)) {
    console.error("Build did not produce out/ folder. Check next.config has output: 'export'.");
    process.exit(1);
  }
}

async function deploy() {
  loadEnv();
  const host = process.env.FTP_HOST;
  const user = process.env.FTP_USER;
  const password = process.env.FTP_PASSWORD;
  const remoteDir = process.env.FTP_REMOTE_DIR || ".";

  if (!host || !user || !password) {
    console.error("Set FTP_HOST, FTP_USER, FTP_PASSWORD in .env");
    process.exit(1);
  }

  const skipBuild = process.argv.includes("--ftp-only") || process.env.SKIP_BUILD === "1";
  if (!skipBuild) {
    runBuild();
  } else {
    if (!existsSync(outDir)) {
      console.error("No out/ folder. Run npm run build first, or run without --ftp-only.");
      process.exit(1);
    }
    console.log("Skipping build (--ftp-only). Uploading existing out/...");
  }

  const client = new Client(60_000);
  client.ftp.verbose = false;

  try {
    console.log("Connecting to FTP...");
    await client.access({
      host,
      user,
      password,
      secure: false
    });

    await client.ensureDir(remoteDir);
    console.log("Uploading out/ ->", remoteDir === "." ? "remote root" : remoteDir);
    await client.uploadFromDir(outDir, remoteDir);

    console.log("Static deploy complete. Ensure the domain's document root points at this folder.");
  } catch (err) {
    console.error("Deploy failed:", err.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();
