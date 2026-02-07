/**
 * Deploy via SSH: connect to server, git pull, npm install, npm run build.
 * Requires .env: SSH_HOST, SSH_PORT, SSH_USER, SSH_PASSWORD, SSH_REMOTE_PATH
 * Ensure the repo is cloned on the server at SSH_REMOTE_PATH first.
 */

import { Client } from "ssh2";
import { existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnv() {
  const path = join(root, ".env");
  if (!existsSync(path)) {
    console.error("No .env file. Set SSH_HOST, SSH_PORT, SSH_USER, SSH_PASSWORD, SSH_REMOTE_PATH.");
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

function runRemote(conn, cmd) {
  return new Promise((resolve, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      stream.on("data", (d) => process.stdout.write(d.toString()));
      if (stream.stderr) stream.stderr.on("data", (d) => process.stderr.write(d.toString()));
      stream.on("close", (code) => (code !== 0 ? reject(new Error(`exit ${code}`)) : resolve()));
    });
  });
}

async function deploy() {
  loadEnv();
  const host = process.env.SSH_HOST;
  const port = parseInt(process.env.SSH_PORT || "22", 10);
  const username = process.env.SSH_USER;
  const password = process.env.SSH_PASSWORD;
  const remotePath = process.env.SSH_REMOTE_PATH;
  const branch = process.env.SSH_GIT_BRANCH || "master";

  if (!host || !username || !password || !remotePath) {
    console.error("Set SSH_HOST, SSH_PORT, SSH_USER, SSH_PASSWORD, SSH_REMOTE_PATH in .env");
    process.exit(1);
  }

  const conn = new Client();
  console.log(`Connecting to ${username}@${host}:${port}...`);

  await new Promise((resolve, reject) => {
    conn.on("ready", resolve).on("error", reject).connect({
      host,
      port,
      username,
      password,
      readyTimeout: 15000
    });
  });

  try {
    const cd = `cd ${remotePath.replace(/ /g, "\\ ")}`;
    await runRemote(conn, `${cd} && git pull origin ${branch}`);
    await runRemote(conn, `${cd} && npm install --omit=dev`);
    await runRemote(conn, `${cd} && npm run build`);
    console.log("Deploy complete. Restart the app on the server if needed (e.g. pm2 restart all).");
  } catch (err) {
    console.error("Deploy failed:", err.message);
    process.exit(1);
  } finally {
    conn.end();
  }
}

deploy();
