/**
 * When Vercel "Root Directory" is `cra/`, only `cra/api/*` is deployed as
 * serverless routes — `api/` at the repo root is outside the project and is ignored.
 * Copy canonical `api/` → `cra/api/` after install so both layouts work.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "api");
const dest = path.join(root, "cra", "api");

if (!fs.existsSync(src)) {
  console.warn("copy-api-to-cra: skip (no api/ folder)");
  process.exit(0);
}

if (fs.existsSync(dest)) {
  fs.rmSync(dest, { recursive: true });
}
fs.mkdirSync(path.join(root, "cra"), { recursive: true });
fs.cpSync(src, dest, { recursive: true });
console.log("copy-api-to-cra: api/ → cra/api/");
