/**
 * FTP deploy: build then upload .next, app, components, lib, public, and config files.
 * Requires .env with FTP_HOST, FTP_USER, FTP_PASSWORD. Optional: FTP_REMOTE_DIR (default ".")
 * The server should run: npm install --production && npm start
 */

import { Client } from "basic-ftp";
import { existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnv() {
  const path = join(root, ".env");
  if (!existsSync(path)) {
    console.error("No .env file. Add FTP_HOST, FTP_USER, FTP_PASSWORD.");
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
  console.log("Running npm run build...");
  execSync("npm run build", { cwd: root, stdio: "inherit" });
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

  runBuild();

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

    const dirs = [".next", "app", "components", "lib", "public", "content"];
    for (const dir of dirs) {
      const local = join(root, dir);
      if (existsSync(local)) {
        const remotePath = remoteDir === "." ? dir : `${remoteDir}/${dir}`;
        console.log("Uploading", dir, "->", remotePath);
        await client.uploadFromDir(local, remotePath);
      }
    }

    const files = [
      "package.json",
      "next.config.ts",
      "postcss.config.mjs",
      "tailwind.config.ts",
      "tsconfig.json",
      "next-env.d.ts",
      "eslint.config.mjs"
    ];
    for (const file of files) {
      const local = join(root, file);
      if (existsSync(local)) {
        const remotePath = remoteDir === "." ? file : `${remoteDir}/${file}`;
        console.log("Uploading", file);
        await client.uploadFrom(local, remotePath);
      }
    }

    console.log("Deploy complete.");
  } catch (err) {
    console.error("Deploy failed:", err.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();
