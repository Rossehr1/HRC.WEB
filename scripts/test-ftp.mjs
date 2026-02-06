/**
 * Test FTP connectivity using .env credentials.
 * Usage: node scripts/test-ftp.mjs
 */

import { Client } from "basic-ftp";
import { existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnv() {
  const path = join(root, ".env");
  if (!existsSync(path)) {
    console.error("No .env file. Set FTP_HOST, FTP_USER, FTP_PASSWORD.");
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

async function testFtp() {
  loadEnv();
  const host = process.env.FTP_HOST;
  const user = process.env.FTP_USER;
  const password = process.env.FTP_PASSWORD;

  if (!host || !user || !password) {
    console.error("Missing .env: set FTP_HOST, FTP_USER, FTP_PASSWORD.");
    process.exit(1);
  }

  console.log("Testing FTP connection...");
  console.log("  Host:", host);
  console.log("  User:", user);

  const client = new Client(15_000);
  client.ftp.verbose = true;

  try {
    await client.access({
      host,
      user,
      password,
      secure: false
    });
    console.log("\n✓ Connected successfully.");

    const list = await client.list();
    console.log("  Root directory listing (%d items):", list.length);
    list.slice(0, 15).forEach((f) => {
      console.log("    ", f.isDirectory ? "[DIR] " : "      ", f.name);
    });
    if (list.length > 15) console.log("    ... and", list.length - 15, "more");

    console.log("\n✓ FTP connectivity OK.");
  } catch (err) {
    console.error("\n✗ FTP connection failed:", err.message);
    if (err.code) console.error("  Code:", err.code);
    process.exit(1);
  } finally {
    client.close();
  }
}

testFtp();
